# MD SELIM — mdselim.com (Phase 01 Foundation)

**Positioning:** "Websites built for clarity, credibility, and growth."  
**Description:** "I help small service businesses build professional websites with a strong user experience and an SEO-ready foundation."

---

## 1. Architecture Overview

The project is organized into a strict, modular, static-first directory structure that separates configuration, data, editorial content, layout shells, reusable UI components, and page routes:

```text
/
├── astro.config.mjs                  # Static-first trailing-slash configuration
├── index.html                        # HTML5 entry point, SEO meta, and typography links
├── metadata.json                     # Project metadata
├── package.json                      # Scripts and dependencies
├── tsconfig.json                     # TypeScript configuration
├── vite.config.ts                    # Vite build & preview server configuration
└── src/
    ├── config/
    │   └── siteConfig.ts             # Centralized brand identity, nav routes, SEO meta, & social links
    ├── data/
    │   ├── servicesData.ts           # Core, Supporting, and Recurring service specifications & FAQs
    │   └── workData.ts               # Client case studies, metrics, and SEO foundation details
    ├── content/
    │   ├── aboutContent.ts           # Founder narrative, principles, and technical standards
    │   └── insightsContent.ts        # Editorial articles and practical guides
    ├── styles/
    │   └── themeTokens.ts            # Centralized 60-30-10 color, typography, and layout tokens
    ├── scripts/
    │   └── router.ts                 # Canonical trailing-slash URL router & document meta sync
    ├── components/
    │   ├── Button.tsx                # Reusable button & link component
    │   ├── SectionContainer.tsx      # Reusable responsive section container
    │   ├── Navigation.tsx            # Reusable desktop & mobile navigation component
    │   ├── Header.tsx                # 3-zone Top Bar Header component
    │   ├── Footer.tsx                # Structured editorial Footer component
    │   └── VisualWireframeCanvas.tsx # Architectural SVG blueprints for Hero & Case Studies
    ├── layouts/
    │   ├── BaseLayout.tsx            # Shared semantic page layout (<header>, <main>, <footer>)
    │   └── PageHeader.tsx            # Shared editorial header for inner pages
    ├── pages/
    │   ├── HomePage.tsx              # /
    │   ├── ServicesPage.tsx          # /services/
    │   ├── WorkPage.tsx              # /work/
    │   ├── AboutPage.tsx             # /about/
    │   ├── InsightsPage.tsx          # /insights/
    │   └── ContactPage.tsx           # /contact/
    ├── App.tsx                       # Route dispatcher
    ├── index.css                     # Tailwind CSS v4 & typography declarations
    └── main.tsx                      # Application mount point
```

---

## 2. How to Run the Project

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server (runs on port 3000):**
   ```bash
   npm run dev
   ```
3. **Type-check the project:**
   ```bash
   npm run lint
   ```
4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 3. How to Modify Content & Upload Your Brand Logo

- **Uploading Your Brand Logo Later:**  
  Place your logo file in `/public/logo.svg` (or `/public/logo.png`) and update `brand.logoUrl` in `src/config/siteConfig.ts`:
  ```ts
  logoUrl: '/logo.svg',
  ```
  `Header.tsx` will automatically switch from the typographic wordmark (`MD SELIM`) to your uploaded logo.
- **Updating Services or FAQs:**  
  Edit `src/data/servicesData.ts`.
- **Adding or Editing Case Studies:**  
  Edit `src/data/workData.ts`.
- **Publishing New Insights Articles:**  
  Add a new article object to `src/content/insightsContent.ts`.
- **Updating Contact Email or Social Links:**  
  Edit `src/config/siteConfig.ts`.
