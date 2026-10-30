export type RoutePath =
  | '/'
  | '/services/'
  | '/work/'
  | '/about/'
  | '/insights/'
  | '/contact/';

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
    positioning: string;
    description: string;
    founderName: string;
    role: string;
    location: string;
    availabilityLabel: string;
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
  seo: Record<
    RoutePath,
    {
      title: string;
      description: string;
    }
  >;
}

export const siteConfig: SiteConfig = {
  brand: {
    name: 'MD SELIM',
    domain: 'mdselim.com',
    siteUrl: 'https://mdselim.com',
    logoUrl: null,
    logoAlt: 'MD SELIM Logo',
    positioning: 'Websites built for clarity, credibility, and growth.',
    description:
      'I help small service businesses build professional websites with a strong user experience and an SEO-ready foundation.',
    founderName: 'MD Selim',
    role: 'Webflow Developer & Technical SEO Architect',
    location: 'Remote · Serving Small Service Businesses Worldwide',
    availabilityLabel: 'Accepting Q4 client engagements',
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
      title: 'MD SELIM — Websites Built for Clarity, Credibility, and Growth',
      description:
        'I help small service businesses build professional Webflow websites with a strong user experience and an SEO-ready foundation.',
    },
    '/services/': {
      title: 'Services — Webflow Development, Technical SEO & Ongoing Care | MD SELIM',
      description:
        'Core Webflow websites and landing pages, supporting on-page and technical SEO setup, and recurring website maintenance for small service businesses.',
    },
    '/work/': {
      title: 'Selected Work & Case Studies | MD SELIM',
      description:
        'Explore Webflow websites, landing pages, and technical SEO foundations built for small service businesses seeking clarity and qualified client inquiries.',
    },
    '/about/': {
      title: 'About MD Selim — Webflow Developer & SEO Architect',
      description:
        'Learn how MD Selim approaches website clarity, credibility, user experience, and search-ready engineering for service-based businesses.',
    },
    '/insights/': {
      title: 'Insights — Guides on Web Clarity, Webflow & On-Page SEO | MD SELIM',
      description:
        'Practical articles for small service business owners on website structure, conversion clarity, Webflow architecture, and technical SEO.',
    },
    '/contact/': {
      title: 'Contact — Start a Project or Book a Discovery Call | MD SELIM',
      description:
        'Get in touch with MD Selim to discuss a new Webflow website, landing page, technical SEO setup, or ongoing website maintenance.',
    },
  },
};
