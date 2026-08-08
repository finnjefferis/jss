import type { Metadata } from "next";
import { StartClient } from "./start-client";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell us what you need in four quick questions and Finlay will come back to you personally — usually the same day.",
  alternates: { canonical: "/start" },
  robots: { index: false, follow: true },
};

export default function StartPage() {
  return <StartClient />;
}
