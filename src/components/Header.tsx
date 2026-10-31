import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { RoutePath, siteConfig } from '../config/siteConfig';
import { navigateTo } from '../scripts/router';
import { themeTokens } from '../styles/themeTokens';
import { Button } from './Button';
import { Navigation } from './Navigation';

export interface HeaderProps {
  currentRoute: RoutePath;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-canvas-translucent)] backdrop-blur-md border-b border-[var(--border-subtle)]">
      <div
        className={`${themeTokens.layout.container} flex items-center justify-between gap-8 h-16`}
      >
        {/* Zone 1: Single-line Brand Wordmark (or uploaded brand logo when configured) */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setMobileMenuOpen(false);
            navigateTo('/');
          }}
          className="text-lg font-bold tracking-tight text-[var(--text-primary)] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
        >
          {siteConfig.brand.logoUrl ? (
            <img
              src={siteConfig.brand.logoUrl}
              alt={siteConfig.brand.logoAlt}
              referrerPolicy="no-referrer"
              className="h-7 w-auto object-contain"
            />
          ) : (
            siteConfig.brand.name
          )}
        </a>

        {/* Zone 2: Clean single-line Navigation Links */}
        <Navigation
          items={siteConfig.navigation.main}
          currentRoute={currentRoute}
          orientation="horizontal"
        />

        {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:block">
            <Button
              to={siteConfig.navigation.primaryCta.path}
              variant="primary"
              size="sm"
            >
              {siteConfig.navigation.primaryCta.label}
            </Button>
          </div>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-interactive)] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-5 py-4 space-y-4">
          <Navigation
            items={[{ label: 'Home', path: '/' }, ...siteConfig.navigation.main]}
            currentRoute={currentRoute}
            orientation="vertical"
            onNavigate={() => setMobileMenuOpen(false)}
          />
          <div className="pt-2 border-t border-[var(--border-subtle)]">
            <Button
              to={siteConfig.navigation.primaryCta.path}
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              {siteConfig.navigation.primaryCta.label}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
