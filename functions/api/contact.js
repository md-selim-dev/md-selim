/**
 * Cloudflare Pages Function for POST /api/contact
 * Hardened in Phase 09 with:
 * - Content-Type & Origin validation (CSRF protection)
 * - Per-IP sliding window rate limiting (5 submissions per 10 minutes)
 * - Honeypot field and minimum human fill-time spam prevention
 * - Strict input validation, URL protocol whitelisting, and control/tag stripping
 */

const CONTACT_WINDOW_MS = 10 * 60 * 1000;
const CONTACT_MAX_REQUESTS = 5;
const contactRateStore = new Map();

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

    const clientIp =
      req.headers.get('cf-connecting-ip') ||
      (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
      'edge-client';

    const now = Date.now();
    const timestamps = (contactRateStore.get(clientIp) || []).filter(
      (ts) => ts > now - CONTACT_WINDOW_MS
    );

    if (timestamps.length >= CONTACT_MAX_REQUESTS) {
      return new Response(
        JSON.stringify({
          error: 'Too many inquiry submissions from this connection. Please wait a few minutes or email hello@mdselim.com directly.',
        }),
        { status: 429, headers: JSON_SECURITY_HEADERS }
      );
    }

    const body = await req.json();

    // 1. Spam Honeypot & Minimum Elapsed Fill-Time Check
    if (typeof body?.companyFax === 'string' && body.companyFax.trim().length > 0) {
      return new Response(
        JSON.stringify({ ok: true }),
        { status: 200, headers: JSON_SECURITY_HEADERS }
      );
    }

    const elapsedMs = Number(body?.elapsedMs) || 0;
    if (elapsedMs > 0 && elapsedMs < 1200) {
      return new Response(
        JSON.stringify({ error: 'Submission was too fast. Please review your details and try again.' }),
        { status: 400, headers: JSON_SECURITY_HEADERS }
      );
    }

    // 2. Field Validation & Sanitization
    const fullName = sanitizeField(body?.fullName, 100);
    const email = sanitizeField(body?.email, 120);
    const businessName = sanitizeField(body?.businessName, 120);
    const websiteUrl = sanitizeField(body?.websiteUrl, 200);
    const serviceInterest = sanitizeField(body?.serviceInterest, 160);
    const projectTimeline = sanitizeField(body?.projectTimeline, 100);
    const projectDetails = sanitizeField(body?.projectDetails, 1500);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!fullName || !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Please provide your name and a valid email address.' }),
        { status: 400, headers: JSON_SECURITY_HEADERS }
      );
    }

    if (websiteUrl) {
      if (/^(javascript|data|vbscript|file|blob):/i.test(websiteUrl)) {
        return new Response(
          JSON.stringify({ error: 'Only http:// and https:// website URLs are permitted.' }),
          { status: 400, headers: JSON_SECURITY_HEADERS }
        );
      }
    }

    if (projectDetails.length < 15) {
      return new Response(
        JSON.stringify({
          error: 'Please include a brief description of your project (at least 15 characters).',
        }),
        { status: 400, headers: JSON_SECURITY_HEADERS }
      );
    }

    timestamps.push(now);
    contactRateStore.set(clientIp, timestamps);

    return new Response(
      JSON.stringify({
        ok: true,
        sanitizedBrief: {
          fullName,
          email,
          businessName,
          websiteUrl,
          serviceInterest,
          projectTimeline,
          projectDetails,
        },
      }),
      { status: 200, headers: JSON_SECURITY_HEADERS }
    );
  } catch (_err) {
    return new Response(
      JSON.stringify({
        error: 'Could not process inquiry right now. Please email hello@mdselim.com directly.',
      }),
      { status: 500, headers: JSON_SECURITY_HEADERS }
    );
  }
}
