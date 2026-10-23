"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useScrollMotion } from "@/lib/motion";
import SiteHeader from "./SiteHeader";
import styles from "./Hero.module.css";
import pavilion from "../../public/images/courtyard-pavilion.png";

/** 01 / Arrival — type behind architecture. */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);

  // The lettering rises in with CSS on load; while the hero scrolls away it
  // sinks back behind the roof, linked directly to scroll position.
  useScrollMotion(sectionRef, ({ root }) => {
    gsap.to(titleRef.current, {
      yPercent: 62,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  return (
    <section ref={sectionRef} id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.stage}>
        <Image
          src={pavilion}
          alt="Illustrative concept of a timber and stone pavilion with a long low roof, set in a lawn between trees and hills"
          fill
          priority
          sizes="(min-width: 1024px) 100vw, 340vw"
          className={styles.image}
        />
      </div>

      <h1 id="hero-title" className={styles.title}>
        <span className="sr-only">Ever Design Group</span>
        <span ref={titleRef} className={styles.everScroll} aria-hidden="true">
          <span className={styles.ever}>ever</span>
        </span>
      </h1>

      {/* Foreground: the same image, cropped below the roofline, sits over the lettering. */}
      <div className={`${styles.stage} ${styles.foreground}`} aria-hidden="true">
        <Image
          src={pavilion}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 100vw, 340vw"
          className={styles.image}
        />
      </div>

      <SiteHeader />

      <div className={styles.strip}>
        <p className={styles.stripTitle}>Plan. Design. Build.</p>
        <p className={styles.stripText}>
          Hotels, resorts and tourism environments
          <br />
          that tell the African story.
        </p>
      </div>
    </section>
  );
}
