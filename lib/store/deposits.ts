/**
 * In-memory deposit store.
 *
 * Persists for the lifetime of the Node process — fine for development, demos,
 * and sandboxed previews, but **NOT for production**: a hot reload, a restart,
 * or a serverless cold start will wipe it. The plan is to swap this module for
 * a Prisma-backed implementation when the backend foundation lands (Fase 1f),
 * keeping the same exported function signatures so callers don't change.
 */

export type DepositStatus =
  | "pending"
  | "success"
  | "expired"
  | "failed"
  | "cancelled";

export interface DepositRecord {
  /** Our own reference (also `ref_kode` on the wire). */
  ref: string;
  userId: string;

  channel: string;
  channelName: string;

  /** Nominal in IDR before fees / bonuses. */
  amount: number;
  /** Gateway fee in IDR. */
  fee: number;
  /** Bonus credited on top of the deposit (e.g., onboarding/tier bonus). */
  bonusAmount: number;
  voucherCode?: string;
  voucherDiscount: number;
  /** What the user transfers at the gateway (= amount + fee − voucher). */
  totalToPay: number;
  /** What lands in the user's balance on success (= amount + bonus). */
  netCredit: number;

  status: DepositStatus;

  /** ISO-8601 timestamps. */
  createdAt: string;
  expiresAt: string;
  completedAt?: string;

  /** Whatever the gateway returned that's useful to render the pay page. */
  payUrl?: string;
  qrString?: string;
  qrUrl?: string;
  vaNumber?: string;
  vaBank?: string;
  /** Violet's internal id (`ref_id`). */
  refId?: string;

  /**
   * True when no real Violet API call was made (because credentials were
   * missing). The instruction page renders a banner to make the demo mode
   * obvious, and the simulated invoice auto-confirms after 30 seconds.
   */
  isSimulated: boolean;

  /** Friendly error message when creation failed. */
  error?: string;
}

const store = new Map<string, DepositRecord>();

/** Generates a Violet-compatible `ref_kode` like `DEP-2087500`. */
export function generateDepositRef(): string {
  const random = Math.floor(Math.random() * 9_000_000) + 1_000_000;
  return `DEP-${random}`;
}

export function saveDeposit(record: DepositRecord): void {
  store.set(record.ref, record);
}

export function getDeposit(ref: string): DepositRecord | undefined {
  return store.get(ref);
}

export function updateDepositStatus(
  ref: string,
  status: DepositStatus,
  options: { completedAt?: string; refId?: string } = {},
): boolean {
  const existing = store.get(ref);
  if (!existing) return false;

  // Don't downgrade out of a terminal state.
  const terminal: DepositStatus[] = ["success", "expired", "failed", "cancelled"];
  if (terminal.includes(existing.status) && existing.status !== status) {
    return false;
  }

  existing.status = status;
  if (options.completedAt) existing.completedAt = options.completedAt;
  if (options.refId) existing.refId = options.refId;
  store.set(ref, existing);
  return true;
}

/** Returns deposits sorted newest → oldest. */
export function listDepositsByUser(userId: string): DepositRecord[] {
  return [...store.values()]
    .filter((d) => d.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
