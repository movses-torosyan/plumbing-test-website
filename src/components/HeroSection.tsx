"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ParallaxBackground } from "./ParallaxBackground";
import { CallButton } from "./CallButton";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);


  useEffect(() => {
    let frameId = 0;

    const updateParallax = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const distance = Math.min(Math.max(-hero.getBoundingClientRect().top, 0), hero.offsetHeight);
      hero.style.setProperty("--background-parallax", `${distance * 0.35}px`);
      frameId = 0;
    };

    const handleScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    window.addEventListener("app-viewport-resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("app-viewport-resize", handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section ref={heroRef} id="home" className={styles.hero}>
      <ParallaxBackground />
      <div className={styles.horizontalOverlay} />
      <div className={styles.verticalOverlay} />
      <div className={`${styles.pipe} ${styles.adjustableWrench}`} aria-hidden="true">
        <Image
          src="/images/adjustable-wrench.webp"
          alt=""
          width={1254}
          height={1254}
          className={`${styles.toolImage} ${styles.floatPipeReverse}`}
        />
      </div>
      <div className={`${styles.pipe} ${styles.pipeWrench}`} aria-hidden="true">
        <Image
          src="/images/pipe-wrench.webp"
          alt=""
          width={1254}
          height={1254}
          className={`${styles.toolImage} ${styles.floatPipe}`}
        />
      </div>


      <div className={styles.content}>
        <div className={styles.contentInner}>
          <p className={styles.trustLabel}>
            <span aria-hidden="true" />
            24/7 licensed plumbing
          </p>
          <h1 className={styles.title}>
            Reliable plumbing,
            <span className={styles.titleAccent}>right when you need it.</span>
          </h1>
          <p className={styles.description}>
            From small leaks to major repairs, our licensed local plumbers deliver fast, clean, and dependable service—without surprise fees.
          </p>
          <div className={styles.actions}>
            <CallButton />
          </div>
        </div>
      </div>
    </section>
  );
}