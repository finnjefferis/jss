"use client";

import Image from "next/image";
import { useEffect, useState, useMemo, useCallback } from "react";
import { PricingTiers } from "./components/PricingTiers";
import { ValueProposition } from "./components/ValueProposition";
import { ContactSection } from './components/ContactUs';
import { RecentWorkSection } from "./components/RecentWorkSection";

type WordPair = { from: string; to: string };

const WORD_PAIRS: WordPair[] = [
  { from: "clicks",     to: "enquiries." },
  { from: "visits",     to: "bookings." },
  { from: "chaos",      to: "clarity." },
  { from: "DIY",        to: "done-for-you." },
];

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

      {/* HERO — Text Only */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10">
          <HeroContent />
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

function HeroContent() {
  const [sequence] = useState<WordPair[]>(WORD_PAIRS);
  const [pairIndex, setPairIndex] = useState(0);
  const [textFrom, setTextFrom] = useState("");
  const [textTo, setTextTo] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const { maxFrom, maxTo } = useMemo(() => {
    return WORD_PAIRS.reduce(
      (acc, pair) => ({
        maxFrom: pair.from.length > acc.maxFrom.length ? pair.from : acc.maxFrom,
        maxTo: pair.to.length > acc.maxTo.length ? pair.to : acc.maxTo,
      }),
      { maxFrom: "", maxTo: "" }
    );
  }, []);

  useEffect(() => {
    const currentPair = sequence[pairIndex];
    const isLastPair = pairIndex === sequence.length - 1;

    const handleTyping = () => {
      const fullFrom = currentPair.from;
      const fullTo = currentPair.to;
      const isFullFrom = textFrom === fullFrom;
      const isFullTo = textTo === fullTo;
      const isFullyTyped = isFullFrom && isFullTo;
      const isFullyDeleted = textFrom === '' && textTo === '';

      if (isDeleting) {
        setTextFrom((prev) => prev.slice(0, -1));
        setTextTo((prev) => prev.slice(0, -1));
        setTypingSpeed(50);
        if (isFullyDeleted) {
          setIsDeleting(false);
          setPairIndex((prev) => prev + 1);
          setTypingSpeed(100);
        }
      } else {
        if (!isFullFrom) setTextFrom(fullFrom.slice(0, textFrom.length + 1));
        if (!isFullTo) setTextTo(fullTo.slice(0, textTo.length + 1));
        setTypingSpeed(100);
        if (isFullyTyped) {
          if (isLastPair) return;
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [textFrom, textTo, isDeleting, pairIndex, sequence, typingSpeed]);

  const currentFrom = sequence[pairIndex]?.from ?? '';
  const currentTo = sequence[pairIndex]?.to ?? '';

  return (
    <div className="text-center max-w-4xl mx-auto">
      <div className="hero-line hero-delay-1">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
          Websites & social for small businesses
        </p>
      </div>

      <h2 className="mt-8 text-5xl font-extrabold leading-[1.08] text-zinc-900 dark:text-white md:text-7xl lg:text-8xl hero-line hero-delay-2">
        Turn{' '}
        <span className="relative inline-grid grid-cols-1 text-center min-w-[6ch]">
          <span className="invisible col-start-1 row-start-1 whitespace-pre">{maxFrom}</span>
          <span className="col-start-1 row-start-1 underline decoration-zinc-200 dark:decoration-zinc-700 decoration-4 underline-offset-8">
            {textFrom}
            {(pairIndex !== sequence.length - 1 || isDeleting || textFrom !== currentFrom) && (
              <span className="animate-pulse font-light text-zinc-400 dark:text-zinc-600">|</span>
            )}
          </span>
        </span>
        
        into{' '}
        <span className="relative inline-grid grid-cols-1 text-center min-w-[8ch]">
          <span className="invisible col-start-1 row-start-1 whitespace-pre">{maxTo}</span>
          <span className="col-start-1 row-start-1 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">
            {textTo}
            {(pairIndex !== sequence.length - 1 || isDeleting || textTo !== currentTo) && (
              <span className="animate-pulse font-light text-indigo-300  dark:text-indigo-600">|</span>
            )}
          </span>
        </span>
      </h2>

      <p className="mt-8 text-lg text-zinc-500 dark:text-zinc-400 md:text-xl max-w-2xl mx-auto hero-line hero-delay-3">
        We rebuild outdated websites into fast, professional sites that actually bring in customers.
      </p>

      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center hero-line hero-delay-4">
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
  );
}
