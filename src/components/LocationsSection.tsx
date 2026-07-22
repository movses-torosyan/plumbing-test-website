import Image from "next/image";
import { MapButton } from "./MapButton";
import styles from "./LocationsSection.module.css";

const areas = ["Downtown", "Northside", "West End", "Riverside", "Surrounding areas"];

export function LocationsSection() {
  return (
    <section id="locations" className={styles.section} aria-labelledby="locations-title">
      <Image src="/images/locations-map-pin.webp" alt="Location marker placed on a detailed city map" fill sizes="100vw" className={styles.image} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={styles.eyebrow}>Locations</p>
        <h2 id="locations-title" className={styles.title}>Our Locations</h2>
        <p className={styles.intro}>Fast, dependable plumbing support across the city and nearby communities—wherever your home needs us.</p>
        <div className={styles.areas} aria-label="Service areas">
          {areas.map((area, index) => (
            <span key={area} className={styles.area}><b>{String(index + 1).padStart(2, "0")}</b>{area}</span>
          ))}
        </div>
        <MapButton />
      </div>
    </section>
  );
}