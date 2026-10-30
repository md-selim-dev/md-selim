import React from 'react';
import { ArrowRight } from 'lucide-react';
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
        kicker={aboutContent.kicker}
        title={aboutContent.headline}
        description={aboutContent.lead}
        metaLine={`${siteConfig.brand.founderName} · ${siteConfig.brand.role} · ${siteConfig.brand.domain}`}
      />

      {/* Narrative & Studio Blueprint */}
      <SectionContainer surface="white" spacing="default" borderBottom>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-5">
            <h2 className={themeTokens.typography.sectionHeadline}>
              Why clarity and technical structure matter for service businesses.
            </h2>
            {aboutContent.narrative.map((paragraph, index) => (
              <p
                key={index}
                className="text-sm sm:text-base text-slate-600 leading-relaxed"
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
                Get in Touch
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <VisualWireframeCanvas variant="founder-studio" />
          </div>
        </div>
      </SectionContainer>

      {/* Operating Principles */}
      <SectionContainer surface="canvas" spacing="default" borderBottom>
        <div className="space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className={themeTokens.typography.kicker}>Working Principles</p>
            <h2 className={themeTokens.typography.sectionHeadline}>
              Four standards that govern every website I build.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutContent.principles.map((item) => (
              <div
                key={item.index}
                className="rounded-xl bg-white border border-stone-200/90 p-6 sm:p-8 space-y-3"
              >
                <p className="text-xs font-mono font-semibold text-blue-700">
                  Principle {item.index}
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Technical Stack & Standards */}
      <SectionContainer surface="white" spacing="default">
        <div className="space-y-8">
          <div className="max-w-2xl space-y-3">
            <p className={themeTokens.typography.kicker}>Architecture & Tooling</p>
            <h2 className={themeTokens.typography.sectionHeadline}>
              Clean engineering without fragile dependencies.
            </h2>
          </div>

          <div className="divide-y divide-stone-200 border-t border-b border-stone-200">
            {aboutContent.technicalStandards.map((spec) => (
              <div
                key={spec.category}
                className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline"
              >
                <div className="md:col-span-3">
                  <h3 className="text-sm font-bold text-slate-900">{spec.category}</h3>
                </div>
                <div className="md:col-span-5">
                  <p className="text-xs sm:text-sm font-mono text-slate-800">{spec.tools}</p>
                </div>
                <div className="md:col-span-4">
                  <p className="text-sm text-slate-600">{spec.purpose}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};
