import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/Button';
import { SectionContainer } from '../components/SectionContainer';
import { VisualWireframeCanvas } from '../components/VisualWireframeCanvas';
import { siteConfig } from '../config/siteConfig';
import { insightsContent } from '../content/insightsContent';
import { servicesData } from '../data/servicesData';
import { workData } from '../data/workData';
import { navigateTo } from '../scripts/router';
import { themeTokens } from '../styles/themeTokens';

export const HomePage: React.FC = () => {
  const featuredWork = workData.slice(0, 3);
  const featuredInsights = insightsContent.slice(0, 3);

  return (
    <div>
      {/* 1. HERO SECTION: Split-Screen Proposition + Architectural Blueprint */}
      <SectionContainer surface="canvas" spacing="default" borderBottom>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Positioning & Primary Action */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-5">
              <p className={themeTokens.typography.kicker}>
                {siteConfig.brand.founderName} · {siteConfig.brand.role}
              </p>
              <h1 className={themeTokens.typography.heroHeadline}>
                {siteConfig.brand.positioning}
              </h1>
              <p className={themeTokens.typography.bodyLead}>
                {siteConfig.brand.description}
              </p>
            </div>

            <div className="space-y-5 pt-2">
              <div className="flex flex-wrap items-center gap-4">
                <Button to="/contact/" variant="primary" size="lg">
                  Request a Consultation
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button to="/work/" variant="secondary" size="lg">
                  Explore Selected Work
                </Button>
              </div>
              <p className="text-xs text-stone-500">
                Webflow Websites & Landing Pages · Basic On-Page & Technical SEO · Ongoing Care
              </p>
            </div>
          </div>

          {/* Right Column: Matching-Height Visual Blueprint */}
          <div className="lg:col-span-5 flex">
            <VisualWireframeCanvas variant="hero-architecture" className="w-full" />
          </div>
        </div>

        {/* Full-Width 4-Column Quantitative Proof Row Below Hero Split */}
        <div className="mt-14 pt-10 border-t border-stone-200/90 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <p className="text-2xl sm:text-3xl font-mono font-bold tabular-nums text-slate-900">
              3–5 Weeks
            </p>
            <p className="mt-1 text-xs text-stone-600">
              Typical custom Webflow website delivery timeline
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-mono font-bold tabular-nums text-slate-900">
              99 / 100
            </p>
            <p className="mt-1 text-xs text-stone-600">
              Target Google PageSpeed & Core Web Vitals benchmark
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-mono font-bold tabular-nums text-slate-900">
              100%
            </p>
            <p className="mt-1 text-xs text-stone-600">
              On-page semantic HTML & technical SEO setup included
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-mono font-bold tabular-nums text-slate-900">
              48 Hours
            </p>
            <p className="mt-1 text-xs text-stone-600">
              Standard turnaround for ongoing maintenance agreements
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* 2. SERVICES OVERVIEW: Asymmetric Bento & Editorial Numbering */}
      <SectionContainer surface="white" spacing="default" borderBottom>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <p className={themeTokens.typography.kicker}>Capabilities & Services</p>
            <h2 className={themeTokens.typography.sectionHeadline}>
              A focused three-part system for small service businesses.
            </h2>
          </div>
          <Button to="/services/" variant="quiet" size="md">
            View full service specifications
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Core Service (Prominent Span 7) */}
          <div className="lg:col-span-7 rounded-xl bg-[#FAF9F6] border border-stone-200/90 p-7 sm:p-9 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-mono text-blue-700 font-medium">
                {servicesData.tiers[0].index}. {servicesData.tiers[0].tierLabel}
              </p>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                {servicesData.tiers[0].title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {servicesData.tiers[0].description}
              </p>

              <ul className="pt-2 space-y-2.5">
                {servicesData.tiers[0].deliverables.slice(0, 4).map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-stone-500">
                {servicesData.tiers[0].timeline} · Custom Webflow CMS
              </span>
              <Button to="/services/" variant="secondary" size="sm">
                Explore Core Service
              </Button>
            </div>
          </div>

          {/* Supporting & Recurring Services Stacked (Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {servicesData.tiers.slice(1).map((tier) => (
              <div
                key={tier.id}
                className="flex-1 rounded-xl bg-[#FAF9F6] border border-stone-200/90 p-6 sm:p-7 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <p className="text-xs font-mono text-blue-700 font-medium">
                    {tier.index}. {tier.tierLabel}
                  </p>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                    {tier.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {tier.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between gap-4">
                  <span className="text-xs text-stone-500">{tier.timeline}</span>
                  <Button to="/services/" variant="quiet" size="sm">
                    Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* 3. PROOF OF IMPACT: Selected Client Work (Adjacent to Capability Claims) */}
      <SectionContainer surface="canvas" spacing="default" borderBottom>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <p className={themeTokens.typography.kicker}>Selected Work & Proof</p>
            <h2 className={themeTokens.typography.sectionHeadline}>
              Websites engineered to generate qualified client inquiries.
            </h2>
          </div>
          <Button to="/work/" variant="secondary" size="md">
            View All Case Studies
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-8">
          {featuredWork.map((project) => (
            <article
              key={project.id}
              className="rounded-xl bg-white border border-stone-200/90 p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="text-xs text-stone-500">
                  <span>{project.index}. {project.client}</span>
                  <span className="mx-2" aria-hidden="true">·</span>
                  <span>{project.industry}</span>
                  <span className="mx-2" aria-hidden="true">·</span>
                  <span>{project.location}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  {project.headline}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {project.summary}
                </p>

                {/* Quantified Metrics Row */}
                <div className="pt-3 grid grid-cols-3 gap-4 border-t border-stone-200/80">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="text-lg sm:text-xl font-mono font-bold tabular-nums text-slate-900">
                        {metric.value}
                      </p>
                      <p className="text-xs text-stone-600 mt-0.5">{metric.label}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Button to="/work/" variant="quiet" size="sm">
                    Read case study specification
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <VisualWireframeCanvas variant={project.wireframeVariant} />
              </div>
            </article>
          ))}
        </div>
      </SectionContainer>

      {/* 4. EDITORIAL INSIGHTS PREVIEW: Encourage Exploration */}
      <SectionContainer surface="white" spacing="default" borderBottom>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <p className={themeTokens.typography.kicker}>Insights & Practical Guides</p>
            <h2 className={themeTokens.typography.sectionHeadline}>
              Clear thinking on website structure, Webflow, and SEO.
            </h2>
          </div>
          <Button to="/insights/" variant="quiet" size="md">
            Read all articles
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredInsights.map((article) => (
            <article
              key={article.id}
              onClick={() => navigateTo('/insights/')}
              className="group rounded-xl bg-[#FAF9F6] border border-stone-200/90 p-6 flex flex-col justify-between space-y-6 cursor-pointer hover:border-slate-400 transition-colors"
            >
              <div className="space-y-3">
                <p className="text-xs text-stone-500">
                  <span>{article.topic}</span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span>{article.publishedDate}</span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </p>
                <h3 className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between text-xs font-medium text-slate-900 group-hover:text-blue-700">
                <span>Read Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </article>
          ))}
        </div>
      </SectionContainer>

      {/* 5. CONVERSION / PRIMARY CALL TO ACTION */}
      <SectionContainer surface="muted" spacing="default">
        <div className="rounded-2xl bg-white border border-stone-200/90 p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <p className={themeTokens.typography.kicker}>Start a Conversation</p>
            <h2 className={themeTokens.typography.sectionHeadline}>
              Ready to build a website that reflects the quality of your service business?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Share your current website or upcoming project goals. You will receive a clear, honest recommendation within one business day.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Button to="/contact/" variant="primary" size="lg">
              Book a Discovery Call
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button to="/about/" variant="secondary" size="lg">
              About MD Selim
            </Button>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};
