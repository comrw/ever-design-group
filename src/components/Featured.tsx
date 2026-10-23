"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, useScrollMotion } from "@/lib/motion";
import styles from "./Featured.module.css";
import lake from "../../public/images/retreat-above-lake.png";

/** 04 / Featured retreat — spatial details. */
export default function Featured() {
  const sectionRef = useRef<HTMLElement>(null);
  const hotspotRef = useRef<HTMLButtonElement>(null);
  // The primary Figma frame shows the material note open; 26:103 is the closed state.
  const [materialOpen, setMaterialOpen] = useState(true);

  useEffect(() => {
    if (!materialOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (!sectionRef.current?.contains(document.activeElement)) return;
      setMaterialOpen(false);
      hotspotRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [materialOpen]);

  // Detail notes lift into place as the scene scrolls into view.
  useScrollMotion(sectionRef, ({ root }) => {
    gsap.utils.toArray<HTMLElement>(`.${styles.noteMotion}`, root).forEach((note, index) => {
      gsap.from(note, {
        opacity: 0,
        y: 30,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: `top ${70 - index * 6}%`,
          end: `top ${35 - index * 6}%`,
          scrub: 0.5,
        },
      });
    });
  });

  return (
    <section ref={sectionRef} id="retreat" className={styles.section} aria-labelledby="retreat-title">
      <Image
        src={lake}
        alt="Illustrative concept of a glazed stone retreat with a timber-lined gable, set on terraced, planted land above a lake at sunset"
        fill
        sizes="(min-width: 1024px) 100vw, 325vw"
        className={styles.image}
      />

      <p className={styles.eyebrow}>THE LAND SHAPES THE EXPERIENCE.</p>
      <h2 id="retreat-title" className={styles.title}>
        Stay somewhere
        <br />
        that stays with you.
      </h2>

      <div className={`${styles.note} ${styles.terrain}`}>
        <div className={styles.noteMotion}>
          <div className={styles.noteCard}>
            <h3 className={styles.noteTitle}>01 / Follow the contour</h3>
            <p className={styles.noteText}>
              Work with the slope.
              <br />
              Keep the landscape present.
            </p>
          </div>
        </div>
      </div>

      <div className={`${styles.note} ${styles.material}`}>
        <div className={styles.noteMotion}>
          <div id="material-note" className={styles.noteCard} hidden={!materialOpen}>
            <h3 className={styles.noteTitle}>02 / Material, with meaning</h3>
            <p className={styles.noteText}>
              Local stone. Warm timber.
              <br />A story you can touch.
            </p>
          </div>
        </div>
      </div>

      <button
        ref={hotspotRef}
        type="button"
        className={styles.hotspot}
        aria-expanded={materialOpen}
        aria-controls="material-note"
        aria-label={materialOpen ? "Hide material detail" : "Show material detail"}
        onClick={() => setMaterialOpen((open) => !open)}
      >
        <span aria-hidden="true">+</span>
      </button>

      <p className={styles.caption}>ILLUSTRATIVE ARCHITECTURAL CONCEPT</p>
    </section>
  );
}
