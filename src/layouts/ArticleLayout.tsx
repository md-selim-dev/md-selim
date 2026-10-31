import React from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '../components/Button';
import { SectionContainer } from '../components/SectionContainer';
import { InsightArticle } from '../content/insightsContent';
import { themeTokens } from '../styles/themeTokens';

export interface ArticleLayoutProps {
  article: InsightArticle;
  onBack: () => void;
}

/**
 * Reusable Article Layout for rendering parsed Markdown (.md) articles.
 */
export const ArticleLayout: React.FC<ArticleLayoutProps> = ({ article, onBack }) => {
  return (
    <article>
      <SectionContainer surface="canvas" spacing="compact" borderBottom>
        <div className="max-w-3xl space-y-5">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 min-h-[44px] py-2 font-mono text-xs font-medium text-[var(--accent-primary)] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to all Insights
          </button>

          <p className={themeTokens.typography.metadata}>
            <span className="text-[var(--accent-primary)]">{article.topic}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Published {article.publishedDate}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>{article.readTime}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Markdown Source</span>
          </p>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </SectionContainer>

      <SectionContainer surface="canvas" spacing="default">
        <div className="max-w-3xl space-y-10">
          {/* Key Takeaways Box */}
          {article.keyTakeaways.length > 0 && (
            <div className="ds-card p-6 space-y-3">
              <h2 className="font-mono text-xs font-semibold tracking-wider text-[var(--accent-primary)]">
                Key Takeaways
              </h2>
              <ul className="space-y-2.5">
                {article.keyTakeaways.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-[var(--text-primary)]"
                  >
                    <Check className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Rendered Markdown Sections */}
          <div className="space-y-8">
            {article.sections.map((sec) => (
              <section key={sec.heading} className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                  {sec.heading}
                </h2>
                {sec.paragraphs.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
                {sec.bullets.length > 0 && (
                  <ul className="space-y-2 pt-1">
                    {sec.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-sm text-[var(--text-primary)]"
                      >
                        <Check className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Article Footer CTA */}
          <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
            <Button variant="secondary" size="sm" onClick={onBack}>
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Insights Index
            </Button>
            <Button to="/contact/" variant="primary" size="sm">
              Discuss Your Website Project
            </Button>
          </div>
        </div>
      </SectionContainer>
    </article>
  );
};
