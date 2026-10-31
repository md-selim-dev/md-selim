import { RoutePath, siteConfig } from '../config/siteConfig';
import { InsightArticle } from '../content/insightsContent';
import { servicesData } from '../data/servicesData';
import { ProjectItem } from '../data/workData';
import { safeJsonLdStringify } from './securityUtils';

export interface BreadcrumbEntry {
  name: string;
  url: string;
}

export interface PageSeoOverride {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  robots?: 'index, follow' | 'noindex, nofollow';
  breadcrumbs?: BreadcrumbEntry[];
  article?: InsightArticle;
  project?: ProjectItem;
}

const SITE_URL = siteConfig.brand.siteUrl; // https://mdselim.com
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Converts human-readable month/year strings (e.g., "October 2026") to ISO 8601 date strings.
 */
function toIsoDate(publishedDate: string): string {
  const monthMap: Record<string, string> = {
    january: '01',
    february: '02',
    march: '03',
    april: '04',
    may: '05',
    june: '06',
    july: '07',
    august: '08',
    september: '09',
    october: '10',
    november: '11',
    december: '12',
  };

  const parts = publishedDate.trim().toLowerCase().split(/\s+/);
  if (parts.length === 2 && monthMap[parts[0]] && /^\d{4}$/.test(parts[1])) {
    return `${parts[1]}-${monthMap[parts[0]]}-15`;
  }
  return '2026-10-15';
}

/**
 * Builds the canonical Person schema for MD Selim.
 * Strictly avoids fabricated street addresses, review ratings, or unverified credentials.
 */
export function buildPersonSchema() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: siteConfig.brand.founderName,
    url: `${SITE_URL}/about/`,
    jobTitle: siteConfig.brand.role,
    description: siteConfig.brand.description,
    email: `mailto:${siteConfig.contact.email}`,
    knowsAbout: [
      'Webflow Website Development',
      'Conversion-Focused Landing Pages',
      'Basic On-Page SEO',
      'Technical SEO Setup',
      'Semantic HTML5 Architecture',
      'Schema.org Structured Data',
      'Website Maintenance',
    ],
    sameAs: siteConfig.socials.map((s) => s.url),
  };
}

/**
 * Builds the canonical WebSite schema for mdselim.com.
 */
export function buildWebSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: siteConfig.brand.name,
    alternateName: siteConfig.brand.domain,
    description: siteConfig.brand.description,
    inLanguage: 'en',
    publisher: {
      '@id': PERSON_ID,
    },
  };
}

/**
 * Builds a Schema.org BreadcrumbList for the active route or detail view.
 */
export function buildBreadcrumbSchema(entries: BreadcrumbEntry[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: entries.map((entry, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: entry.name,
      item: entry.url,
    })),
  };
}

/**
 * Builds Schema.org Service nodes grounded strictly in servicesData.ts.
 * No fabricated prices or review ratings are added.
 */
export function buildServicesSchema() {
  return servicesData.services.map((service) => ({
    '@type': 'Service',
    '@id': `${SITE_URL}/services/#${service.id}`,
    name: service.title,
    serviceType: service.categoryLabel,
    description: service.description,
    url: `${SITE_URL}/services/#${service.id}`,
    provider: {
      '@id': PERSON_ID,
    },
    areaServed: 'Worldwide',
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Small Service Businesses',
    },
  }));
}

/**
 * Builds a Schema.org BlogPosting / Article node for a published Markdown article.
 */
export function buildArticleSchema(article: InsightArticle, canonicalUrl: string) {
  const isoDate = toIsoDate(article.publishedDate);
  return {
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl}#article`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    headline: article.title,
    description: article.excerpt,
    articleSection: article.topic,
    datePublished: isoDate,
    dateModified: isoDate,
    inLanguage: 'en',
    author: {
      '@id': PERSON_ID,
    },
    publisher: {
      '@id': PERSON_ID,
    },
    image: siteConfig.brand.ogImageUrl,
  };
}

/**
 * Generates the complete Schema.org JSON-LD @graph for the current route and view state.
 * Uses only schema types directly supported by actual visible page content.
 */
export function buildRouteStructuredData(
  route: RoutePath,
  override?: PageSeoOverride
): Record<string, unknown> {
  const routeMeta = siteConfig.seo[route] ?? siteConfig.seo['/'];
  const canonicalUrl =
    override?.canonicalUrl ?? `${SITE_URL}${routeMeta.canonicalPath}`;

  const defaultBreadcrumbs: BreadcrumbEntry[] =
    route === '/'
      ? [{ name: 'Home', url: `${SITE_URL}/` }]
      : [
          { name: 'Home', url: `${SITE_URL}/` },
          {
            name: routeMeta.breadcrumbLabel,
            url: `${SITE_URL}${routeMeta.canonicalPath}`,
          },
        ];

  const breadcrumbs = override?.breadcrumbs ?? defaultBreadcrumbs;

  const graph: Record<string, unknown>[] = [
    buildWebSiteSchema(),
    buildPersonSchema(),
    buildBreadcrumbSchema(breadcrumbs),
  ];

  if (route === '/') {
    // Homepage includes primary Service summaries offered on the page
    graph.push(...buildServicesSchema().slice(0, 3));
  } else if (route === '/services/') {
    // Services page includes all 5 scoped services and the visible FAQ section
    graph.push(...buildServicesSchema());
    graph.push({
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/services/#faq`,
      mainEntity: servicesData.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  } else if (route === '/insights/') {
    if (override?.article) {
      graph.push(buildArticleSchema(override.article, canonicalUrl));
    }
  } else if (route === '/work/' && override?.project) {
    graph.push({
      '@type': 'CreativeWork',
      '@id': `${canonicalUrl}#project`,
      name: override.project.title,
      description: override.project.summary,
      genre: `${override.project.projectType} · ${override.project.industry}`,
      creator: {
        '@id': PERSON_ID,
      },
      url: canonicalUrl,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

function upsertMetaTag(
  selector: string,
  attributes: Record<string, string>
): void {
  if (typeof document === 'undefined') return;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    el!.setAttribute(key, value);
  });
}

function upsertLinkTag(
  selector: string,
  attributes: Record<string, string>
): void {
  if (typeof document === 'undefined') return;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    document.head.appendChild(el);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    el!.setAttribute(key, value);
  });
}

/**
 * Synchronizes all Technical SEO tags, OpenGraph, Twitter/X cards, Canonical URL,
 * Robots directive, Google Search Console verification, and Schema.org JSON-LD in <head>.
 */
export function applyPageSeo(
  route: RoutePath,
  override?: PageSeoOverride
): void {
  if (typeof document === 'undefined') return;

  const baseMeta = siteConfig.seo[route] ?? siteConfig.seo['/'];
  const title = override?.title ?? baseMeta.title;
  const description = override?.description ?? baseMeta.description;
  const canonicalUrl =
    override?.canonicalUrl ?? `${SITE_URL}${baseMeta.canonicalPath}`;
  const ogType = override?.ogType ?? baseMeta.ogType;
  const robots = override?.robots ?? baseMeta.robots;

  // 1. Document Title & Primary Meta Description
  document.title = title;
  upsertMetaTag('meta[name="description"]', {
    name: 'description',
    content: description,
  });
  upsertMetaTag('meta[name="robots"]', {
    name: 'robots',
    content: robots,
  });
  upsertMetaTag('meta[name="author"]', {
    name: 'author',
    content: siteConfig.brand.founderName,
  });

  // 2. Canonical URL
  upsertLinkTag('link[rel="canonical"]', {
    rel: 'canonical',
    href: canonicalUrl,
  });

  // 3. Open Graph Social Metadata
  upsertMetaTag('meta[property="og:type"]', {
    property: 'og:type',
    content: ogType,
  });
  upsertMetaTag('meta[property="og:site_name"]', {
    property: 'og:site_name',
    content: siteConfig.brand.name,
  });
  upsertMetaTag('meta[property="og:title"]', {
    property: 'og:title',
    content: title,
  });
  upsertMetaTag('meta[property="og:description"]', {
    property: 'og:description',
    content: description,
  });
  upsertMetaTag('meta[property="og:url"]', {
    property: 'og:url',
    content: canonicalUrl,
  });
  upsertMetaTag('meta[property="og:image"]', {
    property: 'og:image',
    content: siteConfig.brand.ogImageUrl,
  });
  upsertMetaTag('meta[property="og:image:alt"]', {
    property: 'og:image:alt',
    content: siteConfig.brand.ogImageAlt,
  });
  upsertMetaTag('meta[property="og:locale"]', {
    property: 'og:locale',
    content: 'en_US',
  });

  // 4. Twitter / X Card Metadata
  upsertMetaTag('meta[name="twitter:card"]', {
    name: 'twitter:card',
    content: 'summary_large_image',
  });
  upsertMetaTag('meta[name="twitter:site"]', {
    name: 'twitter:site',
    content: '@mdselim',
  });
  upsertMetaTag('meta[name="twitter:creator"]', {
    name: 'twitter:creator',
    content: '@mdselim',
  });
  upsertMetaTag('meta[name="twitter:title"]', {
    name: 'twitter:title',
    content: title,
  });
  upsertMetaTag('meta[name="twitter:description"]', {
    name: 'twitter:description',
    content: description,
  });
  upsertMetaTag('meta[name="twitter:image"]', {
    name: 'twitter:image',
    content: siteConfig.brand.ogImageUrl,
  });
  upsertMetaTag('meta[name="twitter:image:alt"]', {
    name: 'twitter:image:alt',
    content: siteConfig.brand.ogImageAlt,
  });

  // 5. Google Search Console Verification Meta Tag (when configured)
  if (siteConfig.verification.googleSiteVerification) {
    upsertMetaTag('meta[name="google-site-verification"]', {
      name: 'google-site-verification',
      content: siteConfig.verification.googleSiteVerification,
    });
  }

  // 6. Schema.org JSON-LD Structured Data (escaped against script breakout)
  const structuredData = buildRouteStructuredData(route, {
    ...override,
    canonicalUrl,
  });
  let scriptEl = document.head.querySelector<HTMLScriptElement>(
    'script#mdselim-jsonld'
  );
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'mdselim-jsonld';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }
  scriptEl.textContent = safeJsonLdStringify(structuredData);
}
