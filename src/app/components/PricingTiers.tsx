"use client";

import Link from "next/link";
import Image from "next/image";
import { Quote } from "lucide-react";
import {
  Check, ArrowRight, Zap, BarChart3, ShoppingBag, Cpu, ChevronDown, RotateCcw,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useReveal } from "../hooks/useReveal";

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return mobile;
}

/* ─── Package data ─── */

const TIERS = [
  {
    id: "starter",
    name: "Starter",
    price: "£489",
    tagline: "+ £21/mo hosting & support",
    description: "A clean, professional site built and hosted — one fixed build fee, then a low monthly fee to keep it running.",
    Icon: Zap,
    features: [
      "Site design & build included",
      "Mobile-first design",
      "Contact form",
      "Basic SEO setup",
      "Google Business setup",
      "Hosting, SSL & daily backups",
    ],
    fullFeatures: [
      "Site design & build included",
      "Mobile-first design",
      "Contact form",
      "Basic SEO setup",
      "Google Business setup",
      "Hosting, SSL & daily backups",
    ],
    cta: "Get started",
    highlight: false,
    note: "",
    example: {
      clientName: "Naxco Services",
      clientType: "Property maintenance",
      image: "/naxnew.png",
      slug: "naxco",
      quote: "JSS have done a great job at updating my website. I have asked them to manage the social media also. Good service.",
      reviewer: "Karl Couling, Naxco Services",
    },
  },
  {
    id: "business",
    name: "CMS",
    price: "£989",
    tagline: "+ £21/mo hosting & support",
    description: "A professional site you can actually keep up to date — with a CMS, blog, and priority support.",
    Icon: BarChart3,
    features: [
      "Everything in Starter",
      "CMS access (edit your content)",
      "Blog / news section",
      "Full SEO setup",
      "Recorded training session",
      "Priority support",
    ],
    fullFeatures: [
      "Site design & build included",
      "Mobile-first design",
      "Contact form",
      "Full SEO setup",
      "Google Business setup",
      "CMS access (edit your content)",
      "Blog / news section",
      "Recorded training session",
      "Priority support",
      "Hosting, SSL & daily backups",
    ],
    cta: "Get started",
    highlight: true,
    note: "Most popular",
    example: {
      clientName: "eDivert",
      clientType: "Virtual assistant services",
      image: "/edivertnew.png",
      slug: "edivert",
      quote: "Working with Finlay and the Team at Jefferis Software this past few weeks has been a great experience. From our first meeting I felt Finlay understood what we are trying to achieve and whilst he followed the brief, he also added valuable suggestions that have enhanced our site both in web browser and especially on smart phones. The project completed on time and to budget - also a great win for us. I highly recommend the Jefferis Software team for your future website developments.",
      reviewer: "Stewart Dunne",
    },
  },
  {
    id: "commerce",
    name: "Commerce",
    price: "£1,999+",
    tagline: "+ £99/mo hosting & support",
    description: "A full online store with payments, product management, and a CMS — built to your spec.",
    Icon: ShoppingBag,
    features: [
      "Everything in CMS",
      "E-commerce setup",
      "Stripe payment integration",
      "Product management",
      "Order confirmations",
      "Ongoing support",
    ],
    fullFeatures: [
      "Site design & build included",
      "Mobile-first design",
      "Full SEO setup",
      "CMS access",
      "Blog / news section",
      "E-commerce setup",
      "Stripe payment integration",
      "Product management",
      "Order confirmations",
      "Hosting, SSL & daily backups",
    ],
    cta: "Discuss your store",
    highlight: false,
    note: "Price varies by scope.",
    example: {
      clientName: "Ivy Arch Studios",
      clientType: "Practice room hire",
      image: "/ivyarch.png",
      slug: "ivy",
      quote: "Good work quickly done diligently and effectively.",
      reviewer: "Ivy Arch Studios",
    },
  },
];

/* ─── Quiz data ─── */

type Step = "website" | "business" | "content" | "growth" | "result" | "managed";

const QUESTIONS: {
  step: Step;
  question: string;
  options: { value: string; label: string; sub: string }[];
}[] = [
  {
    step: "website",
    question: "Do you have a website right now?",
    options: [
      { value: "none", label: "No website", sub: "Starting from scratch." },
      { value: "bad", label: "Yes, but it\u2019s bad", sub: "Outdated, broken, or embarrassing." },
      { value: "decent", label: "It\u2019s fine, just need it looked after", sub: "I want someone to host, maintain, and keep it running." },
    ],
  },
  {
    step: "business",
    question: "What does your business do?",
    options: [
      { value: "services", label: "I offer services", sub: "Plumbing, cleaning, personal training, consulting, etc." },
      { value: "products", label: "I sell products", sub: "Physical or digital products, online shop." },
      { value: "both", label: "Both", sub: "Services and products." },
    ],
  },
  {
    step: "content",
    question: "Will you need to update your site content?",
    options: [
      { value: "often", label: "Yes, regularly", sub: "Blog posts, new services, price changes." },
      { value: "sometimes", label: "Occasionally", sub: "A few times a year." },
      { value: "never", label: "Set it and forget it", sub: "Just need it to look good and stay online." },
    ],
  },
  {
    step: "growth",
    question: "What matters most to you right now?",
    options: [
      { value: "just-online", label: "Just get me online", sub: "I need a website. That\u2019s the priority." },
      { value: "more-customers", label: "I want more customers", sub: "I need people to actually find me." },
      { value: "serious-growth", label: "I want serious growth", sub: "Full marketing. Leads on autopilot." },
    ],
  },
];

type Answers = Record<string, string>;

type Recommendation = {
  tier: typeof TIERS[0];
  reason: string;
};

function getRecommendation(answers: Answers): { primary: Recommendation } {
  const { business, content } = answers;

  let tierIdx = 0;
  if (business === "products" || business === "both") tierIdx = 2;
  else if (content === "often" || content === "sometimes") tierIdx = 1;

  const reasons: Record<number, string> = {
    0: "Get online fast with a professional site. Clean, simple, done — one monthly fee covers everything.",
    1: "A site you can actually keep up to date, with a CMS and blog built in. Perfect for growing organically.",
    2: "A full online store with payments and product management, all included in your monthly fee.",
  };

  return {
    primary: { tier: TIERS[tierIdx], reason: reasons[tierIdx] },
  };
}

/* ─── Quiz component ─── */

function PackageQuiz() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"question" | "result">("question");
  const [locked, setLocked] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [exiting, setExiting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const totalSteps = QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const progress = phase === "result" ? 1 : answeredCount / totalSteps;

  const currentQuestion = QUESTIONS[step];

  const hasInteracted = useRef(false);

  const scrollToQuiz = useCallback(() => {
    if (hasInteracted.current) {
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  function pickAnswer(value: string) {
    if (locked || !currentQuestion) return;
    hasInteracted.current = true;
    setLocked(true);
    setExiting(true);

    const next = { ...answers, [currentQuestion.step]: value };
    setAnswers(next);

    setTimeout(() => {
      setExiting(false);
      if (step < QUESTIONS.length - 1) {
        setStep(step + 1);
      } else {
        setPhase("result");
      }
      setAnimKey((k) => k + 1);
      setLocked(false);
      scrollToQuiz();
    }, 280);
  }

  function goBack() {
    if (locked || step === 0) return;
    setLocked(true);
    setExiting(true);

    setTimeout(() => {
      setExiting(false);
      setStep(step - 1);
      setAnimKey((k) => k + 1);
      setLocked(false);
    }, 280);
  }

  function reset() {
    if (locked) return;
    setLocked(true);
    setExiting(true);

    setTimeout(() => {
      setExiting(false);
      setAnswers({});
      setStep(0);
      setPhase("question");
      setAnimKey((k) => k + 1);
      setLocked(false);
    }, 350);
  }

  const result = phase === "result" ? getRecommendation(answers) : null;

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-b from-coral-500/10 via-pink-500/5 to-transparent blur-xl" />

      <div
        ref={containerRef}
        className="relative rounded-3xl border border-coral-200 dark:border-coral-900/40 bg-gradient-to-b from-white via-white to-coral-50/50 dark:from-zinc-950 dark:via-zinc-950 dark:to-coral-950/20 shadow-lg overflow-visible"
      >
        {/* Progress bar */}
        <div className="h-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-t-3xl overflow-hidden">
          <div
            className="h-full rounded-r-full progress-fill"
            style={{
              width: `${progress * 100}%`,
              background: phase === "result"
                ? "linear-gradient(90deg, #10b981, #34d399)"
                : "linear-gradient(90deg, #F97066, #FB923C)",
            }}
          />
        </div>

        <div className="p-6 md:p-10 min-h-[340px]">

          {/* ── Questions ── */}
          {phase === "question" && currentQuestion && (
            <div key={animKey}>
              <div
                className={exiting ? "quiz-exit" : "quiz-enter"}
                style={{ "--d": 0 } as React.CSSProperties}
              >
                <div className="text-center">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-coral-400 mb-3">
                    Question {step + 1} of {QUESTIONS.length}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white mb-8 leading-tight">
                    {currentQuestion.question}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentQuestion.options.map((opt, i) => (
                  <button
                    key={opt.value}
                    onClick={() => pickAnswer(opt.value)}
                    className={`group text-left rounded-2xl border p-5 active:scale-[0.97] transition-all duration-200 hover:scale-[1.03] hover:-translate-y-0.5 ${exiting ? "quiz-exit" : "quiz-enter"}
                      ${answers[currentQuestion.step] === opt.value
                        ? "border-coral-500 bg-coral-500/10"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-coral-300 dark:hover:border-coral-700"
                      }`}
                    style={{ "--d": exiting ? i * 30 : 120 + i * 70 } as React.CSSProperties}
                  >
                    <p className={`text-sm font-bold mb-1.5 transition-colors ${
                      answers[currentQuestion.step] === opt.value
                        ? "text-coral-500"
                        : "text-zinc-800 dark:text-zinc-100 group-hover:text-zinc-900 dark:group-hover:text-white"
                    }`}>
                      {opt.label}
                    </p>
                    <p className="text-xs text-zinc-500 leading-relaxed">{opt.sub}</p>
                  </button>
                ))}
              </div>

              {step > 0 && (
                <button
                  onClick={goBack}
                  className="mt-5 mx-auto flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <ArrowRight className="h-3.5 w-3.5 rotate-180" />
                  Back
                </button>
              )}
            </div>
          )}

          {/* ── Result ── */}
          {phase === "result" && result && (
            <div key={`result-${animKey}`}>
              <div className="text-center">
                <div className={exiting ? "quiz-exit" : "quiz-enter"} style={{ "--d": 0 } as React.CSSProperties}>
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 mb-6">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Recommended for you</span>
                  </div>
                </div>
              </div>

              <h3 className={`text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white mb-2 text-center ${exiting ? "quiz-exit" : "quiz-enter"}`} style={{ "--d": 80 } as React.CSSProperties}>
                {result.primary.tier.name} plan
              </h3>
              <p className={`text-sm text-zinc-500 dark:text-zinc-400 mb-8 max-w-lg mx-auto text-center ${exiting ? "quiz-exit" : "quiz-enter"}`} style={{ "--d": 160 } as React.CSSProperties}>
                {result.primary.reason}
              </p>

              <div className={`mb-6 ${exiting ? "quiz-exit" : "quiz-enter"}`} style={{ "--d": 240 } as React.CSSProperties}>
                <ResultCard>
                  {(active) => {
                    const TierIcon = result.primary.tier.Icon;
                    const ex = result.primary.tier.example;
                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        {/* Left: tier details */}
                        <div className="p-0 md:pr-8 md:border-r border-white/20 flex flex-col">
                          <div className="flex items-center gap-3 mb-5">
                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${active ? "bg-white/20" : "bg-gradient-to-br from-coral-500 to-pink-500"}`}>
                              <TierIcon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${active ? "text-white/60" : "text-coral-500 dark:text-coral-400"}`}>{result.primary.tier.name}</p>
                              <p className={`text-2xl font-extrabold leading-none transition-colors duration-300 ${active ? "text-white" : "text-zinc-900 dark:text-white"}`}>{result.primary.tier.price}</p>
                            </div>
                          </div>
                          <p className={`text-sm leading-relaxed mb-5 transition-colors duration-300 ${active ? "text-white/80" : "text-zinc-500 dark:text-zinc-400"}`}>{result.primary.tier.description}</p>
                          <div className={`h-px w-full mb-5 transition-colors duration-300 ${active ? "bg-white/20" : "bg-zinc-100 dark:bg-zinc-800"}`} />
                          <ul className="flex-1 space-y-2.5">
                            {result.primary.tier.fullFeatures.map((f: string) => (
                              <li key={f} className="flex items-start gap-2.5 text-sm">
                                <Check className={`h-4 w-4 shrink-0 mt-0.5 transition-colors duration-300 ${active ? "text-coral-200" : "text-coral-500"}`} />
                                <span className={`transition-colors duration-300 ${active ? "text-white/90" : "text-zinc-600 dark:text-zinc-300"}`}>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Right: real example */}
                        <div className={`mt-6 md:mt-0 md:pl-8 flex flex-col gap-4`}>
                          <p className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${active ? "text-white/50" : "text-zinc-400"}`}>Real example</p>
                          <Link href={`/work/${ex.slug}`} className="group block rounded-xl overflow-hidden border border-white/10 shadow-md">
                            <div className="relative aspect-[4/3] w-full bg-zinc-200 dark:bg-zinc-800">
                              <Image src={ex.image} alt={ex.clientName} fill className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500" />
                            </div>
                          </Link>
                          <div>
                            <p className={`text-xs font-bold transition-colors duration-300 ${active ? "text-white/60" : "text-zinc-400"}`}>{ex.clientType}</p>
                            <p className={`text-sm font-bold transition-colors duration-300 ${active ? "text-white" : "text-zinc-800 dark:text-zinc-100"}`}>{ex.clientName}</p>
                          </div>
                          <div className={`rounded-xl p-4 transition-colors duration-300 ${active ? "bg-white/10" : "bg-coral-50 dark:bg-coral-950/40 border border-coral-100 dark:border-coral-900"}`}>
                            <Quote className={`h-4 w-4 mb-2 transition-colors duration-300 ${active ? "text-white/30" : "text-coral-300"}`} />
                            <p className={`text-xs italic leading-relaxed mb-2 transition-colors duration-300 ${active ? "text-white/80" : "text-zinc-600 dark:text-zinc-300"}`}>&ldquo;{ex.quote}&rdquo;</p>
                            <p className={`text-[10px] font-bold transition-colors duration-300 ${active ? "text-white/50" : "text-coral-500 dark:text-coral-400"}`}>&mdash; {ex.reviewer}</p>
                          </div>
                          <Link href={`/work/${ex.slug}`} className={`inline-flex items-center gap-1.5 text-xs font-bold transition-colors duration-300 ${active ? "text-white/70 hover:text-white" : "text-coral-600 dark:text-coral-400 hover:text-coral-700"}`}>
                            View case study <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    );
                  }}
                </ResultCard>
              </div>

              <div className={exiting ? "quiz-exit" : "quiz-enter"} style={{ "--d": 320 } as React.CSSProperties}>
                <FullMenu className="mt-0" label="Or explore a different plan" />
              </div>

              <div className={`flex flex-wrap gap-3 mt-8 justify-center ${exiting ? "quiz-exit" : "quiz-enter"}`} style={{ "--d": 400 } as React.CSSProperties}>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-coral-600 hover:bg-coral-700 px-7 py-3.5 text-sm font-bold text-white transition-colors"
                >
                  Get started
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 px-6 py-3.5 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Start over
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

/* ─── Result card (quiz recommendation) ─── */

function ResultCard({ children, className = "" }: { children: (active: boolean) => React.ReactNode; className?: string }) {
  const [hovered, setHovered] = useState(false);
  const [mobileFocused, setMobileFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) { setMobileFocused(false); return; }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setMobileFocused(entry.isIntersecting),
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  const active = hovered || mobileFocused;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`result-card cursor-default card-hover-lift ${active ? "result-card-active" : ""} ${className}`}
    >
      {children(active)}
    </div>
  );
}

/* ─── Tier card ─── */

function useMobileFocusGroup(count: number) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const isMobile = useIsMobile();

  const setRef = useCallback((i: number) => (el: HTMLDivElement | null) => {
    refs.current[i] = el;
  }, []);

  useEffect(() => {
    if (!isMobile) { setActiveIndex(-1); return; }

    function update() {
      const center = window.innerHeight / 2;
      let closest = -1;
      let closestDist = Infinity;
      for (let i = 0; i < count; i++) {
        const el = refs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const visible = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)) / rect.height;
        if (visible < 0.5) continue;
        const dist = Math.abs(rect.top + rect.height / 2 - center);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      }
      setActiveIndex(closest);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [isMobile, count]);

  return { setRef, activeIndex };
}

function TierCard({ tier, mobileFocused = false }: { tier: typeof TIERS[0]; mobileFocused?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [iconVisible, setIconVisible] = useState(false);
  const { Icon } = tier;

  // Icon entrance on scroll
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setIconVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const active = hovered || mobileFocused;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex flex-col rounded-3xl border-2 p-6 md:p-8 transition-all duration-300 cursor-default
        ${active
          ? "border-coral-600 bg-coral-600 shadow-lg -translate-y-1"
          : tier.highlight
            ? "border-coral-400 dark:border-coral-500 bg-zinc-50 dark:bg-zinc-900 shadow-md md:-translate-y-1"
            : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
        }`}
    >
      {tier.highlight && !active && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-coral-600 text-white px-4 py-1 text-xs font-bold uppercase tracking-wide shadow-md whitespace-nowrap">
          Most Popular
        </div>
      )}

      <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl
        ${active ? "bg-white/20" : "bg-coral-50 dark:bg-coral-950/50"}
        ${iconVisible ? "icon-pop" : ""}
      `} style={{ opacity: iconVisible ? undefined : 0 }}>
        <Icon className={`h-6 w-6 transition-colors duration-300 ${active ? "text-white" : "text-coral-600 dark:text-coral-400"}`} />
      </div>

      <div className="mb-5">
        <p className={`text-xs font-bold uppercase tracking-wider mb-1 transition-colors duration-300 ${active ? "text-coral-200" : "text-coral-600 dark:text-coral-400"}`}>
          {tier.name}
        </p>
        <p className={`text-4xl font-extrabold mb-1 transition-colors duration-300 ${active ? "text-white" : "text-zinc-900 dark:text-zinc-100"}`}>
          {tier.price}
        </p>
        <p className={`text-sm font-semibold mb-3 transition-colors duration-300 tagline-underline ${active ? "text-white drawn drawn-white" : "text-zinc-500 dark:text-zinc-400"}`}
          style={{ "--ul-d": 100 } as React.CSSProperties}
        >
          {tier.tagline}
        </p>
        <p className={`text-sm leading-relaxed transition-colors duration-300 ${active ? "text-coral-100" : "text-zinc-500 dark:text-zinc-400"}`}>
          {tier.description}
        </p>
      </div>

      <div className={`h-px w-full mb-5 transition-colors duration-300 ${active ? "bg-coral-500" : "bg-zinc-100 dark:bg-zinc-800"}`} />

      <ul className="flex-1 space-y-3 mb-7">
        {tier.features.map((f, fi) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <Check className={`h-4 w-4 shrink-0 mt-0.5 transition-colors duration-300 ${active ? "text-coral-200" : "text-coral-600 dark:text-coral-400"}`} />
            <span className={`transition-colors duration-300 relative ${active ? "text-coral-50" : "text-zinc-700 dark:text-zinc-300"}`}>
              {fi === 0 && (
                <span
                  className="highlight-bg"
                  style={{
                    background: active ? "rgba(255,255,255,0.15)" : "rgba(99,102,241,0.1)",
                    transform: active ? "scaleX(1)" : "scaleX(0)",
                    "--hl-d": 60,
                  } as React.CSSProperties}
                />
              )}
              <span className="relative">{f}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="space-y-2">
        <Link
          href={`/packages/${tier.id}`}
          className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold transition-colors duration-300
            ${active
              ? "bg-white text-coral-600 hover:bg-coral-50"
              : "bg-coral-600 text-white hover:bg-coral-700"
            }`}
        >
          {tier.cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
        {tier.note && (
          <p className={`text-center text-[11px] transition-colors duration-300 ${active ? "text-coral-300" : "text-zinc-400 dark:text-zinc-500"}`}>
            {tier.note}
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── Software callout ─── */

function SoftwareCallout() {
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) { setFocused(false); return; }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFocused(entry.isIntersecting),
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <Link
      ref={ref}
      href="/software"
      className={`group rounded-2xl border bg-zinc-50 dark:bg-zinc-900 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 hover:border-coral-300 dark:hover:border-coral-700 transition-colors duration-300 ${
        focused
          ? "border-coral-400 dark:border-coral-500"
          : "border-zinc-200 dark:border-zinc-800"
      }`}
    >
      <div className={`flex-shrink-0 h-14 w-14 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
        focused ? "bg-coral-100 dark:bg-coral-900" : "bg-coral-50 dark:bg-coral-950"
      } group-hover:bg-coral-100 dark:group-hover:bg-coral-900`}>
        <Cpu className="h-7 w-7 text-coral-600 dark:text-coral-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">Custom Software</p>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">Development is the easy bit.</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Deploying it securely and marketing it correctly &mdash; that&apos;s where most projects fall apart. That&apos;s exactly where we shine.
        </p>
      </div>
      <div className="flex-shrink-0">
        <span className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition-colors duration-300 whitespace-nowrap group-hover:border-coral-300 dark:group-hover:border-coral-600 group-hover:text-coral-600 dark:group-hover:text-coral-400 ${
          focused
            ? "border-coral-300 dark:border-coral-600 text-coral-600 dark:text-coral-400"
            : "border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
        }`}>
          See what we build
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/* ─── Full menu (collapsible) ─── */

function FullMenu({ className = "mt-16", label }: { className?: string; label?: string }) {
  const [open, setOpen] = useState(false);
  const tierFocus = useMobileFocusGroup(TIERS.length);

  return (
    <div className={className}>
      <button
        onClick={() => setOpen(!open)}
        className="mx-auto flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-coral-400 transition-colors"
      >
        {open ? "Hide plans" : (label || "View all plans")}
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <div className={`collapsible-menu mt-10 ${open ? "open" : ""}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 md:items-start">
          {TIERS.map((tier, i) => (
            <div key={tier.id} ref={tierFocus.setRef(i)}>
              <TierCard tier={tier} mobileFocused={tierFocus.activeIndex === i} />
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-zinc-500">
          Hosting, SSL &amp; daily backups included in every plan. No setup fees. Cancel any time.
        </p>
      </div>
    </div>
  );
}

/* ─── Main section ─── */

export function PricingTiers() {
  const sectionRef = useReveal<HTMLElement>(0.1);

  return (
    <section ref={sectionRef} id="services" className="relative py-16 md:py-24 bg-zinc-50 dark:bg-zinc-950 overflow-hidden">

      <div className="mx-auto max-w-6xl px-5 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <p data-reveal style={{ "--d": 0 } as React.CSSProperties} className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
            Packages & Pricing
          </p>
          <h2 data-reveal style={{ "--d": 80 } as React.CSSProperties} className="text-3xl font-bold text-zinc-900 dark:text-white md:text-4xl lg:text-5xl mb-4">
            Not sure what you need?{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-500 to-pink-500 inline-block pb-1" data-gradient style={{ "--gd": 300 } as React.CSSProperties}>
              We&apos;ll figure it out.
            </span>
          </h2>
          <p data-reveal style={{ "--d": 160 } as React.CSSProperties} className="text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Answer a few quick questions and we&apos;ll recommend the right plan for your business.
          </p>
        </div>

        <PackageQuiz />

        <div className="mt-10">
          <SoftwareCallout />
        </div>
      </div>
    </section>
  );
}
