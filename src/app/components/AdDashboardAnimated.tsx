"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

const METRICS = [
  { label: "Impressions", value: "24.8k", sub: "+34% vs last week" },
  { label: "Clicks", value: "1,247", sub: "5.03% CTR" },
  { label: "Leads", value: "38", sub: "£4.12 per lead" },
];

const BAR_HEIGHTS = [35, 42, 28, 55, 48, 62, 71];
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

function useAnimateNumber(target: string, started: boolean, delay: number) {
  const [display, setDisplay] = useState("");
  const hasNumber = /\d/.test(target);

  useEffect(() => {
    if (!started) return;

    const timeout = setTimeout(() => {
      if (!hasNumber) {
        setDisplay(target);
        return;
      }

      // Extract numeric part
      const match = target.match(/^([^\d]*)([\d,.]+)(.*)$/);
      if (!match) {
        setDisplay(target);
        return;
      }

      const [, prefix, numStr, suffix] = match;
      const cleanNum = parseFloat(numStr.replace(/,/g, ""));
      const hasDecimal = numStr.includes(".");
      const decimalPlaces = hasDecimal ? numStr.split(".")[1].length : 0;
      const hasComma = numStr.includes(",");
      const steps = 20;
      let step = 0;

      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = cleanNum * eased;

        let formatted = hasDecimal
          ? current.toFixed(decimalPlaces)
          : Math.round(current).toString();

        if (hasComma && !hasDecimal) {
          formatted = Math.round(current).toLocaleString();
        }

        setDisplay(`${prefix}${formatted}${suffix}`);

        if (step >= steps) {
          setDisplay(target);
          clearInterval(interval);
        }
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [started, target, delay, hasNumber]);

  return display;
}

export function AdDashboardAnimated() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [barsVisible, setBarsVisible] = useState(false);
  const [aiVisible, setAiVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setTimeout(() => setStarted(true), 600);
          setTimeout(() => setBarsVisible(true), 1200);
          setTimeout(() => setAiVisible(true), 2200);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const metric0 = useAnimateNumber("24.8k", started, 0);
  const metric1 = useAnimateNumber("1,247", started, 150);
  const metric2 = useAnimateNumber("38", started, 300);
  const metricValues = [metric0, metric1, metric2];

  return (
    <div ref={ref} className="p-5 space-y-4">
      {/* Metric cards */}
      <div className="grid grid-cols-3 gap-3">
        {METRICS.map((m, i) => (
          <div
            key={m.label}
            className="rounded-lg bg-zinc-800/80 border border-zinc-700/50 p-3 transition-all duration-500"
            style={{
              opacity: started ? 1 : 0,
              transform: started ? "translateY(0)" : "translateY(8px)",
              transitionDelay: `${i * 150}ms`,
            }}
          >
            <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
              {m.label}
            </p>
            <p className="text-lg font-extrabold text-white mt-0.5 tabular-nums">
              {metricValues[i] || "\u00A0"}
            </p>
            <p
              className="text-[10px] font-semibold text-emerald-400 mt-0.5 transition-opacity duration-300"
              style={{
                opacity: started ? 1 : 0,
                transitionDelay: `${600 + i * 150}ms`,
              }}
            >
              {m.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div
        className="rounded-lg bg-zinc-800/50 border border-zinc-700/30 p-3 transition-all duration-500"
        style={{
          opacity: barsVisible ? 1 : 0,
          transform: barsVisible ? "translateY(0)" : "translateY(8px)",
        }}
      >
        <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-3">
          Weekly performance
        </p>
        <div className="flex items-end gap-1.5 h-16">
          {BAR_HEIGHTS.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-coral-600 to-pink-500 transition-all duration-700 ease-out"
              style={{
                height: barsVisible ? `${h}%` : "0%",
                transitionDelay: `${i * 80}ms`,
              }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1.5">
          {DAYS.map((d, i) => (
            <span
              key={i}
              className="flex-1 text-center text-[9px] text-zinc-600"
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* AI notification */}
      <div
        className="flex items-center gap-2 rounded-lg bg-emerald-950/50 border border-emerald-800/30 px-3 py-2 transition-all duration-500"
        style={{
          opacity: aiVisible ? 1 : 0,
          transform: aiVisible
            ? "translateY(0) scale(1)"
            : "translateY(6px) scale(0.97)",
        }}
      >
        <Sparkles className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
        <p className="text-[11px] text-emerald-300">
          AI shifted 40% budget to top-performing ad set
        </p>
      </div>
    </div>
  );
}
