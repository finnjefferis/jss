"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const FAQS = [
  {
    q: "How much does a website cost?",
    a: "Plans start from £39/mo and include everything — design, build, hosting, and support. No upfront cost, no hidden fees. We'll work within your budget.",
  },
  {
    q: "How long does it take to build?",
    a: "Most websites are live within 2–4 weeks from kickoff. Larger projects or bespoke software can take a bit longer. I'll give you a clear timeline before we start.",
  },
  {
    q: "Will I be able to update the site myself?",
    a: "Absolutely. If you need to make regular updates, I'll build in a content management system (CMS) so you can edit text, swap images, and add pages without touching any code.",
  },
  {
    q: "Do you handle hosting and domains?",
    a: "Yes. I can set up and manage your hosting, domain, and email so you don't have to worry about the technical side. Everything stays in your name. You always own it.",
  },
  {
    q: "What if I don't like the design?",
    a: "You'll see the design before anything goes live and get revision rounds included in every project. I work closely with you throughout, so there are no big surprises at the end.",
  },
  {
    q: "I already have a website. Can you just improve it?",
    a: "Of course. Website refreshes are one of my most popular services. I'll audit what you have, identify what's not working, and give it a modern overhaul that actually converts visitors into customers.",
  },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof FAQS[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className={`rounded-2xl border-2 cursor-pointer transition-colors ${isOpen ? "border-coral-500 dark:border-coral-500 bg-zinc-50 dark:bg-zinc-900 shadow-lg shadow-coral-500/10" : "border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md"}`}
      onClick={onToggle}
    >
      <button className="flex w-full items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 text-left">
        <span className={`text-sm font-semibold transition-colors ${isOpen ? "text-coral-600 dark:text-coral-400" : "text-zinc-900 dark:text-zinc-100"}`}>
          {faq.q}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 faq-chevron ${isOpen ? "open text-coral-600" : "text-zinc-400"}`}
        />
      </button>
      <div className={`faq-content ${isOpen ? "open" : ""}`}>
        <div>
          <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useReveal<HTMLElement>(0.15);

  return (
    <section ref={sectionRef} id="faq" className="py-16 md:py-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-10">
          <p data-reveal style={{ "--d": 0 } as React.CSSProperties} className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
            Got questions?
          </p>
          <h2 data-reveal style={{ "--d": 80 } as React.CSSProperties} className="text-3xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 md:text-4xl">
            Straight{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-600 to-pink-600 inline-block" data-gradient style={{ "--gd": 300 } as React.CSSProperties}>
              answers.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {FAQS.map((faq, i) => (
            <div key={i} data-reveal style={{ "--d": i * 80 } as React.CSSProperties}>
              <FAQItem
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
