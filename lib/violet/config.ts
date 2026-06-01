/**
 * Centralised configuration for the VioletMediaPay integration.
 *
 * Today the values are read from environment variables. Once the admin panel
 * lands (Fase 2), `getVioletConfig` will be replaced with a DB-backed loader
 * that allows operators to update credentials at runtime — every other module
 * already calls this function so no further changes will be needed elsewhere.
 */

export const VIOLET_LIVE_BASE = "https://violetmediapay.com/api/live";
/** Note the upstream typo: the path really is "sanbox", not "sandbox". */
export const VIOLET_SANDBOX_BASE = "https://violetmediapay.com/api/sanbox";

/** IPs that VioletMediaPay uses when posting back to our `/callback`. */
export const VIOLET_WHITELIST_IPS = [
  "202.155.132.37",
  "2001:df7:5300:9::122",
] as const;

export interface VioletConfig {
  apiKey: string;
  secretKey: string;
  baseUrl: string;
  /** No trailing slash. */
  publicBase: string;
  /** How long a created invoice should remain payable, in seconds. */
  expireSeconds: number;
  /** When true, /callback rejects requests not coming from the whitelist. */
  strictIp: boolean;
}

export function getVioletConfig(): VioletConfig {
  return {
    apiKey: process.env.VIOLET_API_KEY ?? "",
    secretKey: process.env.VIOLET_SECRET_KEY ?? "",
    baseUrl: process.env.VIOLET_BASE_URL ?? VIOLET_LIVE_BASE,
    publicBase: (process.env.PUBLIC_BASE_URL ?? "").replace(/\/+$/, ""),
    expireSeconds: Number(process.env.VIOLET_EXPIRE_SECONDS ?? 900),
    strictIp: process.env.VIOLET_STRICT_IP === "true",
  };
}

/** Whether the gateway has enough config to perform real API calls. */
export function isVioletConfigured(): boolean {
  const cfg = getVioletConfig();
  return Boolean(cfg.apiKey && cfg.secretKey);
}
