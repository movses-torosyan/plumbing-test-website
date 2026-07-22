"use client";

import { useEffect, useRef } from "react";
import { HeroSection } from "./HeroSection";
import { ServicesSection } from "./ServicesSection";
import { WhyChooseUs } from "./WhyChooseUs";
import { LocationsSection } from "./LocationsSection";
import { ReviewsSection } from "./ReviewsSection";
import styles from "./HeroServicesTransition.module.css";

export function HeroServicesTransition() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId = 0;
    let settleTimer = 0;
    let autoScrolling = false;
    let autoScrollEndTimer = 0;
    let autoAnimationFrame = 0;

    const getSettleDelay = () => window.matchMedia("(max-width: 850px)").matches ? 180 : 3000;

    const updateReveal = () => {
      const stage = stageRef.current;
      if (!stage) return;

      const rect = stage.getBoundingClientRect();
      const scrollDistance = Math.max(stage.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / scrollDistance, 0), 1);
      const servicesProgress = Math.min(progress * 4, 1);
      const whyProgress = Math.min(Math.max((progress - 0.3) * 5, 0), 1);
      const locationsProgress = Math.min(Math.max((progress - 0.5) * 4, 0), 1);
      const reviewsProgress = Math.min(Math.max((progress - 0.75) * 4, 0), 1);

      const revealOnce = (name: string, sectionProgress: number) => {
        if (sectionProgress <= 0.08) return;
        stage.querySelector(`[data-reveal-section="${name}"]`)?.setAttribute("data-visible", "true");
      };

      revealOnce("why", whyProgress);
      revealOnce("locations", locationsProgress);
      revealOnce("reviews", reviewsProgress);
      stage.style.setProperty("--services-reveal", `${(1 - servicesProgress) * 100}%`);
      stage.style.setProperty("--hero-scroll", `${servicesProgress * -22}vh`);
      stage.style.setProperty("--services-lift", `${(1 - servicesProgress) * 12}vh`);
      stage.style.setProperty("--services-scroll", `${whyProgress * -8}vh`);
      stage.style.setProperty("--why-reveal", `${(1 - whyProgress) * 100}%`);
      stage.style.setProperty("--why-lift", `${(1 - whyProgress) * 12}vh`);
      stage.style.setProperty("--why-scroll", `${locationsProgress * -18}vh`);
      stage.style.setProperty("--locations-reveal", `${(1 - locationsProgress) * 100}%`);
      stage.style.setProperty("--locations-lift", `${(1 - locationsProgress) * 12}vh`);
      stage.style.setProperty("--locations-scroll", `${reviewsProgress * -18}vh`);
      stage.style.setProperty("--reviews-reveal", `${(1 - reviewsProgress) * 100}%`);
      stage.style.setProperty("--reviews-lift", `${(1 - reviewsProgress) * 12}vh`);
      frameId = 0;
    };

    const snapToNearestSection = () => {
      const stage = stageRef.current;
      if (!stage || autoScrolling) return;

      const rect = stage.getBoundingClientRect();
      const scrollDistance = Math.max(stage.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / scrollDistance, 0), 1);
      if (progress <= 0 || progress >= 1) return;

      const nearestStop = Math.round(progress * 4) / 4;
      const target = window.scrollY + rect.top + nearestStop * scrollDistance;
      if (Math.abs(window.scrollY - target) < 2) return;

      autoScrolling = true;
      window.dispatchEvent(new CustomEvent("navbar-auto-scroll", { detail: true }));

      const start = window.scrollY;
      const distance = target - start;
      const duration = 1000;
      const startedAt = performance.now();
      const animate = (now: number) => {
        const elapsed = Math.min((now - startedAt) / duration, 1);
        window.scrollTo(0, start + distance * elapsed);
        if (elapsed < 1) autoAnimationFrame = requestAnimationFrame(animate);
      };
      autoAnimationFrame = requestAnimationFrame(animate);

      autoScrollEndTimer = window.setTimeout(() => {
        autoScrolling = false;
        window.dispatchEvent(new CustomEvent("navbar-auto-scroll", { detail: false }));
        updateReveal();
      }, duration + 80);
    };

    const cancelAutoScroll = () => {
      if (!autoScrolling) return;
      autoScrolling = false;
      window.cancelAnimationFrame(autoAnimationFrame);
      window.clearTimeout(autoScrollEndTimer);
      window.clearTimeout(settleTimer);
      window.dispatchEvent(new CustomEvent("navbar-auto-scroll", { detail: false }));
      updateReveal();
      settleTimer = window.setTimeout(snapToNearestSection, getSettleDelay());
    };

    const cancelWithKeyboard = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) cancelAutoScroll();
    };

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateReveal);
      if (autoScrolling) return;
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(snapToNearestSection, getSettleDelay());
    };

    updateReveal();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("wheel", cancelAutoScroll, { passive: true });
    window.addEventListener("touchstart", cancelAutoScroll, { passive: true });
    window.addEventListener("pointerdown", cancelAutoScroll, { passive: true });
    window.addEventListener("keydown", cancelWithKeyboard);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("wheel", cancelAutoScroll);
      window.removeEventListener("touchstart", cancelAutoScroll);
      window.removeEventListener("pointerdown", cancelAutoScroll);
      window.removeEventListener("keydown", cancelWithKeyboard);
      window.clearTimeout(settleTimer);
      window.clearTimeout(autoScrollEndTimer);
      if (autoAnimationFrame) window.cancelAnimationFrame(autoAnimationFrame);
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
        <div className={styles.whyLayer}>
          <div className={styles.whyMotion} data-reveal-section="why"><WhyChooseUs /></div>
        </div>
        <div className={styles.locationsLayer}>
          <div className={styles.locationsMotion} data-reveal-section="locations"><LocationsSection /></div>
        </div>
        <div className={styles.reviewsLayer}>
          <div className={styles.reviewsMotion} data-reveal-section="reviews"><ReviewsSection /></div>
        </div>
      </div>
    </div>
  );
}