/**
 * Richer mock order data for /dashboard/orders and /dashboard/orders/[id].
 * This supersedes the small RECENT_ORDERS list in mock-dashboard.ts.
 */

export type OrderStatus =
  | "pending"
  | "processing"
  | "active"
  | "completed"
  | "partial"
  | "cancelled"
  | "refilling"
  | "error";

export interface OrderStatusLog {
  to: OrderStatus;
  message: string;
  source: "system" | "admin" | "provider" | "user";
  createdAt: string;
}

export interface MockOrder {
  id: string;
  serviceId: number;
  serviceName: string;
  platform: string;
  targetUrl: string;
  quantity: number;
  startCount?: number;
  remains?: number;
  delivered?: number;
  price: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  isRefillEligible: boolean;
  statusLogs: OrderStatusLog[];
}

const NOW = new Date("2026-06-01T10:30:00Z");
const minutesAgo = (m: number) =>
  new Date(NOW.getTime() - m * 60_000).toISOString();
const hoursAgo = (h: number) => minutesAgo(h * 60);
const daysAgo = (d: number) => hoursAgo(d * 24);

export const MOCK_ORDERS: MockOrder[] = [
  {
    id: "ORD-2087421",
    serviceId: 101,
    serviceName: "Instagram Followers Real - Indonesia",
    platform: "Instagram",
    targetUrl: "https://instagram.com/brand_kopi_id",
    quantity: 2_000,
    startCount: 8_240,
    remains: 1_350,
    delivered: 650,
    price: 30_000,
    status: "processing",
    createdAt: minutesAgo(5),
    updatedAt: minutesAgo(1),
    isRefillEligible: false,
    statusLogs: [
      {
        to: "pending",
        message: "Order dibuat",
        source: "user",
        createdAt: minutesAgo(5),
      },
      {
        to: "processing",
        message: "Order dikirim ke provider (SMMKings)",
        source: "system",
        createdAt: minutesAgo(4),
      },
      {
        to: "processing",
        message: "Provider memulai delivery — start count: 8.240",
        source: "provider",
        createdAt: minutesAgo(3),
      },
    ],
  },
  {
    id: "ORD-2087389",
    serviceId: 204,
    serviceName: "TikTok Views Super Cepat",
    platform: "TikTok",
    targetUrl: "https://tiktok.com/@dimas.creator/video/7221234567890",
    quantity: 50_000,
    startCount: 12_400,
    remains: 0,
    delivered: 50_000,
    price: 75_000,
    status: "completed",
    createdAt: hoursAgo(1),
    updatedAt: minutesAgo(35),
    completedAt: minutesAgo(35),
    isRefillEligible: false,
    statusLogs: [
      { to: "pending", message: "Order dibuat", source: "user", createdAt: hoursAgo(1) },
      {
        to: "processing",
        message: "Dikirim ke provider",
        source: "system",
        createdAt: hoursAgo(1),
      },
      {
        to: "completed",
        message: "Order selesai — 50.000 views terdeliver",
        source: "provider",
        createdAt: minutesAgo(35),
      },
    ],
  },
  {
    id: "ORD-2087342",
    serviceId: 301,
    serviceName: "YouTube Subscribers High Retention",
    platform: "YouTube",
    targetUrl: "https://youtube.com/@maya.cooks",
    quantity: 500,
    startCount: 1_280,
    remains: 320,
    delivered: 180,
    price: 47_500,
    status: "processing",
    createdAt: hoursAgo(3),
    updatedAt: minutesAgo(45),
    isRefillEligible: false,
    statusLogs: [
      { to: "pending", message: "Order dibuat", source: "user", createdAt: hoursAgo(3) },
      {
        to: "processing",
        message: "Dikirim ke provider",
        source: "system",
        createdAt: hoursAgo(3),
      },
    ],
  },
  {
    id: "ORD-2087198",
    serviceId: 104,
    serviceName: "Instagram Likes Indo Premium",
    platform: "Instagram",
    targetUrl: "https://instagram.com/p/CXxYz123abc",
    quantity: 1_000,
    startCount: 245,
    remains: 0,
    delivered: 1_000,
    price: 8_000,
    status: "completed",
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
    completedAt: daysAgo(1),
    isRefillEligible: true,
    statusLogs: [
      { to: "pending", message: "Order dibuat", source: "user", createdAt: daysAgo(1) },
      {
        to: "completed",
        message: "Order selesai dalam 8 menit",
        source: "provider",
        createdAt: daysAgo(1),
      },
    ],
  },
  {
    id: "ORD-2087102",
    serviceId: 401,
    serviceName: "Facebook Page Likes Indo",
    platform: "Facebook",
    targetUrl: "https://fb.com/UMKMSukses",
    quantity: 1_500,
    startCount: 4_120,
    remains: 250,
    delivered: 1_250,
    price: 33_000,
    status: "partial",
    createdAt: daysAgo(2),
    updatedAt: daysAgo(2),
    completedAt: daysAgo(2),
    isRefillEligible: false,
    statusLogs: [
      { to: "pending", message: "Order dibuat", source: "user", createdAt: daysAgo(2) },
      {
        to: "processing",
        message: "Dikirim ke provider",
        source: "system",
        createdAt: daysAgo(2),
      },
      {
        to: "partial",
        message: "Selesai sebagian — 250 unit di-refund Rp 5.500 ke saldo",
        source: "provider",
        createdAt: daysAgo(2),
      },
    ],
  },
  {
    id: "ORD-2087045",
    serviceId: 201,
    serviceName: "TikTok Followers Premium",
    platform: "TikTok",
    targetUrl: "https://tiktok.com/@andre.wijaya",
    quantity: 5_000,
    startCount: 12_500,
    remains: 0,
    delivered: 5_000,
    price: 90_000,
    status: "completed",
    createdAt: daysAgo(3),
    updatedAt: daysAgo(2),
    completedAt: daysAgo(2),
    isRefillEligible: true,
    statusLogs: [
      { to: "pending", message: "Order dibuat", source: "user", createdAt: daysAgo(3) },
      {
        to: "completed",
        message: "Order selesai dalam 18 jam",
        source: "provider",
        createdAt: daysAgo(2),
      },
    ],
  },
  {
    id: "ORD-2086998",
    serviceId: 106,
    serviceName: "Instagram Reels Views Indo",
    platform: "Instagram",
    targetUrl: "https://instagram.com/reel/CYzAbc456def",
    quantity: 100_000,
    startCount: 5_400,
    remains: 0,
    delivered: 100_000,
    price: 200_000,
    status: "completed",
    createdAt: daysAgo(4),
    updatedAt: daysAgo(4),
    completedAt: daysAgo(4),
    isRefillEligible: false,
    statusLogs: [
      { to: "pending", message: "Order dibuat", source: "user", createdAt: daysAgo(4) },
      { to: "completed", message: "Selesai dalam 22 menit", source: "provider", createdAt: daysAgo(4) },
    ],
  },
  {
    id: "ORD-2086877",
    serviceId: 302,
    serviceName: "YouTube Views Real",
    platform: "YouTube",
    targetUrl: "https://youtu.be/dQw4w9WgXcQ",
    quantity: 10_000,
    price: 250_000,
    status: "cancelled",
    createdAt: daysAgo(5),
    updatedAt: daysAgo(5),
    isRefillEligible: false,
    statusLogs: [
      { to: "pending", message: "Order dibuat", source: "user", createdAt: daysAgo(5) },
      {
        to: "cancelled",
        message: "Dibatalkan oleh user — saldo Rp 250.000 dikembalikan",
        source: "user",
        createdAt: daysAgo(5),
      },
    ],
  },
  {
    id: "ORD-2086544",
    serviceId: 105,
    serviceName: "Instagram Likes Cepat",
    platform: "Instagram",
    targetUrl: "https://instagram.com/p/CWqRtu789",
    quantity: 500,
    startCount: 89,
    remains: 0,
    delivered: 500,
    price: 1_750,
    status: "completed",
    createdAt: daysAgo(7),
    updatedAt: daysAgo(7),
    completedAt: daysAgo(7),
    isRefillEligible: false,
    statusLogs: [
      { to: "pending", message: "Order dibuat", source: "user", createdAt: daysAgo(7) },
      { to: "completed", message: "Selesai dalam 4 menit", source: "provider", createdAt: daysAgo(7) },
    ],
  },
  {
    id: "ORD-2086321",
    serviceId: 601,
    serviceName: "Telegram Channel Members",
    platform: "Telegram",
    targetUrl: "https://t.me/komunitaspebisnis_id",
    quantity: 2_000,
    price: 50_000,
    status: "error",
    createdAt: daysAgo(10),
    updatedAt: daysAgo(10),
    isRefillEligible: false,
    statusLogs: [
      { to: "pending", message: "Order dibuat", source: "user", createdAt: daysAgo(10) },
      {
        to: "error",
        message: "Provider error: channel tidak public. Saldo dikembalikan otomatis.",
        source: "provider",
        createdAt: daysAgo(10),
      },
    ],
  },
  {
    id: "ORD-2086108",
    serviceId: 304,
    serviceName: "YouTube Likes Cepat",
    platform: "YouTube",
    targetUrl: "https://youtu.be/abcDEF12345",
    quantity: 2_000,
    startCount: 340,
    remains: 0,
    delivered: 2_000,
    price: 36_000,
    status: "completed",
    createdAt: daysAgo(14),
    updatedAt: daysAgo(14),
    completedAt: daysAgo(14),
    isRefillEligible: false,
    statusLogs: [
      { to: "pending", message: "Order dibuat", source: "user", createdAt: daysAgo(14) },
      { to: "completed", message: "Selesai cepat", source: "provider", createdAt: daysAgo(14) },
    ],
  },
  {
    id: "ORD-2085922",
    serviceId: 102,
    serviceName: "Instagram Followers Global",
    platform: "Instagram",
    targetUrl: "https://instagram.com/global_brand_eu",
    quantity: 10_000,
    startCount: 23_400,
    remains: 0,
    delivered: 10_000,
    price: 90_000,
    status: "completed",
    createdAt: daysAgo(20),
    updatedAt: daysAgo(19),
    completedAt: daysAgo(19),
    isRefillEligible: false,
    statusLogs: [
      { to: "pending", message: "Order dibuat", source: "user", createdAt: daysAgo(20) },
      { to: "completed", message: "Selesai dalam 28 jam", source: "provider", createdAt: daysAgo(19) },
    ],
  },
];

export function findOrder(id: string): MockOrder | undefined {
  return MOCK_ORDERS.find((o) => o.id === id);
}

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Pending",
  processing: "Diproses",
  active: "Aktif",
  completed: "Selesai",
  partial: "Sebagian",
  cancelled: "Dibatalkan",
  refilling: "Refilling",
  error: "Gagal",
};

export const ORDER_STATUS_STYLE: Record<OrderStatus, string> = {
  pending: "bg-warning/15 text-warning border-warning/30",
  processing: "bg-secondary/15 text-secondary border-secondary/30",
  active: "bg-secondary/15 text-secondary border-secondary/30",
  completed: "bg-success/15 text-success border-success/30",
  partial: "bg-accent/15 text-accent border-accent/30",
  cancelled: "bg-muted/15 text-muted border-border",
  refilling: "bg-primary/15 text-primary-200 border-primary/30",
  error: "bg-danger/15 text-danger border-danger/30",
};
