import { useEffect } from 'react';
import { RoutePath } from '../config/siteConfig';

/**
 * Phase 04 & 10: High-Performance Interaction & Motion Controller
 * - Desktop-only smooth radial emerald pointer glow (disabled on touch devices & reduced motion)
 * - Uses on-demand requestAnimationFrame (stops ticking when pointer is idle or tab is hidden — zero wasted CPU loop)
 * - Batches card-local CSS custom properties (--mouse-x, --mouse-y) inside RAF to prevent forced synchronous reflows
 * - Read-before-write batched IntersectionObserver for subtle section & card scroll reveals
 */
export function useInteractionSystem(
  glowRef: React.RefObject<HTMLDivElement | null>,
  currentRoute: RoutePath
): void {
  // 1. Desktop Pointer Glow & Card Radial Sheen (Zero Layout Thrashing)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const finePointerQuery = window.matchMedia('(pointer: fine) and (hover: hover)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!finePointerQuery.matches || reducedMotionQuery.matches) {
      return;
    }

    const glowEl = glowRef.current;
    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.35;
    let currentX = targetX;
    let currentY = targetY;
    let rafId: number | null = null;
    let isPointerActive = false;
    let pendingCard: HTMLElement | null = null;

    const tick = () => {
      if (document.hidden) {
        rafId = null;
        return;
      }

      // Read phase: read hovered card bounding box once per animation frame if pointer moved over a card
      let cardRect: DOMRect | null = null;
      const cardToUpdate = pendingCard;
      pendingCard = null;
      if (cardToUpdate) {
        cardRect = cardToUpdate.getBoundingClientRect();
      }

      const dx = targetX - currentX;
      const dy = targetY - currentY;

      currentX += dx * 0.14;
      currentY += dy * 0.14;

      // Write phase: mutate compositor-only transform/opacity and card CSS variables
      if (glowEl) {
        glowEl.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;
        if (isPointerActive && glowEl.style.opacity !== '1') {
          glowEl.style.opacity = '1';
        }
      }

      if (cardToUpdate && cardRect) {
        const localX = targetX - cardRect.left;
        const localY = targetY - cardRect.top;
        cardToUpdate.style.setProperty('--mouse-x', `${localX.toFixed(0)}px`);
        cardToUpdate.style.setProperty('--mouse-y', `${localY.toFixed(0)}px`);
      }

      if (Math.abs(dx) > 0.35 || Math.abs(dy) > 0.35) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || document.hidden) return;

      isPointerActive = true;
      targetX = event.clientX;
      targetY = event.clientY;

      const targetNode = event.target as HTMLElement | null;
      if (targetNode) {
        pendingCard = targetNode.closest<HTMLElement>(
          '.ds-card, .ds-card-interactive, .ds-card-active'
        );
      }

      if (rafId === null) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const handlePointerLeaveWindow = () => {
      isPointerActive = false;
      pendingCard = null;
      if (glowEl) {
        glowEl.style.opacity = '0';
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeaveWindow, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeaveWindow);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [glowRef]);

  // 2. Subtle Scroll-Reveal Progressive Enhancement on Route Change (Batched Reads -> Batched Writes)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        '[data-reveal], .ds-card, .ds-card-interactive, .ds-card-active'
      )
    );

    if (reducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((el) => {
        el.classList.remove('ds-reveal-pending');
        el.classList.add('ds-reveal-visible');
      });
      return;
    }

    const viewportHeight = window.innerHeight;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.remove('ds-reveal-pending');
            el.classList.add('ds-reveal-visible');
            observer.unobserve(el);
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08,
      }
    );

    // Phase 1: Batch all geometric reads first to avoid interleaved read/write layout thrashing
    const measurements = targets.map((el) => ({
      el,
      isAboveFold: el.getBoundingClientRect().top < viewportHeight * 0.92,
    }));

    // Phase 2: Batch all classList writes and observer registrations
    measurements.forEach(({ el, isAboveFold }) => {
      if (isAboveFold) {
        el.classList.remove('ds-reveal-pending');
        el.classList.add('ds-reveal-visible');
      } else {
        el.classList.remove('ds-reveal-visible');
        el.classList.add('ds-reveal-pending');
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [currentRoute]);
}
