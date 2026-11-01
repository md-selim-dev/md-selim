import React, { useEffect, useRef } from 'react';
import { AmbientBackground } from '../components/AmbientBackground';
import { AssistantWidget } from '../components/chatbot/AssistantWidget';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { RoutePath, siteConfig } from '../config/siteConfig';
import { useInteractionSystem } from '../scripts/interactionSystem';

export interface BaseLayoutProps {
  currentRoute: RoutePath;
  children: React.ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ currentRoute, children }) => {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useInteractionSystem(glowRef, currentRoute);

  useEffect(() => {
    const token = siteConfig.analytics.cfBeaconToken;
    if (!token || typeof document === 'undefined') return;
    if (document.getElementById('cf-web-analytics-beacon')) return;

    const script = document.createElement('script');
    script.id = 'cf-web-analytics-beacon';
    script.defer = true;
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    script.setAttribute('data-cf-beacon', JSON.stringify({ token }));
    document.head.appendChild(script);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      {/* Phase 04: Lightweight Animated Emerald Grid + Desktop Radial Pointer Glow */}
      <AmbientBackground glowRef={glowRef} />

      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          const mainEl = document.getElementById('main-content');
          if (mainEl) {
            mainEl.focus();
          }
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--accent-primary)] focus:text-[var(--accent-on-primary)] focus:rounded-md focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <Header currentRoute={currentRoute} />

      <main id="main-content" tabIndex={-1} className="relative z-10 flex-1 outline-none">
        {children}
      </main>

      <div className="relative z-10">
        <Footer />
      </div>

      {/* Phase 06: Independent AI Assistant Widget */}
      <AssistantWidget />
    </div>
  );
};
