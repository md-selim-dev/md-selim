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
              className={`px-3 py-2.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                isActive
                  ? 'text-blue-700 bg-blue-50/70 font-semibold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-stone-100/80'
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
                ? 'text-slate-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-blue-700'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
};
