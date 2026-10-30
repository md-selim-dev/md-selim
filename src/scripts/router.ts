import { useEffect, useState } from 'react';
import { RoutePath, siteConfig } from '../config/siteConfig';

const VALID_ROUTES: RoutePath[] = [
  '/',
  '/services/',
  '/work/',
  '/about/',
  '/insights/',
  '/contact/',
];

/**
 * Normalizes any pathname into one of the six canonical routes.
 * Ensures both `/services` and `/services/` resolve cleanly to `/services/`.
 */
export function normalizeRoutePath(rawPath: string): RoutePath {
  if (!rawPath || rawPath === '/') {
    return '/';
  }
  const clean = rawPath.split('?')[0].split('#')[0];
  const withTrailingSlash = clean.endsWith('/') ? clean : `${clean}/`;

  if (VALID_ROUTES.includes(withTrailingSlash as RoutePath)) {
    return withTrailingSlash as RoutePath;
  }
  return '/';
}

/**
 * Navigates to a route using the History API and notifies listeners.
 */
export function navigateTo(path: RoutePath): void {
  const normalized = normalizeRoutePath(path);
  if (window.location.pathname !== normalized) {
    window.history.pushState({ path: normalized }, '', normalized);
  }
  window.dispatchEvent(new CustomEvent('mdselim:routechange', { detail: normalized }));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Updates document title and meta description whenever the active route changes.
 */
export function syncRouteMetadata(route: RoutePath): void {
  const meta = siteConfig.seo[route] ?? siteConfig.seo['/'];
  document.title = meta.title;

  const descriptionTag = document.querySelector('meta[name="description"]');
  if (descriptionTag) {
    descriptionTag.setAttribute('content', meta.description);
  }

  const ogTitleTag = document.querySelector('meta[property="og:title"]');
  if (ogTitleTag) {
    ogTitleTag.setAttribute('content', meta.title);
  }

  const ogDescriptionTag = document.querySelector('meta[property="og:description"]');
  if (ogDescriptionTag) {
    ogDescriptionTag.setAttribute('content', meta.description);
  }
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
