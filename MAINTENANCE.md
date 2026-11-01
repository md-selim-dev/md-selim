# Website Maintenance & Operations Checklist — mdselim.com

This document provides the operational workflow for publishing content, updating portfolio projects, maintaining code and dependencies, auditing security, monitoring search performance, reviewing analytics, and executing backups/recovery for **MD SELIM (`https://mdselim.com`)**.

---

## 1. Content Publishing (Insights & Guides)

All Insights articles are stored as version-controlled Markdown files in `/src/content/insights/*.md` and parsed automatically at build time via Vite's `import.meta.glob('./*.md', { query: '?raw', import: 'default', eager: true })`.

### Publishing a New Article
1. **Create Markdown File**:
   - Add a new `.md` file inside `/src/content/insights/` using a descriptive kebab-case filename (e.g., `/src/content/insights/service-page-conversion-structure.md`).
2. **Include Required Frontmatter**:
   Every Markdown file must begin with YAML frontmatter containing these exact fields:
   ```markdown
   ---
   title: "Your Clear, Specific Article Title"
   slug: "service-page-conversion-structure"
   excerpt: "A concise 1–2 sentence summary (120–160 characters) explaining the practical takeaway for small service business owners."
   category: "Conversion Clarity"
   publishedAt: "2025-05-15"
   readingTime: "6 min read"
   keyTakeaways:
     - "First concrete takeaway for small business owners."
     - "Second actionable recommendation."
     - "Third practical insight."
   relatedServicePath: "/services/"
   relatedServiceLabel: "Explore Webflow Website & Landing Page Services"
   ---
   ```
   - Supported categories: `'Website Clarity' | 'Conversion Clarity' | 'Webflow Architecture' | 'SEO Foundations'`.
3. **Structure Article Body**:
   - Use `##` (`<h2>`) for primary section headings and `###` (`<h3>`) for subsections (never use `#` `<h1>` inside the markdown body because `ArticleLayout` renders the article title as the single page `<h1>`).
   - Include practical bullet checklists and real-world examples tailored to small service businesses.
   - Avoid fabricated statistics or unverified client claims.
4. **Update AI Assistant Knowledge Base (Optional)**:
   - If the new article introduces a core concept visitors might ask about in chat, add a summary entry in `/src/data/chatbotKnowledge.ts` (and `/server.ts` fallback topics if relevant).
5. **Verify Build & Schema**:
   - Run `npm run lint && npm run build` to ensure frontmatter parsing, reading view (`?article=<slug>`), and `BlogPosting` JSON-LD schema compile cleanly.

---

## 2. Portfolio Updates (Work & Case Studies)

All portfolio items are managed in `/src/data/workData.ts`.

### Adding or Updating a Project
1. **Open `/src/data/workData.ts`**:
   - Add or update an entry in the `workProjects` array adhering to the `WorkProject` TypeScript interface.
2. **Maintain Honest Project Labeling**:
   - Set `projectTypeLabel` accurately:
     - `'Concept / Demo Project'` for demonstration architectures and reference builds.
     - `'Live Client Project'` **only** for verified client engagements with permission to publish.
   - Never fabricate client names, testimonials, or unverified conversion metrics.
3. **Complete Required Case Study Fields**:
   - `id` & `slug` (kebab-case identifier used in `/work/?project=<slug>`).
   - `title`, `businessSector`, `category` (`'Service Websites' | 'Landing Pages' | 'SEO Architecture'`).
   - `summary`, `challenge`, `solution`, `structuralHighlights` (3–4 bullet points), `deliverables`, and `previewMetrics` (structural/architectural properties).
4. **Verify Deep Linking & SEO**:
   - Test `/work/?project=<slug>` locally to verify the `ProjectDetailLayout` view, browser Back/Forward navigation, and dynamic `<title>` / `<meta name="description">` updates.
   - Run `npm run lint && npm run build`.

---

## 3. Technical Maintenance Schedule

### Monthly Checks
- [ ] **Production Build & Type Check**: Run `npm run lint` (`tsc --noEmit`) and `npm run build` to confirm zero TypeScript or Vite bundling regressions.
- [ ] **Broken Link & Route Audit**: Verify all internal navigation links (`/`, `/services/`, `/work/`, `/about/`, `/insights/`, `/contact/`), project deep links (`/work/?project=...`), and article deep links (`/insights/?article=...`).
- [ ] **Contact Workflow Verification**: Submit a test inquiry on `/contact/` to confirm server validation (`POST /api/contact`), webhook delivery (if `CONTACT_WEBHOOK_URL` is enabled), and the `mailto:hello@mdselim.com` fallback.
- [ ] **AI Assistant Health Check**: Send a test question in the AI Assistant widget to confirm `POST /api/chat` responds within expected latency and that rate-limit/fallback notices work cleanly.
- [ ] **Core Web Vitals Check**: Run PageSpeed Insights / Lighthouse on mobile and desktop for `https://mdselim.com/` and `https://mdselim.com/services/` to confirm LCP `< 2.5s`, CLS `< 0.1`, and INP `< 200ms`.

### Quarterly Checks
- [ ] **Service Scope & Availability Review**: Update `availabilityLabel` (e.g., `'Accepting Q1 client engagements'`) in `/src/config/siteConfig.ts` so the header/contact status badge stays accurate.
- [ ] **Browser & Viewport Spot-Check**: Verify layout integrity at `320px`, `375px`, `768px`, `1024px`, and `1440px+` across Safari (iOS/macOS), Chrome, and Firefox.

---

## 4. Security Updates & Auditing

### Monthly Security Routine
- [ ] **Dependency Vulnerability Audit**:
  ```bash
  npm audit
  ```
  Review and patch any moderate/high/critical advisories in direct or transitive dependencies (`express`, `vite`, `@google/genai`, `react`, `motion`), then run `npm run lint && npm run build`.
- [ ] **API Key & Quota Review**:
  - Check Google AI Studio / Cloud Console usage logs for `GEMINI_API_KEY`.
  - Confirm daily/monthly spend caps or quota alerts are active.
  - Rotate `GEMINI_API_KEY` immediately if any credential exposure is suspected (update in hosting environment variables—never in source code).
- [ ] **Security Header Verification**:
  ```bash
  curl -I https://mdselim.com/
  ```
  Confirm `Strict-Transport-Security`, `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `Permissions-Policy` are present on production responses.
- [ ] **Secret Hygiene Check**:
  Ensure `.env` is never tracked by Git (`git status --ignored`) and that `grep -rn "AIza" dist/` returns zero matches after every build.

---

## 5. Search Performance (SEO & Google Search Console)

### Monthly SEO Review
- [ ] **Google Search Console Coverage**:
  - Check **Indexing -> Pages** in Search Console for any crawl errors, soft 404s, or unexpected excluded pages.
  - Confirm all 6 canonical routes (`/`, `/services/`, `/work/`, `/about/`, `/insights/`, `/contact/`) remain indexed with `https://mdselim.com` as the selected canonical.
- [ ] **Search Queries & Intent Alignment**:
  - Review **Performance -> Search results** (impressions, clicks, average position, CTR) for core service queries (Webflow developer, small business service website, technical SEO setup).
  - Identify recurring visitor questions from Search Console queries or AI Assistant questions to plan future `/insights/` articles.
- [ ] **Structured Data Health**:
  - Check **Enhancements** in Search Console (Breadcrumbs, Site Name) to ensure zero JSON-LD schema parsing warnings.
- [ ] **Sitemap Freshness**:
  - Whenever canonical top-level routes change or `<lastmod>` dates in `/public/sitemap.xml` are updated, update `/public/sitemap.xml`, redeploy, and verify in Search Console.

---

## 6. Analytics & Conversion Review

- [ ] **Traffic & Top Entry Pages**:
  - Review privacy-first analytics (Cloudflare Web Analytics) monthly to monitor top landing pages, device breakdown (mobile vs. desktop), and geographic distribution.
- [ ] **Core Web Vitals (Real User Monitoring / CrUX)**:
  - Review real-user LCP, INP, and CLS metrics in Cloudflare Web Analytics and Google Search Console Core Web Vitals report.
- [ ] **Inquiry Quality Review**:
  - Track how many inquiries arrive via `/contact/` vs. direct `hello@mdselim.com` email vs. the AI Assistant preliminary brief, and refine service FAQ copy if visitors repeatedly ask the same scope questions.

---

## 7. Backups & Disaster Recovery

### Backup Strategy
1. **Source Code & Content (Git Repository)**:
   - All application code, configuration (`/src/config/siteConfig.ts`), portfolio case studies (`/src/data/workData.ts`), and Markdown articles (`/src/content/insights/*.md`) are stored in Git.
   - Maintain a protected `main` branch on GitHub (or secondary remote mirror) and tag every production release (`git tag -a v1.0.0 -m "Production release"`).
2. **Environment & DNS Configuration Backup**:
   - Store a secure offline copy of production environment variable values (`GEMINI_API_KEY`, `CONTACT_WEBHOOK_URL`, `VITE_GOOGLE_SITE_VERIFICATION`, `VITE_CF_BEACON_TOKEN`) in a password manager (e.g., 1Password / Bitwarden).
   - Export your Cloudflare DNS zone file (`Cloudflare Dashboard -> DNS -> Records -> Export`) whenever DNS records are modified.

### Recovery Procedure (RTO < 15 Minutes)
1. **Instant Rollback on Cloudflare Pages / Cloud Run**:
   - In **Cloudflare Pages -> Deployments** (or Cloud Run Revisions), select the previous known-good deployment and click **Rollback to this deployment**.
2. **Clean Rebuild from Git**:
   ```bash
   git clone <repository-url>
   cd mdselim-website
   npm ci
   npm run lint
   npm run build
   ```
   Deploy the verified `dist/` output (or container image) and restore environment variables from the encrypted vault.
