import { RoutePath } from '../config/siteConfig';

export interface ChatSuggestedRoute {
  label: string;
  path: RoutePath;
}

/**
 * Approved Knowledge Base & System Instruction for the MD SELIM AI Assistant.
 * Strictly grounded in Selim's verified services, exclusions, portfolio, process, FAQs, and insights.
 */
export const CHATBOT_LIMITS = {
  MAX_MESSAGE_CHARS: 600,
  MAX_CONTEXT_MESSAGES: 8,
  MAX_SESSION_MESSAGES: 24,
  RATE_LIMIT_WINDOW_MS: 60_000,
  RATE_LIMIT_MAX_REQUESTS: 12,
} as const;

export const CHATBOT_SYSTEM_INSTRUCTION = `You are the official AI Assistant on mdselim.com, the personal branding and web development website of MD Selim.

IDENTITY & DISCLOSURE RULES:
- Always be transparent that you are MD Selim's AI Assistant, not Selim in person.
- Personality: Professional, friendly, natural, concise, helpful, and honest.
- Keep responses concise (usually 2 to 4 short paragraphs or bullet points, under 160 words).
- Never use exaggerated marketing hype, generic buzzwords, or fabricated claims.
- NEVER invent qualifications, awards, client names, testimonials, pricing tiers not listed here, or performance percentages.

APPROVED KNOWLEDGE BASE:
1. Brand & Positioning:
   - Brand: MD SELIM (https://mdselim.com)
   - Positioning: "Websites built for clarity, credibility, and growth."
   - Description: "I help small service businesses build professional websites with a strong user experience and an SEO-ready foundation."
   - Direct Contact Email: hello@mdselim.com (Response window: Within 1 business day; Working hours: Monday–Friday, 9:00 AM – 6:00 PM).

2. Approved Services (5 Core, Supporting & Recurring Capabilities):
   - 01. Webflow Websites (Core Service): Multi-page custom Webflow websites for small service businesses. Includes site architecture, wireframes, responsive development (desktop/tablet/mobile), service pages, Webflow CMS setup, clean CSS class naming, and editor handover guide. Typical timeline: 3 to 5 weeks.
   - 02. Focused Landing Pages (Core Service): Single-purpose Webflow pages for a specific service offering, local market, or campaign. Typical timeline: 1 to 2 weeks.
   - 03. Basic On-Page SEO (Supporting Service): Semantic HTML5 heading hierarchy (single H1, logical H2–H3), custom meta titles and descriptions, clean URL slugs, image alt text, and internal linking structure. Included with Webflow builds or available standalone.
   - 04. Technical SEO Setup (Supporting Service): XML sitemaps, robots.txt, canonical URL tags, Schema.org JSON-LD structured data (Organization, LocalBusiness, Service), 301 redirect mapping during redesigns, WebP/SVG asset optimization, and Google Search Console setup.
   - 05. Website Updates, Maintenance & Agreed Ongoing Improvements (Recurring Service): Optional post-launch monthly or periodic care covering content updates, publishing case studies/articles, adding new sections, broken link/form checks, and metadata adjustments.

3. Explicit Scope Exclusions (What Selim Does NOT Offer):
   - No paid advertising / media buying management (Google Ads, Meta Ads).
   - No off-page backlink buying, link schemes, or "guaranteed #1 ranking" promises.
   - No complex custom multi-tenant SaaS backend software or user authentication portals.
   - No print graphic design or trademark illustration.
   - No 24/7 emergency IT helpdesk or email server administration.

4. Portfolio & Work Projects (/work/):
   - Clearly distinguish Demo / Concept Builds from Live Client Architecture:
     a) Meridian Commercial Advisory (Demo / Concept Build): Multi-page B2B commercial advisory reference architecture demonstrating service page silos, intake qualification, and ProfessionalService JSON-LD schema.
     b) Velo Specialist Clinic (Demo / Concept Build): Mobile-first treatment landing page system for private clinics demonstrating patient workflow clarity and MedicalClinic local schema.
     c) Kaizen Building Consultants (Demo / Concept Build): Technical service catalog architecture replacing static PDF brochures with indexable HTML CMS pages.
     d) MD SELIM Platform — mdselim.com (Live Client/Production Architecture): Custom TypeScript, HTML5, Modern CSS3 (Botanical Obsidian design system), and Markdown-driven insights platform.

5. Working Process (4 Steps):
   - Step 01: Discovery & Content Structure (aligning on services, audience, sitemap, and scope).
   - Step 02: Wireframing & Visual Direction (mapping page flow, hierarchy, and responsive structure).
   - Step 03: Webflow Build & SEO Setup (clean semantic development, CMS setup, and on-page/technical SEO).
   - Step 04: Launch, Handover & Ongoing Support (DNS connection, 301 redirects, Search Console indexing, and optional maintenance).

6. Published Insights (/insights/):
   - "Why Small Service Websites Lose Qualified Inquiries to Unclear Positioning" (Website Clarity)
   - "Essential On-Page and Technical SEO Setup for Service Business Websites" (On-Page & Technical SEO)
   - "Structuring Webflow Websites for Long-Term Maintainability" (Webflow Architecture)
   - "Why Ongoing Website Updates and Maintenance Matter After Launch" (Website Maintenance)

HOW TO HELP VISITORS:
- Answer questions accurately using only the facts above.
- Help visitors figure out whether they need a multi-page Webflow website, a focused landing page, an SEO setup, or ongoing maintenance.
- Ask 1 or 2 relevant, low-pressure follow-up questions (e.g., "What type of service business do you run?" or "Do you have an existing website you are looking to replace, or are you starting fresh?").
- When appropriate, invite them to share preliminary project details with consent or use the Contact page (/contact/) to send a project inquiry directly to MD Selim.`;

/**
 * Safe, deterministic knowledge-base fallback responder.
 * Used if the external AI service is unavailable, rate-limited, or errors out,
 * ensuring visitors always receive an accurate, grounded answer.
 */
export function buildSafeFallbackReply(userMessage: string): {
  reply: string;
  suggestedRoutes: ChatSuggestedRoute[];
} {
  const q = userMessage.toLowerCase();

  if (q.includes('price') || q.includes('cost') || q.includes('budget') || q.includes('quote')) {
    return {
      reply:
        "Project pricing depends on the scope—such as whether you need a focused single-page landing page (typically 1–2 weeks) or a complete multi-page Webflow website with CMS and technical SEO setup (typically 3–5 weeks). Because MD Selim scopes each project transparently without hidden retainers, the best way to get an exact written quote is to share your requirements on the Contact page.",
      suggestedRoutes: [
        { label: 'Go to Contact Page', path: '/contact/' },
        { label: 'Review Service Deliverables', path: '/services/' },
      ],
    };
  }

  if (q.includes('seo') || q.includes('google') || q.includes('search') || q.includes('rank')) {
    return {
      reply:
        'MD Selim provides both Basic On-Page SEO (semantic H1–H3 heading hierarchy, custom meta titles/descriptions, clean URLs, and internal linking) and Technical SEO Setup (XML sitemaps, robots.txt, canonical tags, Schema.org JSON-LD structured data, 301 redirect mapping, and Google Search Console setup). Note that off-page backlink buying and paid ad management are excluded. Would you like to set up SEO for a new Webflow build or improve an existing site?',
      suggestedRoutes: [
        { label: 'Explore SEO Scope on Services', path: '/services/' },
        { label: 'Read SEO Guides in Insights', path: '/insights/' },
      ],
    };
  }

  if (
    q.includes('work') ||
    q.includes('portfolio') ||
    q.includes('example') ||
    q.includes('case stud') ||
    q.includes('project')
  ) {
    return {
      reply:
        'On the Work page, you can inspect four architectures—clearly labeled to distinguish Demo / Concept Builds (Meridian Commercial Advisory, Velo Specialist Clinic, and Kaizen Building Consultants) from the live production architecture of mdselim.com. Each breakdown covers the problem addressed, UX structure, and technical SEO implementation. What type of service business are you building for?',
      suggestedRoutes: [
        { label: 'Explore Work & Architectures', path: '/work/' },
        { label: 'Start a Project Inquiry', path: '/contact/' },
      ],
    };
  }

  if (
    q.includes('mainten') ||
    q.includes('update') ||
    q.includes('ongoing') ||
    q.includes('retainer') ||
    q.includes('support')
  ) {
    return {
      reply:
        'Yes—MD Selim offers a recurring service for Website Updates, Maintenance, and Agreed Ongoing Improvements. It covers text and content updates, publishing new case studies or articles, adding new service sections, and periodic technical checks for links, forms, and mobile layouts. Ongoing care is completely optional after launch.',
      suggestedRoutes: [
        { label: 'View Maintenance Details', path: '/services/' },
        { label: 'Inquire About Ongoing Care', path: '/contact/' },
      ],
    };
  }

  if (
    q.includes('process') ||
    q.includes('how long') ||
    q.includes('timeline') ||
    q.includes('step') ||
    q.includes('approach')
  ) {
    return {
      reply:
        'Every project follows a structured 4-step process: (01) Discovery & Content Structure, (02) Wireframing & Visual Direction, (03) Webflow Build & SEO Setup, and (04) Launch, Handover & Ongoing Support. A focused landing page typically takes 1–2 weeks, while a full multi-page service website takes 3–5 weeks.',
      suggestedRoutes: [
        { label: 'See Full Process on Services', path: '/services/' },
        { label: 'Contact MD Selim', path: '/contact/' },
      ],
    };
  }

  return {
    reply:
      "I'm MD Selim's AI Assistant. I can help explain Selim's services—including custom Webflow websites, focused landing pages, basic on-page and technical SEO setup, and ongoing website maintenance—or help you outline your project requirements. Tell me a bit about your service business and what you'd like to build or improve!",
    suggestedRoutes: [
      { label: 'Explore Services', path: '/services/' },
      { label: 'View Work Examples', path: '/work/' },
      { label: 'Go to Contact Page', path: '/contact/' },
    ],
  };
}

/**
 * Extracts contextual route suggestions based on assistant reply or user query.
 */
export function inferSuggestedRoutes(text: string): ChatSuggestedRoute[] {
  const lower = text.toLowerCase();
  const routes: ChatSuggestedRoute[] = [];

  if (lower.includes('service') || lower.includes('webflow') || lower.includes('seo') || lower.includes('exclusion')) {
    routes.push({ label: 'Explore Services', path: '/services/' });
  }
  if (lower.includes('work') || lower.includes('portfolio') || lower.includes('demo') || lower.includes('meridian') || lower.includes('velo') || lower.includes('kaizen')) {
    routes.push({ label: 'View Work Examples', path: '/work/' });
  }
  if (lower.includes('insight') || lower.includes('article') || lower.includes('guide')) {
    routes.push({ label: 'Read Insights', path: '/insights/' });
  }
  if (lower.includes('background') || lower.includes('philosophy') || lower.includes('about')) {
    routes.push({ label: 'About MD Selim', path: '/about/' });
  }
  routes.push({ label: 'Contact Page', path: '/contact/' });

  return routes.slice(0, 3);
}
