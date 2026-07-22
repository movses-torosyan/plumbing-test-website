"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./SitePreloader.module.css";

type Phase = "entering" | "showing" | "closing";

export function SitePreloader() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("showing");
  const [navigationRun, setNavigationRun] = useState(false);
  const [visible, setVisible] = useState(true);
  const timers = useRef<number[]>([]);
  const previousOverflow = useRef("");

  useEffect(() => {
    const clearTimers = () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
    };
    const lockPage = () => {
      previousOverflow.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    };
    const unlockPage = () => {
      document.body.style.overflow = previousOverflow.current;
    };
    const finish = (closeAfter: number, removeAfter: number) => {
      timers.current.push(window.setTimeout(() => setPhase("closing"), closeAfter));
      timers.current.push(window.setTimeout(() => {
        setVisible(false);
        setNavigationRun(false);
        unlockPage();
        document.body.dataset.siteReady = "true";
        window.dispatchEvent(new CustomEvent("site-preloader:complete"));
      }, removeAfter));
    };

    lockPage();
    finish(2100, 2900);

    const navigateWithLoader = (event: Event) => {
      const destination = (event as CustomEvent<string>).detail;
      if (!destination) return;
      clearTimers();
      lockPage();
      setNavigationRun(true);
      setVisible(true);
      setPhase("entering");
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => setPhase("showing")));
      timers.current.push(window.setTimeout(() => router.push(destination), 850));
      finish(1350, 2200);
    };

    window.addEventListener("site-preloader:navigate", navigateWithLoader);
    return () => {
      clearTimers();
      unlockPage();
      window.removeEventListener("site-preloader:navigate", navigateWithLoader);
    };
  }, [router]);

  if (!visible) return null;

  return (
    <div className={`${styles.preloader} ${styles[phase]} ${navigationRun ? styles.navigation : ""}`} aria-hidden="true">
      <div className={styles.glow} />
      <div className={styles.brand}>Your <b>Logo</b></div>
      <div className={styles.mark}>
        <div className={`${styles.tool} ${styles.pipeWrench}`}><Image src="/images/Spanner-loader-v2.webp" alt="" fill priority unoptimized sizes="220px" /></div>
        <div className={`${styles.tool} ${styles.spanner}`}><Image src="/images/Wrench-loader-v2.webp" alt="" fill priority unoptimized sizes="220px" /></div>
      </div>
    </div>
  );
}