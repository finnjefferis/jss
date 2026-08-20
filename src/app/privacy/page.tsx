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
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-10">Last updated: 7 August 2026</p>

        <div className="prose prose-zinc dark:prose-invert prose-sm max-w-none space-y-8 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-zinc-900 dark:[&_h2]:text-zinc-100 [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:leading-relaxed [&_p]:text-zinc-600 dark:[&_p]:text-zinc-400 [&_ul]:text-zinc-600 dark:[&_ul]:text-zinc-400">

          <p>
            This policy explains what personal data Jefferis Software Solutions collects when you use
            jefferissoftware.co.uk or get in touch with us, why we collect it, and the rights you have over it.
            We&rsquo;ve kept it in plain English.
          </p>

          <h2>Who we are</h2>
          <p>
            Jefferis Software Solutions is a web design and software development business operated by
            Finlay Jefferis, based in Worthing, West Sussex, England. For the purposes of UK data
            protection law (the UK GDPR and the Data Protection Act 2018), Finlay Jefferis is the data
            controller for the personal data described in this policy. You can reach us at{" "}
            <a href="mailto:hello@jefferissoftware.co.uk" className="text-coral-600 dark:text-coral-400 hover:underline">hello@jefferissoftware.co.uk</a>.
          </p>

          <h2>The information we collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Enquiries</strong> &mdash; if you contact us by email or WhatsApp, or through the enquiry form on this site, we receive your name, contact details, and whatever you tell us about your project. Form enquiries are stored in Relay, our own business system.</li>
            <li><strong>Bookings</strong> &mdash; if you book a call through our scheduling link, Microsoft Bookings collects the details you provide (name, email, chosen time) and shares them with us.</li>
            <li><strong>Site usage</strong> &mdash; we use Vercel Analytics, which is cookie-free and gives us aggregated figures: pages visited, device type, and approximate location. We can&rsquo;t identify individual visitors from it.</li>
            <li><strong>Visitor numbers</strong> &mdash; we also count visits using our own system, Relay. It sets nothing on your device. We don&rsquo;t store your IP address: each day a random key is generated and destroyed at the end of that day, and your IP address and browser type are combined with that key to produce a short code, so that several pages viewed in one session count as one visit. Once the day&rsquo;s key is destroyed that code can&rsquo;t be traced back to you by anyone, including us. What we keep is the page visited, the referring site, general device and browser type, and the date.</li>
            <li><strong>Page-open records</strong> &mdash; when you visit this site, or open a proposal or demo link we&rsquo;ve sent you, our own systems record the page opened, the date and time, your IP address, your browser type, and the page that referred you. We use this to understand interest in our work &mdash; for example, whether a proposal we sent has been opened.</li>
            <li><strong>Client and project information</strong> &mdash; if you become a client, we hold the information needed to deliver the work and invoice for it. That processing is governed by our agreement with you.</li>
          </ul>

          <h2>Why we use it, and our lawful bases</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Responding to enquiries and preparing proposals</strong> &mdash; because you&rsquo;ve asked us to (steps taken at your request before entering a contract).</li>
            <li><strong>Delivering services and invoicing clients</strong> &mdash; performance of our contract with you, and legal obligations for accounting records.</li>
            <li><strong>Site analytics and page-open records</strong> &mdash; our legitimate interest in understanding whether our website and the proposals we send are being seen, so we can run the business effectively. You can object to this at any time (see &ldquo;Your rights&rdquo; below).</li>
          </ul>
          <p>We don&rsquo;t send marketing emails, and we never sell personal data.</p>

          <h2>Cookies</h2>
          <p>
            This website sets no cookies for ordinary visitors &mdash; which is why you don&rsquo;t see a cookie
            banner. The full detail, including the strictly necessary cookies used only for our own admin
            login, is in our{" "}
            <Link href="/cookies" className="text-coral-600 dark:text-coral-400 hover:underline">Cookie Policy</Link>.
          </p>

          <h2>Who we share data with</h2>
          <p>We use a small number of service providers who process data on our behalf:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Vercel</strong> &mdash; hosts this website and provides its cookie-free analytics.</li>
            <li><strong>Railway</strong> &mdash; hosts our internal business systems, including the page-open records described above.</li>
            <li><strong>Microsoft 365</strong> &mdash; our email and booking calendar.</li>
            <li><strong>WhatsApp (Meta)</strong> &mdash; if you choose to message us there, your messages are handled under WhatsApp&rsquo;s own terms and privacy policy.</li>
          </ul>
          <p>
            We don&rsquo;t share personal data with anyone else unless we&rsquo;re required to by law.
          </p>

          <h2>Where your data is stored</h2>
          <p>
            Some of our providers, including Vercel and Railway, store data on servers in the United
            States. Where personal data leaves the UK, we rely on recognised safeguards &mdash; the UK
            Extension to the EU&ndash;US Data Privacy Framework where the provider is certified, or the
            ICO&rsquo;s approved International Data Transfer Agreement / standard contractual clauses
            otherwise.
          </p>

          <h2>How long we keep it</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Enquiries</strong> &mdash; for as long as the conversation is live, and up to two years after our last contact in case you come back to us.</li>
            <li><strong>Page-open records</strong> &mdash; no longer than 12 months.</li>
            <li><strong>Visitor numbers</strong> &mdash; the daily key is destroyed after 24 hours, which makes the underlying records anonymous. The anonymous records themselves are deleted after two years.</li>
            <li><strong>Client records and invoices</strong> &mdash; six years, as required for tax and accounting purposes.</li>
          </ul>

          <h2>Your rights</h2>
          <p>Under UK GDPR you have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Ask for a copy of the personal data we hold about you.</li>
            <li>Have inaccurate data corrected, or incomplete data completed.</li>
            <li>Ask us to delete your data.</li>
            <li>Restrict or object to our processing &mdash; including any processing based on legitimate interests, such as page-open records.</li>
            <li>Receive your data in a portable format.</li>
          </ul>
          <p>
            To exercise any of these, email{" "}
            <a href="mailto:hello@jefferissoftware.co.uk" className="text-coral-600 dark:text-coral-400 hover:underline">hello@jefferissoftware.co.uk</a>{" "}
            and we&rsquo;ll respond within one month. If you&rsquo;re unhappy with how we&rsquo;ve handled your data,
            you can complain to the Information Commissioner&rsquo;s Office at{" "}
            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-coral-600 dark:text-coral-400 hover:underline">ico.org.uk</a>{" "}
            or on 0303 123 1113.
          </p>

          <h2>Automated decisions</h2>
          <p>
            We don&rsquo;t use automated decision-making or profiling that produces legal or similarly
            significant effects.
          </p>

          <h2>Children</h2>
          <p>
            This site is aimed at businesses and we don&rsquo;t knowingly collect data from children. If you
            believe a child has given us personal data, contact us and we&rsquo;ll delete it.
          </p>

          <h2>Security</h2>
          <p>
            The site is served over HTTPS with modern security headers, access to our systems is limited
            to those who need it, and we use reputable hosting providers. No system is perfectly secure,
            but we keep the data we hold to a minimum.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If we change how we handle personal data, we&rsquo;ll update this page and the date at the top.
          </p>

          <h2>Contact</h2>
          <p>
            Questions? Email{" "}
            <a href="mailto:hello@jefferissoftware.co.uk" className="text-coral-600 dark:text-coral-400 hover:underline">hello@jefferissoftware.co.uk</a>.
          </p>

        </div>

        <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-6">
          <Link href="/terms" className="text-sm text-coral-600 dark:text-coral-400 hover:underline">
            Terms of Service &rarr;
          </Link>
          <Link href="/cookies" className="text-sm text-coral-600 dark:text-coral-400 hover:underline">
            Cookie Policy &rarr;
          </Link>
        </div>
      </article>
    </main>
  );
}
