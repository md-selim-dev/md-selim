import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  buildSafeFallbackReply,
  CHATBOT_LIMITS,
  CHATBOT_SYSTEM_INSTRUCTION,
  inferSuggestedRoutes,
} from './src/data/chatbotKnowledge.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

const CONTACT_RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const CONTACT_RATE_MAX_REQUESTS = 5;
const MAX_RATE_LIMIT_KEYS = 1000;

/**
 * In-memory per-IP sliding window rate limiters with bounded key eviction
 */
const chatRateLimitStore = new Map<string, number[]>();
const contactRateLimitStore = new Map<string, number[]>();

function evaluateRateLimit(
  store: Map<string, number[]>,
  clientKey: string,
  windowMs: number,
  maxRequests: number
): {
  allowed: boolean;
  retryAfterSeconds: number;
  remaining: number;
} {
  const now = Date.now();
  const windowStart = now - windowMs;

  if (store.size > MAX_RATE_LIMIT_KEYS) {
    for (const [k, tsList] of store.entries()) {
      const active = tsList.filter((ts) => ts > windowStart);
      if (active.length === 0) {
        store.delete(k);
      } else {
        store.set(k, active);
      }
    }
  }

  const timestamps = (store.get(clientKey) || []).filter((ts) => ts > windowStart);

  if (timestamps.length >= maxRequests) {
    const oldest = timestamps[0] || now;
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((oldest + windowMs - now) / 1000)
    );
    store.set(clientKey, timestamps);
    return {
      allowed: false,
      retryAfterSeconds,
      remaining: 0,
    };
  }

  timestamps.push(now);
  store.set(clientKey, timestamps);
  return {
    allowed: true,
    retryAfterSeconds: 0,
    remaining: maxRequests - timestamps.length,
  };
}

/**
 * Strips control characters, HTML angle brackets, and redacts accidental payment card or ID numbers.
 */
function sanitizeText(raw: unknown, maxLength: number): string {
  if (typeof raw !== 'string') return '';
  return raw
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '')
    .replace(/\b(?:\d[ -]*?){13,19}\b/g, '[REDACTED-NUMBER]')
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[REDACTED-ID]')
    .trim()
    .slice(0, maxLength);
}

function getClientIp(req: Request): string {
  return (
    (req.headers['cf-connecting-ip'] as string) ||
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    'local-client'
  );
}

/**
 * Validates Content-Type, anti-CSRF custom header, and Origin header on state-changing POST endpoints.
 */
function validatePostSecurity(req: Request, res: Response): boolean {
  const contentType = (req.headers['content-type'] || '').toLowerCase();
  if (!contentType.includes('application/json')) {
    res.status(415).json({
      error: 'Unsupported Media Type. Requests must use application/json.',
    });
    return false;
  }

  const requestedWith = req.headers['x-requested-with'];
  if (requestedWith && requestedWith !== 'XMLHttpRequest') {
    res.status(403).json({
      error: 'Invalid request header.',
    });
    return false;
  }

  const origin = req.headers.origin;
  const host = req.headers.host;
  if (origin && host) {
    try {
      const originUrl = new URL(origin);
      const isSameHost = originUrl.host === host;
      const isPrimaryDomain =
        originUrl.hostname === 'mdselim.com' ||
        originUrl.hostname.endsWith('.mdselim.com') ||
        originUrl.hostname.endsWith('.pages.dev') ||
        originUrl.hostname.endsWith('.run.app');

      if (!isSameHost && !isPrimaryDomain) {
        res.status(403).json({
          error: 'Cross-origin request rejected.',
        });
        return false;
      }
    } catch {
      res.status(403).json({
        error: 'Malformed Origin header.',
      });
      return false;
    }
  }

  return true;
}

interface ChatHistoryTurn {
  role: 'user' | 'model';
  text: string;
}

async function startServer() {
  const app = express();

  // Security: Disable Express server signature header
  app.disable('x-powered-by');

  // Security: Global HTTP security headers
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-DNS-Prefetch-Control', 'off');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()'
    );
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self' https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' https: ws: wss:; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self'"
    );

    if (req.path.startsWith('/api/')) {
      res.setHeader(
        'Cache-Control',
        'no-store, no-cache, must-revalidate, private'
      );
    }
    next();
  });

  // Strict 16kb JSON body limit to prevent payload DoS
  app.use(express.json({ limit: '16kb', strict: true }));

  // POST /api/chat — Secure server-side AI assistant endpoint
  app.post('/api/chat', async (req: Request, res: Response) => {
    if (!validatePostSecurity(req, res)) return;

    const clientIp = getClientIp(req);

    // 1. Rate Limit Check
    const rateStatus = evaluateRateLimit(
      chatRateLimitStore,
      clientIp,
      CHATBOT_LIMITS.RATE_LIMIT_WINDOW_MS,
      CHATBOT_LIMITS.RATE_LIMIT_MAX_REQUESTS
    );
    res.setHeader('X-RateLimit-Remaining', String(rateStatus.remaining));

    if (!rateStatus.allowed) {
      res.status(429).json({
        error: `Rate limit reached (${CHATBOT_LIMITS.RATE_LIMIT_MAX_REQUESTS} messages per minute). Please wait ${rateStatus.retryAfterSeconds}s before sending another message.`,
        retryAfterSeconds: rateStatus.retryAfterSeconds,
      });
      return;
    }

    // 2. Honeypot & Input Validation
    if (typeof req.body?.honeypot === 'string' && req.body.honeypot.trim().length > 0) {
      res.status(400).json({ error: 'Request rejected.' });
      return;
    }

    const rawMessage = req.body?.message;
    if (typeof rawMessage !== 'string' || !rawMessage.trim()) {
      res.status(400).json({
        error: 'Please enter a non-empty question or message.',
      });
      return;
    }

    if (rawMessage.trim().length > CHATBOT_LIMITS.MAX_MESSAGE_CHARS) {
      res.status(400).json({
        error: `Message exceeds the ${CHATBOT_LIMITS.MAX_MESSAGE_CHARS}-character limit. Please keep your question concise.`,
      });
      return;
    }

    const cleanMessage = sanitizeText(rawMessage, CHATBOT_LIMITS.MAX_MESSAGE_CHARS);
    if (!cleanMessage) {
      res.status(400).json({
        error: 'Please enter a valid question or message.',
      });
      return;
    }

    // 3. Conversation Context Window Limit (Usage & Cost Control)
    const rawHistory = Array.isArray(req.body?.history) ? req.body.history : [];
    const boundedHistory: ChatHistoryTurn[] = rawHistory
      .slice(-CHATBOT_LIMITS.MAX_CONTEXT_MESSAGES)
      .map((item: { role?: string; text?: string }) => ({
        role: item?.role === 'model' ? ('model' as const) : ('user' as const),
        text: sanitizeText(item?.text, CHATBOT_LIMITS.MAX_MESSAGE_CHARS),
      }))
      .filter((item: ChatHistoryTurn) => item.text.length > 0);

    // 4. Server-Side Gemini API Execution with Safe Fallback
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      const fallback = buildSafeFallbackReply(cleanMessage);
      res.json({
        reply: fallback.reply,
        suggestedRoutes: fallback.suggestedRoutes,
        source: 'knowledge-fallback',
        notice:
          'Answered using MD Selim’s verified knowledge base (live AI key not configured).',
      });
      return;
    }

    try {
      const { GoogleGenAI, ThinkingLevel } = await import('@google/genai');
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const contents = [
        ...boundedHistory.map((turn) => ({
          role: turn.role,
          parts: [{ text: turn.text }],
        })),
        {
          role: 'user' as const,
          parts: [{ text: cleanMessage }],
        },
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: CHATBOT_SYSTEM_INSTRUCTION,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
        },
      });

      const replyText = sanitizeText(response.text || '', 2000);

      if (!replyText) {
        const fallback = buildSafeFallbackReply(cleanMessage);
        res.json({
          reply: fallback.reply,
          suggestedRoutes: fallback.suggestedRoutes,
          source: 'knowledge-fallback',
        });
        return;
      }

      res.json({
        reply: replyText,
        suggestedRoutes: inferSuggestedRoutes(`${cleanMessage} ${replyText}`),
        source: 'ai',
      });
    } catch (err: unknown) {
      // Never leak upstream SDK stack traces or keys to the client
      const errMessage = err instanceof Error ? err.message : '';
      const fallback = buildSafeFallbackReply(cleanMessage);

      res.status(200).json({
        reply: fallback.reply,
        suggestedRoutes: fallback.suggestedRoutes,
        source: 'knowledge-fallback',
        notice:
          errMessage.includes('429') || errMessage.includes('RESOURCE_EXHAUSTED')
            ? 'Live AI quota is currently busy; answered directly from MD Selim’s verified site knowledge base.'
            : 'Answered directly from MD Selim’s verified site knowledge base.',
      });
    }
  });

  // POST /api/chat/preliminary-brief — Validates preliminary project info shared with consent
  app.post('/api/chat/preliminary-brief', (req: Request, res: Response) => {
    if (!validatePostSecurity(req, res)) return;

    const clientIp = getClientIp(req);
    const rateStatus = evaluateRateLimit(
      contactRateLimitStore,
      clientIp,
      CONTACT_RATE_WINDOW_MS,
      CONTACT_RATE_MAX_REQUESTS
    );
    if (!rateStatus.allowed) {
      res.status(429).json({
        error: 'Too many brief submissions. Please wait a few minutes or email hello@mdselim.com directly.',
      });
      return;
    }

    // Honeypot check
    if (typeof req.body?.websiteConfirm === 'string' && req.body.websiteConfirm.trim().length > 0) {
      res.json({ ok: true });
      return;
    }

    const consent = Boolean(req.body?.consent);
    if (!consent) {
      res.status(400).json({
        error: 'Explicit consent is required before submitting preliminary project details.',
      });
      return;
    }

    const name = sanitizeText(req.body?.name, 100);
    const email = sanitizeText(req.body?.email, 120);
    const serviceNeed = sanitizeText(req.body?.serviceNeed, 160);
    const notes = sanitizeText(req.body?.notes, 500);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!name || !emailRegex.test(email)) {
      res.status(400).json({
        error: 'Please provide your name and a valid email address.',
      });
      return;
    }

    res.json({
      ok: true,
      summary: {
        name,
        email,
        serviceNeed: serviceNeed || 'Webflow Website / SEO Inquiry',
        notes,
      },
    });
  });

  // POST /api/contact — Hardened server-side Contact Inquiry validation & spam protection
  app.post('/api/contact', (req: Request, res: Response) => {
    if (!validatePostSecurity(req, res)) return;

    const clientIp = getClientIp(req);
    const rateStatus = evaluateRateLimit(
      contactRateLimitStore,
      clientIp,
      CONTACT_RATE_WINDOW_MS,
      CONTACT_RATE_MAX_REQUESTS
    );
    res.setHeader('X-RateLimit-Remaining', String(rateStatus.remaining));

    if (!rateStatus.allowed) {
      res.status(429).json({
        error:
          'Too many inquiry submissions from this connection. Please wait a few minutes or email hello@mdselim.com directly.',
      });
      return;
    }

    // 1. Honeypot & Minimum Human Fill-Time Check
    if (typeof req.body?.companyFax === 'string' && req.body.companyFax.trim().length > 0) {
      // Silently accept honeypot bot submissions without processing
      res.json({ ok: true });
      return;
    }

    const elapsedMs = Number(req.body?.elapsedMs) || 0;
    if (elapsedMs > 0 && elapsedMs < 1200) {
      res.status(400).json({
        error: 'Submission was too fast. Please review your details and submit again.',
      });
      return;
    }

    // 2. Field Sanitization & Validation
    const fullName = sanitizeText(req.body?.fullName, 100);
    const email = sanitizeText(req.body?.email, 120);
    const businessName = sanitizeText(req.body?.businessName, 120);
    const rawWebsiteUrl = sanitizeText(req.body?.websiteUrl, 200);
    const serviceInterest = sanitizeText(req.body?.serviceInterest, 160);
    const projectTimeline = sanitizeText(req.body?.projectTimeline, 100);
    const projectDetails = sanitizeText(req.body?.projectDetails, 1500);

    if (!fullName) {
      res.status(400).json({
        error: 'Please enter your name so I know how to address you.',
      });
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        error: 'Please enter a valid email address.',
      });
      return;
    }

    let normalizedWebsiteUrl = '';
    if (rawWebsiteUrl) {
      if (/^(javascript|data|vbscript|file|blob):/i.test(rawWebsiteUrl)) {
        res.status(400).json({
          error: 'Only standard http:// or https:// website URLs are permitted.',
        });
        return;
      }
      try {
        const candidate = /^https?:\/\//i.test(rawWebsiteUrl)
          ? rawWebsiteUrl
          : `https://${rawWebsiteUrl}`;
        const parsed = new URL(candidate);
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
          res.status(400).json({
            error: 'Only http:// and https:// URLs are supported.',
          });
          return;
        }
        normalizedWebsiteUrl = parsed.toString();
      } catch {
        res.status(400).json({
          error: 'Please enter a valid website URL (or leave the field blank).',
        });
        return;
      }
    }

    if (projectDetails.length < 15) {
      res.status(400).json({
        error:
          'Please include a brief description of your business and what you would like help with (at least 15 characters).',
      });
      return;
    }

    res.json({
      ok: true,
      sanitizedBrief: {
        fullName,
        email,
        businessName,
        websiteUrl: normalizedWebsiteUrl,
        serviceInterest,
        projectTimeline,
        projectDetails,
      },
    });
  });

  // Mount Vite dev server in development or static dist in production
  if (process.env.NODE_ENV !== 'production') {
    let viteMiddleware: express.RequestHandler | null = null;
    const vitePromise = import('vite')
      .then(({ createServer: createViteServer }) =>
        createViteServer({
          server: { middlewareMode: true },
          appType: 'spa',
        })
      )
      .then((vite) => {
        viteMiddleware = vite.middlewares;
        return vite.middlewares;
      });

    app.use(async (req: Request, res: Response, next: NextFunction) => {
      try {
        const mw = viteMiddleware || (await vitePromise);
        mw(req, res, next);
      } catch (err) {
        next(err);
      }
    });
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Global leak-free error handler (catches malformed JSON body-parser errors and unexpected exceptions)
  app.use((err: Error & { status?: number; type?: string }, _req: Request, res: Response, _next: NextFunction) => {
    if (err.type === 'entity.too.large') {
      res.status(413).json({
        error: 'Request payload is too large.',
      });
      return;
    }
    if (err instanceof SyntaxError && 'body' in err) {
      res.status(400).json({
        error: 'Malformed JSON payload.',
      });
      return;
    }
    res.status(500).json({
      error: 'An unexpected server error occurred. Please try again later.',
    });
  });

  // Bind port 3000 immediately without awaiting Vite initialization
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

