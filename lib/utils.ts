import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes safely, resolving conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as Indonesian Rupiah (no decimals).
 */
export function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a plain number with id-ID thousands separators.
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value);
}
