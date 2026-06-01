/**
 * GET /api/violet/status/[ref]
 *
 * Lightweight polling endpoint used by the deposit instructions page to
 * detect a status change without a full server round-trip. Sensitive fields
 * (refId, error message, secret-key signature, etc.) are intentionally not
 * surfaced here.
 */
import { NextResponse, type NextRequest } from "next/server";
import { getDeposit } from "@/lib/store/deposits";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { ref: string } },
) {
  const deposit = getDeposit(params.ref);
  if (!deposit) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    ref: deposit.ref,
    status: deposit.status,
    amount: deposit.amount,
    netCredit: deposit.netCredit,
    completedAt: deposit.completedAt ?? null,
    expiresAt: deposit.expiresAt,
    isSimulated: deposit.isSimulated,
  });
}
