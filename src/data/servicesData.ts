export interface ServiceItem {
  id:
    | 'webflow-websites'
    | 'landing-pages'
    | 'on-page-seo'
    | 'technical-seo'
    | 'website-maintenance';
  index: string;
  categoryLabel: 'Core Service' | 'Supporting Service' | 'Recurring Service';
  title: string;
  subtitle: string;
  description: string;
  whoItIsFor: string;
  deliverables: string[];
  exclusions: string[];
}

export interface ProcessPhase {
  step: string;
  title: string;
  summary: string;
  clientInput: string;
  outputs: string[];
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export const servicesData: {
  services: ServiceItem[];
  globalExclusions: {
    title: string;
    reason: string;
  }[];
  processPhases: ProcessPhase[];
  faqs: ServiceFaq[];
} = {
  services: [
    {
      id: 'webflow-websites',
      index: '01',
      categoryLabel: 'Core Service',
      title: 'Webflow Websites',
      subtitle:
        'Multi-page business websites structured for service clarity, credibility, and straightforward management.',
      description:
        'I design and develop custom multi-page websites in Webflow for small service businesses. Instead of forcing your business into a bloated template, every page is structured around what your prospective clients need to understand before making an inquiry.',
      whoItIsFor:
        'Small service businesses building their first professional website or replacing an outdated site that no longer reflects their work.',
      deliverables: [
        'Site architecture planning and page-by-page wireframe structure',
        'Custom responsive Webflow development across desktop, tablet, and mobile breakpoints',
        'Dedicated pages for core services, about, work examples, and contact intake',
        'Webflow CMS collections for articles, projects, or team profiles where needed',
        'Clean, maintainable CSS class organization so future updates do not break layouts',
        'Editor handover guide for updating text and images safely',
      ],
      exclusions: [
        'Custom backend web application software or user authentication portals',
        'E-commerce marketplaces with complex multi-vendor inventory logic',
        'Third-party plugin maintenance on legacy WordPress sites',
      ],
    },
    {
      id: 'landing-pages',
      index: '02',
      categoryLabel: 'Core Service',
      title: 'Focused Landing Pages',
      subtitle:
        'Single-purpose pages designed for a specific service offering, local market, or campaign.',
      description:
        'When you want to highlight a specific service or validate a new offering without rebuilding your entire website, a focused landing page guides visitors through a clear narrative: the problem you solve, how the service works, and how to book a consultation.',
      whoItIsFor:
        'Service providers launching a specific service package, running targeted outreach, or testing a new market segment.',
      deliverables: [
        'Focused single-page content hierarchy and section flow',
        'Clear call-to-action placement and structured lead inquiry form',
        'Fast-loading responsive Webflow implementation',
        'Custom meta title, description, and OpenGraph preview configuration',
        'Integration with your existing domain or subdomain',
      ],
      exclusions: [
        'Paid advertising campaign management (Google Ads / Meta Ads media buying)',
        'Automated multi-month email marketing funnel copywriting',
      ],
    },
    {
      id: 'on-page-seo',
      index: '03',
      categoryLabel: 'Supporting Service',
      title: 'Basic On-Page SEO',
      subtitle:
        'Structuring page content, headings, and metadata so search engines and visitors understand your services.',
      description:
        'On-page SEO ensures that every page communicates its topic clearly to both human readers and search crawlers. I organize your page hierarchy, titles, and internal links around the actual service terms your prospective clients search for.',
      whoItIsFor:
        'Included with every Webflow website build, or available as a structured improvement for existing Webflow sites.',
      deliverables: [
        'Semantic HTML5 heading hierarchy (single H1, logical H2–H3 structure) on every page',
        'Page-specific meta titles and meta descriptions written for clarity and click-through',
        'Clean, readable URL slugs aligned with service structure',
        'Image alt-text review and descriptive file naming',
        'Internal linking structure connecting service pages, work examples, and articles',
      ],
      exclusions: [
        'Paid backlink purchasing or off-page link-building schemes',
        'High-volume automated blog content generation',
        'Guaranteed first-position ranking promises (no ethical practitioner can guarantee search algorithms)',
      ],
    },
    {
      id: 'technical-seo',
      index: '04',
      categoryLabel: 'Supporting Service',
      title: 'Technical SEO Setup',
      subtitle:
        'Configuring indexing controls, structured data, performance basics, and search console readiness.',
      description:
        'Technical SEO removes the hidden barriers that prevent search engines from crawling and indexing your website properly. I configure the essential technical foundation so your site launches cleanly and loads quickly across devices.',
      whoItIsFor:
        'New website launches requiring proper indexing setup, or existing sites recovering from messy migrations and crawl issues.',
      deliverables: [
        'XML sitemap generation and robots.txt configuration',
        'Canonical URL tags on every page to prevent duplicate content issues',
        'Schema.org JSON-LD structured data setup (Organization, LocalBusiness, or Service)',
        '301 redirect mapping when replacing an existing website to preserve working links',
        'Asset compression (WebP/SVG optimization) and Core Web Vitals baseline checks',
        'Google Search Console setup and sitemap submission',
      ],
      exclusions: [
        'Enterprise log-file analysis for million-page portals',
        'Server-level DevOps administration outside Webflow or static hosting environments',
      ],
    },
    {
      id: 'website-maintenance',
      index: '05',
      categoryLabel: 'Recurring Service',
      title: 'Website Updates, Maintenance & Agreed Ongoing Improvements',
      subtitle:
        'Dependable post-launch support to keep your website accurate, healthy, and improving over time.',
      description:
        'A website works best when it stays aligned with your business. Rather than leaving you on your own after launch day, I offer agreed monthly or periodic support for content updates, new sections, and routine technical checks.',
      whoItIsFor:
        'Business owners who want a reliable developer available to handle updates and improvements without hiring in-house staff.',
      deliverables: [
        'Content updates, text revisions, and publishing new case studies or articles',
        'Adding new service sections or landing pages as your offerings evolve',
        'Periodic checks for broken links, form delivery, and mobile layout integrity',
        'On-page metadata and heading adjustments as new pages are added',
        'Clear task tracking and agreed turnaround windows',
      ],
      exclusions: [
        '24/7 emergency IT helpdesk or email server administration',
        'Unscoped full-site redesigns within a standard maintenance allowance',
      ],
    },
  ],
  globalExclusions: [
    {
      title: 'Paid Advertising & Media Buying',
      reason:
        'I build the landing pages and website foundation, but I do not manage Google Ads or social ad budgets.',
    },
    {
      title: 'Off-Page Link Buying & Spam SEO',
      reason:
        'I focus strictly on clean on-page structure and technical SEO fundamentals—never artificial link schemes.',
    },
    {
      title: 'Complex Custom SaaS Web Apps',
      reason:
        'My focus is marketing, credibility, and lead-generation websites for service businesses rather than multi-tenant software products.',
    },
    {
      title: 'Brand Identity & Print Graphic Design',
      reason:
        'I work with your existing logo and brand assets (or clean typographic styling) rather than producing print stationery or trademark illustration.',
    },
  ],
  processPhases: [
    {
      step: '01',
      title: 'Discovery & Content Structure',
      summary:
        'We clarify your services, target audience, page requirements, and what visitors need to know before contacting you.',
      clientInput: 'Brief walkthrough of your business, services, and any existing materials.',
      outputs: [
        'Agreed sitemap and page list',
        'Section-by-section content outline',
        'Clear project scope and timeline schedule',
      ],
    },
    {
      step: '02',
      title: 'Wireframing & Visual Direction',
      summary:
        'I map out the page layouts, typographic hierarchy, and user flow so you can review how the website will read and function before full development.',
      clientInput: 'Feedback on page structure, messaging clarity, and visual tone.',
      outputs: [
        'Wireframe layout blueprint',
        'Responsive desktop and mobile structure',
        'Approved visual design direction',
      ],
    },
    {
      step: '03',
      title: 'Webflow Build & SEO Setup',
      summary:
        'I develop the site in Webflow using clean semantic code, configure CMS collections if required, and implement on-page and technical SEO fundamentals.',
      clientInput: 'Reviewing staging link across desktop and mobile devices.',
      outputs: [
        'Staging website ready for review',
        'Semantic headings, metadata, and Schema.org setup',
        'Optimized assets and validated inquiry forms',
      ],
    },
    {
      step: '04',
      title: 'Launch, Handover & Ongoing Support',
      summary:
        'Once approved, we connect your custom domain, verify SSL and 301 redirects, submit your sitemap to Google Search Console, and transition into optional ongoing care.',
      clientInput: 'Domain DNS access or coordination for launch.',
      outputs: [
        'Live production website',
        'Search Console indexing setup',
        'Walkthrough guide and optional maintenance plan',
      ],
    },
  ],
  faqs: [
    {
      question: 'Why do you use Webflow for small service business websites?',
      answer:
        'Webflow produces clean semantic HTML and CSS, offers reliable fast hosting without fragile plugin updates, and provides a straightforward editor so business owners can update text or publish articles safely.',
    },
    {
      question: 'What is the difference between Basic On-Page SEO and Technical SEO Setup?',
      answer:
        'Basic on-page SEO focuses on the visible structure and metadata of each page—such as heading hierarchy (H1–H3), title tags, meta descriptions, clean URLs, and internal links. Technical SEO focuses on how search engines crawl and index the site—including XML sitemaps, robots.txt, canonical tags, structured data (Schema.org), 301 redirects, and page load performance.',
    },
    {
      question: 'Do I have to sign up for ongoing maintenance after my website launches?',
      answer:
        'No. Every website is built cleanly and handed over with documentation so you can manage routine text edits yourself. Ongoing maintenance and improvement plans are completely optional for clients who prefer hands-off support.',
    },
    {
      question: 'What if I do not have finished website copy yet?',
      answer:
        'I help organize the structure and section prompts for every page so you know exactly what information is needed. If you have rough notes or an existing site, I can refine and structure that material into clear, readable web copy.',
    },
    {
      question: 'How long does a typical website project take?',
      answer:
        'A focused landing page typically takes 1 to 2 weeks. A complete multi-page service business website generally takes 3 to 5 weeks depending on the number of pages and how quickly content feedback is finalized.',
    },
  ],
};
