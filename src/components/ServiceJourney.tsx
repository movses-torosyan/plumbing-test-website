"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { CallButton } from "./CallButton";
import { TextReveal } from "./ui/cascade-text";
import styles from "./ServiceJourney.module.css";

const services = [
  { title: "Emergency Services", image: "/images/Emergency Services.webp", eyebrow: "Available day and night", items: ["24/7 Emergency Plumbing", "Emergency Leak Repair", "Burst Pipe Repair", "Flood Response"] },
  { title: "Plumbing Services", image: "/images/Plumbing Services.webp", eyebrow: "Everyday plumbing, elevated", items: ["Faucet Repair & Installation", "Toilet Repair & Installation", "Shower & Bathtub Repair", "Sink Installation", "Garbage Disposal Repair"] },
  { title: "Drain Services", image: "/images/Drain Services.webp", eyebrow: "Restore the flow", items: ["Drain Cleaning", "Clogged Drain Repair", "Hydro Jetting", "Sewer Drain Cleaning"] },
  { title: "Water Heater Services", image: "/images/Water Heater Services.webp", eyebrow: "Reliable hot water", items: ["Water Heater Installation", "Water Heater Repair", "Tankless Water Heater Installation", "Water Heater Maintenance"] },
  { title: "Leak Detection", image: "/images/Leak Detection.webp", eyebrow: "Find it before it spreads", items: ["Water Leak Detection", "Slab Leak Detection", "Gas Leak Detection"] },
  { title: "Pipe Services", image: "/images/Pipe Services.webp", eyebrow: "Built for lasting performance", items: ["Pipe Repair", "Pipe Replacement", "Repiping", "Frozen Pipe Repair", "Burst Pipe Repair"] },
];

function ServicePanel({ service, index }: { service: (typeof services)[number]; index: number }) {
  return (
    <section className={styles.panel} aria-labelledby={`service-${index}`}>
      <Image src={service.image} alt="" fill sizes="100vw" priority={index < 2} className={styles.background} />
      <div className={styles.shade} />
      <div className={styles.content}>
        <div className={styles.intro}>
          <p>{service.eyebrow}</p>
          <h1 id={`service-${index}`}>{service.title}</h1>
          <div className={styles.actions}>
            <CallButton />
            <TextReveal text="[CONTACT US]" staticCharacters="[]" href="/contact" onClick={(event) => { event.preventDefault(); window.dispatchEvent(new CustomEvent("site-preloader:navigate", { detail: "/contact" })); }} fontSize="1.35rem" staggerDelay={28} duration={320} color="#ffffff" hoverColor="#ffffff" className={styles.contact} />
          </div>
        </div>
        <div className={styles.list}>
          <span>What we handle</span>
          <ul>{service.items.map((item, itemIndex) => <li key={item}><b>0{itemIndex + 1}</b>{item}</li>)}</ul>
        </div>
      </div>
      <div className={styles.counter}>0{index + 1} / 0{services.length}</div>
    </section>
  );
}

export function ServiceJourney() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let settleTimer = 0;
    let autoEndTimer = 0;
    let autoFrame = 0;
    let autoScrolling = false;

    const update = () => {
      frame = 0;
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const distance = Math.max(stage.offsetHeight - (window.visualViewport?.height ?? window.innerHeight), 1);
      const progress = Math.min(Math.max(-rect.top / distance, 0), 1);
      const mobile = window.matchMedia("(max-width: 850px)").matches;
      for (let index = 1; index < services.length; index += 1) {
        const local = Math.min(Math.max((progress - (index - 1) / (services.length - 1)) * (services.length - 1), 0), 1);
        stage.style.setProperty(`--reveal-${index}`, `${(1 - local) * 100}%`);
        stage.style.setProperty(`--lift-${index}`, `${(1 - local) * (mobile ? 8 : 12)}vh`);
        stage.style.setProperty(`--scroll-${index - 1}`, `${local * (mobile ? -5 : -8)}vh`);
      }
    };

    const snapToNearestService = () => {
      const stage = stageRef.current;
      if (!stage || autoScrolling) return;
      const rect = stage.getBoundingClientRect();
      const distance = Math.max(stage.offsetHeight - (window.visualViewport?.height ?? window.innerHeight), 1);
      const progress = Math.min(Math.max(-rect.top / distance, 0), 1);
      if (progress <= 0 || progress >= 1) return;
      const nearest = Math.round(progress * (services.length - 1)) / (services.length - 1);
      const target = window.scrollY + rect.top + nearest * distance;
      if (Math.abs(window.scrollY - target) < 2) return;

      autoScrolling = true;
      window.dispatchEvent(new CustomEvent("navbar-auto-scroll", { detail: true }));
      const start = window.scrollY;
      const delta = target - start;
      const duration = 1000;
      const startedAt = performance.now();
      const animate = (now: number) => {
        const progressNow = Math.min((now - startedAt) / duration, 1);
        window.scrollTo(0, start + delta * progressNow);
        if (progressNow < 1) autoFrame = requestAnimationFrame(animate);
      };
      autoFrame = requestAnimationFrame(animate);
      autoEndTimer = window.setTimeout(() => {
        autoScrolling = false;
        window.dispatchEvent(new CustomEvent("navbar-auto-scroll", { detail: false }));
        update();
      }, duration + 80);
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
      if (autoScrolling) return;
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(snapToNearestService, 3000);
    };
    const cancelAutoScroll = () => {
      if (!autoScrolling) return;
      autoScrolling = false;
      cancelAnimationFrame(autoFrame);
      window.clearTimeout(autoEndTimer);
      window.clearTimeout(settleTimer);
      window.dispatchEvent(new CustomEvent("navbar-auto-scroll", { detail: false }));
      update();
      settleTimer = window.setTimeout(snapToNearestService, 3000);
    };
    const cancelWithKeyboard = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) cancelAutoScroll();
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("app-viewport-resize", requestUpdate);
    window.addEventListener("wheel", cancelAutoScroll, { passive: true });
    window.addEventListener("touchstart", cancelAutoScroll, { passive: true });
    window.addEventListener("pointerdown", cancelAutoScroll, { passive: true });
    window.addEventListener("keydown", cancelWithKeyboard);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("app-viewport-resize", requestUpdate);
      window.removeEventListener("wheel", cancelAutoScroll);
      window.removeEventListener("touchstart", cancelAutoScroll);
      window.removeEventListener("pointerdown", cancelAutoScroll);
      window.removeEventListener("keydown", cancelWithKeyboard);
      window.clearTimeout(settleTimer);
      window.clearTimeout(autoEndTimer);
      if (frame) cancelAnimationFrame(frame);
      if (autoFrame) cancelAnimationFrame(autoFrame);
    };
  }, []);

  return (
    <div ref={stageRef} className={styles.stage}>
      <div className={styles.frame}>
        {services.map((service, index) => {
          const layerStyle = index === 0 ? undefined : { clipPath: `inset(var(--reveal-${index}, 100%) 0 0 0)` } as CSSProperties;
          const motionStyle = { transform: `translate3d(0, calc(var(--lift-${index}, 0vh) + var(--scroll-${index}, 0vh)), 0)` } as CSSProperties;
          return <div key={service.title} className={styles.layer} style={{ ...layerStyle, zIndex: index + 1 }}><div className={styles.motion} style={motionStyle}><ServicePanel service={service} index={index} /></div></div>;
        })}
      </div>
    </div>
  );
}