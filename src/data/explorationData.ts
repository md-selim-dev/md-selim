import { RoutePath } from '../config/siteConfig';

/* ============================================================================
   1. WEBSITE CLARITY CHECKER DATA
   ============================================================================ */
export type ClarityAnswerValue = 2 | 1 | 0;

export interface ClarityCriterion {
  id: string;
  index: string;
  category: string;
  question: string;
  helperText: string;
  recommendationIfPartial: string;
  recommendationIfMissing: string;
  strongNote: string;
}

export const clarityCriteria: ClarityCriterion[] = [
  {
    id: 'value-proposition',
    index: '01',
    category: 'Value Proposition Clarity',
    question:
      'Does your homepage headline state clearly what service you provide and the practical outcome you deliver within 5 seconds?',
    helperText:
      'Visitors should not have to scroll or decipher vague slogans to understand what your business actually sells.',
    recommendationIfPartial:
      'Refine your primary hero headline so it names your core service and outcome in plain language rather than broad industry phrases.',
    recommendationIfMissing:
      'Rewrite your above-the-fold hero section immediately: state your core service, who you help, and the primary problem you solve.',
    strongNote: 'Your core value proposition is immediately clear to first-time visitors.',
  },
  {
    id: 'target-audience',
    index: '02',
    category: 'Target Audience Clarity',
    question:
      'Can an ideal client immediately tell that your business is built for their specific industry, size, or need?',
    helperText:
      'Clear audience cues help qualified buyers self-select and reduce inquiries from mismatched prospects.',
    recommendationIfPartial:
      'Add explicit "Who This Is For" statements on your homepage and service pages so right-fit clients recognize themselves.',
    recommendationIfMissing:
      'Define your target client profile clearly in your introduction and service descriptions to attract relevant inquiries.',
    strongNote: 'Prospective clients can quickly verify that your services fit their profile.',
  },
  {
    id: 'service-presentation',
    index: '03',
    category: 'Service Presentation',
    question:
      'Are your services organized into distinct sections or pages with clear deliverables and scope boundaries?',
    helperText:
      'Lumping every capability into a single bulleted list makes it hard for buyers to compare or understand how engagements work.',
    recommendationIfPartial:
      'Expand each core service with a concrete list of deliverables, typical timelines, and what is excluded from scope.',
    recommendationIfMissing:
      'Separate your core, supporting, and recurring offerings into structured service blocks so buyers understand exactly what they are purchasing.',
    strongNote: 'Your services and deliverables are structured for straightforward buyer evaluation.',
  },
  {
    id: 'user-experience',
    index: '04',
    category: 'User Experience (UX)',
    question:
      'Is your navigation simple, predictable, and free of cluttered menus, intrusive popups, or confusing layouts?',
    helperText:
      'Calm visual hierarchy and consistent page structure keep visitors focused on your message.',
    recommendationIfPartial:
      'Simplify your top navigation to 4–5 essential pages and improve heading contrast and spacing between sections.',
    recommendationIfMissing:
      'Restructure your site navigation and page flow so visitors can move logically from overview to proof to contact without friction.',
    strongNote: 'Your site layout supports calm, predictable navigation and reading flow.',
  },
  {
    id: 'cta-visibility',
    index: '05',
    category: 'CTA Visibility',
    question:
      'Does every page have a clear, contextual call-to-action that explains what happens after a visitor reaches out?',
    helperText:
      'Buyers hesitate when buttons use generic labels or when the next step after submitting a form is unclear.',
    recommendationIfPartial:
      'Pair your primary CTA buttons with brief reassurance—such as your response window and what the initial conversation covers.',
    recommendationIfMissing:
      'Add a clear primary action in your header and at the end of key sections, leading to a straightforward project inquiry form.',
    strongNote: 'Visitors have a clear, low-friction path to initiate a conversation.',
  },
  {
    id: 'trust-signals',
    index: '06',
    category: 'Trust Signals',
    question:
      'Does your website demonstrate credibility through real project examples, transparent process steps, and honest scope details?',
    helperText:
      'Credibility is earned through specificity, work examples, and transparent expectations rather than exaggerated claims.',
    recommendationIfPartial:
      'Place relevant work examples, architectural breakdowns, or process steps directly beside your service claims.',
    recommendationIfMissing:
      'Add a dedicated Work or Process section showing how you solve client problems and what working together looks like.',
    strongNote: 'Your site substantiates its service claims with clear process and work proof.',
  },
  {
    id: 'mobile-experience',
    index: '07',
    category: 'Mobile Experience',
    question:
      'Does your website load quickly and read comfortably on smartphones without horizontal scrolling or tiny tap targets?',
    helperText:
      'Many service buyers check your website on their phone before deciding to book a call.',
    recommendationIfPartial:
      'Audit mobile typography spacing, form input sizing, and image compression across smaller viewports.',
    recommendationIfMissing:
      'Rebuild your responsive grid and asset pipeline so mobile pages load rapidly with legible text and accessible controls.',
    strongNote: 'Your mobile experience is fast, legible, and comfortable to use on handheld devices.',
  },
];

/* ============================================================================
   2. EXPLORE MY APPROACH DATA
   ============================================================================ */
export interface ApproachStep {
  id: string;
  stepNumber: string;
  title: string;
  phaseFocus: string;
  summary: string;
  whyItMatters: string;
  keyDecisions: string[];
  clientInvolvement: string;
  deliverableOutputs: string[];
  relatedRoute: {
    label: string;
    path: RoutePath;
  };
}

export const approachSteps: ApproachStep[] = [
  {
    id: 'step-01-positioning',
    stepNumber: '01',
    title: 'Discovery & Positioning Alignment',
    phaseFocus: 'Clarity Before Design',
    summary:
      'Before designing a single screen, we clarify what your business offers, who your ideal clients are, and what questions prospects ask before hiring you.',
    whyItMatters:
      'A visually polished website still fails if the messaging is vague. Aligning on positioning first ensures every page has a clear job.',
    keyDecisions: [
      'Defining primary, supporting, and recurring service offerings clearly',
      'Identifying the core questions and objections prospective clients have',
      'Mapping the exact pages required—avoiding unnecessary page bloat',
    ],
    clientInvolvement:
      'A focused discovery conversation and sharing any existing service notes or website links.',
    deliverableOutputs: [
      'Agreed sitemap and route architecture',
      'Page-by-page messaging hierarchy brief',
      'Clear project timeline and scope boundaries',
    ],
    relatedRoute: {
      label: 'Review Service Scope & Boundaries',
      path: '/services/',
    },
  },
  {
    id: 'step-02-architecture',
    stepNumber: '02',
    title: 'Information Architecture & Wireframing',
    phaseFocus: 'UX Flow & Scannability',
    summary:
      'Each page is structured as a logical sequence—leading from proposition to deliverables, proof, working process, and a contextual next step.',
    whyItMatters:
      'Wireframing with real section goals allows us to verify reading flow and CTA placement before committing to production styling.',
    keyDecisions: [
      'Establishing heading hierarchy (H1–H3) for both human scanners and search engines',
      'Structuring service comparison blocks and FAQ sections',
      'Designing a low-friction inquiry form that collects useful context',
    ],
    clientInvolvement:
      'Reviewing the page structure and confirming that the service descriptions are accurate.',
    deliverableOutputs: [
      'Complete page wireframe blueprint',
      'Section flow and conversion path specification',
      'Approved visual system direction',
    ],
    relatedRoute: {
      label: 'Explore Architecture Examples',
      path: '/work/',
    },
  },
  {
    id: 'step-03-build',
    stepNumber: '03',
    title: 'Webflow Development & Responsive Execution',
    phaseFocus: 'Clean Code & Maintainability',
    summary:
      'The approved structure is built in Webflow (or modular custom code) using systematic CSS class tokens, responsive grids, and editor-friendly CMS collections.',
    whyItMatters:
      'Clean underlying architecture ensures your website loads quickly on mobile devices and remains easy to update months after launch.',
    keyDecisions: [
      'Building reusable components for headers, footers, buttons, and section containers',
      'Configuring CMS collections for projects, articles, or services where applicable',
      'Testing typography, tap targets, and layout balance across desktop, tablet, and mobile',
    ],
    clientInvolvement:
      'Inspecting the live staging link on your computer and phone to share consolidated feedback.',
    deliverableOutputs: [
      'Responsive staging website across all viewports',
      'Structured CMS templates for manageable content publishing',
      'Validated inquiry form and interactive states',
    ],
    relatedRoute: {
      label: 'Read About Technical Standards',
      path: '/about/',
    },
  },
  {
    id: 'step-04-seo',
    stepNumber: '04',
    title: 'On-Page & Technical SEO Setup',
    phaseFocus: 'Search-Ready Foundation',
    summary:
      'Every page is configured with semantic HTML landmarks, custom metadata, Schema.org structured data, and clean indexing controls before launch.',
    whyItMatters:
      'Building SEO into the initial architecture prevents crawl errors and helps prospective clients find your services organically.',
    keyDecisions: [
      'Writing page-specific meta titles, descriptions, and OpenGraph social cards',
      'Implementing JSON-LD structured data (LocalBusiness, ProfessionalService, or Service)',
      'Configuring XML sitemaps, robots.txt, canonical URLs, and 301 redirects',
    ],
    clientInvolvement:
      'Confirming target service locations and primary business contact details.',
    deliverableOutputs: [
      'Complete on-page metadata and heading audit',
      'Schema.org JSON-LD and canonical tag verification',
      'Compressed WebP/SVG assets for fast mobile loading',
    ],
    relatedRoute: {
      label: 'Read SEO Guides in Insights',
      path: '/insights/',
    },
  },
  {
    id: 'step-05-launch-care',
    stepNumber: '05',
    title: 'Launch, Handover & Ongoing Improvements',
    phaseFocus: 'Long-Term Reliability',
    summary:
      'We connect your domain, submit your sitemap to Google Search Console, provide editor documentation, and optionally transition into ongoing maintenance.',
    whyItMatters:
      'Your website should evolve alongside your business—adding new work examples, refining pages, and staying technically healthy over time.',
    keyDecisions: [
      'Executing zero-downtime DNS cutover and SSL verification',
      'Submitting XML sitemaps and checking initial indexing in Google Search Console',
      'Establishing an optional monthly or periodic rhythm for updates and improvements',
    ],
    clientInvolvement:
      'Domain DNS coordination and choosing whether to manage edits internally or use ongoing support.',
    deliverableOutputs: [
      'Live production website on your primary domain',
      'Editor handover documentation',
      'Optional recurring maintenance and improvement schedule',
    ],
    relatedRoute: {
      label: 'Start a Project Conversation',
      path: '/contact/',
    },
  },
];

/* ============================================================================
   3. SMALL BUSINESS IMPROVEMENT EXPLORER DATA
   ("You Have a Small Business. What Would You Improve First?")
   ============================================================================ */
export interface BusinessImprovementScenario {
  id: string;
  index: string;
  situationLabel: string;
  situationStatement: string;
  improveFirstTitle: string;
  whyThisFirst: string;
  recommendedService: string;
  firstThreeActions: string[];
  whatCanWait: string;
  ctaLabel: string;
  ctaRoute: RoutePath;
}

export const businessImprovementScenarios: BusinessImprovementScenario[] = [
  {
    id: 'unclear-offering',
    index: '01',
    situationLabel: 'Unclear Positioning',
    situationStatement:
      '"People visit our website, but they still ask what we actually specialize in or how our services work."',
    improveFirstTitle: 'Improve First: Homepage Positioning & Service Page Structure',
    whyThisFirst:
      'Driving more traffic to an unclear website only wastes attention. Before spending money on ads or extra articles, your core pages must explain what you do, who you help, and what is included in each service.',
    recommendedService: 'Core Service · Webflow Website Rebuild or Service Page Restructuring',
    firstThreeActions: [
      'Rewrite your homepage hero section to state your exact service and target client in plain English.',
      'Separate your offerings into distinct sections or pages with clear deliverables and exclusions.',
      'Add a 3–4 step "How We Work Together" section so prospects understand how engagements run.',
    ],
    whatCanWait:
      'Hold off on paid advertising campaigns or high-volume blog publishing until your core service pages convert visitors clearly.',
    ctaLabel: 'Explore Webflow Website Services',
    ctaRoute: '/services/',
  },
  {
    id: 'invisible-in-search',
    index: '02',
    situationLabel: 'Low Search Visibility',
    situationStatement:
      '"We rely almost entirely on word-of-mouth referrals and rarely appear when prospects search for our services."',
    improveFirstTitle: 'Improve First: Basic On-Page & Technical SEO Foundation',
    whyThisFirst:
      'Search engines cannot rank your business for specific services if your pages lack semantic heading structure, service-specific titles, clean URLs, and indexable HTML content.',
    recommendedService: 'Supporting Service · Basic On-Page SEO & Technical SEO Setup',
    firstThreeActions: [
      'Create a dedicated, indexable HTML page or structured section for each primary service you sell.',
      'Fix heading hierarchy (one H1 per page, logical H2 subtopics) and write clear meta titles and descriptions.',
      'Configure XML sitemaps, canonical tags, LocalBusiness/Service Schema.org markup, and Google Search Console.',
    ],
    whatCanWait:
      'Avoid paying for backlink packages or automated AI blog posts before your core service pages are properly structured and indexed.',
    ctaLabel: 'Review On-Page & Technical SEO Scope',
    ctaRoute: '/services/',
  },
  {
    id: 'specific-campaign-or-offer',
    index: '03',
    situationLabel: 'New Service or Campaign',
    situationStatement:
      '"We want to promote one specific high-value service package, but sending people to our general homepage distracts them."',
    improveFirstTitle: 'Improve First: A Focused, Single-Purpose Landing Page',
    whyThisFirst:
      'When promoting a specific service or outreach campaign, a dedicated landing page removes competing navigation links and walks the visitor through one clear decision.',
    recommendedService: 'Core Service · Focused Webflow Landing Page',
    firstThreeActions: [
      'Define one specific audience problem and one clear service offer for the page.',
      'Include concrete scope deliverables, common FAQs, and relevant architecture or work proof.',
      'Place a focused consultation request form directly on the page with clear response expectations.',
    ],
    whatCanWait:
      'You do not need to rebuild your entire multi-page website right away if your immediate priority is validating or scaling one specific offering.',
    ctaLabel: 'Discuss a Focused Landing Page',
    ctaRoute: '/contact/',
  },
  {
    id: 'outdated-mobile-and-hard-to-edit',
    index: '04',
    situationLabel: 'Outdated & Hard to Edit',
    situationStatement:
      '"Our current website looks dated on mobile phones, loads slowly, and breaks whenever we try to update text."',
    improveFirstTitle: 'Improve First: Clean Webflow Architecture & Responsive Rebuild',
    whyThisFirst:
      'A fragile, plugin-heavy website costs time and erodes trust with mobile visitors. Moving to a clean Webflow architecture solves mobile responsiveness, speed, and editing ease at once.',
    recommendedService: 'Core Service · Custom Webflow Website + 301 Redirect Migration',
    firstThreeActions: [
      'Audit existing URLs and map 301 redirects so you do not lose existing search links during the rebuild.',
      'Rebuild the site in Webflow with a consistent design system and mobile-first responsive grids.',
      'Set up clean CMS collections so your team can update text, articles, or projects without breaking layouts.',
    ],
    whatCanWait:
      'Complex interactive widgets can wait until your foundational pages load fast and read cleanly on every device.',
    ctaLabel: 'See Reference Website Architectures',
    ctaRoute: '/work/',
  },
  {
    id: 'neglected-post-launch',
    index: '05',
    situationLabel: 'Stale Content & No Maintenance',
    situationStatement:
      '"Our website foundation is decent, but our service details are outdated and nobody is maintaining or improving it."',
    improveFirstTitle: 'Improve First: Structured Updates & Ongoing Website Maintenance',
    whyThisFirst:
      'Even a well-built website loses credibility when services change, forms stop working, or pages look abandoned. Small, steady improvements keep your site accurate without a full rebuild.',
    recommendedService:
      'Recurring Service · Website Updates, Maintenance & Agreed Ongoing Improvements',
    firstThreeActions: [
      'Run a technical health check on all forms, links, mobile layouts, and metadata.',
      'Update service descriptions and add recent project examples or FAQs based on real client questions.',
      'Establish a predictable monthly or quarterly rhythm for ongoing updates and improvements.',
    ],
    whatCanWait:
      'Skip a costly full redesign if your underlying platform and layout structure are already sound.',
    ctaLabel: 'Inquire About Ongoing Website Care',
    ctaRoute: '/contact/',
  },
];

/* ============================================================================
   4. EXPLORE & DISCOVER DATA (5 REQUIRED TOPICS)
   ============================================================================ */
export interface DiscoveryTopic {
  id: string;
  index: string;
  title: string;
  shortSubtitle: string;
  summary: string;
  corePoints: {
    heading: string;
    detail: string;
  }[];
  practicalTakeaway: string;
  relatedLink: {
    label: string;
    path: RoutePath;
  };
}

export const discoveryTopics: DiscoveryTopic[] = [
  {
    id: 'why-websites-fail-to-convert',
    index: '01',
    title: 'Why do some websites fail to convert?',
    shortSubtitle: 'Positioning friction, unclear scope, and hidden next steps.',
    summary:
      'Most service business websites do not fail because of color palettes—they fail because visitors cannot quickly answer what the business does, whether it is credible, and what happens after they click "Contact."',
    corePoints: [
      {
        heading: 'Vague Above-the-Fold Messaging',
        detail:
          'When a homepage leads with abstract phrases instead of naming the specific service and target client, qualified buyers bounce within seconds.',
      },
      {
        heading: 'Unanswered Buyer Questions',
        detail:
          'Prospective clients want to know what is included, what is excluded, and how the process works before committing to a phone call.',
      },
      {
        heading: 'High-Friction Inquiry Forms',
        detail:
          'Contact pages that offer no context on response times or next steps make reaching out feel uncertain.',
      },
    ],
    practicalTakeaway:
      'Conversion improves when you replace marketing hype with plain-language service definitions, transparent process steps, and a clear consultation intake flow.',
    relatedLink: {
      label: 'Read Insights on Website Clarity',
      path: '/insights/',
    },
  },
  {
    id: '5-mistakes-that-damage-business-websites',
    index: '02',
    title: '5 mistakes that damage business websites.',
    shortSubtitle: 'Common structural and technical pitfalls that erode trust.',
    summary:
      'Small service businesses frequently invest in a website only to have its effectiveness undermined by five avoidable structural mistakes:',
    corePoints: [
      {
        heading: '01. Listing Every Service on One Crowded Page',
        detail:
          'Combining all services onto a single generic page weakens both buyer clarity and search engine relevance for specific service queries.',
      },
      {
        heading: '02. Choosing Heading Tags by Font Size Instead of Hierarchy',
        detail:
          'Using multiple H1 tags or skipping heading levels confuses search crawlers and screen readers.',
      },
      {
        heading: '03. Hiding Key Service Information Inside PDF Downloads',
        detail:
          'Mobile users dislike downloading PDFs, and search engines index structured HTML pages far more effectively.',
      },
      {
        heading: '04. Overloading Pages with Heavy Scripts and Uncompressed Media',
        detail:
          'Slow mobile load times and layout shifts cause prospective clients to abandon the page before reading a word.',
      },
      {
        heading: '05. Launching and Neglecting the Website for Years',
        detail:
          'Outdated service offerings, broken links, or unmonitored forms quietly damage credibility with referrals.',
      },
    ],
    practicalTakeaway:
      'Avoiding these five mistakes requires disciplined page architecture, clean semantic HTML, and routine post-launch care.',
    relatedLink: {
      label: 'See How Services Address These Issues',
      path: '/services/',
    },
  },
  {
    id: 'what-makes-a-website-trustworthy',
    index: '03',
    title: 'What makes a website trustworthy?',
    shortSubtitle: 'Specificity, restraint, technical polish, and honest boundaries.',
    summary:
      'Online credibility is built the same way offline trust is built: through clarity, consistency, and honesty rather than exaggerated promises.',
    corePoints: [
      {
        heading: 'Specificity Over Superlatives',
        detail:
          'Explaining your exact deliverables, working process, and scope exclusions builds far more trust than claiming to be "the #1 leading provider."',
      },
      {
        heading: 'Visual Restraint & Typographic Discipline',
        detail:
          'Consistent spacing, readable contrast, and calm layouts signal professional care and attention to detail.',
      },
      {
        heading: 'Technical Reliability Across Devices',
        detail:
          'Fast page loads, working navigation, clean URLs, and error-free forms show that your business is active and dependable.',
      },
    ],
    practicalTakeaway:
      'A trustworthy website respects the visitor’s intelligence—presenting clear information in a calm, well-engineered environment.',
    relatedLink: {
      label: 'Explore Reference Work & Architecture',
      path: '/work/',
    },
  },
  {
    id: 'seo-vs-aeo-vs-geo',
    index: '04',
    title: 'SEO vs AEO vs GEO.',
    shortSubtitle: 'How search engines, answer engines, and generative engines read your site.',
    summary:
      'While acronyms evolve—from Search Engine Optimization (SEO) to Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO)—the underlying technical foundation for small service businesses remains remarkably consistent.',
    corePoints: [
      {
        heading: 'SEO (Search Engine Optimization)',
        detail:
          'Focuses on helping traditional search engines (like Google and Bing) crawl, index, and rank your pages using clean URLs, semantic headings, meta tags, sitemaps, and fast page performance.',
      },
      {
        heading: 'AEO (Answer Engine Optimization)',
        detail:
          'Focuses on structuring direct, concise answers to specific buyer questions (such as well-organized FAQs and Schema.org structured data) so search features and voice assistants can extract accurate answers.',
      },
      {
        heading: 'GEO (Generative Engine Optimization)',
        detail:
          'Focuses on clear entity definitions, transparent service specifications, and authoritative structured HTML so AI-assisted search summaries can accurately understand who you are, what services you provide, and where you operate.',
      },
    ],
    practicalTakeaway:
      'You do not need separate gimmicks for SEO, AEO, and GEO. Clean semantic HTML5, dedicated service pages, explicit FAQs, and accurate Schema.org JSON-LD support all three simultaneously.',
    relatedLink: {
      label: 'Read Technical SEO Articles in Insights',
      path: '/insights/',
    },
  },
  {
    id: 'how-website-design-influences-customer-decisions',
    index: '05',
    title: 'How website design influences customer decisions.',
    shortSubtitle: 'Cognitive load, visual hierarchy, and buyer confidence.',
    summary:
      'Good website design is not decoration—it is visual organization that reduces cognitive effort and helps a prospective client make a confident decision.',
    corePoints: [
      {
        heading: 'First-Impression Credibility Calibration',
        detail:
          'Within seconds of arrival, visitors subconsciously judge whether a business feels established and organized based on layout balance, typography, and spacing.',
      },
      {
        heading: 'Guiding Attention Through Hierarchy',
        detail:
          'Clear visual hierarchy ensures visitors read the most important positioning points first, followed by supporting details and proof, without feeling overwhelmed.',
      },
      {
        heading: 'Reducing Decision Fatigue',
        detail:
          'When navigation is predictable and each section leads naturally to a single clear call-to-action, prospective clients can evaluate your services calmly and reach out with confidence.',
      },
    ],
    practicalTakeaway:
      'Design serves business growth best when it eliminates confusion and makes your expertise effortless to understand.',
    relatedLink: {
      label: 'Discuss Your Website Design & Structure',
      path: '/contact/',
    },
  },
];
