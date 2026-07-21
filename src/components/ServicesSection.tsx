import { ServicesCarousel } from "./ServicesCarousel";
import styles from "./ServicesSection.module.css";

export function ServicesSection() {
  return (
    <section id="services" className={styles.section}>
      <ServicesCarousel />
    </section>
  );
}