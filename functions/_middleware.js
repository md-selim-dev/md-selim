/**
 * Cloudflare Pages Function Middleware
 * 1. Permanently redirects requests from the default Pages domain (md-selim.pages.dev)
 *    to the primary custom domain (https://mdselim.com) with HTTP 301,
 *    preserving the full URL path and query parameters.
 * 2. Applies defensive HTTP security headers (HSTS, nosniff, Referrer-Policy,
 *    Permissions-Policy, CSP) across all responses.
 *
 * Does not redirect:
 * - Primary domain requests (mdselim.com, www.mdselim.com)
 * - Preview deployment subdomains (<hash>.md-selim.pages.dev, <branch>.md-selim.pages.dev)
 */
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-DNS-Prefetch-Control': 'off',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy':
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'",
};

export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.hostname.toLowerCase() === 'md-selim.pages.dev') {
    const destination = `https://mdselim.com${url.pathname}${url.search}`;
    return Response.redirect(destination, 301);
  }

  const response = await context.next();
  const securedResponse = new Response(response.body, response);

  for (const [headerName, headerValue] of Object.entries(SECURITY_HEADERS)) {
    if (!securedResponse.headers.has(headerName)) {
      securedResponse.headers.set(headerName, headerValue);
    }
  }

  return securedResponse;
}

