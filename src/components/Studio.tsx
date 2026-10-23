import styles from "./Studio.module.css";

const STAGES = [
  { name: "Plan", text: ["Read the site. Shape the brief.", "Set the direction."] },
  { name: "Design", text: ["Develop the architecture,", "spaces and experience."] },
  { name: "Engineer", text: ["Resolve structure, systems", "and the technical detail."] },
  { name: "Build", text: ["Coordinate the work on site.", "Bring the destination to life."] },
];

/** 05 / Studio — ideas into infrastructure, with the four development stages. */
export default function Studio() {
  return (
    <section id="studio" className={styles.section} aria-labelledby="studio-title">
      <div className={styles.intro}>
        <h2 id="studio-title" className={styles.title}>
          Ideas into
          <br />
          infrastructure.
        </h2>
        <p className={styles.lede}>
          Planners, architects, engineers and builders turn an idea into a place people can experience. Our
          work connects the site, the design, the technical detail and the delivery.
        </p>
      </div>
      <p className={styles.disciplines}>Planners. Architects. Engineers. Builders.</p>

      <ol className={styles.stages} aria-label="Development stages">
        {STAGES.map((stage) => (
          <li key={stage.name} className={styles.stage}>
            <h3 className={styles.stageName}>{stage.name}</h3>
            <p className={styles.stageText}>
              {stage.text[0]}
              <br />
              {stage.text[1]}
            </p>
          </li>
        ))}
      </ol>

      <a className={styles.link} href="#film">
        Inside the work →
      </a>
    </section>
  );
}
