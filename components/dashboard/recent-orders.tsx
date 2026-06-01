import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  type OrderStatus,
  type MockOrder,
  ORDER_STATUS_LABEL,
  ORDER_STATUS_STYLE,
} from "@/lib/mock-orders";
import { formatIDR, formatNumber, formatRelative, cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap",
        ORDER_STATUS_STYLE[status],
      )}
    >
      {status === "processing" || status === "active" || status === "refilling" ? (
        <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-current" />
      ) : null}
      {ORDER_STATUS_LABEL[status]}
    </span>
  );
}

export function RecentOrders({ orders }: { orders: MockOrder[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface/70">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h3 className="font-display text-base font-bold tracking-tight">
            Order Terbaru
          </h3>
          <p className="text-xs text-muted">{orders.length} order terakhir kamu</p>
        </div>
        <Link
          href="/dashboard/orders"
          className="inline-flex items-center gap-1 text-sm font-semibold text-secondary hover:underline"
        >
          Lihat semua <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background/40 text-left text-[11px] uppercase tracking-wider text-muted">
              <th className="px-5 py-3 font-semibold">ID</th>
              <th className="px-3 py-3 font-semibold">Layanan</th>
              <th className="px-3 py-3 font-semibold">Target</th>
              <th className="px-3 py-3 font-semibold text-right">Qty</th>
              <th className="px-3 py-3 font-semibold text-right">Harga</th>
              <th className="px-3 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold text-right">Waktu</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-border/50 transition-colors last:border-b-0 hover:bg-background/30"
              >
                <td className="px-5 py-3.5">
                  <Link
                    href={`/dashboard/orders/${order.id}`}
                    className="font-mono text-xs text-muted hover:text-secondary"
                  >
                    {order.id}
                  </Link>
                </td>
                <td className="px-3 py-3.5">
                  <p className="font-medium">{order.serviceName}</p>
                  <p className="text-xs text-muted">{order.platform}</p>
                </td>
                <td className="max-w-[200px] truncate px-3 py-3.5 text-muted">
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

      {/* Mobile / tablet stacked list */}
      <ul className="divide-y divide-border lg:hidden">
        {orders.map((order) => (
          <li key={order.id}>
            <Link
              href={`/dashboard/orders/${order.id}`}
              className="flex flex-col gap-2 p-5 transition-colors hover:bg-background/40"
            >
              <div className="flex items-start justify-between gap-3">
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
              <div className="flex items-center justify-between text-xs text-muted">
                <span className="font-mono">{order.id}</span>
                <span>
                  {formatNumber(order.quantity)} •{" "}
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
    </div>
  );
}
