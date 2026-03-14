"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { animate, stagger } from "animejs";

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

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof FAQS[0]; isOpen: boolean; onToggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (isOpen) {
      el.style.display = "block";
      const h = el.scrollHeight;
      animate(el, { height: [0, h], opacity: [0, 1], duration: 400, ease: "outExpo" });
      if (chevronRef.current) {
        animate(chevronRef.current, { rotate: "180deg", duration: 300, ease: "outExpo" });
      }
    } else {
      animate(el, {
        height: [el.scrollHeight, 0],
        opacity: [1, 0],
        duration: 300,
        ease: "inQuart",
      });
      if (chevronRef.current) {
        animate(chevronRef.current, { rotate: "0deg", duration: 300, ease: "outExpo" });
      }
    }
  }, [isOpen]);

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
          ref={chevronRef}
          className={`h-4 w-4 shrink-0 ${isOpen ? "text-coral-600" : "text-zinc-400"}`}
        />
      </button>
      <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0, display: "none" }}>
        <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-triggered entrance
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          obs.disconnect();

          const reveals = el.querySelectorAll("[data-reveal]");
          animate(reveals, {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600,
            ease: "outExpo",
            delay: stagger(80),
          });

          const gradients = el.querySelectorAll("[data-gradient]");
          if (gradients.length) {
            animate(gradients, {
              scale: [0.9, 1],
              opacity: [0, 1],
              duration: 500,
              ease: "outBack",
              delay: stagger(60, { start: 300 }),
            });
          }
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="py-16 md:py-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-10">
          <p data-reveal style={{ opacity: 0 }} className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
            Got questions?
          </p>
          <h2 data-reveal style={{ opacity: 0 }} className="text-3xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 md:text-4xl">
            Straight{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-600 to-pink-600 inline-block" data-gradient style={{ opacity: 0 }}>
              answers.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {FAQS.map((faq, i) => (
            <div key={i} data-reveal style={{ opacity: 0 }}>
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
