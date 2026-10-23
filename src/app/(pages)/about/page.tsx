import Image from "next/image";
import {
  PageHero,
  Section,
  Picture,
  TextLink,
  ProjectCTA,
} from "@/components/Editorial";
import { team, sourceImage } from "@/content/ever";
export const metadata = {
  title: "The studio — Ever Design Group",
  description:
    "Meet the Kigali-based team connecting planning, architecture, engineering and construction to the story of a place.",
};
export default function About() {
  return (
    <>
      <PageHero
        title={"Ideas into\ninfrastructure."}
        intro="Planners. Architects. Engineers. Builders. One team, connected by a belief that a place should belong to its landscape."
        image="projects/team/site-planning.webp"
      />
      <div id="page-content">
        <Section
          title={"A place is more\nthan a location."}
        >
          <div className="splitCopy">
            <p className="largeCopy" data-reveal>
              People travel to experience somewhere. The land, its culture and
              its story are where our work begins.
            </p>
            <div className="bodyCopy" data-reveal>
              <p>
                Ever Design is a Rwandan-owned development company based in
                Kigali. We bring architecture, engineering, construction and
                project delivery together to create hospitality and tourism
                environments.
              </p>
              <p>
                Our work spans hotels, resorts, retreats, eco-parks and villas.
                Each project is an opportunity to understand the terrain, work
                with its character and create an experience that tells an
                African story.
              </p>
              <p>
                Our in-house team connects the first sketch to the work on site.
                After handover, Ever Retreat can take care of the guest
                experience and villa management.
              </p>
              <TextLink href="/process">How we work</TextLink>
            </div>
          </div>
        </Section>
        <Picture
          image="projects/construction/engineers-at-towers.webp"
          alt="Ever Design team at a construction site"
          wide
        />
        <Section
          title="Different minds. One direction."
        >
          <div className="splitCopy">
            <p className="largeCopy" data-reveal>
              Architecture has to become something real.
            </p>
            <div className="bodyCopy" data-reveal>
              <p>
                Design decisions meet the practical knowledge of engineers,
                project managers and builders. We consider structure, systems,
                materials and the experience of the finished place together.
              </p>
              <TextLink href="/services">Explore our services</TextLink>
            </div>
          </div>
        </Section>
        {team.length > 0 && (
          <Section title="Behind every place.">
            <div className="teamGrid">
              {team.map(([name, role, image]) => (
                <article className="teamCard" key={name} data-reveal>
                  <div className="portrait">
                    <Image
                      src={sourceImage(`team/${image}`)}
                      alt={`${name}, ${role}`}
                      fill
                      sizes="(max-width:800px) 45vw, 30vw"
                    />
                  </div>
                  <h3>{name}</h3>
                  <p>{role}</p>
                </article>
              ))}
            </div>
          </Section>
        )}
        <Section title="An architectural story.">
          <div className="splitCopy">
            <Picture
              image="projects/museum/museum-exterior.webp"
              alt="Ever Design Museum in Kimihurura"
            />
            <div className="bodyCopy" data-reveal>
              <p>
                The Ever Design Museum in Kimihurura tells the story of Rwandan
                architecture, from traditional Nyakatsi grass huts to modern
                design.
              </p>
              <p>
                It reflects the question behind our work: how can new
                architecture carry a place’s story forward?
              </p>
              <TextLink href="/contact">Ask about a visit</TextLink>
            </div>
          </div>
        </Section>
        <ProjectCTA />
      </div>
    </>
  );
}
