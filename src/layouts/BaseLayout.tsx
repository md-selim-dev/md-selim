import React, { useRef } from 'react';
import { AmbientBackground } from '../components/AmbientBackground';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { RoutePath } from '../config/siteConfig';
import { useInteractionSystem } from '../scripts/interactionSystem';

export interface BaseLayoutProps {
  currentRoute: RoutePath;
  children: React.ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ currentRoute, children }) => {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useInteractionSystem(glowRef, currentRoute);

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      {/* Phase 04: Lightweight Animated Emerald Grid + Desktop Radial Pointer Glow */}
      <AmbientBackground glowRef={glowRef} />

      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--accent-primary)] focus:text-[var(--accent-on-primary)] focus:rounded-md focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <Header currentRoute={currentRoute} />

      <main id="main-content" className="relative z-10 flex-1">
        {children}
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};
