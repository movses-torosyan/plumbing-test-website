"use client";

import { useEffect, useRef } from "react";
import { HeroSection } from "./HeroSection";
import { ServicesSection } from "./ServicesSection";
import styles from "./HeroServicesTransition.module.css";

export function HeroServicesTransition() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId = 0;

    const updateReveal = () => {
      const stage = stageRef.current;
      if (!stage) return;

      const rect = stage.getBoundingClientRect();
      const scrollDistance = Math.max(stage.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / scrollDistance, 0), 1);

      stage.style.setProperty("--services-reveal", `${(1 - progress) * 100}%`);
      stage.style.setProperty("--hero-scroll", `${progress * -22}vh`);
      stage.style.setProperty("--services-lift", `${(1 - progress) * 12}vh`);
      frameId = 0;
    };

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateReveal);
    };

    updateReveal();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div ref={stageRef} className={styles.stage}>
      <div className={styles.frame}>
        <div className={styles.heroLayer}><HeroSection /></div>
        <div className={styles.servicesLayer}>
          <div className={styles.servicesMotion}><ServicesSection /></div>
        </div>
      </div>
    </div>
  );
}