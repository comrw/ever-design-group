import PageExperience from "@/components/PageExperience";
import { SiteFooter } from "@/components/Editorial";
import "./pages.css";
export default function EditorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a className="skip-link" href="#page-content">
        Skip to content
      </a>
      <main className="editorialMain">
        <PageExperience>{children}</PageExperience>
      </main>
      <SiteFooter />
    </>
  );
}
