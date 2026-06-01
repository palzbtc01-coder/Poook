import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "outline";

const variants: Record<BadgeVariant, string> = {
  default: "bg-surface-light text-muted border border-border",
  primary: "bg-primary/15 text-primary-200 border border-primary/30",
  secondary: "bg-secondary/15 text-secondary border border-secondary/30",
  accent: "bg-accent/15 text-accent border border-accent/30",
  success: "bg-success/15 text-success border border-success/30",
  outline: "border border-border text-muted",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
