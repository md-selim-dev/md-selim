import React from 'react';

export interface VisualWireframeCanvasProps {
  variant:
    | 'hero-architecture'
    | 'legal'
    | 'clinic'
    | 'advisory'
    | 'engineering'
    | 'founder-studio';
  className?: string;
}

/**
 * Architectural SVG Wireframe & Technical SEO Blueprint Canvas
 * Styled with the Phase 02/03 Botanical Obsidian Design System.
 */
export const VisualWireframeCanvas: React.FC<VisualWireframeCanvasProps> = ({
  variant,
  className = '',
}) => {
  if (variant === 'hero-architecture') {
    return (
      <div
        className={`ds-card w-full h-full min-h-[340px] sm:min-h-[380px] p-4 sm:p-6 flex flex-col justify-between overflow-hidden ${className}`}
      >
        {/* Top Browser Bar */}
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-[var(--border-subtle)] min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--bg-interactive)] border border-[var(--border-default)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--bg-interactive)] border border-[var(--border-default)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--bg-interactive)] border border-[var(--border-default)]" />
          </div>
          <div className="px-2.5 sm:px-3 py-1 rounded bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-secondary)] truncate min-w-0">
            https://mdselim.com · Architecture Blueprint
          </div>
          <span className="hidden sm:inline text-[11px] font-mono text-[var(--accent-primary)] tabular-nums shrink-0">
            1200px Grid
          </span>
        </div>

        {/* Architectural Wireframe Split Body */}
        <div className="my-4 sm:my-5 grid grid-cols-1 sm:grid-cols-12 gap-4 flex-1 items-stretch">
          {/* Left Column: Semantic Hierarchy Blueprint */}
          <div className="sm:col-span-7 ds-surface-inset p-4 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[var(--accent-primary)]">
                <span>H1 · Primary Positioning</span>
                <span>UX Flow</span>
              </div>
              <div className="h-3.5 w-11/12 rounded bg-[var(--text-primary)] opacity-90" />
              <div className="h-3.5 w-4/5 rounded bg-[var(--text-primary)] opacity-75" />
              <div className="pt-1 space-y-1.5">
                <div className="h-2 w-full rounded bg-[var(--bg-interactive)]" />
                <div className="h-2 w-10/12 rounded bg-[var(--bg-interactive)]" />
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-2">
              <div className="px-3 py-1.5 rounded bg-[var(--accent-primary)] text-[var(--accent-on-primary)] text-[11px] font-semibold">
                Clear Inquiry Action
              </div>
              <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                Service Clarity
              </span>
            </div>
          </div>

          {/* Right Column: Technical SEO & Schema Spec */}
          <div className="sm:col-span-5 ds-surface-interactive p-4 flex flex-col justify-between">
            <div className="space-y-2">
              <p className="text-[11px] font-mono font-semibold text-[var(--text-primary)]">
                SEO-Ready Foundation
              </p>
              <div className="space-y-1.5 text-[11px] text-[var(--text-secondary)]">
                <div className="flex items-center justify-between gap-2 py-1 border-b border-[var(--border-subtle)]">
                  <span>Semantic HTML5</span>
                  <span className="font-mono text-[var(--text-primary)]">H1–H3</span>
                </div>
                <div className="flex items-center justify-between gap-2 py-1 border-b border-[var(--border-subtle)]">
                  <span>Structured Data</span>
                  <span className="font-mono text-[var(--text-primary)]">JSON-LD</span>
                </div>
                <div className="flex items-center justify-between gap-2 py-1 border-b border-[var(--border-subtle)]">
                  <span>Sitemap & Canonicals</span>
                  <span className="font-mono text-[var(--text-primary)]">Configured</span>
                </div>
                <div className="flex items-center justify-between gap-2 py-1">
                  <span>Responsive UX</span>
                  <span className="font-mono text-[var(--accent-primary)] font-semibold">
                    All Viewports
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-2 border-t border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-secondary)]">
              Webflow · Static-First Architecture
            </div>
          </div>
        </div>

        {/* Bottom Architecture Pillars Bar */}
        <div className="pt-3 border-t border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-left">
          <div className="min-w-0">
            <p className="font-mono text-[11px] text-[var(--text-secondary)]">
              01. Core Service
            </p>
            <p className="text-xs font-semibold text-[var(--text-primary)] sm:truncate">
              Webflow & Landing Pages
            </p>
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[11px] text-[var(--text-secondary)]">
              02. Supporting Service
            </p>
            <p className="text-xs font-semibold text-[var(--text-primary)] sm:truncate">
              On-Page & Technical SEO
            </p>
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[11px] text-[var(--text-secondary)]">
              03. Recurring Service
            </p>
            <p className="text-xs font-semibold text-[var(--text-primary)] sm:truncate">
              Updates & Maintenance
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'founder-studio') {
    return (
      <div
        className={`ds-card w-full p-5 sm:p-6 flex flex-col justify-between space-y-6 ${className}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-4">
          <div>
            <p className="font-mono text-xs text-[var(--text-secondary)]">
              Developer & Web Architect
            </p>
            <p className="text-base font-bold text-[var(--text-primary)]">
              MD Selim · mdselim.com
            </p>
          </div>
          <span className="text-xs font-mono text-[var(--accent-primary)]">
            Independent Practice
          </span>
        </div>

        <div className="space-y-4">
          <div className="ds-surface-inset p-4 space-y-1.5">
            <p className="text-xs font-semibold text-[var(--text-primary)]">
              01. Structure Before Decoration
            </p>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Every project begins with organizing your services and page hierarchy so visitors understand your work immediately.
            </p>
          </div>
          <div className="ds-surface-inset p-4 space-y-1.5">
            <p className="text-xs font-semibold text-[var(--text-primary)]">
              02. Search-Ready Engineering
            </p>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Clean HTML semantics, structured metadata, and fast page load performance built directly into the foundation.
            </p>
          </div>
          <div className="ds-surface-inset p-4 space-y-1.5">
            <p className="text-xs font-semibold text-[var(--text-primary)]">
              03. Direct Communication
            </p>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              You work directly with the person planning, building, and maintaining your website—without agency handoffs.
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[var(--text-secondary)]">
          <span>Small Service Business Focus</span>
          <span className="text-[var(--accent-primary)]">Webflow & Custom Code</span>
        </div>
      </div>
    );
  }

  const variantMeta = {
    legal: {
      label: 'Demo Architecture · B2B Advisory',
      layoutType: 'Multi-Page Service & Practice Structure',
      focusArea: 'Practice-Area Clarity & Intake Flow',
      schemaType: 'ProfessionalService Schema',
    },
    clinic: {
      label: 'Demo Architecture · Local Clinic',
      layoutType: 'Mobile-First Treatment Landing Page',
      focusArea: 'Patient Journey & Local SEO Setup',
      schemaType: 'MedicalClinic Schema',
    },
    advisory: {
      label: 'Demo Architecture · Technical Firm',
      layoutType: 'Indexable HTML Service Catalog',
      focusArea: 'Replacing Static PDFs with CMS Pages',
      schemaType: 'Service & Breadcrumb Schema',
    },
    engineering: {
      label: 'Live Platform · mdselim.com',
      layoutType: 'Modular Static-First Architecture',
      focusArea: 'Botanical Obsidian + Markdown CMS',
      schemaType: 'Semantic HTML5 & SEO Meta',
    },
  }[variant];

  return (
    <div
      className={`ds-surface-inset w-full p-4 sm:p-5 flex flex-col justify-between gap-4 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--border-subtle)] text-xs">
        <span className="font-mono text-[var(--text-secondary)]">{variantMeta.label}</span>
        <span className="font-mono text-[var(--accent-primary)] font-medium">
          {variantMeta.schemaType}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 py-1">
        <div className="sm:col-span-7 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded p-3 space-y-2">
          <div className="text-[11px] font-mono text-[var(--text-secondary)]">
            {variantMeta.layoutType}
          </div>
          <div className="h-2.5 w-4/5 bg-[var(--text-primary)] opacity-85 rounded" />
          <div className="h-2 w-3/5 bg-[var(--bg-interactive)] rounded" />
          <div className="pt-2 flex gap-2">
            <div className="h-5 w-20 bg-[var(--accent-primary)] rounded" />
            <div className="h-5 w-16 bg-[var(--bg-interactive)] rounded" />
          </div>
        </div>
        <div className="sm:col-span-5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded p-3 flex flex-col justify-between gap-2">
          <span className="text-[11px] font-mono text-[var(--text-secondary)]">
            Architecture Focus
          </span>
          <p className="text-xs font-mono font-semibold text-[var(--text-primary)]">
            {variantMeta.focusArea}
          </p>
          <span className="text-[11px] font-mono text-[var(--accent-primary)]">
            UX · Technical SEO
          </span>
        </div>
      </div>
    </div>
  );
};
