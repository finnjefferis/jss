"use client";

import { Check, ArrowRight } from "lucide-react";

const DIFFERENTIATORS = [
  {
    title: "One person, start to finish",
    text: "No agencies. No account managers. You deal directly with the person designing and building your site.",
  },
  {
    title: "Built to convert, not just look pretty",
    text: "Every design decision is made to drive enquiries. Fast load times, clear calls to action, mobile-first.",
  },
  {
    title: "Real results you can measure",
    text: "You get data showing exactly how your site is performing — traffic, rankings, speed, and enquiries.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white dark:bg-zinc-950 transition-colors">
      <div className="mx-auto max-w-6xl px-5 md:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — Copy */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
              Who I am
            </p>
            <h2 className="text-3xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 md:text-4xl lg:text-5xl mb-6">
              You&apos;re brilliant at what you do.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                Your website should be too.
              </span>
            </h2>

            <div className="space-y-4 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
              <p>
                Most small businesses lose customers before anyone even picks up the phone. The site loads slowly, looks
                dated, or doesn&apos;t exist at all. Meanwhile the competitor down the road — the one with the clean,
                modern site — gets the call instead.
              </p>
              <p>
                I&apos;m Finlay, the person behind Jefferis Software Solutions. I build websites that work as hard as
                you do: fast, professional, and designed to turn visitors into paying customers.
              </p>
            </div>

            {/* Differentiators */}
            <div className="space-y-4 mb-8">
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

            <a
              href="https://wa.me/447887034503?text=Hi%20Finn%2C%20I'd%20like%20a%20FREE%20website%20audit."
              className="group inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              Get a free website audit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* RIGHT — Photo + Stats */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-100 dark:from-indigo-950/40 to-violet-100 dark:to-violet-950/40 rounded-3xl blur-2xl opacity-60 -z-10" />

            {/* Photo placeholder */}
            <div className="w-full mb-8">
              <div className="w-full h-64 md:h-72 overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-800 shadow-xl" />
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "20+", label: "Sites built" },
                { value: "5+", label: "Years exp." },
                { value: "100%", label: "Direct contact" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 p-4 text-center">
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{stat.value}</p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
