import { notFound } from "next/navigation";
import {
  PageHero,
  Section,
  Picture,
  ProjectCTA,
  TextLink,
} from "@/components/Editorial";
import ProjectCards from "@/components/ProjectCards";
import { projects } from "@/content/ever";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return {
    title: `${p?.title ?? "Development"} — Ever Design Group`,
    description: p?.intro,
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <>
      <PageHero
        title={p.title}
        intro={p.intro}
        image={p.image}
      />
      <div id="page-content">
        <Section title={p.intro}>
          <div className="splitCopy">
            <p className="largeCopy" data-reveal>
              {p.availability}
            </p>
            <div className="bodyCopy" data-reveal>
              <p>{p.text}</p>
              <TextLink
                href={`/contact?project=${encodeURIComponent(p.title)}`}
              >
                {p.status === "Completed showcase"
                  ? "Arrange a viewing"
                  : "Enquire about this project"}
              </TextLink>
            </div>
          </div>
          <dl className="facts">
            {p.details.map(([n, v]) => (
              <div key={n} data-reveal>
                <dt>{n}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Section>
        <Picture
          image={p.gallery[0]}
          alt={`${p.title}: ${p.gallery[0].startsWith("rwanda/") ? "the surrounding landscape" : "project view"}`}
          wide
        />
        {p.gallery.length > 1 && (
          <Section title="A closer look.">
            <div className="galleryGrid">
              {p.gallery.slice(1).map((im) => (
                <Picture
                  key={im}
                  image={im}
                  alt={`${p.title}, additional view`}
                />
              ))}
            </div>
          </Section>
        )}
        <Section title="Understand the place.">
          <TextLink href={`/areas/${p.area}`}>
            Explore {p.place.split(" / ")[0]}
          </TextLink>
        </Section>
        <Section title="Other places. Other stories.">
          <ProjectCards
            items={projects.filter((x) => x.slug !== p.slug).slice(0, 2)}
          />
        </Section>
        <ProjectCTA
          title={
            p.status === "Completed showcase"
              ? "See the work firsthand."
              : "Let’s explore the possibilities."
          }
        />
      </div>
    </>
  );
}
