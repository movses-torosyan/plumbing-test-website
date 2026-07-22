"use client";

import styles from "./button-6.module.css";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 32 32" className={`h-8 w-8 transition-transform duration-500 ${open ? styles.open : ""}`} aria-hidden="true">
      <path className={`${styles.line} ${styles.lineTopBottom}`} d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" />
      <path className={styles.line} d="M7 16 27 16" />
    </svg>
  );
}

export const Component = ({ open, onToggle }: { open: boolean; onToggle: () => void }) => {
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onToggle}
      className="group relative inline-flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-[10px] border-2 border-white/35 font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <span className="inline-flex h-12 w-12 translate-y-0 items-center justify-center bg-white/5 transition duration-500 group-hover:-translate-y-[150%] group-focus-visible:-translate-y-[150%]">
        <MenuIcon open={open} />
      </span>
      <span className="absolute inline-flex h-12 w-full translate-y-full items-center justify-center text-white transition duration-500 group-hover:translate-y-0 group-focus-visible:translate-y-0">
        <span className="absolute h-full w-full translate-y-full skew-y-12 scale-y-0 bg-[#3b82f6] transition duration-500 group-hover:translate-y-0 group-hover:scale-150 group-focus-visible:translate-y-0 group-focus-visible:scale-150" />
        <span className="relative z-10"><MenuIcon open={open} /></span>
      </span>
    </button>
  );
};