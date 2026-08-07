"use client";

import type { ReactNode } from "react";
import {
  CertsScene,
  DepthDemo,
  InboxScene,
  LoopScene,
  MoneyScene,
  WeekScene,
  WhatsAppScene,
} from "./scenes";
import { Reveal } from "./ui";

/* ─── /relay — the quiet page ────────────────────────────────────────────────
   Sells Relay as a concept, pre-launch, using recreations of the product's
   actual screens. Dark editorial shell; the app glows inside it. Unlisted,
   noindex, linked from nowhere. */

const MAILTO =
  "mailto:hello@jefferissoftware.co.uk?subject=Relay%20%E2%80%94%20ask%20me%20for%20a%20walkthrough";

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="rl-mono mb-4 text-[11px] tracking-[0.24em] text-orange-400/90 uppercase">
      {children}
    </p>
  );
}

function Vignette({
  eyebrow,
  title,
  copy,
  scene,
  flip = false,
}: {
  eyebrow: string;
  title: ReactNode;
  copy: ReactNode;
  scene: ReactNode;
  flip?: boolean;
}) {
  return (
    <section className="grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[5fr_7fr] lg:gap-16">
      <Reveal className={flip ? "lg:order-2" : ""}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="rl-display text-3xl leading-[1.08] font-medium text-balance md:text-[2.6rem]">
          {title}
        </h2>
        <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#f0ece3]/65">
          {copy}
        </div>
      </Reveal>
      <Reveal delay={140} className={`min-w-0 ${flip ? "lg:order-1" : ""}`}>
        {scene}
      </Reveal>
    </section>
  );
}

export default function RelayClient() {
  return (
    <div className="rl-root rl-noise relative min-h-screen overflow-x-clip text-[#f0ece3] antialiased selection:bg-orange-500/30">
      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        {/* ── Top bar ─────────────────────────────────────────────────── */}
        <header className="flex items-center justify-between py-7">
          <p className="rl-display text-2xl font-medium tracking-tight">
            relay<span className="text-orange-500">.</span>
          </p>
          <p className="rl-mono text-[10px] tracking-[0.24em] text-[#f0ece3]/40 uppercase">
            Unlisted · private preview
          </p>
        </header>

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section className="pt-14 pb-16 md:pt-20">
          <div className="max-w-3xl">
            <Eyebrow>A Jefferis Software product — not yet launched</Eyebrow>
            <h1 className="rl-display text-[clamp(2.8rem,7.5vw,5.4rem)] leading-[1.01] font-medium text-balance">
              The back office that{" "}
              <em className="text-orange-400 italic">runs itself.</em>
            </h1>
            <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-[#f0ece3]/70">
              Relay reads every email and WhatsApp as it lands — works out the
              job, drafts the paperwork, chases the money, and ticks the work
              off when the reply comes back. Not rules and reminders.{" "}
              <span className="text-[#f0ece3]">
                Automations that go deeper.
              </span>
            </p>
          </div>

          <Reveal className="mt-14" delay={150}>
            <InboxScene />
            <p className="rl-mono rl-caret mt-5 text-[10px] tracking-[0.2em] text-[#f0ece3]/40 uppercase">
              ▶ Rebuilt from the app&rsquo;s actual components — this is the real
              interface, acting out a real morning
            </p>
          </Reveal>
        </section>

        <div className="rl-rule" />

        {/* ── The depth argument ──────────────────────────────────────── */}
        <section className="py-20 md:py-28">
          <Reveal className="max-w-3xl">
            <Eyebrow>Why &ldquo;automation&rdquo; usually disappoints</Eyebrow>
            <h2 className="rl-display text-4xl leading-[1.06] font-medium text-balance md:text-5xl">
              Every automation you&rsquo;ve tried stops at the surface.
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-[#f0ece3]/65">
              Notification tools tell you work exists. Zapier-style tools move
              it somewhere else. Either way, the quote still isn&rsquo;t
              written, the visit isn&rsquo;t booked and the invoice
              isn&rsquo;t chased — by you, at nine o&rsquo;clock at night.
              Relay is built for the third level.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            <Reveal delay={0}>
              <div className="h-full rounded-2xl border border-white/8 bg-white/[0.02] p-6 opacity-60">
                <p className="rl-mono text-[10px] tracking-[0.2em] text-[#f0ece3]/45">
                  LEVEL 1 — NOTIFY
                </p>
                <h3 className="rl-display mt-3 text-2xl font-medium">Sees it.</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#f0ece3]/55">
                  A ping that says you&rsquo;ve got mail. Everything after the
                  ping is still your evening.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 text-xs text-[#f0ece3]/60">
                  🔔 1 new message from Sarah
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="h-full rounded-2xl border border-white/8 bg-white/[0.02] p-6 opacity-60">
                <p className="rl-mono text-[10px] tracking-[0.2em] text-[#f0ece3]/45">
                  LEVEL 2 — MOVE
                </p>
                <h3 className="rl-display mt-3 text-2xl font-medium">Files it.</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#f0ece3]/55">
                  Copies the message into a spreadsheet or a board. A tidy pile
                  is still a pile.
                </p>
                <div className="rl-mono mt-5 rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-[10px] leading-relaxed text-[#f0ece3]/50">
                  → sheet.append(&#123; from: &ldquo;Sarah&rdquo;, wants:
                  &ldquo;service + cert&rdquo; &#125;)
                  <br />
                  <span className="text-[#f0ece3]/30">// …now what?</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="relative h-full rounded-2xl border border-violet-400/30 bg-violet-500/[0.07] p-6 shadow-[0_0_60px_-18px_rgba(139,92,246,0.45)]">
                <p className="rl-mono text-[10px] tracking-[0.2em] text-violet-300">
                  LEVEL 3 — FINISH · RELAY
                </p>
                <h3 className="rl-display mt-3 text-2xl font-medium">Does it.</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#f0ece3]/70">
                  Reads the message, prices the job from your rates, drafts the
                  invoice, books the visit. One tap from you, and it&rsquo;s
                  done.
                </p>
                <div className="rl-app mt-5">
                  <DepthDemo />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="rl-rule" />

        {/* ── Vignettes — one deep automation at a time ───────────────── */}
        <div className="py-8 md:py-10">
          <Vignette
            eyebrow="Who owes you what"
            title={
              <>
                It counts what you&rsquo;re owed —{" "}
                <em className="text-orange-400 italic">and drafts the chase.</em>
              </>
            }
            copy={
              <>
                <p>
                  Every invoice is watched from the day it goes out. At 5, 7 and
                  30 days overdue the debt surfaces on your dashboard, and Relay
                  writes the nudge in your voice — a little firmer each time.
                </p>
                <p>You read it, maybe tweak a word, and press send. That&rsquo;s the whole job.</p>
              </>
            }
            scene={<MoneyScene />}
          />

          <Vignette
            flip
            eyebrow="Texts are jobs too"
            title={
              <>
                A WhatsApp at 9:14 is a{" "}
                <em className="text-orange-400 italic">booked job by 9:21.</em>
              </>
            }
            copy={
              <>
                <p>
                  Relay links your own WhatsApp — the number your customers
                  already have. An unknown mobile with an address in it becomes
                  a client record, a job and a diary slot before the
                  kettle&rsquo;s boiled.
                </p>
                <p>
                  Email and WhatsApp land in one inbox, tied to the same client
                  history.
                </p>
              </>
            }
            scene={<WhatsAppScene />}
          />

          <Vignette
            eyebrow="Twelve months ahead"
            title={
              <>
                It never forgets a{" "}
                <em className="text-orange-400 italic">landlord&rsquo;s cert.</em>
              </>
            }
            copy={
              <>
                <p>
                  Every gas safety record is tracked from the day you issue it.
                  Renewals roll up into one card — overdue, 30, 60, 90 days out
                  — and Relay offers to book the round, grouped by street rather
                  than scattered across the month.
                </p>
                <p>
                  The certificate itself is drafted, signed on-screen and sent
                  from the same system.
                </p>
              </>
            }
            scene={<CertsScene />}
          />

          <Vignette
            flip
            eyebrow="The part nobody else does"
            title={
              <>
                It notices when the{" "}
                <em className="text-orange-400 italic">work is done.</em>
              </>
            }
            copy={
              <>
                <p>
                  Reply from your normal email — not from Relay — and it matches
                  your sent message to the open step and closes it. No
                  &ldquo;mark as complete&rdquo;, no app to feed.
                </p>
                <p>
                  A to-do list that maintains itself is the difference between a
                  tool you run and a system that runs for you.
                </p>
              </>
            }
            scene={<LoopScene />}
          />

          <Vignette
            eyebrow="Sunday night, sorted"
            title={
              <>
                Monday is planned{" "}
                <em className="text-orange-400 italic">before it starts.</em>
              </>
            }
            copy={
              <>
                <p>
                  The promises sitting in your inbox become an hour-by-hour
                  week: jobs grouped by area, a buffer held for overruns, admin
                  squeezed into the gaps.
                </p>
                <p>You approve it, or drag it about. Either way it took a minute, not a Sunday evening.</p>
              </>
            }
            scene={<WeekScene />}
          />
        </div>

        <div className="rl-rule" />

        {/* ── The principle ───────────────────────────────────────────── */}
        <section className="py-20 md:py-24">
          <Reveal>
            <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 border-l-[3px] border-l-orange-500 bg-white/[0.03] p-8 md:p-10">
              <Eyebrow>The rule the whole thing is built on</Eyebrow>
              <h2 className="rl-display text-3xl font-medium md:text-4xl">
                Nothing leaves without you.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-[#f0ece3]/65">
                Relay drafts; you send. Every email, every invoice, every chase
                goes out from your address, in your voice, when you decide. The
                AI does the typing and the remembering — your customers only
                ever deal with you.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Under the hood ──────────────────────────────────────────── */}
        <Reveal>
          <section className="rl-mono border-y border-white/8 py-8 text-[11px] leading-loose tracking-[0.14em] text-[#f0ece3]/45 uppercase">
            One quiet system underneath — inbox · clients · quotes &amp;
            invoices · e-signatures · certificates · diary · money · week plan
            <span className="normal-case">
              {" "}
              — your own database, UK-hosted. Email + WhatsApp in, signed PDFs
              out.
            </span>
          </section>
        </Reveal>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <section className="relative py-24 md:py-36">
          <p
            aria-hidden
            className="rl-display rl-ghost pointer-events-none absolute inset-x-0 bottom-0 text-center text-[24vw] leading-none font-semibold"
          >
            relay
          </p>
          <Reveal className="relative">
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Private preview</Eyebrow>
              <h2 className="rl-display text-4xl leading-[1.05] font-medium text-balance md:text-5xl">
                Being built now, with real businesses on the tools.
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-[#f0ece3]/65">
                A gas business and an agency already run their day on Relay
                while it&rsquo;s finished. A handful more will get in before it
                launches properly — shaped around how they actually work.
              </p>
              <div className="mt-9 flex flex-col items-center gap-4">
                <a
                  href={MAILTO}
                  className="rounded-full bg-orange-500 px-8 py-4 text-[15px] font-semibold text-[#1a1005] shadow-[0_10px_40px_-8px_rgba(249,115,22,0.55)] transition-transform hover:scale-[1.03] hover:bg-orange-400"
                >
                  Ask me for a walkthrough
                </a>
                <p className="rl-mono text-[10px] tracking-[0.2em] text-[#f0ece3]/35 uppercase">
                  You found the quiet page — it isn&rsquo;t linked from
                  anywhere. That&rsquo;s deliberate.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Footer ──────────────────────────────────────────────────── */}
        <footer className="rl-mono flex flex-wrap items-center justify-between gap-3 border-t border-white/8 py-8 text-[10px] tracking-[0.18em] text-[#f0ece3]/30 uppercase">
          <span>© 2026 Jefferis Software Solutions · Worthing, England</span>
          <span>Screens are recreations of the current build</span>
        </footer>
      </div>
    </div>
  );
}
