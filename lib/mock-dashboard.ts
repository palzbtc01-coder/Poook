/**
 * Mock data for the dashboard home — used until the backend (Fase 1c+) is wired.
 */

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

export type OrderStatus =
  | "pending"
  | "processing"
  | "completed"
  | "partial"
  | "error";

export interface RecentOrder {
  id: string;
  service: string;
  platform: string;
  target: string;
  quantity: number;
  price: number;
  status: OrderStatus;
  createdAgo: string;
}

export const RECENT_ORDERS: RecentOrder[] = [
  {
    id: "ORD-2087421",
    service: "Instagram Followers Real",
    platform: "Instagram",
    target: "@brand_kopi_id",
    quantity: 2_000,
    price: 30_000,
    status: "processing",
    createdAgo: "5 menit lalu",
  },
  {
    id: "ORD-2087389",
    service: "TikTok Views",
    platform: "TikTok",
    target: "@dimas.creator/video/...",
    quantity: 50_000,
    price: 75_000,
    status: "completed",
    createdAgo: "1 jam lalu",
  },
  {
    id: "ORD-2087342",
    service: "YouTube Subscribers",
    platform: "YouTube",
    target: "youtube.com/@maya.cooks",
    quantity: 500,
    price: 47_500,
    status: "processing",
    createdAgo: "3 jam lalu",
  },
  {
    id: "ORD-2087198",
    service: "Instagram Likes Indo",
    platform: "Instagram",
    target: "@putri.lestari/p/...",
    quantity: 1_000,
    price: 8_000,
    status: "completed",
    createdAgo: "Kemarin",
  },
  {
    id: "ORD-2087102",
    service: "Facebook Page Likes",
    platform: "Facebook",
    target: "fb.com/UMKMSukses",
    quantity: 1_500,
    price: 33_000,
    status: "partial",
    createdAgo: "2 hari lalu",
  },
];
