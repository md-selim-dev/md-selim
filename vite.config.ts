import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import {preRenderDistRoutes} from './scripts/postbuild.mjs';

const VALID_CANONICAL_ROUTES = new Set([
  '/',
  '/services/',
  '/work/',
  '/about/',
  '/insights/',
  '/contact/',
]);

function mdselimRoutePreRenderPlugin(): Plugin {
  const distDir = path.resolve(import.meta.dirname, 'dist');

  return {
    name: 'mdselim-route-prerender',
    closeBundle() {
      preRenderDistRoutes(distDir);
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || (req.method !== 'GET' && req.method !== 'HEAD')) {
          next();
          return;
        }

        const rawPath = req.url.split('?')[0].split('#')[0] || '/';

        // Allow static assets and explicit files with extensions to be handled by Vite preview static middleware
        if (
          rawPath.startsWith('/assets/') ||
          rawPath.startsWith('/api/') ||
          /\.[a-zA-Z0-9]+$/.test(rawPath)
        ) {
          next();
          return;
        }

        const normalized = rawPath === '/' ? '/' : rawPath.endsWith('/') ? rawPath : `${rawPath}/`;

        if (VALID_CANONICAL_ROUTES.has(normalized)) {
          const cleanDir = normalized.replace(/^\/|\/$/g, '');
          const htmlFile =
            normalized === '/'
              ? path.join(distDir, 'index.html')
              : path.join(distDir, cleanDir, 'index.html');

          if (fs.existsSync(htmlFile)) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(fs.readFileSync(htmlFile, 'utf-8'));
            return;
          }
        } else {
          const notFoundFile = path.join(distDir, '404.html');
          if (fs.existsSync(notFoundFile)) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(fs.readFileSync(notFoundFile, 'utf-8'));
            return;
          }
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), mdselimRoutePreRenderPlugin()],
    // Security: Strictly restrict client-exposed env vars to VITE_ prefix only.
    // Server secrets like GEMINI_API_KEY are never bundled into frontend assets.
    envPrefix: ['VITE_'],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      target: 'es2022',
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
      modulePreload: {
        polyfill: false,
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('react') || id.includes('scheduler')) {
                return 'vendor-react';
              }
            }
            return undefined;
          },
        },
      },
    },
  };
});
