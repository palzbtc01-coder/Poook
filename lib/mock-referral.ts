/**
 * Mock referral data for `/dashboard/referral`. Replace with DB-backed query
 * once Fase 1f lands.
 */

const NOW_MS = new Date("2026-06-01T10:30:00Z").getTime();
const dayAgo = (d: number) =>
  new Date(NOW_MS - d * 24 * 60 * 60_000).toISOString();

export interface ReferralStats {
  /** Klik unik pada referral link (anti-duplicate by IP+UA). */
  totalClicks: number;
  /** Berapa orang yang menyelesaikan registrasi via link kamu. */
  totalRegistered: number;
  /** Akumulasi komisi dari semua order referee (paid + pending). */
  totalCommissionEarned: number;
  /** Komisi yang sudah masuk saldo / withdraw. */
  paidCommission: number;
  /** Komisi yang masih menunggu order selesai sebelum dicairkan. */
  pendingCommission: number;
  /** Persentase komisi dari order referee. */
  commissionRate: number;
}

export const REFERRAL_STATS: ReferralStats = {
  totalClicks: 248,
  totalRegistered: 12,
  totalCommissionEarned: 187_500,
  paidCommission: 165_000,
  pendingCommission: 22_500,
  commissionRate: 2,
};

export interface Referee {
  id: string;
  name: string;
  initials: string;
  joinedAt: string;
  totalOrders: number;
  totalSpent: number;
  commissionEarned: number;
  isActive: boolean;
}

export const REFEREES: Referee[] = [
  {
    id: "ref_001",
    name: "Putri Lestari",
    initials: "PL",
    joinedAt: dayAgo(45),
    totalOrders: 28,
    totalSpent: 2_400_000,
    commissionEarned: 48_000,
    isActive: true,
  },
  {
    id: "ref_002",
    name: "Andre Wijaya",
    initials: "AW",
    joinedAt: dayAgo(38),
    totalOrders: 22,
    totalSpent: 1_800_000,
    commissionEarned: 36_000,
    isActive: true,
  },
  {
    id: "ref_003",
    name: "Maya Anggraini",
    initials: "MA",
    joinedAt: dayAgo(30),
    totalOrders: 18,
    totalSpent: 1_500_000,
    commissionEarned: 30_000,
    isActive: true,
  },
  {
    id: "ref_004",
    name: "Dimas Kurniawan",
    initials: "DK",
    joinedAt: dayAgo(28),
    totalOrders: 14,
    totalSpent: 1_100_000,
    commissionEarned: 22_000,
    isActive: true,
  },
  {
    id: "ref_005",
    name: "Rina Hartono",
    initials: "RH",
    joinedAt: dayAgo(21),
    totalOrders: 8,
    totalSpent: 750_000,
    commissionEarned: 15_000,
    isActive: true,
  },
  {
    id: "ref_006",
    name: "Joko Setiawan",
    initials: "JS",
    joinedAt: dayAgo(18),
    totalOrders: 6,
    totalSpent: 525_000,
    commissionEarned: 10_500,
    isActive: true,
  },
  {
    id: "ref_007",
    name: "Nadia Putri",
    initials: "NP",
    joinedAt: dayAgo(12),
    totalOrders: 4,
    totalSpent: 320_000,
    commissionEarned: 6_400,
    isActive: true,
  },
  {
    id: "ref_008",
    name: "Bayu Pratama",
    initials: "BP",
    joinedAt: dayAgo(10),
    totalOrders: 3,
    totalSpent: 280_000,
    commissionEarned: 5_600,
    isActive: true,
  },
  {
    id: "ref_009",
    name: "Citra Dewi",
    initials: "CD",
    joinedAt: dayAgo(7),
    totalOrders: 2,
    totalSpent: 140_000,
    commissionEarned: 2_800,
    isActive: true,
  },
  {
    id: "ref_010",
    name: "Farhan Rizki",
    initials: "FR",
    joinedAt: dayAgo(35),
    totalOrders: 0,
    totalSpent: 0,
    commissionEarned: 0,
    isActive: false,
  },
  {
    id: "ref_011",
    name: "Sinta Maharani",
    initials: "SM",
    joinedAt: dayAgo(20),
    totalOrders: 0,
    totalSpent: 0,
    commissionEarned: 0,
    isActive: false,
  },
  {
    id: "ref_012",
    name: "Aldo Santosa",
    initials: "AS",
    joinedAt: dayAgo(2),
    totalOrders: 1,
    totalSpent: 50_000,
    commissionEarned: 1_000,
    isActive: true,
  },
];

export interface CommissionEntry {
  id: string;
  refereeName: string;
  refereeInitials: string;
  orderId: string;
  orderAmount: number;
  commissionAmount: number;
  status: "pending" | "paid";
  createdAt: string;
  paidAt?: string;
}

export const COMMISSION_HISTORY: CommissionEntry[] = [
  {
    id: "COM-1023",
    refereeName: "Putri Lestari",
    refereeInitials: "PL",
    orderId: "ORD-2087198",
    orderAmount: 8_000,
    commissionAmount: 160,
    status: "pending",
    createdAt: dayAgo(1),
  },
  {
    id: "COM-1022",
    refereeName: "Maya Anggraini",
    refereeInitials: "MA",
    orderId: "ORD-2087342",
    orderAmount: 47_500,
    commissionAmount: 950,
    status: "pending",
    createdAt: dayAgo(1),
  },
  {
    id: "COM-1021",
    refereeName: "Andre Wijaya",
    refereeInitials: "AW",
    orderId: "ORD-2087045",
    orderAmount: 90_000,
    commissionAmount: 1_800,
    status: "pending",
    createdAt: dayAgo(3),
  },
  {
    id: "COM-1020",
    refereeName: "Putri Lestari",
    refereeInitials: "PL",
    orderId: "ORD-2086998",
    orderAmount: 200_000,
    commissionAmount: 4_000,
    status: "pending",
    createdAt: dayAgo(4),
  },
  {
    id: "COM-1019",
    refereeName: "Putri Lestari",
    refereeInitials: "PL",
    orderId: "ORD-2086544",
    orderAmount: 120_000,
    commissionAmount: 2_400,
    status: "paid",
    createdAt: dayAgo(7),
    paidAt: dayAgo(6),
  },
  {
    id: "COM-1018",
    refereeName: "Andre Wijaya",
    refereeInitials: "AW",
    orderId: "ORD-2086321",
    orderAmount: 50_000,
    commissionAmount: 1_000,
    status: "paid",
    createdAt: dayAgo(10),
    paidAt: dayAgo(9),
  },
  {
    id: "COM-1017",
    refereeName: "Dimas Kurniawan",
    refereeInitials: "DK",
    orderId: "ORD-2086108",
    orderAmount: 36_000,
    commissionAmount: 720,
    status: "paid",
    createdAt: dayAgo(14),
    paidAt: dayAgo(13),
  },
  {
    id: "COM-1016",
    refereeName: "Maya Anggraini",
    refereeInitials: "MA",
    orderId: "ORD-2085922",
    orderAmount: 90_000,
    commissionAmount: 1_800,
    status: "paid",
    createdAt: dayAgo(20),
    paidAt: dayAgo(19),
  },
  {
    id: "COM-1015",
    refereeName: "Rina Hartono",
    refereeInitials: "RH",
    orderId: "ORD-2085201",
    orderAmount: 175_000,
    commissionAmount: 3_500,
    status: "paid",
    createdAt: dayAgo(25),
    paidAt: dayAgo(24),
  },
];

export function buildReferralLink(code: string, base: string = "https://suntiksocial.id"): string {
  return `${base}/r/${code}`;
}
