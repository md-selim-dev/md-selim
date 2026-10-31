import React from 'react';
import { NavItem, RoutePath } from '../config/siteConfig';
import { navigateTo } from '../scripts/router';

export interface NavigationProps {
  items: NavItem[];
  currentRoute: RoutePath;
  orientation?: 'horizontal' | 'vertical';
  onNavigate?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  items,
  currentRoute,
  orientation = 'horizontal',
  onNavigate,
}) => {
  if (orientation === 'vertical') {
    return (
      <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
        {items.map((item) => {
          const isActive = currentRoute === item.path;
          return (
            <a
              key={item.path}
              href={item.path}
              aria-current={isActive ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(item.path);
                if (onNavigate) onNavigate();
              }}
              className={`px-3.5 py-2.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                isActive
                  ? 'text-[var(--accent-primary)] bg-[var(--bg-interactive)] font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    );
  }

  return (
    <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
      {items.map((item) => {
        const isActive = currentRoute === item.path;
        return (
          <a
            key={item.path}
            href={item.path}
            aria-current={isActive ? 'page' : undefined}
            onClick={(e) => {
              e.preventDefault();
              navigateTo(item.path);
              if (onNavigate) onNavigate();
            }}
            className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
              isActive
                ? 'text-[var(--text-primary)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--accent-primary)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
};
