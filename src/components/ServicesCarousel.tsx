"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { TextReveal } from "@/components/ui/cascade-text";
import styles from "./ServicesSection.module.css";

const services = [
  { name: "Plumbing Services", image: "/images/Plumbing service.png" },
  { name: "Leak Detection", image: "/images/Leak Detection.png" },
  { name: "Water Heater Services", image: "/images/Water Heater Services.png" },
  { name: "Pipe Services", image: "/images/Pipe Services.png" },
  { name: "Drain Services", image: "/images/Drain Services.png" },
];

export function ServicesCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isPaused, setIsPaused] = useState(false);

  const changeSlide = useCallback((step: -1 | 1) => {
    setDirection(step === -1 ? "right" : "left");
    setActiveIndex((current) => (current + step + services.length) % services.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => changeSlide(-1), 5000);
    return () => window.clearInterval(timer);
  }, [changeSlide, isPaused]);
  useEffect(() => {
    let frameId = 0;

    const updateReveal = () => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      const rect = carousel.getBoundingClientRect();
      const progress = Math.min(
        Math.max((window.innerHeight - rect.top) / window.innerHeight, 0),
        1,
      );
      const parallaxTravel = (1 - progress) * 18;

      carousel.style.setProperty("--reveal-scale", `${1 + (1 - progress) * 0.4}`);
      carousel.style.setProperty("--reveal-shift", `${parallaxTravel}vh`);
      frameId = 0;
    };

    const handleScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateReveal);
    };

    updateReveal();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const service = services[activeIndex];

  return (
    <div
      ref={carouselRef}
      className={styles.carousel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div key={`${activeIndex}-${direction}`} className={`${styles.imageLayer} ${direction === "right" ? styles.enterRight : styles.enterLeft}`}>
        <div className={styles.parallaxLayer}>
          <Image src={service.image} alt={service.name} fill priority={activeIndex === 0} sizes="100vw" className={styles.serviceImage} />
        </div>
      </div>
      <div className={styles.imageOverlay} />

      <button className={`${styles.arrow} ${styles.arrowLeft}`} type="button" onClick={() => changeSlide(-1)} aria-label="Previous service">←</button>
      <button className={`${styles.arrow} ${styles.arrowRight}`} type="button" onClick={() => changeSlide(1)} aria-label="Next service">→</button>

      <TextReveal
        as="button"
        text="[SERVICES]"
        staticCharacters="[]"
        fontSize="1rem"
        staggerDelay={32}
        duration={340}
        color="#ffffff"
        hoverColor="#48bfff"
        className={styles.servicesButton}
      />

      <div className={styles.copy}>
        <h2 className={styles.title}>Our Services</h2>
      </div>
    </div>
  );
}