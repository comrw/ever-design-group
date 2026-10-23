import Image from "next/image";
import Link from "next/link";
import { PageHero, Section, ProjectCTA } from "@/components/Editorial";
import { areas, sourceImage } from "@/content/ever";
export const metadata = {
  title: "Places — Ever Design Group",
  description:
    "Explore the landscapes of Rubavu, Musanze, Nyungwe, Kigali, Lake Muhazi and Akagera.",
};
export default function Areas() {
  return (
    <>
      <PageHero
        title={"Every place\nhas a story."}
        intro="Water. Forest. Mountains. City. The character of the land comes before the architecture."
        image="rwanda/lake-kivu.webp"
      />
      <div id="page-content">
        <Section
          title="Six different beginnings."
        >
          <div className="projectGrid">
            {areas.map((a) => (
              <Link
                href={`/areas/${a.slug}`}
                className="projectCard"
                key={a.slug}
                data-reveal
              >
                <div className="cardImage">
                  <Image
                    src={sourceImage(a.image)}
                    alt={`${a.name}, Rwanda`}
                    fill
                    sizes="(max-width:480px) 90vw, 45vw"
                  />
                </div>
                <h3>
                  {a.name}
                  <span className="cardArrow" aria-hidden>
                    ↗
                  </span>
                </h3>
                <p className="cardDescription">{a.line}</p>
              </Link>
            ))}
          </div>
        </Section>
        <ProjectCTA title="What does your land make possible?" />
      </div>
    </>
  );
}
