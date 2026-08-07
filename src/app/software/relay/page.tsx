import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "../../components/Footer";
import { NavHeader } from "../../components/NavHeader";
import { SceneStage } from "../../components/RelayShowcase";
import { RevealSection } from "../../components/RevealSection";
import { ScrollArrow } from "../../components/ScrollArrow";
import {
  CertsScene,
  DepthDemo,
  InboxScene,
  LoopScene,
  MoneyScene,
  WeekScene,
  WhatsAppScene,
} from "../../relay/scenes";

const SITE_URL = "https://www.jefferissoftware.co.uk";

const WALKTHROUGH =
  "mailto:hello@jefferissoftware.co.uk?subject=Relay%20%E2%80%94%20ask%20us%20for%20a%20walkthrough";

export const metadata: Metadata = {
  title: "Relay — The Back Office That Runs Itself",
  description:
    "Relay reads every email and WhatsApp as it lands — works out the job, drafts the paperwork, chases the money, and ticks the work off when the reply comes back. In private preview.",
  alternates: { canonical: `${SITE_URL}/software/relay` },
  openGraph: {
    title: "Relay — The Back Office That Runs Itself | Jefferis Software Solutions",
    description:
      "Automations that go deeper. Relay drafts the paperwork, chases the money, and ticks the work off itself. In private preview with real businesses now.",
    url: `${SITE_URL}/software/relay`,
  },
};

const relaySchema = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Custom Software",
        item: `${SITE_URL}/software`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Relay",
        item: `${SITE_URL}/software/relay`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Relay",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "The back office that runs itself. Relay reads every email and WhatsApp as it lands, drafts the paperwork, chases the money, and ticks the work off when the reply comes back.",
    url: `${SITE_URL}/software/relay`,
    author: { "@id": `${SITE_URL}/#organization` },
  },
];

/* One deep automation per section — copy on one side, the recreated screen
   acting it out on the other. */
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
    <RevealSection className="py-14 md:py-20 border-t border-zinc-100 dark:border-zinc-900">
      {/* The scene always takes the wide column — flipping swaps the track
          widths too, or the demo lands in the 5fr side and gets cropped. */}
      <div
        className={`mx-auto max-w-6xl px-5 md:px-8 grid items-center gap-10 lg:gap-14 ${
          flip ? "lg:grid-cols-[7fr_5fr]" : "lg:grid-cols-[5fr_7fr]"
        }`}
      >
        <div
          data-reveal
          style={{ "--d": 0 } as React.CSSProperties}
          className={flip ? "lg:order-2" : ""}
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
            {eyebrow}
          </p>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:text-4xl leading-[1.12]">
            {title}
          </h2>
          <div className="mt-5 space-y-4 text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {copy}
          </div>
        </div>
        <div
          data-reveal
          style={{ "--d": 150 } as React.CSSProperties}
          className={`min-w-0 ${flip ? "lg:order-1" : ""}`}
        >
          <SceneStage>{scene}</SceneStage>
        </div>
      </div>
    </RevealSection>
  );
}

function Grad({ children }: { children: ReactNode }) {
  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-600 to-pink-600">
      {children}
    </span>
  );
}

const SYSTEM_PIECES = [
  "Unified inbox",
  "Clients",
  "Quotes & invoices",
  "E-signatures",
  "Certificates",
  "Diary",
  "Money",
  "Week plan",
];

export default function RelayProductPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(relaySchema) }}
      />
      <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-coral-500 via-pink-500 to-coral-500 z-50" />

        <NavHeader />

        {/* Hero */}
        <RevealSection className="relative pt-12 md:pt-20 pb-20 md:pb-28 overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-coral-500/[0.04] dark:bg-coral-500/[0.03] rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500/[0.04] dark:bg-pink-500/[0.03] rounded-full blur-3xl -translate-x-1/3 translate-y-1/4" />
          </div>

          <div className="mx-auto max-w-6xl px-5 md:px-8 relative z-10">
            <div className="max-w-3xl">
              <div
                data-reveal
                style={{ "--d": 0 } as React.CSSProperties}
                className="mb-4 flex flex-wrap items-center gap-3"
              >
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600 dark:text-amber-400">
                  Our flagship product
                </p>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                  In private preview
                </span>
              </div>
              <h1
                data-reveal
                style={{ "--d": 120, "--reveal-y": "16px" } as React.CSSProperties}
                className="text-4xl font-extrabold leading-[1.12] text-zinc-900 dark:text-white sm:text-5xl lg:text-[3.5rem] mb-6"
              >
                The back office that{" "}
                <span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-coral-600 to-pink-600"
                  data-gradient
                  style={{ "--gd": 500 } as React.CSSProperties}
                >
                  runs itself.
                </span>
              </h1>
              <p
                data-reveal
                style={{ "--d": 240 } as React.CSSProperties}
                className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed mb-10"
              >
                Relay reads every email and WhatsApp as it lands — works out the
                job, drafts the paperwork, chases the money, and ticks the work
                off when the reply comes back. Not rules and reminders.{" "}
                <span className="font-semibold text-zinc-700 dark:text-zinc-200">
                  Automations that go deeper.
                </span>
              </p>
              <div
                data-reveal
                style={{ "--d": 360 } as React.CSSProperties}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href={WALKTHROUGH}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-coral-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-coral-600/25 hover:bg-coral-700 hover:scale-[1.02] transition-all"
                >
                  Ask us for a walkthrough
                </a>
                <a
                  href="#demo"
                  className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-coral-600 dark:hover:text-coral-400 transition-colors"
                >
                  Watch it work &darr;
                </a>
              </div>
            </div>

            <div
              id="demo"
              data-reveal
              style={{ "--d": 420 } as React.CSSProperties}
              className="mt-14 scroll-mt-24"
            >
              <SceneStage caption="Rebuilt from the app's actual components — the real interface, acting out a real morning">
                <InboxScene />
              </SceneStage>
            </div>
          </div>
          <ScrollArrow target="levels" />
        </RevealSection>

        {/* The depth argument */}
        <RevealSection
          id="levels"
          className="py-16 md:py-24 border-t border-zinc-100 dark:border-zinc-900"
        >
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="text-center mb-14">
              <p
                data-reveal
                style={{ "--d": 0 } as React.CSSProperties}
                className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400"
              >
                Why &ldquo;automation&rdquo; usually disappoints
              </p>
              <h2
                data-reveal
                style={{ "--d": 80 } as React.CSSProperties}
                className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:text-4xl mb-4"
              >
                Every automation you&apos;ve tried{" "}
                <Grad>stops at the surface.</Grad>
              </h2>
              <p
                data-reveal
                style={{ "--d": 160 } as React.CSSProperties}
                className="text-base text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto"
              >
                Notification tools tell you work exists. Zapier-style tools move
                it somewhere else. Either way the quote still isn&apos;t
                written, the visit isn&apos;t booked and the invoice isn&apos;t
                chased — by you, at nine o&apos;clock at night. Relay is built
                for the third level.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div
                data-reveal
                style={{ "--d": 240 } as React.CSSProperties}
                className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-7 opacity-70"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
                  Level 1 — Notify
                </p>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  Sees it.
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  A ping that says you&apos;ve got mail. Everything after the
                  ping is still your evening.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-3.5 py-2 text-xs text-zinc-500 dark:text-zinc-400">
                  🔔 1 new message from Sarah
                </div>
              </div>

              <div
                data-reveal
                style={{ "--d": 320 } as React.CSSProperties}
                className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-7 opacity-70"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
                  Level 2 — Move
                </p>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  Files it.
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Copies the message into a spreadsheet or a board. A tidy pile
                  is still a pile.
                </p>
                <div className="mt-5 rounded-lg bg-zinc-900 dark:bg-zinc-950 px-3 py-2.5 font-mono text-[10px] leading-relaxed text-zinc-400">
                  &rarr; sheet.append(&#123; from: &ldquo;Sarah&rdquo;, wants:
                  &ldquo;service + cert&rdquo; &#125;)
                  <br />
                  <span className="text-zinc-600">// …now what?</span>
                </div>
              </div>

              <div
                data-reveal
                style={{ "--d": 400 } as React.CSSProperties}
                className="rounded-2xl border border-coral-200 dark:border-coral-800 bg-coral-50/50 dark:bg-coral-950/20 p-7 shadow-lg shadow-coral-500/10"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-coral-600 dark:text-coral-400 mb-3">
                  Level 3 — Finish · Relay
                </p>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  Does it.
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Reads the message, prices the job from your rates, drafts the
                  invoice, books the visit. One tap from you, and it&apos;s
                  done.
                </p>
                <SceneStage pad="p-3" className="mt-5">
                  <DepthDemo />
                </SceneStage>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Vignettes — one deep automation at a time */}
        <Vignette
          eyebrow="Who owes you what"
          title={
            <>
              It counts what you&apos;re owed —{" "}
              <Grad>and drafts the chase.</Grad>
            </>
          }
          copy={
            <>
              <p>
                Every invoice is watched from the day it goes out. At 5, 7 and
                30 days overdue the debt surfaces on your dashboard, and Relay
                writes the nudge in your voice — a little firmer each time.
              </p>
              <p>
                You read it, maybe tweak a word, and press send. That&apos;s the
                whole job.
              </p>
            </>
          }
          scene={<MoneyScene />}
        />

        <Vignette
          flip
          eyebrow="Texts are jobs too"
          title={
            <>
              A WhatsApp at 9:14 is a <Grad>booked job by 9:21.</Grad>
            </>
          }
          copy={
            <>
              <p>
                Relay links your own WhatsApp — the number your customers
                already have. An unknown mobile with an address in it becomes a
                client record, a job and a diary slot before the kettle&apos;s
                boiled.
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
              It never forgets a <Grad>landlord&apos;s cert.</Grad>
            </>
          }
          copy={
            <>
              <p>
                Every gas safety record is tracked from the day you issue it.
                Renewals roll up into one card — overdue, 30, 60, 90 days out —
                and Relay offers to book the round, grouped by street rather
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
              It notices when the <Grad>work is done.</Grad>
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
              Monday is planned <Grad>before it starts.</Grad>
            </>
          }
          copy={
            <>
              <p>
                The promises sitting in your inbox become an hour-by-hour week:
                jobs grouped by area, a buffer held for overruns, admin squeezed
                into the gaps.
              </p>
              <p>
                You approve it, or drag it about. Either way it took a minute,
                not a Sunday evening.
              </p>
            </>
          }
          scene={<WeekScene />}
        />

        {/* The principle */}
        <RevealSection className="py-16 md:py-24 border-t border-zinc-100 dark:border-zinc-900">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div
              data-reveal
              style={{ "--d": 0 } as React.CSSProperties}
              className="mx-auto max-w-3xl rounded-2xl border border-zinc-100 dark:border-zinc-800 border-l-[3px] border-l-coral-500 dark:border-l-coral-500 bg-white dark:bg-zinc-900/50 p-8 md:p-10 shadow-lg shadow-coral-500/5"
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
                The rule the whole thing is built on
              </p>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 md:text-3xl mb-4">
                Nothing leaves without you.
              </h2>
              <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Relay drafts; you send. Every email, every invoice, every chase
                goes out from your address, in your voice, when you decide. The
                AI does the typing and the remembering — your customers only
                ever deal with you.
              </p>
            </div>
          </div>
        </RevealSection>

        {/* Under the hood */}
        <RevealSection className="py-12 md:py-16 border-t border-zinc-100 dark:border-zinc-900">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div
              data-reveal
              style={{ "--d": 0 } as React.CSSProperties}
              className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 shrink-0">
                One quiet system
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {SYSTEM_PIECES.map((piece) => (
                  <span
                    key={piece}
                    className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:border-coral-300 dark:hover:border-coral-700 hover:text-coral-600 dark:hover:text-coral-400 transition-colors duration-200"
                  >
                    {piece}
                  </span>
                ))}
                <span className="text-xs text-zinc-400 dark:text-zinc-500 ml-1">
                  — your own database, UK-hosted. Email + WhatsApp in, signed
                  PDFs out.
                </span>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* CTA */}
        <RevealSection className="py-16 md:py-24 border-t border-zinc-100 dark:border-zinc-900">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div
              data-reveal
              style={{ "--d": 0 } as React.CSSProperties}
              className="rounded-3xl bg-gradient-to-br from-coral-600 to-pink-700 p-8 md:p-14 relative overflow-hidden"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.08),_transparent_60%)]" />

              <div className="relative z-10 max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-coral-200 mb-3">
                  Private preview
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                  Being built now, with real businesses on the tools.
                </h2>
                <p className="text-coral-100 text-sm leading-relaxed max-w-lg mb-8">
                  A gas business and an agency already run their day on Relay
                  while it&apos;s finished. A handful more will get in before it
                  launches properly — shaped around how they actually work.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={WALKTHROUGH}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-coral-700 shadow-xl hover:bg-coral-50 hover:scale-[1.02] transition-all"
                  >
                    Ask us for a walkthrough
                  </a>
                  <Link
                    href="/software"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-8 py-4 text-sm font-bold text-white hover:bg-white/10 transition-colors"
                  >
                    See our bespoke builds &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        <Footer />
      </main>
    </>
  );
}
