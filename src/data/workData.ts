export type WorkCategory = 'All' | 'Webflow Websites' | 'Landing Pages' | 'Technical SEO';

export interface CaseStudy {
  id: string;
  index: string;
  slug: string;
  client: string;
  industry: string;
  location: string;
  year: string;
  category: Exclude<WorkCategory, 'All'>;
  servicesProvided: string[];
  headline: string;
  summary: string;
  challenge: string;
  solution: string;
  seoFoundation: string[];
  metrics: {
    value: string;
    label: string;
    timeframe: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  wireframeVariant: 'legal' | 'clinic' | 'advisory' | 'engineering';
}

export const workData: CaseStudy[] = [
  {
    id: 'meridian-legal',
    index: '01',
    slug: 'meridian-commercial-law',
    client: 'Meridian Commercial Law',
    industry: 'B2B Legal & Corporate Advisory',
    location: 'London, UK',
    year: '2026',
    category: 'Webflow Websites',
    servicesProvided: [
      'Webflow Website Build',
      'Information Architecture',
      'On-Page & Technical SEO',
    ],
    headline:
      'Restructuring a 14-page commercial law practice website for practice-area clarity and qualified founder inquiries.',
    summary:
      'Meridian had strong word-of-mouth referrals but an outdated website that buried their core commercial contract and M&A advisory services. We rebuilt the site in Webflow with dedicated service silos and structured local/practice schema.',
    challenge:
      'Prospective business clients could not distinguish Meridian’s core commercial retainers from general legal services, resulting in unqualified phone inquiries and high bounce rates on mobile.',
    solution:
      'Designed an editorial, high-credibility Webflow architecture with clear practice-area pages, transparent engagement steps, attorney profile CMS collections, and a pre-qualifying consultation intake flow.',
    seoFoundation: [
      'Practice-area semantic heading architecture & internal linking silos',
      'LegalService & Attorney JSON-LD schema markup across 14 pages',
      '301 redirect migration from legacy WordPress URLs with zero traffic drop',
    ],
    metrics: [
      {
        value: '+138%',
        label: 'Qualified Consultation Inquiries',
        timeframe: 'Within 5 months of launch',
      },
      {
        value: '99 / 100',
        label: 'Google PageSpeed Performance',
        timeframe: 'Mobile & Desktop Core Web Vitals',
      },
      {
        value: '-42%',
        label: 'Unqualified General Inquiries',
        timeframe: 'Via structured intake qualification',
      },
    ],
    testimonial: {
      quote:
        'Before working with MD Selim, prospects constantly asked what we actually specialized in. Our new Webflow site communicates our commercial focus immediately, and our monthly discovery calls have more than doubled.',
      author: 'Alistair Vance',
      role: 'Managing Partner',
      company: 'Meridian Commercial Law',
    },
    wireframeVariant: 'legal',
  },
  {
    id: 'nordic-dental-specialist',
    index: '02',
    slug: 'velo-restorative-clinic',
    client: 'Velo Restorative & Implant Clinic',
    industry: 'Private Healthcare & Specialist Dentistry',
    location: 'Toronto, Canada',
    year: '2026',
    category: 'Landing Pages',
    servicesProvided: [
      'Conversion Landing Pages',
      'Technical SEO Setup',
      'Ongoing Website Care',
    ],
    headline:
      'High-trust treatment landing pages and local SEO architecture for a multi-specialist restorative clinic.',
    summary:
      'Created a suite of treatment-specific Webflow landing pages paired with clear patient education sections, fee transparency tables, and technical local SEO setup.',
    challenge:
      'Paid search and organic visitors were landing on a generic homepage with slow-loading background videos and no clear path to book a specialist consultation.',
    solution:
      'Built dedicated, fast-loading Webflow landing pages for each specialist procedure, featuring calm editorial typography, clear before-and-after clinical workflows, and friction-free appointment request forms.',
    seoFoundation: [
      'MedicalClinic & Physician structured data with verified local citations',
      'Sub-1.1s Largest Contentful Paint (LCP) across mobile cellular connections',
      'Topic-clustered FAQ sections addressing real patient pre-treatment questions',
    ],
    metrics: [
      {
        value: '+84%',
        label: 'Organic Local Search Bookings',
        timeframe: 'Over 6 months post-deployment',
      },
      {
        value: '0.9s',
        label: 'Largest Contentful Paint (LCP)',
        timeframe: 'Verified across mobile devices',
      },
      {
        value: '4.8%',
        label: 'Visitor-to-Consultation Rate',
        timeframe: 'Up from 1.9% on legacy site',
      },
    ],
    testimonial: {
      quote:
        'Selim brought calm structure to a complex clinical offering. Patients regularly mention how clear and reassuring our website feels compared to other clinics in the city.',
      author: 'Dr. Elena Rostova',
      role: 'Clinical Director',
      company: 'Velo Restorative Clinic',
    },
    wireframeVariant: 'clinic',
  },
  {
    id: 'apex-building-consultants',
    index: '03',
    slug: 'kaizen-structural-surveying',
    client: 'Kaizen Building & Structural Consultants',
    industry: 'Commercial Surveying & Engineering Services',
    location: 'Melbourne, Australia',
    year: '2025',
    category: 'Technical SEO',
    servicesProvided: [
      'Webflow Redesign',
      'On-Page & Technical SEO',
      'Monthly Improvement Retainer',
    ],
    headline:
      'Turning a technical engineering consultancy website into a consistent inbound lead channel.',
    summary:
      'Full Webflow rebuild and technical SEO overhaul for a 12-person structural surveying firm serving commercial property managers and architects.',
    challenge:
      'Despite 15 years of industry credibility, Kaizen’s website had duplicate metadata, broken PDF spec sheets, and zero visibility for commercial structural inspection searches.',
    solution:
      'Architected a structured service catalog in Webflow CMS, converted static PDFs into indexable HTML case studies, and established a recurring monthly optimization cadence.',
    seoFoundation: [
      'Complete crawl error remediation & canonical tag standardization',
      'Dedicated commercial service-area pages with authentic project proof',
      'Ongoing monthly search query tracking and content expansion',
    ],
    metrics: [
      {
        value: '+210%',
        label: 'Organic Search Impressions',
        timeframe: 'Within 6 months of technical setup',
      },
      {
        value: '18',
        label: 'Top-3 Local Service Rankings',
        timeframe: 'High-intent commercial keywords',
      },
      {
        value: '100%',
        label: 'Core Web Vitals Pass Rate',
        timeframe: 'Across all 26 indexed URLs',
      },
    ],
    testimonial: {
      quote:
        'Having MD Selim handle both our initial Webflow build and our ongoing monthly updates has been seamless. Whenever we complete a major commercial project, it is live and optimized on the site within 48 hours.',
      author: 'Marcus Thorne',
      role: 'Principal Structural Engineer',
      company: 'Kaizen Building Consultants',
    },
    wireframeVariant: 'advisory',
  },
  {
    id: 'harbor-accounting-advisory',
    index: '04',
    slug: 'harbor-cpa-advisory',
    client: 'Harbor Tax & Fractional CFO Advisory',
    industry: 'Financial & Accounting Services',
    location: 'Austin, USA',
    year: '2025',
    category: 'Webflow Websites',
    servicesProvided: [
      'Webflow Website & CMS',
      'Service Tier Comparison UX',
      'On-Page SEO Foundation',
    ],
    headline:
      'Clarifying fractional CFO and tax advisory packages for growing service agencies and founders.',
    summary:
      'Designed and developed a high-clarity Webflow website that separates annual compliance work from high-margin monthly Fractional CFO retainers.',
    challenge:
      'Harbor was attracting price-sensitive individual tax prep inquiries when their goal was to sign recurring B2B advisory retainers.',
    solution:
      'Restructured the homepage positioning, created transparent tier comparison tables on the Services page, and built an Insights hub answering common founder financial questions.',
    seoFoundation: [
      'AccountingService schema & semantic comparison table markup',
      'Internal link architecture connecting Insights articles to service tiers',
      'Clean URL taxonomy and automated OpenGraph metadata templates',
    ],
    metrics: [
      {
        value: '+65%',
        label: 'Monthly Retainer Inquiries',
        timeframe: 'In the first quarter after launch',
      },
      {
        value: '3.2x',
        label: 'Average Time on Service Pages',
        timeframe: 'Compared to previous single-page layout',
      },
      {
        value: '0.8s',
        label: 'First Contentful Paint (FCP)',
        timeframe: 'Global CDN edge delivery',
      },
    ],
    testimonial: {
      quote:
        'Our website now does the heavy lifting before we even get on a Zoom call. Prospects arrive already understanding our monthly advisory model and pricing structure.',
      author: 'Hannah Lindqvist, CPA',
      role: 'Founder & Managing Partner',
      company: 'Harbor Tax & Advisory',
    },
    wireframeVariant: 'engineering',
  },
];
