import { ArrowDownToLine, MousePointerClick, Users, Wallet } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { ReferralBanner } from "@/components/dashboard/referral-banner";
import { RefereeList } from "@/components/dashboard/referee-list";
import { CommissionHistory } from "@/components/dashboard/commission-history";
import { Button } from "@/components/ui/button";
import {
  REFERRAL_STATS,
  REFEREES,
  COMMISSION_HISTORY,
  buildReferralLink,
} from "@/lib/mock-referral";
import { MOCK_USER } from "@/lib/mock-dashboard";
import { formatIDR, formatNumber } from "@/lib/utils";

export const metadata = {
  title: "Referral",
};

const HOW_IT_WORKS = [
  {
    title: "Bagikan Link",
    description:
      "Salin link referral kamu, share ke teman lewat WhatsApp, Telegram, sosmed, atau di mana saja.",
  },
  {
    title: "Mereka Mendaftar",
    description:
      "Saat teman mendaftar lewat link kamu, mereka otomatis terhubung sebagai referee.",
  },
  {
    title: "Komisi Otomatis",
    description: `Setiap kali mereka order, kamu dapat komisi ${REFERRAL_STATS.commissionRate}% otomatis masuk ke saldo. Selamanya.`,
  },
];

export default function ReferralPage() {
  const referralLink = buildReferralLink(MOCK_USER.referralCode);
  const sortedReferees = [...REFEREES].sort(
    (a, b) => b.totalOrders - a.totalOrders,
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Referral" },
        ]}
        title="Program Referral"
        description={`Komisi ${REFERRAL_STATS.commissionRate}% seumur hidup dari setiap order teman yang kamu undang.`}
      />

      <ReferralBanner
        referralLink={referralLink}
        commissionRate={REFERRAL_STATS.commissionRate}
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<MousePointerClick className="h-5 w-5" />}
          accent="primary"
          label="Total Klik"
          value={formatNumber(REFERRAL_STATS.totalClicks)}
        />
        <StatCard
          icon={<Users className="h-5 w-5" />}
          accent="secondary"
          label="Teman Terdaftar"
          value={formatNumber(REFERRAL_STATS.totalRegistered)}
        />
        <StatCard
          icon={<Wallet className="h-5 w-5" />}
          accent="success"
          label="Total Komisi Earned"
          value={formatIDR(REFERRAL_STATS.totalCommissionEarned)}
        />
        <StatCard
          icon={<ArrowDownToLine className="h-5 w-5" />}
          accent="accent"
          label="Komisi Tertunda"
          value={formatIDR(REFERRAL_STATS.pendingCommission)}
          actionLabel="Withdraw"
        />
      </div>

      {/* How it works */}
      <section className="rounded-2xl border border-border bg-surface/40 p-6">
        <h2 className="font-display text-lg font-bold tracking-tight">
          Cara Kerja
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {HOW_IT_WORKS.map((step, i) => (
            <div
              key={step.title}
              className="flex gap-4 rounded-xl border border-border bg-surface/70 p-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-brand font-display text-sm font-bold text-white">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold">{step.title}</p>
                <p className="mt-1 text-sm text-muted">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <RefereeList referees={sortedReferees} />
      <CommissionHistory entries={COMMISSION_HISTORY} />
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  accent,
  actionLabel,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: "primary" | "secondary" | "success" | "accent";
  actionLabel?: string;
}) {
  const accentClass = {
    primary: "bg-primary/15 text-primary-200",
    secondary: "bg-secondary/15 text-secondary",
    success: "bg-success/15 text-success",
    accent: "bg-accent/15 text-accent",
  }[accent];
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface/70 p-5">
      <div className="flex items-start justify-between">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${accentClass}`}
        >
          {icon}
        </span>
      </div>
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className="mt-1 truncate font-display text-xl font-bold tracking-tight">
          {value}
        </p>
      </div>
      {actionLabel ? (
        <Button variant="outline" size="sm" className="w-full">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
