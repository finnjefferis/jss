"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();

          const items = el.querySelectorAll("[data-reveal]");
          animate(items, {
            opacity: [0, 1],
            translateY: [12, 0],
            duration: 600,
            ease: "outExpo",
            delay: stagger(100),
          });
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-10 text-center text-xs text-zinc-500">
      <div ref={footerRef} className="mx-auto max-w-6xl px-5 md:px-8 lg:px-10 flex flex-col items-center gap-3">
        <div data-reveal style={{ opacity: 0 }}>
          <Image
            src="/jsslogo.png"
            alt="Jefferis Software Solutions"
            width={40}
            height={40}
            className="dark:invert mx-auto"
          />
        </div>
        <p data-reveal style={{ opacity: 0 }}>
          Powered by{" "}
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">Jefferis Software Solutions</span>
        </p>
        <p data-reveal style={{ opacity: 0 }}>
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
