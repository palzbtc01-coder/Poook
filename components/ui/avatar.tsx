import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  initials: string;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

export function Avatar({
  initials,
  size = "md",
  className,
  ...props
}: AvatarProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-gradient-brand font-display font-bold text-white shadow-glow",
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {initials.slice(0, 2).toUpperCase()}
    </span>
  );
}
