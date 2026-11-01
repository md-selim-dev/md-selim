# Deployment Readiness & Production Cutover Guide — mdselim.com

> **Deployment Status Notice**: This repository and production build (`dist/`) have been verified locally (`npm run lint` and `npm run build` succeed with 0 errors). **The website is not live on the public `https://mdselim.com` domain until you complete the manual hosting, DNS, and environment variable steps documented below.**

---

## 1. Pre-Deployment Verification Summary

| Check | Status | Implementation & Verification Details |
| :--- | :--- | :--- |
| **Production Build** | Verified | `npm run build` (`vite build && node scripts/postbuild.mjs`) compiles TypeScript/React bundles and pre-renders static route directories (`dist/index.html`, `dist/services/index.html`, `dist/work/index.html`, `dist/about/index.html`, `dist/insights/index.html`, `dist/contact/index.html`, `dist/404.html`). |
| **Environment Variables** | Ready | Documented in `/.env.example`. Server secrets (`GEMINI_API_KEY`, `CONTACT_WEBHOOK_URL`) lack the `VITE_` prefix and are never bundled into frontend JavaScript. |
| **Hosting Compatibility** | Dual-Mode Ready | Supports **Full-Stack Node.js / Cloud Run (`server.ts`)** (with live `/api/chat` and `/api/contact` endpoints) AND **Cloudflare Pages (`dist/` + `functions/_middleware.js`)** (with graceful client-side fallbacks when backend routes are absent). |
| **Domain Configuration** | Ready | Configured for primary apex domain `https://mdselim.com` with 301 Permanent Redirects from `www.mdselim.com` and `md-selim.pages.dev` (`*.pages.dev`). |
| **HTTPS & HSTS** | Ready | `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` enforced in `/public/_headers`, `/functions/_middleware.js`, and `/server.ts`. |
| **DNS Requirements** | Documented | Complete Cloudflare DNS record table (`CNAME`, `A`/`AAAA`, `TXT`, email `MX`/`SPF`/`DMARC` preservation) documented in Section 4. |
| **Sitemap Accessibility** | Verified | `/sitemap.xml` copied to `dist/sitemap.xml`; lists all 6 canonical indexable URLs (`https://mdselim.com/`, `/services/`, `/work/`, `/about/`, `/insights/`, `/contact/`). |
| **Robots.txt Accessibility** | Verified | `/robots.txt` copied to `dist/robots.txt` with `Allow: /`, `Disallow: /api/`, `Disallow: /404/`, and `Sitemap: https://mdselim.com/sitemap.xml`. |
| **Canonical Domain** | Verified | Single canonical origin `https://mdselim.com` with trailing slashes on all route canonicals; verified in static pre-rendered HTML and client-side router. |
| **Contact Form Config** | Verified | Dual-layer delivery: `POST /api/contact` (server validation, honeypot, minimum fill-time check, rate limiting, and optional `CONTACT_WEBHOOK_URL` forwarding) + one-click `mailto:hello@mdselim.com` fallback. |
| **Analytics Configuration** | Ready | Privacy-first, cookie-free Cloudflare Web Analytics ready via Cloudflare Pages automatic injection or `VITE_CF_BEACON_TOKEN`. CSP pre-configured for `static.cloudflareinsights.com`. |
| **Search Console Verification** | Ready | `<meta name="google-site-verification" />` injected via `VITE_GOOGLE_SITE_VERIFICATION` and DNS TXT verification steps documented in Section 7. |

---

## 2. Environment Variables Configuration

Copy `/.env.example` to `.env` (for self-hosted Node.js/Cloud Run) or add the variables in your hosting provider's dashboard:

| Variable Name | Scope | Required? | Purpose |
| :--- | :--- | :--- | :--- |
| `GEMINI_API_KEY` | Server-only (`server.ts`) | Recommended | Powers live Gemini 3 Flash responses on `POST /api/chat`. If unset, the assistant automatically uses the built-in verified knowledge-base engine. **Never prefix with `VITE_`.** |
| `APP_URL` | Server-only (`server.ts`) | Recommended | Set to `https://mdselim.com` in production. |
| `CONTACT_WEBHOOK_URL` | Server-only (`server.ts`) | Optional | HTTPS webhook endpoint (e.g. Formspree, Resend webhook, Make/Zapier, Slack incoming webhook) that receives validated JSON payloads from `POST /api/contact` and `POST /api/chat/preliminary-brief`. |
| `VITE_GOOGLE_SITE_VERIFICATION` | Client / Build-time | Optional | Populates `<meta name="google-site-verification" content="..." />` in the document `<head>`. |
| `VITE_CF_BEACON_TOKEN` | Client / Build-time | Optional | Loads Cloudflare Web Analytics (`beacon.min.js`) when hosting outside Cloudflare Pages or when manual beacon injection is preferred. |

---

## 3. Hosting Architecture Options

### Option A: Full-Stack Node.js / Google Cloud Run / Railway / Render (Recommended for Live `/api/*` Endpoints)
Running the Express + Vite production server (`server.ts`) serves both the pre-rendered static build (`dist/`) and the hardened server-side API endpoints (`POST /api/chat`, `POST /api/contact`, `POST /api/chat/preliminary-brief`).

1. **Build Command**:
   ```bash
   npm ci && npm run build
   ```
2. **Start Command**:
   ```bash
   NODE_ENV=production npm start
   ```
3. **Runtime Port**: `3000` (binds to `0.0.0.0:3000`).
4. **Environment Variables**: Configure `NODE_ENV=production`, `GEMINI_API_KEY`, `APP_URL=https://mdselim.com`, and optionally `CONTACT_WEBHOOK_URL`.

### Option B: Cloudflare Pages (`md-selim.pages.dev` -> `https://mdselim.com`)
When deploying directly to Cloudflare Pages:

1. **Framework Preset**: `Vite` (or `None`)
2. **Build Command**:
   ```bash
   npm run build
   ```
3. **Build Output Directory**:
   ```text
   dist
   ```
4. **Root Directory**: `/`
5. **Node.js Version**: Set environment variable `NODE_VERSION` = `22` in Cloudflare Pages Settings -> Environment Variables.
6. **Edge Middleware (`functions/_middleware.js`)**: Automatically detected by Cloudflare Pages to enforce 301 redirects from `md-selim.pages.dev` and `www.mdselim.com` to `https://mdselim.com` and attach security headers.
7. **Fallback Behavior on Static Edge**: When `/api/chat` or `/api/contact` is not backed by a Node container, the frontend automatically falls back to the built-in deterministic knowledge base (for the AI Assistant) and pre-formatted `mailto:hello@mdselim.com` dispatch (for the Contact form).

---

## 4. Domain, DNS & HTTPS Configuration (`mdselim.com`)

### 4.1 Custom Domain Setup in Cloudflare Pages
1. Open **Cloudflare Dashboard** -> **Workers & Pages** -> select **`md-selim`**.
2. Go to **Custom domains** -> **Set up a custom domain**.
3. Add **`mdselim.com`** (primary canonical domain).
4. Add **`www.mdselim.com`** (secondary domain; `functions/_middleware.js` and `server.ts` automatically 301-redirect `www.mdselim.com` to `https://mdselim.com`).

### 4.2 Required DNS Records (Cloudflare DNS for `mdselim.com`)

| Type | Name | Target / Content | Proxy Status | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `CNAME` | `@` (`mdselim.com`) | `md-selim.pages.dev` *(or your Cloud Run / host target)* | **Proxied** (Orange Cloud) | Auto | Root canonical domain routing |
| `CNAME` | `www` | `mdselim.com` | **Proxied** (Orange Cloud) | Auto | Subdomain routing (redirected via 301 to `https://mdselim.com`) |
| `TXT` | `@` | `google-site-verification=<YOUR_TOKEN>` | DNS Only | Auto | Google Search Console Domain Property verification |

> **Important Email Preservation Check (`hello@mdselim.com`)**: Before modifying DNS records on `mdselim.com`, verify that existing **`MX`** records, **`TXT` (SPF)** records, **`CNAME`/`TXT` (DKIM)** records, and **`_dmarc` `TXT`** records for `hello@mdselim.com` remain untouched so inbound and outbound email delivery is uninterrupted.

### 4.3 HTTPS / SSL / TLS Settings in Cloudflare
In **Cloudflare Dashboard** -> **SSL/TLS**:
- **SSL/TLS Encryption Mode**: Set to **Full (strict)**.
- **Always Use HTTPS**: **Enabled** (Edge certificates -> Always Use HTTPS = On).
- **Minimum TLS Version**: **TLS 1.2** (or TLS 1.3 enabled).
- **Automatic HTTPS Rewrites**: **Enabled**.
- **HTTP Strict Transport Security (HSTS)**: Already configured via application headers (`max-age=31536000; includeSubDomains; preload`).

---

## 5. Contact Form Production Configuration

The contact experience on `/contact/` (and the optional preliminary brief inside the AI Assistant) uses a resilient two-tier production architecture:

1. **Primary Server Validation & Webhook Delivery (`POST /api/contact`)**:
   - Validates `Origin`/`Referer`, JSON `Content-Type`, 16KB body limit, rate limiting (5 submissions per 15 minutes per IP), honeypot field (`companyFax`), and minimum human fill time (`>= 1200ms`).
   - When `CONTACT_WEBHOOK_URL` is set in the server environment (e.g., a Formspree endpoint `https://formspree.io/f/xxxxxx`, a Resend/Make webhook, or a Slack incoming webhook), `server.ts` automatically forwards the sanitized inquiry JSON payload (`fullName`, `email`, `businessName`, `websiteUrl`, `serviceInterest`, `projectTimeline`, `projectDetails`, `submittedAt`) over HTTPS.
2. **Direct Email Fallback (`mailto:hello@mdselim.com`)**:
   - After validation (or if the site is deployed as static files without a Node backend), the visitor is presented with their structured inquiry summary, a one-click **Open in Email Client (`hello@mdselim.com`)** button with pre-populated subject and body, and a **Copy Inquiry Text** button so no lead is ever lost.

---

## 6. Privacy-First Analytics Configuration

To preserve Core Web Vitals (zero cookie banners, zero invasive third-party trackers) and comply with the site's privacy disclosure:
- **Cloudflare Web Analytics (Recommended)**:
  - If hosted on Cloudflare Pages: Enable **Web Analytics** directly in **Cloudflare Dashboard -> Workers & Pages -> `md-selim` -> Metrics -> Enable Web Analytics**.
  - If hosted on Node.js / Cloud Run: Create a site in **Cloudflare Web Analytics** for `mdselim.com`, copy the Beacon Token, and set `VITE_CF_BEACON_TOKEN="<your_token>"` before running `npm run build`.
- Content Security Policy (`public/_headers`, `functions/_middleware.js`, and `server.ts`) already whitelists `https://static.cloudflareinsights.com` (`script-src`) and `https://cloudflareinsights.com` (`connect-src`).

---

## 7. Google Search Console Verification & Indexing Readiness

Once `https://mdselim.com` is live on its production DNS:

1. **Verify Property Ownership**:
   - Open [Google Search Console](https://search.google.com/search-console).
   - **Recommended (Domain Property)**: Add `mdselim.com` and copy the `TXT` record into Cloudflare DNS (`@` -> `google-site-verification=...`), **OR**
   - **URL Prefix Property (`https://mdselim.com/`)**: Use the **HTML tag** method. Set `VITE_GOOGLE_SITE_VERIFICATION="<token>"` in your build environment so `<meta name="google-site-verification" content="<token>" />` matches your Search Console token.
2. **Verify Public Accessibility of Crawl Files**:
   - Visit `https://mdselim.com/robots.txt` and confirm HTTP `200` and `Sitemap: https://mdselim.com/sitemap.xml`.
   - Visit `https://mdselim.com/sitemap.xml` and confirm HTTP `200` and valid XML containing all 6 canonical URLs.
3. **Submit Sitemap**:
   - In Google Search Console -> **Sitemaps**, submit `https://mdselim.com/sitemap.xml`.
4. **Inspect Core Canonical URLs**:
   - Use the **URL Inspection Tool** in Search Console to test live rendering for:
     - `https://mdselim.com/`
     - `https://mdselim.com/services/`
     - `https://mdselim.com/work/`
     - `https://mdselim.com/about/`
     - `https://mdselim.com/insights/`
     - `https://mdselim.com/contact/`
   - *Note: Submitting a sitemap and requesting inspection informs Google of your pages; actual indexing and ranking timelines depend on search engine evaluation and are never guaranteed.*

---

## 8. Post-Cutover Smoke Test Commands

After pointing `mdselim.com` DNS to production, run these terminal checks to confirm live cutover:

```bash
# 1. Verify canonical 200 OK & HSTS header on apex domain
curl -I https://mdselim.com/

# 2. Verify 301 redirect from www to canonical apex domain
curl -I https://www.mdselim.com/services/

# 3. Verify 301 redirect from pages.dev subdomain to canonical apex domain
curl -I https://md-selim.pages.dev/work/

# 4. Verify sitemap.xml and robots.txt accessibility
curl -i https://mdselim.com/sitemap.xml
curl -i https://mdselim.com/robots.txt
```
