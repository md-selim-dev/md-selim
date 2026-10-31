import React from 'react';
import { RoutePath } from '../config/siteConfig';
import { navigateTo } from '../scripts/router';

export interface BreadcrumbItem {
  label: string;
  path?: RoutePath;
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Phase 08: Semantic HTML Breadcrumb Navigation
 * Pairs with Schema.org BreadcrumbList structured data emitted in <head>.
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  if (!items || items.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="pb-1">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-[var(--text-secondary)]">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="inline-flex items-center gap-1.5">
              {idx > 0 && (
                <span aria-hidden="true" className="text-[var(--text-secondary)] opacity-60">
                  /
                </span>
              )}
              {isLast ? (
                <span
                  aria-current="page"
                  className="text-[var(--text-primary)] font-medium truncate max-w-[260px] sm:max-w-[440px]"
                >
                  {item.label}
                </span>
              ) : item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="hover:text-[var(--accent-primary)] transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ) : item.path ? (
                <a
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(item.path!);
                  }}
                  className="hover:text-[var(--accent-primary)] transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
