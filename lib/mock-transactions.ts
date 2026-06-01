/**
 * Mock historical balance ledger for `/dashboard/transactions`.
 *
 * The entries chain so that the running `balanceAfter` of the most recent
 * transaction matches `MOCK_USER.balance` (Rp 1.250.000), and references in
 * the `referenceId` field point to real entries in `lib/mock-orders.ts`.
 *
 * Replace this file with a query against the real DB once Fase 1f lands.
 */

import {
  type DepositRecord,
  listDepositsByUser,
} from "./store/deposits";

export type TransactionType =
  | "deposit"
  | "order_debit"
  | "refund"
  | "bonus"
  | "cashback"
  | "commission"
  | "adjustment";

export type TransactionStatus = "success" | "pending" | "failed";

export interface TransactionEntry {
  id: string;
  type: TransactionType;
  description: string;
  /** Signed: positive credits the balance, negative debits it. */
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  status: TransactionStatus;
  createdAt: string;
  /** Channel code or human label, only relevant for deposits. */
  paymentMethod?: string;
  referenceId?: string;
  referenceType?: "deposit" | "order";
}

const NOW = new Date("2026-06-01T10:30:00Z");
const minutesAgo = (m: number) =>
  new Date(NOW.getTime() - m * 60_000).toISOString();
const hoursAgo = (h: number) => minutesAgo(h * 60);
const daysAgo = (d: number) => hoursAgo(d * 24);

export const MOCK_HISTORICAL_TRANSACTIONS: TransactionEntry[] = [
  // ─── Today ───────────────────────────────────────────
  {
    id: "TRX-002088112",
    type: "order_debit",
    description: "Order Instagram Followers Real - Indonesia (2.000)",
    amount: -30_000,
    balanceBefore: 1_280_000,
    balanceAfter: 1_250_000,
    referenceId: "ORD-2087421",
    referenceType: "order",
    createdAt: minutesAgo(5),
    status: "success",
  },
  {
    id: "TRX-002088089",
    type: "order_debit",
    description: "Order TikTok Views Super Cepat (50.000)",
    amount: -75_000,
    balanceBefore: 1_355_000,
    balanceAfter: 1_280_000,
    referenceId: "ORD-2087389",
    referenceType: "order",
    createdAt: hoursAgo(1),
    status: "success",
  },
  {
    id: "TRX-002088042",
    type: "order_debit",
    description: "Order YouTube Subscribers High Retention (500)",
    amount: -47_500,
    balanceBefore: 1_402_500,
    balanceAfter: 1_355_000,
    referenceId: "ORD-2087342",
    referenceType: "order",
    createdAt: hoursAgo(3),
    status: "success",
  },
  {
    id: "TRX-002087995",
    type: "deposit",
    description: "Deposit via QRIS",
    amount: +500_000,
    balanceBefore: 902_500,
    balanceAfter: 1_402_500,
    referenceId: "DEP-2087990",
    referenceType: "deposit",
    createdAt: hoursAgo(8),
    paymentMethod: "QRIS",
    status: "success",
  },
  {
    id: "TRX-002087994",
    type: "bonus",
    description: "Bonus deposit ≥ Rp 500.000",
    amount: +25_000,
    balanceBefore: 877_500,
    balanceAfter: 902_500,
    createdAt: hoursAgo(8),
    status: "success",
  },

  // ─── Yesterday & before ──────────────────────────────
  {
    id: "TRX-002087898",
    type: "order_debit",
    description: "Order Instagram Likes Indo Premium (1.000)",
    amount: -8_000,
    balanceBefore: 885_500,
    balanceAfter: 877_500,
    referenceId: "ORD-2087198",
    referenceType: "order",
    createdAt: daysAgo(1),
    status: "success",
  },
  {
    id: "TRX-002087812",
    type: "refund",
    description: "Refund partial — 250 unit tidak terdeliver",
    amount: +5_500,
    balanceBefore: 880_000,
    balanceAfter: 885_500,
    referenceId: "ORD-2087102",
    referenceType: "order",
    createdAt: daysAgo(2),
    status: "success",
  },
  {
    id: "TRX-002087811",
    type: "order_debit",
    description: "Order Facebook Page Likes Indo (1.500)",
    amount: -33_000,
    balanceBefore: 913_000,
    balanceAfter: 880_000,
    referenceId: "ORD-2087102",
    referenceType: "order",
    createdAt: daysAgo(2),
    status: "success",
  },
  {
    id: "TRX-002087745",
    type: "order_debit",
    description: "Order TikTok Followers Premium (5.000)",
    amount: -90_000,
    balanceBefore: 1_003_000,
    balanceAfter: 913_000,
    referenceId: "ORD-2087045",
    referenceType: "order",
    createdAt: daysAgo(3),
    status: "success",
  },
  {
    id: "TRX-002087698",
    type: "order_debit",
    description: "Order Instagram Reels Views Indo (100.000)",
    amount: -200_000,
    balanceBefore: 1_203_000,
    balanceAfter: 1_003_000,
    referenceId: "ORD-2086998",
    referenceType: "order",
    createdAt: daysAgo(4),
    status: "success",
  },
  {
    id: "TRX-002087677",
    type: "commission",
    description: "Komisi referral dari @putri.lestari (2%)",
    amount: +12_500,
    balanceBefore: 1_190_500,
    balanceAfter: 1_203_000,
    createdAt: daysAgo(4),
    status: "success",
  },
  {
    id: "TRX-002087599",
    type: "refund",
    description: "Refund order dibatalkan",
    amount: +250_000,
    balanceBefore: 940_500,
    balanceAfter: 1_190_500,
    referenceId: "ORD-2086877",
    referenceType: "order",
    createdAt: daysAgo(5),
    status: "success",
  },
  {
    id: "TRX-002087598",
    type: "order_debit",
    description: "Order YouTube Views Real (10.000)",
    amount: -250_000,
    balanceBefore: 1_190_500,
    balanceAfter: 940_500,
    referenceId: "ORD-2086877",
    referenceType: "order",
    createdAt: daysAgo(5),
    status: "success",
  },
  {
    id: "TRX-002087445",
    type: "order_debit",
    description: "Order Instagram Likes Cepat (500)",
    amount: -1_750,
    balanceBefore: 1_192_250,
    balanceAfter: 1_190_500,
    referenceId: "ORD-2086544",
    referenceType: "order",
    createdAt: daysAgo(7),
    status: "success",
  },
  {
    id: "TRX-002087421",
    type: "cashback",
    description: "Cashback 5% dari order minggu lalu",
    amount: +15_000,
    balanceBefore: 1_177_250,
    balanceAfter: 1_192_250,
    createdAt: daysAgo(7),
    status: "success",
  },
  {
    id: "TRX-002087199",
    type: "refund",
    description: "Refund order error provider",
    amount: +50_000,
    balanceBefore: 1_127_250,
    balanceAfter: 1_177_250,
    referenceId: "ORD-2086321",
    referenceType: "order",
    createdAt: daysAgo(10),
    status: "success",
  },
  {
    id: "TRX-002087198",
    type: "order_debit",
    description: "Order Telegram Channel Members (2.000)",
    amount: -50_000,
    balanceBefore: 1_177_250,
    balanceAfter: 1_127_250,
    referenceId: "ORD-2086321",
    referenceType: "order",
    createdAt: daysAgo(10),
    status: "success",
  },
  {
    id: "TRX-002086877",
    type: "order_debit",
    description: "Order YouTube Likes Cepat (2.000)",
    amount: -36_000,
    balanceBefore: 1_213_250,
    balanceAfter: 1_177_250,
    referenceId: "ORD-2086108",
    referenceType: "order",
    createdAt: daysAgo(14),
    status: "success",
  },
  {
    id: "TRX-002086755",
    type: "deposit",
    description: "Deposit via BCA Virtual Account",
    amount: +1_000_000,
    balanceBefore: 213_250,
    balanceAfter: 1_213_250,
    referenceId: "DEP-2086750",
    referenceType: "deposit",
    createdAt: daysAgo(15),
    paymentMethod: "BCAVA",
    status: "success",
  },
  {
    id: "TRX-002086754",
    type: "bonus",
    description: "Bonus deposit ≥ Rp 1.000.000",
    amount: +50_000,
    balanceBefore: 163_250,
    balanceAfter: 213_250,
    createdAt: daysAgo(15),
    status: "success",
  },
  {
    id: "TRX-002085987",
    type: "order_debit",
    description: "Order Instagram Followers Global (10.000)",
    amount: -90_000,
    balanceBefore: 253_250,
    balanceAfter: 163_250,
    referenceId: "ORD-2085922",
    referenceType: "order",
    createdAt: daysAgo(20),
    status: "success",
  },
];

/* ─────────────── Helpers ─────────────── */

export const TRANSACTION_TYPE_LABEL: Record<TransactionType, string> = {
  deposit: "Deposit",
  order_debit: "Order",
  refund: "Refund",
  bonus: "Bonus",
  cashback: "Cashback",
  commission: "Komisi",
  adjustment: "Penyesuaian",
};

/** Convert a successful in-memory deposit into a transaction-ledger entry. */
function depositToTransaction(deposit: DepositRecord): TransactionEntry {
  // The historical list already ends at Rp 1.250.000, so a freshly-credited
  // deposit nominally lands "on top" of that. Without a real ledger we just
  // approximate the running balance.
  const balanceBefore =
    MOCK_HISTORICAL_TRANSACTIONS[0]?.balanceAfter ?? 0;
  return {
    id: `TRX-${deposit.ref}`,
    type: "deposit",
    description: `Deposit via ${deposit.channelName}`,
    amount: +deposit.netCredit,
    balanceBefore,
    balanceAfter: balanceBefore + deposit.netCredit,
    referenceId: deposit.ref,
    referenceType: "deposit",
    createdAt: deposit.completedAt ?? deposit.createdAt,
    paymentMethod: deposit.channel,
    status: "success",
  };
}

/**
 * Combine historical mock transactions with **successful** deposits from the
 * in-memory store, sorted newest → oldest. Pending deposits are intentionally
 * excluded — they aren't credited to the balance until they confirm.
 */
export function listAllTransactions(userId: string): TransactionEntry[] {
  const liveDeposits = listDepositsByUser(userId)
    .filter((d) => d.status === "success")
    .map(depositToTransaction);
  return [...liveDeposits, ...MOCK_HISTORICAL_TRANSACTIONS].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
}
