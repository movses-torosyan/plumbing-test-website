"use client";

import { useEffect } from "react";

export function MobileViewportSync() {
  useEffect(() => {
    const media = window.matchMedia("(max-width: 850px)");
    const viewport = window.visualViewport;
    let frame = 0;
    let lastHeight = 0;

    const update = () => {
      frame = 0;
      if (!media.matches) {
        document.documentElement.style.removeProperty("--app-viewport-height");
        return;
      }

      const height = Math.ceil(viewport?.height ?? window.innerHeight);
      if (height === lastHeight) return;
      lastHeight = height;
      document.documentElement.style.setProperty("--app-viewport-height", `${height}px`);
      window.dispatchEvent(new CustomEvent("app-viewport-resize", { detail: height }));
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    scheduleUpdate();
    viewport?.addEventListener("resize", scheduleUpdate, { passive: true });
    viewport?.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    window.addEventListener("orientationchange", scheduleUpdate);
    media.addEventListener("change", scheduleUpdate);

    return () => {
      viewport?.removeEventListener("resize", scheduleUpdate);
      viewport?.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("orientationchange", scheduleUpdate);
      media.removeEventListener("change", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}