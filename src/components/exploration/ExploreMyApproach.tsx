import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { approachSteps } from '../../data/explorationData';
import { Button } from '../Button';

/**
 * Experience 02: Explore My Approach
 * Interactive step-by-step walkthrough of how a website project is approached.
 */
export const ExploreMyApproach: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const currentStep = approachSteps[activeIndex] ?? approachSteps[0];

  return (
    <div className="space-y-8">
      {/* Interactive Step Selector Bar */}
      <div
        role="tablist"
        aria-label="Project approach steps"
        className="grid grid-cols-1 sm:grid-cols-5 gap-2.5"
      >
        {approachSteps.map((step, index) => {
          const isCurrent = index === activeIndex;
          return (
            <button
              key={step.id}
              type="button"
              role="tab"
              aria-selected={isCurrent}
              onClick={() => setActiveIndex(index)}
              className={`p-3.5 rounded-lg border text-left transition-colors cursor-pointer ${
                isCurrent
                  ? 'bg-[var(--bg-interactive)] border-[var(--border-accent)]'
                  : 'bg-[var(--bg-canvas)] border-[var(--border-subtle)] hover:border-[var(--border-default)]'
              }`}
            >
              <p className="font-mono text-xs font-semibold text-[var(--accent-primary)]">
                Step {step.stepNumber}
              </p>
              <p className="text-xs font-bold text-[var(--text-primary)] mt-1 line-clamp-1">
                {step.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Step Detail View */}
      <div className="ds-card p-6 sm:p-8 lg:p-9 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-[var(--border-subtle)] pb-6">
          <div className="space-y-2 max-w-2xl">
            <p className="font-mono text-xs font-semibold text-[var(--accent-primary)]">
              Step {currentStep.stepNumber} of 0{approachSteps.length} ·{' '}
              {currentStep.phaseFocus}
            </p>
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">
              {currentStep.title}
            </h3>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {currentStep.summary}
            </p>
          </div>

          <div className="ds-surface-inset p-4 lg:max-w-xs space-y-1">
            <p className="font-mono text-[11px] font-semibold text-[var(--accent-primary)]">
              Why This Step Matters
            </p>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {currentStep.whyItMatters}
            </p>
          </div>
        </div>

        {/* Key Decisions + Deliverables + Client Input */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 ds-surface-inset p-5 space-y-3">
            <h4 className="font-mono text-xs font-semibold text-[var(--text-primary)]">
              Key Decisions Made in Step {currentStep.stepNumber}
            </h4>
            <ul className="space-y-2.5">
              {currentStep.keyDecisions.map((decision) => (
                <li
                  key={decision}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-primary)]"
                >
                  <Check className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                  <span>{decision}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="ds-surface-inset p-5 space-y-2">
              <h4 className="font-mono text-xs font-semibold text-[var(--accent-primary)]">
                Your Involvement
              </h4>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {currentStep.clientInvolvement}
              </p>
            </div>

            <div className="ds-surface-inset p-5 space-y-2">
              <h4 className="font-mono text-xs font-semibold text-[var(--text-primary)]">
                Tangible Outputs
              </h4>
              <ul className="space-y-1.5">
                {currentStep.deliverableOutputs.map((output) => (
                  <li key={output} className="text-xs text-[var(--text-secondary)]">
                    · {output}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Step Navigation & Contextual Link */}
        <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              disabled={activeIndex === 0}
              onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Previous Step
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={activeIndex === approachSteps.length - 1}
              onClick={() =>
                setActiveIndex((prev) => Math.min(approachSteps.length - 1, prev + 1))
              }
            >
              Next Step
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <Button to={currentStep.relatedRoute.path} variant="quiet" size="sm">
            {currentStep.relatedRoute.label}
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
