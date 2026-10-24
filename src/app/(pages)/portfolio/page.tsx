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
        eyebrow="SELECTED PERSPECTIVES"
        title={"The idea.\nThe making.\nThe place."}
        intro="Architecture seen from different sides: completed work, design studies and the hands that bring it together."
        image="projects/bp-ever-retreat/glass-pavilion-night.webp"
        caption="B&P EVER RETREAT VILLA / GLASS PAVILION"
      />
      <div id="page-content">
        <Section label="THE PORTFOLIO" title="Work, in perspective.">
          <PortfolioGallery />
        </Section>
        <ProjectCTA />
      </div>
    </>
  );
}
