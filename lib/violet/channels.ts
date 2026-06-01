import type { ChannelType, PaymentChannelDef } from "./types";

/**
 * Default channel catalog — mirrors the Python integration's DEFAULT_CHANNELS
 * but with structured fee data so the UI can compute totals deterministically.
 *
 * NOTE: Violet's `/fee-calculator` endpoint is authoritative for the exact fee
 * at order time. The values here are the publicly-documented estimates and are
 * used only for the on-screen preview before the user confirms.
 */
export const VIOLET_CHANNELS: PaymentChannelDef[] = [
  { code: "QRIS",      name: "QRIS (semua e-wallet)",     type: "qris",    fee: { type: "percent", amount: 0.7  } },
  { code: "DANA",      name: "DANA",                       type: "ewallet", fee: { type: "percent", amount: 1.67 } },
  { code: "OVO",       name: "OVO",                        type: "ewallet", fee: { type: "percent", amount: 3.03 } },
  { code: "ShopeePay", name: "ShopeePay",                  type: "ewallet", fee: { type: "percent", amount: 4.0  } },
  { code: "LinkAja",   name: "LinkAja",                    type: "ewallet", fee: { type: "percent", amount: 1.67 } },
  { code: "BCAVA",     name: "BCA Virtual Account",        type: "va",      fee: { type: "flat",    amount: 4500 } },
  { code: "MANDIRIVA", name: "Mandiri Virtual Account",    type: "va",      fee: { type: "flat",    amount: 3000 } },
  { code: "BNIVA",     name: "BNI Virtual Account",        type: "va",      fee: { type: "flat",    amount: 3500 } },
  { code: "BRIVA",     name: "BRI Virtual Account",        type: "va",      fee: { type: "flat",    amount: 3000 } },
  { code: "PERMATAVA", name: "Permata Virtual Account",    type: "va",      fee: { type: "flat",    amount: 2500 } },
  { code: "CIMBNIAGA", name: "CIMB Niaga VA",              type: "va",      fee: { type: "flat",    amount: 3500 } },
  { code: "DANAMON",   name: "Danamon VA",                 type: "va",      fee: { type: "flat",    amount: 2500 } },
  { code: "ALFAMART",  name: "Alfamart (counter)",         type: "counter", fee: { type: "flat",    amount: 3500 } },
];

export const CHANNEL_TYPE_LABEL: Record<ChannelType, string> = {
  qris: "QRIS",
  ewallet: "E-Wallet",
  va: "Virtual Account",
  counter: "Gerai Toko",
};

export function findChannel(code: string): PaymentChannelDef | undefined {
  return VIOLET_CHANNELS.find((c) => c.code === code);
}

/** Compute the gateway fee in Rupiah for a given amount. */
export function calculateChannelFee(
  channel: PaymentChannelDef,
  amount: number,
): number {
  if (channel.fee.type === "flat") return channel.fee.amount;
  // Percent → Rupiah, rounded to nearest Rupiah.
  return Math.round((amount * channel.fee.amount) / 100);
}
