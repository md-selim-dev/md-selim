export interface ServiceTier {
  id: 'core' | 'supporting' | 'recurring';
  index: string;
  tierLabel: string;
  title: string;
  subtitle: string;
  description: string;
  idealFor: string;
  timeline: string;
  deliverables: string[];
  businessOutcome: string;
}

export interface ProcessPhase {
  step: string;
  title: string;
  duration: string;
  summary: string;
  outputs: string[];
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export const servicesData: {
  tiers: ServiceTier[];
  processPhases: ProcessPhase[];
  faqs: ServiceFaq[];
} = {
  tiers: [
    {
      id: 'core',
      index: '01',
      tierLabel: 'Core Service',
      title: 'Webflow Websites & Landing Pages',
      subtitle: 'Custom-engineered websites built for clarity, trust, and qualified client inquiries.',
      description:
        'Most small service business websites fail because they either look dated or hide what the business actually does behind vague templates. I design and build structured Webflow websites and focused landing pages that communicate your value clearly and guide visitors toward booking a call.',
      idealFor:
        'Service businesses launching a new website, replacing an underperforming site, or creating dedicated campaign landing pages.',
      timeline: '3 to 5 weeks typical build',
      deliverables: [
        'Information architecture and page-by-page wireframe blueprint',
        'Custom responsive Webflow build across desktop, tablet, and mobile viewports',
        'Conversion-structured service pages and lead capture forms',
        'Scalable Webflow CMS setup for case studies, team members, or insights',
        'Clean client-first class naming system for effortless future edits',
        'Recorded video walkthrough training for your internal team',
      ],
      businessOutcome:
        'A credible, fast-loading digital presence that turns prospective visitors into qualified consultation requests.',
    },
    {
      id: 'supporting',
      index: '02',
      tierLabel: 'Supporting Service',
      title: 'Basic On-Page SEO & Technical SEO Setup',
      subtitle: 'A clean, search-ready architectural foundation built into every page.',
      description:
        'A visually appealing website is ineffective if search engines cannot parse its structure or if local prospects cannot find your services. Every site I build—or audit as a standalone engagement—includes rigorous on-page semantic structure and technical SEO fundamentals.',
      idealFor:
        'Businesses launching a new Webflow site or existing service websites suffering from poor indexing, messy headings, or slow load speeds.',
      timeline: '1 to 2 weeks standalone · Included with full builds',
      deliverables: [
        'Semantic HTML5 heading hierarchy (H1–H4) aligned with search intent',
        'Custom title tags, meta descriptions, and OpenGraph social share metadata',
        'LocalBusiness and Service structured data (Schema.org JSON-LD) implementation',
        'XML sitemap configuration, robots.txt setup, and canonical URL governance',
        '301 redirect mapping to preserve existing search equity during redesigns',
        'Image compression, next-gen WebP/AVIF asset formatting, and Core Web Vitals tuning',
        'Google Search Console and analytics verification',
      ],
      businessOutcome:
        'Clear search engine crawlability, stronger local and service keyword relevance, and zero technical bottlenecks.',
    },
    {
      id: 'recurring',
      index: '03',
      tierLabel: 'Recurring Service',
      title: 'Website Updates, Maintenance & Ongoing Improvements',
      subtitle: 'Dependable post-launch stewardship so your website evolves alongside your business.',
      description:
        'Your business does not stand still after launch day. New services are introduced, case studies are completed, and landing pages need refinement based on real client questions. I provide structured monthly or quarterly retainers for ongoing updates and technical health.',
      idealFor:
        'Established service teams that want a dedicated developer on call without hiring full-time internal staff.',
      timeline: 'Monthly or quarterly agreement · 48-hour standard turnaround',
      deliverables: [
        'New service page or campaign landing page additions as offerings expand',
        'Publishing new case studies, testimonials, and insight articles',
        'Monthly technical health, broken link, and form delivery audits',
        'On-page SEO refinements based on Google Search Console query performance',
        'Core Web Vitals and page speed monitoring after content updates',
        'Priority turnaround with transparent task tracking and zero surprise billing',
      ],
      businessOutcome:
        'Long-term peace of mind knowing your website remains fast, accurate, and continuously aligned with your growth goals.',
    },
  ],
  processPhases: [
    {
      step: '01',
      title: 'Discovery & Positioning Alignment',
      duration: 'Week 1',
      summary:
        'We clarify your core services, ideal client profile, primary objections, and conversion goals before touching layout or code.',
      outputs: [
        'Site architecture map',
        'Page-level messaging hierarchy',
        'Search intent & keyword alignment brief',
      ],
    },
    {
      step: '02',
      title: 'UX Wireframing & Visual Direction',
      duration: 'Week 2',
      summary:
        'Every page is structured for scannability and credibility. You review interactive wireframes and visual direction with real copy rather than placeholder text.',
      outputs: [
        'Full desktop & mobile wireframe layouts',
        'Typographic & color system specification',
        'Conversion flow & inquiry form structure',
      ],
    },
    {
      step: '03',
      title: 'Webflow Engineering & Technical SEO',
      duration: 'Weeks 3–4',
      summary:
        'Clean, semantic Webflow development paired with technical SEO setup, schema markup, fast asset delivery, and responsive testing across devices.',
      outputs: [
        'Production-ready Webflow build',
        'On-page & technical SEO implementation',
        'Cross-browser & mobile responsiveness QA',
      ],
    },
    {
      step: '04',
      title: 'Launch, Handover & Ongoing Care',
      duration: 'Week 5 & Beyond',
      summary:
        'Smooth domain connection, 301 redirect verification, Google Search Console indexing, team training walkthroughs, and optional ongoing maintenance.',
      outputs: [
        'Zero-downtime deployment & SSL check',
        'Search Console & sitemap submission',
        'Custom video documentation & ongoing support plan',
      ],
    },
  ],
  faqs: [
    {
      question: 'Why do you specialize in Webflow for small service businesses?',
      answer:
        'Webflow combines clean, semantic HTML/CSS output with visual CMS flexibility and enterprise-grade hosting. Unlike fragile plugin-heavy platforms, Webflow does not require constant security patching, loads rapidly out of the box, and lets business owners edit text and case studies safely.',
    },
    {
      question: 'Do I need to provide finished copywriting before we start?',
      answer:
        'Not necessarily. While you know your business best, I guide the page structure, section prompts, and messaging hierarchy so your services read clearly and concisely. If you have existing copy, I refine and structure it for web readability and on-page SEO.',
    },
    {
      question: 'Can you help if I already have a Webflow site that needs SEO and structural fixes?',
      answer:
        'Yes. You can engage me for a standalone Technical & On-Page SEO Audit and Implementation, or transition your existing Webflow site into an ongoing improvement and maintenance plan.',
    },
    {
      question: 'How does the recurring maintenance and improvement service work?',
      answer:
        'We agree on a predictable monthly scope tailored to your pace—covering content updates, new landing sections, technical SEO checks, and performance monitoring. Requests are handled within 24–48 business hours.',
    },
  ],
};
