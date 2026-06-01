"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore — clipboard may be unavailable
    }
  };
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Salin ke clipboard"
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background/40 px-2.5 text-xs font-medium text-muted transition-colors hover:border-primary/40 hover:text-foreground",
        className,
      )}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-success" /> Tersalin
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" /> Salin
        </>
      )}
    </button>
  );
}
