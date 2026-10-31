import React from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Button } from '../components/Button';
import { SectionContainer } from '../components/SectionContainer';
import { VisualWireframeCanvas } from '../components/VisualWireframeCanvas';
import { ProjectItem } from '../data/workData';
import { themeTokens } from '../styles/themeTokens';

export interface ProjectDetailLayoutProps {
  project: ProjectItem;
  onBack: () => void;
}

/**
 * Reusable Project Detail Layout.
 * Presents complete architectural, UX, and SEO breakdown with transparent project classification.
 */
export const ProjectDetailLayout: React.FC<ProjectDetailLayoutProps> = ({
  project,
  onBack,
}) => {
  return (
    <article>
      <SectionContainer surface="canvas" spacing="compact" borderBottom>
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Breadcrumbs
              items={[
                { label: 'Home', path: '/' },
                { label: 'Work', onClick: onBack },
                { label: project.title },
              ]}
            />
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 min-h-[44px] py-2 font-mono text-xs font-medium text-[var(--accent-primary)] hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to all projects
            </button>
          </div>

          <div className="max-w-3xl space-y-4">
            <p className={themeTokens.typography.metadata}>
              <span className="text-[var(--accent-primary)] font-semibold">
                Project {project.index}
              </span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span className="text-[var(--text-primary)] font-semibold">
                {project.projectType}
              </span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>{project.industry}</span>
            </p>

            <h1 className={themeTokens.typography.pageHeadline}>{project.title}</h1>

            <p className={themeTokens.typography.bodyLead}>{project.summary}</p>
          </div>

          {/* Transparent Classification Note */}
          <div className="ds-surface-interactive p-4 max-w-3xl">
            <p className="font-mono text-xs text-[var(--text-primary)]">
              <strong className="text-[var(--accent-primary)]">
                Classification ({project.projectType}):
              </strong>{' '}
              {project.projectTypeNote}
            </p>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer surface="canvas" spacing="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Detailed Breakdown */}
          <div className="lg:col-span-7 space-y-8">
            <section className="ds-card p-6 sm:p-8 space-y-3">
              <h2 className="font-mono text-xs font-semibold text-[var(--accent-primary)]">
                01. Context & Problem Addressed
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {project.contextAndProblem}
              </p>
            </section>

            <section className="ds-card p-6 sm:p-8 space-y-3">
              <h2 className="font-mono text-xs font-semibold text-[var(--accent-primary)]">
                02. Structural & UX Approach
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {project.structuralApproach}
              </p>
              <ul className="pt-3 space-y-2.5">
                {project.uxHighlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-[var(--text-primary)]"
                  >
                    <Check className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="ds-card p-6 sm:p-8 space-y-3">
              <h2 className="font-mono text-xs font-semibold text-[var(--accent-primary)]">
                03. On-Page & Technical SEO Setup
              </h2>
              <ul className="space-y-2.5">
                {project.seoImplementation.map((seoItem) => (
                  <li
                    key={seoItem}
                    className="flex items-start gap-2.5 text-sm text-[var(--text-primary)]"
                  >
                    <Check className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                    <span>{seoItem}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column: Visual Blueprint & Technical Specs */}
          <div className="lg:col-span-5 space-y-6">
            <VisualWireframeCanvas variant={project.wireframeVariant} />

            <div className="ds-card p-6 space-y-4">
              <h2 className="font-mono text-xs font-semibold text-[var(--accent-primary)]">
                Technical Specifications
              </h2>
              <dl className="divide-y divide-[var(--border-subtle)]">
                {project.technicalSpecs.map((spec) => (
                  <div key={spec.label} className="py-3 flex flex-col gap-1">
                    <dt className="font-mono text-xs text-[var(--text-secondary)]">
                      {spec.label}
                    </dt>
                    <dd className="text-sm font-semibold text-[var(--text-primary)]">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="ds-card p-6 space-y-4">
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                Need a similar structure for your business?
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Let’s discuss how this page structure and SEO setup can be adapted to your services.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button to="/contact/" variant="primary" size="sm">
                  Start an Inquiry
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
                <Button to="/services/" variant="secondary" size="sm">
                  Explore Services
                </Button>
                <Button variant="quiet" size="sm" onClick={onBack}>
                  All Projects
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </article>
  );
};

