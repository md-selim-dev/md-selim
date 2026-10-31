/**
 * Centralized Design System Tokens & Class Mappings for mdselim.com
 * Phase 02: Botanical Obsidian Visual Identity
 *
 * Palette:
 * - Main background (60%): #061411 (--bg-canvas)
 * - Elevated surfaces (30%): #0B241F (--bg-elevated)
 * - Interactive surfaces: #14332D (--bg-interactive)
 * - Primary accent (10%): #10B981 (--accent-primary)
 * - Primary text: #F0FDF8 (--text-primary)
 * - Secondary text: #8DAAA2 (--text-secondary)
 */
export const themeTokens = {
  colors: {
    canvas: 'bg-[var(--bg-canvas)] text-[var(--text-primary)]',
    surfaceElevated: 'bg-[var(--bg-elevated)] border border-[var(--border-subtle)]',
    surfaceInteractive: 'bg-[var(--bg-interactive)] border border-[var(--border-default)]',
    surfaceInset: 'bg-[var(--bg-canvas)] border border-[var(--border-subtle)]',
    accentText: 'text-[var(--accent-primary)]',
    accentBg: 'bg-[var(--accent-primary)] text-[var(--accent-on-primary)] hover:bg-[var(--accent-primary-hover)]',
    hairline: 'border-[var(--border-subtle)]',
    hairlineStrong: 'border-[var(--border-default)]',
  },
  typography: {
    kicker:
      'font-mono text-xs font-medium tracking-wider text-[var(--accent-primary)]',
    heroHeadline:
      'text-[length:var(--text-display-hero)] font-bold tracking-tight text-[var(--text-primary)] leading-[1.08]',
    pageHeadline:
      'text-[length:var(--text-display-page)] font-bold tracking-tight text-[var(--text-primary)] leading-[1.1]',
    sectionHeadline:
      'text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.2]',
    cardTitle:
      'text-lg sm:text-xl font-semibold tracking-tight text-[var(--text-primary)]',
    bodyLead:
      'text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-[65ch]',
    bodyRegular:
      'text-[15px] sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-[68ch]',
    metadata:
      'font-mono text-xs text-[var(--text-secondary)] leading-normal',
    metricValue:
      'font-mono tabular-nums font-bold tracking-tight text-[var(--text-primary)]',
  },
  components: {
    card: 'ds-card',
    cardInteractive: 'ds-card-interactive',
    cardActive: 'ds-card-active',
    surfaceInset: 'ds-surface-inset',
    surfaceInteractive: 'ds-surface-interactive',
    input: 'ds-input',
  },
  layout: {
    container: 'ds-container',
    sectionSpacing: 'ds-section-default',
    sectionSpacingCompact: 'ds-section-compact',
  },
} as const;
