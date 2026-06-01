/**
 * Mock data for the dashboard home — used until the backend (Fase 1f+) is wired.
 * For order-related types and the full order list, see `lib/mock-orders.ts`.
 */

import { MOCK_ORDERS, type MockOrder } from "./mock-orders";

export const MOCK_USER = {
  id: "u_demo",
  name: "Budi Santoso",
  email: "budi@email.com",
  initials: "BS",
  balance: 1_250_000,
  tier: "Silver" as const,
};

export interface SummaryStat {
  label: string;
  value: string;
  delta?: { value: string; positive: boolean };
  icon: "wallet" | "package" | "clock" | "trending";
  accent: "primary" | "secondary" | "accent" | "success";
}

export const SUMMARY_STATS: SummaryStat[] = [
  {
    label: "Saldo Aktif",
    value: "Rp 1.250.000",
    delta: { value: "+18% bulan ini", positive: true },
    icon: "wallet",
    accent: "primary",
  },
  {
    label: "Total Order",
    value: "142",
    delta: { value: "+12 minggu ini", positive: true },
    icon: "package",
    accent: "secondary",
  },
  {
    label: "Order Aktif",
    value: "3",
    icon: "clock",
    accent: "accent",
  },
  {
    label: "Pengeluaran Bulan Ini",
    value: "Rp 750.000",
    delta: { value: "+8% vs bulan lalu", positive: true },
    icon: "trending",
    accent: "success",
  },
];

/** Order count per day for the last 7 days (oldest → newest). */
export const ORDERS_LAST_7_DAYS: { day: string; count: number }[] = [
  { day: "Sen", count: 12 },
  { day: "Sel", count: 18 },
  { day: "Rab", count: 9 },
  { day: "Kam", count: 24 },
  { day: "Jum", count: 16 },
  { day: "Sab", count: 28 },
  { day: "Min", count: 21 },
];

/** Platform breakdown for the donut. Sums to 100. */
export const PLATFORM_BREAKDOWN: {
  name: string;
  percent: number;
  color: string;
}[] = [
  { name: "Instagram", percent: 42, color: "#E1306C" },
  { name: "TikTok", percent: 28, color: "#00D4FF" },
  { name: "YouTube", percent: 16, color: "#FF0000" },
  { name: "Facebook", percent: 9, color: "#1877F2" },
  { name: "Lainnya", percent: 5, color: "#A0A0B8" },
];

/** Most recent 5 orders for the dashboard home feed. */
export const RECENT_ORDERS: MockOrder[] = MOCK_ORDERS.slice(0, 5);
