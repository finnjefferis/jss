"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { Check, ArrowRight, Zap, BarChart3, ShoppingBag } from "lucide-react";

const ICON_MAP: Record<string, typeof Zap> = {
  Zap,
  BarChart3,
  ShoppingBag,
};

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

function useMobileFocusGroup(count: number) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const isMobile = useIsMobile();

  const setRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => {
      refs.current[i] = el;
    },
    [],
  );

  useEffect(() => {
    if (!isMobile) {
      setActiveIndex(-1);
      return;
    }

    function update() {
      const center = window.innerHeight / 2;
      let closest = -1;
      let closestDist = Infinity;
      for (let i = 0; i < count; i++) {
        const el = refs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const visible =
          Math.max(
            0,
            Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0),
          ) / rect.height;
        if (visible < 0.5) continue;
        const dist = Math.abs(rect.top + rect.height / 2 - center);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      }
      setActiveIndex(closest);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [isMobile, count]);

  return { setRef, activeIndex };
}

/* ─── Tier Card Grid ─── */

type TierData = {
  id: string;
  name: string;
  price: string;
  tagline: string;
  description: string;
  icon: string;
  features: string[];
  cta: string;
  highlight: boolean;
  note: string;
};

export function TierCardGrid({ tiers }: { tiers: TierData[] }) {
  const focus = useMobileFocusGroup(tiers.length);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:items-start">
      {tiers.map((tier, i) => (
        <div key={tier.id} ref={focus.setRef(i)}>
          <TierCard tier={tier} mobileFocused={focus.activeIndex === i} />
        </div>
      ))}
    </div>
  );
}

function TierCard({
  tier,
  mobileFocused = false,
}: {
  tier: TierData;
  mobileFocused?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [iconVisible, setIconVisible] = useState(false);
  const Icon = ICON_MAP[tier.icon] || Zap;

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
      { threshold: 0.3 },
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
        ${
          active
            ? "border-coral-600 bg-coral-600 shadow-lg -translate-y-1"
            : tier.highlight
              ? "border-coral-400 dark:border-coral-500 bg-white dark:bg-zinc-900 shadow-md md:-translate-y-1"
              : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        }`}
    >
      {tier.highlight && !active && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-coral-600 text-white px-4 py-1 text-xs font-bold uppercase tracking-wide shadow-md whitespace-nowrap">
          Most Popular
        </div>
      )}

      <div
        className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl
        ${active ? "bg-white/20" : "bg-coral-50 dark:bg-coral-950/50"}
        ${iconVisible ? "icon-pop" : ""}`}
        style={{ opacity: iconVisible ? undefined : 0 }}
      >
        <Icon
          className={`h-6 w-6 transition-colors duration-300 ${active ? "text-white" : "text-coral-600 dark:text-coral-400"}`}
        />
      </div>

      <div className="mb-5">
        <p
          className={`text-xs font-bold uppercase tracking-wider mb-1 transition-colors duration-300 ${active ? "text-coral-200" : "text-coral-600 dark:text-coral-400"}`}
        >
          {tier.name}
        </p>
        <p
          className={`text-4xl font-extrabold mb-1 transition-colors duration-300 ${active ? "text-white" : "text-zinc-900 dark:text-zinc-100"}`}
        >
          {tier.price}
        </p>
        <p
          className={`text-sm font-semibold mb-3 transition-colors duration-300 tagline-underline ${active ? "text-white drawn drawn-white" : "text-zinc-500 dark:text-zinc-400"}`}
          style={{ "--ul-d": 100 } as React.CSSProperties}
        >
          {tier.tagline}
        </p>
        <p
          className={`text-sm leading-relaxed transition-colors duration-300 ${active ? "text-coral-100" : "text-zinc-500 dark:text-zinc-400"}`}
        >
          {tier.description}
        </p>
      </div>

      <div
        className={`h-px w-full mb-5 transition-colors duration-300 ${active ? "bg-coral-500" : "bg-zinc-100 dark:bg-zinc-800"}`}
      />

      <ul className="flex-1 space-y-3 mb-7">
        {tier.features.map((f, fi) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <Check
              className={`h-4 w-4 shrink-0 mt-0.5 transition-colors duration-300 ${active ? "text-coral-200" : "text-coral-600 dark:text-coral-400"}`}
            />
            <span
              className={`transition-colors duration-300 relative ${active ? "text-coral-50" : "text-zinc-700 dark:text-zinc-300"}`}
            >
              {fi === 0 && (
                <span
                  className="highlight-bg"
                  style={{
                    background: active
                      ? "rgba(255,255,255,0.15)"
                      : "rgba(99,102,241,0.1)",
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
            ${
              active
                ? "bg-white text-coral-600 hover:bg-coral-50"
                : "bg-coral-600 text-white hover:bg-coral-700"
            }`}
        >
          {tier.cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
        {tier.note && (
          <p
            className={`text-center text-[11px] transition-colors duration-300 ${active ? "text-coral-300" : "text-zinc-400 dark:text-zinc-500"}`}
          >
            {tier.note}
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── Monthly Plan Card Grid ─── */

type PlanData = {
  name: string;
  price: string;
  description: string;
  features: string[];
};

export function MonthlyPlanGrid({ plans }: { plans: PlanData[] }) {
  const focus = useMobileFocusGroup(plans.length);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:items-stretch">
      {plans.map((plan, i) => (
        <div key={plan.name} ref={focus.setRef(i)} className="flex">
          <MonthlyPlanCard plan={plan} mobileFocused={focus.activeIndex === i} />
        </div>
      ))}
    </div>
  );
}

function MonthlyPlanCard({
  plan,
  mobileFocused = false,
}: {
  plan: PlanData;
  mobileFocused?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const active = hovered || mobileFocused;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`rounded-2xl border p-6 transition-all duration-300 cursor-default flex flex-col w-full ${
        active
          ? "bg-coral-600 border-coral-600 shadow-lg -translate-y-1"
          : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
      }`}
    >
      <p
        className={`text-xs font-bold uppercase tracking-wider mb-1 transition-colors duration-300 ${active ? "text-coral-200" : "text-coral-500 dark:text-coral-400"}`}
      >
        {plan.name}
      </p>
      <p
        className={`text-2xl font-extrabold mb-2 transition-colors duration-300 ${active ? "text-white" : "text-zinc-900 dark:text-white"}`}
      >
        {plan.price}
      </p>
      <p
        className={`text-sm leading-relaxed mb-5 transition-colors duration-300 ${active ? "text-coral-100" : "text-zinc-500 dark:text-zinc-400"}`}
      >
        {plan.description}
      </p>

      <div
        className={`h-px w-full mb-5 transition-colors duration-300 ${active ? "bg-coral-500" : "bg-zinc-100 dark:bg-zinc-800"}`}
      />

      <ul className="flex-1 space-y-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <Check
              className={`h-4 w-4 shrink-0 mt-0.5 transition-colors duration-300 ${active ? "text-coral-200" : "text-coral-600 dark:text-coral-400"}`}
            />
            <span
              className={`transition-colors duration-300 ${active ? "text-coral-50" : "text-zinc-700 dark:text-zinc-300"}`}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
