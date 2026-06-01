// This module performs outbound calls to VioletMediaPay using the merchant
// secret key. It must only be imported from server-side code (API routes,
// server actions, server components). Adding the `server-only` package would
// enforce this at build time — wired up in the admin-panel slice.
import { getVioletConfig } from "./config";
import { makeCreateSignature } from "./signature";
import type {
  CreateTransactionPayload,
  VioletResult,
  VioletTransactionData,
} from "./types";

/**
 * POST a form-encoded body to the Violet API and parse the JSON response.
 * Network and parse failures are normalised into a structured `VioletResult`.
 */
async function postForm(
  url: string,
  body: URLSearchParams,
): Promise<VioletResult> {
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      cache: "no-store",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { status: false, error: `Network error: ${message}` };
  }

  const text = await res.text();
  try {
    const json = JSON.parse(text) as VioletResult;
    return json;
  } catch {
    return {
      status: false,
      error: `Unexpected response (HTTP ${res.status})`,
      raw: text.slice(0, 500),
    };
  }
}

/** POST /create — open a new transaction at VioletMediaPay. */
export async function createVioletTransaction(
  payload: CreateTransactionPayload,
): Promise<VioletResult> {
  const cfg = getVioletConfig();

  if (!cfg.apiKey || !cfg.secretKey) {
    return { status: false, error: "Violet API key/secret belum diset" };
  }
  if (!cfg.publicBase) {
    return {
      status: false,
      error: "PUBLIC_BASE_URL belum diset — callback URL tidak bisa dibangun",
    };
  }

  const callbackUrl = `${cfg.publicBase}/api/violet/callback`;
  const redirectUrl = `${cfg.publicBase}/api/violet/redirect/${payload.refKode}`;
  const expiredTime = Math.floor(Date.now() / 1000) + cfg.expireSeconds;
  const signature = makeCreateSignature(
    payload.refKode,
    cfg.apiKey,
    payload.amount,
    cfg.secretKey,
  );

  const body = new URLSearchParams({
    api_key: cfg.apiKey,
    secret_key: cfg.secretKey,
    channel_payment: payload.channel,
    ref_kode: payload.refKode,
    nominal: String(payload.amount),
    cus_nama: payload.customerName ?? "SuntikSocial User",
    cus_email: payload.customerEmail ?? "user@suntiksocial.id",
    cus_phone: payload.customerPhone ?? "081200000000",
    produk: payload.productName ?? "Top up Saldo SuntikSocial",
    url_redirect: redirectUrl,
    url_callback: callbackUrl,
    expired_time: String(expiredTime),
    signature,
  });

  return postForm(`${cfg.baseUrl}/create`, body);
}

/** POST /transactions — fetch the live status of an existing transaction. */
export async function getVioletTransaction(
  ref: string,
  refId?: string,
): Promise<VioletResult> {
  const cfg = getVioletConfig();
  if (!cfg.apiKey || !cfg.secretKey) {
    return { status: false, error: "Violet API key/secret belum diset" };
  }

  const body = new URLSearchParams({
    api_key: cfg.apiKey,
    secret_key: cfg.secretKey,
    ref,
    ref_id: refId ?? "",
  });

  return postForm(`${cfg.baseUrl}/transactions`, body);
}

/** POST /balance — read the merchant balance held by VioletMediaPay. */
export async function getVioletBalance(): Promise<VioletResult> {
  const cfg = getVioletConfig();
  if (!cfg.apiKey || !cfg.secretKey) {
    return { status: false, error: "Violet API key/secret belum diset" };
  }
  const body = new URLSearchParams({
    api_key: cfg.apiKey,
    secret_key: cfg.secretKey,
    method: "balance",
  });
  return postForm(`${cfg.baseUrl}/balance`, body);
}

/** POST /fee-calculator — get the precise fee for a (channel, amount) pair. */
export async function calculateVioletFee(
  channel: string,
  amount: number,
): Promise<VioletResult> {
  const cfg = getVioletConfig();
  if (!cfg.apiKey || !cfg.secretKey) {
    return { status: false, error: "Violet API key/secret belum diset" };
  }
  const body = new URLSearchParams({
    api_key: cfg.apiKey,
    secret_key: cfg.secretKey,
    code: channel,
    amount: String(amount),
  });
  return postForm(`${cfg.baseUrl}/fee-calculator`, body);
}

/** Extract the data envelope while narrowing the result type. */
export function unwrapData(
  result: VioletResult,
): VioletTransactionData | null {
  return result.status ? result.data : null;
}
