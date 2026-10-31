export type RoutePath =
  | '/'
  | '/services/'
  | '/work/'
  | '/about/'
  | '/insights/'
  | '/contact/'
  | '/404/';

export interface NavItem {
  label: string;
  path: RoutePath;
}

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  handle: string;
}

export interface RouteSeoMetadata {
  title: string;
  description: string;
  canonicalPath: RoutePath;
  ogType: 'website' | 'article';
  robots: 'index, follow' | 'noindex, nofollow';
  primaryTopic: string;
  searchIntent: string;
  breadcrumbLabel: string;
}

export interface SiteConfig {
  brand: {
    name: string;
    domain: string;
    siteUrl: string;
    /**
     * Logo slot ready for Phase 02+ upload.
     * Set to a file path (e.g. '/logo.svg') when uploaded; null renders the clean typographic wordmark.
     */
    logoUrl: string | null;
    logoAlt: string;
    ogImageUrl: string;
    ogImageAlt: string;
    positioning: string;
    description: string;
    founderName: string;
    role: string;
    location: string;
    availabilityLabel: string;
  };
  verification: {
    /**
     * Google Search Console verification meta tag token.
     * Populated via VITE_GOOGLE_SITE_VERIFICATION environment variable when verifying ownership in Search Console.
     */
    googleSiteVerification: string;
  };
  servicesSummary: {
    core: {
      label: string;
      title: string;
      summary: string;
    };
    supporting: {
      label: string;
      title: string;
      summary: string;
    };
    recurring: {
      label: string;
      title: string;
      summary: string;
    };
  };
  navigation: {
    main: NavItem[];
    primaryCta: {
      label: string;
      path: RoutePath;
    };
  };
  contact: {
    email: string;
    responseWindow: string;
    workingHours: string;
    consultationDuration: string;
  };
  socials: SocialLink[];
  seo: Record<RoutePath, RouteSeoMetadata>;
}

const envGoogleVerification =
  typeof import.meta !== 'undefined' &&
  import.meta.env &&
  typeof import.meta.env.VITE_GOOGLE_SITE_VERIFICATION === 'string'
    ? import.meta.env.VITE_GOOGLE_SITE_VERIFICATION.trim()
    : '';

export const siteConfig: SiteConfig = {
  brand: {
    name: 'MD SELIM',
    domain: 'mdselim.com',
    siteUrl: 'https://mdselim.com',
    logoUrl: null,
    logoAlt: 'MD SELIM — Webflow Developer & Technical SEO Architect',
    ogImageUrl: 'https://mdselim.com/og-card.svg',
    ogImageAlt:
      'MD SELIM (mdselim.com) — Websites built for clarity, credibility, and growth for small service businesses.',
    positioning: 'Websites built for clarity, credibility, and growth.',
    description:
      'I help small service businesses build professional websites with a strong user experience and an SEO-ready foundation.',
    founderName: 'MD Selim',
    role: 'Webflow Developer & Technical SEO Architect',
    location: 'Remote · Serving Small Service Businesses Worldwide',
    availabilityLabel: 'Accepting Q4 client engagements',
  },
  verification: {
    googleSiteVerification: envGoogleVerification,
  },
  servicesSummary: {
    core: {
      label: 'Core Service',
      title: 'Webflow websites and landing pages',
      summary:
        'Custom, fast-loading Webflow websites and conversion-structured landing pages engineered specifically for small service businesses.',
    },
    supporting: {
      label: 'Supporting Service',
      title: 'Basic on-page SEO and technical SEO setup',
      summary:
        'Clean semantic HTML hierarchy, metadata architecture, schema markup, indexing controls, and Core Web Vitals optimization built in from day one.',
    },
    recurring: {
      label: 'Recurring Service',
      title: 'Website updates, maintenance and agreed ongoing improvements',
      summary:
        'Structured post-launch care, content publishing, new landing page sections, and continuous performance checks as your business grows.',
    },
  },
  navigation: {
    main: [
      { label: 'Services', path: '/services/' },
      { label: 'Work', path: '/work/' },
      { label: 'About', path: '/about/' },
      { label: 'Insights', path: '/insights/' },
      { label: 'Contact', path: '/contact/' },
    ],
    primaryCta: {
      label: 'Request a Consultation',
      path: '/contact/',
    },
  },
  contact: {
    email: 'hello@mdselim.com',
    responseWindow: 'Within 1 business day',
    workingHours: 'Monday – Friday, 9:00 AM – 6:00 PM',
    consultationDuration: '30-minute discovery call',
  },
  socials: [
    {
      platform: 'LinkedIn',
      label: 'LinkedIn Profile',
      url: 'https://linkedin.com',
      handle: 'in/mdselim',
    },
    {
      platform: 'X',
      label: 'X (Twitter)',
      url: 'https://x.com',
      handle: '@mdselim',
    },
    {
      platform: 'GitHub',
      label: 'GitHub Architecture',
      url: 'https://github.com',
      handle: 'github.com/mdselim',
    },
  ],
  seo: {
    '/': {
      title: 'MD SELIM — Websites Built for Clarity, Credibility & Growth',
      description:
        'I help small service businesses build professional Webflow websites, conversion-ready landing pages, and technical SEO foundations that earn client trust.',
      canonicalPath: '/',
      ogType: 'website',
      robots: 'index, follow',
      primaryTopic: 'Webflow Website Development & Technical SEO for Small Service Businesses',
      searchIntent: 'Commercial & Brand Discovery',
      breadcrumbLabel: 'Home',
    },
    '/services/': {
      title: 'Services — Webflow Websites, Landing Pages & SEO | MD SELIM',
      description:
        'Explore Webflow website development, landing pages, basic on-page and technical SEO setup, and ongoing website maintenance with clear scope deliverables.',
      canonicalPath: '/services/',
      ogType: 'website',
      robots: 'index, follow',
      primaryTopic: 'Webflow Websites, Landing Pages, On-Page/Technical SEO & Maintenance Scope',
      searchIntent: 'Commercial Service Evaluation',
      breadcrumbLabel: 'Services',
    },
    '/work/': {
      title: 'Work & Website Architecture Case Studies | MD SELIM',
      description:
        'Review Webflow website architectures, service landing page systems, and technical SEO implementations built for small service businesses and B2B practices.',
      canonicalPath: '/work/',
      ogType: 'website',
      robots: 'index, follow',
      primaryTopic: 'Website Architecture Portfolio, Demo Builds & Live Client Systems',
      searchIntent: 'Commercial Proof & Architecture Evaluation',
      breadcrumbLabel: 'Work',
    },
    '/about/': {
      title: 'About MD Selim — Webflow Developer & SEO Architect',
      description:
        'Learn about MD Selim’s background, capabilities, and structured four-step working philosophy for building clear, search-ready service business websites.',
      canonicalPath: '/about/',
      ogType: 'website',
      robots: 'index, follow',
      primaryTopic: 'Professional Background, Webflow/SEO Capabilities & Working Philosophy',
      searchIntent: 'Informational & Practitioner Credibility',
      breadcrumbLabel: 'About',
    },
    '/insights/': {
      title: 'Insights — Website Clarity, Webflow & SEO Guides | MD SELIM',
      description:
        'Practical articles for small service business owners covering website clarity, conversion positioning, Webflow maintainability, and technical SEO setup.',
      canonicalPath: '/insights/',
      ogType: 'website',
      robots: 'index, follow',
      primaryTopic: 'Educational Guides on Website Clarity, Webflow & Technical SEO',
      searchIntent: 'Informational & Topic Discovery',
      breadcrumbLabel: 'Insights',
    },
    '/contact/': {
      title: 'Contact MD Selim — Request a Website or SEO Consultation',
      description:
        'Start a conversation with MD Selim about a new Webflow website, focused landing page, on-page and technical SEO setup, or ongoing website maintenance.',
      canonicalPath: '/contact/',
      ogType: 'website',
      robots: 'index, follow',
      primaryTopic: 'Project Inquiry & Consultation Booking',
      searchIntent: 'Transactional / Direct Inquiry',
      breadcrumbLabel: 'Contact',
    },
    '/404/': {
      title: '404 — Page Not Found | MD SELIM',
      description:
        'The requested page could not be found on mdselim.com. Return to the homepage, explore Webflow and SEO services, or contact MD Selim.',
      canonicalPath: '/404/',
      ogType: 'website',
      robots: 'noindex, nofollow',
      primaryTopic: 'Page Not Found Recovery Navigation',
      searchIntent: 'Navigational Recovery',
      breadcrumbLabel: 'Page Not Found',
    },
  },
};

