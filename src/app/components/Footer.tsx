"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function Footer() {
  const logoRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-10 text-center text-xs text-zinc-500">
      <div className="mx-auto max-w-6xl px-5 md:px-8 lg:px-10 flex flex-col items-center gap-3">
        <div
          ref={logoRef}
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <Image
            src="/jsslogo.png"
            alt="Jefferis Software Solutions"
            width={40}
            height={40}
            className="dark:invert mx-auto"
          />
        </div>
        <p className={`transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          Powered by{" "}
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">Jefferis Software Solutions</span>
        </p>
        <p className={`transition-all duration-700 delay-300 ${visible ? "opacity-100" : "opacity-0"}`}>
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
