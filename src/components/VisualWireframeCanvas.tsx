import React from 'react';

export interface VisualWireframeCanvasProps {
  variant: 'hero-architecture' | 'legal' | 'clinic' | 'advisory' | 'engineering' | 'founder-studio';
  className?: string;
}

/**
 * Architectural SVG Wireframe & Technical SEO Blueprint Canvas.
 * Provides crisp, domain-authentic visual diagrams for Hero and Case Study showcases
 * with zero external image dependencies.
 */
export const VisualWireframeCanvas: React.FC<VisualWireframeCanvasProps> = ({
  variant,
  className = '',
}) => {
  if (variant === 'hero-architecture') {
    return (
      <div
        className={`relative w-full h-full min-h-[380px] rounded-xl bg-white border border-stone-200/90 p-5 sm:p-6 flex flex-col justify-between overflow-hidden ${className}`}
      >
        {/* Top Browser Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-stone-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-stone-300" />
          </div>
          <div className="px-3 py-1 rounded bg-[#FAF9F6] border border-stone-200 text-[11px] font-mono text-stone-600">
            https://mdselim.com · Architecture Blueprint
          </div>
          <span className="text-[11px] font-mono text-stone-500 tabular-nums">1440px Grid</span>
        </div>

        {/* Architectural Wireframe Split Body */}
        <div className="my-5 grid grid-cols-12 gap-4 flex-1 items-stretch">
          {/* Left Column: Semantic Hierarchy Blueprint */}
          <div className="col-span-12 sm:col-span-7 rounded-lg bg-[#FAF9F6] border border-stone-200/90 p-4 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-blue-700">
                <span>H1 · Primary Positioning</span>
                <span>WCAG AA</span>
              </div>
              <div className="h-3.5 w-11/12 rounded bg-slate-900" />
              <div className="h-3.5 w-4/5 rounded bg-slate-900" />
              <div className="pt-1 space-y-1.5">
                <div className="h-2 w-full rounded bg-stone-300" />
                <div className="h-2 w-10/12 rounded bg-stone-300" />
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-200/80 flex items-center justify-between gap-2">
              <div className="px-3 py-1.5 rounded bg-blue-700 text-white text-[11px] font-medium">
                Primary Inquiry Action
              </div>
              <span className="text-[11px] font-mono text-stone-500">
                Conversion Path
              </span>
            </div>
          </div>

          {/* Right Column: Technical SEO & Schema Spec */}
          <div className="col-span-12 sm:col-span-5 rounded-lg bg-[#F3F2EE] border border-stone-200/90 p-4 flex flex-col justify-between">
            <div className="space-y-2">
              <p className="text-[11px] font-mono font-medium text-slate-800">
                Technical SEO Layer
              </p>
              <div className="space-y-1.5 text-[11px] text-slate-600">
                <div className="flex items-center justify-between py-1 border-b border-stone-200">
                  <span>Semantic HTML5</span>
                  <span className="font-mono text-slate-900">Verified</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-stone-200">
                  <span>Schema.org JSON-LD</span>
                  <span className="font-mono text-slate-900">Service</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-stone-200">
                  <span>Sitemap & Canonicals</span>
                  <span className="font-mono text-slate-900">Indexed</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span>Mobile LCP Target</span>
                  <span className="font-mono tabular-nums text-blue-700 font-semibold">0.8s</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 text-[11px] text-stone-500">
              Webflow CMS · Static-First Speed
            </div>
          </div>
        </div>

        {/* Bottom Architecture Pillars Bar */}
        <div className="pt-3 border-t border-stone-200/80 grid grid-cols-3 gap-3 text-left">
          <div>
            <p className="text-[11px] text-stone-500">01. Core Build</p>
            <p className="text-xs font-semibold text-slate-900 truncate">Webflow & Landing Pages</p>
          </div>
          <div>
            <p className="text-[11px] text-stone-500">02. Search Foundation</p>
            <p className="text-xs font-semibold text-slate-900 truncate">On-Page & Technical SEO</p>
          </div>
          <div>
            <p className="text-[11px] text-stone-500">03. Long-Term Care</p>
            <p className="text-xs font-semibold text-slate-900 truncate">Updates & Maintenance</p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'founder-studio') {
    return (
      <div
        className={`relative w-full rounded-xl bg-white border border-stone-200/90 p-6 flex flex-col justify-between space-y-6 ${className}`}
      >
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <p className="text-xs text-stone-500">Principal Architect</p>
            <p className="text-base font-bold text-slate-900">MD Selim · mdselim.com</p>
          </div>
          <span className="text-xs font-mono text-blue-700">Est. Practice</span>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-[#FAF9F6] border border-stone-200/80 space-y-1.5">
            <p className="text-xs font-semibold text-slate-900">01. Positioning & UX Structure</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every engagement starts with organizing your services so prospective clients understand your value without friction.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[#FAF9F6] border border-stone-200/80 space-y-1.5">
            <p className="text-xs font-semibold text-slate-900">02. Search-Ready Engineering</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clean HTML semantics, structured metadata, and fast page load performance built directly into the foundation.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[#FAF9F6] border border-stone-200/80 space-y-1.5">
            <p className="text-xs font-semibold text-slate-900">03. Dependable Ongoing Support</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct communication with the developer who built your site—no ticket queues or rotating account managers.
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>Direct Founder Collaboration</span>
          <span className="font-mono text-slate-900">100% Custom Code & Webflow</span>
        </div>
      </div>
    );
  }

  const variantMeta = {
    legal: {
      domain: 'meridianlaw.co.uk',
      layoutType: '14-Page B2B Practice Architecture',
      primaryMetric: '+138% Consultation Inquiries',
      schemaType: 'LegalService JSON-LD',
    },
    clinic: {
      domain: 'velorestorative.ca',
      layoutType: 'Specialist Treatment Landing Pages',
      primaryMetric: '+84% Organic Local Bookings',
      schemaType: 'MedicalClinic JSON-LD',
    },
    advisory: {
      domain: 'kaizensurveying.com.au',
      layoutType: 'Commercial Engineering Catalog & SEO',
      primaryMetric: '+210% Search Impressions',
      schemaType: 'ProfessionalService JSON-LD',
    },
    engineering: {
      domain: 'harborcpa.com',
      layoutType: 'Fractional CFO Tier Architecture',
      primaryMetric: '+65% Retainer Inquiries',
      schemaType: 'AccountingService JSON-LD',
    },
  }[variant];

  return (
    <div
      className={`w-full rounded-lg bg-[#FAF9F6] border border-stone-200/90 p-4 sm:p-5 flex flex-col justify-between gap-4 ${className}`}
    >
      <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 text-xs">
        <span className="font-mono text-stone-600">{variantMeta.domain}</span>
        <span className="font-mono text-blue-700 font-medium">{variantMeta.schemaType}</span>
      </div>

      <div className="grid grid-cols-12 gap-3 py-2">
        <div className="col-span-7 bg-white border border-stone-200/80 rounded p-3 space-y-2">
          <div className="text-[10px] font-mono text-stone-500">{variantMeta.layoutType}</div>
          <div className="h-2.5 w-4/5 bg-slate-800 rounded" />
          <div className="h-2 w-3/5 bg-stone-300 rounded" />
          <div className="pt-2 flex gap-2">
            <div className="h-5 w-20 bg-blue-700 rounded" />
            <div className="h-5 w-16 bg-stone-200 rounded" />
          </div>
        </div>
        <div className="col-span-5 bg-white border border-stone-200/80 rounded p-3 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-stone-500">Verified Outcome</span>
          <p className="text-xs font-mono font-semibold text-slate-900 tabular-nums">
            {variantMeta.primaryMetric}
          </p>
          <span className="text-[10px] text-stone-500">Webflow · Technical SEO</span>
        </div>
      </div>
    </div>
  );
};
