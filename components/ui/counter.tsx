"use client";

import * as React from "react";
import { formatNumber } from "@/lib/utils";

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

/**
 * Counts up to `value` once it scrolls into view.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  durationMs = 1800,
  className,
}: CounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = React.useState(0);
  const started = React.useRef(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / durationMs, 1);
        // easeOutExpo for a snappy finish
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setDisplay(Math.round(eased * value));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === "undefined") {
      run();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) run();
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(display)}
      {suffix}
    </span>
  );
}
