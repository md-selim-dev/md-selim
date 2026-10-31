import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/Button';
import { SectionContainer } from '../components/SectionContainer';
import { VisualWireframeCanvas } from '../components/VisualWireframeCanvas';
import { siteConfig } from '../config/siteConfig';
import { aboutContent } from '../content/aboutContent';
import { PageHeader } from '../layouts/PageHeader';
import { themeTokens } from '../styles/themeTokens';

export const AboutPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'About' },
        ]}
        kicker={aboutContent.kicker}
        title={aboutContent.headline}
        description={aboutContent.lead}
        metaLine={`${siteConfig.brand.founderName} · ${siteConfig.brand.domain} · ${siteConfig.brand.location}`}
      />

      {/* 1. PROFESSIONAL BACKGROUND & WORKING APPROACH */}
      <SectionContainer surface="canvas" spacing="default" borderBottom>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-5">
            <p className={themeTokens.typography.kicker}>01 · Professional Background</p>
            <h2 className={themeTokens.typography.sectionHeadline}>
              Practical web development focused on service clarity and long-term usefulness.
            </h2>
            {aboutContent.background.map((paragraph, index) => (
              <p
                key={index}
                className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed"
              >
                {paragraph}
              </p>
            ))}

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button to="/services/" variant="primary" size="md">
                Explore Services
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button to="/contact/" variant="secondary" size="md">
                Contact MD Selim
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <VisualWireframeCanvas variant="founder-studio" />
          </div>
        </div>
      </SectionContainer>

      {/* 2. CORE CAPABILITIES */}
      <SectionContainer surface="canvas" spacing="default" borderBottom>
        <div className="space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className={themeTokens.typography.kicker}>02 · Capabilities</p>
            <h2 className={themeTokens.typography.sectionHeadline}>
              What I bring to small service business projects.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {aboutContent.capabilities.map((cap) => (
              <div
                key={cap.index}
                className="ds-card p-6 sm:p-7 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <p className="font-mono text-xs font-semibold text-[var(--accent-primary)]">
                    Capability {cap.index}
                  </p>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {cap.summary}
                  </p>
                </div>

                <ul className="pt-4 border-t border-[var(--border-subtle)] space-y-2">
                  {cap.items.map((item) => (
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
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* 3. WORKING PHILOSOPHY */}
      <SectionContainer surface="canvas" spacing="default" borderBottom>
        <div className="space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className={themeTokens.typography.kicker}>03 · Working Philosophy</p>
            <h2 className={themeTokens.typography.sectionHeadline}>
              Four principles that guide every build.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutContent.principles.map((item) => (
              <div key={item.index} className="ds-card p-6 sm:p-8 space-y-3">
                <p className="text-xs font-mono font-semibold text-[var(--accent-primary)]">
                  Principle {item.index}
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* 4. TECHNICAL STANDARDS & CTA */}
      <SectionContainer surface="canvas" spacing="default">
        <div className="space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className={themeTokens.typography.kicker}>04 · Technical Standards</p>
            <h2 className={themeTokens.typography.sectionHeadline}>
              Clean implementation without unnecessary complexity.
            </h2>
          </div>

          <div className="divide-y divide-[var(--border-subtle)] border-t border-b border-[var(--border-subtle)]">
            {aboutContent.technicalStandards.map((spec) => (
              <div
                key={spec.category}
                className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline"
              >
                <div className="md:col-span-3">
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">
                    {spec.category}
                  </h3>
                </div>
                <div className="md:col-span-5">
                  <p className="text-xs sm:text-sm font-mono text-[var(--accent-primary)]">
                    {spec.tools}
                  </p>
                </div>
                <div className="md:col-span-4">
                  <p className="text-sm text-[var(--text-secondary)]">{spec.purpose}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="ds-card p-7 sm:p-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                Interested in working together on your website?
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Send a short note about your business and what you want to build or improve.
              </p>
            </div>
            <Button to="/contact/" variant="primary" size="md">
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};
