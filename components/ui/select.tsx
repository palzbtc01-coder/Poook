"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  error?: string;
  hint?: string;
  containerClassName?: string;
  leftIcon?: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      label,
      error,
      hint,
      className,
      containerClassName,
      children,
      id,
      leftIcon,
      ...props
    },
    ref,
  ) {
    const reactId = React.useId();
    const selectId = id ?? reactId;
    return (
      <div className={cn("flex flex-col gap-1.5", containerClassName)}>
        {label ? (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-foreground/90"
          >
            {label}
          </label>
        ) : null}
        <div
          className={cn(
            "relative flex h-11 items-center gap-2 rounded-xl border bg-background/40 px-3 transition-colors",
            "focus-within:border-primary focus-within:bg-background/60 focus-within:ring-2 focus-within:ring-primary/30",
            error ? "border-danger/60" : "border-border",
            props.disabled && "pointer-events-none opacity-50",
          )}
        >
          {leftIcon ? (
            <span className="text-muted [&_svg]:h-4 [&_svg]:w-4">{leftIcon}</span>
          ) : null}
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "w-full appearance-none bg-transparent pr-7 text-sm text-foreground outline-none [&>option]:bg-surface [&>option]:text-foreground",
              className,
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-muted" />
        </div>
        {error ? (
          <p className="text-xs text-danger">{error}</p>
        ) : hint ? (
          <p className="text-xs text-muted">{hint}</p>
        ) : null}
      </div>
    );
  },
);
