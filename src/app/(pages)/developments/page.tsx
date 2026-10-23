import { PageHero, Section, ProjectCTA } from "@/components/Editorial";
import ProjectCards from "@/components/ProjectCards";
import { projects } from "@/content/ever";
export const metadata = {
  title: "Developments — Ever Design Group",
  description:
    "Explore completed showcase villas and proposed developments across Rwanda.",
};
export default function Developments() {
  return (
    <>
      <PageHero
        eyebrow="OUR DEVELOPMENTS"
        title={"Places taking\nshape."}
        intro="From completed lakeside villas to ideas for a new destination. Every project starts with its own piece of Rwanda."
        image="projects/bp-ever-retreat/villa-night.webp"
        caption="B&P EVER RETREAT VILLA / RUBAVU"
      />
      <div id="page-content">
        <Section label="EXPERIENCE THE WORK" title="Completed showcases.">
          <ProjectCards
            items={projects.filter((p) => p.status === "Completed showcase")}
          />
          <p className="noticeCopy">
            Our completed showcase villas are not for sale. Contact the team to
            arrange a visit.
          </p>
        </Section>
        <Section label="LOOKING AHEAD" title="In design. In possibility.">
          <ProjectCards
            items={projects.filter((p) => p.status !== "Completed showcase")}
          />
          <p className="noticeCopy">
            Proposed development images are concepts or visualisations. Speak
            with the team for current plans, availability and project details.
          </p>
        </Section>
        <ProjectCTA title="Where could your story begin?" />
      </div>
    </>
  );
}
