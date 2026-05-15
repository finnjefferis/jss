"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useReveal } from "../hooks/useReveal";

const PHRASES = [
  { noun: "Websites", verbs: ["last.", "convert.", "sell.", "win.", "pop."] },
  { noun: "Integrations", verbs: ["hum.", "click.", "stick.", "flow.", "sync.", "fit."] },
  { noun: "Software", verbs: ["fits.", "scales.", "ships.", "earns.", "thinks.", "pays."] },
];

const HERO_SITES = [
  { src: "/naxnew.png", alt: "Naxco website", label: "naxco.co.uk", href: "/work/naxco" },
  { src: "/edivertnew.png", alt: "eDivert website", label: "edivert.co.uk", href: "/work/edivert" },
  { src: "/dsoil.png", alt: "D&S Oil Tanks website", label: "dsoiltanks.co.uk", href: "/work/dsoil" },
  { src: "/ivyarch.png", alt: "Ivy Arch Studios website", label: "ivyarchstudios.co.uk", href: "/work/ivy" },
];

function BrowserFrame({ site, className = "", priority = false }: { site: typeof HERO_SITES[number]; className?: string; priority?: boolean }) {
  return (
    <Link href={site.href} className={`block group ${className}`}>
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 shadow-md overflow-hidden">
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
          <Image src={site.src} alt={site.alt} fill className="object-cover object-top" sizes="(max-width: 768px) 78vw, 400px" priority={priority} loading={priority ? "eager" : "lazy"} />
        </div>
      </div>
    </Link>
  );
}

function MobileHeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStartX = useRef(0);
  const isDragging = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
    isDragging.current = true;
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = e.clientX - pointerStartX.current;
    if (Math.abs(diff) > 30) {
      if (diff < 0 && activeIndex < HERO_SITES.length - 1) setActiveIndex(activeIndex + 1);
      if (diff > 0 && activeIndex > 0) setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <div
      className="relative touch-pan-y"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => { isDragging.current = false; }}
    >
      <div className="relative h-[320px] w-full overflow-visible">
        {HERO_SITES.map((site, i) => {
          const offset = i - activeIndex;
          const isActive = i === activeIndex;
          const angle = offset * 18;
          return (
            <div
              key={site.label}
              className="absolute left-1/2 bottom-0 w-[78vw] max-w-[320px] cursor-pointer transition-all duration-500 ease-out"
              style={{
                transformOrigin: "50% 350%",
                zIndex: isActive ? 30 : 20 - Math.abs(offset),
                transform: `translateX(-50%) rotate(${angle}deg) translateY(${isActive ? -14 : 0}px) scale(${isActive ? 1 : 0.88})`,
                opacity: isActive ? 1 : 0.5,
                willChange: "transform, opacity",
              }}
              onClick={() => setActiveIndex(i)}
            >
              <BrowserFrame site={site} priority={i === 0} />
              <p className={`mt-2 text-center text-[11px] font-medium transition-colors duration-300 ${isActive ? "text-zinc-600 dark:text-zinc-300" : "text-zinc-400 dark:text-zinc-500"}`}>
                {site.label}
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center gap-1.5 mt-4">
        {HERO_SITES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`View site ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? "w-6 bg-coral-600" : "w-1.5 bg-zinc-200 dark:bg-zinc-700"}`}
          />
        ))}
      </div>
    </div>
  );
}

const FAN_LAYOUTS: { x: number; y: number; rot: number; scale: number }[] = [
  { x: 0, y: 0, rot: 0, scale: 1 },           // depth 0 — front centre
  { x: 20, y: -120, rot: 5, scale: 0.92 },    // depth 1 — above
  { x: -20, y: 120, rot: -5, scale: 0.92 },   // depth 2 — below
  { x: -10, y: 8, rot: -2, scale: 0.82 },     // depth 3 — behind front
];

function HeroVisual() {
  const total = HERO_SITES.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const wheelLockRef = useRef(false);
  const desktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  // Native wheel listener with passive: false so we can preventDefault page scroll while cycling cards
  useEffect(() => {
    const el = desktopRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (wheelLockRef.current) return;
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 5) return;
      setActiveIndex((curr) => (curr + (delta > 0 ? 1 : -1) + total) % total);
      wheelLockRef.current = true;
      window.setTimeout(() => { wheelLockRef.current = false; }, 380);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [total]);

  return (
    <>
      {/* DESKTOP */}
      <div ref={desktopRef} className="hidden lg:block relative">
        <div className="absolute -inset-8 bg-gradient-to-tr from-coral-200/20 dark:from-coral-900/10 to-pink-200/20 dark:to-pink-900/10 rounded-3xl blur-xl -z-10" />
        <div className="relative aspect-[4/3]">
          {HERO_SITES.map((site, i) => {
            const depth = (i - activeIndex + total) % total;
            const isHovered = hoverIndex === i;
            const someoneElseHovered = hoverIndex !== null && hoverIndex !== i;

            const layout = FAN_LAYOUTS[Math.min(depth, FAN_LAYOUTS.length - 1)];
            const stackOpacity = Math.max(0.7, 1 - depth * 0.08);

            let transform: string;
            let opacity: number;
            let zIndex: number;

            if (!mounted) {
              transform = `translate(-50%, -50%) translateY(-180px) scale(0.92)`;
              opacity = 0;
              zIndex = total - depth;
            } else if (isHovered) {
              transform = `translate(-50%, -50%) scale(1.06)`;
              opacity = 1;
              zIndex = 100;
            } else if (someoneElseHovered) {
              const goUp = i % 2 === 0;
              const yPush = goUp ? -220 : 220;
              const xPush = goUp ? -50 : 50;
              const rotatePush = goUp ? -10 : 10;
              transform = `translate(-50%, -50%) translateX(${xPush}px) translateY(${yPush}px) rotate(${rotatePush}deg) scale(0.7)`;
              opacity = 0.35;
              zIndex = total - depth;
            } else {
              transform = `translate(-50%, -50%) translateX(${layout.x}px) translateY(${layout.y}px) rotate(${layout.rot}deg) scale(${layout.scale})`;
              opacity = stackOpacity;
              zIndex = 20 + (total - depth);
            }

            return (
              <div
                key={site.label}
                className="absolute top-1/2 left-1/2 w-[72%] transition-all duration-500 ease-out will-change-transform"
                style={{ transform, opacity, zIndex, transitionDelay: !mounted ? `${i * 90}ms` : undefined }}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <BrowserFrame site={site} />
              </div>
            );
          })}
        </div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden mt-4" data-reveal>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
          Some{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-600 to-pink-600" data-gradient>
            highlights.
          </span>
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">Real projects, real results.</p>
        <div className="relative">
          <MobileHeroCarousel />
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
            <span className="inline-flex items-center gap-1 text-coral-500/50 text-[10px] font-semibold uppercase tracking-wider">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              Swipe
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function RotatingPhrase() {
  const nounRef = useRef<HTMLSpanElement>(null);
  const verbRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let phraseIdx = 0;
    let nounIdx = 0;
    let verbIdx = 0;
    let deleting = false;
    const verbCounters = PHRASES.map(() => 0);
    let timer: ReturnType<typeof setTimeout>;

    function currentVerb() {
      const phrase = PHRASES[phraseIdx];
      return phrase.verbs[verbCounters[phraseIdx] % phrase.verbs.length];
    }

    function render() {
      const noun = PHRASES[phraseIdx].noun;
      const verb = currentVerb();
      if (nounRef.current) nounRef.current.textContent = noun.slice(0, nounIdx);
      if (verbRef.current) verbRef.current.textContent = verb.slice(0, verbIdx);
    }

    function tick() {
      const noun = PHRASES[phraseIdx].noun;
      const verb = currentVerb();

      if (deleting) {
        if (nounIdx > 0) nounIdx--;
        if (verbIdx > 0) verbIdx--;
        if (nounIdx === 0 && verbIdx === 0) {
          deleting = false;
          verbCounters[phraseIdx] = (verbCounters[phraseIdx] + 1) % PHRASES[phraseIdx].verbs.length;
          phraseIdx = (phraseIdx + 1) % PHRASES.length;
          render();
          timer = setTimeout(tick, 250);
          return;
        }
      } else {
        if (nounIdx < noun.length) nounIdx++;
        if (verbIdx < verb.length) verbIdx++;
        if (nounIdx === noun.length && verbIdx === verb.length) {
          render();
          timer = setTimeout(() => { deleting = true; tick(); }, 2000);
          return;
        }
      }

      render();
      timer = setTimeout(tick, deleting ? 40 : 90);
    }

    tick();
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <span className="inline-grid align-baseline">
        {PHRASES.map((p, i) => (
          <span key={`n${i}`} aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
            {p.noun}|
          </span>
        ))}
        <span className="col-start-1 row-start-1 whitespace-nowrap">
          <span ref={nounRef} />
          <span className="animate-pulse text-coral-400 dark:text-coral-500">|</span>
        </span>
      </span>
      <br />
      <span className="inline-flex items-baseline whitespace-nowrap">
        <span>that&nbsp;</span>
        <span className="inline-grid align-baseline">
          {PHRASES.flatMap((p, i) =>
            p.verbs.map((v, j) => (
              <span key={`v${i}-${j}`} aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
                {v}|
              </span>
            ))
          )}
          <span className="col-start-1 row-start-1 whitespace-nowrap">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-500 to-pink-500">
              <span ref={verbRef} />
            </span>
            <span className="animate-pulse text-coral-400 dark:text-coral-500">|</span>
          </span>
        </span>
      </span>
    </>
  );
}

function ScrollArrow() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <button
      onClick={() => {
        const next = document.getElementById("about");
        if (next) next.scrollIntoView({ behavior: "smooth" });
      }}
      aria-label="Scroll to next section"
      className={`
        absolute bottom-10 left-1/2 -translate-x-1/2 z-20
        flex items-center justify-center h-10 w-10 rounded-full
        border border-coral-200 dark:border-coral-800
        bg-gradient-to-br from-coral-500 to-pink-500
        hover:from-coral-600 hover:to-pink-600
        shadow-lg shadow-coral-500/20
        animate-bounce
        transition-[opacity,transform] duration-300
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      style={{ transitionDuration: "800ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <svg
        className="h-4 w-4 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

export function HeroSection() {
  const sectionRef = useReveal<HTMLElement>(0.1);

  return (
    <section ref={sectionRef} className="relative pt-10 pb-40 md:pb-48 md:pt-28 lg:pt-36 lg:pb-56 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-coral-500/5 dark:bg-coral-500/3 rounded-full blur-xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-pink-500/5 dark:bg-pink-500/3 rounded-full blur-xl" />
      </div>

      <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — Text */}
          <div>
            <p data-reveal style={{ "--d": 50 } as React.CSSProperties} className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400">
              Websites · Integrations · Bespoke Software · UK
            </p>
            <h1 data-reveal style={{ "--d": 180, "--reveal-y": "16px" } as React.CSSProperties} className="text-5xl font-black leading-[1.08] tracking-tight text-zinc-900 dark:text-white sm:text-6xl lg:text-7xl">
              <RotatingPhrase />
            </h1>
            <p data-reveal style={{ "--d": 310 } as React.CSSProperties} className="mt-6 text-lg text-zinc-500 dark:text-zinc-400 md:text-xl max-w-xl">
              Your website should be winning you clients. If it isn&apos;t, we&apos;ll fix that.
            </p>
            <div data-reveal style={{ "--d": 440 } as React.CSSProperties} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl bg-coral-600 px-8 py-4 text-sm font-bold text-white shadow-md transition-colors hover:bg-coral-700"
              >
                See packages &amp; pricing
              </a>
              <a
                href="#recent-work"
                className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-coral-600 dark:hover:text-coral-400 transition-colors"
              >
                See recent work &rarr;
              </a>
            </div>
          </div>

          {/* RIGHT — Visual */}
          <div>
            <HeroVisual />
          </div>

        </div>
      </div>

      <ScrollArrow />
    </section>
  );
}
