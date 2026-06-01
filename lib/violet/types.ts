/**
 * Type definitions for the VioletMediaPay payment gateway integration.
 * Reference: https://violetmediapay.com/dokumentasi/
 */

export type ChannelType = "qris" | "ewallet" | "va" | "counter";
export type FeeType = "flat" | "percent";

export interface PaymentChannelDef {
  /** Channel code expected by Violet's `channel_payment` parameter. */
  code: string;
  /** Human-readable label shown to users. */
  name: string;
  /** Group used for tabs / icons in the UI. */
  type: ChannelType;
  /** Estimated fee — Violet's /fee-calculator is authoritative. */
  fee: {
    type: FeeType;
    /** Either Rupiah (flat) or percent (e.g., 0.7 = 0.7%). */
    amount: number;
  };
}

/** Payload accepted by `createVioletTransaction` (camelCase API). */
export interface CreateTransactionPayload {
  channel: string;
  refKode: string;
  amount: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  productName?: string;
}

/**
 * Violet's responses use snake_case and shape-shift slightly per channel.
 * We capture the fields we actually consume; everything else flows through
 * via the index signature.
 */
export interface VioletTransactionData {
  ref_kode?: string;
  ref_id?: string;
  channel_payment?: string;
  amount?: number | string;
  fee?: number | string;
  total?: number | string;
  expired_time?: number | string;
  status?: string;
  /** Hosted payment URL (cards, e-wallet redirect, etc.). */
  pay_url?: string;
  /** Raw QR string (TLV format) when channel = QRIS. */
  qr_string?: string;
  /** Or a pre-rendered QR image URL. */
  qr_url?: string;
  /** Virtual-account number for VA channels. */
  va_number?: string;
  va_bank?: string;
  [key: string]: unknown;
}

export interface VioletSuccessResponse {
  status: true;
  message?: string;
  data: VioletTransactionData;
}

export interface VioletErrorResponse {
  status: false;
  message?: string;
  error?: string;
  raw?: string;
}

export type VioletResult = VioletSuccessResponse | VioletErrorResponse;
