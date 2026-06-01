"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Gift,
  RotateCcw,
  Search,
  Settings,
  ShoppingCart,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import {
  type TransactionEntry,
  type TransactionType,
  TRANSACTION_TYPE_LABEL,
} from "@/lib/mock-transactions";
import { formatIDR, formatRelative, formatDateTime, cn } from "@/lib/utils";

const TYPE_ICON: Record<TransactionType, LucideIcon> = {
  deposit: ArrowDownToLine,
  order_debit: ShoppingCart,
  refund: RotateCcw,
  bonus: Gift,
  cashback: Wallet,
  commission: Users,
  adjustment: Settings,
};

const TYPE_STYLE: Record<TransactionType, string> = {
  deposit: "bg-success/15 text-success",
  order_debit: "bg-primary/15 text-primary-200",
  refund: "bg-secondary/15 text-secondary",
  bonus: "bg-accent/15 text-accent",
  cashback: "bg-accent/15 text-accent",
  commission: "bg-secondary/15 text-secondary",
  adjustment: "bg-muted/15 text-muted",
};

const FILTERS: ("all" | TransactionType)[] = [
  "all",
  "deposit",
  "order_debit",
  "refund",
  "bonus",
  "cashback",
  "commission",
];

const PAGE_SIZE = 10;

export function TransactionsList({
  transactions,
}: {
  transactions: TransactionEntry[];
}) {
  const [filter, setFilter] = React.useState<"all" | TransactionType>("all");
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);

  const filtered = React.useMemo(() => {
    const term = search.trim().toLowerCase();
    return transactions.filter((t) => {
      if (filter !== "all" && t.type !== filter) return false;
      if (
        term &&
        !t.id.toLowerCase().includes(term) &&
        !t.description.toLowerCase().includes(term) &&
        !(t.referenceId?.toLowerCase().includes(term) ?? false)
      ) {
        return false;
      }
      return true;
    });
  }, [transactions, filter, search]);

  React.useEffect(() => setPage(1), [filter, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  const counts = React.useMemo(() => {
    const c: Record<string, number> = { all: transactions.length };
    for (const t of transactions) c[t.type] = (c[t.type] ?? 0) + 1;
    return c;
  }, [transactions]);

  return (
    <div className="flex flex-col gap-5">
      {/* Stats row */}
      <StatsRow transactions={transactions} />

      {/* Type chips */}
      <div className="-mx-1 overflow-x-auto pb-1">
        <div className="flex min-w-max gap-2 px-1">
          {FILTERS.map((f) => {
            const count = counts[f] ?? 0;
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={active}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors",
                  active
                    ? "border-transparent bg-gradient-brand text-white shadow-glow"
                    : "border-border bg-surface/60 text-muted hover:text-foreground",
                )}
              >
                {f === "all" ? "Semua" : TRANSACTION_TYPE_LABEL[f]}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums",
                    active ? "bg-white/20" : "bg-background/60 text-muted",
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
          placeholder="Cari ID transaksi, deskripsi, atau referensi…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search />}
          containerClassName="flex-1"
        />
        <Button variant="outline" size="md">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <EmptyState
          title="Tidak ada transaksi yang cocok"
          description="Coba ubah filter atau kata kunci pencarianmu."
          action={
            (filter !== "all" || search) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFilter("all");
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
                  <th className="px-5 py-3 font-semibold">Tanggal</th>
                  <th className="px-3 py-3 font-semibold">Jenis</th>
                  <th className="px-3 py-3 font-semibold">Deskripsi</th>
                  <th className="px-3 py-3 font-semibold text-right">Nominal</th>
                  <th className="px-3 py-3 font-semibold text-right">
                    Saldo Setelah
                  </th>
                  <th className="px-5 py-3 font-semibold">Referensi</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((t) => (
                  <Row key={t.id} t={t} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile list */}
          <ul className="flex flex-col gap-3 lg:hidden">
            {visible.map((t) => (
              <MobileRow key={t.id} t={t} />
            ))}
          </ul>

          {/* Pagination */}
          {pageCount > 1 ? (
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs text-muted">
                Halaman <span className="font-semibold">{page}</span> dari{" "}
                {pageCount} ({filtered.length} transaksi)
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="inline-flex h-9 items-center justify-center rounded-lg border border-border px-3 text-sm text-muted transition-colors hover:text-foreground disabled:opacity-50"
                  aria-label="Halaman sebelumnya"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  disabled={page === pageCount}
                  className="inline-flex h-9 items-center justify-center rounded-lg border border-border px-3 text-sm text-muted transition-colors hover:text-foreground disabled:opacity-50"
                  aria-label="Halaman berikutnya"
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

/* ────────────────────────── stats ─────────────────────────── */

function StatsRow({ transactions }: { transactions: TransactionEntry[] }) {
  // Compute totals over the last 30 days.
  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const recent = transactions.filter(
    (t) => new Date(t.createdAt).getTime() >= cutoff,
  );
  const totalDeposit = recent
    .filter((t) => t.type === "deposit")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalSpending = recent
    .filter((t) => t.type === "order_debit")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalBonus = recent
    .filter((t) => t.type === "bonus" || t.type === "cashback")
    .reduce((sum, t) => sum + t.amount, 0);
  const netFlow = recent.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total Deposit (30d)"
        value={formatIDR(totalDeposit)}
        icon={ArrowDownToLine}
        accent="success"
      />
      <StatCard
        label="Total Pengeluaran (30d)"
        value={formatIDR(totalSpending)}
        icon={ShoppingCart}
        accent="primary"
      />
      <StatCard
        label="Total Bonus & Cashback"
        value={formatIDR(totalBonus)}
        icon={Gift}
        accent="accent"
      />
      <StatCard
        label="Net Flow (30d)"
        value={(netFlow >= 0 ? "+" : "") + formatIDR(netFlow)}
        icon={ArrowUpRight}
        accent={netFlow >= 0 ? "success" : "danger"}
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  accent: "primary" | "success" | "accent" | "danger";
}) {
  const accentStyle = {
    primary: "bg-primary/15 text-primary-200",
    success: "bg-success/15 text-success",
    accent: "bg-accent/15 text-accent",
    danger: "bg-danger/15 text-danger",
  }[accent];
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface/70 p-5">
      <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl", accentStyle)}>
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted">{label}</p>
        <p className="mt-1 truncate font-display text-lg font-bold tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ────────────────────────── rows ─────────────────────────── */

function TypeBadge({ type }: { type: TransactionType }) {
  const Icon = TYPE_ICON[type];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold",
        TYPE_STYLE[type],
      )}
    >
      <Icon className="h-3 w-3" />
      {TRANSACTION_TYPE_LABEL[type]}
    </span>
  );
}

function Amount({ value }: { value: number }) {
  const positive = value > 0;
  return (
    <span
      className={cn(
        "font-mono font-bold tabular-nums",
        positive ? "text-success" : "text-foreground",
      )}
    >
      {positive ? "+" : ""}
      {formatIDR(value)}
    </span>
  );
}

function Reference({ t }: { t: TransactionEntry }) {
  if (!t.referenceId) return <span className="text-muted">—</span>;
  if (t.referenceType === "order") {
    return (
      <Link
        href={`/dashboard/orders/${t.referenceId}`}
        className="font-mono text-xs text-secondary hover:underline"
      >
        {t.referenceId}
      </Link>
    );
  }
  if (t.referenceType === "deposit") {
    return (
      <Link
        href={`/dashboard/deposit/${t.referenceId}`}
        className="font-mono text-xs text-secondary hover:underline"
      >
        {t.referenceId}
      </Link>
    );
  }
  return <span className="font-mono text-xs">{t.referenceId}</span>;
}

function Row({ t }: { t: TransactionEntry }) {
  return (
    <tr className="border-b border-border/50 transition-colors last:border-b-0 hover:bg-background/30">
      <td className="px-5 py-3.5">
        <p className="text-sm font-medium">{formatRelative(t.createdAt)}</p>
        <p className="text-[11px] text-muted">{formatDateTime(t.createdAt)}</p>
      </td>
      <td className="px-3 py-3.5">
        <TypeBadge type={t.type} />
      </td>
      <td className="max-w-[280px] px-3 py-3.5">
        <p className="line-clamp-2 text-sm font-medium">{t.description}</p>
        {t.paymentMethod ? (
          <p className="mt-0.5 text-[11px] text-muted">
            via {t.paymentMethod}
          </p>
        ) : null}
      </td>
      <td className="px-3 py-3.5 text-right">
        <Amount value={t.amount} />
      </td>
      <td className="px-3 py-3.5 text-right text-sm tabular-nums text-muted">
        {formatIDR(t.balanceAfter)}
      </td>
      <td className="px-5 py-3.5">
        <Reference t={t} />
      </td>
    </tr>
  );
}

function MobileRow({ t }: { t: TransactionEntry }) {
  return (
    <li className="flex flex-col gap-2 rounded-2xl border border-border bg-surface/70 p-4">
      <div className="flex items-start justify-between gap-2">
        <TypeBadge type={t.type} />
        <Amount value={t.amount} />
      </div>
      <p className="text-sm font-medium">{t.description}</p>
      <div className="flex items-center justify-between text-xs text-muted">
        <span>{formatRelative(t.createdAt)}</span>
        <span>Saldo: {formatIDR(t.balanceAfter)}</span>
      </div>
      {t.referenceId ? (
        <div className="text-xs">
          Ref: <Reference t={t} />
        </div>
      ) : null}
    </li>
  );
}
