import { useEffect } from 'react';
import { RoutePath } from '../config/siteConfig';

/**
 * Phase 04: Lightweight Interaction & Motion Controller
 * - Desktop-only smooth radial emerald pointer glow (disabled on touch devices & reduced motion)
 * - Uses on-demand requestAnimationFrame (stops ticking when pointer is idle — zero wasted CPU loop)
 * - Updates card-local CSS custom properties (--mouse-x, --mouse-y) for subtle border/surface sheen
 * - Progressive-enhancement IntersectionObserver for subtle section & card scroll reveals
 */
export function useInteractionSystem(
  glowRef: React.RefObject<HTMLDivElement | null>,
  currentRoute: RoutePath
): void {
  // 1. Desktop Pointer Glow & Card Radial Sheen
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

    const tick = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      currentX += dx * 0.14;
      currentY += dy * 0.14;

      if (glowEl) {
        glowEl.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;
        if (isPointerActive && glowEl.style.opacity !== '1') {
          glowEl.style.opacity = '1';
        }
      }

      if (Math.abs(dx) > 0.35 || Math.abs(dy) > 0.35) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;

      isPointerActive = true;
      targetX = event.clientX;
      targetY = event.clientY;

      if (rafId === null) {
        rafId = window.requestAnimationFrame(tick);
      }

      // Subtle card-local radial border/surface highlight
      const targetNode = event.target as HTMLElement | null;
      if (targetNode) {
        const card = targetNode.closest<HTMLElement>(
          '.ds-card, .ds-card-interactive, .ds-card-active'
        );
        if (card) {
          const rect = card.getBoundingClientRect();
          const localX = event.clientX - rect.left;
          const localY = event.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${localX.toFixed(0)}px`);
          card.style.setProperty('--mouse-y', `${localY.toFixed(0)}px`);
        }
      }
    };

    const handlePointerLeaveWindow = () => {
      isPointerActive = false;
      if (glowEl) {
        glowEl.style.opacity = '0';
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeaveWindow, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeaveWindow);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [glowRef]);

  // 2. Subtle Scroll-Reveal Progressive Enhancement on Route Change
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll<HTMLElement>(
      '[data-reveal], .ds-card, .ds-card-interactive, .ds-card-active'
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

    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Elements already in or near initial viewport stay immediately settled
      if (rect.top < viewportHeight * 0.92) {
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
