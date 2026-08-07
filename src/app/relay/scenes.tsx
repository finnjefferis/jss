"use client";

import { useEffect, useRef, useState } from "react";
import {
  AppWindow,
  Avatar,
  Chip,
  CountUp,
  Cursor,
  Grow,
  LetterCard,
  LineItems,
  MiniSidebar,
  PhoneFrame,
  PulseCard,
  Screen,
  StepRow,
  Suggestion,
  TabletFrame,
  WaBubble,
  useInView,
  useTimeline,
} from "./ui";

/* Every scene below is a pure function of its step, handed to <Screen>, which
   plays it inside a fixed device frame — see the note on Screen in ui.tsx for
   why the same body is rendered twice. */

/* ─────────────────────────────────────────────────────────────────────────────
   HERO — a real morning in the inbox.
   An email lands, ✨ Scan reads it, three suggestions appear, the cursor
   accepts one, and the dashboard in your pocket hears about everything.
   ──────────────────────────────────────────────────────────────────────────── */

const HERO_STEPS = [900, 1200, 700, 1600, 1000, 500, 500, 1100, 750, 650, 1500];
//                  0    1     2    3     4     5    6    7     8    9    10
// 0 base · 1 letter lands · 2 cursor→scan · 3 scanning · 4 AI banner
// 5–7 suggestions · 8 cursor→accept · 9 busy · 10 done + dashboard reacts
const HERO_DONE = HERO_STEPS.length;

export function InboxScene() {
  const [ref, step] = useTimeline(HERO_STEPS, { holdMs: 3600 });
  const frameRef = useRef<HTMLDivElement | null>(null);
  const scanRef = useRef<HTMLSpanElement | null>(null);
  const acceptRef = useRef<HTMLSpanElement | null>(null);
  const [pos, setPos] = useState({ x: "6%", y: "92%" });

  // The cursor glides to whatever it is about to press.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const target =
      step >= 8 ? acceptRef.current : step >= 2 ? scanRef.current : null;
    if (!target) {
      setPos({ x: "6%", y: "92%" });
      return;
    }
    const f = frame.getBoundingClientRect();
    const r = target.getBoundingClientRect();
    setPos({
      x: `${(((r.left + r.width / 2 - f.left) / f.width) * 100).toFixed(1)}%`,
      y: `${(((r.top + r.height / 2 - f.top) / f.height) * 100).toFixed(1)}%`,
    });
  }, [step]);

  return (
    <div
      ref={ref}
      className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_280px]"
    >
      <AppWindow title="Relay — Inbox" className="min-w-0">
        <Screen device="desktop" step={step} finalStep={HERO_DONE}>
          {(s, twin) => {
            const scanning = s === 3;
            return (
              <div
                ref={twin ? undefined : frameRef}
                className="relative flex h-full"
              >
                {!twin && (
                  <Cursor
                    x={pos.x}
                    y={pos.y}
                    pressed={s === 3 || s === 9}
                    visible={s >= 2 && s <= 10}
                  />
                )}
                <MiniSidebar active="Inbox" />

                <div className="flex min-w-0 flex-1 flex-col">
                  {/* Thread header — avatar, identity line, the real actions */}
                  <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar name="Sarah Mitchell" size={36} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-zinc-900">
                          Sarah Mitchell ↗
                        </p>
                        <p className="truncate text-[11px] text-zinc-500">
                          email · sarah.mitchell@gmail.com · 07700 900982
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span
                        ref={twin ? undefined : scanRef}
                        className={`rounded-lg bg-violet-100 px-2.5 py-1.5 text-xs font-medium text-violet-700 ${
                          s >= 1 && s < 3 ? "rl-nudge" : ""
                        }`}
                      >
                        {scanning ? "Scanning…" : "✨ Scan"}
                      </span>
                      <span className="hidden rounded-lg bg-orange-100 px-2.5 py-1.5 text-xs font-medium text-orange-700 sm:inline">
                        + Next step
                      </span>
                      <span className="hidden rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-600 md:inline">
                        Linked · change
                      </span>
                    </div>
                  </header>

                  {/* AI strip — shimmer, then the read, then the suggestions */}
                  <Grow open={s >= 3} className="shrink-0">
                    <div className="border-b border-violet-100 bg-violet-50 px-4 py-2">
                      {scanning ? (
                        <div className="space-y-1.5 py-0.5">
                          <div className="rl-shimmer h-3 rounded bg-violet-100" />
                          <div className="rl-shimmer h-3 w-2/3 rounded bg-violet-100" />
                        </div>
                      ) : (
                        <p className="rl-up text-xs text-violet-800">
                          AI (job request): Sarah accepts the £95 service quote
                          and wants a landlord cert (CP12) at 12 Marine Parade
                          on the same visit — Tuesdays preferred.
                        </p>
                      )}
                      <Grow open={s >= 5}>
                        <Suggestion
                          className="mt-1.5"
                          icon="📅"
                          title="Book: Boiler service + CP12 — Sarah Mitchell"
                          detail={
                            <p className="text-[11px] text-violet-600">
                              Tue 4 Aug, 09:00 · 12 Marine Parade
                            </p>
                          }
                          state={s >= 10 ? "done" : s === 9 ? "busy" : "idle"}
                          acceptRef={twin ? undefined : acceptRef}
                        />
                      </Grow>
                      <Grow open={s >= 6}>
                        <Suggestion
                          className="mt-1.5"
                          icon="💷"
                          title="Draft invoice — service + landlord cert"
                          detail={
                            <LineItems
                              items={[
                                ["Boiler service", 95],
                                ["Landlord gas safety record (CP12)", 75],
                              ]}
                            />
                          }
                        />
                      </Grow>
                      <Grow open={s >= 7}>
                        <Suggestion
                          className="mt-1.5"
                          icon="✍️"
                          title="Reply — confirm Tuesday and the cert"
                          primary="Insert into reply"
                          detail={
                            <p className="mt-1 rounded border border-violet-100 bg-white/70 px-2 py-1.5 text-[11px] leading-relaxed text-zinc-700">
                              Morning Sarah — lovely, I&rsquo;ll do both
                              together. Does Tuesday 4th at 9am suit? Cert will
                              be with you the same day. Finn
                            </p>
                          }
                        />
                      </Grow>
                    </div>
                  </Grow>

                  {/* The thread itself — letter cards on the zinc canvas */}
                  <div className="flex-1 bg-zinc-50 p-4">
                    <LetterCard
                      direction="outbound"
                      from="You"
                      to="sarah.mitchell@gmail.com"
                      when="Thu 24 Jul, 16:12"
                      subject="Quote — boiler service"
                    >
                      {"Quote attached — £95 all in, includes the flue check. Any Tuesday works for me.\n\nFinn"}
                    </LetterCard>

                    <Grow open={s >= 1}>
                      <LetterCard
                        className="mt-3"
                        from="Sarah Mitchell"
                        when="Mon 28 Jul, 08:42"
                        subject="Re: Quote — boiler service"
                      >
                        {"Morning Finn — let's go ahead with the service. Could you also do the landlord certificate for my flat at 12 Marine Parade while you're there? Any Tuesday works.\n\nSarah"}
                      </LetterCard>
                    </Grow>
                  </div>

                  {/* Compose bar */}
                  <div className="flex shrink-0 gap-2 border-t border-zinc-200 p-3">
                    <div className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-[13px] text-zinc-400">
                      Reply via email… (⌘/Ctrl+Enter)
                    </div>
                    <span className="grid min-w-16 place-items-center rounded-lg bg-zinc-900 px-4 text-[13px] font-medium text-white">
                      Send
                    </span>
                  </div>
                </div>
              </div>
            );
          }}
        </Screen>
      </AppWindow>

      {/* The dashboard in your pocket, hearing about all of it */}
      <div className="hidden min-w-0 xl:block xl:translate-y-6">
        <PhoneFrame title="Dashboard">
          <Screen device="phone" step={step} finalStep={HERO_DONE}>
            {(s) => (
              <div className="h-full space-y-3 bg-zinc-50 p-3">
                <PulseCard title="Your next steps" link="All">
                  <p className="mb-2 text-[11px] text-zinc-400">
                    {s >= 10 ? "3 open · 1 due today" : "2 open · 1 due today"}
                  </p>
                  <div>
                    <Grow open={s >= 10}>
                      <StepRow
                        className="mb-1.5"
                        n={1}
                        title="Tue — service + CP12, Sarah Mitchell"
                        meta="12 Marine Parade"
                        due="In 7 days"
                      />
                    </Grow>
                    <StepRow
                      n={s >= 10 ? 2 : 1}
                      title="Chase Emerald Lettings — inv #204"
                      meta="£220 · 32 days"
                      due="Due today"
                      dueTone="amber"
                    />
                    <StepRow
                      className="mt-1.5"
                      n={s >= 10 ? 3 : 2}
                      title="Order flue liner — Elm Grove job"
                      due="Tomorrow"
                    />
                  </div>
                </PulseCard>

                <PulseCard title="Diary" link="Diary">
                  <div>
                    <Grow open={s >= 10}>
                      <div className="mb-1.5 rounded-xl border border-zinc-100 bg-zinc-50/60 px-2.5 py-2">
                        <p className="truncate text-xs font-medium text-zinc-800">
                          Sarah Mitchell — service + CP12
                        </p>
                        <p className="truncate text-[10px] text-zinc-400">
                          Tue 4 Aug, 09:00 · 12 Marine Parade
                        </p>
                      </div>
                    </Grow>
                    <div className="rounded-xl border border-zinc-100 bg-zinc-50/60 px-2.5 py-2">
                      <p className="truncate text-xs font-medium text-zinc-800">
                        Harbour Café — hob disconnect
                      </p>
                      <p className="truncate text-[10px] text-zinc-400">
                        Wed 30 Jul, 14:00 · High St
                      </p>
                    </div>
                  </div>
                </PulseCard>
              </div>
            )}
          </Screen>
        </PhoneFrame>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DEPTH — level 3 finishes the job (levels 1 and 2 are static copy targets).
   ──────────────────────────────────────────────────────────────────────────── */

export function DepthDemo() {
  const [ref, step] = useTimeline([1600, 700], { holdMs: 2800 });
  return (
    <div ref={ref}>
      <Screen device="auto" step={step} finalStep={2}>
        {(s) => (
          <Suggestion
            icon="💷"
            title="Draft invoice — service + landlord cert"
            reason="Sarah accepted the quote and added a CP12 — priced from your rate card"
            detail={
              <LineItems
                items={[
                  ["Boiler service", 95],
                  ["Landlord gas safety record (CP12)", 75],
                ]}
              />
            }
            state={s >= 2 ? "done" : s === 1 ? "busy" : "idle"}
          />
        )}
      </Screen>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MONEY — who owes you, for how long, and the chase already drafted.
   ──────────────────────────────────────────────────────────────────────────── */

export function MoneyScene() {
  const [ref, step] = useTimeline([1000, 2000, 1400, 700], { holdMs: 3400 });
  return (
    <div ref={ref}>
      <AppWindow title="Relay — Money">
        <Screen device="desktop" step={step} finalStep={4}>
          {(s) => (
            <div className="h-full bg-zinc-50 p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <PulseCard title="Money" link="Money in">
                  <dl className="space-y-2.5">
                    <div>
                      <dt className="text-[11px] font-medium text-zinc-500">
                        Outstanding
                      </dt>
                      <dd className="flex items-baseline gap-2">
                        <span className="text-2xl font-semibold text-zinc-900">
                          £4,310
                        </span>
                        <span className="text-[11px] text-zinc-400">
                          6 invoices
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-medium text-zinc-500">
                        Overdue
                      </dt>
                      <dd className="flex items-baseline gap-2">
                        <span className="text-lg font-semibold text-rose-600">
                          £1,240
                        </span>
                        <span className="text-[11px] text-zinc-400">
                          3 invoices
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-medium text-zinc-500">
                        Paid this month
                      </dt>
                      <dd className="text-lg font-semibold text-emerald-600">
                        <CountUp to={6850} prefix="£" run={s >= 1} />
                      </dd>
                    </div>
                  </dl>
                </PulseCard>

                <PulseCard title="Aged debt" link="Who owes what">
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        ["5+ days", "£380", "2 inv", "bg-amber-50 text-amber-700"],
                        ["7+ days", "£640", "1 inv", "bg-orange-50 text-orange-700"],
                        ["30+ days", "£220", "1 inv", "bg-rose-50 text-rose-700"],
                      ] as const
                    ).map(([label, total, count, tone]) => (
                      <div key={label} className={`rounded-lg px-2 py-1.5 ${tone}`}>
                        <div className="text-[10px] font-medium">{label}</div>
                        <div className="text-[13px] font-semibold tabular-nums">
                          {total}
                        </div>
                        <div className="text-[10px] opacity-70">{count}</div>
                      </div>
                    ))}
                  </div>
                  <ul className="mt-2.5 space-y-1.5">
                    {(
                      [
                        ["Emerald Lettings", "£220", "32d old"],
                        ["Harbour Café", "£640", "9d old"],
                        ["J. Carter", "£380", "6d old"],
                      ] as const
                    ).map(([name, amt, age]) => (
                      <li
                        key={name}
                        className="flex items-baseline justify-between gap-2"
                      >
                        <span className="truncate text-xs text-zinc-600">
                          {name}
                        </span>
                        <span className="shrink-0 text-xs font-semibold tabular-nums text-zinc-900">
                          {amt}
                        </span>
                        <span className="w-12 shrink-0 text-right text-[10px] text-zinc-400">
                          {age}
                        </span>
                      </li>
                    ))}
                  </ul>
                </PulseCard>
              </div>

              <Grow open={s >= 2}>
                <Suggestion
                  className="mt-3"
                  icon="✍️"
                  title="Chase draft — Emerald Lettings"
                  reason="Invoice #204 · £220 · 32 days — third nudge, so slightly firmer"
                  primary="Copy"
                  doneLabel="Copied ✓"
                  state={s >= 4 ? "done" : s === 3 ? "busy" : "idle"}
                  detail={
                    <p className="mt-1 rounded border border-violet-100 bg-white/70 px-2 py-1.5 text-[11px] leading-relaxed text-zinc-700">
                      Hi Dan — following up on invoice #204 for £220, now a
                      month old. I&rsquo;d appreciate getting it settled this
                      week; details are on the invoice. Thanks, Finn
                    </p>
                  }
                />
              </Grow>
            </div>
          )}
        </Screen>
      </AppWindow>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CERTIFICATES — the renewal book, watched twelve months ahead. On the tablet
   that actually goes out in the van.
   ──────────────────────────────────────────────────────────────────────────── */

export function CertsScene() {
  const [ref, step] = useTimeline([1200, 1500, 1100, 700], { holdMs: 3200 });
  return (
    <div ref={ref}>
      <TabletFrame title="Certificates">
        <Screen device="tablet" step={step} finalStep={4}>
          {(s) => (
            <div className="h-full bg-zinc-50 p-4">
              <PulseCard title="Gas safety" link="All certificates">
                <div className="flex flex-wrap gap-1.5">
                  <Chip tone="rose">1 overdue</Chip>
                  <Chip tone="amber">3 in 30 days</Chip>
                  <Chip tone="zinc">2 in 31–60</Chip>
                  <Chip tone="zinc">4 in 61–90</Chip>
                </div>
                <Grow open={s >= 1}>
                  <div className="pt-2.5">
                    {(
                      [
                        ["4 Elm Grove — CP12", "J. Carter", "1 day overdue", "rose"],
                        [
                          "12 Marine Parade — CP12",
                          "Sarah Mitchell",
                          "Due in 12 days",
                          "amber",
                        ],
                        [
                          "Flat 2, Station Rd — CP12",
                          "R. Holt",
                          "Due in 26 days",
                          "amber",
                        ],
                      ] as const
                    ).map(([label, who, due, tone], i) => (
                      <div
                        key={label}
                        className={`flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50/60 px-3 py-2 ${
                          i > 0 ? "mt-1.5" : ""
                        }`}
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-xs font-medium text-zinc-800">
                            {label}
                          </span>
                          <span className="block truncate text-[10px] text-zinc-400">
                            {who}
                          </span>
                        </span>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            tone === "rose"
                              ? "bg-rose-50 text-rose-600"
                              : "bg-amber-50 text-amber-600"
                          }`}
                        >
                          {due}
                        </span>
                      </div>
                    ))}
                  </div>
                </Grow>
              </PulseCard>

              <Grow open={s >= 2}>
                <Suggestion
                  className="mt-3"
                  icon="📅"
                  title="Book renewal visits — 3 CP12s due within 30 days"
                  reason="Groups them into one round on Tue 18 Aug, morning"
                  state={s >= 4 ? "done" : s === 3 ? "busy" : "idle"}
                />
              </Grow>
            </div>
          )}
        </Screen>
      </TabletFrame>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   WHATSAPP — a job that arrives as a text message becomes a client + a booking.
   ──────────────────────────────────────────────────────────────────────────── */

export function WhatsAppScene() {
  const [ref, step] = useTimeline([1000, 1300, 1300, 1200, 1600], {
    holdMs: 3200,
  });
  return (
    <div ref={ref}>
      <PhoneFrame title="Inbox">
        <Screen device="phone" step={step} finalStep={5}>
          {(s) => (
            <div className="flex h-full flex-col justify-end bg-zinc-50 p-3">
              {/* bottom-anchored, the way a chat actually fills a phone */}
              <Grow open={s >= 1}>
                <WaBubble when="09:14">
                  {"Morning mate, it's Dave from 44 Osborne Rd — could you cap off the gas fire in the front room? Sometime next week ideally 👍"}
                </WaBubble>
              </Grow>
              <Grow open={s >= 2}>
                <Suggestion
                  className="mt-3"
                  icon="👤"
                  title="New client — Dave Trent"
                  reason="From +44 7911 260 341 · 44 Osborne Rd"
                  state={s >= 4 ? "done" : "idle"}
                />
              </Grow>
              <Grow open={s >= 3}>
                <Suggestion
                  className="mt-1.5"
                  icon="📅"
                  title="Book: Cap off gas fire — Dave Trent"
                  detail={
                    <p className="text-[11px] text-violet-600">
                      Thu 6 Aug, 10:00 · 44 Osborne Rd
                    </p>
                  }
                  state={s >= 4 ? "done" : "idle"}
                />
              </Grow>
              <Grow open={s >= 5}>
                <WaBubble
                  className="mt-3"
                  direction="outbound"
                  when="09:21"
                  status="delivered"
                >
                  {"No bother Dave — Thursday morning suit? Booked you in for 10 for now."}
                </WaBubble>
              </Grow>
            </div>
          )}
        </Screen>
      </PhoneFrame>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   THE LOOP CLOSES — you reply from your normal email; Relay ticks the job off.
   ──────────────────────────────────────────────────────────────────────────── */

export function LoopScene() {
  const [ref, step] = useTimeline([1200, 1800, 2200], { holdMs: 3200 });
  return (
    <div ref={ref}>
      <AppWindow title="Relay — Dashboard" accent="violet">
        <Screen device="desktop" step={step} finalStep={3}>
          {(s) => (
            <div className="grid h-full gap-3 bg-zinc-50 p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
              <div className="min-w-0">
                <Grow open={s >= 1}>
                  <div>
                    <LetterCard
                      direction="outbound"
                      from="You"
                      to="sarah.m…"
                      when="Tue 4 Aug"
                      subject="CP12 + invoice — all done"
                    >
                      {"Cert and invoice attached, Sarah. Boiler's in good nick — same time next year?\n\nFinn"}
                    </LetterCard>
                    <p className="mt-2 text-center text-[10px] text-zinc-400">
                      ↑ sent from your normal email, not from Relay
                    </p>
                  </div>
                </Grow>
              </div>

              <PulseCard title="Next steps" link="All" className="min-w-0">
                <p className="mb-2 text-[11px] text-zinc-400">
                  {s >= 2 ? "2 open" : "3 open · 1 due today"}
                </p>
                <div className="space-y-1.5">
                  <StepRow
                    n={1}
                    title="Send Sarah the CP12"
                    due={s >= 2 ? undefined : "Due today"}
                    dueTone="amber"
                    done={s >= 2}
                  />
                  <StepRow n={2} title="Quote — extension" due="Tomorrow" />
                  <StepRow n={3} title="Van MOT" due="In 6 days" />
                </div>
                <Grow open={s >= 2}>
                  <p className="mt-2 text-[10px] text-emerald-700">
                    ✓ Matched your sent email — step closed automatically
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

/* ─────────────────────────────────────────────────────────────────────────────
   THE WEEK — planned around the promises already sitting in your inbox.
   ──────────────────────────────────────────────────────────────────────────── */

const WEEK: {
  day: string;
  blocks: {
    t: string;
    label: string;
    tone: "job" | "quote" | "admin" | "ghost";
    h: string;
  }[];
}[] = [
  {
    day: "Mon",
    blocks: [
      { t: "08:30", label: "Invoices + chases", tone: "admin", h: "h-9" },
      { t: "10:00", label: "Boiler service — Harbour Café", tone: "job", h: "h-16" },
      { t: "14:00", label: "Flue liner — Elm Grove", tone: "job", h: "h-14" },
    ],
  },
  {
    day: "Tue",
    blocks: [
      { t: "09:00", label: "Sarah M — service + CP12", tone: "job", h: "h-16" },
      { t: "13:30", label: "Quote visit — extension", tone: "quote", h: "h-12" },
    ],
  },
  {
    day: "Wed",
    blocks: [
      { t: "09:00", label: "CP12 round ×3 — grouped", tone: "job", h: "h-20" },
      { t: "15:00", label: "Parts run", tone: "admin", h: "h-9" },
    ],
  },
  {
    day: "Thu",
    blocks: [
      { t: "10:00", label: "Dave T — cap gas fire", tone: "job", h: "h-12" },
      { t: "13:00", label: "Emerald Lettings — inspection", tone: "job", h: "h-14" },
    ],
  },
  {
    day: "Fri",
    blocks: [
      { t: "09:00", label: "Held free — overrun buffer", tone: "ghost", h: "h-12" },
      { t: "14:00", label: "Invoice run + next week", tone: "admin", h: "h-9" },
    ],
  },
];

const BLOCK_TONES = {
  job: "border-orange-200 bg-orange-100 text-orange-800",
  quote: "border-violet-200 bg-violet-100 text-violet-800",
  admin: "border-zinc-200 bg-zinc-100 text-zinc-600",
  ghost: "border-dashed border-zinc-300 bg-white text-zinc-400",
} as const;

export function WeekScene() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref}>
      <AppWindow title="Relay — Plan">
        <Screen device="desktop" step={seen ? 1 : 0} finalStep={1}>
          {(s) => {
            let i = 0;
            return (
              <div className="h-full bg-zinc-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-zinc-900">
                    Week of 3 August
                  </p>
                  <span className="rounded-full bg-violet-100 px-2.5 py-1 text-[10px] font-medium text-violet-700">
                    ✨ Drafted Sun 21:30 — you approved it
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {WEEK.map(({ day, blocks }) => (
                    <div key={day} className="min-w-0">
                      <p className="mb-1.5 text-center text-[10px] font-medium text-zinc-400">
                        {day}
                      </p>
                      <div className="space-y-1.5">
                        {blocks.map((b) => {
                          const delay = i++ * 110;
                          return s >= 1 ? (
                            <div
                              key={b.label}
                              className={`rl-pop rounded-lg border px-1.5 py-1 ${b.h} ${BLOCK_TONES[b.tone]}`}
                              style={{ animationDelay: `${300 + delay}ms` }}
                            >
                              <p className="text-[8px] opacity-70">{b.t}</p>
                              <p className="text-[9px] leading-tight font-medium break-words hyphens-auto">
                                {b.label}
                              </p>
                            </div>
                          ) : (
                            <div key={b.label} className={`${b.h}`} />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }}
        </Screen>
      </AppWindow>
    </div>
  );
}
