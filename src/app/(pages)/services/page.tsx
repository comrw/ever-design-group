import Link from "next/link";
import { PageHero, Section, ProjectCTA, Picture } from "@/components/Editorial";
import { services } from "@/content/ever";
export const metadata = {
  title: "Services — Ever Design Group",
  description:
    "Land sourcing, architecture, construction, partnerships and villa management in Rwanda.",
};
export default function Services() {
  return (
    <>
      <PageHero
        title={"From first idea\nto first guest."}
        intro="A connected team for the life of a destination. Find the land. Shape the architecture. Engineer the detail. Build the place."
        image="projects/construction/engineers-at-towers.webp"
      />
      <div id="page-content">
        <Section title="The work behind the place.">
          <div className="serviceRows">
            {services.map((s) => (
              <Link
                href={`/services/${s.slug}`}
                className="serviceRow"
                key={s.slug}
                data-reveal
              >
                <h3>{s.title}</h3>
                <p>{s.intro}</p>
                <span className="rowArrow" aria-hidden>
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </Section>
        <Picture
          image="projects/team/design-team-at-work.webp"
          alt="Ever Design architects working together"
          wide
        />
        <Section
          title="Designed with delivery in mind."
        >
          <div className="splitCopy">
            <p className="largeCopy" data-reveal>
              Every line on the drawing has a future on site.
            </p>
            <p className="bodyCopy" data-reveal>
              Our architects and construction team work together from the
              beginning. Design, structure, materials and systems are considered
              as parts of the same project, so the vision can develop into a
              place people can experience.
            </p>
          </div>
        </Section>
        <ProjectCTA />
      </div>
    </>
  );
}
