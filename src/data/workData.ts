export type ProjectClassification = 'All' | 'Demo / Concept Build' | 'Client Architecture';

export interface ProjectItem {
  id: string;
  index: string;
  slug: string;
  title: string;
  projectType: Exclude<ProjectClassification, 'All'>;
  projectTypeNote: string;
  industry: string;
  serviceFocus: string[];
  summary: string;
  contextAndProblem: string;
  structuralApproach: string;
  uxHighlights: string[];
  seoImplementation: string[];
  technicalSpecs: {
    label: string;
    value: string;
  }[];
  wireframeVariant: 'legal' | 'clinic' | 'advisory' | 'engineering';
}

/**
 * Portfolio & Architecture Showcases for mdselim.com
 * Clearly distinguishes Demo / Concept reference builds from Client Architecture work,
 * without invented testimonials or fabricated performance claims.
 */
export const workData: ProjectItem[] = [
  {
    id: 'meridian-commercial-advisory',
    index: '01',
    slug: 'meridian-commercial-advisory',
    title: 'Meridian Commercial Advisory — B2B Service Website Architecture',
    projectType: 'Demo / Concept Build',
    projectTypeNote:
      'Demonstration architecture created to showcase multi-page B2B service positioning, practice-area hierarchy, and technical SEO structure.',
    industry: 'B2B Legal & Commercial Advisory',
    serviceFocus: [
      'Webflow Website Architecture',
      'Service Page Structuring',
      'On-Page & Technical SEO Setup',
    ],
    summary:
      'A complete multi-page reference build demonstrating how a small commercial advisory firm can separate distinct service lines, explain engagement steps clearly, and capture pre-qualified consultation inquiries.',
    contextAndProblem:
      'Small professional practices often list all of their capabilities on a single generic page. When business owners visit, they struggle to tell whether the firm handles their specific type of commercial matter or how an initial consultation works.',
    structuralApproach:
      'Organized the website into dedicated service pages with a consistent four-part layout: clear service definition, who it is for, step-by-step engagement process, and a focused inquiry intake form.',
    uxHighlights: [
      'Clear top-level navigation separating Core Practice Areas, About, Insights, and Contact',
      'Scannable service comparison blocks written in plain business language',
      'Structured consultation request form that collects matter type and timeline upfront',
      'Responsive grid layout tested across desktop, tablet, and mobile viewports',
    ],
    seoImplementation: [
      'Strict single-H1 semantic heading hierarchy on the homepage and all practice-area pages',
      'Dedicated meta title and description templates for each service page',
      'ProfessionalService JSON-LD structured data schema specification',
      'Internal linking architecture connecting explanatory articles to relevant service pages',
    ],
    technicalSpecs: [
      { label: 'Project Classification', value: 'Demo / Concept Build' },
      { label: 'Platform Architecture', value: 'Webflow + Semantic HTML5/CSS3' },
      { label: 'Page Templates', value: 'Home, 4 Service Pages, About, Insights, Contact' },
      { label: 'SEO Foundation', value: 'Semantic Headings, Sitemap, JSON-LD Schema' },
    ],
    wireframeVariant: 'legal',
  },
  {
    id: 'velo-specialist-clinic',
    index: '02',
    slug: 'velo-specialist-clinic',
    title: 'Velo Specialist Clinic — Treatment Landing Page System',
    projectType: 'Demo / Concept Build',
    projectTypeNote:
      'Demonstration landing page system illustrating high-clarity patient education, treatment workflows, and local SEO structure for private clinics.',
    industry: 'Private Healthcare & Specialist Clinic',
    serviceFocus: [
      'Focused Landing Pages',
      'Mobile UX Clarity',
      'Local On-Page SEO Structure',
    ],
    summary:
      'A focused landing page blueprint built for local specialist clinics that need to explain treatments calmly, answer common patient questions upfront, and make appointment requests straightforward on mobile devices.',
    contextAndProblem:
      'Patients searching for specialist treatments on mobile devices are often met with cluttered menus, slow-loading stock videos, and buried contact details—causing hesitation at the moment they are ready to book.',
    structuralApproach:
      'Designed a calm, distraction-free landing page template that leads with treatment clarity, outlines what to expect during the first visit, answers frequent patient questions, and provides an accessible appointment request section.',
    uxHighlights: [
      'Mobile-first reading flow with comfortable line lengths and high-contrast typography',
      'Step-by-step patient journey breakdown reducing first-visit uncertainty',
      'Dedicated FAQ accordion addressing practical questions before booking',
      'Accessible tap targets and streamlined appointment inquiry fields',
    ],
    seoImplementation: [
      'LocalBusiness and MedicalClinic Schema.org structured data layout',
      'Location-specific heading and metadata structure for local search relevance',
      'Lightweight SVG and compressed asset strategy to keep mobile load times fast',
      'Clean canonical URL and OpenGraph sharing configuration',
    ],
    technicalSpecs: [
      { label: 'Project Classification', value: 'Demo / Concept Build' },
      { label: 'Primary Format', value: 'Conversion-Focused Landing Page' },
      { label: 'Viewport Priority', value: 'Mobile-First Responsive Layout' },
      { label: 'SEO Foundation', value: 'Local Schema, FAQ Structure, Fast Assets' },
    ],
    wireframeVariant: 'clinic',
  },
  {
    id: 'kaizen-structural-consultants',
    index: '03',
    slug: 'kaizen-structural-consultants',
    title: 'Kaizen Building Consultants — Technical Service Catalog & SEO Structure',
    projectType: 'Demo / Concept Build',
    projectTypeNote:
      'Reference architecture demonstrating how technical surveying and engineering service providers can replace static PDFs with indexable web pages.',
    industry: 'Surveying, Engineering & Property Services',
    serviceFocus: [
      'Webflow CMS Structure',
      'Technical SEO Setup',
      'Content Organization',
    ],
    summary:
      'An architectural blueprint for technical service firms that need to present complex inspection and consulting services in an organized, search-indexable format.',
    contextAndProblem:
      'Many established engineering and surveying businesses hide their most valuable service specifications inside downloadable PDF brochures that search engines struggle to index and mobile visitors dislike downloading.',
    structuralApproach:
      'Converted static service sheets into structured HTML pages managed through a clean CMS model, allowing each inspection service to have its own URL, scope checklist, deliverables list, and inquiry CTA.',
    uxHighlights: [
      'Structured specification tables presenting scope inclusions and exclusions clearly',
      'Filterable project reference index organized by property and service type',
      'Direct inquiry pathways tailored to commercial property managers and architects',
    ],
    seoImplementation: [
      'Indexable HTML service specifications replacing unindexed PDF brochures',
      'Clean URL taxonomy (/services/[service-slug]/) with breadcrumb hierarchy',
      'XML sitemap and robots.txt rules configured for clean search engine crawling',
    ],
    technicalSpecs: [
      { label: 'Project Classification', value: 'Demo / Concept Build' },
      { label: 'Content Architecture', value: 'Structured CMS Service & Project Collections' },
      { label: 'Key Focus', value: 'Clarity for Technical B2B Buyers' },
      { label: 'SEO Foundation', value: 'Crawlable HTML Specs & Clean URL Taxonomy' },
    ],
    wireframeVariant: 'advisory',
  },
  {
    id: 'mdselim-personal-brand-platform',
    index: '04',
    slug: 'mdselim-personal-brand-platform',
    title: 'MD SELIM (mdselim.com) — Personal Brand & Web Architecture Platform',
    projectType: 'Client Architecture',
    projectTypeNote:
      'Production architecture for mdselim.com—built with custom code, centralized Botanical Obsidian design tokens, and Markdown-driven publishing.',
    industry: 'Web Development & Technical SEO Studio',
    serviceFocus: [
      'Custom Code Architecture',
      'Botanical Obsidian Design System',
      'Markdown Content System',
    ],
    summary:
      'The live production codebase for mdselim.com, engineered to demonstrate modular frontend architecture, centralized CSS design tokens, transparent service scoping, and Markdown-based insights publishing.',
    contextAndProblem:
      'A web developer’s own website should serve as direct proof of their standards. It must load quickly, communicate services without hype, and maintain a clean separation between configuration, content, and presentation.',
    structuralApproach:
      'Built a modular architecture separating site configuration, service data, Markdown articles, layout shells, and reusable components under the Botanical Obsidian visual identity.',
    uxHighlights: [
      'Strict 3-zone top navigation bar with zero visual clutter',
      'Transparent Services breakdown detailing exact deliverables and explicit exclusions',
      'Markdown-powered Insights system for publishing practical guides cleanly',
      'Centralized CSS custom properties enabling global design consistency',
    ],
    seoImplementation: [
      'Route-specific title tags, meta descriptions, and OpenGraph synchronization',
      'Semantic HTML5 landmark structure (<header>, <main>, <article>, <footer>)',
      'Trailing-slash canonical URL normalization across all six core routes',
    ],
    technicalSpecs: [
      { label: 'Project Classification', value: 'Live Production Architecture' },
      { label: 'Tech Stack', value: 'TypeScript, HTML5, Modern CSS3, Markdown' },
      { label: 'Design System', value: 'Botanical Obsidian (60-30-10 Token System)' },
      { label: 'Routes', value: 'Home, Services, Work, About, Insights, Contact' },
    ],
    wireframeVariant: 'engineering',
  },
];
