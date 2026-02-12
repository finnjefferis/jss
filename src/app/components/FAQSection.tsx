"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How much does a website cost?",
    a: "Every project is different, but most small business websites start from around £500. You'll get a fixed quote upfront after a quick chat. No surprises, no hidden fees. I'll always work within your budget.",
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

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 md:py-24 bg-zinc-50/50 dark:bg-zinc-900/30">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-10">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Got questions?
          </p>
          <h2 className="text-3xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 md:text-4xl">
            Straight{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              answers.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border-2 transition-all cursor-pointer ${isOpen ? "border-indigo-500 dark:border-indigo-500 bg-white dark:bg-zinc-900 shadow-lg shadow-indigo-500/10" : "border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md"}`}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <button
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 text-left"
                >
                  <span className={`text-sm font-semibold transition-colors ${isOpen ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-900 dark:text-zinc-100"}`}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-all duration-300 ${isOpen ? "rotate-180 text-indigo-600" : "text-zinc-400"}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
