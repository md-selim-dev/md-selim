/**
 * Centralized Design Tokens & Style Presets for mdselim.com
 * Enforces the 60-30-10 color budget, strict typographic scale, and spatial hierarchy.
 */
export const themeTokens = {
  colors: {
    canvas: 'bg-[#FAF9F6] text-slate-900',
    surfacePrimary: 'bg-white border border-stone-200/90',
    surfaceMuted: 'bg-[#F3F2EE] border border-stone-200/80',
    surfaceDark: 'bg-slate-900 text-stone-100',
    accentText: 'text-blue-700',
    accentBg: 'bg-blue-700 hover:bg-blue-800 text-white',
    hairline: 'border-stone-200/90',
  },
  typography: {
    kicker: 'text-xs font-medium tracking-wide text-stone-600',
    heroHeadline:
      'text-[clamp(2.25rem,4vw,3.75rem)] font-bold tracking-tight text-slate-900 leading-[1.08]',
    pageHeadline:
      'text-[clamp(2rem,3.4vw,3.25rem)] font-bold tracking-tight text-slate-900 leading-[1.1]',
    sectionHeadline:
      'text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-[1.2]',
    cardTitle: 'text-lg sm:text-xl font-semibold tracking-tight text-slate-900',
    bodyLead: 'text-base sm:text-lg text-slate-600 leading-relaxed max-w-[65ch]',
    bodyRegular: 'text-[15px] sm:text-base text-slate-600 leading-relaxed max-w-[68ch]',
    metadata: 'text-xs text-stone-500 leading-normal',
    metricValue: 'font-mono tabular-nums font-semibold tracking-tight text-slate-900',
  },
  layout: {
    container: 'mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10',
    sectionSpacing: 'py-16 sm:py-20 lg:py-24',
    sectionSpacingCompact: 'py-12 sm:py-16',
  },
} as const;
