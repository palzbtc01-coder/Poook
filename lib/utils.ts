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



/**
 * Format a date as a relative-time string in Indonesian (e.g., "5 menit lalu",
 * "3 jam lalu", "Kemarin", "12 hari lalu"). Accepts ISO strings or Date.
 *
 * The reference "now" defaults to the current time but can be overridden for
 * deterministic rendering of mock data.
 */
export function formatRelative(
  date: string | Date,
  now: Date = new Date(),
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.round(diffMs / 60_000);

  if (diffMin < 1) return "baru saja";
  if (diffMin < 60) return `${diffMin} menit lalu`;

  const diffHours = Math.round(diffMin / 60);
  if (diffHours < 24) return `${diffHours} jam lalu`;

  const diffDays = Math.round(diffHours / 24);
  if (diffDays === 1) return "Kemarin";
  if (diffDays < 30) return `${diffDays} hari lalu`;

  const diffMonths = Math.round(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths} bulan lalu`;
  return `${Math.round(diffMonths / 12)} tahun lalu`;
}

/**
 * Format an ISO date string as a localized Indonesian date+time
 * (e.g., "01 Jun 2026, 17:30").
 */
export function formatDateTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}
