/**
 * Cloudflare Pages Function for POST /api/chat
 * Hardened in Phase 09:
 * - Passes GEMINI_API_KEY via x-goog-api-key header (never in URL query string)
 * - Enforces Content-Type: application/json and anti-CSRF header validation
 * - Enforces per-IP sliding window rate limiting
 * - Strips control characters, HTML angle brackets, and redacts sensitive number sequences
 * - Sets Cache-Control: no-store and prevents internal error leakage
 */

const MAX_MESSAGE_CHARS = 600;
const MAX_CONTEXT_MESSAGES = 8;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 12;

const edgeRateLimitStore = new Map();

const JSON_SECURITY_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store, no-cache, must-revalidate, private',
  'X-Content-Type-Options': 'nosniff',
};

const SYSTEM_INSTRUCTION = `You are the official AI Assistant on mdselim.com, the personal branding and web development website of MD Selim.
Always be transparent that you are MD Selim's AI Assistant, not Selim in person.
Personality: Professional, friendly, natural, concise, helpful, and honest.
Never invent qualifications, client names, testimonials, or unapproved capabilities.
Services offered: (01) Webflow Websites, (02) Focused Landing Pages, (03) Basic On-Page SEO, (04) Technical SEO Setup, (05) Website Updates, Maintenance & Agreed Ongoing Improvements.
Exclusions: No paid ad management, no off-page backlink schemes, no custom multi-tenant SaaS backends, no print design.
Direct visitors to /contact/ or hello@mdselim.com for project inquiries.`;

function sanitize(raw, maxLen) {
  if (typeof raw !== 'string') return '';
  return raw
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '')
    .replace(/\b(?:\d[ -]*?){13,19}\b/g, '[REDACTED-NUMBER]')
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[REDACTED-ID]')
    .trim()
    .slice(0, maxLen);
}

function checkEdgeRateLimit(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = (edgeRateLimitStore.get(ip) || []).filter((ts) => ts > windowStart);

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldest = timestamps[0] || now;
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000)
    );
    edgeRateLimitStore.set(ip, timestamps);
    return { allowed: false, retryAfterSeconds };
  }

  timestamps.push(now);
  edgeRateLimitStore.set(ip, timestamps);
  return { allowed: true, retryAfterSeconds: 0 };
}

export async function onRequestPost(context) {
  try {
    const req = context.request;
    const contentType = (req.headers.get('content-type') || '').toLowerCase();
    if (!contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ error: 'Unsupported content type. JSON is required.' }),
        { status: 415, headers: JSON_SECURITY_HEADERS }
      );
    }

    // Origin check when Origin header is present (CSRF defense)
    const origin = req.headers.get('origin');
    if (origin) {
      try {
        const originUrl = new URL(origin);
        const reqUrl = new URL(req.url);
        if (originUrl.host !== reqUrl.host && !originUrl.hostname.endsWith('mdselim.com')) {
          return new Response(
            JSON.stringify({ error: 'Cross-origin request rejected.' }),
            { status: 403, headers: JSON_SECURITY_HEADERS }
          );
        }
      } catch {
        return new Response(
          JSON.stringify({ error: 'Invalid request origin.' }),
          { status: 403, headers: JSON_SECURITY_HEADERS }
        );
      }
    }

    const clientIp =
      req.headers.get('cf-connecting-ip') ||
      (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
      'edge-client';

    const rate = checkEdgeRateLimit(clientIp);
    if (!rate.allowed) {
      return new Response(
        JSON.stringify({
          error: `Rate limit reached. Please wait ${rate.retryAfterSeconds}s before sending another message.`,
          retryAfterSeconds: rate.retryAfterSeconds,
        }),
        { status: 429, headers: JSON_SECURITY_HEADERS }
      );
    }

    const body = await req.json();

    // Honeypot check
    if (typeof body?.honeypot === 'string' && body.honeypot.trim().length > 0) {
      return new Response(
        JSON.stringify({ error: 'Request rejected.' }),
        { status: 400, headers: JSON_SECURITY_HEADERS }
      );
    }

    const message = sanitize(body?.message, MAX_MESSAGE_CHARS);

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Please enter a non-empty question or message.' }),
        { status: 400, headers: JSON_SECURITY_HEADERS }
      );
    }

    const apiKey = context.env?.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          reply:
            "I'm MD Selim's AI Assistant. I can help explain Selim's Webflow website builds, focused landing pages, basic on-page and technical SEO setup, and ongoing maintenance plans, or direct you to the Contact page (/contact/) to start a project inquiry.",
          suggestedRoutes: [
            { label: 'Explore Services', path: '/services/' },
            { label: 'Go to Contact Page', path: '/contact/' },
          ],
          source: 'knowledge-fallback',
        }),
        { status: 200, headers: JSON_SECURITY_HEADERS }
      );
    }

    const rawHistory = Array.isArray(body?.history) ? body.history : [];
    const contents = [
      ...rawHistory
        .slice(-MAX_CONTEXT_MESSAGES)
        .map((turn) => ({
          role: turn?.role === 'model' ? 'model' : 'user',
          parts: [{ text: sanitize(turn?.text, MAX_MESSAGE_CHARS) }],
        }))
        .filter((turn) => turn.parts[0].text.length > 0),
      { role: 'user', parts: [{ text: message }] },
    ];

    const apiRes = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
          'User-Agent': 'aistudio-build',
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          contents,
        }),
      }
    );

    if (!apiRes.ok) {
      return new Response(
        JSON.stringify({
          reply:
            "I'm MD Selim's AI Assistant. MD Selim helps small service businesses with custom Webflow websites, focused landing pages, on-page and technical SEO setup, and ongoing website maintenance. Feel free to explore the Services page (/services/) or submit your project details on the Contact page (/contact/).",
          suggestedRoutes: [
            { label: 'Explore Services', path: '/services/' },
            { label: 'Go to Contact Page', path: '/contact/' },
          ],
          source: 'knowledge-fallback',
        }),
        { status: 200, headers: JSON_SECURITY_HEADERS }
      );
    }

    const data = await apiRes.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      'Please visit the Services or Contact page for full project details.';

    return new Response(
      JSON.stringify({
        reply: sanitize(reply, 2000),
        suggestedRoutes: [
          { label: 'Explore Services', path: '/services/' },
          { label: 'Contact Page', path: '/contact/' },
        ],
        source: 'ai',
      }),
      { status: 200, headers: JSON_SECURITY_HEADERS }
    );
  } catch (_err) {
    return new Response(
      JSON.stringify({
        error: 'Unable to process chat request right now. Please use the Contact page.',
      }),
      { status: 500, headers: JSON_SECURITY_HEADERS }
    );
  }
}

