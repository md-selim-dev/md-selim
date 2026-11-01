/**
 * Cloudflare Pages Function for POST /api/chat/preliminary-brief
 * Validates consent-based preliminary project briefs from the AI Assistant widget:
 * - Content-Type & Origin validation (CSRF protection)
 * - Per-IP sliding window rate limiting (5 submissions per 10 minutes)
 * - Honeypot spam check (websiteConfirm)
 * - Explicit consent verification & input sanitization
 * - Optional HTTPS webhook forwarding via CONTACT_WEBHOOK_URL
 */

const BRIEF_WINDOW_MS = 10 * 60 * 1000;
const BRIEF_MAX_REQUESTS = 5;
const briefRateStore = new Map();

const JSON_SECURITY_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store, no-cache, must-revalidate, private',
  'X-Content-Type-Options': 'nosniff',
};

function sanitizeField(raw, maxLen) {
  if (typeof raw !== 'string') return '';
  return raw
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLen);
}

async function forwardToWebhook(webhookUrl, payload) {
  const cleanUrl = typeof webhookUrl === 'string' ? webhookUrl.trim() : '';
  if (!cleanUrl || !cleanUrl.startsWith('https://')) {
    return false;
  }

  try {
    const res = await fetch(cleanUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        source: 'mdselim.com',
        type: 'assistant-preliminary-brief',
        submittedAt: new Date().toISOString(),
        data: payload,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function onRequestPost(context) {
  try {
    const req = context.request;
    const contentType = (req.headers.get('content-type') || '').toLowerCase();
    if (!contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ error: 'Unsupported Media Type. Requests must use application/json.' }),
        { status: 415, headers: JSON_SECURITY_HEADERS }
      );
    }

    const origin = req.headers.get('origin');
    if (origin) {
      try {
        const originUrl = new URL(origin);
        const reqUrl = new URL(req.url);
        if (
          originUrl.host !== reqUrl.host &&
          !originUrl.hostname.endsWith('mdselim.com') &&
          !originUrl.hostname.endsWith('.pages.dev') &&
          !originUrl.hostname.endsWith('.run.app')
        ) {
          return new Response(
            JSON.stringify({ error: 'Cross-origin request rejected.' }),
            { status: 403, headers: JSON_SECURITY_HEADERS }
          );
        }
      } catch {
        return new Response(
          JSON.stringify({ error: 'Malformed Origin header.' }),
          { status: 403, headers: JSON_SECURITY_HEADERS }
        );
      }
    }

    const clientIp =
      req.headers.get('cf-connecting-ip') ||
      (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
      'edge-client';

    const now = Date.now();
    const timestamps = (briefRateStore.get(clientIp) || []).filter(
      (ts) => ts > now - BRIEF_WINDOW_MS
    );

    if (timestamps.length >= BRIEF_MAX_REQUESTS) {
      return new Response(
        JSON.stringify({
          error:
            'Too many preliminary brief submissions from this connection. Please use the Contact page or email hello@mdselim.com directly.',
        }),
        { status: 429, headers: JSON_SECURITY_HEADERS }
      );
    }

    const body = await req.json();

    // Honeypot check
    if (typeof body?.websiteConfirm === 'string' && body.websiteConfirm.trim().length > 0) {
      return new Response(
        JSON.stringify({ ok: true }),
        { status: 200, headers: JSON_SECURITY_HEADERS }
      );
    }

    if (body?.consent !== true) {
      return new Response(
        JSON.stringify({
          error: 'Explicit consent is required before submitting preliminary project details.',
        }),
        { status: 400, headers: JSON_SECURITY_HEADERS }
      );
    }

    const name = sanitizeField(body?.name, 100);
    const email = sanitizeField(body?.email, 120);
    const serviceNeed = sanitizeField(body?.serviceNeed ?? body?.serviceNeeded, 160);
    const notes = sanitizeField(body?.notes ?? body?.goals, 500);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!name || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Please provide your name and a valid email address.' }),
        { status: 400, headers: JSON_SECURITY_HEADERS }
      );
    }

    timestamps.push(now);
    briefRateStore.set(clientIp, timestamps);

    const summary = {
      name,
      email,
      serviceNeed: serviceNeed || 'Webflow Website / SEO Inquiry',
      notes,
    };

    const webhookForwarded = await forwardToWebhook(
      context.env?.CONTACT_WEBHOOK_URL,
      summary
    );

    return new Response(
      JSON.stringify({
        ok: true,
        webhookForwarded,
        summary,
      }),
      { status: 200, headers: JSON_SECURITY_HEADERS }
    );
  } catch {
    return new Response(
      JSON.stringify({
        error: 'Could not process preliminary brief right now. Please use the Contact page.',
      }),
      { status: 500, headers: JSON_SECURITY_HEADERS }
    );
  }
}
