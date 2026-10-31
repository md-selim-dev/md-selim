import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Button } from '../components/Button';
import { SectionContainer } from '../components/SectionContainer';
import { RoutePath } from '../config/siteConfig';
import { navigateTo } from '../scripts/router';
import { themeTokens } from '../styles/themeTokens';

const RECOVERY_DESTINATIONS: {
  index: string;
  label: string;
  path: RoutePath;
  summary: string;
}[] = [
  {
    index: '01',
    label: 'Services & Scope Specifications',
    path: '/services/',
    summary:
      'Review Webflow websites, landing pages, basic on-page SEO, technical SEO setup, and ongoing maintenance.',
  },
  {
    index: '02',
    label: 'Work & Architecture Showcases',
    path: '/work/',
    summary:
      'Explore demonstration architecture builds and live production website structures.',
  },
  {
    index: '03',
    label: 'About MD Selim',
    path: '/about/',
    summary:
      'Read about my professional background, capabilities, and four-principle working philosophy.',
  },
  {
    index: '04',
    label: 'Insights & Practical Guides',
    path: '/insights/',
    summary:
      'Browse Markdown articles on website clarity, Webflow maintainability, and technical SEO.',
  },
];

/**
 * Phase 08: Custom 404 Page (`noindex, nofollow`)
 * Provides clear recovery navigation and descriptive internal links.
 */
export const NotFoundPage: React.FC = () => {
  return (
    <div>
      <SectionContainer surface="canvas" spacing="compact" borderBottom>
        <div className="max-w-3xl space-y-5">
          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              { label: '404 · Page Not Found' },
            ]}
          />
          <p className={themeTokens.typography.kicker}>HTTP 404 · Page Not Found</p>
          <h1 className={themeTokens.typography.pageHeadline}>
            The page you requested could not be found.
          </h1>
          <p className={themeTokens.typography.bodyLead}>
            The link you followed may be outdated or the URL may have been typed incorrectly. Use the recovery links below to return to the homepage or navigate directly to a core section of mdselim.com.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Button to="/" variant="primary" size="md">
              Return to Homepage
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button to="/contact/" variant="secondary" size="md">
              Contact MD Selim
            </Button>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer surface="canvas" spacing="default">
        <div className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className={themeTokens.typography.kicker}>Primary Website Sections</p>
            <h2 className={themeTokens.typography.sectionHeadline}>
              Where would you like to go next?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RECOVERY_DESTINATIONS.map((dest) => (
              <a
                key={dest.path}
                href={dest.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(dest.path);
                }}
                className="ds-card-interactive p-6 flex flex-col justify-between space-y-4 text-left"
              >
                <div className="space-y-2">
                  <p className="font-mono text-xs text-[var(--accent-primary)]">
                    {dest.index} · {dest.path}
                  </p>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">
                    {dest.label}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {dest.summary}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent-primary)] font-semibold">
                  <span>Open {dest.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};
