import React from 'react';
import { RoutePath, siteConfig } from '../config/siteConfig';
import { navigateTo } from '../scripts/router';
import { themeTokens } from '../styles/themeTokens';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerRoutes: { label: string; path: RoutePath }[] = [
    { label: 'Home', path: '/' },
    ...siteConfig.navigation.main,
  ];

  return (
    <footer className="bg-white border-t border-stone-200/90 text-slate-900">
      <div className={`${themeTokens.layout.container} py-14 sm:py-16`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-200/80">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/');
              }}
              className="inline-block text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap"
            >
              {siteConfig.brand.name}
            </a>
            <p className="text-sm font-medium text-slate-800 max-w-sm">
              {siteConfig.brand.positioning}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              {siteConfig.brand.description}
            </p>
            <p className="text-xs text-stone-500 pt-1">
              {siteConfig.brand.domain} · {siteConfig.brand.location}
            </p>
          </div>

          {/* Pages Navigation Mirror */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="text-xs font-semibold tracking-wide text-slate-900">
              Navigation
            </h2>
            <ul className="space-y-2.5">
              {footerRoutes.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(item.path);
                    }}
                    className="text-sm text-slate-600 hover:text-blue-700 transition-colors whitespace-nowrap"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Direct Inquiry */}
          <div className="md:col-span-4 space-y-3">
            <h2 className="text-xs font-semibold tracking-wide text-slate-900">
              Capabilities & Contact
            </h2>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>01. {siteConfig.servicesSummary.core.title}</li>
              <li>02. {siteConfig.servicesSummary.supporting.title}</li>
              <li>03. {siteConfig.servicesSummary.recurring.title}</li>
            </ul>
            <div className="pt-3 space-y-1">
              <p className="text-xs text-stone-500">Direct project inquiries</p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-sm font-semibold text-blue-700 hover:underline"
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {currentYear} {siteConfig.brand.name} ({siteConfig.brand.domain}). All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {siteConfig.socials.map((social, idx) => (
              <React.Fragment key={social.platform}>
                {idx > 0 && <span aria-hidden="true">·</span>}
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors whitespace-nowrap"
                >
                  {social.platform}
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
