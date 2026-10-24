"use client";
import { useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap, useScrollMotion } from "@/lib/motion";

/** Shared motion vocabulary for editorial pages, with a fully visible no-JS fallback. */
export default function PageExperience({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <MotionPage key={pathname}>{children}</MotionPage>;
}
function MotionPage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollMotion(ref, ({ root }) => {
    root.querySelectorAll("[data-reveal]").forEach((el) => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    });
    root.querySelectorAll("[data-parallax]").forEach((el) => {
      gsap.fromTo(
        el,
        { yPercent: -4 },
        {
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
  });
  return <div ref={ref}>{children}</div>;
}
