"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { PaymentLogo } from "./payment-logo";
import {
  calculateChannelFee,
} from "@/lib/violet/channels";
import type { PaymentChannelDef } from "@/lib/violet/types";
import { formatIDR, cn } from "@/lib/utils";

interface PaymentChannelCardProps {
  channel: PaymentChannelDef;
  amount: number;
  selected: boolean;
  onSelect: () => void;
}

export function PaymentChannelCard({
  channel,
  amount,
  selected,
  onSelect,
}: PaymentChannelCardProps) {
  const liveFee = amount > 0 ? calculateChannelFee(channel, amount) : 0;
  const feeLabel =
    channel.fee.type === "flat"
      ? formatIDR(channel.fee.amount)
      : `${channel.fee.amount}%`;

  return (
    <button
      type="button"
      onClick={onSelect}
      role="radio"
      aria-checked={selected}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all",
        selected
          ? "border-primary bg-primary/10 shadow-glow"
          : "border-border bg-surface/60 hover:border-primary/40",
      )}
    >
      <PaymentLogo code={channel.code} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{channel.name}</p>
        <p className="mt-0.5 text-xs text-muted">
          Fee {feeLabel}
          {amount > 0 && channel.fee.type === "percent"
            ? ` · ≈ ${formatIDR(liveFee)}`
            : ""}
        </p>
      </div>
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
          selected
            ? "border-primary bg-primary"
            : "border-border",
        )}
        aria-hidden
      >
        {selected ? <Check className="h-3 w-3 text-white" /> : null}
      </span>
    </button>
  );
}
