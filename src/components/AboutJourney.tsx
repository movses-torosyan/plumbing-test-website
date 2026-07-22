"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";
import Image from "next/image";
import { useRef } from "react";
import styles from "./AboutJourney.module.css";

const cards = [
  { image: "/images/menu-about.webp", alt: "Our professional plumbing team", label: "People first" },
  { image: "/images/why-choose-plumbing-team.webp", alt: "Plumbers working carefully in a home", label: "Craftsmanship" },
  { image: "/images/Plumbing Services.webp", alt: "Professional plumbing installation", label: "Precision" },
  { image: "/images/Leak Detection.webp", alt: "Technician performing leak detection", label: "Technology" },
  { image: "/images/Emergency Services.webp", alt: "Emergency plumber ready to help", label: "Always ready" },
];

function StickyAboutCards() {
  const container = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const elements = imageRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!elements[0]) return;
    gsap.set(elements[0], { yPercent: 0, scale: 1, rotation: 0 });
    gsap.set(elements.slice(1), { yPercent: 110, scale: 1, rotation: 0 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: `+=${window.innerHeight * (elements.length - 1)}`,
        pin: true,
        scrub: 0.55,
        anticipatePin: 1,
      },
    });

    for (let index = 0; index < elements.length - 1; index += 1) {
      timeline.to(elements[index], { scale: 0.72, rotation: index % 2 ? -4 : 4, duration: 1, ease: "none" }, index);
      timeline.to(elements[index + 1], { yPercent: 0, duration: 1, ease: "none" }, index);
    }

    const refreshTimeline = () => ScrollTrigger.refresh();
    window.addEventListener("app-viewport-resize", refreshTimeline);
    return () => {
      window.removeEventListener("app-viewport-resize", refreshTimeline);
      timeline.scrollTrigger?.kill();
    };
  }, { scope: container });

  return (
    <div ref={container} className={styles.stickyCards}>
      <div className={styles.story}>
        <p className={styles.eyebrow}>About your local plumbing team</p>
        <h1>Built on trust.<br />Proven in every detail.</h1>
        <p className={styles.lead}>We bring skilled people, precise workmanship, and honest communication into every home. From the first call to the final inspection, our work is designed to feel calm, clear, and dependable.</p>
        <div className={styles.values}>
          <span><b>01</b> Licensed professionals</span>
          <span><b>02</b> Upfront recommendations</span>
          <span><b>03</b> Respectful, clean service</span>
        </div>
      </div>
      <div className={styles.deck}>
        {cards.map((card, index) => (
          <div key={card.label} ref={(node) => { imageRefs.current[index] = node; }} className={styles.card}>
            <Image src={card.image} alt={card.alt} fill sizes="(max-width: 850px) 92vw, 48vw" priority={index < 2} />
            <div className={styles.cardShade} />
            <span>0{index + 1} — {card.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AboutJourney() {
  return <ReactLenis root><section id="about" className={styles.about}><StickyAboutCards /></section></ReactLenis>;
}