import Image from "next/image";
import styles from "./WhyChooseUs.module.css";

const reasons = [
  { number: "01", title: "Licensed expertise", text: "Skilled professionals who diagnose carefully and complete every repair to exacting standards." },
  { number: "02", title: "Clear, upfront service", text: "Straight answers, transparent recommendations, and no surprise work added along the way." },
  { number: "03", title: "Respect for your home", text: "Clean workmanship, thoughtful protection, and a space left as carefully as we found it." },
];

export function WhyChooseUs() {
  return (
    <section id="about" className={styles.section} aria-labelledby="why-choose-title">
      <Image
        src="/images/why-choose-plumbing-team.png"
        alt="Professional plumbing team servicing a modern home system"
        fill
        sizes="100vw"
        className={styles.image}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={styles.eyebrow}>Why choose us</p>
        <h2 id="why-choose-title" className={styles.title}>Craftsmanship you can trust.</h2>
        <p className={styles.intro}>We combine experienced people, honest guidance, and meticulous work to make every service call feel effortless.</p>
        <div className={styles.reasons}>
          {reasons.map((reason) => (
            <article key={reason.number} className={styles.reason}>
              <span className={styles.number}>{reason.number}</span>
              <div>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}