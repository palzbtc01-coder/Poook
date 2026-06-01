import { AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { ProfileSection } from "@/components/dashboard/profile-section";
import { SecuritySection } from "@/components/dashboard/security-section";
import { NotificationsSection } from "@/components/dashboard/notifications-section";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Pengaturan",
};

export default function SettingsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Pengaturan" },
        ]}
        title="Pengaturan Akun"
        description="Kelola profil, keamanan, dan preferensi notifikasi kamu."
      />

      {/* Quick anchor nav */}
      <nav
        aria-label="Bagian pengaturan"
        className="flex flex-wrap gap-2 rounded-2xl border border-border bg-surface/40 p-2"
      >
        {[
          { label: "Profil", href: "#profil" },
          { label: "Keamanan", href: "#keamanan" },
          { label: "Notifikasi", href: "#notifikasi" },
          { label: "Bahaya Zone", href: "#bahaya" },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-xl px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-foreground"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <ProfileSection />
      <SecuritySection />
      <NotificationsSection />

      {/* Danger zone */}
      <section
        id="bahaya"
        className="rounded-2xl border border-danger/30 bg-danger/5 p-6"
      >
        <header className="mb-4 flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-danger/15 text-danger">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-lg font-bold tracking-tight text-danger">
              Bahaya Zone
            </h2>
            <p className="text-sm text-muted">
              Aksi ini permanen — pikirkan baik-baik sebelum melanjutkan.
            </p>
          </div>
        </header>
        <div className="flex flex-col gap-3 rounded-xl border border-danger/20 bg-background/40 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">Hapus Akun</p>
            <p className="mt-0.5 text-sm text-muted">
              Sisa saldo akan dikembalikan ke rekening yang terverifikasi.
              Order aktif tetap diselesaikan, tapi akun tidak bisa dipulihkan.
            </p>
          </div>
          <Button
            variant="outline"
            size="md"
            className="border-danger/40 text-danger hover:border-danger hover:bg-danger/10"
          >
            Hapus Akun Permanen
          </Button>
        </div>
      </section>
    </div>
  );
}
