"use client";

import { Check, ArrowRight, Zap, TrendingUp, Star, Globe } from "lucide-react";

const DIFFERENTIATORS = [
  {
    title: "One person, start to finish",
    text: "No agencies. No account managers. You deal directly with the person building your site.",
  },
  {
    title: "Built to convert, not just look pretty",
    text: "Every decision drives enquiries. Fast load times, clear calls to action, mobile-first.",
  },
  {
    title: "Real results you can measure",
    text: "Traffic, rankings, speed, enquiries — you see exactly how your site performs.",
  },
];

const METRICS = [
  { icon: Zap, value: "98", label: "PageSpeed score", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-950", delay: "0s" },
  { icon: Star, value: "5.0", label: "Google rating", color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-950", delay: "1.2s" },
  { icon: TrendingUp, value: "3x", label: "More enquiries", color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-100 dark:bg-indigo-950", delay: "0.6s" },
  { icon: Globe, value: "<1s", label: "Load time", color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-100 dark:bg-violet-950", delay: "1.8s" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white dark:bg-zinc-950 transition-colors">
      <div className="mx-auto max-w-6xl px-5 md:px-8">

        {/* Eyebrow */}
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 lg:text-center">
          Who we are
        </p>

        {/* Title — reverted */}
        <h2 className="text-2xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 md:text-4xl lg:text-[3.25rem] lg:leading-[1.15] mb-6 text-left lg:text-center max-w-3xl lg:mx-auto">
          Brilliant at what you do?
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
            Your website should be too.
          </span>
        </h2>

        {/* Copy */}
        <p className="max-w-2xl lg:mx-auto text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-14 text-left lg:text-center">
          A great website does the heavy lifting for you. It builds trust before the first
          conversation, works flawlessly on any device, and makes getting in touch feel effortless.
          Less friction, more enquiries, more growth.
        </p>

        {/* Floating metrics composition — centred */}
        <div className="relative h-[280px] md:h-[320px] max-w-md mx-auto mb-14">
          <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-100 dark:from-indigo-950/40 to-violet-100 dark:to-violet-950/40 rounded-3xl blur-2xl opacity-60 -z-10" />

          {/* Mini browser mockup */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] max-w-[240px]">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden">
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
                <div className="h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 w-2/5 mt-3" />
                <div className="h-2 rounded bg-zinc-100 dark:bg-zinc-800 w-full mt-2" />
                <div className="h-2 rounded bg-zinc-100 dark:bg-zinc-800 w-5/6" />
              </div>
            </div>
          </div>

          {/* Floating metric cards */}
          {METRICS.map((m, i) => {
            const positions = [
              "top-2 left-0",
              "top-4 right-0",
              "bottom-8 -left-2",
              "bottom-2 right-0",
            ];
            return (
              <div
                key={m.label}
                className={`absolute ${positions[i]} animate-[float_5s_ease-in-out_infinite] rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-lg px-3 py-2.5 flex items-center gap-2`}
                style={{ animationDelay: m.delay }}
              >
                <div className={`h-8 w-8 rounded-lg ${m.bg} flex items-center justify-center`}>
                  <m.icon className={`h-4 w-4 ${m.color}`} />
                </div>
                <div>
                  <p className={`text-lg font-bold leading-none ${m.color}`}>{m.value}</p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{m.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Differentiators row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {DIFFERENTIATORS.map((item) => (
            <div key={item.title} className="flex gap-3">
              <div className="mt-1 h-5 w-5 shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center">
                <Check className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
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
            href="https://wa.me/447887034503?text=Hi%20Finn%2C%20I'd%20like%20a%20FREE%20website%20audit."
            className="group inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            Get a free website audit
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
