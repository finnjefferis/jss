"use client";

import Image from "next/image";
import Link from "next/link";
import { useReveal } from "../hooks/useReveal";

export function Footer() {
  const footerRef = useReveal<HTMLDivElement>(0.5);

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-10 text-center text-xs text-zinc-500">
      <div ref={footerRef} className="mx-auto max-w-6xl px-5 md:px-8 lg:px-10 flex flex-col items-center gap-3">
        <div data-reveal style={{ "--d": 0 } as React.CSSProperties}>
          <Image
            src="/jsslogo.png"
            alt="Jefferis Software Solutions"
            width={40}
            height={40}
            className="dark:invert mx-auto"
          />
        </div>
        <p data-reveal style={{ "--d": 100 } as React.CSSProperties}>
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">Jefferis Software Solutions</span>
          {" "}&middot; Hove, East Sussex &middot;{" "}
          <a href="tel:+447887034503" className="hover:text-coral-600 dark:hover:text-coral-400 transition-colors">07887 034503</a>
          {" "}&middot;{" "}
          <a href="mailto:hello@jefferissoftware.co.uk" className="hover:text-coral-600 dark:hover:text-coral-400 transition-colors">hello@jefferissoftware.co.uk</a>
        </p>
        <nav data-reveal style={{ "--d": 150 } as React.CSSProperties} className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-zinc-500 dark:text-zinc-400">
          <Link href="/work" className="hover:text-coral-600 dark:hover:text-coral-400 transition-colors">Work</Link>
          <Link href="/packages" className="hover:text-coral-600 dark:hover:text-coral-400 transition-colors">Packages</Link>
          <Link href="/software" className="hover:text-coral-600 dark:hover:text-coral-400 transition-colors">Software</Link>
          <Link href="/ads" className="hover:text-coral-600 dark:hover:text-coral-400 transition-colors">Ads</Link>
          <Link href="/web-design-brighton-hove" className="hover:text-coral-600 dark:hover:text-coral-400 transition-colors">Web design in Brighton &amp; Hove</Link>
        </nav>
        <div data-reveal style={{ "--d": 200 } as React.CSSProperties} className="flex items-center gap-3 text-zinc-400 dark:text-zinc-500">
          <Link href="/privacy" className="hover:text-coral-600 dark:hover:text-coral-400 transition-colors">Privacy</Link>
          <span>&middot;</span>
          <Link href="/terms" className="hover:text-coral-600 dark:hover:text-coral-400 transition-colors">Terms</Link>
          <span>&middot;</span>
          <Link href="/cookies" className="hover:text-coral-600 dark:hover:text-coral-400 transition-colors">Cookies</Link>
        </div>
        <p data-reveal style={{ "--d": 300 } as React.CSSProperties}>
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
