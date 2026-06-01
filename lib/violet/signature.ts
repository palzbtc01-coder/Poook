import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signature attached to every `/create` request:
 *   HMAC-SHA256(refKode + apiKey + amount, secretKey)
 *
 * The amount is concatenated as a plain decimal string (Violet's docs match
 * Python's f-string interpolation behaviour: `f"{ref_kode}{api_key}{amount}"`).
 */
export function makeCreateSignature(
  refKode: string,
  apiKey: string,
  amount: number | string,
  secretKey: string,
): string {
  return createHmac("sha256", secretKey)
    .update(`${refKode}${apiKey}${amount}`, "utf8")
    .digest("hex");
}

/**
 * Signature included in every webhook callback body:
 *   HMAC-SHA256(ref, apiKey)
 *
 * Note that here the `apiKey` is used as the HMAC key (not the secret key).
 * This is what Violet's docs specify; we keep it intentional.
 */
export function makeCallbackSignature(ref: string, apiKey: string): string {
  return createHmac("sha256", apiKey)
    .update(String(ref), "utf8")
    .digest("hex");
}

/** Constant-time check for the callback signature. */
export function verifyCallbackSignature(
  ref: string,
  apiKey: string,
  given: string | null | undefined,
): boolean {
  if (!given || !apiKey) return false;
  const expected = makeCallbackSignature(ref, apiKey);
  if (expected.length !== given.length) return false;
  try {
    return timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(given, "hex"),
    );
  } catch {
    return false;
  }
}
