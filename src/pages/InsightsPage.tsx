import React, { useEffect, useState } from 'react';
import { ArticleCard } from '../components/ArticleCard';
import { SectionContainer } from '../components/SectionContainer';
import { siteConfig } from '../config/siteConfig';
import {
  InsightArticle,
  insightsContent,
  InsightTopic,
} from '../content/insightsContent';
import { ArticleLayout } from '../layouts/ArticleLayout';
import { PageHeader } from '../layouts/PageHeader';
import { applyPageSeo } from '../scripts/seoSchema';

const TOPICS: InsightTopic[] = [
  'All Topics',
  'Website Clarity',
  'Webflow Architecture',
  'On-Page & Technical SEO',
  'Website Maintenance',
];

function getInitialArticleFromUrl(): InsightArticle | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('article');
  if (!slug) return null;
  return insightsContent.find((a) => a.slug === slug || a.id === slug) ?? null;
}

export const InsightsPage: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<InsightTopic>('All Topics');
  const [activeArticle, setActiveArticle] = useState<InsightArticle | null>(() =>
    getInitialArticleFromUrl()
  );

  // Sync URL query parameter and BlogPosting Schema.org JSON-LD when reading an article
  useEffect(() => {
    if (activeArticle) {
      const canonicalUrl = `${siteConfig.brand.siteUrl}/insights/?article=${activeArticle.slug}`;
      if (window.location.search !== `?article=${activeArticle.slug}`) {
        window.history.replaceState(
          { path: '/insights/' },
          '',
          `/insights/?article=${activeArticle.slug}`
        );
      }
      applyPageSeo('/insights/', {
        title: `${activeArticle.title} | MD SELIM`,
        description: activeArticle.excerpt,
        canonicalUrl,
        ogType: 'article',
        article: activeArticle,
        breadcrumbs: [
          { name: 'Home', url: `${siteConfig.brand.siteUrl}/` },
          { name: 'Insights', url: `${siteConfig.brand.siteUrl}/insights/` },
          { name: activeArticle.title, url: canonicalUrl },
        ],
      });
    } else {
      if (window.location.search.includes('article=')) {
        window.history.replaceState({ path: '/insights/' }, '', '/insights/');
      }
      applyPageSeo('/insights/');
    }
  }, [activeArticle]);

  const filteredArticles =
    selectedTopic === 'All Topics'
      ? insightsContent
      : insightsContent.filter((article) => article.topic === selectedTopic);

  if (activeArticle) {
    return (
      <ArticleLayout
        article={activeArticle}
        onBack={() => {
          setActiveArticle(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Insights' },
        ]}
        kicker="Insights & Markdown Content Library"
        title="Practical articles on website clarity, Webflow architecture, and SEO."
        description="Guides written for small service business owners looking to build a credible website, understand on-page and technical SEO fundamentals, and maintain their site effectively."
        metaLine="Published from structured Markdown (.md) files in /src/content/insights/"
      />

      <SectionContainer surface="canvas" spacing="default">
        {/* Topic Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div
            role="tablist"
            aria-label="Filter articles by topic"
            className="w-full sm:w-auto inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg self-start"
          >
            {TOPICS.map((topic) => {
              const active = selectedTopic === topic;
              return (
                <button
                  key={topic}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedTopic(topic)}
                  className={`min-h-[40px] px-3.5 py-2 text-xs font-mono font-medium rounded-md transition-colors sm:whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[var(--bg-interactive)] text-[var(--accent-primary)] border border-[var(--border-interactive)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-[var(--text-secondary)] font-mono tabular-nums">
            {filteredArticles.length} Markdown {filteredArticles.length === 1 ? 'article' : 'articles'}
          </p>
        </div>

        {/* Reusable Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelectArticle={(item) => {
                setActiveArticle(item);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ))}
        </div>
      </SectionContainer>
    </div>
  );
};

