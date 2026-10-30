/**
 * Astro Static-First Configuration Reference for mdselim.com
 * Kept in sync with siteConfig.ts for static deployment targets.
 */
export default {
  site: 'https://mdselim.com',
  trailingSlash: 'always',
  output: 'static',
  build: {
    format: 'directory',
  },
};
