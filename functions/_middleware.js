/**
 * Cloudflare Pages Middleware
 * 1. Enforces 301 Permanent Redirects from:
 *    - *.pages.dev (e.g. md-selim.pages.dev) -> https://mdselim.com
 *    - www.mdselim.com -> https://mdselim.com
 *    - http://mdselim.com -> https://mdselim.com
 *    while preserving the full request pathname and query string.
 * 2. Resolves direct requests and page refreshes for all six frontend routes:
 *    /, /services/, /work/, /about/, /insights/, /contact/
 *    (supporting both trailing-slash and non-trailing-slash variants without redirect loops).
 * 3. Preserves /api/* endpoints and static assets untouched.
 * 4. Returns proper HTTP 404 status with the 404 page for unknown routes.
 * 5. Applies hardened HTTP security headers at the edge.
 */

const SITE_URL = 'https://mdselim.com';

const ROUTE_SEO = {
  '/': {
    title: 'MD SELIM — Websites Built for Clarity, Credibility & Growth',
    description:
      'I help small service businesses build professional Webflow websites, conversion-ready landing pages, and technical SEO foundations that earn client trust.',
    canonicalPath: '/',
    ogType: 'website',
    robots: 'index, follow',
    breadcrumbLabel: 'Home',
  },
  '/services/': {
    title: 'Services — Webflow Websites, Landing Pages & SEO | MD SELIM',
    description:
      'Explore Webflow website development, landing pages, basic on-page and technical SEO setup, and ongoing website maintenance with clear scope deliverables.',
    canonicalPath: '/services/',
    ogType: 'website',
    robots: 'index, follow',
    breadcrumbLabel: 'Services',
  },
  '/work/': {
    title: 'Work & Website Architecture Case Studies | MD SELIM',
    description:
      'Review Webflow website architectures, service landing page systems, and technical SEO implementations built for small service businesses and B2B practices.',
    canonicalPath: '/work/',
    ogType: 'website',
    robots: 'index, follow',
    breadcrumbLabel: 'Work',
  },
  '/about/': {
    title: 'About MD Selim — Webflow Developer & SEO Architect',
    description:
      'Learn about MD Selim’s background, capabilities, and structured four-step working philosophy for building clear, search-ready service business websites.',
    canonicalPath: '/about/',
    ogType: 'website',
    robots: 'index, follow',
    breadcrumbLabel: 'About',
  },
  '/insights/': {
    title: 'Insights — Website Clarity, Webflow & SEO Guides | MD SELIM',
    description:
      'Practical articles for small service business owners covering website clarity, conversion positioning, Webflow maintainability, and technical SEO setup.',
    canonicalPath: '/insights/',
    ogType: 'website',
    robots: 'index, follow',
    breadcrumbLabel: 'Insights',
  },
  '/contact/': {
    title: 'Contact MD Selim — Request a Website or SEO Consultation',
    description:
      'Start a conversation with MD Selim about a new Webflow website, focused landing page, on-page and technical SEO setup, or ongoing website maintenance.',
    canonicalPath: '/contact/',
    ogType: 'website',
    robots: 'index, follow',
    breadcrumbLabel: 'Contact',
  },
  '/404/': {
    title: '404 — Page Not Found | MD SELIM',
    description:
      'The requested page could not be found on mdselim.com. Return to the homepage, explore Webflow and SEO services, or contact MD Selim.',
    canonicalPath: '/404/',
    ogType: 'website',
    robots: 'noindex, nofollow',
    breadcrumbLabel: 'Page Not Found',
  },
};

const VALID_CANONICAL_ROUTES = new Set([
  '/',
  '/services/',
  '/work/',
  '/about/',
  '/insights/',
  '/contact/',
]);

const STATIC_EXTENSION_REGEX =
  /\.(?:js|mjs|cjs|css|svg|png|jpg|jpeg|webp|gif|ico|woff|woff2|ttf|eot|otf|xml|txt|json|map|webmanifest|pdf|zip)$/i;

function normalizePathname(pathname) {
  if (!pathname || pathname === '/' || pathname === '/index.html') {
    return '/';
  }
  if (pathname === '/404.html' || pathname === '/404' || pathname === '/404/') {
    return '/404/';
  }
  const clean = pathname.endsWith('/') ? pathname : `${pathname}/`;
  if (VALID_CANONICAL_ROUTES.has(clean)) {
    return clean;
  }
  return '/404/';
}

function escapeHtmlAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function injectRouteMetadata(templateHtml, routeKey) {
  const meta = ROUTE_SEO[routeKey] || ROUTE_SEO['/'];
  const canonicalUrl = `${SITE_URL}${meta.canonicalPath}`;
  const safeTitle = escapeHtmlAttr(meta.title);
  const safeDesc = escapeHtmlAttr(meta.description);

  return templateHtml
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${safeDesc}" />`
    )
    .replace(
      /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="robots" content="${meta.robots}" />`
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`
    )
    .replace(
      /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:type" content="${meta.ogType}" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${safeTitle}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${safeDesc}" />`
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:url" content="${canonicalUrl}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:title" content="${safeTitle}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:description" content="${safeDesc}" />`
    );
}

function applySecurityHeaders(headers) {
  const newHeaders = new Headers(headers);
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
  return newHeaders;
}

async function fetchRootAppHtml(context, originUrl) {
  const rootReq = new Request(new URL('/', originUrl), {
    method: 'GET',
    headers: { Accept: 'text/html' },
  });

  if (context.env && context.env.ASSETS && typeof context.env.ASSETS.fetch === 'function') {
    const assetRes = await context.env.ASSETS.fetch(rootReq);
    if (assetRes && assetRes.ok) {
      return await assetRes.text();
    }
  }

  return null;
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const hostname = url.hostname.toLowerCase();

  // 1. Enforce canonical domain (https://mdselim.com) for pages.dev and www subdomains
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

  const pathname = url.pathname;
  const method = (context.request.method || 'GET').toUpperCase();

  // 2. Pass API requests and static assets directly through without HTML rewriting
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/assets/') ||
    (STATIC_EXTENSION_REGEX.test(pathname) &&
      pathname !== '/index.html' &&
      pathname !== '/404.html')
  ) {
    const response = await context.next();
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: applySecurityHeaders(response.headers),
    });
  }

  // 3. Handle GET / HEAD page navigation requests
  if (method === 'GET' || method === 'HEAD') {
    const routeKey = normalizePathname(pathname);
    const isKnownRoute = VALID_CANONICAL_ROUTES.has(routeKey);

    const response = await context.next();

    if (isKnownRoute) {
      // If static asset resolution succeeded with 200 OK, return it directly with security headers
      if (response.status === 200) {
        const headers = applySecurityHeaders(response.headers);
        headers.set('Content-Type', 'text/html; charset=utf-8');
        return new Response(method === 'HEAD' ? null : response.body, {
          status: 200,
          headers,
        });
      }

      // Fallback: If asset lookup returned 404 or a conflicting 3xx slash redirect,
      // serve the application HTML shell with route-specific SEO metadata and HTTP 200 OK
      const rootHtml = await fetchRootAppHtml(context, url.origin);
      if (rootHtml) {
        const renderedHtml = injectRouteMetadata(rootHtml, routeKey);
        const headers = applySecurityHeaders(new Headers());
        headers.set('Content-Type', 'text/html; charset=utf-8');
        headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
        return new Response(method === 'HEAD' ? null : renderedHtml, {
          status: 200,
          headers,
        });
      }
    } else {
      // Unknown route: Guarantee HTTP 404 Not Found status and render the 404 application shell
      const rootHtml = await fetchRootAppHtml(context, url.origin);
      if (rootHtml) {
        const notFoundHtml = injectRouteMetadata(rootHtml, '/404/');
        const headers = applySecurityHeaders(new Headers());
        headers.set('Content-Type', 'text/html; charset=utf-8');
        headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
        return new Response(method === 'HEAD' ? null : notFoundHtml, {
          status: 404,
          headers,
        });
      }

      const headers = applySecurityHeaders(response.headers);
      return new Response(method === 'HEAD' ? null : response.body, {
        status: 404,
        headers,
      });
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: applySecurityHeaders(response.headers),
    });
  }

  const response = await context.next();
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: applySecurityHeaders(response.headers),
  });
}
