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
        eyebrow="OUR SERVICES"
        title={s.title}
        intro={s.intro}
        image={s.image}
        caption={s.label}
      />
      <div id="page-content">
        <Section label="THE APPROACH" title={s.verb}>
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
          label="FROM INTENTION TO DELIVERY"
          title="How it comes together."
        >
          <ol className="steps">
            {s.steps.map(([n, t], i) => (
              <li className="step" key={n} data-reveal>
                <span className="stepNum">0{i + 1}</span>
                <h3>{n}</h3>
                <p>{t}</p>
              </li>
            ))}
          </ol>
        </Section>
        <Section label="CONNECTED CAPABILITIES" title="Keep exploring.">
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
