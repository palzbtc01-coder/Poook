"use client";

import * as React from "react";
import { FcGoogle } from "react-icons/fc";
import { cn } from "@/lib/utils";

interface OAuthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider?: "google";
  children?: React.ReactNode;
}

export function OAuthButton({
  provider = "google",
  className,
  children,
  ...props
}: OAuthButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-background/40 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-surface",
        className,
      )}
      {...props}
    >
      {provider === "google" ? <FcGoogle className="h-5 w-5" /> : null}
      {children ?? "Lanjutkan dengan Google"}
    </button>
  );
}
