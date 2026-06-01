import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds a hover lift + glow interaction. */
  interactive?: boolean;
}

export function Card({
  className,
  interactive = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface/70 p-6 shadow-card backdrop-blur-sm",
        interactive &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
