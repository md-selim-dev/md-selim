import React, { useState } from 'react';
import { ArrowRight, Check, Minus } from 'lucide-react';
import { Button } from '../components/Button';
import { SectionContainer } from '../components/SectionContainer';
import { ServiceItem, servicesData } from '../data/servicesData';
import { PageHeader } from '../layouts/PageHeader';
import { themeTokens } from '../styles/themeTokens';

export const ServicesPage: React.FC = () => {
  const [selectedServiceId, setSelectedServiceId] =
    useState<ServiceItem['id']>('webflow-websites');
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);

  const activeService =
    servicesData.services.find((s) => s.id === selectedServiceId) ??
    servicesData.services[0];

  return (
    <div>
      <PageHeader
        kicker="Services & Scope Specifications"
        title="Webflow websites, landing pages, SEO setup, and ongoing maintenance."
        description="Clear, practical web development services built for small service businesses. Every engagement includes defined deliverables and transparent scope boundaries."
        metaLine="01. Webflow Websites · 02. Landing Pages · 03. Basic On-Page SEO · 04. Technical SEO Setup · 05. Ongoing Maintenance"
        actions={
          <>
            <Button to="/contact/" variant="primary" size="md">
              Inquire About a Project
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button to="/work/" variant="secondary" size="md">
              View Architecture Examples
            </Button>
          </>
        }
      />

      {/* 1. ALL FIVE CORE, SUPPORTING & RECURRING SERVICES */}
      <SectionContainer surface="canvas" spacing="default" borderBottom>
        <div className="space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <p className={themeTokens.typography.kicker}>01 · Service Breakdown</p>
              <h2 className={themeTokens.typography.sectionHeadline}>
                Five clearly scoped capabilities.
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Select any service below to inspect its exact deliverables and exclusions, or scroll through the full list.
              </p>
            </div>

            {/* Interactive Service Selector Tabs */}
            <div
              role="tablist"
              aria-label="Select service specification"
              className="w-full sm:w-auto inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg self-start"
            >
              {servicesData.services.map((service) => {
                const isSelected = service.id === selectedServiceId;
                return (
                  <button
                    key={service.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedServiceId(service.id)}
                    className={`min-h-[40px] px-3 py-2 text-xs font-mono font-medium rounded-md transition-colors text-left sm:whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-[var(--bg-interactive)] text-[var(--accent-primary)] border border-[var(--border-interactive)] font-semibold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {service.index}. {service.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Service Inspector Panel (Deliverables + Exclusions Side-by-Side) */}
          <div className="ds-card p-5 sm:p-9 space-y-8">
            <div className="space-y-3 max-w-3xl">
              <p className="font-mono text-xs font-semibold text-[var(--accent-primary)]">
                {activeService.index} · {activeService.categoryLabel}
              </p>
              <h3 className="text-xl sm:text-3xl font-bold text-[var(--text-primary)]">
                {activeService.title}
              </h3>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {activeService.description}
              </p>
              <p className="text-xs text-[var(--text-secondary)] pt-1">
                <strong className="text-[var(--text-primary)]">Best suited for:</strong>{' '}
                {activeService.whoItIsFor}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              {/* Included Deliverables */}
              <div className="ds-surface-inset p-4 sm:p-6 space-y-4">
                <h4 className="font-mono text-xs font-semibold text-[var(--accent-primary)]">
                  What Is Included (Deliverables)
                </h4>
                <ul className="space-y-2.5">
                  {activeService.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-primary)]"
                    >
                      <Check className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Explicit Exclusions */}
              <div className="ds-surface-inset p-4 sm:p-6 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <h4 className="font-mono text-xs font-semibold text-[var(--text-secondary)]">
                    What Is Not Included (Exclusions)
                  </h4>
                  <ul className="space-y-2.5">
                    {activeService.exclusions.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)]"
                      >
                        <Minus className="w-4 h-4 text-[var(--text-secondary)] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
                  <span className="font-mono text-xs text-[var(--text-secondary)]">
                    Need this service?
                  </span>
                  <Button to="/contact/" variant="primary" size="sm">
                    Discuss {activeService.title}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Complete 5-Service Reference Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.services.map((service) => {
              const isSelected = service.id === selectedServiceId;
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`p-5 sm:p-6 cursor-pointer flex flex-col justify-between space-y-5 ${
                    isSelected ? 'ds-card-active' : 'ds-card-interactive'
                  }`}
                >
                  <div className="space-y-2.5">
                    <p className="font-mono text-xs text-[var(--accent-primary)]">
                      {service.index} · {service.categoryLabel}
                    </p>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {service.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono">
                    <span className="text-[var(--text-secondary)]">
                      {service.deliverables.length} deliverables
                    </span>
                    <span className="text-[var(--accent-primary)]">
                      {isSelected ? 'Selected above' : 'Inspect scope'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SectionContainer>

      {/* 2. GENERAL DELIVERABLES & EXCLUSIONS POLICY */}
      <SectionContainer surface="canvas" spacing="default" borderBottom>
        <div className="space-y-8">
          <div className="max-w-2xl space-y-3">
            <p className={themeTokens.typography.kicker}>02 · Scope Boundaries</p>
            <h2 className={themeTokens.typography.sectionHeadline}>
              Clear boundaries keep projects on schedule and on budget.
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              To ensure high quality in Webflow development and technical SEO setup, I stay focused on my core discipline and explicitly exclude unrelated services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesData.globalExclusions.map((item) => (
              <div key={item.title} className="ds-card p-5 sm:p-6 space-y-2">
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  Not Offered: {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* 3. WORKING PROCESS */}
      <SectionContainer surface="canvas" spacing="default" borderBottom>
        <div className="space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className={themeTokens.typography.kicker}>03 · Working Process</p>
            <h2 className={themeTokens.typography.sectionHeadline}>
              How a project moves from initial brief to launch.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.processPhases.map((phase) => (
              <div
                key={phase.step}
                className="ds-card p-5 sm:p-6 flex flex-col justify-between space-y-6"
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
                  <p className="text-xs text-[var(--text-secondary)] pt-1">
                    <strong className="text-[var(--text-primary)]">Your input:</strong>{' '}
                    {phase.clientInput}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] space-y-1.5">
                  <p className="font-mono text-[11px] font-semibold text-[var(--text-primary)]">
                    Phase Outputs
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

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <SectionContainer surface="canvas" spacing="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-4">
            <p className={themeTokens.typography.kicker}>04 · Common Questions</p>
            <h2 className={themeTokens.typography.sectionHeadline}>
              Frequently asked questions about services and scope.
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              If you have a question that is not covered here, feel free to send a note through the contact page.
            </p>
            <div className="pt-2">
              <Button to="/contact/" variant="primary" size="md">
                Ask a Question
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7 divide-y divide-[var(--border-subtle)] border-t border-b border-[var(--border-subtle)]">
            {servicesData.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={faq.question} className="py-4 sm:py-5">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    className="w-full min-h-[44px] py-1 flex items-center justify-between gap-4 text-left cursor-pointer group"
                  >
                    <span className="text-sm sm:text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                      {faq.question}
                    </span>
                    <span className="text-xs font-mono text-[var(--accent-primary)] shrink-0">
                      {isOpen ? 'Hide' : 'Read'}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="mt-2.5 text-sm text-[var(--text-secondary)] leading-relaxed sm:pr-6">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};
