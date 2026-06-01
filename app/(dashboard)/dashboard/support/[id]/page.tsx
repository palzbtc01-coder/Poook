import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/dashboard/page-header";
import { TicketThread } from "@/components/dashboard/ticket-thread";
import { Badge } from "@/components/ui/badge";
import {
  MOCK_TICKETS,
  findTicket,
  TICKET_STATUS_LABEL,
  TICKET_STATUS_STYLE,
  TICKET_PRIORITY_LABEL,
  TICKET_PRIORITY_STYLE,
  TICKET_CATEGORY_LABEL,
} from "@/lib/mock-tickets";
import { formatDateTime, formatRelative, cn } from "@/lib/utils";

export function generateStaticParams() {
  return MOCK_TICKETS.map((t) => ({ id: t.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const t = findTicket(params.id);
  return { title: t ? `${t.id} — Support` : "Tiket tidak ditemukan" };
}

export default function TicketDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const ticket = findTicket(params.id);
  if (!ticket) notFound();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Support", href: "/dashboard/support" },
          { label: ticket.id },
        ]}
        title={ticket.subject}
        description={`${ticket.id} · dibuat ${formatRelative(ticket.createdAt)}`}
      />

      {/* Status row */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-surface/40 p-4">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
            TICKET_STATUS_STYLE[ticket.status],
          )}
        >
          {ticket.status === "open" ? (
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-current" />
          ) : null}
          {TICKET_STATUS_LABEL[ticket.status]}
        </span>
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
            TICKET_PRIORITY_STYLE[ticket.priority],
          )}
        >
          Prioritas: {TICKET_PRIORITY_LABEL[ticket.priority]}
        </span>
        <Badge>{TICKET_CATEGORY_LABEL[ticket.category]}</Badge>
        {ticket.assignedTo ? (
          <Badge variant="secondary">Ditangani {ticket.assignedTo}</Badge>
        ) : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <TicketThread ticket={ticket} />

        {/* Sidebar info */}
        <aside className="flex flex-col gap-4 lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-2xl border border-border bg-surface/70 p-5">
            <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-muted">
              Detail Tiket
            </h3>
            <dl className="space-y-3 text-sm">
              <Row label="ID" value={ticket.id} mono />
              <Row label="Status" value={TICKET_STATUS_LABEL[ticket.status]} />
              <Row
                label="Prioritas"
                value={TICKET_PRIORITY_LABEL[ticket.priority]}
              />
              <Row
                label="Kategori"
                value={TICKET_CATEGORY_LABEL[ticket.category]}
              />
              {ticket.assignedTo ? (
                <Row label="Ditangani" value={ticket.assignedTo} />
              ) : null}
              <Row label="Dibuat" value={formatDateTime(ticket.createdAt)} small />
              <Row label="Diupdate" value={formatDateTime(ticket.updatedAt)} small />
            </dl>
          </div>

          {ticket.relatedOrderId ? (
            <div className="rounded-2xl border border-border bg-surface/70 p-5">
              <h3 className="mb-2 font-display text-sm font-bold uppercase tracking-wider text-muted">
                Order Terkait
              </h3>
              <Link
                href={`/dashboard/orders/${ticket.relatedOrderId}`}
                className="block rounded-xl border border-border bg-background/40 p-3 font-mono text-sm text-secondary transition-colors hover:bg-background hover:text-foreground"
              >
                {ticket.relatedOrderId}
              </Link>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  mono,
  small,
}: {
  label: string;
  value: string;
  mono?: boolean;
  small?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className={cn("text-muted", small && "text-xs")}>{label}</dt>
      <dd
        className={cn(
          "text-right font-medium",
          mono && "font-mono text-xs",
          small && "text-xs",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
