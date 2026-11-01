import React, { startTransition, useState } from 'react';
import { themeTokens } from '../../styles/themeTokens';
import { ExploreAndDiscover } from './ExploreAndDiscover';
import { ExploreMyApproach } from './ExploreMyApproach';
import { SmallBusinessImprovementExplorer } from './SmallBusinessImprovementExplorer';
import { WebsiteClarityChecker } from './WebsiteClarityChecker';

export type ExplorationTabId =
  | 'clarity-checker'
  | 'explore-approach'
  | 'improve-first'
  | 'explore-discover';

interface ExplorationTabItem {
  id: ExplorationTabId;
  index: string;
  title: string;
  subtitle: string;
}

const EXPLORATION_TABS: ExplorationTabItem[] = [
  {
    id: 'clarity-checker',
    index: '01',
    title: 'Website Clarity Checker',
    subtitle: '7-point preliminary website self-assessment',
  },
  {
    id: 'explore-approach',
    index: '02',
    title: 'Explore My Approach',
    subtitle: 'Step-by-step project delivery walkthrough',
  },
  {
    id: 'improve-first',
    index: '03',
    title: 'You Have a Small Business. What Would You Improve First?',
    subtitle: 'Prioritize your next website or SEO improvement',
  },
  {
    id: 'explore-discover',
    index: '04',
    title: 'Explore & Discover',
    subtitle: '5 essential guides on conversion, trust, and SEO/AEO/GEO',
  },
];

export const ExplorationHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ExplorationTabId>('clarity-checker');

  return (
    <div className="space-y-10">
      {/* Section Header */}
      <div className="max-w-3xl space-y-3">
        <p className={themeTokens.typography.kicker}>
          05 · Interactive Exploration Experiences
        </p>
        <h2 className={themeTokens.typography.sectionHeadline}>
          Assess your website clarity, explore my working approach, or discover what to improve first.
        </h2>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          Select any of the four interactive tools below to evaluate your current website, understand how projects are delivered, or explore key concepts in web credibility and search visibility.
        </p>
      </div>

      {/* 4-Experience Selector Grid */}
      <div
        role="tablist"
        aria-label="Interactive Exploration Experiences"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
      >
        {EXPLORATION_TABS.map((tab) => {
          const isSelected = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              id={`exploration-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls="exploration-active-tabpanel"
              onClick={() => {
                startTransition(() => {
                  setActiveTab(tab.id);
                });
              }}
              className={`p-4 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                isSelected ? 'ds-card-active' : 'ds-card-interactive'
              }`}
            >
              <div className="space-y-1">
                <p className="font-mono text-xs font-semibold text-[var(--accent-primary)]">
                  Experience {tab.index}
                </p>
                <h3 className="text-sm font-bold text-[var(--text-primary)] leading-snug">
                  {tab.title}
                </h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">{tab.subtitle}</p>
            </button>
          );
        })}
      </div>

      {/* Active Experience Panel */}
      <div
        id="exploration-active-tabpanel"
        role="tabpanel"
        aria-labelledby={`exploration-tab-${activeTab}`}
        className="pt-2 min-h-[420px]"
      >
        {activeTab === 'clarity-checker' && <WebsiteClarityChecker />}
        {activeTab === 'explore-approach' && <ExploreMyApproach />}
        {activeTab === 'improve-first' && <SmallBusinessImprovementExplorer />}
        {activeTab === 'explore-discover' && <ExploreAndDiscover />}
      </div>
    </div>
  );
};
