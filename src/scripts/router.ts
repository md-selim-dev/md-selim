import { useEffect, useState } from 'react';
import { RoutePath } from '../config/siteConfig';
import { applyPageSeo } from './seoSchema';

const PRIMARY_ROUTES: RoutePath[] = [
  '/',
  '/services/',
  '/work/',
  '/about/',
  '/insights/',
  '/contact/',
  '/404/',
];

/**
 * Normalizes any pathname into one of the six canonical routes, or '/404/' for unknown paths.
 * Ensures both `/services` and `/services/` resolve cleanly to `/services/`.
 */
export function normalizeRoutePath(rawPath: string): RoutePath {
  if (!rawPath || rawPath === '/' || rawPath === '/index.html') {
    return '/';
  }
  const clean = rawPath.split('?')[0].split('#')[0];
  if (clean === '/404.html') {
    return '/404/';
  }
  const withTrailingSlash = clean.endsWith('/') ? clean : `${clean}/`;

  if (PRIMARY_ROUTES.includes(withTrailingSlash as RoutePath)) {
    return withTrailingSlash as RoutePath;
  }
  return '/404/';
}

/**
 * Navigates to a route using the History API (with optional query params) and notifies listeners.
 */
export function navigateTo(
  path: RoutePath,
  queryParams?: Record<string, string | null>
): void {
  const normalized = normalizeRoutePath(path);
  let targetUrl: string = normalized;

  if (queryParams) {
    const searchParams = new URLSearchParams();
    Object.entries(queryParams).forEach(([k, v]) => {
      if (v) searchParams.set(k, v);
    });
    const qs = searchParams.toString();
    if (qs) {
      targetUrl = `${normalized}?${qs}`;
    }
  }

  if (`${window.location.pathname}${window.location.search}` !== targetUrl) {
    window.history.pushState({ path: normalized }, '', targetUrl);
  }
  window.dispatchEvent(
    new CustomEvent('mdselim:routechange', { detail: normalized })
  );
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Updates document title, meta description, canonical URL, OpenGraph, Twitter cards,
 * and Schema.org JSON-LD whenever the active route changes.
 */
export function syncRouteMetadata(route: RoutePath): void {
  applyPageSeo(route);
}

/**
 * React hook for observing and changing the active route.
 */
export function useRouter() {
  const [currentRoute, setCurrentRoute] = useState<RoutePath>(() =>
    normalizeRoutePath(window.location.pathname)
  );

  useEffect(() => {
    syncRouteMetadata(currentRoute);
  }, [currentRoute]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(normalizeRoutePath(window.location.pathname));
    };

    const handleCustomRoute = (event: Event) => {
      const customEvent = event as CustomEvent<RoutePath>;
      if (customEvent.detail) {
        setCurrentRoute(normalizeRoutePath(customEvent.detail));
      } else {
        setCurrentRoute(normalizeRoutePath(window.location.pathname));
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('mdselim:routechange', handleCustomRoute);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('mdselim:routechange', handleCustomRoute);
    };
  }, []);

  return {
    currentRoute,
    navigate: navigateTo,
  };
}

