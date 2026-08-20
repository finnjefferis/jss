import type { Metadata } from "next";
import Link from "next/link";
import { BackButton } from "../work/[slug]/BackButton";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "The cookies and local storage used by jefferissoftware.co.uk.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-coral-500 via-pink-500 to-coral-500 z-50" />

      <div className="mx-auto max-w-3xl px-5 md:px-8 pt-8 pb-4">
        <BackButton />
      </div>

      <article className="mx-auto max-w-3xl px-5 md:px-8 py-12 md:py-16">
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">Cookie Policy</h1>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-10">Last updated: 7 August 2026</p>

        <div className="prose prose-zinc dark:prose-invert prose-sm max-w-none space-y-8 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-zinc-900 dark:[&_h2]:text-zinc-100 [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:leading-relaxed [&_p]:text-zinc-600 dark:[&_p]:text-zinc-400 [&_ul]:text-zinc-600 dark:[&_ul]:text-zinc-400">

          <p>
            Cookies are small files a website stores on your device to remember things between visits.
            UK law (the Privacy and Electronic Communications Regulations) requires consent before a
            site stores anything on your device that isn&rsquo;t strictly necessary. This page explains
            exactly what this site stores &mdash; which is very little.
          </p>

          <h2>The short version</h2>
          <p>
            Browsing jefferissoftware.co.uk sets <strong>no cookies at all</strong>. That&rsquo;s why there&rsquo;s
            no cookie banner &mdash; there&rsquo;s nothing to consent to.
          </p>

          <h2>Strictly necessary cookies</h2>
          <p>
            The only cookies this site can set are two session cookies (<code>admin_session</code> and{" "}
            <code>admin_session_hash</code>) used to keep us signed in to our own admin area. They&rsquo;re
            only created if someone signs in at the admin login, they expire after 24 hours, and they&rsquo;re
            never set for ordinary visitors. Strictly necessary cookies like these don&rsquo;t require
            consent.
          </p>

          <h2>Local storage</h2>
          <p>
            The site checks your browser&rsquo;s local storage for a saved <code>theme</code> preference
            (light or dark mode). This stays on your device, is never sent to us, and contains nothing
            personal &mdash; if it isn&rsquo;t set, the site simply follows your system&rsquo;s appearance setting.
          </p>

          <h2>Analytics without cookies</h2>
          <p>
            We deliberately chose analytics that don&rsquo;t need cookies or a consent banner:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Vercel Analytics</strong> &mdash; aggregated, cookie-free page statistics. Nothing is stored on your device and individual visitors can&rsquo;t be identified.</li>
            <li><strong>Our own page-open records</strong> &mdash; a small first-party script notes when a page or a shared proposal link is opened. It stores nothing on your device either; what it collects and how long we keep it is covered in our <Link href="/privacy" className="text-coral-600 dark:text-coral-400 hover:underline">Privacy Policy</Link>.</li>
            <li><strong>Our own visitor counts</strong> &mdash; a second first-party script counts visits. It reads and writes nothing on your device, and we don&rsquo;t keep your IP address: the key used to recognise a repeat visit within one day is destroyed after 24 hours, after which the records can&rsquo;t be linked back to anyone. Details are in our <Link href="/privacy" className="text-coral-600 dark:text-coral-400 hover:underline">Privacy Policy</Link>.</li>
          </ul>
          <p>
            We don&rsquo;t use Google Analytics, advertising pixels, or any third-party tracking cookies.
          </p>

          <h2>Managing cookies</h2>
          <p>
            You can block or delete cookies for any site in your browser&rsquo;s settings &mdash; look under
            Privacy in Safari, Chrome, Firefox, or Edge. Because this site works without cookies,
            blocking them won&rsquo;t break anything here.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If we ever introduce cookies that need your consent, we&rsquo;ll ask for it first and update this
            page and the date at the top.
          </p>

          <h2>Contact</h2>
          <p>
            Questions? Email{" "}
            <a href="mailto:hello@jefferissoftware.co.uk" className="text-coral-600 dark:text-coral-400 hover:underline">hello@jefferissoftware.co.uk</a>.
          </p>

        </div>

        <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-6">
          <Link href="/privacy" className="text-sm text-coral-600 dark:text-coral-400 hover:underline">
            Privacy Policy &rarr;
          </Link>
          <Link href="/terms" className="text-sm text-coral-600 dark:text-coral-400 hover:underline">
            Terms of Service &rarr;
          </Link>
        </div>
      </article>
    </main>
  );
}
