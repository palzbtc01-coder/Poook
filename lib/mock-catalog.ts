/**
 * Mock service catalog used by /dashboard/services and /dashboard/orders/new
 * until the backend (Fase 1f+) is wired.
 */

export type ServiceQuality =
  | "cheap"
  | "standard"
  | "premium"
  | "high_retention";
export type ServiceType = "normal" | "dripfeed" | "subscription";
export type ServiceTag =
  | "terlaris"
  | "termurah"
  | "tercepat"
  | "baru"
  | "rekomendasi"
  | "garansi_refill";

export interface CatalogCategory {
  id: number;
  platform: string;
  name: string;
  slug: string;
}

export interface CatalogService {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  type: ServiceType;
  quality: ServiceQuality;
  pricePer1000: number;
  minQuantity: number;
  maxQuantity: number;
  estimatedSpeed: string;
  estimatedTime: string;
  note?: string;
  tags: ServiceTag[];
  isFavorite?: boolean;
}

export const PLATFORMS = [
  "Instagram",
  "TikTok",
  "YouTube",
  "Facebook",
  "Twitter / X",
  "Telegram",
] as const;

export type PlatformName = (typeof PLATFORMS)[number];

export const CATEGORIES: CatalogCategory[] = [
  // Instagram
  { id: 1, platform: "Instagram", name: "Followers", slug: "ig-followers" },
  { id: 2, platform: "Instagram", name: "Likes", slug: "ig-likes" },
  { id: 3, platform: "Instagram", name: "Views (Reels)", slug: "ig-views" },
  { id: 4, platform: "Instagram", name: "Comments", slug: "ig-comments" },
  // TikTok
  { id: 10, platform: "TikTok", name: "Followers", slug: "tt-followers" },
  { id: 11, platform: "TikTok", name: "Likes", slug: "tt-likes" },
  { id: 12, platform: "TikTok", name: "Views", slug: "tt-views" },
  { id: 13, platform: "TikTok", name: "Shares", slug: "tt-shares" },
  // YouTube
  { id: 20, platform: "YouTube", name: "Subscribers", slug: "yt-subs" },
  { id: 21, platform: "YouTube", name: "Views", slug: "yt-views" },
  { id: 22, platform: "YouTube", name: "Watch Hours", slug: "yt-hours" },
  { id: 23, platform: "YouTube", name: "Likes", slug: "yt-likes" },
  // Facebook
  { id: 30, platform: "Facebook", name: "Page Likes", slug: "fb-page-likes" },
  { id: 31, platform: "Facebook", name: "Post Likes", slug: "fb-post-likes" },
  { id: 32, platform: "Facebook", name: "Followers", slug: "fb-followers" },
  // Twitter / X
  { id: 40, platform: "Twitter / X", name: "Followers", slug: "x-followers" },
  { id: 41, platform: "Twitter / X", name: "Likes", slug: "x-likes" },
  // Telegram
  { id: 50, platform: "Telegram", name: "Channel Members", slug: "tg-members" },
  { id: 51, platform: "Telegram", name: "Post Views", slug: "tg-views" },
];

export const SERVICES: CatalogService[] = [
  // ───────── Instagram ─────────
  {
    id: 101,
    categoryId: 1,
    name: "Instagram Followers Real - Indonesia",
    description:
      "Followers nyata dari akun aktif berbahasa Indonesia. Kualitas tinggi dengan retensi panjang. Cocok untuk membangun social proof brand lokal.",
    type: "normal",
    quality: "high_retention",
    pricePer1000: 15_000,
    minQuantity: 100,
    maxQuantity: 100_000,
    estimatedSpeed: "1K-5K/hari",
    estimatedTime: "0-2 jam",
    note: "Pastikan akun tidak private. Jangan ubah username selama proses.",
    tags: ["terlaris", "garansi_refill", "rekomendasi"],
  },
  {
    id: 102,
    categoryId: 1,
    name: "Instagram Followers Global",
    description: "Followers global dengan kecepatan instan. Lebih murah, ideal untuk kebutuhan boost cepat.",
    type: "normal",
    quality: "standard",
    pricePer1000: 9_000,
    minQuantity: 100,
    maxQuantity: 50_000,
    estimatedSpeed: "5K-10K/hari",
    estimatedTime: "Instan",
    tags: ["termurah"],
  },
  {
    id: 103,
    categoryId: 1,
    name: "Instagram Followers Drip-Feed",
    description: "Penambahan bertahap setiap jam agar terlihat natural. Konfigurasi run per jam tersedia.",
    type: "dripfeed",
    quality: "premium",
    pricePer1000: 22_000,
    minQuantity: 500,
    maxQuantity: 50_000,
    estimatedSpeed: "Custom",
    estimatedTime: "Sesuai konfigurasi",
    tags: ["rekomendasi"],
  },
  {
    id: 104,
    categoryId: 2,
    name: "Instagram Likes Indo Premium",
    description: "Likes real dari akun Indonesia dengan profile picture. Naturalnya tinggi.",
    type: "normal",
    quality: "premium",
    pricePer1000: 8_000,
    minQuantity: 50,
    maxQuantity: 50_000,
    estimatedSpeed: "Instan",
    estimatedTime: "0-15 menit",
    tags: ["tercepat", "rekomendasi"],
  },
  {
    id: 105,
    categoryId: 2,
    name: "Instagram Likes Cepat",
    description: "Likes super cepat tanpa tunggu, kualitas standar.",
    type: "normal",
    quality: "cheap",
    pricePer1000: 3_500,
    minQuantity: 50,
    maxQuantity: 100_000,
    estimatedSpeed: "Instan",
    estimatedTime: "0-5 menit",
    tags: ["termurah"],
  },
  {
    id: 106,
    categoryId: 3,
    name: "Instagram Reels Views Indo",
    description: "Views Reels dari traffic Indonesia. Mendukung algoritma Reels.",
    type: "normal",
    quality: "standard",
    pricePer1000: 2_000,
    minQuantity: 100,
    maxQuantity: 1_000_000,
    estimatedSpeed: "Sangat cepat",
    estimatedTime: "0-30 menit",
    tags: ["termurah", "tercepat"],
  },
  {
    id: 107,
    categoryId: 4,
    name: "Instagram Comments Custom",
    description: "Komentar custom sesuai daftar yang kamu kirim. Maksimal 1 komentar per akun.",
    type: "normal",
    quality: "premium",
    pricePer1000: 90_000,
    minQuantity: 5,
    maxQuantity: 500,
    estimatedSpeed: "Bertahap",
    estimatedTime: "1-12 jam",
    note: "Kirim daftar komentar saat order. 1 baris = 1 komentar.",
    tags: ["baru"],
  },

  // ───────── TikTok ─────────
  {
    id: 201,
    categoryId: 10,
    name: "TikTok Followers Premium",
    description: "Followers TikTok kualitas premium dengan retensi panjang.",
    type: "normal",
    quality: "premium",
    pricePer1000: 18_000,
    minQuantity: 100,
    maxQuantity: 100_000,
    estimatedSpeed: "2K-10K/hari",
    estimatedTime: "0-3 jam",
    tags: ["terlaris", "garansi_refill"],
  },
  {
    id: 202,
    categoryId: 10,
    name: "TikTok Followers Cepat",
    description: "Followers TikTok dengan kecepatan tinggi, kualitas standar.",
    type: "normal",
    quality: "standard",
    pricePer1000: 12_000,
    minQuantity: 100,
    maxQuantity: 50_000,
    estimatedSpeed: "5K/hari",
    estimatedTime: "0-1 jam",
    tags: ["tercepat"],
  },
  {
    id: 203,
    categoryId: 11,
    name: "TikTok Likes Indonesia",
    description: "Likes dari akun TikTok Indonesia. Bantu naikkan engagement video.",
    type: "normal",
    quality: "standard",
    pricePer1000: 6_000,
    minQuantity: 50,
    maxQuantity: 50_000,
    estimatedSpeed: "Instan",
    estimatedTime: "0-15 menit",
    tags: ["rekomendasi"],
  },
  {
    id: 204,
    categoryId: 12,
    name: "TikTok Views Super Cepat",
    description: "Views TikTok super cepat. Cocok untuk push video viral.",
    type: "normal",
    quality: "cheap",
    pricePer1000: 1_500,
    minQuantity: 1_000,
    maxQuantity: 10_000_000,
    estimatedSpeed: "Sangat cepat",
    estimatedTime: "0-30 menit",
    tags: ["termurah", "tercepat"],
  },
  {
    id: 205,
    categoryId: 13,
    name: "TikTok Shares",
    description: "Share video TikTok untuk mendorong distribusi konten.",
    type: "normal",
    quality: "standard",
    pricePer1000: 4_500,
    minQuantity: 100,
    maxQuantity: 100_000,
    estimatedSpeed: "Cepat",
    estimatedTime: "0-1 jam",
    tags: [],
  },

  // ───────── YouTube ─────────
  {
    id: 301,
    categoryId: 20,
    name: "YouTube Subscribers High Retention",
    description: "Subscribers YouTube dengan retensi tinggi. Cocok untuk monetisasi.",
    type: "normal",
    quality: "high_retention",
    pricePer1000: 95_000,
    minQuantity: 50,
    maxQuantity: 10_000,
    estimatedSpeed: "300-500/hari",
    estimatedTime: "1-3 hari",
    note: "Channel harus public. Tidak boleh kids content.",
    tags: ["terlaris", "garansi_refill", "rekomendasi"],
  },
  {
    id: 302,
    categoryId: 21,
    name: "YouTube Views Real",
    description: "Views asli dari pengguna real. Membantu watch time channel.",
    type: "normal",
    quality: "premium",
    pricePer1000: 25_000,
    minQuantity: 1_000,
    maxQuantity: 1_000_000,
    estimatedSpeed: "1K-3K/hari",
    estimatedTime: "0-12 jam",
    tags: ["rekomendasi"],
  },
  {
    id: 303,
    categoryId: 22,
    name: "YouTube Watch Hours Monetisasi",
    description: "Watch hours untuk syarat monetisasi YPP. Bertahap & natural.",
    type: "dripfeed",
    quality: "high_retention",
    pricePer1000: 120_000,
    minQuantity: 1_000,
    maxQuantity: 10_000,
    estimatedSpeed: "Bertahap",
    estimatedTime: "5-10 hari",
    tags: ["baru", "rekomendasi"],
  },
  {
    id: 304,
    categoryId: 23,
    name: "YouTube Likes Cepat",
    description: "Likes YouTube cepat untuk dorong rekomendasi algoritma.",
    type: "normal",
    quality: "standard",
    pricePer1000: 18_000,
    minQuantity: 50,
    maxQuantity: 50_000,
    estimatedSpeed: "Instan",
    estimatedTime: "0-1 jam",
    tags: ["tercepat"],
  },

  // ───────── Facebook ─────────
  {
    id: 401,
    categoryId: 30,
    name: "Facebook Page Likes Indo",
    description: "Likes halaman Facebook dari akun Indonesia.",
    type: "normal",
    quality: "premium",
    pricePer1000: 22_000,
    minQuantity: 100,
    maxQuantity: 50_000,
    estimatedSpeed: "1K/hari",
    estimatedTime: "0-12 jam",
    tags: ["terlaris"],
  },
  {
    id: 402,
    categoryId: 31,
    name: "Facebook Post Likes",
    description: "Likes untuk post Facebook (tidak untuk page likes).",
    type: "normal",
    quality: "standard",
    pricePer1000: 9_000,
    minQuantity: 50,
    maxQuantity: 50_000,
    estimatedSpeed: "Cepat",
    estimatedTime: "0-1 jam",
    tags: ["termurah"],
  },
  {
    id: 403,
    categoryId: 32,
    name: "Facebook Followers Profile",
    description: "Followers untuk profile Facebook personal yang sudah public.",
    type: "normal",
    quality: "standard",
    pricePer1000: 20_000,
    minQuantity: 100,
    maxQuantity: 30_000,
    estimatedSpeed: "1K-2K/hari",
    estimatedTime: "0-6 jam",
    tags: [],
  },

  // ───────── Twitter / X ─────────
  {
    id: 501,
    categoryId: 40,
    name: "X Followers Indonesia",
    description: "Followers X (Twitter) dari akun Indonesia.",
    type: "normal",
    quality: "standard",
    pricePer1000: 35_000,
    minQuantity: 100,
    maxQuantity: 20_000,
    estimatedSpeed: "1K/hari",
    estimatedTime: "0-6 jam",
    tags: ["baru"],
  },
  {
    id: 502,
    categoryId: 41,
    name: "X Tweet Likes",
    description: "Likes untuk tweet tertentu.",
    type: "normal",
    quality: "standard",
    pricePer1000: 12_000,
    minQuantity: 50,
    maxQuantity: 20_000,
    estimatedSpeed: "Cepat",
    estimatedTime: "0-1 jam",
    tags: [],
  },

  // ───────── Telegram ─────────
  {
    id: 601,
    categoryId: 50,
    name: "Telegram Channel Members",
    description: "Member aktif untuk channel Telegram public.",
    type: "normal",
    quality: "standard",
    pricePer1000: 25_000,
    minQuantity: 100,
    maxQuantity: 50_000,
    estimatedSpeed: "5K/hari",
    estimatedTime: "0-2 jam",
    tags: ["rekomendasi"],
  },
  {
    id: 602,
    categoryId: 51,
    name: "Telegram Post Views",
    description: "Views untuk post di channel Telegram.",
    type: "normal",
    quality: "cheap",
    pricePer1000: 800,
    minQuantity: 1_000,
    maxQuantity: 5_000_000,
    estimatedSpeed: "Sangat cepat",
    estimatedTime: "Instan",
    tags: ["termurah"],
  },
];

/* ------------------------- Helper lookup functions ------------------------ */

export function findService(id: number): CatalogService | undefined {
  return SERVICES.find((s) => s.id === id);
}

export function findCategory(id: number): CatalogCategory | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getCategoryPlatform(categoryId: number): string | undefined {
  return findCategory(categoryId)?.platform;
}

export function categoriesByPlatform(platform: string): CatalogCategory[] {
  return CATEGORIES.filter((c) => c.platform === platform);
}

export function servicesByCategory(categoryId: number): CatalogService[] {
  return SERVICES.filter((s) => s.categoryId === categoryId);
}

/* ------------------------------ Display maps ------------------------------ */

export const QUALITY_LABEL: Record<ServiceQuality, string> = {
  cheap: "Murah",
  standard: "Standar",
  premium: "Premium",
  high_retention: "High Retention",
};

export const TYPE_LABEL: Record<ServiceType, string> = {
  normal: "Normal",
  dripfeed: "Drip-feed",
  subscription: "Subscription",
};

export const TAG_LABEL: Record<ServiceTag, string> = {
  terlaris: "Terlaris",
  termurah: "Termurah",
  tercepat: "Tercepat",
  baru: "Baru",
  rekomendasi: "Rekomendasi",
  garansi_refill: "Garansi Refill",
};
