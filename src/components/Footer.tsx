"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { CallButton } from "./CallButton";
import { MapButton } from "./MapButton";
import { TextReveal } from "./ui/cascade-text";
import styles from "./Footer.module.css";

const socials = [
  { name: "Instagram", className: styles.instagram, viewBox: "0 0 16 16", path: "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42A3.917 3.917 0 0 0 1.343 1.343 3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0H8Zm0 3.892a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217Zm4.27-1.122a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92Z" },
  { name: "X", className: styles.twitter, viewBox: "0 0 16 16", path: "M12.6 1h2.45L9.7 7.1 16 15h-4.94L7.19 10.1 2.9 15H.45l5.6-6.4L0 1h5.06l3.5 4.44L12.6 1Zm-.86 12.6h1.36L4.32 2.33H2.86L11.74 13.6Z" },
  { name: "LinkedIn", className: styles.linkedin, viewBox: "0 0 448 512", path: "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" },
  { name: "WhatsApp", className: styles.whatsapp, viewBox: "0 0 16 16", path: "M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326ZM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584 3.63 0 6.588 2.958 6.588 6.591-.004 3.639-2.961 6.592-6.592 6.592Z" },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = footer.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, ((window.visualViewport?.height ?? window.innerHeight) - rect.top) / ((window.visualViewport?.height ?? window.innerHeight) + rect.height)));
      footer.style.setProperty("--footer-shift", `${(0.5 - progress) * 28}px`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("app-viewport-resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("app-viewport-resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <footer ref={footerRef} id="contact" className={styles.footer}>
      <div className={styles.parallaxContent}>
<div className={styles.top}>
        <div className={styles.callAction}><CallButton /></div>
        <TextReveal text="[CONTACT US]" staticCharacters="[]" href="/contact" onClick={(event) => { event.preventDefault(); window.dispatchEvent(new CustomEvent("site-preloader:navigate", { detail: "/contact" })); }} fontSize="1.35rem" staggerDelay={28} duration={320} color="#ffffff" hoverColor="#ffffff" className={styles.contactButton} />
        <div className={styles.locationAction}>
          <span>Locations</span>
          <MapButton />
        </div>
      </div>

      <div className={styles.middle}>
        <div className={styles.brand}><Image src="/images/plumbing-logo.webp" alt="" width={48} height={48} /><span>Your <b>Logo</b></span></div>
        <div className={styles.socials} aria-label="Social media">
          {socials.map((social) => (
            <a key={social.name} href="#" aria-label={social.name} className={`${styles.social} ${social.className}`}>
              <svg viewBox={social.viewBox} aria-hidden="true"><path d={social.path} /></svg>
            </a>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; 2026 Your Logo. All rights reserved.</p>
        <div className={styles.credit}>
          <span>Website by</span>
          <a
            href="https://www.facebook.com/profile.php?id=61592074470613"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit ZyntrixorX Studio on Facebook"
            title="ZyntrixorX Studio"
          >
            <Image src="/images/ZX-LOGO.webp" alt="ZyntrixorX Studio" width={72} height={32} />
          </a>
        </div>
      </div>
          </div>
    </footer>
  );
}