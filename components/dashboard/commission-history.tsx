import * as React from "react";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { CommissionEntry } from "@/lib/mock-referral";
import { formatIDR, formatRelative, cn } from "@/lib/utils";

export function CommissionHistory({
  entries,
}: {
  entries: CommissionEntry[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface/70">
      <header className="border-b border-border px-5 py-4">
        <h3 className="font-display text-base font-bold tracking-tight">
          Riwayat Komisi
        </h3>
        <p className="text-xs text-muted">
          Komisi yang sudah / akan dicairkan dari order teman kamu
        </p>
      </header>

      <ul className="divide-y divide-border">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className="flex items-center gap-3 p-4 sm:px-5"
          >
            <Avatar initials={entry.refereeInitials} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {entry.refereeName}
              </p>
              <p className="text-xs text-muted">
                Order{" "}
                <Link
                  href={`/dashboard/orders/${entry.orderId}`}
                  className="font-mono text-secondary hover:underline"
                >
                  {entry.orderId}
                </Link>{" "}
                · {formatIDR(entry.orderAmount)} · {formatRelative(entry.createdAt)}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span
                className={cn(
                  "font-mono text-sm font-bold tabular-nums",
                  entry.status === "paid" ? "text-success" : "text-muted",
                )}
              >
                +{formatIDR(entry.commissionAmount)}
              </span>
              <Badge
                variant={entry.status === "paid" ? "success" : "default"}
              >
                {entry.status === "paid" ? "Dicairkan" : "Pending"}
              </Badge>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
