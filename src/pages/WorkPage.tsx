import React, { useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { Button } from '../components/Button';
import { SectionContainer } from '../components/SectionContainer';
import { VisualWireframeCanvas } from '../components/VisualWireframeCanvas';
import { CaseStudy, WorkCategory, workData } from '../data/workData';
import { PageHeader } from '../layouts/PageHeader';

const CATEGORIES: WorkCategory[] = [
  'All',
  'Webflow Websites',
  'Landing Pages',
  'Technical SEO',
];

export const WorkPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<WorkCategory>('All');
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);

  const filteredProjects =
    selectedCategory === 'All'
      ? workData
      : workData.filter((item) => item.category === selectedCategory);

  return (
    <div>
      <PageHeader
        kicker="Selected Work & Case Studies"
        title="Websites designed for clarity, search visibility, and client conversion."
        description="Explore how small service businesses—across legal, healthcare, engineering, and financial advisory—use structured Webflow websites and technical SEO foundations to generate qualified inquiries."
        metaLine="Every project includes semantic HTML structure, on-page SEO setup, and mobile performance verification."
      />

      <SectionContainer surface="canvas" spacing="default" borderBottom>
        {/* Interactive Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div
            role="tablist"
            aria-label="Filter case studies by service type"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-white border border-stone-200/90 rounded-lg self-start"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-stone-500 font-mono tabular-nums">
            Showing {filteredProjects.length} of {workData.length} case studies
          </p>
        </div>

        {/* Case Study List */}
        <div className="space-y-10">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="rounded-xl bg-white border border-stone-200/90 p-6 sm:p-9 lg:p-10 space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4">
                  {/* Clean Unboxed Metadata */}
                  <p className="text-xs text-stone-500">
                    <span className="font-mono font-semibold text-blue-700">
                      {project.index}
                    </span>
                    <span className="mx-2" aria-hidden="true">·</span>
                    <span className="font-medium text-slate-800">{project.client}</span>
                    <span className="mx-2" aria-hidden="true">·</span>
                    <span>{project.industry}</span>
                    <span className="mx-2" aria-hidden="true">·</span>
                    <span>{project.location}</span>
                    <span className="mx-2" aria-hidden="true">·</span>
                    <span>{project.year}</span>
                  </p>

                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                    {project.headline}
                  </h2>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {project.summary}
                  </p>

                  <p className="text-xs text-stone-500 pt-1">
                    Scope: {project.servicesProvided.join(' · ')}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setActiveCaseStudy(project)}
                    >
                      Inspect Full Architecture & SEO Breakdown
                    </Button>
                    <Button to="/contact/" variant="quiet" size="sm">
                      Discuss a similar project
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <VisualWireframeCanvas variant={project.wireframeVariant} />
                </div>
              </div>

              {/* Claim-to-Proof Adjacency: Metrics + Attributable Client Testimonial */}
              <div className="pt-6 border-t border-stone-200/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 grid grid-cols-3 gap-4">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="text-lg sm:text-2xl font-mono font-bold tabular-nums text-slate-900">
                        {metric.value}
                      </p>
                      <p className="text-xs font-medium text-slate-800 mt-0.5">
                        {metric.label}
                      </p>
                      <p className="text-[11px] text-stone-500">{metric.timeframe}</p>
                    </div>
                  ))}
                </div>

                <blockquote className="lg:col-span-6 rounded-lg bg-[#FAF9F6] border border-stone-200/80 p-4 sm:p-5 space-y-2">
                  <p className="text-xs sm:text-sm font-serif italic text-slate-700 leading-relaxed">
                    "{project.testimonial.quote}"
                  </p>
                  <footer className="text-xs text-stone-500">
                    <strong className="text-slate-900 font-sans not-italic">
                      {project.testimonial.author}
                    </strong>{' '}
                    · {project.testimonial.role}, {project.testimonial.company}
                  </footer>
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </SectionContainer>

      {/* Case Study Specification Modal */}
      {activeCaseStudy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto"
          onClick={() => setActiveCaseStudy(null)}
        >
          <div
            className="w-full max-w-3xl rounded-xl bg-white border border-stone-200 p-6 sm:p-8 space-y-6 my-8 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <p className="text-xs text-stone-500">
                  {activeCaseStudy.client} · {activeCaseStudy.industry} · {activeCaseStudy.location}
                </p>
                <h2
                  id="case-study-modal-title"
                  className="text-xl font-bold text-slate-900 mt-1"
                >
                  {activeCaseStudy.headline}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close case study details"
                onClick={() => setActiveCaseStudy(null)}
                className="p-2 rounded-lg text-stone-500 hover:text-slate-900 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-[#FAF9F6] border border-stone-200/80 space-y-2">
                <h3 className="text-xs font-semibold text-slate-900">The Business Challenge</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeCaseStudy.challenge}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[#FAF9F6] border border-stone-200/80 space-y-2">
                <h3 className="text-xs font-semibold text-slate-900">The Webflow & UX Solution</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeCaseStudy.solution}
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              <h3 className="text-xs font-semibold text-slate-900">
                On-Page & Technical SEO Implementation
              </h3>
              <ul className="space-y-2">
                {activeCaseStudy.seoFoundation.map((seoItem) => (
                  <li key={seoItem} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <span>{seoItem}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <Button
                to="/contact/"
                variant="primary"
                size="md"
                onClick={() => setActiveCaseStudy(null)}
              >
                Request a Consultation for Your Site
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setActiveCaseStudy(null)}
              >
                Close Specification
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
