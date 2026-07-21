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

    const updateHeroPosition = () => {
      const lift = Math.min(window.scrollY * 0.6, window.innerHeight * 0.6);
      heroRef.current?.style.setProperty("--hero-lift", `${-lift}px`);
      frameId = 0;
    };

    const handleScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateHeroPosition);
    };

    updateHeroPosition();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section ref={heroRef} id="home" className={styles.hero}>
      <ParallaxBackground />
      <div className={styles.horizontalOverlay} />
      <div className={styles.verticalOverlay} />

      <div className={`${styles.pipe} ${styles.whitePipe}`} aria-hidden="true">
        <Image
          src="/images/pipe-white.png"
          alt=""
          width={1254}
          height={1254}
          className={`${styles.pipeImage} ${styles.floatPipe}`}
        />
      </div>
      <div className={`${styles.pipe} ${styles.copperPipe}`} aria-hidden="true">
        <Image
          src="/images/copper-pipe.png"
          alt=""
          width={1254}
          height={1254}
          className={`${styles.pipeImage} ${styles.floatPipeReverse}`}
        />
      </div>      <div className={`${styles.pipe} ${styles.adjustableWrench}`} aria-hidden="true">
        <Image
          src="/images/adjustable-wrench.png"
          alt=""
          width={1254}
          height={1254}
          className={`${styles.toolImage} ${styles.floatPipeReverse}`}
        />
      </div>
      <div className={`${styles.pipe} ${styles.pipeWrench}`} aria-hidden="true">
        <Image
          src="/images/pipe-wrench.png"
          alt=""
          width={1254}
          height={1254}
          className={`${styles.toolImage} ${styles.floatPipe}`}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.contentInner}>
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