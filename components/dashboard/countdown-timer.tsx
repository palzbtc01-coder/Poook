"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  /** ISO-8601 timestamp at which the countdown reaches zero. */
  expiresAt: string;
  /** Fired once when the countdown crosses zero. */
  onExpire?: () => void;
  className?: string;
}

/** MM:SS countdown that re-renders every second. */
export function CountdownTimer({
  expiresAt,
  onExpire,
  className,
}: CountdownTimerProps) {
  const [now, setNow] = React.useState(() => Date.now());
  const firedRef = React.useRef(false);

  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1_000);
    return () => clearInterval(id);
  }, []);

  const expiry = React.useMemo(() => new Date(expiresAt).getTime(), [expiresAt]);
  const remainingMs = Math.max(0, expiry - now);
  const totalSeconds = Math.floor(remainingMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const expired = remainingMs <= 0;
  const danger = totalSeconds > 0 && totalSeconds < 60;

  React.useEffect(() => {
    if (expired && !firedRef.current) {
      firedRef.current = true;
      onExpire?.();
    }
  }, [expired, onExpire]);

  if (expired) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2 font-mono font-bold text-danger",
          className,
        )}
      >
        <Clock className="h-4 w-4" />
        Kadaluarsa
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono font-bold tabular-nums",
        danger ? "text-danger animate-pulse" : "text-foreground",
        className,
      )}
    >
      <Clock className="h-4 w-4" />
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </span>
  );
}
