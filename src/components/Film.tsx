"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { filmConfig } from "@/lib/config";
import styles from "./Film.module.css";
import poster from "../../public/images/film-poster.png";

type PlayerState = "poster" | "playing" | "error";

/** 05b / Film — From first line to final detail. */
export default function Film() {
  const hasFilm = Boolean(filmConfig.src);
  const [state, setState] = useState<PlayerState>("poster");
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pause whenever the player leaves the viewport. Never resumes on its own.
  useEffect(() => {
    if (state !== "playing") return;
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!frame || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !video.paused) video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [state]);

  useEffect(() => {
    if (state !== "playing") return;
    const video = videoRef.current;
    if (!video) return;
    video.focus();
    // Started by an explicit click or tap, so playing with sound is expected.
    video.play().catch(() => {
      // Autoplay can still be refused; the native controls remain available.
    });
  }, [state]);

  return (
    <section id="film" className={styles.section} aria-labelledby="film-title">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>INSIDE THE WORK</p>
        <h2 id="film-title" className={styles.title}>
          From first line
          <br />
          to final detail.
        </h2>
        <p className={styles.body}>
          The people, decisions and work
          <br />
          behind a destination.
        </p>
      </div>

      <figure className={styles.figure}>
        <div ref={frameRef} className={styles.frame}>
          {state === "playing" && filmConfig.src ? (
            <video
              ref={videoRef}
              className={styles.video}
              controls
              playsInline
              preload="metadata"
              poster={poster.src}
              onError={() => setState("error")}
            >
              {/* A failed <source> reports its error on the source element, not the video. */}
              <source
                src={filmConfig.src}
                {...(filmConfig.type ? { type: filmConfig.type } : {})}
                onError={() => setState("error")}
              />
              {filmConfig.captionsSrc ? (
                <track
                  kind="captions"
                  src={filmConfig.captionsSrc}
                  srcLang={filmConfig.captionsLang}
                  label="Captions"
                  default
                />
              ) : null}
            </video>
          ) : (
            <>
              <Image
                src={poster}
                alt="Illustrative poster: architects and engineers in hard hats reviewing drawings on a construction site"
                fill
                sizes="(min-width: 1024px) 60vw, 88vw"
                className={styles.poster}
              />
              <span className={styles.veil} aria-hidden="true" />
              {hasFilm ? (
                <button
                  type="button"
                  className={styles.play}
                  onClick={() => setState("playing")}
                  aria-label="Play film: From first line to final detail"
                >
                  <PlayGlyph />
                </button>
              ) : (
                // No film supplied yet: the mark stays as part of the poster but is not a control.
                <span className={`${styles.play} ${styles.playInert}`} aria-hidden="true">
                  <PlayGlyph />
                </span>
              )}
            </>
          )}
        </div>
        <figcaption className={styles.caption}>
          ILLUSTRATIVE POSTER / VIDEO SPACE
          {!hasFilm ? <span className={styles.status}> · FILM COMING SOON</span> : null}
        </figcaption>
        {state === "error" ? (
          <p className={styles.error} role="alert">
            The film could not be loaded. Please try again later.
          </p>
        ) : null}
      </figure>
    </section>
  );
}

/* eslint-disable @next/next/no-img-element -- fixed-size SVG marks from Figma */
function PlayGlyph() {
  return (
    <>
      <img className={`${styles.disc} ${styles.discMobile}`} src="/images/play-ellipse-mobile.svg" alt="" width={56} height={56} />
      <img className={`${styles.disc} ${styles.discDesktop}`} src="/images/play-ellipse.svg" alt="" width={76} height={76} />
      <img className={styles.icon} src="/images/play-icon.svg" alt="" width={24} height={24} />
    </>
  );
}
/* eslint-enable @next/next/no-img-element */
