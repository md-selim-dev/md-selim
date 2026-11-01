import React from 'react';
import { RoutePath, siteConfig } from '../config/siteConfig';
import { navigateTo, preloadRoute } from '../scripts/router';
import { themeTokens } from '../styles/themeTokens';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerRoutes: { label: string; path: RoutePath }[] = [
    { label: 'Home', path: '/' },
    ...siteConfig.navigation.main,
  ];

  return (
    <footer className="bg-[var(--bg-elevated)] border-t border-[var(--border-subtle)] text-[var(--text-primary)]">
      <div className={`${themeTokens.layout.container} py-14 sm:py-16`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[var(--border-subtle)]">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/');
              }}
              className="inline-block text-lg font-bold tracking-tight text-[var(--text-primary)] whitespace-nowrap"
            >
              {siteConfig.brand.name}
            </a>
            <p className="text-sm font-medium text-[var(--text-primary)] max-w-sm">
              {siteConfig.brand.positioning}
            </p>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-md">
              {siteConfig.brand.description}
            </p>
            <p className="font-mono text-xs text-[var(--text-secondary)] pt-1">
              {siteConfig.brand.domain} · {siteConfig.brand.location}
            </p>
          </div>

          {/* Pages Navigation Mirror */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="font-mono text-xs font-semibold tracking-wider text-[var(--accent-primary)]">
              Navigation
            </h2>
            <ul className="space-y-2.5">
              {footerRoutes.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onMouseEnter={() => preloadRoute(item.path)}
                    onFocus={() => preloadRoute(item.path)}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(item.path);
                    }}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors whitespace-nowrap"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Direct Inquiry */}
          <div className="md:col-span-4 space-y-3">
            <h2 className="font-mono text-xs font-semibold tracking-wider text-[var(--accent-primary)]">
              Capabilities & Contact
            </h2>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li>01. {siteConfig.servicesSummary.core.title}</li>
              <li>02. {siteConfig.servicesSummary.supporting.title}</li>
              <li>03. {siteConfig.servicesSummary.recurring.title}</li>
            </ul>
            <div className="pt-3 space-y-1">
              <p className="font-mono text-xs text-[var(--text-secondary)]">
                Direct project inquiries
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-sm font-mono font-semibold text-[var(--accent-primary)] hover:underline"
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[var(--text-secondary)]">
          <p>
            © {currentYear} {siteConfig.brand.name} ({siteConfig.brand.domain}). All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {siteConfig.socials.map((social, idx) => (
              <React.Fragment key={social.platform}>
                {idx > 0 && <span aria-hidden="true">·</span>}
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-primary)] transition-colors whitespace-nowrap"
                >
                  {social.platform}
                </a>
              </React.Fragment>
            ))}
            <span aria-hidden="true">·</span>
            <a
              href="/sitemap.xml"
              className="hover:text-[var(--accent-primary)] transition-colors whitespace-nowrap"
            >
              XML Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

