import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { discoveryTopics } from '../../data/explorationData';
import { Button } from '../Button';

/**
 * Experience 04: Explore & Discover
 * Contains the 5 approved topics:
 * 1. Why do some websites fail to convert?
 * 2. 5 mistakes that damage business websites.
 * 3. What makes a website trustworthy?
 * 4. SEO vs AEO vs GEO.
 * 5. How website design influences customer decisions.
 */
export const ExploreAndDiscover: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    discoveryTopics[0].id
  );

  const activeTopic =
    discoveryTopics.find((t) => t.id === selectedTopicId) ?? discoveryTopics[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: 5 Approved Topics List */}
      <div className="lg:col-span-5 space-y-2.5">
        <p className="font-mono text-xs font-semibold text-[var(--accent-primary)] mb-3">
          Select a topic to explore:
        </p>

        <div role="tablist" aria-label="Explore and discover topics" className="space-y-2.5">
          {discoveryTopics.map((topic) => {
            const isSelected = topic.id === selectedTopicId;
            return (
              <button
                key={topic.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`w-full p-4 rounded-lg border text-left transition-colors cursor-pointer space-y-1 ${
                  isSelected
                    ? 'bg-[var(--bg-interactive)] border-[var(--border-accent)]'
                    : 'bg-[var(--bg-canvas)] border-[var(--border-subtle)] hover:border-[var(--border-default)]'
                }`}
              >
                <p className="font-mono text-xs text-[var(--accent-primary)]">
                  Topic {topic.index}
                </p>
                <p className="text-sm font-bold text-[var(--text-primary)]">
                  {topic.title}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {topic.shortSubtitle}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Topic Explanation & Contextual Links */}
      <div className="lg:col-span-7 ds-card p-6 sm:p-8 space-y-6">
        <div className="space-y-2 border-b border-[var(--border-subtle)] pb-5">
          <p className="font-mono text-xs font-semibold text-[var(--accent-primary)]">
            Topic {activeTopic.index} · Explore & Discover
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
            {activeTopic.title}
          </h3>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            {activeTopic.summary}
          </p>
        </div>

        {/* Structured Breakdown Points */}
        <div className="space-y-3">
          {activeTopic.corePoints.map((point) => (
            <div key={point.heading} className="ds-surface-inset p-4 space-y-1">
              <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                {point.heading}
              </h4>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {point.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Practical Takeaway */}
        <div className="ds-surface-interactive p-4 space-y-1">
          <p className="font-mono text-xs font-semibold text-[var(--accent-primary)]">
            Practical Takeaway
          </p>
          <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
            {activeTopic.practicalTakeaway}
          </p>
        </div>

        {/* Contextual CTA */}
        <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
          <Button to={activeTopic.relatedLink.path} variant="secondary" size="sm">
            {activeTopic.relatedLink.label}
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
          <Button to="/contact/" variant="quiet" size="sm">
            Discuss how this applies to your site
          </Button>
        </div>
      </div>
    </div>
  );
};
