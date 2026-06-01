import * as React from "react";
import { Wallet, Package, Clock, TrendingUp, ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SummaryStat } from "@/lib/mock-dashboard";

const ICON_MAP: Record<SummaryStat["icon"], LucideIcon> = {
  wallet: Wallet,
  package: Package,
  clock: Clock,
  trending: TrendingUp,
};

const ACCENT_MAP: Record<SummaryStat["accent"], string> = {
  primary: "bg-primary/15 text-primary-200",
  secondary: "bg-secondary/15 text-secondary",
  accent: "bg-accent/15 text-accent",
  success: "bg-success/15 text-success",
};

export function SummaryCard({ stat }: { stat: SummaryStat }) {
  const Icon = ICON_MAP[stat.icon];
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface/70 p-5 transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between gap-3">
        <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", ACCENT_MAP[stat.accent])}>
          <Icon className="h-5 w-5" />
        </span>
        {stat.delta ? (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
              stat.delta.positive
                ? "bg-success/10 text-success"
                : "bg-danger/10 text-danger",
            )}
          >
            {stat.delta.positive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {stat.delta.value}
          </span>
        ) : null}
      </div>
      <div>
        <p className="text-xs text-muted">{stat.label}</p>
        <p className="mt-1 font-display text-2xl font-bold tracking-tight">
          {stat.value}
        </p>
      </div>
    </div>
  );
}
