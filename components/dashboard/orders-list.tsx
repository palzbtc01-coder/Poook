"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Download, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { StatusBadge } from "@/components/dashboard/recent-orders";
import {
  type MockOrder,
  type OrderStatus,
  ORDER_STATUS_LABEL,
} from "@/lib/mock-orders";
import { formatIDR, formatNumber, formatRelative, cn } from "@/lib/utils";

const STATUS_FILTERS: ("all" | OrderStatus)[] = [
  "all",
  "pending",
  "processing",
  "completed",
  "partial",
  "cancelled",
  "error",
];

const PAGE_SIZE = 8;

export function OrdersList({ orders }: { orders: MockOrder[] }) {
  const [statusFilter, setStatusFilter] = React.useState<"all" | OrderStatus>(
    "all",
  );
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);

  const filtered = React.useMemo(() => {
    const term = search.trim().toLowerCase();
    return orders.filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (
        term &&
        !o.id.toLowerCase().includes(term) &&
        !o.targetUrl.toLowerCase().includes(term) &&
        !o.serviceName.toLowerCase().includes(term)
      ) {
        return false;
      }
      return true;
    });
  }, [orders, statusFilter, search]);

  // Reset page when filters change
  React.useEffect(() => setPage(1), [statusFilter, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  // Status counts for the chip badges
  const statusCounts = React.useMemo(() => {
    const counts: Record<string, number> = { all: orders.length };
    for (const o of orders) counts[o.status] = (counts[o.status] ?? 0) + 1;
    return counts;
  }, [orders]);

  return (
    <div className="flex flex-col gap-5">
      {/* Status chips */}
      <div className="-mx-1 overflow-x-auto pb-1">
        <div className="flex min-w-max gap-2 px-1">
          {STATUS_FILTERS.map((status) => {
            const count = statusCounts[status] ?? 0;
            const active = statusFilter === status;
            return (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                aria-pressed={active}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors",
                  active
                    ? "border-transparent bg-gradient-brand text-white shadow-glow"
                    : "border-border bg-surface/60 text-muted hover:text-foreground",
                )}
              >
                {status === "all" ? "Semua" : ORDER_STATUS_LABEL[status]}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums",
                    active
                      ? "bg-white/20"
                      : "bg-background/60 text-muted",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search + actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder="Cari ID order, URL, atau layanan…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search />}
          containerClassName="flex-1"
        />
        <Button variant="outline" size="md">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      {/* Empty */}
      {filtered.length === 0 ? (
        <EmptyState
          title="Tidak ada order yang cocok"
          description="Coba ubah filter atau kata kunci pencarianmu."
          action={
            (statusFilter !== "all" || search) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setStatusFilter("all");
                  setSearch("");
                }}
              >
                <X className="h-4 w-4" /> Reset Filter
              </Button>
            )
          }
        />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-2xl border border-border bg-surface/70 lg:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-background/40 text-left text-[11px] uppercase tracking-wider text-muted">
                  <th className="px-5 py-3 font-semibold">ID</th>
                  <th className="px-3 py-3 font-semibold">Layanan</th>
                  <th className="px-3 py-3 font-semibold">Target</th>
                  <th className="px-3 py-3 font-semibold text-right">Qty</th>
                  <th className="px-3 py-3 font-semibold text-right">Harga</th>
                  <th className="px-3 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold text-right">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border/50 transition-colors last:border-b-0 hover:bg-background/30"
                  >
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/dashboard/orders/${order.id}`}
                        className="font-mono text-xs text-secondary hover:underline"
                      >
                        {order.id}
                      </Link>
                    </td>
                    <td className="px-3 py-3.5">
                      <p className="font-medium">{order.serviceName}</p>
                      <p className="text-xs text-muted">{order.platform}</p>
                    </td>
                    <td className="max-w-[220px] truncate px-3 py-3.5 text-muted">
                      {order.targetUrl}
                    </td>
                    <td className="px-3 py-3.5 text-right tabular-nums">
                      {formatNumber(order.quantity)}
                    </td>
                    <td className="px-3 py-3.5 text-right font-semibold tabular-nums">
                      {formatIDR(order.price)}
                    </td>
                    <td className="px-3 py-3.5">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-5 py-3.5 text-right text-xs text-muted">
                      {formatRelative(order.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile list */}
          <ul className="flex flex-col gap-3 lg:hidden">
            {visible.map((order) => (
              <li key={order.id}>
                <Link
                  href={`/dashboard/orders/${order.id}`}
                  className="flex flex-col gap-2 rounded-2xl border border-border bg-surface/70 p-4 transition-colors hover:border-primary/40"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {order.serviceName}
                      </p>
                      <p className="truncate text-xs text-muted">
                        {order.targetUrl}
                      </p>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-muted">{order.id}</span>
                    <span className="text-muted">
                      {formatNumber(order.quantity)} ·{" "}
                      <span className="font-semibold text-foreground">
                        {formatIDR(order.price)}
                      </span>
                    </span>
                  </div>
                  <p className="text-[11px] text-muted">
                    {formatRelative(order.createdAt)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          {pageCount > 1 ? (
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs text-muted">
                Halaman <span className="font-semibold">{page}</span> dari{" "}
                {pageCount} ({filtered.length} order)
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="inline-flex h-9 items-center justify-center rounded-lg border border-border px-3 text-sm text-muted transition-colors hover:text-foreground disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  disabled={page === pageCount}
                  className="inline-flex h-9 items-center justify-center rounded-lg border border-border px-3 text-sm text-muted transition-colors hover:text-foreground disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
