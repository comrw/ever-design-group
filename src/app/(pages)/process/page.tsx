import {
  PageHero,
  Section,
  Picture,
  ProjectCTA,
  TextLink,
} from "@/components/Editorial";
export const metadata = {
  title: "How we work — Ever Design Group",
  description:
    "Plan, design, engineer and build: the connected process behind a hospitality development.",
};
const steps = [
  [
    "Plan",
    "Listen to the idea. Read the land.",
    "We begin with the brief, the landscape and the experience the project should create. Site context, access and constraints help shape a direction before a design develops.",
    "/services/land",
  ],
  [
    "Design",
    "Give the story a spatial form.",
    "Architects develop the concept, layouts, materials and the relationship between indoors and outdoors. Drawings and visualisations make the proposal clear enough to discuss and refine.",
    "/services/architecture",
  ],
  [
    "Engineer",
    "Make the idea work in detail.",
    "Structure, building systems and technical coordination bring practical clarity to the design. The teams work together to connect the architectural intent to what happens on site.",
    "/services/construction",
  ],
  [
    "Build",
    "Turn the drawing into a destination.",
    "Site preparation, structure, services and finishes are coordinated through delivery. Progress, quality reviews and handover connect the client to the work as it takes shape.",
    "/services/construction",
  ],
  [
    "Welcome",
    "Begin the life of the place.",
    "Ever Retreat can coordinate villa presentation, guest communication, cleaning and ongoing management after handover. A completed building becomes an experience people remember.",
    "/services/villa-management",
  ],
];
export default function Process() {
  return (
    <>
      <PageHero
        eyebrow="HOW WE WORK"
        title={"A clear line\nfrom idea\nto place."}
        intro="Plan. Design. Engineer. Build. Connected disciplines, carrying the intention of a project through every stage."
        image="projects/construction/site-excavation.webp"
        caption="EVER DESIGN / SITE PREPARATION"
      />
      <div id="page-content">
        <Section label="THE PROCESS" title="Intent meets action.">
          <ol className="steps">
            {steps.map(([n, h, t, href], i) => (
              <li className="step" key={n} data-reveal>
                <span className="stepNum">0{i + 1}</span>
                <h3>{n}</h3>
                <div>
                  <p>{h}</p>
                  <p style={{ marginTop: 16 }}>{t}</p>
                  <TextLink href={href}>Explore this stage</TextLink>
                </div>
              </li>
            ))}
          </ol>
        </Section>
        <Picture
          image="projects/construction/scaffold-inspection.webp"
          alt="Engineers reviewing work at a construction site"
          caption="THE DETAIL MATTERS / EVER DESIGN"
          wide
        />
        <Section label="NEAR OR FAR" title="Stay connected to the work.">
          <div className="splitCopy">
            <p className="largeCopy" data-reveal>
              A project in Rwanda. A conversation wherever you are.
            </p>
            <div className="bodyCopy" data-reveal>
              <p>
                Regular photo progress updates and a direct point of contact
                help clients follow their build from overseas. The reporting and
                delivery arrangements for your project are agreed with the team.
              </p>
              <TextLink href="/contact">Talk through your project</TextLink>
            </div>
          </div>
        </Section>
        <ProjectCTA />
      </div>
    </>
  );
}
