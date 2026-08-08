"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Calendar, Check, MessageSquare } from "lucide-react";

/**
 * The site's own lead funnel — four one-tap questions, then contact details,
 * feeding straight into Relay's Lead Desk. A lead record opens on the FIRST
 * answer (before any contact details), so even a half-finished run shows up
 * on the board. If Relay is unreachable the funnel degrades gracefully:
 * questions still work, and the thanks screen falls back to email/WhatsApp.
 */

const RELAY = "https://relay-production-7d2c.up.railway.app/api/funnel/lead";
const BOOKING_URL =
  "https://outlook.office.com/bookwithme/user/b44ea33c0eb847a3a69babfcdc453315@jefferissoftware.co.uk?anonymous&ismsaljsauthenabled&ep=plink";

declare global {
  interface Window {
    relayTrack?: (event: string) => void;
  }
}

/* Answer values are stored verbatim on the lead, so they read as English on
   the board — no label maps on the other side. */
const QUESTIONS: { key: string; title: string; options: string[] }[] = [
  {
    key: "service",
    title: "What do you need?",
    options: ["A website", "Bespoke software", "Ads & lead generation", "Not sure yet"],
  },
  {
    key: "situation",
    title: "Where are you starting from?",
    options: [
      "Starting from scratch",
      "Replacing something outdated",
      "Improving what I have",
      "Just exploring",
    ],
  },
  {
    key: "timeframe",
    title: "When do you want to move?",
    options: ["As soon as possible", "In the next month", "In the next few months", "No rush"],
  },
  {
    key: "budget",
    title: "Rough budget in mind?",
    options: ["Under £1,000", "£1,000–£3,000", "£3,000–£10,000", "£10,000+", "Not sure yet"],
  },
];

type LeadRef = { id: string | number; token: string };

export function StartClient() {
  const [step, setStep] = useState(0); // 0..3 questions, 4 contact, 5 thanks
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
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

  const pick = (key: string, value: string) => {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    track(`start: ${key}`);
    void sync(next, key);
    setStep((s) => s + 1);
  };

  const submit = async () => {
    if (!name.trim() || !email.trim()) return;
    setSending(true);
    const next = { ...answers, ...(message.trim() ? { message: message.trim() } : {}) };
    track("start: contact");
    // A lead may not exist yet if every earlier call failed — try once more.
    if (!leadRef.current) await sync(next, "contact");
    const ok =
      !!leadRef.current &&
      (await sync(next, "contact", {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        complete: true,
      }));
    setOffline(!ok);
    try {
      sessionStorage.removeItem("jss-lead");
    } catch {}
    track("start: complete");
    setSending(false);
    setStep(5);
  };

  const question = step < QUESTIONS.length ? QUESTIONS[step] : null;
  const first = name.trim().split(" ")[0];

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors flex flex-col">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-coral-500 via-pink-500 to-coral-500 z-50" />

      {/* Quiet header — the logo is the only exit sign. */}
      <div className="mx-auto w-full max-w-xl px-5 pt-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <Image src="/jsslogo.png" alt="Jefferis Software Solutions" width={28} height={28} className="dark:invert" />
        </Link>
        {step < 5 && (
          <span className="text-xs text-zinc-400 dark:text-zinc-500 tabular-nums">
            {Math.min(step + 1, 5)} of 5
          </span>
        )}
      </div>

      {/* Progress */}
      {step < 5 && (
        <div className="mx-auto w-full max-w-xl px-5 mt-4">
          <div className="h-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-coral-500 to-pink-500 transition-all duration-500"
              style={{ width: `${((step + 1) / 5) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-xl px-5 py-10 flex-1">
        {question && (
          <div key={question.key}>
            <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white mb-8">
              {question.title}
            </h1>
            <div className="space-y-3">
              {question.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => pick(question.key, opt)}
                  className={`w-full text-left rounded-2xl border px-5 py-4 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                    answers[question.key] === opt
                      ? "border-coral-400 bg-coral-50 dark:bg-coral-950/40 text-coral-700 dark:text-coral-300"
                      : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-coral-300 dark:hover:border-coral-700 hover:shadow-lg hover:shadow-coral-500/5"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="mt-8 inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            )}
          </div>
        )}

        {step === 4 && (
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">
              Where should I reply?
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">
              Your enquiry comes straight to me — Finlay — and I&rsquo;ll come back to you personally,
              usually the same day.
            </p>
            <div className="space-y-3">
              {/* Honeypot — real people never see or fill this. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
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
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone (optional)"
                className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-coral-400 focus:outline-none"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Anything else worth knowing? (optional)"
                rows={3}
                className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:border-coral-400 focus:outline-none resize-none"
              />
            </div>
            <button
              onClick={submit}
              disabled={!name.trim() || !email.trim() || sending}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-coral-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-coral-600/25 hover:bg-coral-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {sending ? "Sending…" : "Send my enquiry"}
              {!sending && <ArrowRight className="h-4 w-4" />}
            </button>
            <p className="mt-4 text-[11px] text-zinc-400 dark:text-zinc-500">
              Your details go only to us — see our{" "}
              <Link href="/privacy" className="underline hover:text-coral-600 dark:hover:text-coral-400">
                Privacy Policy
              </Link>
              .
            </p>
            <button
              onClick={() => setStep(3)}
              className="mt-6 inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          </div>
        )}

        {step === 5 && (
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
                    .join("\n")}\n\n${message}\n\n${name} · ${phone}`,
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
                  href="https://wa.me/447887034503"
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
