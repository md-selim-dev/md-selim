/**
 * Cloudflare Pages Function for POST /api/chat
 * Ensures the AI Assistant also works seamlessly when deployed to Cloudflare Pages.
 * Uses environment variable GEMINI_API_KEY configured in Cloudflare Pages secrets.
 */

const MAX_MESSAGE_CHARS = 600;
const MAX_CONTEXT_MESSAGES = 8;

const SYSTEM_INSTRUCTION = `You are the official AI Assistant on mdselim.com, the personal branding and web development website of MD Selim.
Always be transparent that you are MD Selim's AI Assistant, not Selim in person.
Personality: Professional, friendly, natural, concise, helpful, and honest.
Never invent qualifications, client names, testimonials, or unapproved capabilities.
Services offered: (01) Webflow Websites, (02) Focused Landing Pages, (03) Basic On-Page SEO, (04) Technical SEO Setup, (05) Website Updates, Maintenance & Agreed Ongoing Improvements.
Exclusions: No paid ad management, no off-page backlink schemes, no custom multi-tenant SaaS backends, no print design.
Direct visitors to /contact/ or hello@mdselim.com for project inquiries.`;

function sanitize(raw, maxLen) {
  if (typeof raw !== 'string') return '';
  return raw.trim().slice(0, maxLen);
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const message = sanitize(body?.message, MAX_MESSAGE_CHARS);

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Please enter a non-empty question or message.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
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
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const rawHistory = Array.isArray(body?.history) ? body.history : [];
    const contents = [
      ...rawHistory.slice(-MAX_CONTEXT_MESSAGES).map((turn) => ({
        role: turn?.role === 'model' ? 'model' : 'user',
        parts: [{ text: sanitize(turn?.text, MAX_MESSAGE_CHARS) }],
      })),
      { role: 'user', parts: [{ text: message }] },
    ];

    const apiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${encodeURIComponent(
        apiKey
      )}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await apiRes.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      'Please visit the Services or Contact page for full project details.';

    return new Response(
      JSON.stringify({
        reply,
        suggestedRoutes: [
          { label: 'Explore Services', path: '/services/' },
          { label: 'Contact Page', path: '/contact/' },
        ],
        source: 'ai',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (_err) {
    return new Response(
      JSON.stringify({
        error: 'Unable to process chat request right now. Please use the Contact page.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
