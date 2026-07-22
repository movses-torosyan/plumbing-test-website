import Image from "next/image";
import styles from "./HeroSection.module.css";

export function ParallaxBackground() {
  return (
    <div className={styles.backgroundLayer}>
      <Image
        src="/images/Plumbing-background-web.webp"
        alt="Professional plumber repairing a home water system"
        fill
        priority
        sizes="100vw"
        className={styles.backgroundImage}
      />
    </div>
  );
}