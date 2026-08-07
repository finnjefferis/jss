import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";
import RelayClient from "./relay-client";
import "./relay.css";

/* The quiet page. Not in the sitemap, not linked from the site, and told to
   every crawler that it doesn't exist. Shared by Finn, person to person. */

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  variable: "--font-rl-display",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-rl-mono",
});

// Inter is what the real app is set in — the recreated screens use it.
const app = Inter({
  subsets: ["latin"],
  variable: "--font-rl-app",
});

export const metadata: Metadata = {
  title: { absolute: "Relay — the back office that runs itself" },
  description:
    "Automations that go deeper. Relay reads every email and WhatsApp as it lands, drafts the paperwork, chases the money, and ticks the work off when the reply comes back. In private preview.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: null },
  openGraph: {
    title: "Relay — the back office that runs itself",
    description:
      "Automations that go deeper. In private preview with real businesses now.",
  },
};

export default function RelayPage() {
  return (
    <div className={`${display.variable} ${mono.variable} ${app.variable}`}>
      <RelayClient />
    </div>
  );
}
