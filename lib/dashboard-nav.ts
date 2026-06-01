import {
  LayoutDashboard,
  PlusCircle,
  ClipboardList,
  Layers,
  Wallet,
  Receipt,
  Users,
  Code2,
  LifeBuoy,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** When true, marks the item as not yet wired up to a real page. */
  soon?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const DASHBOARD_NAV: NavGroup[] = [
  {
    label: "Utama",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      {
        label: "Buat Order",
        href: "/dashboard/orders/new",
        icon: PlusCircle,
      },
      {
        label: "Riwayat Order",
        href: "/dashboard/orders",
        icon: ClipboardList,
      },
      {
        label: "Katalog Layanan",
        href: "/dashboard/services",
        icon: Layers,
      },
    ],
  },
  {
    label: "Keuangan",
    items: [
      {
        label: "Isi Saldo",
        href: "/dashboard/deposit",
        icon: Wallet,
      },
      {
        label: "Transaksi",
        href: "/dashboard/transactions",
        icon: Receipt,
      },
    ],
  },
  {
    label: "Lainnya",
    items: [
      {
        label: "Referral",
        href: "/dashboard/referral",
        icon: Users,
        soon: true,
      },
      {
        label: "API Docs",
        href: "/dashboard/api-docs",
        icon: Code2,
        soon: true,
      },
      {
        label: "Support",
        href: "/dashboard/support",
        icon: LifeBuoy,
        soon: true,
      },
      {
        label: "Pengaturan",
        href: "/dashboard/settings",
        icon: Settings,
        soon: true,
      },
    ],
  },
];
