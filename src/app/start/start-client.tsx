"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Calendar, Check, MessageSquare } from "lucide-react";

/**
 * The site's lead funnel, answer-first: a handful of one-tap questions, then
 * the visitor gets a real answer — what we'd build and a from-price — BEFORE
 * being asked who they are. Contact is two fields, or a zero-typing WhatsApp
 * handoff with their summary prefilled.
 *
 * Plumbing: a Relay lead opens on the FIRST answer (cross-origin POST/PATCH,
 * honeypot, per-lead token), so half-finished runs still reach the board.
 * If Relay is unreachable the questions still work and the send falls back
 * to a prefilled email.
 */

const RELAY = "https://relay-production-7d2c.up.railway.app/api/funnel/lead";
const BOOKING_URL =
  "https://outlook.office.com/bookwithme/user/b44ea33c0eb847a3a69babfcdc453315@jefferissoftware.co.uk?anonymous&ismsaljsauthenabled&ep=plink";
const WHATSAPP = "https://wa.me/447887034503";

declare global {
  interface Window {
    relayTrack?: (event: string) => void;
  }
}

/* Answer values are stored verbatim on the lead so the board reads as
   English. Step keys (service/situation/budget/timeframe/contact) match
   Relay's live-ticker labels. */

type Question = { key: "situation" | "budget"; title: string; options: string[] };
type Result = { rec: string; band: string; extra: string; footnote?: string };

const SERVICES = ["A website", "Bespoke software", "Ads & lead generation", "Not sure yet"] as const;
type Service = (typeof SERVICES)[number];

const TIMEFRAME: { key: "timeframe"; title: string; options: string[] } = {
  key: "timeframe",
  title: "When do you want to move?",
  options: ["As soon as possible", "In the next month", "In the next few months", "No rush"],
};

const BRANCH: Record<Service, { questions: Question[]; result: (a: Record<string, string>) => Result }> = {
  "A website": {
    questions: [
      {
        key: "situation",
        title: "Got a site at the moment?",
        options: ["No — starting fresh", "Yes — it needs replacing", "Yes — it needs work"],
      },
      {
        key: "budget",
        title: "What does it need to do?",
        options: ["Tell people about us", "Take bookings or enquiries", "Sell online", "Not sure yet"],
      },
    ],
    result: (a) => {
      const need = a.budget;
      if (need === "Sell online")
        return {
          rec: "An online shop, done properly",
          band: "from £2,000",
          extra: "Stripe payments, product management, and a checkout that works on a phone — fixed price agreed before we start.",
          footnote: "Hosting & support from £99/mo.",
        };
      if (need === "Take bookings or enquiries")
        return {
          rec: "A site that wins you work",
          band: "from £1,199",
          extra: "Enquiries and bookings built in, content you can edit yourself, live in around two weeks — fixed price agreed before we start.",
          footnote: "Hosting & support from £21/mo.",
        };
      if (need === "Tell people about us")
        return {
          rec: "A clean, fast site that does you justice",
          band: "from £699",
          extra: "Mobile-first, up to five pages, live in under ten days — fixed price agreed before we start.",
          footnote: "Hosting & support from £21/mo.",
        };
      return {
        rec: "We'll shape it together",
        band: "from £699",
        extra: "Most first sites land between £699 and £1,199 — the price is fixed before any work starts.",
        footnote: "Hosting & support from £21/mo.",
      };
    },
  },
  "Bespoke software": {
    questions: [
      {
        key: "situation",
        title: "What kind of thing?",
        options: [
          "Replace spreadsheets & paperwork",
          "A portal for customers",
          "Connect systems that don't talk",
          "Something else",
        ],
      },
    ],
    result: () => ({
      rec: "Scoped first, priced fairly",
      band: "typically from £2,000",
      extra: "Bespoke builds are quoted fixed once scoped — twenty minutes on a call usually pins the whole thing down.",
    }),
  },
  "Ads & lead generation": {
    questions: [
      {
        key: "situation",
        title: "What's the goal?",
        options: ["More enquiries", "Fill a quiet patch", "Launch something new", "Not sure — advise me"],
      },
      {
        key: "budget",
        title: "Monthly ad spend in mind?",
        options: ["Under £300", "£300–£1,000", "£1,000+", "Not sure yet"],
      },
    ],
    result: () => ({
      rec: "The whole pipeline, not just ads",
      band: "from £149/mo + your ad spend",
      extra: "Creatives built from your own site, a landing funnel we build and measure, and every lead tracked to the ad that brought it.",
    }),
  },
  "Not sure yet": {
    questions: [],
    result: () => ({
      rec: "Point me at the problem",
      band: "an honest answer, free",
      extra: "Tell me a little about what's going on and I'll tell you straight what I'd do — and roughly what it would cost.",
    }),
  },
};

/** Final budget value stored on the lead — the band they were shown. */
function bandFor(service: Service, a: Record<string, string>): string {
  const r = BRANCH[service].result(a);
  return r.band;
}

const FOR_PARAM: Record<string, Service> = {
  website: "A website",
  software: "Bespoke software",
  ads: "Ads & lead generation",
};

type LeadRef = { id: string | number; token: string };

export function StartClient() {
  const params = useSearchParams();
  const preset = FOR_PARAM[params.get("for") ?? ""];

  const [service, setService] = useState<Service | null>(preset ?? null);
  const [answers, setAnswers] = useState<Record<string, string>>(
    preset ? { service: preset } : {},
  );
  const [qIndex, setQIndex] = useState(0); // index into branch questions + timeframe
  const [phase, setPhase] = useState<"service" | "questions" | "result" | "thanks">(
    preset ? "questions" : "service",
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [sending, setSending] = useState(false);
  const [offline, setOffline] = useState(false);
  const leadRef = useRef<LeadRef | null>(null);

  // Survive a refresh mid-funnel without opening a duplicate lead.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("jss-lead");
      if (saved) leadRef.current = JSON.parse(saved);
    } catch {}
  }, []);

  const track = useCallback((event: string) => {
    try {
      window.relayTrack?.(event);
    } catch {}
  }, []);

  /** Open the lead on the first answer; top it up on every step after. */
  const sync = useCallback(
    async (nextAnswers: Record<string, string>, stepKey: string, extra?: Record<string, unknown>) => {
      try {
        if (!leadRef.current) {
          const res = await fetch(RELAY, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ answers: nextAnswers, website: "" }),
          });
          if (!res.ok) return false;
          const body = await res.json();
          if (body?.id) {
            leadRef.current = { id: body.id, token: body.token };
            try {
              sessionStorage.setItem("jss-lead", JSON.stringify(leadRef.current));
            } catch {}
          }
          return !!body?.ok;
        }
        const res = await fetch(RELAY, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            id: leadRef.current.id,
            token: leadRef.current.token,
            answers: nextAnswers,
            step: stepKey,
            ...extra,
          }),
        });
        return res.ok;
      } catch {
        return false;
      }
    },
    [],
  );

  const branch = service ? BRANCH[service] : null;
  const questions: Question[] = branch ? [...branch.questions] : [];
  const flow: (Question | typeof TIMEFRAME)[] = [...questions, TIMEFRAME];
  // Before a service is picked the branch length is unknown — assume the
  // longest path (website: 5 screens) so the counter never counts UP mid-flow.
  const totalScreens = service ? (preset ? 0 : 1) + flow.length + 1 : preset ? 4 : 5;
  const screenNo =
    phase === "service" ? 1 : (preset ? 0 : 1) + (phase === "questions" ? qIndex + 1 : flow.length + 1);

  const pickService = (s: Service) => {
    setService(s);
    const next = { ...answers, service: s };
    setAnswers(next);
    track("start: service");
    void sync(next, "service");
    setQIndex(0);
    setPhase("questions");
  };

  const pickAnswer = (q: Question | typeof TIMEFRAME, value: string) => {
    const next = { ...answers, [q.key]: value };
    setAnswers(next);
    track(`start: ${q.key}`);
    void sync(next, q.key);
    if (qIndex + 1 < flow.length) {
      setQIndex(qIndex + 1);
    } else {
      // The payoff — band revealed; store it as the lead's budget line.
      const withBand = { ...next, budget: `${bandFor(service as Service, next)}` };
      setAnswers(withBand);
      track("start: result");
      void sync(withBand, "budget");
      setPhase("result");
    }
  };

  const back = () => {
    if (phase === "result") {
      setPhase("questions");
      setQIndex(flow.length - 1);
    } else if (phase === "questions" && qIndex > 0) {
      setQIndex(qIndex - 1);
    } else if (phase === "questions" && !preset) {
      setPhase("service");
    }
  };

  const submit = async () => {
    if (!name.trim() || !email.trim()) return;
    setSending(true);
    const next = { ...answers, ...(note.trim() ? { message: note.trim() } : {}) };
    track("start: contact");
    if (!leadRef.current) await sync(next, "contact");
    const ok =
      !!leadRef.current &&
      (await sync(next, "contact", {
        name: name.trim(),
        email: email.trim(),
        complete: true,
      }));
    setOffline(!ok);
    try {
      sessionStorage.removeItem("jss-lead");
    } catch {}
    track("start: complete");
    setSending(false);
    setPhase("thanks");
  };

  /** Zero-typing path: their summary lands in Finn's WhatsApp; the lead is
      completed with a note so the board knows to expect the message. */
  const whatsappHandoff = () => {
    const bits = [answers.service, answers.situation, answers.timeframe, answers.budget].filter(Boolean);
    const text = `Hi Finlay — just went through jefferissoftware.co.uk/start. ${bits.join(" · ")}. `;
    track("start: whatsapp");
    void sync(
      { ...answers, message: "Went to WhatsApp with their summary — expect a message from them." },
      "contact",
      { complete: true },
    );
    try {
      sessionStorage.removeItem("jss-lead");
    } catch {}
    window.open(`${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  };

  const result = service ? BRANCH[service].result(answers) : null;
  const first = name.trim().split(" ")[0];
  const software = service === "Bespoke software";

  const optionClass = (picked: boolean) =>
    `w-full text-left rounded-2xl border px-5 py-4 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
      picked
        ? "border-coral-400 bg-coral-50 dark:bg-coral-950/40 text-coral-700 dark:text-coral-300"
        : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-coral-300 dark:hover:border-coral-700 hover:shadow-lg hover:shadow-coral-500/5"
    }`;

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors flex flex-col">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-coral-500 via-pink-500 to-coral-500 z-50" />

      <div className="mx-auto w-full max-w-xl px-5 pt-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <Image src="/jsslogo.png" alt="Jefferis Software Solutions" width={28} height={28} className="dark:invert" />
        </Link>
        {phase !== "thanks" && (
          <span className="text-xs text-zinc-400 dark:text-zinc-500 tabular-nums">
            {Math.min(screenNo, totalScreens)} of {totalScreens}
          </span>
        )}
      </div>

      {phase !== "thanks" && (
        <div className="mx-auto w-full max-w-xl px-5 mt-4">
          <div className="h-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-coral-500 to-pink-500 transition-all duration-500"
              style={{ width: `${(Math.min(screenNo, totalScreens) / totalScreens) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-xl px-5 py-10 flex-1">
        {phase === "service" && (
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">
              What do you need?
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">
              A few taps and you&rsquo;ll get a straight answer — what I&rsquo;d build and what it starts at.
            </p>
            <div className="space-y-3">
              {SERVICES.map((s) => (
                <button key={s} onClick={() => pickService(s)} className={optionClass(service === s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === "questions" && flow[qIndex] && (
          <div key={flow[qIndex].key + qIndex}>
            <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white mb-8">
              {flow[qIndex].title}
            </h1>
            <div className="space-y-3">
              {flow[qIndex].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => pickAnswer(flow[qIndex], opt)}
                  className={optionClass(answers[flow[qIndex].key] === opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
            {(qIndex > 0 || !preset) && (
              <button
                onClick={back}
                className="mt-8 inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            )}
          </div>
        )}

        {phase === "result" && result && (
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
              Based on your answers
            </p>
            <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white mb-5">
              {result.rec}
            </h1>

            <div className="rounded-2xl border border-coral-200 dark:border-coral-800 bg-coral-50/60 dark:bg-coral-950/30 p-6 mb-8">
              <p className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">
                {result.band}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{result.extra}</p>
              {result.footnote && (
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{result.footnote}</p>
              )}
            </div>

            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
              {software ? "Want it scoped properly?" : "Want the exact price?"}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">
              {software
                ? "Tell me where to reach you and I'll come back to you personally — usually the same day."
                : "Two fields and I'll send you the full plan personally — usually the same day."}
            </p>

            <div className="space-y-3">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-coral-400 focus:outline-none"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-coral-400 focus:outline-none"
              />
              {showNote ? (
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Anything worth knowing?"
                  rows={3}
                  autoFocus
                  className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-coral-400 focus:outline-none resize-none"
                />
              ) : (
                <button
                  onClick={() => setShowNote(true)}
                  className="text-xs font-semibold text-zinc-400 hover:text-coral-600 dark:hover:text-coral-400 transition-colors"
                >
                  + Add a note
                </button>
              )}
            </div>

            <button
              onClick={submit}
              disabled={!name.trim() || !email.trim() || sending}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-coral-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-coral-600/25 hover:bg-coral-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {sending ? "Sending…" : software ? "Send it over" : "Send me the plan"}
              {!sending && <ArrowRight className="h-4 w-4" />}
            </button>

            <button
              onClick={whatsappHandoff}
              className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-8 py-4 text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:border-emerald-300 dark:hover:border-emerald-700 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all"
            >
              <MessageSquare className="h-4 w-4" />
              No typing — WhatsApp me this instead
            </button>

            <p className="mt-4 text-[11px] text-zinc-400 dark:text-zinc-500">
              Your details go only to us — see our{" "}
              <Link href="/privacy" className="underline hover:text-coral-600 dark:hover:text-coral-400">
                Privacy Policy
              </Link>
              .
            </p>
            <button
              onClick={back}
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          </div>
        )}

        {phase === "thanks" && (
          <div className="text-center pt-8">
            <span className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-emerald-100 dark:bg-emerald-950">
              <Check className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white mb-3">
              Thanks{first ? `, ${first}` : ""}.
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mb-10">
              {offline
                ? "Something went wrong sending that — sorry. Email me directly and I'll pick it up straight away."
                : "Your enquiry has landed on my desk — I'll come back to you personally, usually the same day."}
            </p>
            {offline ? (
              <a
                href={`mailto:hello@jefferissoftware.co.uk?subject=Project%20enquiry&body=${encodeURIComponent(
                  `Hi Finlay,\n\n${Object.entries(answers)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join("\n")}\n\n${note}\n\n${name}`,
                )}`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-coral-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-coral-600/25 hover:bg-coral-700 transition-all"
              >
                Email me instead
              </a>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-coral-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-coral-600/25 hover:bg-coral-700 transition-all"
                >
                  <Calendar className="h-4 w-4" />
                  Want to talk sooner? Book a call
                </a>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-coral-600 dark:hover:text-coral-400 transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  Or WhatsApp me
                </a>
              </div>
            )}
            <p className="mt-12">
              <Link href="/" className="text-sm text-zinc-400 hover:text-coral-600 dark:hover:text-coral-400 transition-colors">
                &larr; Back to the site
              </Link>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
