import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/Button';
import { SectionContainer } from '../components/SectionContainer';
import { servicesData, ServiceTier } from '../data/servicesData';
import { PageHeader } from '../layouts/PageHeader';
import { themeTokens } from '../styles/themeTokens';

export const ServicesPage: React.FC = () => {
  const [selectedTierId, setSelectedTierId] = useState<ServiceTier['id']>('core');
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);

  const activeTier =
    servicesData.tiers.find((t) => t.id === selectedTierId) ?? servicesData.tiers[0];

  return (
    <div>
      <PageHeader
        kicker="Services & Engagement Structure"
        title="Webflow development, technical SEO setup, and ongoing website care."
        description="A practical, three-pillar service structure designed specifically for small service businesses that need a clear, credible digital presence without agency bloat."
        metaLine="Core Service: Webflow Websites & Landing Pages · Supporting: On-Page & Technical SEO · Recurring: Ongoing Maintenance"
        actions={
          <>
            <Button to="/contact/" variant="primary" size="md">
              Request a Project Proposal
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button to="/work/" variant="secondary" size="md">
              See Client Outcomes
            </Button>
          </>
        }
      />

      {/* Interactive Service Scope Inspector + Full Tier Breakdown */}
      <SectionContainer surface="white" spacing="default" borderBottom>
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <p className={themeTokens.typography.kicker}>Service Architecture</p>
              <h2 className={themeTokens.typography.sectionHeadline}>
                Three focused services that work together or independently.
              </h2>
            </div>

            {/* Interactive Segmented Selector */}
            <div
              role="tablist"
              aria-label="Filter service tier focus"
              className="inline-flex items-center gap-1 p-1 bg-[#F3F2EE] border border-stone-200 rounded-lg self-start"
            >
              {servicesData.tiers.map((tier) => {
                const isSelected = tier.id === selectedTierId;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedTierId(tier.id)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-white text-slate-900 shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tier.index}. {tier.tierLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Focused Interactive Highlight Panel for Selected Service */}
          <div className="rounded-xl bg-[#FAF9F6] border border-stone-200/90 p-6 sm:p-8 flex flex-col lg:flex-row justify-between gap-8">
            <div className="lg:w-7/12 space-y-4">
              <p className="text-xs font-mono text-blue-700 font-semibold">
                Selected Specification · {activeTier.index}. {activeTier.tierLabel}
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                {activeTier.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {activeTier.description}
              </p>
              <div className="pt-2 space-y-1 text-xs text-stone-600">
                <p>
                  <strong className="text-slate-900">Ideal for:</strong> {activeTier.idealFor}
                </p>
                <p>
                  <strong className="text-slate-900">Typical timeline:</strong>{' '}
                  {activeTier.timeline}
                </p>
              </div>
            </div>

            <div className="lg:w-5/12 rounded-lg bg-white border border-stone-200/90 p-5 sm:p-6 flex flex-col justify-between space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-900 mb-3">
                  Included Deliverables
                </p>
                <ul className="space-y-2">
                  {activeTier.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <Check className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between">
                <span className="text-xs text-stone-500">Tailored scope proposal</span>
                <Button to="/contact/" variant="primary" size="sm">
                  Inquire About {activeTier.tierLabel}
                </Button>
              </div>
            </div>
          </div>

          {/* Complete Side-by-Side Reference of All Three Services */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
            {servicesData.tiers.map((tier) => (
              <div
                key={tier.id}
                onClick={() => setSelectedTierId(tier.id)}
                className={`rounded-xl p-6 sm:p-7 border transition-colors cursor-pointer flex flex-col justify-between space-y-6 ${
                  selectedTierId === tier.id
                    ? 'bg-white border-blue-700'
                    : 'bg-[#FAF9F6] border-stone-200/90 hover:border-stone-400'
                }`}
              >
                <div className="space-y-3">
                  <p className="text-xs font-mono text-stone-500">
                    {tier.index} · {tier.tierLabel}
                  </p>
                  <h3 className="text-lg font-bold tracking-tight text-slate-900">
                    {tier.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{tier.subtitle}</p>
                </div>

                <div className="pt-4 border-t border-stone-200/80 space-y-2">
                  <p className="text-xs text-stone-500">{tier.timeline}</p>
                  <p className="text-xs font-medium text-blue-700">
                    {selectedTierId === tier.id ? 'Currently inspecting above' : 'Click to inspect deliverables'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Process & Workflow Section */}
      <SectionContainer surface="canvas" spacing="default" borderBottom>
        <div className="space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className={themeTokens.typography.kicker}>How We Work Together</p>
            <h2 className={themeTokens.typography.sectionHeadline}>
              A structured four-step delivery process from positioning to launch.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.processPhases.map((phase) => (
              <div
                key={phase.step}
                className="rounded-xl bg-white border border-stone-200/90 p-6 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-stone-500">
                    <span className="text-blue-700 font-semibold">Step {phase.step}</span>
                    <span>{phase.duration}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{phase.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{phase.summary}</p>
                </div>

                <div className="pt-4 border-t border-stone-200/80 space-y-1.5">
                  <p className="text-[11px] font-semibold text-slate-900">Key Outputs</p>
                  {phase.outputs.map((out) => (
                    <p key={out} className="text-xs text-stone-600">
                      · {out}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Frequently Asked Questions */}
      <SectionContainer surface="white" spacing="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-4">
            <p className={themeTokens.typography.kicker}>Common Questions</p>
            <h2 className={themeTokens.typography.sectionHeadline}>
              Clear answers before we begin.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Have a specific question about your existing website or project timeline? Reach out directly for a straightforward assessment.
            </p>
            <div className="pt-2">
              <Button to="/contact/" variant="primary" size="md">
                Ask a Question
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7 divide-y divide-stone-200 border-t border-b border-stone-200">
            {servicesData.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={faq.question} className="py-5">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    <span className="text-base font-semibold text-slate-900">
                      {faq.question}
                    </span>
                    <span className="text-xs font-mono text-blue-700 shrink-0">
                      {isOpen ? 'Hide' : 'Read'}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed pr-6">
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
