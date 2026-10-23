import { notFound } from "next/navigation";
import {
  PageHero,
  Section,
  ProjectCTA,
  TextLink,
} from "@/components/Editorial";
import { services } from "@/content/ever";
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  return {
    title: `${s?.title ?? "Service"} — Ever Design Group`,
    description: s?.intro,
  };
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  if (!s) notFound();
  return (
    <>
      <PageHero
        title={s.title}
        intro={s.intro}
        image={s.image}
      />
      <div id="page-content">
        <Section title={s.verb}>
          <div className="splitCopy">
            <p className="largeCopy" data-reveal>
              {s.intro}
            </p>
            <div className="bodyCopy" data-reveal>
              <p>{s.text}</p>
              <TextLink href="/contact">Discuss your project</TextLink>
            </div>
          </div>
        </Section>
        <Section
          title="How it comes together."
        >
          <ol className="steps">
            {s.steps.map(([n, t]) => (
              <li className="step" key={n} data-reveal>
                <h3>{n}</h3>
                <p>{t}</p>
              </li>
            ))}
          </ol>
        </Section>
        <Section title="Keep exploring.">
          <div className="serviceRows">
            {services
              .filter((x) => x.slug !== slug)
              .map((x) => (
                <div key={x.slug}>
                  <TextLink href={`/services/${x.slug}`}>{x.title}</TextLink>
                </div>
              ))}
          </div>
        </Section>
        <ProjectCTA title="Let’s make a beginning." />
      </div>
    </>
  );
}
