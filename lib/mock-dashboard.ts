/**
 * Mock data for the dashboard home — used until the backend (Fase 1f+) is wired.
 * For order-related types and the full order list, see `lib/mock-orders.ts`.
 */

import { MOCK_ORDERS, type MockOrder } from "./mock-orders";

export const MOCK_USER = {
  id: "u_demo",
  name: "Budi Santoso",
  email: "budi@email.com",
  emailVerified: true,
  phone: "+62 812-3456-7890",
  initials: "BS",
  balance: 1_250_000,
  tier: "Silver" as const,
  referralCode: "BUDI123",
  joinedAt: "2026-02-14T08:00:00Z",
  twoFactorEnabled: false,
};

export type NotificationChannel = "email" | "whatsapp" | "push";
export type NotificationEventKey =
  | "order_completed"
  | "order_failed"
  | "deposit_success"
  | "promo"
  | "system_announcement";

export interface NotificationPreference {
  key: NotificationEventKey;
  label: string;
  description: string;
  channels: Record<NotificationChannel, boolean>;
}

export const DEFAULT_NOTIFICATION_PREFS: NotificationPreference[] = [
  {
    key: "order_completed",
    label: "Order Selesai",
    description: "Notifikasi saat order kamu selesai diproses",
    channels: { email: true, whatsapp: true, push: true },
  },
  {
    key: "order_failed",
    label: "Order Gagal / Refund",
    description: "Notifikasi saat order gagal & saldo dikembalikan",
    channels: { email: true, whatsapp: true, push: true },
  },
  {
    key: "deposit_success",
    label: "Deposit Sukses",
    description: "Konfirmasi saat saldo masuk ke akun",
    channels: { email: true, whatsapp: true, push: true },
  },
  {
    key: "promo",
    label: "Promo & Penawaran",
    description: "Diskon, voucher, dan penawaran eksklusif",
    channels: { email: true, whatsapp: false, push: false },
  },
  {
    key: "system_announcement",
    label: "Pengumuman Sistem",
    description: "Maintenance, update, dan info penting",
    channels: { email: true, whatsapp: false, push: true },
  },
];

export interface LoginSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  lastActiveAt: string;
  current: boolean;
}

const NOW_MS = new Date("2026-06-01T10:30:00Z").getTime();
const minAgo = (m: number) => new Date(NOW_MS - m * 60_000).toISOString();
const hrAgo = (h: number) => minAgo(h * 60);
const dayAgo = (d: number) => hrAgo(d * 24);

export const MOCK_LOGIN_SESSIONS: LoginSession[] = [
  {
    id: "ses_001",
    device: "MacBook Pro",
    browser: "Chrome 124",
    location: "Jakarta, Indonesia",
    ip: "180.252.144.10",
    lastActiveAt: minAgo(2),
    current: true,
  },
  {
    id: "ses_002",
    device: "iPhone 14",
    browser: "Safari Mobile",
    location: "Jakarta, Indonesia",
    ip: "114.122.78.5",
    lastActiveAt: hrAgo(4),
    current: false,
  },
  {
    id: "ses_003",
    device: "Samsung Galaxy S23",
    browser: "Chrome Mobile 124",
    location: "Bandung, Indonesia",
    ip: "36.84.92.18",
    lastActiveAt: dayAgo(2),
    current: false,
  },
  {
    id: "ses_004",
    device: "Windows PC",
    browser: "Firefox 125",
    location: "Surabaya, Indonesia",
    ip: "112.215.36.4",
    lastActiveAt: dayAgo(5),
    current: false,
  },
];

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
