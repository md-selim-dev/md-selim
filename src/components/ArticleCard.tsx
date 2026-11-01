import React from 'react';
import { ArrowRight } from 'lucide-react';
import { InsightArticle } from '../content/insightsContent';
import { themeTokens } from '../styles/themeTokens';

export interface ArticleCardProps {
  article: InsightArticle;
  onSelectArticle: (article: InsightArticle) => void;
}

/**
 * Reusable Article Card Component for listing Markdown Insights.
 */
export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelectArticle,
}) => {
  const articleHref = `/insights/?article=${article.slug}`;

  return (
    <article
      onClick={() => onSelectArticle(article)}
      className="group ds-card-interactive p-6 sm:p-8 flex flex-col justify-between space-y-6 cursor-pointer"
    >
      <div className="space-y-3">
        <p className={themeTokens.typography.metadata}>
          <span className="text-[var(--accent-primary)]">{article.topic}</span>
          <span className="mx-2" aria-hidden="true">·</span>
          <time>{article.publishedDate}</time>
          <span className="mx-2" aria-hidden="true">·</span>
          <span>{article.readTime}</span>
        </p>

        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
          <a
            href={articleHref}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelectArticle(article);
            }}
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
          >
            {article.title}
          </a>
        </h3>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {article.excerpt}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-mono font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]"
      >
        <span>Read Article: {article.topic}</span>
        <ArrowRight className="w-4 h-4 shrink-0" />
      </div>
    </article>
  );
};

