import Link from "next/link";
import {
  PlusCircle,
  Wallet,
  ClipboardList,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { OrderChart } from "@/components/dashboard/order-chart";
import { PlatformDonut } from "@/components/dashboard/platform-donut";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import {
  SUMMARY_STATS,
  ORDERS_LAST_7_DAYS,
  PLATFORM_BREAKDOWN,
  RECENT_ORDERS,
  MOCK_USER,
} from "@/lib/mock-dashboard";

const QUICK_ACTIONS = [
  {
    label: "Buat Order Baru",
    description: "Pilih layanan & boost dalam hitungan detik",
    href: "/dashboard/orders/new",
    icon: PlusCircle,
    accent: "primary",
  },
  {
    label: "Isi Saldo",
    description: "Top up saldo via bank, e-wallet, atau QRIS",
    href: "/dashboard/deposit",
    icon: Wallet,
    accent: "secondary",
  },
  {
    label: "Cek Status Order",
    description: "Pantau order yang sedang berjalan",
    href: "/dashboard/orders",
    icon: ClipboardList,
    accent: "accent",
  },
] as const;

const ACCENT_TO_CLASS: Record<string, string> = {
  primary: "from-primary/30 to-surface bg-gradient-to-br text-primary-foreground",
  secondary: "from-secondary/25 to-surface bg-gradient-to-br",
  accent: "from-accent/25 to-surface bg-gradient-to-br",
};

export const metadata = {
  title: "Dashboard",
};

export default function DashboardHomePage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Selamat Datang, {MOCK_USER.name.split(" ")[0]}!
          </h1>
          <p className="mt-1 text-sm text-muted">
            Berikut ringkasan akun & order kamu hari ini.
          </p>
        </div>
        <Link
          href="/dashboard/orders/new"
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-brand px-4 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-[0_0_50px_-6px_rgba(108,59,245,0.7)]"
        >
          <PlusCircle className="h-4 w-4" />
          Order Baru
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SUMMARY_STATS.map((stat) => (
          <SummaryCard key={stat.label} stat={stat} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Order chart 7 days */}
        <div className="rounded-2xl border border-border bg-surface/70 p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-base font-bold tracking-tight">
                Order 7 Hari Terakhir
              </h3>
              <p className="text-xs text-muted">
                Total {ORDERS_LAST_7_DAYS.reduce((sum, d) => sum + d.count, 0)}{" "}
                order minggu ini
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
              <TrendingUp className="h-3.5 w-3.5" /> +24%
            </span>
          </div>
          <OrderChart data={ORDERS_LAST_7_DAYS} />
        </div>

        {/* Platform donut */}
        <div className="rounded-2xl border border-border bg-surface/70 p-5">
          <h3 className="mb-4 font-display text-base font-bold tracking-tight">
            Per Platform
          </h3>
          <PlatformDonut data={PLATFORM_BREAKDOWN} />
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="mb-3 font-display text-lg font-bold tracking-tight">
          Aksi Cepat
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className={`group flex flex-col gap-3 rounded-2xl border border-border ${ACCENT_TO_CLASS[action.accent]} p-5 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow`}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-background/60">
                  <Icon className="h-5 w-5 text-foreground" />
                </span>
                <div>
                  <p className="font-display text-base font-bold tracking-tight">
                    {action.label}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {action.description}
                  </p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-secondary transition-transform group-hover:translate-x-1">
                  Mulai <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent orders */}
      <RecentOrders orders={RECENT_ORDERS} />
    </div>
  );
}
