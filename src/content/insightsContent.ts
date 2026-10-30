export type InsightTopic =
  | 'All Topics'
  | 'Website Clarity'
  | 'Webflow Architecture'
  | 'On-Page & Technical SEO'
  | 'Website Maintenance';

export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  topic: Exclude<InsightTopic, 'All Topics'>;
  publishedDate: string;
  readTime: string;
  excerpt: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    body: string[];
  }[];
}

export const insightsContent: InsightArticle[] = [
  {
    id: 'clarity-first-service-websites',
    slug: 'why-small-service-websites-lose-inquiries-to-unclear-positioning',
    title: 'Why Small Service Websites Lose Qualified Inquiries to Unclear Positioning',
    topic: 'Website Clarity',
    publishedDate: 'October 2026',
    readTime: '5 min read',
    excerpt:
      'When a prospect visits your website, they are looking for three immediate answers: what you do, whether you are credible, and how your engagement works. Here is how to structure your pages so visitors convert.',
    keyTakeaways: [
      'Replace abstract slogans in your hero section with a plain-language statement of the service you deliver and who you help.',
      'Pair every capability claim with an adjacent case study metric or concrete client outcome.',
      'Reduce friction in your inquiry flow by explaining what happens after a prospect submits your contact form.',
    ],
    sections: [
      {
        heading: '01. The Five-Second Clarity Test',
        body: [
          'Prospective clients rarely read a service website word-for-word on their first visit. Instead, they scan headings to confirm they are in the right place. When a homepage opens with vague phrases like "Empowering Tomorrow’s Solutions," visitors are forced to guess what the business actually sells.',
          'High-performing service websites state their positioning immediately: the specific service offered, the audience served, and the tangible outcome delivered. Clarity signals confidence and respect for the buyer’s time.',
        ],
      },
      {
        heading: '02. Structuring Service Pages as a Logical Argument',
        body: [
          'Every service page should follow a deliberate sequence: Proposition, Mechanism, Proof, and Action. First, define the problem and your service clearly. Second, outline the exact deliverables and timeline so the buyer understands how you work.',
          'Third, place relevant case studies or client testimonials directly beside those claims. Finally, offer one clear next step—such as requesting a consultation—without competing secondary popups.',
        ],
      },
      {
        heading: '03. Setting Expectations Before the First Call',
        body: [
          'Service buyers hesitate to fill out contact forms when they do not know what will happen next. Adding response window expectations, typical project timelines, and a brief 3-step onboarding overview increases both inquiry volume and lead quality.',
        ],
      },
    ],
  },
  {
    id: 'technical-seo-checklist-webflow',
    slug: 'essential-on-page-and-technical-seo-setup-for-webflow-sites',
    title: 'Essential On-Page and Technical SEO Setup for Service Business Websites',
    topic: 'On-Page & Technical SEO',
    publishedDate: 'September 2026',
    readTime: '6 min read',
    excerpt:
      'Search engine visibility does not require tricks—it requires a clean architectural foundation. Learn which on-page and technical SEO configurations actually move the needle for small service businesses.',
    keyTakeaways: [
      'Maintain a strict single-H1 semantic heading hierarchy on every page aligned with specific service intent.',
      'Configure canonical tags, clean trailing-slash URL structure, and XML sitemaps before indexing.',
      'Use LocalBusiness and Service JSON-LD structured data to help search engines understand your offerings and location.',
    ],
    sections: [
      {
        heading: '01. Semantic HTML Heading Hierarchy',
        body: [
          'One of the most common mistakes in visual web development is choosing heading tags (H1, H2, H3) based on font size rather than document structure. Search crawlers rely on heading hierarchy to understand the primary topic and subtopics of a page.',
          'Every page must have exactly one H1 that clearly names the service or topic, supported by logical H2 sections for deliverables, proof, and frequently asked questions.',
        ],
      },
      {
        heading: '02. Dedicated Pages Per Core Service',
        body: [
          'Listing ten distinct services on a single bulleted page makes it difficult to rank for any specific search query. By creating focused pages or structured sections with clear metadata for each core capability, both search engines and human visitors find exact matches for their needs.',
        ],
      },
      {
        heading: '03. Core Web Vitals & Asset Discipline',
        body: [
          'Page speed is both a ranking signal and a user experience necessity. Compressing images to modern formats, avoiding heavy third-party tracking scripts, and reserving explicit dimensions for visual containers eliminates layout shift and keeps mobile load times under one second.',
        ],
      },
    ],
  },
  {
    id: 'webflow-architecture-for-scalability',
    slug: 'structuring-webflow-websites-for-long-term-maintainability',
    title: 'Structuring Webflow Websites for Long-Term Maintainability',
    topic: 'Webflow Architecture',
    publishedDate: 'August 2026',
    readTime: '4 min read',
    excerpt:
      'A professional website should be just as clean under the hood as it is on screen. How reusable components, systematic class naming, and thoughtful CMS design save businesses time and money after launch.',
    keyTakeaways: [
      'A systematic class naming convention prevents style collisions when adding new sections months after launch.',
      'Separating content (CMS collections) from layout templates lets non-technical team members publish safely.',
      'Reusable section containers and typography tokens keep brand consistency intact across dozens of pages.',
    ],
    sections: [
      {
        heading: '01. Why Messy Builds Become Expensive Later',
        body: [
          'When a website is built hastily with one-off inline styles and inconsistent spacing classes, even a small update—like adding a new service tier or case study—can break mobile layouts across the site.',
          'Investing in modular layout architecture upfront means future pages can be assembled in hours rather than days.',
        ],
      },
      {
        heading: '02. Designing Editor-Friendly CMS Collections',
        body: [
          'Your team should never have to worry about breaking the design grid when publishing an article or adding a client testimonial. By structuring CMS fields with clear character guidelines and validation, your website stays pristine as content grows.',
        ],
      },
    ],
  },
  {
    id: 'post-launch-website-maintenance-guide',
    slug: 'why-ongoing-website-updates-compound-credibility',
    title: 'Why Ongoing Website Updates and Maintenance Compound Credibility Over Time',
    topic: 'Website Maintenance',
    publishedDate: 'July 2026',
    readTime: '4 min read',
    excerpt:
      'Launching a website is the starting line, not the finish. How regular content updates, technical checks, and iterative improvements turn a static brochure into a compounding growth asset.',
    keyTakeaways: [
      'Outdated team pages, old copyright dates, or broken inquiry forms quietly erode trust with high-value prospects.',
      'Publishing new case studies and answering real client questions in an Insights hub steadily expands organic search reach.',
      'Scheduled technical audits catch broken redirects and indexing issues before they affect lead flow.',
    ],
    sections: [
      {
        heading: '01. Avoiding the "Launch and Neglect" Cycle',
        body: [
          'Many businesses redesign their website every four years because they neglect it in between. By the third year, the site no longer reflects their best work or current pricing model.',
          'A structured monthly or quarterly update rhythm keeps your positioning sharp and prevents costly emergency rebuilds.',
        ],
      },
      {
        heading: '02. Iterative Improvements Based on Real Inquiries',
        body: [
          'The best website improvements come directly from the questions prospects ask on sales calls. When you consistently hear the same question, adding a clear section or FAQ to your Services page pre-qualifies future visitors automatically.',
        ],
      },
    ],
  },
];
