import { PageHero, Section, TextLink } from "@/components/Editorial";
import { contact } from "@/content/ever";
import Enquiry from "@/components/Enquiry";
export const metadata = {
  title: "Start a conversation — Ever Design Group",
  description:
    "Discuss land, architecture, construction and hospitality development with Ever Design Group in Kigali, Rwanda.",
};
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ project?: string | string[] }>;
}) {
  const query = await searchParams;
  const initialProject = typeof query.project === "string" ? query.project : "";
  return (
    <>
      <PageHero
        title={"What are you\nimagining?"}
        intro="Tell us about your land, your location or your idea. Let’s explore what it can become."
        image="projects/team/office-planning.webp"
      />
      <div id="page-content">
        <Section title="Let’s talk.">
          <div className="contactDetails">
            {contact.whatsapp && (
              <div data-reveal>
                <h3>WhatsApp</h3>
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contact.phone} ↗
                </a>
              </div>
            )}
            {contact.email && (
              <div data-reveal>
                <h3>Email</h3>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
            )}
            <div data-reveal>
              <h3>The studio</h3>
              <p>{contact.address}</p>
            </div>
            <div data-reveal>
              <h3>Office hours</h3>
              <p>{contact.hours}</p>
              <TextLink href="/films">Explore villa visits</TextLink>
            </div>
          </div>
          {!contact.email && !contact.whatsapp && (
            <p className="pageNotice">
              Direct contact information will be available here soon.
            </p>
          )}
        </Section>
        <Enquiry key={initialProject} initialProject={initialProject} />
      </div>
    </>
  );
}
