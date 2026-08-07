"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   Animation hooks
   ──────────────────────────────────────────────────────────────────────────── */

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** One-shot in-view flag for scroll reveals. */
export function useInView<T extends HTMLElement>(
  threshold = 0.2,
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) {
      setSeen(true);
      return;
    }
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          ob.disconnect();
        }
      },
      { threshold },
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [threshold]);
  return [ref, seen];
}

/** Scroll-reveal wrapper — fades/rises its children the first time they appear. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`rl-reveal ${seen ? "rl-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/**
 * A scripted demo timeline. `durations[i]` is how long the scene sits at step i
 * before advancing; the returned step runs 0…durations.length (the final value
 * means "everything has happened"). Loops after `holdMs`, only plays while on
 * screen, and jumps straight to the final state for reduced-motion visitors.
 */
export function useTimeline(
  durations: number[],
  { loop = true, holdMs = 3000 }: { loop?: boolean; holdMs?: number } = {},
): [RefObject<HTMLDivElement | null>, number] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const done = durations.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) {
      setStep(done);
      return;
    }
    const ob = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), {
      threshold: 0.3,
    });
    ob.observe(el);
    return () => ob.disconnect();
  }, [done]);

  useEffect(() => {
    if (!running || reducedMotion()) return;
    if (step >= done) {
      if (!loop) return;
      const t = setTimeout(() => setStep(0), holdMs);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), durations[step]);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, step, done, loop, holdMs]);

  return [ref, step];
}

/**
 * Smooth height reveal for demo steps. Children stay mounted; the wrapper
 * animates 0fr → 1fr so the app window grows fluidly rather than snapping.
 * Content is hidden until open so nothing peeks through the collapsed row.
 */
export function Grow({
  open,
  children,
  className = "",
}: {
  open: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rl-grow ${className}`} data-open={open}>
      <div aria-hidden={!open} className={open ? undefined : "invisible"}>
        {children}
      </div>
    </div>
  );
}

/** Counts up to a value with an ease-out curve once `run` is true. */
export function CountUp({
  to,
  prefix = "",
  duration = 1100,
  run = true,
}: {
  to: number;
  prefix?: string;
  duration?: number;
  run?: boolean;
}) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (reducedMotion()) {
      setV(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, run]);
  return (
    <>
      {prefix}
      {v.toLocaleString("en-GB")}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Device frames — a demo lives inside one of these, and never resizes
   ──────────────────────────────────────────────────────────────────────────── */

/** Screen proportions each demo is held to when its content leaves room. */
const DEVICE_RATIO = {
  desktop: "16 / 10",
  tablet: "4 / 3",
  phone: "9 / 17",
  auto: undefined,
} as const;

/**
 * A demo screen that never changes size while it plays.
 *
 * The scene is rendered twice into one grid cell: an invisible twin frozen at
 * its final step, which reserves the tallest height the demo will ever need,
 * and the live copy on top of it. The cell also holds a spacer at the device's
 * aspect ratio, so a short demo still fills a believable screen. Height is
 * therefore max(device ratio, finished scene) — fixed from first paint, at
 * every breakpoint, with nothing clipped.
 */
export function Screen({
  device = "desktop",
  step,
  finalStep,
  children,
}: {
  device?: keyof typeof DEVICE_RATIO;
  step: number;
  finalStep: number;
  children: (step: number, twin: boolean) => ReactNode;
}) {
  const ratio = DEVICE_RATIO[device];
  // The single track must be minmax(0,1fr): an implicit `auto` column sizes to
  // max-content, which pushes the scene wider than the frame that clips it.
  return (
    <div className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)]">
      {ratio && (
        <div
          aria-hidden
          className="col-start-1 row-start-1 w-full"
          style={{ aspectRatio: ratio }}
        />
      )}
      <div aria-hidden className="rl-twin invisible col-start-1 row-start-1 min-w-0">
        {children(finalStep, true)}
      </div>
      <div className="col-start-1 row-start-1 min-w-0">{children(step, false)}</div>
    </div>
  );
}

/** Mac chrome around a recreated Relay screen — the desktop app. */
export function AppWindow({
  title,
  children,
  accent = "orange",
  className = "",
}: {
  title: string;
  children: ReactNode;
  accent?: "orange" | "violet";
  className?: string;
}) {
  return (
    <div
      className={`rl-app relative flex flex-col overflow-hidden rounded-2xl bg-white text-left ${
        accent === "violet" ? "rl-window-violet" : "rl-window"
      } ${className}`}
    >
      <div className="relative flex shrink-0 items-center gap-1.5 border-b border-zinc-200 bg-zinc-50 px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="pointer-events-none absolute inset-x-0 text-center text-[11px] font-medium text-zinc-400">
          {title}
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

/** Relay in your pocket — a phone, bezel and all. */
export function PhoneFrame({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rl-app relative mx-auto flex w-full max-w-[300px] flex-col rounded-[2.4rem] bg-zinc-800 p-2.5 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.75)] ring-1 ring-white/10 ${className}`}
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.9rem] bg-white">
        <div className="relative shrink-0 border-b border-zinc-200 bg-zinc-50 px-4 pt-6 pb-2">
          <span className="absolute top-2 left-1/2 h-3 w-14 -translate-x-1/2 rounded-full bg-zinc-800" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-tight text-zinc-900">
              relay<span className="text-orange-500">.</span>
            </span>
            <span className="text-[10px] text-zinc-400">{title}</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

/** The same app on a tablet — what it looks like in the van. */
export function TabletFrame({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rl-app relative flex w-full flex-col rounded-[1.75rem] bg-zinc-800 p-3 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.75)] ring-1 ring-white/10 ${className}`}
    >
      <span className="absolute top-[9px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-zinc-600" />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1rem] bg-white">
        <div className="flex shrink-0 items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-2">
          <span className="text-[11px] font-semibold tracking-tight text-zinc-900">
            relay<span className="text-orange-500">.</span>
          </span>
          <span className="text-[10px] text-zinc-400">{title}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

/** The slim nav rail from the real dashboard shell, shrunk to fit a demo. */
export function MiniSidebar({ active }: { active: string }) {
  const items = [
    "Dashboard",
    "Inbox",
    "Clients",
    "Diary",
    "Jobs",
    "Quotes",
    "Certificates",
    "Money",
  ];
  return (
    <aside className="hidden w-[104px] shrink-0 flex-col gap-0.5 border-r border-zinc-200 bg-zinc-50 px-2 py-3 sm:flex">
      <p className="mb-2 px-2 text-[11px] font-semibold tracking-tight text-zinc-900">
        relay<span className="text-orange-500">.</span>
      </p>
      {items.map((it) => (
        <span
          key={it}
          className={`rounded-lg px-2 py-1 text-[10px] ${
            it === active
              ? "bg-zinc-200/70 font-medium text-zinc-900"
              : "text-zinc-500"
          }`}
        >
          {it}
        </span>
      ))}
    </aside>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Faithful app atoms — classes lifted from the Relay codebase
   ──────────────────────────────────────────────────────────────────────────── */

const CHIP_TONES = {
  rose: "bg-rose-50 text-rose-600",
  amber: "bg-amber-50 text-amber-600",
  zinc: "bg-zinc-100 text-zinc-500",
  emerald: "bg-emerald-50 text-emerald-700",
  violet: "bg-violet-100 text-violet-700",
} as const;

export function Chip({
  tone,
  children,
}: {
  tone: keyof typeof CHIP_TONES;
  children: ReactNode;
}) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${CHIP_TONES[tone]}`}
    >
      {children}
    </span>
  );
}

/** Initials avatar disc, as in the inbox thread header. */
export function Avatar({ name, size = 34 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full bg-zinc-200 font-semibold text-zinc-600"
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {initials}
    </span>
  );
}

/** Email as a full-width "letter" card — inbox-client.tsx verbatim. */
export function LetterCard({
  from,
  to,
  when,
  subject,
  direction = "inbound",
  children,
  className = "",
}: {
  from: string;
  to?: string;
  when: string;
  subject?: string;
  direction?: "inbound" | "outbound";
  children: ReactNode;
  className?: string;
}) {
  const out = direction === "outbound";
  return (
    <div
      className={`rounded-lg border border-zinc-200 bg-white shadow-sm ${className}`}
    >
      <div
        className={`flex items-center justify-between gap-3 rounded-t-lg border-b border-zinc-100 px-4 py-2 text-xs ${
          out ? "bg-blue-50 text-blue-900" : "bg-zinc-50 text-zinc-600"
        }`}
      >
        <span className="min-w-0 truncate">
          <span className="font-semibold">{out ? "You" : from}</span>
          <span className="text-zinc-400">{out ? ` → ${to}` : " → you"}</span>
        </span>
        <span className="shrink-0 text-zinc-400">{when}</span>
      </div>
      <div className="px-4 py-3">
        {subject && (
          <p className="mb-1.5 text-sm font-semibold text-zinc-900">{subject}</p>
        )}
        <div className="text-[13px] leading-relaxed whitespace-pre-wrap text-zinc-700">
          {children}
        </div>
      </div>
    </div>
  );
}

/** WhatsApp / SMS chat bubble — orange when it's you. */
export function WaBubble({
  direction = "inbound",
  when,
  status,
  children,
  className = "",
}: {
  direction?: "inbound" | "outbound";
  when: string;
  status?: string;
  children: ReactNode;
  className?: string;
}) {
  const out = direction === "outbound";
  return (
    <div className={`flex ${out ? "justify-end" : "justify-start"} ${className}`}>
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-2 text-[13px] break-words ${
          out ? "bg-orange-500 text-white" : "border border-zinc-200 bg-white"
        }`}
      >
        <p className="whitespace-pre-wrap">{children}</p>
        <p className={`mt-1 text-[10px] ${out ? "text-orange-100" : "text-zinc-400"}`}>
          {when}
          {out && status ? ` · ${status}` : ""}
        </p>
      </div>
    </div>
  );
}

/** An AI suggestion card — suggestion-chips.tsx verbatim, with a scripted state. */
export function Suggestion({
  icon,
  title,
  reason,
  detail,
  state = "idle",
  doneLabel = "Done · Open →",
  primary = "Accept",
  acceptRef,
  className = "",
}: {
  icon: string;
  title: string;
  reason?: string;
  detail?: ReactNode;
  state?: "idle" | "busy" | "done";
  doneLabel?: string;
  primary?: string;
  acceptRef?: RefObject<HTMLSpanElement | null>;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-violet-200 bg-violet-50/70 px-3 py-2 ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-violet-900">
            <span className="mr-1">{icon}</span>
            {title}
          </p>
          {reason && (
            <p className="truncate text-[11px] text-violet-500">{reason}</p>
          )}
          {detail}
        </div>
        {/* Both states are stacked in one cell so the cluster keeps the width
            of the wider one. Swapping to "Done" then can't rewrap the title —
            which would resize the whole demo window mid-animation. */}
        <div className="grid shrink-0 pt-0.5">
          <div
            className={`col-start-1 row-start-1 flex items-center justify-end gap-1.5 ${
              state === "done" ? "invisible" : ""
            }`}
          >
            <span
              ref={acceptRef}
              className="relative rounded-md bg-violet-600 px-2 py-1 text-[11px] font-medium whitespace-nowrap text-white"
            >
              {/* the label holds its width while the spinner dots show */}
              <span className={state === "busy" ? "invisible" : ""}>
                {primary}
              </span>
              {state === "busy" && (
                <span className="absolute inset-0 grid place-items-center">
                  …
                </span>
              )}
            </span>
            <span className="rounded-md border border-violet-300 px-2 py-1 text-[11px] font-medium text-violet-700">
              Dismiss
            </span>
          </div>
          <div
            className={`col-start-1 row-start-1 flex items-center justify-end ${
              state === "done" ? "" : "invisible"
            }`}
          >
            <span className="text-[11px] font-medium whitespace-nowrap text-emerald-700">
              {doneLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Line-item rows under a draft-invoice suggestion — the violet 1 × … — £ list. */
export function LineItems({ items }: { items: [string, number][] }) {
  return (
    <ul className="mt-0.5 space-y-0.5">
      {items.map(([label, price], i) => (
        <li key={i} className="truncate text-[11px] text-violet-600">
          1 × {label} — £{price}
        </li>
      ))}
    </ul>
  );
}

/** A pulse widget card from the dashboard board — business-pulse.tsx verbatim. */
export function PulseCard({
  title,
  link,
  children,
  className = "",
}: {
  title: string;
  link?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm ${className}`}
    >
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <h3 className="min-w-0 truncate text-[13px] font-semibold text-zinc-900">
          {title}
        </h3>
        {link && (
          <span className="shrink-0 text-[11px] text-zinc-400">{link} →</span>
        )}
      </div>
      {children}
    </section>
  );
}

/** A next-step row — numbered black disc, title, due chip. */
export function StepRow({
  n,
  title,
  meta,
  due,
  dueTone = "zinc",
  done = false,
  className = "",
}: {
  n: number;
  title: string;
  meta?: string;
  due?: string;
  dueTone?: "red" | "amber" | "zinc";
  done?: boolean;
  className?: string;
}) {
  const tones = {
    red: "bg-rose-50 text-rose-600",
    amber: "bg-amber-50 text-amber-600",
    zinc: "bg-zinc-100 text-zinc-500",
  } as const;
  return (
    <div
      className={`flex items-center gap-2.5 rounded-xl border border-zinc-100 bg-zinc-50/60 px-2.5 py-2 ${className}`}
    >
      <span
        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10px] font-semibold text-white ${
          done ? "bg-emerald-600" : "bg-zinc-900"
        }`}
      >
        {done ? "✓" : n}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={`block truncate text-xs font-medium ${
            done ? "rl-strike text-zinc-400" : "text-zinc-800"
          }`}
        >
          {title}
        </span>
        {meta && (
          <span className="block truncate text-[10px] text-zinc-400">{meta}</span>
        )}
      </span>
      {due && (
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${tones[dueTone]}`}
        >
          {due}
        </span>
      )}
    </div>
  );
}

/** The fake cursor that glides around a demo and presses things. */
export function Cursor({
  x,
  y,
  pressed = false,
  visible = true,
}: {
  x: string;
  y: string;
  pressed?: boolean;
  visible?: boolean;
}) {
  return (
    <div
      className={`rl-cursor ${pressed ? "rl-press" : ""}`}
      style={{ left: x, top: y, opacity: visible ? 1 : 0 }}
      aria-hidden
    >
      <svg width="17" height="20" viewBox="0 0 17 20" fill="none">
        <path
          d="M1 1l6.1 16.2 2.3-6.8 6.9-2.1L1 1z"
          fill="#0d0c0b"
          stroke="#f0ece3"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
