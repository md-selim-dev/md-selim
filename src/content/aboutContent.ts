export interface PrincipleItem {
  index: string;
  title: string;
  description: string;
}

export interface StackSpecification {
  category: string;
  tools: string;
  purpose: string;
}

export const aboutContent = {
  kicker: 'About MD Selim',
  headline: 'Building websites that prioritize clarity, credibility, and measurable business growth.',
  lead: 'I am an independent Webflow developer and technical SEO architect. I partner with small service businesses to turn complex, word-of-mouth expertise into clear, trustworthy, and search-ready websites.',
  narrative: [
    'Many small service businesses—consultancies, legal practices, healthcare clinics, financial advisors, and specialized contractors—deliver exceptional work offline, yet their websites fail to reflect that standard. Visitors are often met with vague headlines, cluttered navigation, slow load times, or neglected pages that have not been updated in years.',
    'My work focuses on bridging that credibility gap. Rather than chasing flashy trends or unnecessary animations that distract prospective buyers, I approach web development as an exercise in clarity and structure.',
    'Every project combines three practical pillars: a custom Webflow website or landing page designed for strong user experience, a clean on-page and technical SEO foundation so prospects can find you, and dependable ongoing support so your site keeps pace as your business grows.',
  ],
  principles: [
    {
      index: '01',
      title: 'Clarity Over Complexity',
      description:
        'A prospective client should understand what you do, who you serve, and how to take the next step within five seconds of landing on any page.',
    },
    {
      index: '02',
      title: 'Credibility Through Restraint',
      description:
        'Trust is built through disciplined typography, generous whitespace, concrete proof, and fast performance—never through gimmicks or visual noise.',
    },
    {
      index: '03',
      title: 'SEO as Architecture, Not an Afterthought',
      description:
        'Search visibility starts in the HTML structure. Heading hierarchy, clean URLs, schema markup, and fast asset delivery are engineered into the build from day one.',
    },
    {
      index: '04',
      title: 'Long-Term Maintainability',
      description:
        'Your website is a living business asset. Every component and CMS collection is structured cleanly so updates, new pages, and ongoing improvements remain straightforward.',
    },
  ] as PrincipleItem[],
  technicalStandards: [
    {
      category: 'Core Development',
      tools: 'Webflow · Semantic HTML5 · Modern CSS3 · TypeScript',
      purpose: 'Clean, maintainable component architecture with zero bloated plugins.',
    },
    {
      category: 'On-Page & Technical SEO',
      tools: 'Schema.org JSON-LD · Google Search Console · XML Sitemaps · Canonical Governance',
      purpose: 'Structured crawlability and clear search intent alignment for service keywords.',
    },
    {
      category: 'Performance & Accessibility',
      tools: 'Core Web Vitals Optimization · WCAG AA Contrast · Responsive Grid Systems',
      purpose: 'Sub-second perceived load times and legible, accessible interfaces across all devices.',
    },
    {
      category: 'Ongoing Operations',
      tools: 'Structured CMS Workflows · 301 Redirect Mapping · Monthly Health Audits',
      purpose: 'Continuous post-launch reliability and effortless content publishing.',
    },
  ] as StackSpecification[],
};
