"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { PricingTiers } from "./components/PricingTiers";
import { ValueProposition } from "./components/ValueProposition";
import { ContactSection } from './components/ContactUs';
import { RecentWorkSection } from "./components/RecentWorkSection";

const ROTATE_WORDS = ["convert.", "impress.", "grow.", "last."];

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto max-w-6xl px-5 md:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = useCallback(() => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }, [isDark]);

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <main className="min-h-screen w-full bg-white dark:bg-zinc-950 relative transition-colors">

      {/* Top Bar */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500 z-50"></div>

      <Container>
        <header className="relative flex items-center justify-between gap-4 py-6 border-b border-zinc-200 dark:border-zinc-800 z-40">
          <h1 className="flex items-center md:text-xl gap-2 text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-100">
            <div className="relative h-10 w-9 shrink-0">
              <Image
                src="/jsslogo.png"
                alt="Jefferis Software Solutions logo"
                fill
                sizes="40px"
                priority
                className="rounded-lg"
              />
            </div>
            <span className="h-4 w-4 rounded-full bg-indigo-500"></span>
            Jefferis Software Solutions
          </h1>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* DESKTOP CONTACT BUTTON */}
            <a
              href="https://wa.me/447887034503"
              className="hidden md:inline-flex rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-indigo-700 hover:to-indigo-600"
            >
              Contact Us
            </a>

            {/* MOBILE MENU TOGGLE */}
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

        {/* MOBILE MENU DROPDOWN */}
        {isMenuOpen && (
          <div className="absolute left-0 right-0 top-[88px] z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-xl md:hidden animate-in slide-in-from-top-2 duration-200">
             <Container>
               <nav className="flex flex-col py-6 gap-4 text-center">
                 <a href="#process" onClick={handleLinkClick} className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 py-2">
                   The Process
                 </a>
                 <a href="#services" onClick={handleLinkClick} className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 py-2">
                   Services
                 </a>
                 <a href="#recent-work" onClick={handleLinkClick} className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 py-2">
                   Recent Work
                 </a>
                 <hr className="border-zinc-100 dark:border-zinc-800 my-1" />
                 <a
                    href="https://wa.me/447887034503"
                    onClick={handleLinkClick}
                    className="inline-flex w-full justify-center rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-3 text-sm font-medium text-white shadow-sm"
                  >
                    Contact Us
                  </a>
               </nav>
             </Container>
          </div>
        )}
      </Container>

      {/* HERO */}
      <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* LEFT — Text */}
            <div>
              <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400 hero-line hero-delay-1">
                Web Design & Bespoke Software
              </p>

              <h2 className="text-4xl font-extrabold leading-[1.15] text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl hero-line hero-delay-1">
                Websites that<br />
                <RotatingWord />
              </h2>

              <p className="mt-6 text-lg text-zinc-500 dark:text-zinc-400 md:text-xl max-w-xl hero-line hero-delay-2">
                We build new sites, refresh outdated ones, and develop bespoke software for small businesses across the UK.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center hero-line hero-delay-3">
                <a
                  href="https://wa.me/447887034503?text=Hi%20Finn%2C%20I'd%20like%20a%20FREE%20website%20audit."
                  className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  Book a free website audit
                </a>
                <a
                  href="#recent-work"
                  className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  See recent projects &rarr;
                </a>
              </div>
            </div>

            {/* RIGHT — Browser Mockup */}
            <div className="hero-line hero-delay-3">
              <HeroVisual />
            </div>

          </div>
        </Container>
      </section>

      <ValueProposition />

      <Container>
        <section id="services" className="mb-28">
          <PricingTiers />
        </section>

        <RecentWorkSection />
        <ContactSection />
      </Container>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 text-center text-xs text-zinc-500">
        <Container>
          © {new Date().getFullYear()} Jefferis Software Solutions
        </Container>
      </footer>
    </main>
  );
}

const HERO_SITES = [
  { src: "/naxnew.png", alt: "Naxco website", label: "naxco.co.uk", href: "https://naxco.co.uk", rotate: "-rotate-3", z: "z-10", pos: "top-0 left-0 w-[75%]" },
  { src: "/edivertnew.png", alt: "eDivert website", label: "edivert.co.uk", href: "https://www.edivert.co.uk/", rotate: "rotate-2", z: "z-20", pos: "top-[15%] right-0 w-[75%]" },
  { src: "/ivyarch.png", alt: "Ivy Arch Studios website", label: "ivyarchstudios.co.uk", href: "https://ivy-arch.vercel.app/", rotate: "-rotate-1", z: "z-30", pos: "top-[55%] left-[10%] w-[70%]" },
];

function BrowserFrame({ site, className = "" }: { site: typeof HERO_SITES[number]; className?: string }) {
  return (
    <a href={site.href} target="_blank" rel="noopener noreferrer" className={`block group ${className}`}>
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden transition-shadow group-hover:shadow-2xl">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <div className="ml-2 flex-1">
            <div className="max-w-[50%] h-3.5 rounded bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center">
              <span className="text-[8px] text-zinc-400 dark:text-zinc-500 truncate">{site.label}</span>
            </div>
          </div>
        </div>
        <div className="relative aspect-[16/10] w-full bg-zinc-100 dark:bg-zinc-800">
          <Image src={site.src} alt={site.alt} fill className="object-cover object-top" sizes="400px" />
        </div>
      </div>
    </a>
  );
}

function HeroVisual() {
  return (
    <>
      {/* DESKTOP — Stacked frames */}
      <div className="hidden lg:block relative">
        <div className="absolute -inset-8 bg-gradient-to-tr from-indigo-200/30 dark:from-indigo-900/15 to-violet-200/30 dark:to-violet-900/15 rounded-3xl blur-3xl -z-10" />
        <div className="relative aspect-[4/3]">
          {HERO_SITES.map((site) => (
            <div
              key={site.label}
              className={`absolute ${site.pos} ${site.z} ${site.rotate} transition-transform duration-500 hover:rotate-0 hover:scale-105`}
            >
              <BrowserFrame site={site} />
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE — Highlights carousel */}
      <div className="lg:hidden mt-14">
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-2">
            Recent work
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            A few sites we&apos;ve recently built and refreshed for small businesses. Swipe to explore.
          </p>
        </div>
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 no-scrollbar -mx-5 px-5 pb-2">
          {HERO_SITES.map((site) => (
            <div key={site.label} className="flex-shrink-0 w-[85vw] max-w-sm snap-center">
              <BrowserFrame site={site} />
              <p className="mt-2 text-center text-xs font-medium text-zinc-400 dark:text-zinc-500">
                {site.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = ROTATE_WORDS[index];
    const isComplete = text === word;
    const isEmpty = text === "";
    const isLast = index === ROTATE_WORDS.length - 1;

    if (isComplete && isLast) return;

    const timer = setTimeout(() => {
      if (isDeleting) {
        setText((prev) => prev.slice(0, -1));
        if (isEmpty) {
          setIsDeleting(false);
          setIndex((prev) => prev + 1);
        }
      } else {
        setText(word.slice(0, text.length + 1));
        if (isComplete) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, isDeleting ? 40 : 90);

    return () => clearTimeout(timer);
  }, [text, isDeleting, index]);

  const word = ROTATE_WORDS[index];
  const isLast = index === ROTATE_WORDS.length - 1;
  const showCursor = !isLast || isDeleting || text !== word;

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">
      {text}
      {showCursor && (
        <span className="animate-pulse text-indigo-400 dark:text-indigo-500">|</span>
      )}
    </span>
  );
}
