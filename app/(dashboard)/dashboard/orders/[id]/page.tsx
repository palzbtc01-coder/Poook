import { notFound } from "next/navigation";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ExternalLink,
  RotateCw,
  Server,
  ServerCog,
  Shield,
  User as UserIcon,
  XCircle,
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatusBadge } from "@/components/dashboard/recent-orders";
import { CopyButton } from "@/components/dashboard/copy-button";
import { OrderActions } from "@/components/dashboard/order-actions";
import {
  MOCK_ORDERS,
  findOrder,
  type OrderStatus,
  type OrderStatusLog,
} from "@/lib/mock-orders";
import { findService, QUALITY_LABEL, TYPE_LABEL } from "@/lib/mock-catalog";
import { formatDateTime, formatIDR, formatNumber, formatRelative } from "@/lib/utils";

/** Pre-render every mock order id so the page is statically generated. */
export function generateStaticParams() {
  return MOCK_ORDERS.map((order) => ({ id: order.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const order = findOrder(params.id);
  return {
    title: order ? `Detail Order ${order.id}` : "Order tidak ditemukan",
  };
}

const STATUS_ICON: Record<OrderStatus, React.ComponentType<{ className?: string }>> = {
  pending: Clock,
  processing: Activity,
  active: Activity,
  completed: CheckCircle2,
  partial: AlertTriangle,
  cancelled: XCircle,
  refilling: RotateCw,
  error: AlertCircle,
};

const SOURCE_ICON: Record<
  OrderStatusLog["source"],
  React.ComponentType<{ className?: string }>
> = {
  user: UserIcon,
  system: Server,
  provider: ServerCog,
  admin: Shield,
};

const SOURCE_LABEL: Record<OrderStatusLog["source"], string> = {
  user: "User",
  system: "Sistem",
  provider: "Provider",
  admin: "Admin",
};

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = findOrder(params.id);
  if (!order) notFound();

  const service = findService(order.serviceId);
  const StatusIcon = STATUS_ICON[order.status];

  const showProgress =
    order.status === "processing" ||
    order.status === "active" ||
    order.status === "partial" ||
    order.status === "completed";
  const delivered = order.delivered ?? 0;
  const progressPct = order.quantity
    ? Math.min(100, Math.round((delivered / order.quantity) * 100))
    : 0;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Riwayat Order", href: "/dashboard/orders" },
          { label: order.id },
        ]}
        title={order.serviceName}
        description={`${order.platform} · dibuat ${formatRelative(order.createdAt)}`}
      />

      {/* Status banner */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-gradient-to-br from-primary/15 to-surface/40 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-secondary">
            <StatusIcon className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">
              ID Order
            </p>
            <p className="font-mono text-base font-bold">{order.id}</p>
          </div>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        {/* ─── LEFT: Detail ─────────────────────────────────────── */}
        <div className="flex flex-col gap-5">
          {/* Target & Progress */}
          <div className="rounded-2xl border border-border bg-surface/70 p-5">
            <h3 className="mb-4 font-display text-base font-bold tracking-tight">
              Target & Progres
            </h3>

            <div className="mb-4 flex flex-col gap-2 rounded-xl border border-border bg-background/40 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider text-muted">
                  URL Target
                </p>
                <a
                  href={order.targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex max-w-full items-center gap-1.5 truncate text-sm font-medium text-foreground transition-colors hover:text-secondary"
                >
                  <span className="truncate">{order.targetUrl}</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                </a>
              </div>
              <CopyButton value={order.targetUrl} className="shrink-0" />
            </div>

            {showProgress ? (
              <>
                <div className="mb-2 flex items-end justify-between">
                  <span className="text-xs text-muted">Progres delivery</span>
                  <span className="font-mono text-sm font-bold">
                    {formatNumber(delivered)} /{" "}
                    <span className="text-muted">
                      {formatNumber(order.quantity)}
                    </span>{" "}
                    <span className="text-secondary">({progressPct}%)</span>
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-background/60">
                  <div
                    className="h-full rounded-full bg-gradient-brand transition-all"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </>
            ) : null}

            <dl className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
              <DetailStat label="Kuantitas" value={formatNumber(order.quantity)} />
              <DetailStat
                label="Start Count"
                value={
                  order.startCount !== undefined
                    ? formatNumber(order.startCount)
                    : "—"
                }
              />
              <DetailStat
                label="Remains"
                value={
                  order.remains !== undefined
                    ? formatNumber(order.remains)
                    : "—"
                }
              />
              <DetailStat label="Total Harga" value={formatIDR(order.price)} />
            </dl>
          </div>

          {/* Service info */}
          {service ? (
            <div className="rounded-2xl border border-border bg-surface/70 p-5">
              <h3 className="mb-3 font-display text-base font-bold tracking-tight">
                Layanan
              </h3>
              <p className="text-sm text-muted">{service.description}</p>
              <dl className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                <DetailStat label="Tipe" value={TYPE_LABEL[service.type]} />
                <DetailStat
                  label="Kualitas"
                  value={QUALITY_LABEL[service.quality]}
                />
                <DetailStat label="Kecepatan" value={service.estimatedSpeed} />
                <DetailStat
                  label="Harga / 1.000"
                  value={formatIDR(service.pricePer1000)}
                />
              </dl>
            </div>
          ) : null}

          {/* Status timeline */}
          <div className="rounded-2xl border border-border bg-surface/70 p-5">
            <h3 className="mb-4 font-display text-base font-bold tracking-tight">
              Riwayat Status
            </h3>
            <ol className="relative space-y-4 border-l border-border pl-6">
              {[...order.statusLogs].reverse().map((log, i) => {
                const SourceIcon = SOURCE_ICON[log.source];
                const LogStatusIcon = STATUS_ICON[log.to];
                return (
                  <li key={i} className="relative">
                    <span className="absolute -left-[33px] flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface">
                      <LogStatusIcon className="h-3 w-3 text-secondary" />
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={log.to} />
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted">
                        <SourceIcon className="h-3 w-3" />
                        {SOURCE_LABEL[log.source]}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-foreground/90">
                      {log.message}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      {formatDateTime(log.createdAt)} ·{" "}
                      {formatRelative(log.createdAt)}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* ─── RIGHT: Sidebar ─────────────────────────────────── */}
        <aside className="flex flex-col gap-5">
          <OrderActions order={order} />

          <div className="rounded-2xl border border-border bg-surface/70 p-5">
            <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-muted">
              Info Order
            </h3>
            <dl className="space-y-3 text-sm">
              <InfoRow label="Dibuat" value={formatDateTime(order.createdAt)} />
              <InfoRow label="Diupdate" value={formatDateTime(order.updatedAt)} />
              {order.completedAt ? (
                <InfoRow
                  label="Selesai"
                  value={formatDateTime(order.completedAt)}
                />
              ) : null}
              <InfoRow label="Platform" value={order.platform} />
              <InfoRow label="ID Layanan" value={`#${order.serviceId}`} mono />
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}

function DetailStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-background/40 px-3 py-2">
      <dt className="text-muted">{label}</dt>
      <dd className="mt-0.5 font-medium tabular-nums">{value}</dd>
    </div>
  );
}

function InfoRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="shrink-0 text-muted">{label}</dt>
      <dd
        className={
          mono
            ? "text-right font-mono text-xs text-foreground"
            : "text-right font-medium text-foreground"
        }
      >
        {value}
      </dd>
    </div>
  );
}
