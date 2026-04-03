import type { Metadata } from "next";
import Link from "next/link";
import { BackButton } from "../work/[slug]/BackButton";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Jefferis Software Solutions.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-coral-500 via-pink-500 to-coral-500 z-50" />

      <div className="mx-auto max-w-3xl px-5 md:px-8 pt-8 pb-4">
        <BackButton />
      </div>

      <article className="mx-auto max-w-3xl px-5 md:px-8 py-12 md:py-16">
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">Terms of Service</h1>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-10">Last updated: 16 March 2026</p>

        <div className="prose prose-zinc dark:prose-invert prose-sm max-w-none space-y-8 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-zinc-900 dark:[&_h2]:text-zinc-100 [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:leading-relaxed [&_p]:text-zinc-600 dark:[&_p]:text-zinc-400 [&_ul]:text-zinc-600 dark:[&_ul]:text-zinc-400">

          <p>
            These terms apply to use of the jefferissoftware.co.uk website and any services provided by Jefferis Software Solutions, operated by Finlay Jefferis in the United Kingdom.
          </p>

          <h2>Our services</h2>
          <p>
            We provide web design, web development, and bespoke software development services. All project work is governed by a separate written proposal or contract agreed before work begins. These terms cover use of this website.
          </p>

          <h2>Use of this website</h2>
          <p>You may browse this site freely. You agree not to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Scrape, copy, or reproduce content without permission.</li>
            <li>Attempt to interfere with the site&rsquo;s operation.</li>
            <li>Use automated tools to access the site in a way that impacts performance.</li>
          </ul>

          <h2>Intellectual property</h2>
          <p>
            All content on this site &mdash; including design, copy, code, and images &mdash; is owned by Jefferis Software Solutions unless otherwise stated. Client work shown in case studies is displayed with permission.
          </p>

          <h2>Project work</h2>
          <p>
            When you engage us for a project, you&rsquo;ll receive a written proposal with a fixed scope and price. That proposal, once accepted, forms the agreement for that work. Key points:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Prices are fixed once a proposal is accepted. Additional work outside the agreed scope is quoted separately.</li>
            <li>Website services are billed monthly. Custom software projects are quoted and invoiced per project as agreed in the proposal.</li>
            <li>You own the final deliverables once paid in full. We retain the right to showcase the work in our portfolio unless you ask us not to.</li>
          </ul>

          <h2>Hosting &amp; maintenance</h2>
          <p>
            Ongoing hosting and maintenance is provided at the rate specified in your proposal. This covers hosting, SSL, and routine maintenance. It does not cover new features, redesigns, or content changes beyond what&rsquo;s included.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            We do our best to deliver quality work on time, but we can&rsquo;t be liable for indirect losses, lost revenue, or issues caused by third-party services (hosting providers, payment gateways, etc.). Our total liability is limited to the fees you&rsquo;ve paid us for the relevant project.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may update these terms occasionally. The date at the top tells you when they were last changed.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of England and Wales.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Email{" "}
            <a href="mailto:hello@jefferissoftware.co.uk" className="text-coral-600 dark:text-coral-400 hover:underline">hello@jefferissoftware.co.uk</a>.
          </p>

        </div>

        <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <Link href="/privacy" className="text-sm text-coral-600 dark:text-coral-400 hover:underline">
            Privacy Policy &rarr;
          </Link>
        </div>
      </article>
    </main>
  );
}
