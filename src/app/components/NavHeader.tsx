"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = useCallback(() => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      onClick={toggle}
      className="relative h-9 w-16 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Sun icon — left side */}
      <svg
        className={`absolute left-1.5 top-1/2 -translate-y-1/2 h-4 w-4 transition-opacity duration-300 ${isDark ? "opacity-30 text-zinc-500" : "opacity-100 text-amber-500"}`}
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      {/* Moon icon — right side */}
      <svg
        className={`absolute right-1.5 top-1/2 -translate-y-1/2 h-4 w-4 transition-opacity duration-300 ${isDark ? "opacity-100 text-blue-400" : "opacity-30 text-zinc-400"}`}
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
      {/* Toggle knob */}
      <div
        className={`absolute top-1 h-7 w-7 rounded-full bg-white dark:bg-zinc-300 border border-zinc-200 dark:border-zinc-500 shadow-md transition-all duration-300 ease-in-out ${
          isDark ? "left-[calc(100%-32px)]" : "left-1"
        }`}
      />
    </button>
  );
}

export function NavHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLinkClick = () => setIsMenuOpen(false);

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
          <a href="/#recent-work" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-coral-600 dark:hover:text-coral-400 transition-colors">
            Work
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <a
            href="https://wa.me/447887034503"
            className="hidden md:inline-flex rounded-md bg-gradient-to-r from-coral-600 to-coral-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-coral-700 hover:to-coral-600"
          >
            Contact Us
          </a>

          <button
            className="md:hidden p-2 -mr-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-[88px] z-50 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-xl md:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-10">
            <nav className="flex flex-col py-6 gap-4 text-center">
              <a href="/packages" onClick={handleLinkClick} className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-coral-600 dark:hover:text-coral-400 py-2">
                Packages
              </a>
              <a href="/software" onClick={handleLinkClick} className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-coral-600 dark:hover:text-coral-400 py-2">
                Software
              </a>
              <a href="/#recent-work" onClick={handleLinkClick} className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-coral-600 dark:hover:text-coral-400 py-2">
                Work
              </a>
              <hr className="border-zinc-100 dark:border-zinc-800 my-1" />
              <a
                href="https://wa.me/447887034503"
                onClick={handleLinkClick}
                className="inline-flex w-full justify-center rounded-md bg-gradient-to-r from-coral-600 to-coral-500 px-4 py-3 text-sm font-medium text-white shadow-sm"
              >
                Contact Us
              </a>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
