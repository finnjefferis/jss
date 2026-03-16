"use client";

import { type ReactNode, useEffect, useRef } from "react";

export function RevealSection({
  children,
  className = "",
  threshold = 0.1,
  id,
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <section ref={ref} className={className} id={id}>
      {children}
    </section>
  );
}
