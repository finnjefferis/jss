"use client";

import { useState, useEffect } from "react";

export function ScrollArrow({ target }: { target: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <button
      onClick={() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }}
      aria-label="Scroll to next section"
      className={`
        absolute bottom-10 left-1/2 -translate-x-1/2 z-20
        flex items-center justify-center h-10 w-10 rounded-full
        border border-coral-200 dark:border-coral-800
        bg-gradient-to-br from-coral-500 to-pink-500
        hover:from-coral-600 hover:to-pink-600
        shadow-lg shadow-coral-500/20
        animate-bounce
        transition-[opacity,transform] duration-300
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      style={{ transitionDuration: "800ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <svg
        className="h-4 w-4 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}
