import styles from "./CallButton.module.css";

const letters = Array.from("CALL (202) 555-0147");

function CallLetters({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <span className={duplicate ? styles.incomingText : styles.outgoingText} aria-hidden="true">
      {letters.map((letter, index) => (
        <span key={`${letter}-${index}`} style={{ transitionDelay: `${index * 35}ms` }}>{letter === " " ? "\u00A0" : letter}</span>
      ))}
    </span>
  );
}

export function CallButton() {
  return (
    <a className={styles.callButton} href="tel:+12025550147" aria-label="Call (202) 555-0147">
      <span className={styles.phoneIcon} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
        </svg>
      </span>
      <span className={styles.textWindow}>
        <CallLetters />
        <CallLetters duplicate />
      </span>
    </a>
  );
}