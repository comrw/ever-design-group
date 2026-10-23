import { notFound } from "next/navigation";
import {
  PageHero,
  Section,
  ProjectCTA,
  TextLink,
} from "@/components/Editorial";
import ProjectCards from "@/components/ProjectCards";
import { areas, projects } from "@/content/ever";
export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = areas.find((a) => a.slug === slug);
  return {
    title: `${a?.name ?? "Place"} — Ever Design Group`,
    description: a?.line,
  };
}
export default async function Area({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = areas.find((a) => a.slug === slug);
  if (!a) notFound();
  const related = projects.filter((p) => p.area === slug);
  return (
    <>
      <PageHero
        title={a.name}
        intro={a.line}
        image={a.image}
      />
      <div id="page-content">
        <Section title={a.line}>
          <div className="splitCopy">
            <p className="largeCopy" data-reveal>
              {a.focus}
            </p>
            <div className="bodyCopy" data-reveal>
              <p>{a.text}</p>
              <p>
                Have a site in mind? We can explore its context, access, terrain
                and potential together before defining the development brief.
              </p>
              <TextLink href="/services/land">
                Land sourcing & site assessment
              </TextLink>
            </div>
          </div>
        </Section>
        {related.length > 0 && (
          <Section
            title={`Our work in ${a.name}.`}
          >
            <ProjectCards items={related} />
          </Section>
        )}
        <Section title="Another landscape.">
          {areas
            .filter((x) => x.slug !== slug)
            .map((x) => (
              <div key={x.slug}>
                <TextLink href={`/areas/${x.slug}`}>{x.name}</TextLink>
              </div>
            ))}
        </Section>
        <ProjectCTA title={`A new story in ${a.name}?`} />
      </div>
    </>
  );
}
