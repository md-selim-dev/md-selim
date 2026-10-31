import React, { useState } from 'react';
import { ArrowRight, Check, RotateCcw } from 'lucide-react';
import {
  ClarityAnswerValue,
  clarityCriteria,
} from '../../data/explorationData';
import { Button } from '../Button';

type AnswersMap = Record<string, ClarityAnswerValue>;

const INITIAL_ANSWERS: AnswersMap = {
  'value-proposition': 2,
  'target-audience': 1,
  'service-presentation': 1,
  'user-experience': 2,
  'cta-visibility': 1,
  'trust-signals': 1,
  'mobile-experience': 2,
};

/**
 * Experience 01: Website Clarity Checker
 * Evaluates Value Proposition, Target Audience, Service Presentation, UX,
 * CTA Visibility, Trust Signals, and Mobile Experience.
 */
export const WebsiteClarityChecker: React.FC = () => {
  const [answers, setAnswers] = useState<AnswersMap>(INITIAL_ANSWERS);

  const maxScore = clarityCriteria.length * 2;
  const currentScore = clarityCriteria.reduce(
    (sum, item) => sum + (answers[item.id] ?? 0),
    0
  );
  const percentage = Math.round((currentScore / maxScore) * 100);

  const getScoreBand = (pct: number) => {
    if (pct >= 85) {
      return {
        label: 'Strong Clarity Foundation',
        summary:
          'Your website covers the core fundamentals well. Focus on ongoing refinements, fresh project proof, and technical SEO maintenance.',
      };
    }
    if (pct >= 55) {
      return {
        label: 'Moderate Clarity · Key Gaps Present',
        summary:
          'Your website has a working baseline, but several structural or messaging gaps may be causing qualified prospects to hesitate.',
      };
    }
    return {
      label: 'High Friction · Priority Restructure Needed',
      summary:
        'Prospective clients likely struggle to understand your offerings or take the next step. Restructuring your core pages should be your first priority.',
    };
  };

  const scoreBand = getScoreBand(percentage);

  const priorityRecommendations = clarityCriteria.filter(
    (item) => (answers[item.id] ?? 0) < 2
  );

  const handleSetAnswer = (id: string, value: ClarityAnswerValue) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="space-y-8">
      {/* Preliminary Disclaimer Banner */}
      <div className="ds-surface-inset p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          <strong className="font-mono text-[var(--accent-primary)]">
            Preliminary Assessment Note:
          </strong>{' '}
          This is a preliminary checklist-based assessment to help identify practical improvement areas—not an automated technical crawl or certified audit.
        </p>
        <button
          type="button"
          onClick={() => setAnswers(INITIAL_ANSWERS)}
          className="inline-flex items-center gap-1.5 min-h-[40px] py-1.5 font-mono text-xs text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors shrink-0 cursor-pointer self-start sm:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset checklist
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 7 Evaluation Criteria Questionnaire */}
        <div className="lg:col-span-7 space-y-4">
          {clarityCriteria.map((criterion) => {
            const currentVal = answers[criterion.id];
            return (
              <div
                key={criterion.id}
                className="ds-surface-inset p-4 sm:p-5 space-y-4"
              >
                <div className="space-y-1.5">
                  <p className="font-mono text-xs text-[var(--accent-primary)]">
                    {criterion.index} · {criterion.category}
                  </p>
                  <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                    {criterion.question}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {criterion.helperText}
                  </p>
                </div>

                <div
                  role="radiogroup"
                  aria-label={criterion.category}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1"
                >
                  {[
                    { label: 'Clearly in place', value: 2 as ClarityAnswerValue },
                    { label: 'Partially / Unsure', value: 1 as ClarityAnswerValue },
                    { label: 'Not in place', value: 0 as ClarityAnswerValue },
                  ].map((option) => {
                    const active = currentVal === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => handleSetAnswer(criterion.id, option.value)}
                        className={`min-h-[44px] flex items-center px-3 py-2 text-xs font-mono rounded-md border text-left transition-colors cursor-pointer ${
                          active
                            ? 'bg-[var(--bg-interactive)] border-[var(--border-accent)] text-[var(--text-primary)] font-semibold'
                            : 'bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Live Score & Actionable Recommendations */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="ds-card p-5 sm:p-7 space-y-6">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[var(--border-subtle)] pb-5">
              <div>
                <p className="font-mono text-xs text-[var(--accent-primary)]">
                  Checklist Score
                </p>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mt-1">
                  {scoreBand.label}
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-2xl sm:text-3xl font-mono font-bold tabular-nums text-[var(--accent-primary)]">
                  {percentage}%
                </p>
                <p className="font-mono text-[11px] text-[var(--text-secondary)] tabular-nums">
                  {currentScore} / {maxScore} criteria points
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {scoreBand.summary}
            </p>

            {/* Actionable Recommendations List */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-semibold text-[var(--text-primary)]">
                Actionable Recommendations ({priorityRecommendations.length} priority{' '}
                {priorityRecommendations.length === 1 ? 'area' : 'areas'})
              </h4>

              {priorityRecommendations.length === 0 ? (
                <div className="ds-surface-inset p-4 text-xs text-[var(--text-primary)] flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                  <span>
                    All seven clarity criteria are marked as clearly in place. Focus on periodic content updates and technical SEO maintenance.
                  </span>
                </div>
              ) : (
                <ul className="space-y-3">
                  {priorityRecommendations.map((item) => {
                    const val = answers[item.id];
                    const recText =
                      val === 0
                        ? item.recommendationIfMissing
                        : item.recommendationIfPartial;
                    return (
                      <li
                        key={item.id}
                        className="ds-surface-inset p-3.5 space-y-1 text-xs"
                      >
                        <p className="font-mono font-semibold text-[var(--accent-primary)]">
                          {item.index} · {item.category}{' '}
                          <span className="text-[var(--text-secondary)] font-normal">
                            ({val === 0 ? 'Missing' : 'Partial'})
                          </span>
                        </p>
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                          {recText}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Contextual CTA */}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
              <Button to="/contact/" variant="primary" size="sm">
                Request a Personal Website Review
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
              <Button to="/services/" variant="quiet" size="sm">
                View Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
