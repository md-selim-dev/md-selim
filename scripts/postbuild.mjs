/**
 * Post-Build Static Route & SEO Pre-Renderer for https://mdselim.com
 * Generates route-specific static HTML entry points inside dist/:
 * - dist/index.html (/)
 * - dist/services/index.html (/services/)
 * - dist/work/index.html (/work/)
 * - dist/about/index.html (/about/)
 * - dist/insights/index.html (/insights/)
 * - dist/contact/index.html (/contact/)
 * - dist/404.html & dist/404/index.html (/404/)
 *
 * Ensures both static edge hosts (Cloudflare Pages) and Node servers serve
 * pre-rendered route titles, meta descriptions, canonical URLs, Open Graph tags,
 * and Schema.org JSON-LD without requiring client-side JavaScript execution.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');
const baseIndexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(baseIndexPath)) {
  console.error('[postbuild] dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const SITE_URL = 'https://mdselim.com';
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

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

function escapeHtmlAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildRouteJsonLd(route, meta) {
  const canonicalUrl = `${SITE_URL}${meta.canonicalPath}`;
  const personEntity = {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'MD Selim',
    alternateName: 'MD SELIM',
    jobTitle: 'Webflow Developer & Technical SEO Architect',
    description:
      'I help small service businesses build professional websites with a strong user experience and an SEO-ready foundation.',
    url: `${SITE_URL}/`,
    email: 'mailto:hello@mdselim.com',
    sameAs: ['https://linkedin.com', 'https://x.com', 'https://github.com'],
  };

  const websiteEntity = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: 'MD SELIM',
    description: 'Websites built for clarity, credibility, and growth.',
    inLanguage: 'en',
    publisher: { '@id': PERSON_ID },
  };

  const graph = [personEntity, websiteEntity];

  if (route !== '/' && route !== '/404/') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: meta.breadcrumbLabel,
          item: canonicalUrl,
        },
      ],
    });
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2);
}

function renderHtmlForRoute(template, route, meta) {
  const canonicalUrl = `${SITE_URL}${meta.canonicalPath}`;
  const safeTitle = escapeHtmlAttr(meta.title);
  const safeDesc = escapeHtmlAttr(meta.description);

  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="robots" content="${meta.robots}" />`
  );
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:type" content="${meta.ogType}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${safeDesc}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${safeDesc}" />`
  );

  const schemaJson = buildRouteJsonLd(route, meta);
  html = html.replace(
    /<script\s+id="schema-org-graph"\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script id="schema-org-graph" type="application/ld+json">\n${schemaJson}\n    </script>`
  );

  return html;
}

const templateHtml = fs.readFileSync(baseIndexPath, 'utf-8');

for (const [route, meta] of Object.entries(ROUTE_SEO)) {
  const rendered = renderHtmlForRoute(templateHtml, route, meta);

  if (route === '/') {
    fs.writeFileSync(baseIndexPath, rendered, 'utf-8');
  } else if (route === '/404/') {
    const dir404 = path.join(distDir, '404');
    fs.mkdirSync(dir404, { recursive: true });
    fs.writeFileSync(path.join(dir404, 'index.html'), rendered, 'utf-8');
    fs.writeFileSync(path.join(distDir, '404.html'), rendered, 'utf-8');
  } else {
    const cleanDir = route.replace(/^\/|\/$/g, '');
    const routeDir = path.join(distDir, cleanDir);
    fs.mkdirSync(routeDir, { recursive: true });
    fs.writeFileSync(path.join(routeDir, 'index.html'), rendered, 'utf-8');
  }
}

console.log(
  '[postbuild] Pre-rendered static route HTML & SEO metadata for /, /services/, /work/, /about/, /insights/, /contact/, and /404/.'
);
