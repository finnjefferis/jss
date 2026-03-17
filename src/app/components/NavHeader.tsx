"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export function NavHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const handleLinkClick = () => setIsMenuOpen(false);

  // Animate menu height
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;

    if (isMenuOpen) {
      el.style.display = "block";
      const height = el.scrollHeight;
      el.style.height = "0px";
      el.style.opacity = "0";
      // Force reflow
      el.offsetHeight;
      el.style.transition = "height 300ms cubic-bezier(0.4,0,0.2,1), opacity 200ms ease";
      el.style.height = `${height}px`;
      el.style.opacity = "1";
    } else {
      el.style.transition = "height 200ms cubic-bezier(0.4,0,0.2,1), opacity 150ms ease";
      el.style.height = "0px";
      el.style.opacity = "0";
      const handleEnd = () => {
        if (!isMenuOpen) el.style.display = "none";
      };
      el.addEventListener("transitionend", handleEnd, { once: true });
      return () => el.removeEventListener("transitionend", handleEnd);
    }
  }, [isMenuOpen]);

  return (
    <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-10">
      <header className="relative flex items-center justify-between gap-4 py-6 border-b border-zinc-200 dark:border-zinc-800 z-40">
        <a href="/" className="flex items-center md:text-xl gap-2 text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-100">
          <div className="relative h-10 w-9 shrink-0">
            <Image
              src="/jsslogo.png"
              alt="Jefferis Software Solutions logo"
              fill
              sizes="40px"
              priority
              className="rounded-lg dark:invert"
            />
          </div>
          <span className="h-4 w-4 rounded-full bg-coral-500" />
          Jefferis Software Solutions
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <a href="/packages" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-coral-600 dark:hover:text-coral-400 transition-colors">
            Packages
          </a>
          <a href="/software" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-coral-600 dark:hover:text-coral-400 transition-colors">
            Software
          </a>
          <a href="/ads" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-coral-600 dark:hover:text-coral-400 transition-colors">
            Ads
          </a>
          <a
            href="https://wa.me/447887034503"
            className="ml-2 rounded-full bg-coral-600 px-5 py-2 text-sm font-semibold text-white hover:bg-coral-500 hover:scale-[1.04] active:scale-[0.97] transition-all duration-200"
          >
            Contact Us
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 -mr-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </header>

      {/* Mobile menu — animated */}
      <div
        ref={menuRef}
        className="absolute left-0 right-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-xl md:hidden overflow-hidden"
        style={{ display: "none", height: 0, opacity: 0 }}
      >
        <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-10">
          <nav className="flex flex-col py-6 gap-4 text-center">
            <a href="/packages" onClick={handleLinkClick} className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-coral-600 dark:hover:text-coral-400 py-2">
              Packages
            </a>
            <a href="/software" onClick={handleLinkClick} className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-coral-600 dark:hover:text-coral-400 py-2">
              Software
            </a>
            <a href="/ads" onClick={handleLinkClick} className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-coral-600 dark:hover:text-coral-400 py-2">
              Ads
            </a>
            <a href="/blog" onClick={handleLinkClick} className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-coral-600 dark:hover:text-coral-400 py-2">
              Blog
            </a>
            <hr className="border-zinc-100 dark:border-zinc-800 my-1" />
            <a
              href="https://wa.me/447887034503"
              onClick={handleLinkClick}
              className="mx-auto rounded-full bg-coral-600 px-6 py-3 text-sm font-semibold text-white hover:bg-coral-500 active:scale-[0.97] transition-all duration-200"
            >
              Contact Us
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
