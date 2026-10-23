"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { portfolio, sourceImage } from "@/content/ever";
export default function PortfolioGallery() {
  const [filter, setFilter] = useState("All");
  const items = portfolio.filter((p) => filter === "All" || p[2] === filter);
  return (
    <>
      <div className="filterBar" aria-label="Filter portfolio">
        {["All", "Built work", "Design studies", "In progress"].map((f) => (
          <button
            type="button"
            key={f}
            aria-pressed={f === filter}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {items.length} {items.length === 1 ? "perspective" : "perspectives"}
      </p>
      <div className="projectGrid">
        {items.map(([n, im, , href]) => (
          <Link key={n} href={href} className="projectCard">
            <div className="cardImage">
              <Image
                src={sourceImage(im)}
                alt={n}
                fill
                sizes="(max-width:480px) 90vw, 45vw"
              />
            </div>
            <h3>
              {n}
              <span className="cardArrow" aria-hidden>
                ↗
              </span>
            </h3>
          </Link>
        ))}
      </div>
    </>
  );
}
