import { SiteFooter } from "@/components/Editorial";
import Hero from "@/components/Hero";
import Approach from "@/components/Approach";
import Destinations from "@/components/Destinations";
import Featured from "@/components/Featured";
import Film from "@/components/Film";
import Studio from "@/components/Studio";
import Enquiry from "@/components/Enquiry";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#approach">
        Skip to content
      </a>
      <main className={styles.main}>
        <Hero />
        <Approach />
        <Destinations />
        <Featured />
        {/* Desktop shows the film before the studio; the mobile frame swaps them. */}
        <div className={styles.film}>
          <Film />
        </div>
        <div className={styles.studio}>
          <Studio />
        </div>
        <Enquiry />
      </main>
      <SiteFooter />
    </>
  );
}
