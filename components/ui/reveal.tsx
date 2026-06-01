"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms before the reveal animation starts. */
  delay?: number;
  as?: "div" | "li" | "section";
}

/**
 * Fades + slides its children in once they scroll into view.
 * Gracefully renders visible content if IntersectionObserver is unavailable.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
