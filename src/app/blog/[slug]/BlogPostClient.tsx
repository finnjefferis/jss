"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Animated hero background with floating SVG shapes ─── */
export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-coral-50 via-pink-50/50 to-transparent dark:from-coral-950/30 dark:via-pink-950/20 dark:to-transparent" />

      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-coral-200/30 via-transparent to-transparent dark:from-coral-800/15 rounded-full blur-3xl" />

      {/* Floating SVG orbs */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-coral" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-coral-400)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--color-pink-400)" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="grad-amber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="grad-pink" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--color-coral-500)" stopOpacity="0.05" />
          </linearGradient>

          {/* Noise filter for texture */}
          <filter id="blog-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.05" />
            </feComponentTransfer>
          </filter>
        </defs>

        {/* Large floating circle — slow drift */}
        <circle cx="15%" cy="25%" r="120" fill="url(#grad-coral)" className="blog-float-1" />

        {/* Medium circle — different rhythm */}
        <circle cx="80%" cy="20%" r="80" fill="url(#grad-amber)" className="blog-float-2" />

        {/* Small accent */}
        <circle cx="60%" cy="60%" r="50" fill="url(#grad-pink)" className="blog-float-3" />

        {/* Decorative rings */}
        <circle cx="25%" cy="70%" r="100" fill="none" stroke="var(--color-coral-300)" strokeWidth="0.5" strokeOpacity="0.15" className="blog-float-2" />
        <circle cx="75%" cy="45%" r="140" fill="none" stroke="var(--color-pink-300)" strokeWidth="0.5" strokeOpacity="0.1" className="blog-float-1" />

        {/* Subtle grid dots */}
        <pattern id="blog-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="0.8" fill="var(--color-coral-400)" fillOpacity="0.08" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#blog-dots)" opacity="0.5" />

        {/* Noise overlay */}
        <rect width="100%" height="100%" filter="url(#blog-noise)" opacity="0.3" />
      </svg>

      {/* Diagonal accent line */}
      <div className="absolute top-0 right-[20%] w-px h-[70%] bg-gradient-to-b from-transparent via-coral-300/20 to-transparent dark:via-coral-600/10 rotate-12 origin-top" />
      <div className="absolute top-[10%] left-[15%] w-px h-[50%] bg-gradient-to-b from-transparent via-pink-300/15 to-transparent dark:via-pink-600/10 -rotate-6 origin-top" />
    </div>
  );
}

/* ─── Inline divider SVG between sections ─── */
export function SectionDivider() {
  return (
    <div className="relative my-16 flex items-center justify-center">
      <svg width="200" height="24" viewBox="0 0 200 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-coral-300 dark:text-coral-700">
        <path d="M0 12h80" stroke="currentColor" strokeWidth="0.5" className="blog-line-draw" />
        <circle cx="100" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="0.75" className="blog-diamond-spin" />
        <circle cx="100" cy="12" r="1.5" fill="currentColor" opacity="0.5" />
        <path d="M120 12h80" stroke="currentColor" strokeWidth="0.5" className="blog-line-draw" />
      </svg>
    </div>
  );
}

/* ─── Scroll progress bar ─── */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH > 0) setProgress(window.scrollY / docH);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50">
      <div
        className="h-full bg-gradient-to-r from-coral-500 via-pink-500 to-amber-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

/* ─── Reading-time progress ring in corner ─── */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH > 0) setProgress(Math.min(window.scrollY / docH, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const circumference = 2 * Math.PI * 18;
  const offset = circumference - progress * circumference;
  const show = progress > 0.02 && progress < 0.98;

  return (
    <div
      className="fixed bottom-6 right-6 z-40 transition-all duration-500"
      style={{ opacity: show ? 1 : 0, transform: show ? "scale(1)" : "scale(0.8)" }}
    >
      <svg width="48" height="48" viewBox="0 0 48 48" className="drop-shadow-lg">
        <circle cx="24" cy="24" r="22" fill="white" fillOpacity="0.9" className="dark:fill-zinc-900" />
        <circle cx="24" cy="24" r="18" fill="none" stroke="var(--color-zinc-200)" strokeWidth="2.5" className="dark:stroke-zinc-700" />
        <circle
          cx="24" cy="24" r="18"
          fill="none"
          stroke="url(#progress-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 24 24)"
          className="transition-[stroke-dashoffset] duration-150 ease-out"
        />
        <defs>
          <linearGradient id="progress-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--color-coral-500)" />
            <stop offset="1" stopColor="var(--color-pink-500)" />
          </linearGradient>
        </defs>
        <text x="24" y="26" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--color-coral-600)" className="dark:fill-coral-400">
          {Math.round(progress * 100)}%
        </text>
      </svg>
    </div>
  );
}

/* ─── Animated entry wrapper for content blocks ─── */
export function AnimatedContent({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("blog-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    // Observe each direct child (h2, p, ul, etc.)
    const children = container.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      child.classList.add("blog-content-enter");
      child.style.setProperty("--blog-d", `${i * 60}ms`);
      observer.observe(child);
    }

    return () => observer.disconnect();
  }, [html]);

  return (
    <div
      ref={containerRef}
      className="prose prose-zinc dark:prose-invert max-w-none
        [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-zinc-900 dark:[&>h2]:text-zinc-100
        [&>h2]:mt-14 [&>h2]:mb-5 [&>h2]:relative
        [&>h2]:before:absolute [&>h2]:before:-left-5 [&>h2]:before:top-0 [&>h2]:before:bottom-0
        [&>h2]:before:w-[3px] [&>h2]:before:rounded-full
        [&>h2]:before:bg-gradient-to-b [&>h2]:before:from-coral-500 [&>h2]:before:to-pink-500
        [&>p]:text-zinc-600 dark:[&>p]:text-zinc-400 [&>p]:leading-[1.85] [&>p]:mb-5 [&>p]:text-[1.05rem]
        [&>p>a]:text-coral-600 dark:[&>p>a]:text-coral-400 [&>p>a]:font-medium [&>p>a]:underline [&>p>a]:underline-offset-2 [&>p>a]:decoration-coral-300 dark:[&>p>a]:decoration-coral-700 [&>p>a]:transition-colors [&>p>a:hover]:text-coral-700 dark:[&>p>a:hover]:text-coral-300
        [&>p>em]:text-zinc-500 dark:[&>p>em]:text-zinc-500 [&>p>em]:not-italic [&>p>em]:font-medium"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/* ─── Animated header entry ─── */
export function AnimatedHeader({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      ref={ref}
      className="transition-all duration-1000 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
      }}
    >
      {children}
    </div>
  );
}

/* ─── Pull-quote component for visual variety ─── */
export function PullQuote({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative my-16 py-10 px-8 md:px-12 transition-all duration-700"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)" }}
    >
      {/* Background shape */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-coral-50 to-pink-50 dark:from-coral-950/40 dark:to-pink-950/30 -z-10" />
      <div className="absolute inset-0 rounded-2xl border border-coral-200/50 dark:border-coral-800/30 -z-10" />

      {/* Quote mark SVG */}
      <svg className="absolute -top-4 left-6 w-10 h-10 text-coral-300 dark:text-coral-700" viewBox="0 0 40 40" fill="currentColor">
        <path d="M10 25c0-5 4-10 9-13l2 3c-4 2-6 5-6 8h5v10H10V25zm16 0c0-5 4-10 9-13l2 3c-4 2-6 5-6 8h5v10H26V25z" />
      </svg>

      <p className="text-xl md:text-2xl font-bold leading-relaxed text-zinc-800 dark:text-zinc-200 text-center italic">
        {text}
      </p>
    </div>
  );
}
