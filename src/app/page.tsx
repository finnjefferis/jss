"use client";

import Image from "next/image";
import { useEffect, useState, useMemo, useRef } from "react"; 
import { PricingTiers } from "./components/PricingTiers";
import { ValueProposition } from "./components/ValueProposition";
import { ContactSection } from './components/ContactUs';
import { MobileGrowthSwiper } from "./components/HeroVisualMobile";
import { RecentWorkSection } from "./components/RecentWorkSection";
// Note: If you have HeroText / HeroVisuals in separate files, import them. 
// Since they were in the same file in your snippet, I kept them below.

type WordPair = { from: string; to: string };

const WORD_PAIRS: WordPair[] = [
  { from: "clicks",     to: "enquiries." },
  { from: "visits",     to: "bookings." },
  { from: "chaos",      to: "clarity." },
  { from: "DIY",        to: "done-for-you." },
];

// 1. Create a reusable "Cage" component for the narrow sections
function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto max-w-6xl px-5 md:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

export default function Page() {
  // --- STATE FOR MOBILE MENU ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper to close menu when a link is clicked
  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <main className="min-h-screen w-full bg-white relative">
      
      {/* Top Bar */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500 z-50"></div>

      <Container>
        <header className="relative flex items-center justify-between gap-6 py-6 border-b border-zinc-200 z-40">
          <h1 className="flex items-center md:text-xl gap-2 text-sm font-semibold tracking-wide">
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
          
          {/* DESKTOP CONTACT BUTTON (Hidden on mobile) */}
          <a
            href="https://wa.me/447887034503"
            className="hidden md:inline-flex rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-indigo-700 hover:to-indigo-600"
          >
            Contact Us
          </a>

          {/* MOBILE MENU TOGGLE (Visible on mobile only) */}
          <button 
            className="md:hidden p-2 -mr-2 text-zinc-600 hover:bg-zinc-100 rounded-md transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              // Close Icon (X)
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Menu Icon (Hamburger)
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </header>
        
        {/* MOBILE MENU DROPDOWN */}
        {/* This sits absolutely positioned below the header */}
        {isMenuOpen && (
          <div className="absolute left-0 right-0 top-[88px] z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-md shadow-xl md:hidden animate-in slide-in-from-top-2 duration-200">
             <Container>
               <nav className="flex flex-col py-6 gap-4 text-center">
                 <a href="#process" onClick={handleLinkClick} className="text-sm font-medium text-zinc-600 hover:text-indigo-600 py-2">
                   The Process
                 </a>
                 <a href="#services" onClick={handleLinkClick} className="text-sm font-medium text-zinc-600 hover:text-indigo-600 py-2">
                   Services
                 </a>
                 <a href="#recent-work" onClick={handleLinkClick} className="text-sm font-medium text-zinc-600 hover:text-indigo-600 py-2">
                   Recent Work
                 </a>
                 <hr className="border-zinc-100 my-1" />
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

     
        <section className="relative mb-10 md:mt-12 pb-16 grid min-h-[60vh] grid-cols-1 items-center gap-10 md:min-h-[50vh] md:grid-cols-2">
          <HeroText />
          <HeroVisualDesktop />

          {/* TINY BOUNCING ARROW */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pb-4">
            <a 
              href="#process" 
              className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-700 animate-bounce"
              aria-label="Scroll down"
            >
              <svg 
                className="h-4 w-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </section>
        
      </Container>

      <ValueProposition />

      <Container>
        <section id="services" className="mb-28 ">
          <PricingTiers /> 
        </section>

        <RecentWorkSection />
        <ContactSection />
      </Container>

      <footer className="border-t border-zinc-200 py-8 text-center text-xs text-zinc-500">
        <Container>
          © {new Date().getFullYear()} Jefferis Software Solutions
        </Container>
      </footer>
    </main>
  );
}

export function HeroText() {
  const [sequence, setSequence] = useState<WordPair[]>(WORD_PAIRS);
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

  return (
    <div className="mt-12 md:pt-6 md:pb-10">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
        Websites & social for local businesses
      </p>

      {/* UPDATED: Increased text size to 6xl on md and 7xl on lg */}
      <h2 className="hero-delay-2 cal-sans mt-8 text-4xl font-semibold leading-tight md:text-6xl lg:text-6xl">
        Turn{' '}
        
        <span className="relative inline-grid grid-cols-1 text-center min-w-[6ch]">
          <span className="invisible col-start-1 row-start-1 whitespace-pre">
            {maxFrom}
          </span>
       
          <span className="col-start-1 row-start-1 text-zinc-700">
            {textFrom}
            {(pairIndex !== sequence.length - 1 || isDeleting || textFrom !== currentPairFrom(sequence, pairIndex)) && (
               <span className="animate-pulse font-light text-zinc-400">|</span>
            )}
          </span>
        </span>{' '}
        
        into{' '}
        
        <span className="relative inline-grid grid-cols-1 text-left min-w-[8ch]">
          <span className="invisible col-start-1 row-start-1 whitespace-pre">
            {maxTo}
          </span>
          <span className="col-start-1 row-start-1 text-indigo-600">
            {textTo}
             {(pairIndex !== sequence.length - 1 || isDeleting || textTo !== currentPairTo(sequence, pairIndex)) && (
               <span className="animate-pulse font-light text-indigo-300">|</span>
            )}
          </span>
        </span>
      </h2>

      {/* UPDATED: Fixed typo 'text-l' to 'text-lg' and increased desktop size to 'md:text-xl' */}
      <p className="hero-line hero-delay-3 mt-10 mb-8 text-lg text-zinc-600 md:text-xl md:leading-relaxed max-w-lg">
        Simple, fast websites and social that bring you new work. 
      </p>

      <div className="hero-line hero-delay-4 mb-6 md:hidden">
        <HeroLighthouseRowMobile />
      </div>

      <div className="hidden md:flex hero-line hero-delay-4 mt-12 flex flex-wrap gap-2 text-xs text-zinc-500">
        {['Trades & home services', 'Cafés & shops', 'Solo founders', 'E-Commerce'].map((tag) => (
          <span key={tag} className="rounded-full border border-zinc-200 px-3 py-1">
            {tag}
          </span>
        ))}
      </div>

      <div className="hero-line hero-delay-5 mt-16 mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href="https://wa.me/447887034503?text=Hi%20Finn%2C%20I'd%20like%20a%20FREE%20website%20audit."
          className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:from-indigo-700 hover:to-indigo-600"
        >
          Book a free website audit
        </a>
        <a
          href="#recent-work"
          className="text-sm font-medium md:mt-0 mt-8 text-zinc-700 underline underline-offset-4"
        >
          See recent projects
        </a>
      </div>
    </div>
  );
}
  
  // Helpers to prevent undefined access during render
  function currentPairFrom(seq: WordPair[], idx: number) {
    return seq[idx] ? seq[idx].from : '';
  }
  function currentPairTo(seq: WordPair[], idx: number) {
    return seq[idx] ? seq[idx].to : '';
  }
  
 
  

  // DESKTOP: lives in the hero grid, right column
  function HeroVisualDesktop() {
    return (
      <div className="relative hidden items-center justify-center md:flex">
        <EdivPhoneSlider />
      </div>
    );
  }

  // Phone slider with ediv before/after images
  function EdivPhoneSlider() {
    const [position, setPosition] = useState(5);
    const [userInteracted, setUserInteracted] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const updatePositionFromClientX = (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const clamped = Math.max(0, Math.min(rect.width, x));
      setPosition((clamped / rect.width) * 100);
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      setUserInteracted(true);
      const el = e.currentTarget;
      el.setPointerCapture(e.pointerId);
      updatePositionFromClientX(e.clientX);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      if (!el.hasPointerCapture(e.pointerId)) return;
      updatePositionFromClientX(e.clientX);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.releasePointerCapture(e.pointerId);
    };

    const easeOutBack = (t: number) => {
      const c1 = 1.3;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };

    useEffect(() => {
      if (userInteracted) return;

      const start = 5;
      const end = 100;
      const delay = 1900;
      const duration = 1500;

      let frameId: number | undefined;
      let timeoutId: number | undefined;
      let startTime: number | null = null;

      const startAnimation = () => {
        startTime = performance.now();

        const animate = (now: number) => {
          if (userInteracted) return;

          const elapsed = now - (startTime as number);
          const t = Math.min(1, elapsed / duration);

          const easedRaw = easeOutBack(t);
          const eased = Math.max(0, Math.min(1, easedRaw));

          const value = start + (end - start) * eased;
          setPosition(value);

          if (t < 1) {
            frameId = requestAnimationFrame(animate);
          }
        };

        frameId = requestAnimationFrame(animate);
      };

      timeoutId = window.setTimeout(startAnimation, delay);

      return () => {
        if (timeoutId) window.clearTimeout(timeoutId);
        if (frameId) cancelAnimationFrame(frameId);
      };
    }, [userInteracted]);

    return (
      <div className="relative">
        {/* Glow effect behind phone */}
        <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/20 via-transparent to-sky-500/20 blur-2xl rounded-full" />

        <div className="relative mx-auto w-72 rounded-[2.5rem] border-4 border-zinc-800 bg-zinc-950 p-2 shadow-2xl shadow-black/50">
          {/* top notch / speaker */}
          <div className="mx-auto mb-2 h-4 w-24 rounded-full bg-black/60" />

          {/* "screen" */}
          <div
            ref={containerRef}
            className="relative w-full aspect-[9/16] overflow-hidden rounded-[1.75rem] bg-white cursor-col-resize select-none touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onDragStart={(e) => e.preventDefault()}
          >
            {/* BEFORE — base */}
            <div className="absolute inset-0">
              <Image
                src="/edivbefore.png"
                alt="Website before"
                fill
                priority
                draggable={false}
                className="object-cover object-top pointer-events-none"
                sizes="300px"
              />
            </div>

            {/* AFTER — clipped to handle position */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <Image
                src="/edivafter.png"
                alt="Website after"
                fill
                priority
                draggable={false}
                className="object-cover object-top pointer-events-none"
                sizes="300px"
              />
            </div>

            {/* HANDLE – purple line + pill */}
            <div
              className="pointer-events-none absolute inset-y-6"
              style={{
                left: `calc(${position}% - 0.5px)`,
                transform: "translateX(-50%)",
              }}
            >
              <div className="flex h-full items-center justify-center">
                <div className="relative flex h-full items-center">
                  <div className="h-full w-[5px] rounded-full bg-gradient-to-b from-indigo-600 via-indigo-500 to-indigo-400 shadow-[0_0_0_1px_rgba(15,23,42,0.5)]" />
                  <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-indigo-600 shadow-lg shadow-indigo-600/50">
                    <span className="text-xs font-semibold text-white animate-pulse">⇆</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Labels - fade in/out based on position */}
            <span className={`pointer-events-none absolute left-2 top-2 z-10 rounded bg-black/60 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-opacity duration-300 ${position < 50 ? 'opacity-100' : 'opacity-0'}`}>
              Before
            </span>
            <span className={`pointer-events-none absolute right-2 top-2 z-10 rounded bg-black/60 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-opacity duration-300 ${position >= 50 ? 'opacity-100' : 'opacity-0'}`}>
              After
            </span>
          </div>

          {/* bottom bar */}
          <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-zinc-700" />
        </div>
      </div>
    );
  }
  
  // MOBILE: full-width section underneath the hero
  function HeroVisualMobile() {
    return (
  <section className="mb-12 md:hidden text-center">
    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
      Before & After
    </p>
  
    <h3 className="mt-2 text-xl font-semibold text-zinc-900">
       A clearer website for more enquiries.
    </h3>
  
    <div className="mt-4">
      <NaxcoPhoneSliderMobile />
    </div>
  
  <p className="mt-4   text-zinc-600">
    Your site can work harder for you.
  </p>
  
  <a
    href="https://wa.me/447887034503?text=Hi%20Finn%2C%20let’s%20improve%20my%20site."
    className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-3 text-sm font-medium text-white shadow-md  hover:from-indigo-700 hover:to-indigo-600 active:scale-[0.97]"
  >
    Let's make that change.
  </a>
  
  </section>
  
    );
  }
  
  
  type LighthouseMetricProps = {
    label: string;
    adjustedScore: number;
    compact?: boolean;
  };
  
  function LighthouseMetric({ label, adjustedScore, compact }: LighthouseMetricProps) {
    const value = Math.max(0, Math.min(100, adjustedScore));
    const degrees = (value / 100) * 360;
  
    // Lighthouse-style colour: red < 50, amber 50–89, green 90+
    const ringColor = value >= 90 ? "#22c55e" : value >= 50 ? "#f59e0b" : "#ef4444";
    const textColor = value >= 90 ? "#15803d" : value >= 50 ? "#b45309" : "#b91c1c";
  
    const circleSize = compact ? "h-10 w-10" : "h-14 w-14";
    const innerInset = compact ? "inset-[4px]" : "inset-[5px]";
    const valueTextClass = compact ? "text-xs font-semibold" : "text-base font-semibold";
    const labelTextClass = compact
      ? "mt-0.5 text-[9px] text-zinc-600 text-center leading-tight"
      : "text-xs text-zinc-700";
  
    return (
      <div className="flex flex-col items-center gap-1">
        <div className={`relative ${circleSize}`}>
          {/* pale background like Lighthouse */}
          <div className="absolute inset-0 rounded-full bg-[#fffbeb]" />
          {/* coloured arc */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(${ringColor} ${degrees}deg, transparent 0deg)`,
            }}
          />
          {/* inner white disc */}
          <div className={`absolute ${innerInset} flex items-center justify-center rounded-full bg-white`}>
            <span className={valueTextClass} style={{ color: textColor }}>
              {value}
            </span>
          </div>
        </div>
        <span className={labelTextClass}>{label}</span>
      </div>
    );
  }
  function HeroLighthouseRowMobile() {
    const metrics = [
      { label: "Performance", from: 43, to: 98 },
      { label: "Access.", from: 60, to: 100 },
      { label: "Best Prac.", from: 75, to: 100 },
      { label: "SEO", from: 25, to: 100 },
    ];
  
    const [values, setValues] = useState(metrics.map((m) => m.from));
  
    useEffect(() => {
      const delay = 1150;   // 1.15s showing low scores
      const duration = 2000; // ms for the count-up
      let frameId: number;
      let startTime: number | null = null;
      let timeoutId: number;
  
      const animate = (now: number) => {
        if (startTime === null) startTime = now;
        const elapsed = now - startTime;
        const tRaw = elapsed / duration;
        const t = Math.min(1, tRaw);
  
        // ease-out
        const eased = 1 - Math.pow(1 - t, 3);
  
        setValues(
          metrics.map((m) =>
            Math.round(m.from + (m.to - m.from) * eased)
          )
        );
  
        if (t < 1) {
          frameId = requestAnimationFrame(animate);
        }
      };
  
      timeoutId = window.setTimeout(() => {
        frameId = requestAnimationFrame(animate);
      }, delay);
  
      return () => {
        window.clearTimeout(timeoutId);
        if (frameId) cancelAnimationFrame(frameId);
      };
    }, []);
  
    return (
      <div className="flex w-full flex-col items-center">
        <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
          Typical site improvement
        </p>
  
        {/* 1×4 row, centred with inner max-width so it never kisses the screen edges */}
        <div className="flex w-full max-w-xs items-center justify-between gap-2 mx-auto">
          {metrics.map((m, index) => (
            <LighthouseMetric
              key={m.label}
              label={m.label}
              adjustedScore={values[index]}
              compact
            />
          ))}
        </div>
  
        <p className="mt-4 text-[9px] text-zinc-400">
          Based on a real homepage refresh (PageSpeed Insights).
        </p>
      </div>
    );
  }
  function NaxcoPhoneSliderMobile() {
    const [position, setPosition] = useState(5); // 0–100
    const [userInteracted, setUserInteracted] = useState(false);
    const [autoPlay, setAutoPlay] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
  
    // Scroll-trigger: start autoPlay when phone enters viewport
    useEffect(() => {
      if (!wrapperRef.current) return;
  
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            setAutoPlay(true);
            observer.disconnect(); // trigger once
          }
        },
        {
          threshold: 0.35, // ~1/3 of it visible
        }
      );
  
      observer.observe(wrapperRef.current);
  
      return () => observer.disconnect();
    }, []);
  
    const updatePositionFromClientX = (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const clamped = Math.max(0, Math.min(rect.width, x));
      setPosition((clamped / rect.width) * 100);
    };
  
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      setUserInteracted(true);
      const el = e.currentTarget;
      el.setPointerCapture(e.pointerId);
      updatePositionFromClientX(e.clientX);
    };
  
    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      if (!el.hasPointerCapture(e.pointerId)) return;
      updatePositionFromClientX(e.clientX);
    };
  
    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.releasePointerCapture(e.pointerId);
    };
  
    // Ease-out-back for bounce, clamped so it doesn’t overshoot the track
    const easeOutBack = (t: number) => {
      const c1 = 1.3;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };
  
    // Auto animation: only when autoPlay=true AND user hasn’t dragged
    useEffect(() => {
      if (!autoPlay || userInteracted) return;
  
      const start = 5;
      const end = 97;
      const delay = 1100; // small pause after entering view
      const duration = 1500;
  
      let frameId: number | undefined;
      let timeoutId: number | undefined;
      let startTime: number | null = null;
  
      const startAnimation = () => {
        startTime = performance.now();
  
        const animate = (now: number) => {
          if (userInteracted) return; // abort if user grabs it
  
          const elapsed = now - (startTime as number);
          const t = Math.min(1, elapsed / duration);
  
          const easedRaw = easeOutBack(t);
          const eased = Math.max(0, Math.min(1, easedRaw));
  
          const value = start + (end - start) * eased;
          setPosition(value);
  
          if (t < 1) {
            frameId = requestAnimationFrame(animate);
          }
        };
  
        frameId = requestAnimationFrame(animate);
      };
  
      timeoutId = window.setTimeout(startAnimation, delay);
  
      return () => {
        if (timeoutId) window.clearTimeout(timeoutId);
        if (frameId) cancelAnimationFrame(frameId);
      };
    }, [autoPlay, userInteracted]);
  
    return (
      <div
        ref={wrapperRef}
        className="mx-auto w-full max-w-xs rounded-[2.5rem] border border-zinc-800 bg-zinc-950 p-2 shadow-xl shadow-black/40"
      >
        {/* top notch / speaker */}
        <div className="mx-auto mb-2 h-4 w-24 rounded-full bg-black/60" />
  
        {/* “screen” */}
      <div
    ref={containerRef}
    className="relative w-full aspect-[1/1.67] overflow-hidden rounded-3xl bg-black cursor-col-resize select-none touch-none"
  
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* OLD SITE — base */}
          <div className="absolute inset-0">
            <Image
              src="/naxoldmobile.jpg"
              alt="Naxco old website"
              fill
              priority
              className="object-contain"
              sizes="100vw"
              style={{ backgroundColor: "white" }}
            />
          </div>
  
          {/* NEW SITE — clipped to handle position */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src="/naxnewmobile.jpg"
              alt="Naxco refreshed website"
              fill
              priority
              className="object-contain"
              sizes="100vw"
              style={{ backgroundColor: "white" }}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-zinc-900/60 via-zinc-900/20 to-transparent" />
          </div>
  
          {/* HANDLE – line + pill, no text */}
          <div
            className="pointer-events-none absolute inset-y-6"
            style={{
              left: `calc(${position}% - 0.5px)`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="flex h-full items-center justify-center">
              <div className="relative flex h-full items-center">
                <div className="h-full w-[4px] rounded-full bg-white/80 shadow-[0_0_0_1px_rgba(15,23,42,0.7)]" />
                <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-lg shadow-black/40">
                  <span className="text-xs font-semibold text-zinc-900">
                    ⇆
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
