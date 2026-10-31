import React from 'react';

export interface AmbientBackgroundProps {
  glowRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Phase 04: Lightweight Animated Emerald Grid + Desktop Radial Pointer Glow.
 * - Strictly pointer-events-none so it never blocks clicks or selection.
 * - Uses compositor-only CSS transforms and opacity.
 * - Automatically disables motion under prefers-reduced-motion and on touch devices.
 */
export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ glowRef }) => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
    >
      {/* Subtle Architectural Emerald Grid + Dotted Matrix */}
      <div className="ds-ambient-grid" />
      <div className="ds-ambient-dots" />

      {/* Soft Top Atmospheric Vignette */}
      <div className="ds-ambient-vignette" />

      {/* Desktop-Focused Smooth Radial Emerald Pointer Glow */}
      <div ref={glowRef} className="ds-cursor-glow" />
    </div>
  );
};
