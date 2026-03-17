"use client";

import { useState, useEffect, useRef } from "react";

type CodeSegment = { text: string; className: string };
type CodeLine = { segments: CodeSegment[]; delay?: number };

const LINES: CodeLine[] = [
  {
    segments: [
      { text: "const ", className: "text-pink-400" },
      { text: "dashboard ", className: "text-blue-300" },
      { text: "= ", className: "text-zinc-500" },
      { text: "buildFor", className: "text-emerald-400" },
      { text: "(", className: "text-zinc-400" },
      { text: "'your-business'", className: "text-amber-300" },
      { text: ")", className: "text-zinc-400" },
    ],
  },
  {
    segments: [
      { text: "// No templates. No compromises.", className: "text-zinc-600" },
    ],
    delay: 80,
  },
  {
    segments: [
      { text: "await ", className: "text-pink-400" },
      { text: "dashboard", className: "text-blue-300" },
      { text: ".", className: "text-zinc-400" },
      { text: "connect", className: "text-emerald-400" },
      { text: "(", className: "text-zinc-400" },
      { text: "'your-crm'", className: "text-amber-300" },
      { text: ")", className: "text-zinc-400" },
    ],
    delay: 150,
  },
  {
    segments: [
      { text: "await ", className: "text-pink-400" },
      { text: "dashboard", className: "text-blue-300" },
      { text: ".", className: "text-zinc-400" },
      { text: "automate", className: "text-emerald-400" },
      { text: "(", className: "text-zinc-400" },
      { text: "'the-boring-stuff'", className: "text-amber-300" },
      { text: ")", className: "text-zinc-400" },
    ],
  },
  {
    segments: [
      { text: "console", className: "text-emerald-400" },
      { text: ".", className: "text-zinc-400" },
      { text: "log", className: "text-emerald-400" },
      { text: "(", className: "text-zinc-400" },
      { text: "'Hours saved: ∞'", className: "text-amber-300" },
      { text: ") ", className: "text-zinc-400" },
      { text: "// practically", className: "text-zinc-600" },
    ],
    delay: 150,
  },
];

function flattenLine(line: CodeLine): string {
  return line.segments.map((s) => s.text).join("");
}

export function TerminalTyping() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [visibleChars, setVisibleChars] = useState(0);
  const [cursorLine, setCursorLine] = useState(0);
  const [done, setDone] = useState(false);
  const totalChars = LINES.reduce((a, l) => a + flattenLine(l).length, 0);

  // Trigger on scroll into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          // Small delay so the reveal animation plays first
          setTimeout(() => setStarted(true), 400);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Typing effect
  useEffect(() => {
    if (!started || done) return;

    const speed = 15; // ms per char
    let charIndex = 0;
    let lineIndex = 0;
    let pendingDelay = 0;

    // Pre-calculate line boundaries
    const lineLengths = LINES.map((l) => flattenLine(l).length);
    const lineStarts: number[] = [];
    let acc = 0;
    for (const len of lineLengths) {
      lineStarts.push(acc);
      acc += len;
    }

    function getLineForChar(c: number) {
      for (let i = lineStarts.length - 1; i >= 0; i--) {
        if (c >= lineStarts[i]) return i;
      }
      return 0;
    }

    const interval = setInterval(() => {
      if (pendingDelay > 0) {
        pendingDelay -= speed;
        return;
      }

      charIndex++;
      const newLine = getLineForChar(charIndex);

      // Add line-transition delay
      if (newLine > lineIndex) {
        lineIndex = newLine;
        const lineDelay = LINES[newLine]?.delay ?? 60;
        pendingDelay = lineDelay;
        setCursorLine(newLine);
      }

      setVisibleChars(charIndex);

      if (charIndex >= totalChars) {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, done, totalChars]);

  // Render lines with typing mask
  let charsRendered = 0;

  return (
    <div ref={ref} className="p-5 font-mono text-sm leading-relaxed h-[250px]">
      {LINES.map((line, li) => {
        const lineText = flattenLine(line);
        const lineStart = charsRendered;
        charsRendered += lineText.length;
        const lineVisible = Math.max(0, Math.min(lineText.length, visibleChars - lineStart));

        if (lineVisible === 0 && !done) return null;

        let segCharsUsed = 0;

        return (
          <p
            key={li}
            className={li > 0 ? (LINES[li - 1]?.segments[0]?.className === "text-zinc-600" || line.segments[0]?.className === "text-zinc-600" ? "mt-1.5" : li === 2 || li === 4 ? "mt-3" : "mt-1.5") : ""}
          >
            {line.segments.map((seg, si) => {
              const segStart = segCharsUsed;
              segCharsUsed += seg.text.length;
              const segVisible = Math.max(0, Math.min(seg.text.length, lineVisible - segStart));

              if (segVisible === 0) return null;

              return (
                <span key={si} className={seg.className}>
                  {seg.text.slice(0, segVisible)}
                </span>
              );
            })}
            {/* Blinking cursor on current line */}
            {li === cursorLine && !done && started && (
              <span className="inline-block w-[2px] h-[1.1em] bg-coral-400 align-middle ml-px animate-pulse" />
            )}
          </p>
        );
      })}
      {/* Final cursor */}
      {done && (
        <p className="mt-3">
          <span className="inline-block w-[2px] h-[1.1em] bg-coral-400 align-middle animate-pulse" />
        </p>
      )}
    </div>
  );
}
