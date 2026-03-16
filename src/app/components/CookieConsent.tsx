"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";

const GA_ID = "G-NH48FM1Q53";
const CONSENT_KEY = "cookie-consent";

type Consent = "granted" | "denied" | null;

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as Consent;
    if (stored) {
      setConsent(stored);
    } else {
      // Delay banner appearance so it doesn't compete with hero animations
      const timer = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (value: "granted" | "denied") => {
    localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
    setVisible(false);

    // Update GA consent mode
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: value,
      });
    }
  };

  return (
    <>
      {/* GA4 — loads always but respects consent mode (default denied) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: '${consent === "granted" ? "granted" : "denied"}',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
          });
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
          window.gtag = gtag;
        `}
      </Script>

      {/* Banner */}
      {!consent && (
        <div
          className={`
            fixed bottom-5 left-5 z-[9999] max-w-sm
            transition-all duration-700 ease-out
            ${visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8 pointer-events-none"
            }
          `}
        >
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-2xl shadow-black/5 dark:shadow-black/30 p-5">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We use cookies to see what&rsquo;s working.{" "}
              <Link href="/privacy" className="text-coral-600 dark:text-coral-400 hover:underline">Here&rsquo;s the full story.</Link>
            </p>
            <div className="flex items-center gap-2.5 mt-4">
              <button
                onClick={() => handleConsent("granted")}
                className="flex-1 rounded-xl bg-gradient-to-r from-coral-500 to-pink-500 px-4 py-2.5 text-xs font-bold text-white hover:from-coral-600 hover:to-pink-600 transition-all"
              >
                Fine by me
              </button>
              <button
                onClick={() => handleConsent("denied")}
                className="rounded-xl px-4 py-2.5 text-xs font-bold text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              >
                No thanks
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Extend Window for gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
