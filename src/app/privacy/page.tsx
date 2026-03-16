import type { Metadata } from "next";
import Link from "next/link";
import { BackButton } from "../work/[slug]/BackButton";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Jefferis Software Solutions collects, uses, and protects your data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-coral-500 via-pink-500 to-coral-500 z-50" />

      <div className="mx-auto max-w-3xl px-5 md:px-8 pt-8 pb-4">
        <BackButton />
      </div>

      <article className="mx-auto max-w-3xl px-5 md:px-8 py-12 md:py-16">
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-10">Last updated: 16 March 2026</p>

        <div className="prose prose-zinc dark:prose-invert prose-sm max-w-none space-y-8 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-zinc-900 dark:[&_h2]:text-zinc-100 [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:leading-relaxed [&_p]:text-zinc-600 dark:[&_p]:text-zinc-400 [&_ul]:text-zinc-600 dark:[&_ul]:text-zinc-400">

          <p>
            Jefferis Software Solutions (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a UK-based web design and software development business operated by Finlay Jefferis. We take your privacy seriously and keep things simple.
          </p>

          <h2>What we collect</h2>
          <p>We only collect information that helps us do our job or improve the site:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Contact details</strong> &mdash; name, email, phone number, and anything you share when you get in touch via our contact form, WhatsApp, or email.</li>
            <li><strong>Analytics data</strong> &mdash; anonymous usage data via Google Analytics (GA4) and Vercel Analytics. This includes pages visited, device type, and approximate location. No personal identifiers are stored. Analytics cookies only activate if you consent.</li>
            <li><strong>Booking information</strong> &mdash; if you book a call via our scheduling tool, we receive the details you provide (name, email, time slot).</li>
          </ul>

          <h2>How we use it</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To respond to enquiries and deliver our services.</li>
            <li>To understand how people use the site so we can make it better.</li>
            <li>To send you project updates if you&rsquo;re a client. We don&rsquo;t do marketing emails.</li>
          </ul>

          <h2>Cookies</h2>
          <p>
            We use a small number of cookies. Essential cookies (like your theme preference) work without consent. Analytics cookies from Google Analytics only activate after you give consent via the banner. You can change your mind any time by clearing your browser cookies.
          </p>

          <h2>Third parties</h2>
          <p>We use the following services that may process data on our behalf:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Vercel</strong> &mdash; hosting and anonymous analytics.</li>
            <li><strong>Google Analytics</strong> &mdash; anonymous site usage data (consent required).</li>
            <li><strong>Microsoft Outlook</strong> &mdash; booking calendar.</li>
          </ul>
          <p>We don&rsquo;t sell or share your data with anyone else.</p>

          <h2>Your rights</h2>
          <p>
            Under UK GDPR, you can request access to, correction of, or deletion of any personal data we hold. Just email us at{" "}
            <a href="mailto:hello@jefferissoftware.co.uk" className="text-coral-600 dark:text-coral-400 hover:underline">hello@jefferissoftware.co.uk</a>.
          </p>

          <h2>Data retention</h2>
          <p>
            We keep contact information for as long as it&rsquo;s relevant to an active project or enquiry. Analytics data is retained for 14 months (Google&rsquo;s default) and is not personally identifiable.
          </p>

          <h2>Contact</h2>
          <p>
            Questions? Email{" "}
            <a href="mailto:hello@jefferissoftware.co.uk" className="text-coral-600 dark:text-coral-400 hover:underline">hello@jefferissoftware.co.uk</a>.
          </p>

        </div>

        <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <Link href="/terms" className="text-sm text-coral-600 dark:text-coral-400 hover:underline">
            Terms of Service &rarr;
          </Link>
        </div>
      </article>
    </main>
  );
}
