"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./MenuOverlay.module.css";

const links = [
  { label: "Services", href: "/services", external: false, image: "/images/menu-services.png" },
  { label: "About", href: "/about", external: false, image: "/images/menu-about.png" },
  { label: "On Map", href: "https://www.google.com/maps/search/?api=1&query=plumber+near+me", external: true, image: "/images/menu-locations.png" },
  { label: "FAQ", href: "/faq", external: false, image: "/images/menu-faq.png" },
  { label: "Contact Us", href: "/contact", external: false, image: "/images/Plumbing service.png" },
];

export function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [active, setActive] = useState(0);
  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (href.startsWith("https://")) {
      onClose();
      return;
    }
    event.preventDefault();
    onClose();
    window.dispatchEvent(new CustomEvent("site-preloader:navigate", { detail: href }));
  };
  return (
    <div className={`${styles.overlay} ${open ? styles.open : ""}`} aria-hidden={!open}>
      <div className={styles.inner}>
        <nav className={styles.links} aria-label="Menu links">
          <p>Explore</p>
          {links.map((link, index) => (
            <a key={link.label} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined} tabIndex={open ? 0 : -1} onClick={(event) => navigate(event, link.href)} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} className={active === index ? styles.active : ""}>
              <span className={styles.number}>0{index + 1}</span>
              <span className={styles.roll} aria-label={link.label}>
                {[...link.label].map((char, charIndex) => <span key={`${char}-${charIndex}`} style={{ "--delay": `${charIndex * 22}ms` } as React.CSSProperties}><i>{char === " " ? "\u00a0" : char}</i><b>{char === " " ? "\u00a0" : char}</b></span>)}
              </span>
            </a>
          ))}
        </nav>
        <div className={styles.visual}>
          {links.map((link, index) => <Image key={link.label} src={link.image} alt="" fill sizes="(max-width: 800px) 100vw, 48vw" priority={index === 0} className={active === index ? styles.imageActive : ""} />)}
          <span>{links[active].label}</span>
        </div>
      </div>
    </div>
  );
}