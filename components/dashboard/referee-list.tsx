import * as React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Users } from "lucide-react";
import type { Referee } from "@/lib/mock-referral";
import { formatIDR, formatNumber, formatRelative } from "@/lib/utils";

export function RefereeList({ referees }: { referees: Referee[] }) {
  if (referees.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="Belum ada teman terdaftar"
        description="Bagikan link referral kamu dan dapatkan komisi dari setiap order mereka."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface/70">
      <header className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h3 className="font-display text-base font-bold tracking-tight">
            Teman Yang Diundang
          </h3>
          <p className="text-xs text-muted">
            {referees.length} orang · diurutkan berdasarkan total order
          </p>
        </div>
      </header>

      {/* Desktop table */}
      <div className="hidden lg:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background/40 text-left text-[11px] uppercase tracking-wider text-muted">
              <th className="px-5 py-3 font-semibold">Nama</th>
              <th className="px-3 py-3 font-semibold">Bergabung</th>
              <th className="px-3 py-3 font-semibold text-right">Total Order</th>
              <th className="px-3 py-3 font-semibold text-right">Total Spending</th>
              <th className="px-3 py-3 font-semibold text-right">
                Komisi Earned
              </th>
              <th className="px-5 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {referees.map((r) => (
              <tr
                key={r.id}
                className="border-b border-border/50 transition-colors last:border-b-0 hover:bg-background/30"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar initials={r.initials} size="sm" />
                    <span className="font-medium">{r.name}</span>
                  </div>
                </td>
                <td className="px-3 py-3 text-xs text-muted">
                  {formatRelative(r.joinedAt)}
                </td>
                <td className="px-3 py-3 text-right font-mono tabular-nums">
                  {formatNumber(r.totalOrders)}
                </td>
                <td className="px-3 py-3 text-right tabular-nums">
                  {formatIDR(r.totalSpent)}
                </td>
                <td className="px-3 py-3 text-right font-semibold text-success tabular-nums">
                  {formatIDR(r.commissionEarned)}
                </td>
                <td className="px-5 py-3">
                  {r.isActive ? (
                    <Badge variant="success">Aktif</Badge>
                  ) : (
                    <Badge>Belum Order</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile list */}
      <ul className="divide-y divide-border lg:hidden">
        {referees.map((r) => (
          <li key={r.id} className="flex items-center gap-3 p-4">
            <Avatar initials={r.initials} size="md" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate font-semibold">{r.name}</p>
                {r.isActive ? (
                  <Badge variant="success">Aktif</Badge>
                ) : (
                  <Badge>Belum Order</Badge>
                )}
              </div>
              <p className="text-[11px] text-muted">
                {formatRelative(r.joinedAt)} · {r.totalOrders} order
              </p>
              <p className="mt-1 text-xs">
                <span className="text-muted">Komisi: </span>
                <span className="font-semibold text-success">
                  {formatIDR(r.commissionEarned)}
                </span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
