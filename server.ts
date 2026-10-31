import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import {
  buildSafeFallbackReply,
  CHATBOT_LIMITS,
  CHATBOT_SYSTEM_INSTRUCTION,
  inferSuggestedRoutes,
} from './src/data/chatbotKnowledge.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

/**
 * In-memory per-IP sliding window rate limiter for /api/chat
 */
const rateLimitStore = new Map<string, number[]>();

function checkRateLimit(clientKey: string): {
  allowed: boolean;
  retryAfterSeconds: number;
  remaining: number;
} {
  const now = Date.now();
  const windowStart = now - CHATBOT_LIMITS.RATE_LIMIT_WINDOW_MS;
  const timestamps = (rateLimitStore.get(clientKey) || []).filter(
    (ts) => ts > windowStart
  );

  if (timestamps.length >= CHATBOT_LIMITS.RATE_LIMIT_MAX_REQUESTS) {
    const oldest = timestamps[0] || now;
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((oldest + CHATBOT_LIMITS.RATE_LIMIT_WINDOW_MS - now) / 1000)
    );
    rateLimitStore.set(clientKey, timestamps);
    return {
      allowed: false,
      retryAfterSeconds,
      remaining: 0,
    };
  }

  timestamps.push(now);
  rateLimitStore.set(clientKey, timestamps);
  return {
    allowed: true,
    retryAfterSeconds: 0,
    remaining: CHATBOT_LIMITS.RATE_LIMIT_MAX_REQUESTS - timestamps.length,
  };
}

function sanitizeText(raw: unknown, maxLength: number): string {
  if (typeof raw !== 'string') return '';
  return raw
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

interface ChatHistoryTurn {
  role: 'user' | 'model';
  text: string;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '32kb' }));

  // POST /api/chat — Secure server-side AI assistant endpoint
  app.post('/api/chat', async (req: Request, res: Response) => {
    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'local-client';

    // 1. Rate Limit Check
    const rateStatus = checkRateLimit(clientIp);
    res.setHeader('X-RateLimit-Remaining', String(rateStatus.remaining));

    if (!rateStatus.allowed) {
      res.status(429).json({
        error: `Rate limit reached (${CHATBOT_LIMITS.RATE_LIMIT_MAX_REQUESTS} messages per minute). Please wait ${rateStatus.retryAfterSeconds}s before sending another message.`,
        retryAfterSeconds: rateStatus.retryAfterSeconds,
      });
      return;
    }

    // 2. Input Validation
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

      const replyText = (response.text || '').trim();

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
      const errMessage = err instanceof Error ? err.message : String(err);
      const fallback = buildSafeFallbackReply(cleanMessage);

      // Provide a safe, grounded fallback reply while transparently reporting any API quota/key notice
      res.status(200).json({
        reply: fallback.reply,
        suggestedRoutes: fallback.suggestedRoutes,
        source: 'knowledge-fallback',
        notice: errMessage.includes('429') || errMessage.includes('RESOURCE_EXHAUSTED')
          ? 'Live AI quota is currently busy; answered directly from MD Selim’s verified site knowledge base.'
          : 'Answered directly from MD Selim’s verified site knowledge base.',
      });
    }
  });

  // POST /api/chat/preliminary-brief — Validates preliminary project info shared with consent
  app.post('/api/chat/preliminary-brief', (req: Request, res: Response) => {
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

  // Mount Vite dev server in development or static dist in production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
