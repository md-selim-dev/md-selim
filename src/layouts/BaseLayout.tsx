import React from 'react';
import { RoutePath } from '../config/siteConfig';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

export interface BaseLayoutProps {
  currentRoute: RoutePath;
  children: React.ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ currentRoute, children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-900">
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-700 focus:text-white focus:rounded-md focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <Header currentRoute={currentRoute} />

      <main id="main-content" className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
};
