"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { gsap, MOTION_OK } from "@/lib/motion";
import styles from "./Destinations.module.css";
import courtyard from "../../public/images/courtyard-pavilion.png";
import walk from "../../public/images/walk-into-landscape.png";
import lake from "../../public/images/retreat-above-lake.png";

type Destination = { name: string; image: StaticImageData; alt: string };

// Image per row follows the Figma prototype states (26:16, 23:136, 26:41, 26:66).
const DESTINATIONS: Destination[] = [
  {
    name: "Hotels & Resorts",
    image: courtyard,
    alt: "Illustrative concept of a timber pavilion opening onto a lawn",
  },
  {
    name: "Retreats",
    image: lake,
    alt: "Illustrative concept of a glazed stone retreat above a lake at sunset",
  },
  {
    name: "Eco-Parks",
    image: walk,
    alt: "Illustrative concept of a forest boardwalk leading to an open timber shelter",
  },
  {
    name: "Villas",
    image: lake,
    alt: "Illustrative concept of a glazed stone villa on terraced land above a lake",
  },
];

const FINE_POINTER = "(hover: hover) and (pointer: fine) and (min-width: 1024px)";

/** 03 / Destination index — pointer preview. */
export default function Destinations() {
  const [active, setActive] = useState(1);
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const follow = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null);

  // Desktop with a mouse and motion allowed: the preview eases after the pointer.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(`${FINE_POINTER} and ${MOTION_OK}`, () => {
      const el = previewRef.current;
      if (!el) return;
      follow.current = {
        x: gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" }),
      };
      return () => {
        follow.current = null;
        gsap.set(el, { clearProps: "transform" });
      };
    });
    return () => mm.revert();
  }, []);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const list = listRef.current;
    const preview = previewRef.current;
    if (!follow.current || !list || !preview || event.pointerType !== "mouse") return;

    // The preview sits just right of the pointer (so it never hides the hovered
    // name), vertically centred on it, and stays inside the index.
    const bounds = list.getBoundingClientRect();
    const gap = 32;
    const left = gsap.utils.clamp(0, bounds.width - preview.offsetWidth, event.clientX - bounds.left + gap);
    const top = gsap.utils.clamp(
      0,
      bounds.height - preview.offsetHeight,
      event.clientY - bounds.top - preview.offsetHeight / 2,
    );
    follow.current.x(left - preview.offsetLeft);
    follow.current.y(top - preview.offsetTop);
  };

  const onPointerLeave = () => {
    follow.current?.x(0);
    follow.current?.y(0);
  };

  return (
    <section id="destinations" className={styles.section} aria-labelledby="destinations-title">
      <h2 id="destinations-title" className={styles.title}>
        Places with a story.
      </h2>

      <div
        ref={listRef}
        className={styles.index}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <ul className={styles.list}>
          {DESTINATIONS.map((item, index) => (
            <li key={item.name}>
              <button
                type="button"
                className={styles.row}
                aria-pressed={active === index}
                aria-controls="destination-preview"
                onClick={() => setActive(index)}
                onFocus={() => setActive(index)}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setActive(index);
                }}
              >
                <span className={styles.name}>{item.name}</span>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div
          ref={previewRef}
          id="destination-preview"
          className={styles.preview}
          role="img"
          aria-label={`${DESTINATIONS[active].name}: ${DESTINATIONS[active].alt}`}
        >
          <div className={styles.previewFrame}>
            {DESTINATIONS.map((item, index) => (
              <Image
                key={item.name}
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, 45vw"
                className={styles.previewImage}
                data-active={active === index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
