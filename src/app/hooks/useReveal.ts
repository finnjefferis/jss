"use client";

import { useEffect, useRef } from "react";

/**
 * Adds the `.revealed` class to a ref element when it enters the viewport.
 * CSS handles the actual animation via [data-reveal] and [data-gradient] selectors.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return ref;
}
