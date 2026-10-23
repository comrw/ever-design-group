import Link from "next/link";
import Image from "next/image";
import { projects, sourceImage } from "@/content/ever";
export default function ProjectCards({
  items = projects,
}: {
  items?: typeof projects;
}) {
  return (
    <div className="projectGrid">
      {items.map((p) => (
        <Link
          href={`/developments/${p.slug}`}
          className="projectCard"
          key={p.slug}
          data-reveal
        >
          <div className="cardImage">
            <Image
              src={sourceImage(p.image)}
              alt={`${p.title} — ${p.label.toLowerCase()}`}
              fill
              sizes="(max-width:480px) 90vw, 45vw"
            />
          </div>
          <h3>
            {p.title}
            <span className="cardArrow" aria-hidden>
              ↗
            </span>
          </h3>
          <p className="cardDescription">{p.intro}</p>
        </Link>
      ))}
    </div>
  );
}
