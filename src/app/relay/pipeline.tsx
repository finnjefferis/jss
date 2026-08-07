"use client";

import {
  AppWindow,
  Avatar,
  Grow,
  PulseCard,
  Screen,
  useTimeline,
} from "./ui";

/* ─────────────────────────────────────────────────────────────────────────────
   THE LEAD ENGINE — the ads pipeline, end to end.
   A phone scrolls past the ad, taps it, answers three short questions — and
   the leads board on the right hears about every tap as it happens. One
   timeline drives both devices, in the same idiom as scenes.tsx.
   ──────────────────────────────────────────────────────────────────────────── */

const STEPS = [1100, 1300, 1400, 1400, 1100, 1700];
//             0     1     2     3     4     5
// 0 quiet feed · 1 ad drops in · 2 tapped → question 1 · 3 question 2
// 4 question 3 · 5 thanks screen · 6 the lead lands on the board
const DONE = STEPS.length;

/** The punter's phone — same bezel as PhoneFrame, but it isn't running Relay,
    so the header is a plain status bar rather than the relay wordmark. */
function PunterPhone({ children }: { children: React.ReactNode }) {
  return (
    <div className="rl-app relative mx-auto flex w-full max-w-[300px] flex-col rounded-[2.4rem] bg-zinc-800 p-2.5 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.75)] ring-1 ring-white/10">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.9rem] bg-white">
        <div className="relative shrink-0 border-b border-zinc-200 bg-zinc-50 px-4 pt-6 pb-2">
          <span className="absolute top-2 left-1/2 h-3 w-14 -translate-x-1/2 rounded-full bg-zinc-800" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-tight text-zinc-900">
              09:41
            </span>
            <span className="text-[10px] text-zinc-400">Isle of Wight</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

/** One row in the live-activity feed — time, then what just happened. */
function EventRow({
  when,
  children,
  tone = "zinc",
}: {
  when: string;
  children: React.ReactNode;
  tone?: "zinc" | "emerald";
}) {
  return (
    <div
      className={`rl-pop flex items-baseline gap-2 rounded-lg px-2 py-1.5 text-[11px] ${
        tone === "emerald"
          ? "bg-emerald-50 font-medium text-emerald-800"
          : "text-zinc-600"
      }`}
    >
      <span className="shrink-0 font-mono text-[10px] text-zinc-400">
        {when}
      </span>
      <span className="min-w-0 truncate">{children}</span>
    </div>
  );
}

/** A lead on the board — who, what, and which ad brought them. */
function LeadRow({
  name,
  detail,
  creative,
  when,
  fresh = false,
}: {
  name: string;
  detail: string;
  creative: string;
  when?: string;
  fresh?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2.5 rounded-xl border px-2.5 py-2 ${
        fresh
          ? "border-emerald-200 bg-emerald-50/60"
          : "border-zinc-100 bg-zinc-50/60"
      }`}
    >
      <Avatar name={name} size={28} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs font-medium text-zinc-800">
          {name}
        </span>
        <span className="block truncate text-[10px] text-zinc-400">
          {detail}
        </span>
      </span>
      <span className="flex shrink-0 items-center gap-1">
        {fresh && (
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
            New
          </span>
        )}
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-500">
          {creative}
        </span>
        {when && <span className="text-[10px] text-zinc-400">{when}</span>}
      </span>
    </div>
  );
}

/** A funnel answer button — one tap, no forms to wade through. */
function Option({
  children,
  picked = false,
}: {
  children: React.ReactNode;
  picked?: boolean;
}) {
  return (
    <span
      className={`block rounded-xl border px-3.5 py-2.5 text-xs font-medium ${
        picked
          ? "border-orange-400 bg-orange-50 text-orange-700"
          : "border-zinc-200 bg-white text-zinc-600"
      }`}
    >
      {children}
    </span>
  );
}

/** Step dots — where you are in the three questions. */
function FunnelDots({ at }: { at: number }) {
  return (
    <span className="flex items-center gap-1">
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={`h-1.5 rounded-full transition-all ${
            n === at ? "w-4 bg-orange-500" : "w-1.5 bg-zinc-200"
          }`}
        />
      ))}
    </span>
  );
}

/** The funnel page header — their own domain, not ours. */
function FunnelBar({ at }: { at: number }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <span className="rounded-full bg-zinc-100 px-2.5 py-1 font-mono text-[9px] text-zinc-500">
        aldridge-heating.co.uk/book
      </span>
      <FunnelDots at={at} />
    </div>
  );
}

/** What the phone shows at each step of the story. */
function PhoneView({ s }: { s: number }) {
  // The thanks screen — also what reduced-motion visitors land on.
  if (s >= 5) {
    return (
      <div className="flex h-full flex-col justify-center bg-zinc-50 p-4 text-center">
        <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-xl">
          ✓
        </span>
        <p className="text-sm font-semibold text-zinc-900">Thanks, Sarah.</p>
        <p className="mx-auto mt-1 max-w-[190px] text-[11px] leading-relaxed text-zinc-500">
          Your details are with the team — you&rsquo;ll get a call today.
        </p>
      </div>
    );
  }
  // Three questions, one at a time.
  if (s >= 2) {
    return (
      <div className="flex h-full flex-col bg-zinc-50 p-3.5">
        <FunnelBar at={s - 1} />
        {s === 2 && (
          <div className="rl-pop">
            <p className="mb-2.5 text-[13px] font-semibold text-zinc-900">
              What needs doing?
            </p>
            <div className="space-y-1.5">
              <Option picked>Boiler service</Option>
              <Option>No heating</Option>
              <Option>Landlord certificate</Option>
              <Option>Something else</Option>
            </div>
          </div>
        )}
        {s === 3 && (
          <div className="rl-pop">
            <p className="mb-2.5 text-[13px] font-semibold text-zinc-900">
              Where are you?
            </p>
            <div className="space-y-1.5">
              <span className="block rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs text-zinc-800">
                PO30 5TR
              </span>
              <span className="block rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs text-zinc-800">
                Sarah Mitchell
              </span>
              <span className="block rounded-xl bg-zinc-900 px-3.5 py-2.5 text-center text-xs font-semibold text-white">
                Next
              </span>
            </div>
          </div>
        )}
        {s === 4 && (
          <div className="rl-pop">
            <p className="mb-2.5 text-[13px] font-semibold text-zinc-900">
              When suits you?
            </p>
            <div className="space-y-1.5">
              <Option picked>This week</Option>
              <Option>Next week</Option>
              <Option>Just a price for now</Option>
              <span className="block rounded-xl bg-zinc-900 px-3.5 py-2.5 text-center text-xs font-semibold text-white">
                Send my details
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
  // The feed — a quiet post, then the ad arrives.
  return (
    <div className="flex h-full flex-col bg-zinc-50 p-3">
      <div className="rounded-xl border border-zinc-100 bg-white p-3 opacity-60">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-zinc-200" />
          <span className="h-2 w-20 rounded bg-zinc-200" />
        </div>
        <div className="mt-2.5 space-y-1.5">
          <span className="block h-2 w-full rounded bg-zinc-100" />
          <span className="block h-2 w-3/4 rounded bg-zinc-100" />
        </div>
      </div>
      <Grow open={s >= 1}>
        <div className="rl-drop mt-2.5 rounded-xl border border-zinc-200 bg-white p-3 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-orange-100 text-[9px] font-bold text-orange-700">
              AH
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] font-semibold text-zinc-900">
                Aldridge Heating
              </span>
              <span className="block text-[9px] text-zinc-400">Sponsored</span>
            </span>
          </div>
          <p className="mt-2 text-[11px] leading-snug text-zinc-700">
            Boiler due its service? Fixed price, done this week — Newport &amp;
            Cowes.
          </p>
          <div className="mt-2 grid h-16 place-items-center rounded-lg bg-gradient-to-br from-orange-100 to-amber-50 text-[10px] font-semibold tracking-wide text-orange-600">
            FIXED-PRICE SERVICE
          </div>
          <span className="mt-2 block rounded-lg bg-zinc-900 px-3 py-2 text-center text-[11px] font-semibold text-white">
            Book a service
          </span>
        </div>
      </Grow>
    </div>
  );
}

export function PipelineScene() {
  const [ref, step] = useTimeline(STEPS, { holdMs: 3600 });
  return (
    <div
      ref={ref}
      className="grid items-center gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
    >
      <PunterPhone>
        <Screen device="phone" step={step} finalStep={DONE}>
          {(s) => <PhoneView s={s} />}
        </Screen>
      </PunterPhone>

      <AppWindow title="Relay — Leads" className="min-w-0">
        <Screen device="desktop" step={step} finalStep={DONE}>
          {(s) => (
            <div className="grid h-full gap-3 bg-zinc-50 p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
              <PulseCard title="Live activity" link="Today" className="min-w-0">
                <div className="space-y-0.5">
                  {s < 1 && (
                    <p className="px-2 py-1.5 text-[11px] text-zinc-400">
                      Watching the ads&hellip;
                    </p>
                  )}
                  {s >= 1 && (
                    <EventRow when="09:41">
                      Creative B shown — Facebook feed
                    </EventRow>
                  )}
                  {s >= 2 && (
                    <EventRow when="09:41">Ad tapped — Creative B</EventRow>
                  )}
                  {s >= 3 && (
                    <EventRow when="09:42">
                      Step 1 — &ldquo;Boiler service&rdquo;
                    </EventRow>
                  )}
                  {s >= 4 && (
                    <EventRow when="09:42">Step 2 — postcode &amp; name</EventRow>
                  )}
                  {s >= 5 && (
                    <EventRow when="09:43">
                      Step 3 — &ldquo;This week&rdquo;
                    </EventRow>
                  )}
                  {s >= 6 && (
                    <EventRow when="09:43" tone="emerald">
                      ✓ New lead — Sarah Mitchell
                    </EventRow>
                  )}
                </div>
              </PulseCard>

              <PulseCard
                title={s >= 6 ? "Leads · 14 this week" : "Leads · 13 this week"}
                link="All"
                className="min-w-0"
              >
                <div className="space-y-1.5">
                  <Grow open={s >= 6}>
                    <LeadRow
                      fresh
                      name="Sarah Mitchell"
                      detail="Boiler service · PO30"
                      creative="Creative B"
                    />
                  </Grow>
                  <LeadRow
                    name="Dean Wathey"
                    detail="No heating · PO31"
                    creative="Creative A"
                    when="Tue"
                  />
                  <LeadRow
                    name="Priya Kaur"
                    detail="Landlord certs × 3 · PO36"
                    creative="Creative C"
                    when="Mon"
                  />
                </div>
                <Grow open={s >= 6}>
                  <p className="mt-2 text-[10px] text-emerald-700">
                    ✓ Creative B is winning — 6 of the last 10 leads
                  </p>
                </Grow>
              </PulseCard>
            </div>
          )}
        </Screen>
      </AppWindow>
    </div>
  );
}
