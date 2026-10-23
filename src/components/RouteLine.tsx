"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/motion";

/** A navigation that finishes inside this window shows nothing at all. */
const SHOW_AFTER_MS = 220;
/** Never leave the line up if a navigation is abandoned. */
const GIVE_UP_MS = 10000;

/**
 * Short architectural line for internal navigations that genuinely take time.
 * It starts only for client-side route changes (a Link click or back/forward
 * to another path), appears only after SHOW_AFTER_MS, and draws towards the
 * far edge without claiming any measured progress. When the new route
 * commits it completes and fades.
 */
export default function RouteLine() {
  const pathname = usePathname();
  const lineRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const pathRef = useRef(pathname);
  const timers = useRef<{ show?: number; giveUp?: number }>({});
  const visible = useRef(false);
  const hideRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const line = lineRef.current;
    const bar = barRef.current;
    if (!line || !bar) return;

    const reduced = () => !window.matchMedia(MOTION_OK).matches;

    const clearTimers = () => {
      window.clearTimeout(timers.current.show);
      window.clearTimeout(timers.current.giveUp);
      timers.current = {};
    };

    const hide = () => {
      clearTimers();
      if (!visible.current) return;
      visible.current = false;
      gsap.killTweensOf([line, bar]);
      if (reduced()) {
        gsap.set(line, { opacity: 0 });
        gsap.set(bar, { scaleX: 0 });
        return;
      }
      gsap
        .timeline()
        .to(bar, { scaleX: 1, duration: 0.22, ease: "power2.out" })
        .to(line, { opacity: 0, duration: 0.25, ease: "power1.out" }, "+=0.05")
        .set(bar, { scaleX: 0 });
    };

    const show = () => {
      visible.current = true;
      gsap.killTweensOf([line, bar]);
      gsap.set(bar, { scaleX: 0 });
      gsap.set(line, { opacity: 1 });
      if (reduced()) {
        gsap.set(bar, { scaleX: 1 });
        return;
      }
      gsap.to(bar, { scaleX: 0.86, duration: 2.4, ease: "power3.out" });
    };

    const begin = () => {
      // Never during the first-visit introduction.
      const intro = document.documentElement.dataset.introState;
      if (intro === "play" || intro === "exit") return;
      clearTimers();
      timers.current.show = window.setTimeout(show, SHOW_AFTER_MS);
      timers.current.giveUp = window.setTimeout(hide, GIVE_UP_MS);
    };

    const onClick = (event: MouseEvent) => {
      // Next's <Link> prevents the default for client-side navigations; plain
      // links and new-tab clicks load a new document and need nothing here.
      if (!event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if ((anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === pathRef.current) return;
      begin();
    };

    const onPopState = () => {
      if (window.location.pathname !== pathRef.current) begin();
    };

    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPopState);
    hideRef.current = hide;
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPopState);
      clearTimers();
      gsap.killTweensOf([line, bar]);
      gsap.set(line, { opacity: 0 });
      visible.current = false;
      hideRef.current = null;
    };
  }, []);

  // The new route has committed: cancel a pending line or complete a visible one.
  useEffect(() => {
    if (pathRef.current === pathname) return;
    pathRef.current = pathname;
    hideRef.current?.();
  }, [pathname]);

  return (
    <div ref={lineRef} className="route-line" aria-hidden="true">
      <span ref={barRef} />
    </div>
  );
}
