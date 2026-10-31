/**
 * Cloudflare Pages Function Middleware
 * Permanently redirects requests from the default Pages domain (md-selim.pages.dev)
 * to the primary custom domain (https://mdselim.com) with HTTP 301,
 * while preserving the full URL path and query parameters.
 *
 * Does not affect:
 * - Primary domain requests (mdselim.com, www.mdselim.com)
 * - Preview deployment subdomains (<hash>.md-selim.pages.dev, <branch>.md-selim.pages.dev)
 */
export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.hostname.toLowerCase() === 'md-selim.pages.dev') {
    const destination = `https://mdselim.com${url.pathname}${url.search}`;
    return Response.redirect(destination, 301);
  }

  return context.next();
}
