"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { sourceImage } from "@/content/ever";
export default function SourceFilm() {
  const [started, setStarted] = useState(false);
  const [error, setError] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!started || !video.current || !frame.current) return;
    const v = video.current;
    v.focus();
    v.play().catch(() => {});
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio < 0.25) v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(frame.current);
    return () => {
      io.disconnect();
      v.pause();
    };
  }, [started]);
  return (
    <div>
      <div className="videoFrame" ref={frame}>
        {started ? (
          <video
            ref={video}
            tabIndex={0}
            controls
            playsInline
            preload="metadata"
            poster={sourceImage(
              "projects/retreat-renders/cottage-hillside.webp",
            )}
            onError={() => setError(true)}
          >
            <source
              src="/videos/cottage-hillside.mp4"
              type="video/mp4"
              onError={() => setError(true)}
            />
          </video>
        ) : (
          <>
            <Image
              src={sourceImage(
                "projects/retreat-renders/cottage-hillside.webp",
              )}
              alt="Cottage hillside architectural visualisation"
              fill
              sizes="(max-width:800px) 90vw, 55vw"
            />
            <button
              type="button"
              aria-label="Play Cottage hillside film"
              onClick={() => setStarted(true)}
            >
              <span aria-hidden>▶</span>
            </button>
          </>
        )}
        {error && (
          <p role="alert" className="videoFailure">
            The film could not load. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
}
