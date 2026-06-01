"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import {
  TICKET_STATUS_LABEL,
  TICKET_STATUS_STYLE,
  TICKET_PRIORITY_LABEL,
  TICKET_PRIORITY_STYLE,
  TICKET_CATEGORY_LABEL,
  type SupportTicket,
  type TicketStatus,
} from "@/lib/mock-tickets";
import { formatRelative, cn } from "@/lib/utils";

const FILTERS: ("all" | TicketStatus)[] = [
  "all",
  "open",
  "pending",
  "resolved",
  "closed",
];

export function TicketList({ tickets }: { tickets: SupportTicket[] }) {
  const [filter, setFilter] = React.useState<"all" | TicketStatus>("all");
  const [search, setSearch] = React.useState("");

  const filtered = React.useMemo(() => {
    const term = search.trim().toLowerCase();
    return tickets.filter((t) => {
      if (filter !== "all" && t.status !== filter) return false;
      if (
        term &&
        !t.id.toLowerCase().includes(term) &&
        !t.subject.toLowerCase().includes(term)
      ) {
        return false;
      }
      return true;
    });
  }, [tickets, filter, search]);

  const counts: Record<string, number> = { all: tickets.length };
  for (const t of tickets) counts[t.status] = (counts[t.status] ?? 0) + 1;

  return (
    <div className="flex flex-col gap-5">
      <div className="-mx-1 overflow-x-auto pb-1">
        <div className="flex min-w-max gap-2 px-1">
          {FILTERS.map((f) => {
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
                {f === "all" ? "Semua" : TICKET_STATUS_LABEL[f]}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums",
                    active ? "bg-white/20" : "bg-background/60 text-muted",
                  )}
                >
                  {counts[f] ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <Input
        placeholder="Cari ID tiket atau subjek..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        leftIcon={<Search />}
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title={
            tickets.length === 0
              ? "Belum ada tiket support"
              : "Tidak ada tiket yang cocok"
          }
          description={
            tickets.length === 0
              ? "Buat tiket baru jika kamu butuh bantuan dari tim support kami."
              : "Coba ubah filter atau kata kunci pencarianmu."
          }
          action={
            tickets.length === 0 ? (
              <Button href="/dashboard/support/new" variant="primary" size="sm">
                Buat Tiket Pertama
              </Button>
            ) : (filter !== "all" || search) ? (
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
            ) : null
          }
        />
      ) : (
        <ul className="flex flex-col gap-3">
          {filtered.map((t) => (
            <li key={t.id}>
              <Link
                href={`/dashboard/support/${t.id}`}
                className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface/70 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
                      TICKET_STATUS_STYLE[t.status],
                    )}
                  >
                    {t.status === "open" ? (
                      <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-current" />
                    ) : null}
                    {TICKET_STATUS_LABEL[t.status]}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
                      TICKET_PRIORITY_STYLE[t.priority],
                    )}
                  >
                    {TICKET_PRIORITY_LABEL[t.priority]}
                  </span>
                  <span className="rounded-full border border-border bg-background/40 px-2.5 py-0.5 text-[11px] font-medium text-muted">
                    {TICKET_CATEGORY_LABEL[t.category]}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-display text-base font-bold leading-snug tracking-tight">
                      {t.subject}
                    </p>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted">
                      <span className="font-mono">{t.id}</span>
                      <span>·</span>
                      <span>{t.messages.length} pesan</span>
                      <span>·</span>
                      <span>Update {formatRelative(t.updatedAt)}</span>
                      {t.assignedTo ? (
                        <>
                          <span>·</span>
                          <span>Ditangani {t.assignedTo}</span>
                        </>
                      ) : null}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
