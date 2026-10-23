import {
  PageHero,
  Section,
  ProjectCTA,
  TextLink,
} from "@/components/Editorial";
import SourceFilm from "@/components/SourceFilm";
export const metadata = {
  title: "Films & visits — Ever Design Group",
  description:
    "Watch the Cottage hillside film and arrange an in-person or virtual visit with the Ever Design team.",
};
export default function Films() {
  return (
    <>
      <PageHero
        title={"See a place\ncome alive."}
        intro="An impression on screen. A conversation on site. Get closer to the work and the landscapes behind it."
        image="projects/retreat-renders/cottage-hillside.webp"
      />
      <div id="page-content">
        <Section title="A moment on the hillside.">
          <div className="filmCard">
            <SourceFilm />
            <div data-reveal>
              <h3>
                Cottage.
                <br />
                Another perspective.
              </h3>
              <p>
                A short architectural animation of Cottage and its hillside
                setting. Explore the concept, then speak with the team about a
                visit.
              </p>
              <TextLink href="/developments/cottage">Explore Cottage</TextLink>
            </div>
          </div>
        </Section>
        <Section title="Experience the work firsthand.">
          <div className="splitCopy">
            <div className="bodyCopy" data-reveal>
              <p className="largeCopy">Visit in person.</p>
              <p>
                Meet the team in Kigali and arrange a viewing of the completed
                showcase villas. Discuss the site, the details and what you want
                to create.
              </p>
              <TextLink href="/contact?project=Showcase%20villa%20visit">
                Arrange a private viewing
              </TextLink>
            </div>
            <div className="bodyCopy" data-reveal>
              <p className="largeCopy">Explore from anywhere.</p>
              <p>
                If you are outside Rwanda, the team can arrange a private
                virtual viewing by video call. Share your interests so the visit
                can focus on what matters to you.
              </p>
              <TextLink href="/contact?project=Virtual%20villa%20viewing">
                Ask for a virtual visit
              </TextLink>
            </div>
          </div>
        </Section>
        <ProjectCTA title="Come closer to the story." />
      </div>
    </>
  );
}
