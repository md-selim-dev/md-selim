import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { ArticleCard } from '../components/ArticleCard';
import { Button } from '../components/Button';
import { ExplorationHub } from '../components/exploration/ExplorationHub';
import { ProjectCard } from '../components/ProjectCard';
import { SectionContainer } from '../components/SectionContainer';
import { VisualWireframeCanvas } from '../components/VisualWireframeCanvas';
import { siteConfig } from '../config/siteConfig';
import { insightsContent } from '../content/insightsContent';
import { servicesData } from '../data/servicesData';
import { workData } from '../data/workData';
import { navigateTo } from '../scripts/router';
import { themeTokens } from '../styles/themeTokens';

export const HomePage: React.FC = () => {
  const featuredWork = workData.slice(0, 2);
  const latestInsights = insightsContent.slice(0, 3);

  return (
    <div>
      {/* 1. HERO SECTION */}
      <SectionContainer surface="canvas" spacing="default" borderBottom>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-5">
              <p className={themeTokens.typography.kicker}>
                {siteConfig.brand.name} · {siteConfig.brand.domain}
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
                <Button to="/services/" variant="secondary" size="lg">
                  Explore Services
                </Button>
              </div>
              <p className={themeTokens.typography.metadata}>
                Webflow Websites & Landing Pages · Basic On-Page & Technical SEO · Ongoing Maintenance
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex">
            <VisualWireframeCanvas variant="hero-architecture" className="w-full" />
          </div>
        </div>
      </SectionContainer>

      {/* 2. INTRODUCTION SECTION */}
      <SectionContainer surface="canvas" spacing="default" borderBottom>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-3">
            <p className={themeTokens.typography.kicker}>01 · Introduction</p>
            <h2 className={themeTokens.typography.sectionHeadline}>
              A clear, dependable website is the foundation of modern business trust.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <p className="text-base sm:text-lg text-[var(--text-primary)] leading-relaxed">
              When prospective clients hear about your business, your website is usually the first place they go to verify what you do and decide whether to reach out.
            </p>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Too many small service businesses rely on websites that are slow, confusing to navigate on mobile, or vague about the actual services offered. My goal is to replace that friction with structure: clear positioning, clean Webflow execution, an SEO-ready technical foundation, and reliable post-launch support.
            </p>
            <div className="pt-2">
              <Button to="/about/" variant="quiet" size="sm">
                Read more about my approach and background
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* 3. SERVICES OVERVIEW SECTION */}
      <SectionContainer surface="canvas" spacing="default" borderBottom>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <p className={themeTokens.typography.kicker}>02 · Services Overview</p>
            <h2 className={themeTokens.typography.sectionHeadline}>
              Focused web development, SEO setup, and ongoing maintenance.
            </h2>
          </div>
          <Button to="/services/" variant="secondary" size="md">
            Full Service Specifications
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.services.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="ds-card p-6 sm:p-7 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <p className="font-mono text-xs text-[var(--accent-primary)]">
                  {service.index} · {service.categoryLabel}
                </p>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {service.description}
                </p>
                <ul className="pt-2 space-y-2">
                  {service.deliverables.slice(0, 3).map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-[var(--text-primary)]"
                    >
                      <Check className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <span className="font-mono text-xs text-[var(--text-secondary)]">
                  Deliverables & Exclusions
                </span>
                <Button to="/services/" variant="quiet" size="sm">
                  Details
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Supporting & Recurring Services Strip */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesData.services.slice(3).map((service) => (
            <div
              key={service.id}
              className="ds-card p-6 sm:p-7 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <p className="font-mono text-xs text-[var(--accent-primary)]">
                  {service.index} · {service.categoryLabel}
                </p>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <span className="font-mono text-xs text-[var(--text-secondary)]">
                  Included or standalone
                </span>
                <Button to="/services/" variant="quiet" size="sm">
                  View scope
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* 4. FEATURED WORK SECTION */}
      <SectionContainer surface="canvas" spacing="default" borderBottom>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <p className={themeTokens.typography.kicker}>03 · Featured Work</p>
            <h2 className={themeTokens.typography.sectionHeadline}>
              Selected architecture builds and project demonstrations.
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Each project clearly distinguishes between demonstration architecture builds and live production platforms.
            </p>
          </div>
          <Button to="/work/" variant="secondary" size="md">
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-8">
          {featuredWork.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectProject={(proj) =>
                navigateTo('/work/', { project: proj.slug })
              }
            />
          ))}
        </div>
      </SectionContainer>

      {/* 5. WORKING PROCESS SECTION */}
      <SectionContainer surface="canvas" spacing="default" borderBottom>
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <p className={themeTokens.typography.kicker}>04 · Working Process</p>
              <h2 className={themeTokens.typography.sectionHeadline}>
                A structured four-step workflow from initial conversation to launch.
              </h2>
            </div>
            <Button to="/services/" variant="quiet" size="sm">
              See full process & FAQs
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.processPhases.map((phase) => (
              <div
                key={phase.step}
                className="ds-card p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <p className="font-mono text-xs font-semibold text-[var(--accent-primary)]">
                    Step {phase.step}
                  </p>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {phase.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] space-y-1">
                  <p className="font-mono text-[11px] font-semibold text-[var(--text-primary)]">
                    Deliverables
                  </p>
                  {phase.outputs.map((out) => (
                    <p key={out} className="text-xs text-[var(--text-secondary)]">
                      · {out}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* 6. PHASE 05: INTERACTIVE EXPLORATION EXPERIENCES */}
      <SectionContainer id="exploration-hub" surface="canvas" spacing="default" borderBottom>
        <ExplorationHub />
      </SectionContainer>

      {/* 7. LATEST INSIGHTS SECTION */}
      <SectionContainer surface="canvas" spacing="default" borderBottom>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <p className={themeTokens.typography.kicker}>06 · Latest Insights</p>
            <h2 className={themeTokens.typography.sectionHeadline}>
              Practical articles on website clarity, Webflow, and SEO.
            </h2>
          </div>
          <Button to="/insights/" variant="quiet" size="md">
            View all articles
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestInsights.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelectArticle={(item) =>
                navigateTo('/insights/', { article: item.slug })
              }
            />
          ))}
        </div>
      </SectionContainer>

      {/* 8. FINAL CTA SECTION */}
      <SectionContainer surface="canvas" spacing="default">
        <div className="ds-card p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <p className={themeTokens.typography.kicker}>07 · Start a Conversation</p>
            <h2 className={themeTokens.typography.sectionHeadline}>
              Planning a new website or looking to improve your existing one?
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Send a brief overview of your business and what you need help with. I will review your inquiry and reply within one business day.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Button to="/contact/" variant="primary" size="lg">
              Contact MD Selim
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button to="/services/" variant="secondary" size="lg">
              Review Services
            </Button>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};
