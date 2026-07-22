"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { TextReveal } from "@/components/ui/cascade-text";
import styles from "./ServicesSection.module.css";

const services = [
  { name: "Emergency Services", description: "Rapid 24/7 help for burst pipes, major leaks, flooding, and urgent plumbing failures.", image: "/images/Emergency Services.webp" },
  { name: "Plumbing Services", description: "Reliable repairs, installations, and maintenance for every part of your plumbing system.", image: "/images/Plumbing Services.webp" },
  { name: "Leak Detection", description: "Precise diagnostics that locate hidden leaks quickly and help prevent costly water damage.", image: "/images/Leak Detection.webp" },
  { name: "Water Heater Services", description: "Professional water-heater repair, replacement, and maintenance for dependable hot water.", image: "/images/Water Heater Services.webp" },
  { name: "Pipe Services", description: "Durable pipe repair and replacement solutions designed for lasting performance.", image: "/images/Pipe Services.webp" },
  { name: "Drain Services", description: "Fast, thorough drain cleaning that restores flow and helps stop recurring blockages.", image: "/images/Drain Services.webp" },
];

export function ServicesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isServicesHovered, setIsServicesHovered] = useState(false);

  const changeSlide = useCallback((step: -1 | 1) => {
    setDirection(step === -1 ? "right" : "left");
    setActiveIndex((current) => (current + step + services.length) % services.length);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => changeSlide(-1), 7000);
    return () => window.clearInterval(timer);
  }, [changeSlide]);

  const service = services[activeIndex];

  return (
    <div
      className={styles.carousel}
    >
      <div key={`${activeIndex}-${direction}`} className={`${styles.imageLayer} ${direction === "right" ? styles.enterRight : styles.enterLeft}`}>
        <div className={styles.parallaxLayer}>
          <Image src={service.image} alt={service.name} fill priority={activeIndex === 0} sizes="100vw" className={styles.serviceImage} />
        </div>
      </div>
      <div className={styles.imageOverlay} />

      <aside className={styles.serviceInfo} aria-live="polite">
        <p className={styles.serviceInfoLabel}>Featured service</p>
        <h3 className={styles.serviceInfoTitle}>{service.name}</h3>
        <p className={styles.serviceInfoDescription}>{service.description}</p>
      </aside>

      <button className={`${styles.arrow} ${styles.arrowLeft}`} type="button" onClick={() => changeSlide(-1)} aria-label="Previous service">←</button>
      <button className={`${styles.arrow} ${styles.arrowRight}`} type="button" onClick={() => changeSlide(1)} aria-label="Next service">→</button>

      <Link
        href="/services"
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          window.dispatchEvent(new CustomEvent("site-preloader:navigate", { detail: "/services" }));
        }}
        className={styles.servicesButton}
        aria-label="View services"
        onMouseEnter={() => setIsServicesHovered(true)}
        onMouseLeave={() => setIsServicesHovered(false)}
        onFocus={() => setIsServicesHovered(true)}
        onBlur={() => setIsServicesHovered(false)}
      >
        <span className={styles.bracket} aria-hidden="true">[</span>
        <TextReveal
          as="span"
          text="Services"
          fontSize="inherit"
          staggerDelay={32}
          duration={340}
          color="#ffffff"
          hoverColor="#ffffff"
          active={isServicesHovered}
          className={styles.servicesText}
          style={{ padding: 0 }}
        />
        <span className={styles.buttonArrow} aria-hidden="true">→</span>
        <span className={styles.bracket} aria-hidden="true">]</span>
      </Link>

      <div className={styles.copy}>
        <h2 className={styles.title}>Our Services</h2>
      </div>
    </div>
  );
}