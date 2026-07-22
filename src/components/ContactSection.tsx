"use client";

import { FormEvent, useState } from "react";
import { CallButton } from "./CallButton";
import styles from "./ContactSection.module.css";

function AnimatedLabel({ text }: { text: string }) {
  return <label>{[...text].map((character, index) => <span key={`${character}-${index}`} style={{ transitionDelay: `${index * 42}ms` }}>{character === " " ? "\u00a0" : character}</span>)}</label>;
}

function AnimatedInput({ id, label, type = "text" }: { id: string; label: string; type?: string }) {
  return <div className={styles.control}><input id={id} name={id} type={type} placeholder=" " required /><AnimatedLabel text={label} /></div>;
}

export function ContactSection({ showInquire = false }: { showInquire?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.info}>
        {showInquire && <p className={styles.inquire}>Inquire</p>}
        <p className={styles.eyebrow}>Contact our plumbing team</p>
        <h1>Let&apos;s get it fixed.</h1>
        <p className={styles.lead}>Tell us what is happening and we&apos;ll help you choose the right next step. For urgent leaks, flooding, or burst pipes, call us directly.</p>
        <CallButton />
        <dl>
          <div><dt>Availability</dt><dd>24 hours · 7 days</dd></div>
          <div><dt>Email</dt><dd>hello@example.com</dd></div>
          <div><dt>Service area</dt><dd>Downtown · Northside · West End · Riverside</dd></div>
        </dl>
      </div>

      <form className={styles.form} onSubmit={submit}>
        <div className={styles.formHeading}><span>Request service</span><b>We usually respond within one business hour.</b></div>
        <div className={styles.twoColumns}>
          <AnimatedInput id="name" label="Your Name" />
          <AnimatedInput id="phone" label="Phone Number" type="tel" />
        </div>
        <AnimatedInput id="email" label="Email Address" type="email" />
        <AnimatedInput id="service" label="Service Needed" />
        <div className={`${styles.control} ${styles.message}`}>
          <textarea id="message" name="message" placeholder=" " rows={4} required />
          <AnimatedLabel text="How Can We Help?" />
        </div>
        <div className={styles.submitRow}>
          <button type="submit">
            <span className={styles.rollText} aria-label="Send Request">
              <span className={styles.rollOutgoing} aria-hidden="true">{[..."SEND REQUEST"].map((character, index) => <span key={`out-${character}-${index}`} style={{ transitionDelay: `${index * 38}ms` }}>{character === " " ? "\u00a0" : character}</span>)}</span>
              <span className={styles.rollIncoming} aria-hidden="true">{[..."SEND REQUEST"].map((character, index) => <span key={`in-${character}-${index}`} style={{ transitionDelay: `${index * 38}ms` }}>{character === " " ? "\u00a0" : character}</span>)}</span>
            </span>
            <i aria-hidden="true">→</i>
          </button>
          <p className={submitted ? styles.successVisible : ""} role="status">Thank you. Your request is ready for our team.</p>
        </div>
      </form>
    </section>
  );
}