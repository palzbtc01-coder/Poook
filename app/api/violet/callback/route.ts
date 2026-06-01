/**
 * POST /api/violet/callback
 *
 * Webhook handler that VioletMediaPay POSTs to whenever a transaction status
 * changes (success, expired, failed, …). We:
 *   1. Optionally enforce an IP whitelist.
 *   2. Verify the HMAC signature.
 *   3. Update the in-memory deposit store.
 *
 * Always returns 200 OK once the request is well-formed and authenticated, to
 * keep the gateway from retrying. Errors that should genuinely be retried
 * (signature mismatch, missing fields) return 4xx.
 */
import { NextResponse, type NextRequest } from "next/server";
import {
  getVioletConfig,
  VIOLET_WHITELIST_IPS,
} from "@/lib/violet/config";
import { verifyCallbackSignature } from "@/lib/violet/signature";
import { updateDepositStatus, type DepositStatus } from "@/lib/store/deposits";

export const dynamic = "force-dynamic";

/** Best-effort source-IP extraction from upstream proxy headers. */
function getClientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return (
    req.headers.get("x-real-ip") ??
    req.headers.get("cf-connecting-ip") ??
    ""
  );
}

/** Map whatever string Violet sends to one of our internal statuses. */
function statusFromViolet(raw: string): DepositStatus {
  const s = raw.toLowerCase();
  if (s === "success" || s === "paid" || s === "settlement") return "success";
  if (s === "expired") return "expired";
  if (s === "failed" || s === "deny" || s === "denied") return "failed";
  if (s === "cancelled" || s === "canceled") return "cancelled";
  return "pending";
}

export async function POST(req: NextRequest) {
  const cfg = getVioletConfig();

  // 1. IP whitelist (optional) ─────────────────────────────────────
  if (cfg.strictIp) {
    const ip = getClientIp(req);
    if (!(VIOLET_WHITELIST_IPS as readonly string[]).includes(ip)) {
      return NextResponse.json(
        { error: "IP not whitelisted" },
        { status: 403 },
      );
    }
  }

  // 2. Parse the body — Violet sends form-encoded; tolerate JSON too. ─
  const raw = await req.text();
  let payload: Record<string, string> = {};
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    for (const [k, v] of Object.entries(parsed)) payload[k] = String(v);
  } catch {
    for (const [k, v] of new URLSearchParams(raw)) payload[k] = v;
  }

  const ref = payload.ref ?? payload.ref_kode ?? "";
  const signature = payload.signature ?? "";
  const statusRaw = payload.status ?? "";
  const refId = payload.ref_id ?? undefined;

  if (!ref || !signature || !statusRaw) {
    return NextResponse.json(
      { error: "Missing required fields (ref / signature / status)" },
      { status: 400 },
    );
  }

  // 3. Signature check (HMAC-SHA256(ref, apiKey)). ────────────────────
  if (!verifyCallbackSignature(ref, cfg.apiKey, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // 4. Update the store. ──────────────────────────────────────────────
  const newStatus = statusFromViolet(statusRaw);
  const completedAt =
    newStatus === "success" ? new Date().toISOString() : undefined;
  updateDepositStatus(ref, newStatus, { completedAt, refId });

  return NextResponse.json({ status: "ok", ref });
}
