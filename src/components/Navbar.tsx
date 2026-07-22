"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Component as MenuButton } from "@/components/ui/button-6";
import { TextReveal } from "@/components/ui/cascade-text";
import { MenuOverlay } from "@/components/MenuOverlay";

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const autoScrollActive = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (autoScrollActive.current) {
        setIsVisible(false);
        lastScrollY.current = currentScrollY;
        return;
      }
      if (currentScrollY <= 12) setIsVisible(true);
      else if (currentScrollY > lastScrollY.current) setIsVisible(false);
      else if (currentScrollY < lastScrollY.current) setIsVisible(true);
      lastScrollY.current = currentScrollY;
    };

    const handleAutoScroll = (event: Event) => {
      autoScrollActive.current = (event as CustomEvent<boolean>).detail;
      if (autoScrollActive.current) setIsVisible(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("navbar-auto-scroll", handleAutoScroll);
    
  return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("navbar-auto-scroll", handleAutoScroll);
    };
  }, []);

  
  const navigateHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setMenuOpen(false);
    window.dispatchEvent(new CustomEvent("site-preloader:navigate", { detail: "/#home" }));
  };

  return (
    <>
    <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    <header className={`fixed inset-x-0 top-0 z-30 border-b border-white/15 bg-[#071a2f]/85 backdrop-blur-md transition-transform duration-300 ease-out motion-reduce:transition-none ${isVisible || menuOpen ? "translate-y-0" : "-translate-y-full"}`}>
      <nav aria-label="Main navigation" className="flex h-20 w-full items-center justify-between pl-5 pr-2 sm:pl-8 sm:pr-3 lg:pl-10 lg:pr-4">
        <Link href="/#home" onClick={navigateHome} className="flex items-center gap-3" aria-label="Your Logo home">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-white p-1 shadow-sm shadow-black/15">
            <Image src="/images/plumbing-logo.png" alt="" width={48} height={48} className="h-10 w-10 object-contain" priority />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">Your <span className="text-[#42b9ff]">Logo</span></span>
        </Link>
        <div className="flex items-center gap-3">
          <TextReveal
            text="[INQUIRE]"
            staticCharacters="[]"
            href="/contact?source=inquire"
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              event.preventDefault();
              window.dispatchEvent(new CustomEvent("site-preloader:navigate", { detail: "/contact?source=inquire" }));
            }}
            fontSize="1.125rem"
            staggerDelay={28}
            duration={300}
            color="#ffffff"
            hoverColor="#ffffff"
            className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            style={{ padding: "1.15rem 2rem" }}
          />
          <MenuButton open={menuOpen} onToggle={() => setMenuOpen((value) => !value)} />
        </div>
      </nav>
    </header>
    </>
  );
}