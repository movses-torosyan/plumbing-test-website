"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./FaqSection.module.css";

const faqs = [
  { question: "Do you offer 24/7 emergency plumbing?", answer: "Yes. Our emergency team is available day and night for burst pipes, severe leaks, flooding, blocked main drains, and other urgent plumbing problems." },
  { question: "How quickly can a plumber arrive?", answer: "Arrival time depends on your location and current demand, but emergency requests are prioritized immediately. We provide an estimated arrival window when you call." },
  { question: "Are your plumbers licensed and insured?", answer: "Yes. Our technicians are trained, licensed, and fully insured to complete residential plumbing work safely and to professional standards." },
  { question: "Will I know the price before work begins?", answer: "Yes. After diagnosing the problem, we explain the recommended solution and provide clear pricing before starting any approved work." },
  { question: "Can you repair and install water heaters?", answer: "Yes. We service traditional and tankless water heaters, including repairs, maintenance, replacement, and new installation." },
  { question: "How do you find hidden water leaks?", answer: "We use professional diagnostic methods and non-invasive equipment to narrow down hidden pipe, wall, floor, and slab leaks before recommending repairs." },
  { question: "Do you clean clogged drains and sewer lines?", answer: "Yes. We handle routine drain cleaning, stubborn blockages, hydro jetting, and sewer drain cleaning based on the condition of the line." },
  { question: "Do you leave the work area clean?", answer: "Always. We protect the surrounding area, work carefully, remove job-related debris, and leave your space as clean as we found it." },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section id="faq" className={styles.section}>
      <div className={styles.visual}>
        <Image src="/images/menu-faq.png" alt="A plumber explaining a repair to a homeowner" fill priority sizes="(max-width: 850px) 100vw, 42vw" />
        <div className={styles.visualShade} />
        <div className={styles.visualCopy}><span>Answers from professionals</span><p>Clear guidance before, during, and after every service call.</p></div>
      </div>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Frequently asked questions</p>
        <h1>Questions,<br />answered clearly.</h1>
        <div className={styles.accordion}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <article key={faq.question} className={`${styles.item} ${isOpen ? styles.open : ""}`}>
                <button type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpenIndex(isOpen ? null : index)}>
                  <span><b>{String(index + 1).padStart(2, "0")}</b>{faq.question}</span>
                  <i aria-hidden="true" />
                </button>
                <div id={`faq-answer-${index}`} className={styles.answer} aria-hidden={!isOpen}><div><p>{faq.answer}</p></div></div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}