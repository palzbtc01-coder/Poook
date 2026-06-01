/**
 * POST /api/violet/create
 *
 * Body: { amount: number, channel: string, voucherCode?: string }
 * Returns: { ref: string, simulated?: boolean } on success.
 *
 * Behaviour split:
 *   - Credentials configured → call VioletMediaPay /create, persist response.
 *   - Credentials missing    → run a deterministic simulation (in-memory only,
 *                              auto-confirms after 30 seconds) so the demo UI
 *                              works without a live merchant account.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createVioletTransaction } from "@/lib/violet/client";
import { findChannel, calculateChannelFee } from "@/lib/violet/channels";
import { isVioletConfigured } from "@/lib/violet/config";
import {
  generateDepositRef,
  saveDeposit,
  updateDepositStatus,
  type DepositRecord,
} from "@/lib/store/deposits";
import { MOCK_USER } from "@/lib/mock-dashboard";

export const dynamic = "force-dynamic";

const MIN_AMOUNT = 10_000;
const MAX_AMOUNT = 10_000_000;
const SIMULATION_AUTO_SUCCESS_MS = 30_000;

/**
 * Bonus rules (placeholder until the admin panel can configure them):
 *   - ≥ Rp 100.000  → 3 %
 *   - ≥ Rp 500.000  → 5 %
 *   - ≥ Rp 1.000.000 → 5 % capped at Rp 100.000
 */
function calculateBonus(amount: number): number {
  if (amount >= 1_000_000) return Math.min(100_000, Math.round(amount * 0.05));
  if (amount >= 500_000) return Math.round(amount * 0.05);
  if (amount >= 100_000) return Math.round(amount * 0.03);
  return 0;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const obj = body as Record<string, unknown>;
  const amount = Number(obj.amount);
  const channelCode = typeof obj.channel === "string" ? obj.channel : "";
  const voucherCode =
    typeof obj.voucherCode === "string" && obj.voucherCode.trim()
      ? obj.voucherCode.trim().toUpperCase()
      : undefined;

  // ─── Validation ────────────────────────────────────────────────
  if (!Number.isFinite(amount) || amount < MIN_AMOUNT) {
    return NextResponse.json(
      {
        error: `Nominal minimum Rp ${MIN_AMOUNT.toLocaleString("id-ID")}`,
      },
      { status: 400 },
    );
  }
  if (amount > MAX_AMOUNT) {
    return NextResponse.json(
      {
        error: `Nominal maksimum Rp ${MAX_AMOUNT.toLocaleString("id-ID")}`,
      },
      { status: 400 },
    );
  }
  const channel = findChannel(channelCode);
  if (!channel) {
    return NextResponse.json(
      { error: "Channel pembayaran tidak valid" },
      { status: 400 },
    );
  }

  // ─── Build the deposit record ───────────────────────────────────
  const ref = generateDepositRef();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 15 * 60_000);
  const fee = calculateChannelFee(channel, amount);
  const bonusAmount = calculateBonus(amount);
  // TODO: validate voucherCode against the vouchers table (Fase 1f).
  const voucherDiscount = 0;
  const totalToPay = amount + fee - voucherDiscount;
  const netCredit = amount + bonusAmount;

  const record: DepositRecord = {
    ref,
    userId: MOCK_USER.id,
    channel: channel.code,
    channelName: channel.name,
    amount,
    fee,
    bonusAmount,
    voucherCode,
    voucherDiscount,
    totalToPay,
    netCredit,
    status: "pending",
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    isSimulated: !isVioletConfigured(),
  };

  // ─── Simulation path (no Violet credentials) ────────────────────
  if (!isVioletConfigured()) {
    // Stub a VA number / QR string so the instructions page can render
    // something realistic without hitting the network.
    record.vaNumber = "8893" + String(Math.floor(Math.random() * 1e9)).padStart(9, "0");
    record.vaBank = channel.type === "va" ? channel.name : "BCA";
    saveDeposit(record);
    setTimeout(() => {
      updateDepositStatus(ref, "success", {
        completedAt: new Date().toISOString(),
      });
    }, SIMULATION_AUTO_SUCCESS_MS);
    return NextResponse.json({ ref, simulated: true });
  }

  // ─── Real Violet API call ───────────────────────────────────────
  const result = await createVioletTransaction({
    channel: channel.code,
    refKode: ref,
    amount,
    customerName: MOCK_USER.name,
    customerEmail: MOCK_USER.email,
  });

  if (!result.status) {
    record.status = "failed";
    record.error = result.error ?? result.message ?? "Gagal membuat transaksi";
    saveDeposit(record);
    return NextResponse.json(
      { ref, error: record.error },
      { status: 502 },
    );
  }

  // Hydrate the record with whatever the gateway returned. Fields vary by
  // channel (QRIS vs VA vs counter) so each is read defensively.
  const data = result.data;
  const stringField = (k: string) =>
    typeof data[k] === "string" ? (data[k] as string) : undefined;

  record.refId = stringField("ref_id");
  record.payUrl = stringField("pay_url");
  record.qrString = stringField("qr_string");
  record.qrUrl = stringField("qr_url");
  record.vaNumber = stringField("va_number");
  record.vaBank = stringField("va_bank");

  saveDeposit(record);
  return NextResponse.json({ ref });
}
