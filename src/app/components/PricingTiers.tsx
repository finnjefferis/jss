"use client";

import Link from "next/link";
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
    price: "£295",
    tagline: "Get online fast.",
    description: "A clean, professional site for businesses that need to look legit online. Done properly, done fast.",
    Icon: Zap,
    features: [
      "Up to 5 pages",
      "Mobile-first design",
      "Contact form",
      "Basic SEO setup",
      "Google Business setup",
      "7\u201310 day delivery",
    ],
    cta: "Get started",
    highlight: false,
    note: "Fixed scope. No CMS.",
  },
  {
    id: "business",
    name: "Business",
    price: "£795",
    tagline: "Built to grow.",
    description: "Everything in Starter, plus CMS access so you can keep your site fresh without touching code.",
    Icon: BarChart3,
    features: [
      "Everything in Starter",
      "CMS access (edit your content)",
      "Blog / news section",
      "Editable service pages",
      "Recorded training session",
      "Priority support",
    ],
    cta: "Get started",
    highlight: true,
    note: "Most popular",
  },
  {
    id: "commerce",
    name: "Commerce",
    price: "\u00a31,495+",
    tagline: "Built to sell.",
    description: "Full e-commerce with payments, inventory management, and automation \u2014 so you spend less time on admin.",
    Icon: ShoppingBag,
    features: [
      "Everything in Business",
      "E-commerce setup",
      "Payment integration",
      "Product management",
      "Email confirmations",
      "Ongoing support available",
    ],
    cta: "Discuss your store",
    highlight: false,
    note: "Price varies by scope.",
  },
];

const MONTHLY_PLANS = [
  {
    id: "hosting",
    name: "Hosting",
    price: "£29/mo",
    description: "Hosting, SSL, backups, uptime monitoring, and basic support.",
  },
  {
    id: "growth",
    name: "Growth",
    price: "£149/mo",
    description: "Google Business management, 2 blog posts/mo, local SEO, monthly performance report.",
  },
  {
    id: "leadmachine",
    name: "Lead Machine",
    price: "£349/mo",
    description: "Full SEO strategy, content marketing, lead generation campaigns, quarterly strategy call.",
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
  build: typeof TIERS[0] | null;
  monthly: typeof MONTHLY_PLANS[0];
  reason: string;
  managedOnly?: boolean;
};

function getRecommendation(answers: Answers): { primary: Recommendation } {
  const { website, business, content, growth } = answers;

  if (website === "decent") {
    let monthlyIdx = 0;
    if (growth === "serious-growth") monthlyIdx = 2;
    else if (growth === "more-customers") monthlyIdx = 1;

    const managedReasons: Record<number, string> = {
      0: "Your site\u2019s already sorted. We\u2019ll keep it fast, secure, and online so you can focus on your business.",
      1: "Your site\u2019s fine \u2014 but you\u2019re missing out on customers who can\u2019t find you. We\u2019ll fix that.",
      2: "Your site\u2019s solid. Now let\u2019s turn it into a lead machine with full SEO and content marketing.",
    };

    return {
      primary: {
        build: null,
        monthly: MONTHLY_PLANS[monthlyIdx],
        reason: managedReasons[monthlyIdx],
        managedOnly: true,
      },
    };
  }

  let buildIdx = 0;
  if (business === "products" || business === "both") buildIdx = 2;
  else if (content === "often" || content === "sometimes") buildIdx = 1;

  let monthlyIdx = 0;
  if (growth === "serious-growth") monthlyIdx = 2;
  else if (growth === "more-customers") monthlyIdx = 1;

  if (buildIdx === 2 && growth === "serious-growth") monthlyIdx = 2;

  const reasons: Record<string, string> = {
    "2-2": "You sell products and want aggressive growth. This is the full setup.",
    "2-1": "E-commerce site with active marketing to drive traffic to your store.",
    "2-0": "You need a store. Hosting keeps it running \u2014 you can add marketing later.",
    "1-2": "A site you control, with us driving serious lead generation behind it.",
    "1-1": "You want to update content and grow organically. This is the sweet spot.",
    "1-0": "A flexible site with CMS. Hosting keeps it fast and secure.",
  };

  let reason = reasons[`${buildIdx}-${monthlyIdx}`]
    || (monthlyIdx >= 1 ? "Simple site, but with active marketing to make sure people actually find you." : "Get online fast with a professional site. Clean, simple, done.");

  if (website === "decent") {
    reason = "Your current site needs a refresh. " + reason.charAt(0).toLowerCase() + reason.slice(1);
  }

  return {
    primary: { build: TIERS[buildIdx], monthly: MONTHLY_PLANS[monthlyIdx], reason },
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
              {result.primary.managedOnly ? (
                <>
                  <div className="text-center md:text-left">
                    <div className={exiting ? "quiz-exit" : "quiz-enter"} style={{ "--d": 0 } as React.CSSProperties}>
                      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 mb-6">
                        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">No rebuild needed</span>
                      </div>
                    </div>
                  </div>

                  <h3 className={`text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white mb-2 text-center md:text-left ${exiting ? "quiz-exit" : "quiz-enter"}`} style={{ "--d": 80 } as React.CSSProperties}>
                    We&apos;ll look after it.
                  </h3>
                  <p className={`text-sm text-zinc-500 dark:text-zinc-400 mb-8 max-w-lg text-center md:text-left ${exiting ? "quiz-exit" : "quiz-enter"}`} style={{ "--d": 160 } as React.CSSProperties}>
                    {result.primary.reason}
                  </p>

                  <div
                    className={`result-card group/plan mb-4 max-w-md mx-auto cursor-default card-hover-lift ${exiting ? "quiz-exit" : "quiz-enter"}`}
                    style={{ "--d": 240 } as React.CSSProperties}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-coral-500 to-pink-500 flex items-center justify-center group-hover/plan:from-white/20 group-hover/plan:to-white/10 transition-colors duration-300">
                        <Zap className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-coral-500 dark:text-coral-400 group-hover/plan:text-white/70 transition-colors duration-300">Monthly plan</p>
                    </div>
                    <p className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-1 group-hover/plan:text-white transition-colors duration-300">{result.primary.monthly.price}</p>
                    <p className="text-xs font-semibold text-coral-600 dark:text-coral-400 mb-4 group-hover/plan:text-white/80 transition-colors duration-300 tagline-underline drawn" style={{ "--ul-d": 400 } as React.CSSProperties}>{result.primary.monthly.name} plan</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed group-hover/plan:text-white/70 transition-colors duration-300">{result.primary.monthly.description}</p>
                  </div>

                  <p className={`text-xs text-zinc-400 dark:text-zinc-500 mb-8 text-center ${exiting ? "quiz-exit" : "quiz-enter"}`} style={{ "--d": 320 } as React.CSSProperties}>
                    Hosting, SSL &amp; backups included as standard.
                  </p>

                  <div className={`flex flex-wrap gap-3 justify-center ${exiting ? "quiz-exit" : "quiz-enter"}`} style={{ "--d": 400 } as React.CSSProperties}>
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
                </>
              ) : (
                <>
                  <div className="text-center">
                    <div className={exiting ? "quiz-exit" : "quiz-enter"} style={{ "--d": 0 } as React.CSSProperties}>
                      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 mb-6">
                        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Recommended for you</span>
                      </div>
                    </div>
                  </div>

                  <h3 className={`text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white mb-2 text-center ${exiting ? "quiz-exit" : "quiz-enter"}`} style={{ "--d": 80 } as React.CSSProperties}>
                    {result.primary.build!.name} + {result.primary.monthly.name}
                  </h3>
                  <p className={`text-sm text-zinc-500 dark:text-zinc-400 mb-8 max-w-lg mx-auto text-center ${exiting ? "quiz-exit" : "quiz-enter"}`} style={{ "--d": 160 } as React.CSSProperties}>
                    {result.primary.reason}
                  </p>

                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 mb-6 ${exiting ? "quiz-exit" : "quiz-enter"}`} style={{ "--d": 240 } as React.CSSProperties}>
                    <div className="result-card group/build cursor-default card-hover-lift">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-coral-500 to-pink-500 flex items-center justify-center group-hover/build:from-white/20 group-hover/build:to-white/10 transition-colors duration-300">
                          {(() => { const BuildIcon = result.primary.build!.Icon; return <BuildIcon className="h-5 w-5 text-white" />; })()}
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-coral-500 dark:text-coral-400 group-hover/build:text-white/70 transition-colors duration-300">Website build</p>
                      </div>
                      <p className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-0.5 group-hover/build:text-white transition-colors duration-300">
                        {result.primary.build!.price}
                      </p>
                      <p className="text-xs font-semibold text-coral-600 dark:text-coral-400 mb-5 group-hover/build:text-white/80 transition-colors duration-300 tagline-underline drawn" style={{ "--ul-d": 400 } as React.CSSProperties}>
                        {result.primary.build!.name} &middot; one-off
                      </p>
                      <ul className="space-y-2.5">
                        {result.primary.build!.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm">
                            <Check className="h-4 w-4 shrink-0 mt-0.5 text-coral-500 group-hover/build:text-white/60 transition-colors duration-300" />
                            <span className="text-zinc-600 dark:text-zinc-300 group-hover/build:text-white/90 transition-colors duration-300">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="result-card group/monthly cursor-default card-hover-lift flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-500 to-coral-500 flex items-center justify-center group-hover/monthly:from-white/20 group-hover/monthly:to-white/10 transition-colors duration-300">
                          <BarChart3 className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-coral-500 dark:text-coral-400 group-hover/monthly:text-white/70 transition-colors duration-300">Monthly plan</p>
                      </div>
                      <p className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-0.5 group-hover/monthly:text-white transition-colors duration-300">{result.primary.monthly.price}</p>
                      <p className="text-xs font-semibold text-coral-600 dark:text-coral-400 mb-5 group-hover/monthly:text-white/80 transition-colors duration-300 tagline-underline drawn" style={{ "--ul-d": 500 } as React.CSSProperties}>{result.primary.monthly.name} plan</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed group-hover/monthly:text-white/70 transition-colors duration-300 flex-1">{result.primary.monthly.description}</p>
                    </div>
                  </div>

                  <div className={exiting ? "quiz-exit" : "quiz-enter"} style={{ "--d": 320 } as React.CSSProperties}>
                    <FullMenu className="mt-0" label="Or explore a different combination" />
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
                </>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

/* ─── Tier card ─── */

function TierCard({ tier }: { tier: typeof TIERS[0] }) {
  const [hovered, setHovered] = useState(false);
  const [mobileFocused, setMobileFocused] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [iconVisible, setIconVisible] = useState(false);
  const isMobile = useIsMobile();
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

  useEffect(() => {
    if (!isMobile) { setMobileFocused(false); return; }
    const el = cardRef.current;
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

/* ─── Monthly plan card ─── */

function MonthlyPlanCard({ plan }: { plan: typeof MONTHLY_PLANS[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`rounded-2xl border p-6 transition-all duration-200 cursor-default card-hover-lift ${
        hovered
          ? "bg-coral-600 border-coral-600"
          : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
      }`}
    >
      <p className={`text-xs font-bold uppercase tracking-wider mb-1 transition-colors duration-200 ${hovered ? "text-coral-200" : "text-coral-500 dark:text-coral-400"}`}>{plan.name}</p>
      <p className={`text-2xl font-extrabold mb-2 transition-colors duration-200 ${hovered ? "text-white" : "text-zinc-900 dark:text-white"}`}>{plan.price}</p>
      <p className={`text-sm leading-relaxed transition-colors duration-200 ${hovered ? "text-coral-100" : "text-zinc-500 dark:text-zinc-400"}`}>{plan.description}</p>
    </div>
  );
}

/* ─── Full menu (collapsible) ─── */

function FullMenu({ className = "mt-16", label }: { className?: string; label?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <button
        onClick={() => setOpen(!open)}
        className="mx-auto flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-coral-400 transition-colors"
      >
        {open ? "Hide packages" : (label || "View all packages & monthly plans")}
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <div className={`collapsible-menu mt-10 ${open ? "open" : ""}`}>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 mb-4">
            Website builds
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:items-start">
            {TIERS.map((tier) => (
              <TierCard key={tier.id} tier={tier} />
            ))}
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 mb-4">
            Monthly plans
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {MONTHLY_PLANS.map((plan) => (
              <MonthlyPlanCard key={plan.id} plan={plan} />
            ))}
          </div>
          <p className="text-center text-sm text-zinc-500">
            Every website includes hosting as standard. No hidden fees, cancel any time.
          </p>
        </div>
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
            Answer a few quick questions and we&apos;ll recommend the right website package and monthly plan for your business.
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
