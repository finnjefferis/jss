import type { Metadata } from "next";
import { Suspense } from "react";
import { StartClient } from "./start-client";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "A few taps and you get a straight answer — what we'd build and what it starts at. Then the enquiry lands with Finlay personally.",
  alternates: { canonical: "/start" },
  robots: { index: false, follow: true },
};

export default function StartPage() {
  // Suspense boundary for useSearchParams (?for=website|software|ads presets).
  return (
    <Suspense>
      <StartClient />
    </Suspense>
  );
}
