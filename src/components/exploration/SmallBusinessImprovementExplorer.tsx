import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { businessImprovementScenarios } from '../../data/explorationData';
import { Button } from '../Button';

/**
 * Experience 03: You Have a Small Business. What Would You Improve First?
 * Helps visitors discover which aspect of their digital presence to prioritize first.
 */
export const SmallBusinessImprovementExplorer: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(
    businessImprovementScenarios[0].id
  );

  const activeScenario =
    businessImprovementScenarios.find((s) => s.id === selectedId) ??
    businessImprovementScenarios[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Current Business Situation Selector */}
      <div className="lg:col-span-5 space-y-3">
        <p className="font-mono text-xs font-semibold text-[var(--accent-primary)]">
          Select the statement that best matches your current situation:
        </p>

        <div
          role="radiogroup"
          aria-label="Small business website situations"
          className="space-y-3"
        >
          {businessImprovementScenarios.map((scenario) => {
            const isSelected = scenario.id === selectedId;
            return (
              <button
                key={scenario.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelectedId(scenario.id)}
                className={`w-full p-4 rounded-lg border text-left transition-colors cursor-pointer space-y-1.5 ${
                  isSelected
                    ? 'bg-[var(--bg-interactive)] border-[var(--border-accent)]'
                    : 'bg-[var(--bg-canvas)] border-[var(--border-subtle)] hover:border-[var(--border-default)]'
                }`}
              >
                <p className="font-mono text-xs text-[var(--accent-primary)] font-semibold">
                  {scenario.index} · {scenario.situationLabel}
                </p>
                <p className="text-xs sm:text-sm font-medium text-[var(--text-primary)] leading-snug">
                  {scenario.situationStatement}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Recommended Priority & Action Plan */}
      <div className="lg:col-span-7 ds-card p-6 sm:p-8 space-y-6">
        <div className="space-y-2 border-b border-[var(--border-subtle)] pb-5">
          <p className="font-mono text-xs font-semibold text-[var(--accent-primary)]">
            Recommended Priority · Scenario {activeScenario.index}
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
            {activeScenario.improveFirstTitle}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {activeScenario.whyThisFirst}
          </p>
        </div>

        <div className="ds-surface-inset p-5 space-y-3">
          <h4 className="font-mono text-xs font-semibold text-[var(--text-primary)]">
            Recommended First 3 Actions
          </h4>
          <ul className="space-y-2.5">
            {activeScenario.firstThreeActions.map((action) => (
              <li
                key={action}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-primary)]"
              >
                <Check className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="ds-surface-inset p-4 space-y-1">
            <p className="font-mono text-[11px] font-semibold text-[var(--accent-primary)]">
              Relevant Service Fit
            </p>
            <p className="text-xs font-medium text-[var(--text-primary)]">
              {activeScenario.recommendedService}
            </p>
          </div>

          <div className="ds-surface-inset p-4 space-y-1">
            <p className="font-mono text-[11px] font-semibold text-[var(--text-secondary)]">
              What Can Wait Until Later
            </p>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {activeScenario.whatCanWait}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
          <Button to={activeScenario.ctaRoute} variant="primary" size="sm">
            {activeScenario.ctaLabel}
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
          <Button to="/contact/" variant="quiet" size="sm">
            Ask for a tailored recommendation
          </Button>
        </div>
      </div>
    </div>
  );
};
