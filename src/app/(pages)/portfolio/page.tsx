import { PageHero, Section, ProjectCTA } from "@/components/Editorial";
import PortfolioGallery from "@/components/PortfolioGallery";
export const metadata = {
  title: "Portfolio — Ever Design Group",
  description:
    "Built work, design studies and the work in progress behind Ever Design’s places in Rwanda.",
};
export default function Portfolio() {
  return (
    <>
      <PageHero
        title={"The idea.\nThe making.\nThe place."}
        intro="Architecture seen from different sides: completed work, design studies and the hands that bring it together."
        image="projects/bp-ever-retreat/glass-pavilion-night.webp"
      />
      <div id="page-content">
        <Section title="Work, in perspective.">
          <PortfolioGallery />
        </Section>
        <ProjectCTA />
      </div>
    </>
  );
}
