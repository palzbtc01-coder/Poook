import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Brand-coloured logo pill for Indonesian banks / e-wallets. Uses background
 * colour + abbreviated label rather than real logo SVGs (which would each
 * carry trademark constraints). Visually consistent and dependency-free.
 */
const LOGO_CONFIG: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  QRIS:      { bg: "#FFFFFF", text: "#000000", label: "QRIS" },
  DANA:      { bg: "#118EEA", text: "#FFFFFF", label: "DANA" },
  OVO:       { bg: "#4C2A86", text: "#FFFFFF", label: "OVO" },
  ShopeePay: { bg: "#EE4D2D", text: "#FFFFFF", label: "Shopee" },
  LinkAja:   { bg: "#E63A2E", text: "#FFFFFF", label: "LinkAja" },
  BCAVA:     { bg: "#005EAB", text: "#FFFFFF", label: "BCA" },
  MANDIRIVA: { bg: "#003D7C", text: "#FFD602", label: "Mandiri" },
  BNIVA:     { bg: "#F37021", text: "#FFFFFF", label: "BNI" },
  BRIVA:     { bg: "#003B73", text: "#FFFFFF", label: "BRI" },
  PERMATAVA: { bg: "#018D49", text: "#FFFFFF", label: "Permata" },
  CIMBNIAGA: { bg: "#A50034", text: "#FFFFFF", label: "CIMB" },
  DANAMON:   { bg: "#F58220", text: "#FFFFFF", label: "Danamon" },
  ALFAMART:  { bg: "#E40521", text: "#FFFFFF", label: "Alfamart" },
};

interface PaymentLogoProps {
  code: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE: Record<"sm" | "md" | "lg", string> = {
  sm: "h-7 min-w-[52px] text-[10px]",
  md: "h-9 min-w-[64px] text-[11px]",
  lg: "h-12 min-w-[80px] text-xs",
};

export function PaymentLogo({
  code,
  size = "md",
  className,
}: PaymentLogoProps) {
  const cfg = LOGO_CONFIG[code] ?? {
    bg: "#252536",
    text: "#FFFFFF",
    label: code,
  };
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-md px-2 font-bold uppercase tracking-tight",
        SIZE[size],
        className,
      )}
      style={{ backgroundColor: cfg.bg, color: cfg.text }}
    >
      {cfg.label}
    </span>
  );
}
