"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ArrowRight, Zap, TrendingUp, Star, Globe } from "lucide-react";

const DIFFERENTIATORS = [
  {
    title: "You talk to the person building your site",
    text: "No agencies, no account managers, no handoffs. Just one person who knows your project inside out.",
  },
  {
    title: "Every decision is made to win you clients",
    text: "Fast load times, clear calls to action, mobile-first. Good-looking is a bonus. Converting is the goal.",
  },
  {
    title: "You'll know exactly how it's performing",
    text: "Traffic, rankings, speed, enquiries. No guesswork — real numbers that tell you what's working.",
  },
];

const METRICS = [
  { icon: Zap, value: "98", label: "PageSpeed score", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-950", delay: "0s" },
  { icon: Star, value: "5.0", label: "Google rating", color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-950", delay: "1.2s" },
  { icon: TrendingUp, value: "3x", label: "More enquiries", color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-100 dark:bg-rose-950", delay: "0.6s" },
  { icon: Globe, value: "<1s", label: "Load time", color: "text-pink-600 dark:text-pink-400", bg: "bg-pink-100 dark:bg-pink-950", delay: "1.8s" },
];

// Each card's final position class + the translate offset that brings it back to center
const CARD_CONFIG = [
  { pos: "top-2 left-0",     dx: "80px",  dy: "70px"  },
  { pos: "top-4 right-0",    dx: "-80px", dy: "70px"  },
  { pos: "bottom-8 -left-2", dx: "80px",  dy: "-70px" },
  { pos: "bottom-2 right-0", dx: "-80px", dy: "-70px" },
];

function MetricsVisual() {
  const [swooped, setSwooped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setSwooped(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-[280px] md:h-[320px] max-w-md mx-auto mb-14">
      <div className="absolute -inset-4 bg-gradient-to-tr from-rose-100 dark:from-rose-950/40 to-pink-100 dark:to-pink-950/40 rounded-3xl blur-2xl opacity-60 -z-10" />

      {/* Mini browser mockup — the "behind" element, sits at z-10 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] max-w-[240px] z-10">
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 shadow-2xl overflow-hidden">
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <div className="ml-2 flex-1">
              <div className="h-3 rounded bg-zinc-100 dark:bg-zinc-700 w-3/5" />
            </div>
          </div>
          <div className="p-4 space-y-2.5">
            <div className="h-3 rounded bg-zinc-100 dark:bg-zinc-800 w-4/5" />
            <div className="h-2 rounded bg-zinc-100 dark:bg-zinc-800 w-full" />
            <div className="h-2 rounded bg-zinc-100 dark:bg-zinc-800 w-3/4" />
            <div className="h-8 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 w-2/5 mt-3" />
            <div className="h-2 rounded bg-zinc-100 dark:bg-zinc-800 w-full mt-2" />
            <div className="h-2 rounded bg-zinc-100 dark:bg-zinc-800 w-5/6" />
          </div>
        </div>
      </div>

      {/* Metric cards — start behind the browser (z-0, scaled to 0 at center), swoop out to z-20 */}
      {METRICS.map((m, i) => (
        <div
          key={m.label}
          className={`absolute ${CARD_CONFIG[i].pos} z-20 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl px-3 py-2.5 flex items-center gap-2`}
          style={{
            opacity: swooped ? 1 : 0,
            transform: swooped
              ? "translate(0, 0) scale(1)"
              : `translate(${CARD_CONFIG[i].dx}, ${CARD_CONFIG[i].dy}) scale(0.2)`,
            transition: `opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)`,
            transitionDelay: `${i * 100}ms`,
          }}
        >
          <div className={`h-8 w-8 rounded-lg ${m.bg} flex items-center justify-center`}>
            <m.icon className={`h-4 w-4 ${m.color}`} />
          </div>
          <div>
            <p className={`text-lg font-bold leading-none ${m.color}`}>{m.value}</p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{m.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <div className="mx-auto max-w-6xl px-5 md:px-8">

        {/* Eyebrow */}
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 lg:text-center">
          For people who take their work seriously
        </p>

        <h2 className="text-2xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 md:text-4xl lg:text-[3.25rem] lg:leading-[1.15] mb-6 text-left lg:text-center max-w-3xl lg:mx-auto">
          Brilliant at what you do?
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">
            Your website should say so.
          </span>
        </h2>

        {/* Copy */}
        <p className="max-w-2xl lg:mx-auto text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-14 text-left lg:text-center">
          You've earned your reputation. Your website should back it up. We build sites that make the
          right impression, win you clients before you've said a word, and keep working for you
          around the clock.
        </p>

        {/* Metrics composition */}
        <MetricsVisual />

        {/* Differentiators row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {DIFFERENTIATORS.map((item) => (
            <div key={item.title} className="flex gap-3">
              <div className="mt-1 h-5 w-5 shrink-0 rounded-full bg-rose-100 dark:bg-rose-950 flex items-center justify-center">
                <Check className="h-3 w-3 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{item.title}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#services"
            className="group inline-flex items-center gap-2 text-sm font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors"
          >
            See packages &amp; pricing
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
