"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightSlot?: React.ReactNode;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      error,
      hint,
      leftIcon,
      rightSlot,
      className,
      containerClassName,
      id,
      ...props
    },
    ref,
  ) {
    const reactId = React.useId();
    const inputId = id ?? reactId;
    const describedBy = error
      ? `${inputId}-error`
      : hint
        ? `${inputId}-hint`
        : undefined;

    return (
      <div className={cn("flex flex-col gap-1.5", containerClassName)}>
        {label ? (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground/90"
          >
            {label}
          </label>
        ) : null}
        <div
          className={cn(
            "flex h-11 items-center gap-2 rounded-xl border bg-background/40 px-3 transition-colors",
            "focus-within:border-primary focus-within:bg-background/60 focus-within:ring-2 focus-within:ring-primary/30",
            error ? "border-danger/60" : "border-border",
          )}
        >
          {leftIcon ? (
            <span className="text-muted [&_svg]:h-4 [&_svg]:w-4">{leftIcon}</span>
          ) : null}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={cn(
              "flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted/70 disabled:cursor-not-allowed disabled:opacity-50",
              className,
            )}
            {...props}
          />
          {rightSlot}
        </div>
        {error ? (
          <p id={`${inputId}-error`} className="text-xs text-danger">
            {error}
          </p>
        ) : hint ? (
          <p id={`${inputId}-hint`} className="text-xs text-muted">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);
