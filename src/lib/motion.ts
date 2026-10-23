"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP = "(min-width: 1024px)";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Runs scroll-linked motion scoped to `scope`, only when the visitor has not
 * asked for reduced motion. Everything is reverted on unmount or when the
 * media conditions change, so the static (final) layout is always the fallback.
 */
export function useScrollMotion(
  scope: RefObject<HTMLElement | null>,
  setup: (context: { desktop: boolean; root: HTMLElement }) => void,
) {
  useIsomorphicLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;

    const mm = gsap.matchMedia(root);
    mm.add({ motion: MOTION_OK, desktop: DESKTOP }, (ctx) => {
      const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
      if (!motion) return;
      setup({ desktop, root });
    });

    return () => mm.revert();
    // The setup function is intentionally treated as static per component.
  }, [scope]);
}
