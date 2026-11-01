/**
 * Cloudflare Pages Middleware
 * 1. Enforces 301 Permanent Redirects from:
 *    - *.pages.dev (e.g. md-selim.pages.dev) -> https://mdselim.com
 *    - www.mdselim.com -> https://mdselim.com
 *    - http://mdselim.com -> https://mdselim.com
 *    while preserving the full request pathname and query string.
 * 2. Applies hardened HTTP security headers at the edge.
 */
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const hostname = url.hostname.toLowerCase();

  // Enforce canonical domain (https://mdselim.com) for pages.dev and www subdomains
  const isPagesDev = hostname === 'md-selim.pages.dev' || hostname.endsWith('.md-selim.pages.dev');
  const isWwwSubdomain = hostname === 'www.mdselim.com';
  const isInsecureCanonical = hostname === 'mdselim.com' && url.protocol === 'http:';

  if (isPagesDev || isWwwSubdomain || isInsecureCanonical) {
    const destination = `https://mdselim.com${url.pathname}${url.search}`;
    return new Response(null, {
      status: 301,
      headers: {
        Location: destination,
        'Cache-Control': 'public, max-age=31536000',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  }

  const response = await context.next();
  const newHeaders = new Headers(response.headers);

  newHeaders.set('X-Content-Type-Options', 'nosniff');
  newHeaders.set('X-DNS-Prefetch-Control', 'off');
  newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  newHeaders.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()'
  );
  newHeaders.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );
  newHeaders.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self' https://cloudflareinsights.com; object-src 'none'; base-uri 'self'; form-action 'self'"
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
