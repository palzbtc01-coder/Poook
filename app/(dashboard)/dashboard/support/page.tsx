import {
  BookOpen,
  CheckCircle2,
  Clock,
  MessageCircleQuestion,
  Plus,
  Send,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import Link from "next/link";
import { PageHeader } from "@/components/dashboard/page-header";
import { TicketList } from "@/components/dashboard/ticket-list";
import { Button } from "@/components/ui/button";
import { MOCK_TICKETS } from "@/lib/mock-tickets";
import { SITE } from "@/lib/content";

export const metadata = {
  title: "Support",
};

export default function SupportPage() {
  const counts = MOCK_TICKETS.reduce(
    (acc, t) => {
      if (t.status === "open" || t.status === "pending") acc.active++;
      else acc.resolved++;
      return acc;
    },
    { active: 0, resolved: 0 },
  );

  const QUICK_CONTACTS = [
    {
      label: "WhatsApp",
      description: "Respon < 5 menit di jam kerja",
      href: `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}`,
      icon: SiWhatsapp,
      color: "#25D366",
    },
    {
      label: "Telegram",
      description: "Channel komunitas & info",
      href: `https://t.me/${SITE.telegram.replace("@", "")}`,
      icon: Send,
      color: "#26A5E4",
    },
    {
      label: "Knowledge Base",
      description: "Panduan & FAQ lengkap",
      href: "#",
      icon: BookOpen,
      color: "#FFD600",
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Support" },
        ]}
        title="Pusat Bantuan"
        description="Hubungi tim kami atau cek dokumentasi & FAQ."
        actions={
          <Button href="/dashboard/support/new" variant="primary" size="md">
            <Plus className="h-4 w-4" /> Tiket Baru
          </Button>
        }
      />

      {/* Quick contacts */}
      <div className="grid gap-4 sm:grid-cols-3">
        {QUICK_CONTACTS.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-3 rounded-2xl border border-border bg-surface/70 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background/40"
                style={{ color: c.color }}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{c.label}</p>
                <p className="truncate text-xs text-muted">{c.description}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={<MessageCircleQuestion className="h-5 w-5" />}
          accent="primary"
          label="Total Tiket"
          value={String(MOCK_TICKETS.length)}
        />
        <StatCard
          icon={<Clock className="h-5 w-5" />}
          accent="warning"
          label="Aktif (open + pending)"
          value={String(counts.active)}
        />
        <StatCard
          icon={<CheckCircle2 className="h-5 w-5" />}
          accent="success"
          label="Selesai"
          value={String(counts.resolved)}
        />
      </div>

      <TicketList tickets={MOCK_TICKETS} />
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: "primary" | "warning" | "success";
}) {
  const accentClass = {
    primary: "bg-primary/15 text-primary-200",
    warning: "bg-warning/15 text-warning",
    success: "bg-success/15 text-success",
  }[accent];
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface/70 p-5">
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${accentClass}`}
      >
        {icon}
      </span>
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className="font-display text-xl font-bold tracking-tight">{value}</p>
      </div>
    </div>
  );
}
