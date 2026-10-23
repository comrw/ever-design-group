"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import { gsap, useScrollMotion } from "@/lib/motion";
import styles from "./Approach.module.css";
import courtyard from "../../public/images/courtyard-pavilion.png";
import walk from "../../public/images/walk-into-landscape.png";
import lake from "../../public/images/retreat-above-lake.png";

type Card = {
  title: string;
  image: StaticImageData;
  alt: string;
  className: string;
};

const CARDS: Card[] = [
  {
    title: "The courtyard pavilion",
    image: courtyard,
    alt: "Illustrative concept of a low timber pavilion opening onto a lawn",
    className: styles.card1,
  },
  {
    title: "A walk into the landscape",
    image: walk,
    alt: "Illustrative concept of a timber boardwalk and open shelter in a forest",
    className: styles.card2,
  },
  {
    title: "A retreat above the lake",
    image: lake,
    alt: "Illustrative concept of a glazed stone retreat on terraced land above a lake at sunset",
    className: styles.card3,
  },
];

/** 02 / Approach — stacked concept cards. */
export default function Approach() {
  const sectionRef = useRef<HTMLElement>(null);

  // Cards travel in from the right and settle into the stack as the section
  // scrolls into view (Figma timeline: x +750, rotation +12°, staggered).
  useScrollMotion(sectionRef, ({ root }) => {
    const cards = gsap.utils.toArray<HTMLElement>(`.${styles.motion}`, root);
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: `.${styles.stack}`,
        start: "top bottom",
        end: "center 55%",
        scrub: 0.6,
      },
    });
    cards.forEach((card, index) => {
      timeline.from(
        card,
        { x: () => window.innerWidth * 0.52, rotation: 12, ease: "power2.out", duration: 1 },
        index * 0.18,
      );
    });
  });

  return (
    <section ref={sectionRef} id="approach" className={styles.section} aria-labelledby="approach-title">
      <div className={styles.copy}>
        <h2 id="approach-title" className={styles.headline}>
          Hotels.
          <br />
          Retreats.
          <br />
          Eco-parks.
          <br />
          Villas.
        </h2>
        <p className={styles.subhead}>
          Different places.
          <br />
          One discipline.
        </p>
        <p className={styles.body}>
          We design and build around the landscape,
          <br />
          the culture and the history that make a place
          <br />
          worth experiencing.
        </p>
      </div>

      <ul className={styles.stack} aria-label="Illustrative concepts">
        {CARDS.map((card) => (
          <li key={card.title} className={`${styles.slot} ${card.className}`}>
            <div className={styles.motion}>
              <figure className={styles.card}>
                <div className={styles.media}>
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 1024px) 41vw, 85vw"
                    className={styles.image}
                  />
                </div>
                <figcaption>
                  <span className={styles.cardTitle}>{card.title}</span>
                </figcaption>
              </figure>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
