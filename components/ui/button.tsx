import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-600 shadow-glow hover:shadow-[0_0_50px_-6px_rgba(108,59,245,0.7)]",
  secondary:
    "bg-secondary text-secondary-foreground hover:brightness-110 shadow-glow-cyan",
  accent: "bg-accent text-accent-foreground hover:brightness-105",
  outline:
    "border border-border bg-surface/40 text-foreground hover:border-primary hover:bg-surface",
  ghost: "text-muted hover:text-foreground hover:bg-surface/60",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: React.ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variantStyles[variant], sizeStyles[size], className);

  if ("href" in props && props.href !== undefined) {
    return (
      <a className={classes} {...(props as ButtonAsLink)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
