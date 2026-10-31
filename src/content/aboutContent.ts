export interface PrincipleItem {
  index: string;
  title: string;
  description: string;
}

export interface CapabilityGroup {
  index: string;
  title: string;
  summary: string;
  items: string[];
}

export interface StackSpecification {
  category: string;
  tools: string;
  purpose: string;
}

/**
 * Grounded, transparent About page content for MD Selim.
 * No invented credentials, fabricated awards, or exaggerated claims.
 */
export const aboutContent = {
  kicker: 'About MD Selim',
  headline:
    'Focused on building clear, credible, and search-ready websites for small service businesses.',
  lead: 'I am MD Selim, an independent web developer focused on Webflow websites, landing pages, on-page and technical SEO setup, and ongoing website maintenance.',
  background: [
    'Many small service businesses deliver reliable, high-value work in the real world, yet their websites make it difficult for new prospects to understand what they offer. Common issues include cluttered pages, unclear service descriptions, slow mobile performance, and missing search engine fundamentals.',
    'My work is centered on solving those practical problems. Rather than treating a website as an art project or loading it with distracting animations, I approach web development with a focus on structure, readability, and long-term usefulness.',
    'When you work with me, you communicate directly with the person planning your page structure, building the site in Webflow or custom code, configuring your on-page and technical SEO foundation, and supporting your updates after launch.',
  ],
  capabilities: [
    {
      index: '01',
      title: 'Webflow Development & Responsive UX',
      summary:
        'Building structured multi-page websites and focused landing pages that read clearly on every screen size.',
      items: [
        'Information architecture and page wireframing',
        'Custom responsive Webflow builds (desktop, tablet, mobile)',
        'Clean CMS collections for projects, services, and articles',
        'Maintainable CSS class naming and reusable components',
      ],
    },
    {
      index: '02',
      title: 'On-Page & Technical SEO Setup',
      summary:
        'Ensuring every page is properly structured for search engine crawlers and human visitors from day one.',
      items: [
        'Semantic HTML5 heading hierarchy (H1–H3) and clean URL structure',
        'Custom meta titles, meta descriptions, and OpenGraph tags',
        'XML sitemaps, robots.txt, canonical tags, and 301 redirect mapping',
        'Schema.org JSON-LD structured data and Google Search Console setup',
      ],
    },
    {
      index: '03',
      title: 'Ongoing Maintenance & Iterative Improvements',
      summary:
        'Keeping websites accurate, functional, and aligned with business changes after launch.',
      items: [
        'Content updates, new service sections, and landing page additions',
        'Routine checks for broken links, forms, and layout consistency',
        'Performance monitoring and image/asset optimization',
      ],
    },
  ] as CapabilityGroup[],
  principles: [
    {
      index: '01',
      title: 'Clarity Over Complexity',
      description:
        'Visitors should immediately understand what your business does, who you serve, and how to contact you without wading through jargon.',
    },
    {
      index: '02',
      title: 'Credibility Through Restraint',
      description:
        'Professional trust comes from clean typography, well-organized information, honest scope descriptions, and fast-loading pages.',
    },
    {
      index: '03',
      title: 'SEO Built Into the Structure',
      description:
        'Search readiness is not an add-on plugin. Semantic headings, clean URLs, metadata, and indexing controls belong in the initial build.',
    },
    {
      index: '04',
      title: 'Straightforward Maintainability',
      description:
        'A website should be easy to update months and years after launch. Every layout and CMS collection is built to remain manageable.',
    },
  ] as PrincipleItem[],
  technicalStandards: [
    {
      category: 'Core Development',
      tools: 'Webflow · Semantic HTML5 · Modern CSS3 · TypeScript',
      purpose: 'Clean, modular component architecture without bloated plugins.',
    },
    {
      category: 'On-Page & Technical SEO',
      tools: 'Schema.org JSON-LD · Search Console · XML Sitemaps · Canonicals',
      purpose: 'Clear search engine crawlability and structured service relevance.',
    },
    {
      category: 'UX & Accessibility',
      tools: 'Responsive Breakpoints · High-Contrast Typography · Keyboard Navigation',
      purpose: 'Readable, accessible experience across desktop and mobile devices.',
    },
    {
      category: 'Content & Maintenance',
      tools: 'Webflow CMS · Markdown Publishing · 301 Redirect Governance',
      purpose: 'Dependable ongoing content updates and technical health.',
    },
  ] as StackSpecification[],
};
