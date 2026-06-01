"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  CircleDollarSign,
  Gauge,
  Info,
  Link as LinkIcon,
  Loader2,
  Sparkles,
  Wallet,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CATEGORIES,
  PLATFORMS,
  SERVICES,
  QUALITY_LABEL,
  TAG_LABEL,
  TYPE_LABEL,
  categoriesByPlatform,
  findService,
  servicesByCategory,
  type CatalogService,
} from "@/lib/mock-catalog";
import { MOCK_USER } from "@/lib/mock-dashboard";
import { formatIDR, formatNumber, cn } from "@/lib/utils";

const URL_PLACEHOLDERS: Record<string, string> = {
  Instagram: "https://instagram.com/username  atau  https://instagram.com/p/...",
  TikTok: "https://tiktok.com/@username/video/...",
  YouTube: "https://youtube.com/@channel  atau  https://youtu.be/...",
  Facebook: "https://facebook.com/username  atau  https://fb.com/...",
  "Twitter / X": "https://x.com/username/status/...",
  Telegram: "https://t.me/channel",
};

function calculatePrice(quantity: number, pricePer1000: number): number {
  return Math.round((quantity / 1000) * pricePer1000);
}

function quickPresets(min: number, max: number): number[] {
  const presets = new Set<number>([min]);
  let v = min * 10;
  while (v < max && presets.size < 5) {
    presets.add(v);
    v *= 5;
  }
  presets.add(max);
  return Array.from(presets).sort((a, b) => a - b).slice(0, 6);
}

export function OrderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ─── Cascading selection state ─────────────────────────────────────────
  const preselectedServiceId = Number(searchParams.get("service")) || null;
  const preselectedService = preselectedServiceId
    ? findService(preselectedServiceId)
    : null;
  const preselectedCategory = preselectedService
    ? CATEGORIES.find((c) => c.id === preselectedService.categoryId)
    : null;

  const [platform, setPlatform] = React.useState<string>(
    preselectedCategory?.platform ?? PLATFORMS[0],
  );
  const [categoryId, setCategoryId] = React.useState<number | null>(
    preselectedService?.categoryId ?? null,
  );
  const [serviceId, setServiceId] = React.useState<number | null>(
    preselectedService?.id ?? null,
  );

  const service: CatalogService | null = serviceId
    ? findService(serviceId) ?? null
    : null;

  const [quantity, setQuantity] = React.useState<number>(
    service?.minQuantity ?? 0,
  );
  const [targetUrl, setTargetUrl] = React.useState("");
  const [errors, setErrors] = React.useState<{
    service?: string;
    url?: string;
    quantity?: string;
  }>({});

  // ─── Derived options ───────────────────────────────────────────────────
  const categories = React.useMemo(
    () => categoriesByPlatform(platform),
    [platform],
  );
  const services = React.useMemo(
    () => (categoryId ? servicesByCategory(categoryId) : []),
    [categoryId],
  );

  // Reset downstream selections when upstream changes.
  const handlePlatformChange = (value: string) => {
    setPlatform(value);
    setCategoryId(null);
    setServiceId(null);
    setQuantity(0);
  };
  const handleCategoryChange = (value: string) => {
    const id = value ? Number(value) : null;
    setCategoryId(id);
    setServiceId(null);
    setQuantity(0);
  };
  const handleServiceChange = (value: string) => {
    const id = value ? Number(value) : null;
    setServiceId(id);
    const next = id ? findService(id) : null;
    setQuantity(next?.minQuantity ?? 0);
  };

  // ─── Confirmation modal & submission ───────────────────────────────────
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [createdOrderId, setCreatedOrderId] = React.useState<string | null>(
    null,
  );

  const totalPrice = service ? calculatePrice(quantity, service.pricePer1000) : 0;
  const balanceAfter = MOCK_USER.balance - totalPrice;
  const insufficientBalance = service !== null && balanceAfter < 0;

  const validateAll = (): boolean => {
    const next: typeof errors = {};
    if (!service) {
      next.service = "Pilih layanan terlebih dahulu";
    } else {
      if (!targetUrl) next.url = "URL target wajib diisi";
      else if (!/^https?:\/\/\S+\.\S+/.test(targetUrl))
        next.url = "Format URL tidak valid";
      if (quantity < service.minQuantity)
        next.quantity = `Minimum ${formatNumber(service.minQuantity)}`;
      else if (quantity > service.maxQuantity)
        next.quantity = `Maksimum ${formatNumber(service.maxQuantity)}`;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;
    if (insufficientBalance) return;
    setConfirmOpen(true);
  };

  const onSubmit = () => {
    setSubmitting(true);
    // TODO: integrate with POST /orders in Fase 1f
    setTimeout(() => {
      const id = `ORD-${Math.floor(Math.random() * 9000000 + 1000000)}`;
      setCreatedOrderId(id);
      setSubmitting(false);
      setConfirmOpen(false);
    }, 900);
  };

  // ─── Success state ─────────────────────────────────────────────────────
  if (createdOrderId) {
    return (
      <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-5 rounded-3xl border border-success/30 bg-surface/70 p-8 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-success/15 text-success">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Order Berhasil Dibuat!
          </h2>
          <p className="mt-1 text-sm text-muted">
            Order kamu sudah masuk antrian dan akan segera diproses.
          </p>
        </div>
        <div className="w-full rounded-2xl border border-border bg-background/40 p-4 text-left">
          <p className="text-xs text-muted">ID Order</p>
          <p className="font-mono text-base font-bold">{createdOrderId}</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:flex-row">
          <Button
            href={`/dashboard/orders/${createdOrderId}`}
            variant="primary"
            size="md"
            className="flex-1"
          >
            Lihat Detail Order <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            href="/dashboard/services"
            variant="outline"
            size="md"
            className="flex-1"
          >
            Pesan Lagi
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onConfirm} className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      {/* ─── LEFT: Form ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-5">
        {/* Step 1: pilih layanan */}
        <FormSection step={1} title="Pilih Layanan">
          <div className="grid gap-3 sm:grid-cols-3">
            <Select
              label="Platform"
              value={platform}
              onChange={(e) => handlePlatformChange(e.target.value)}
            >
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
            <Select
              label="Kategori"
              value={categoryId ?? ""}
              onChange={(e) => handleCategoryChange(e.target.value)}
              disabled={categories.length === 0}
            >
              <option value="">Pilih kategori…</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
            <Select
              label="Layanan"
              value={serviceId ?? ""}
              onChange={(e) => handleServiceChange(e.target.value)}
              disabled={!categoryId || services.length === 0}
              error={errors.service}
            >
              <option value="">Pilih layanan…</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — {formatIDR(s.pricePer1000)}/1K
                </option>
              ))}
            </Select>
          </div>
        </FormSection>

        {/* Step 2: detail layanan */}
        {service ? (
          <ServiceDetail service={service} />
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-surface/40 p-8 text-center text-sm text-muted">
            Pilih layanan untuk melihat detailnya.
          </div>
        )}

        {/* Step 3: target & quantity */}
        <FormSection step={2} title="Target & Kuantitas" disabled={!service}>
          <Input
            label="URL Target"
            placeholder={URL_PLACEHOLDERS[platform] ?? "https://…"}
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            leftIcon={<LinkIcon />}
            error={errors.url}
            hint={
              !errors.url
                ? "Pastikan akun/konten public dan URL sudah benar."
                : undefined
            }
            disabled={!service}
            inputMode="url"
          />

          {service ? (
            <div className="mt-4 space-y-3">
              <Input
                label={`Kuantitas (min ${formatNumber(service.minQuantity)} — max ${formatNumber(service.maxQuantity)})`}
                type="number"
                value={quantity || ""}
                onChange={(e) => setQuantity(Number(e.target.value) || 0)}
                error={errors.quantity}
                min={service.minQuantity}
                max={service.maxQuantity}
              />
              <div className="flex flex-wrap gap-2">
                {quickPresets(service.minQuantity, service.maxQuantity).map(
                  (preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setQuantity(preset)}
                      className={cn(
                        "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
                        quantity === preset
                          ? "border-primary/40 bg-primary/15 text-foreground"
                          : "border-border bg-background/40 text-muted hover:text-foreground",
                      )}
                    >
                      {formatNumber(preset)}
                    </button>
                  ),
                )}
              </div>
            </div>
          ) : null}
        </FormSection>
      </div>

      {/* ─── RIGHT: Summary (sticky on desktop) ─────────────────── */}
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-2xl border border-border bg-surface/70 p-5">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-display text-base font-bold tracking-tight">
              Ringkasan Order
            </h3>
            <Wallet className="h-4 w-4 text-secondary" />
          </div>

          {/* Balance card */}
          <div className="my-4 rounded-xl bg-gradient-brand p-4 text-white shadow-glow">
            <p className="text-xs opacity-80">Saldo aktif</p>
            <p className="font-display text-xl font-bold">
              {formatIDR(MOCK_USER.balance)}
            </p>
          </div>

          <dl className="space-y-3 text-sm">
            <SummaryRow
              label="Layanan"
              value={service ? service.name : "—"}
              clamp
            />
            <SummaryRow
              label="Kuantitas"
              value={service ? formatNumber(quantity) : "—"}
              mono
            />
            <SummaryRow
              label="Harga / 1.000"
              value={service ? formatIDR(service.pricePer1000) : "—"}
              mono
            />
            <hr className="border-border" />
            <SummaryRow
              label="Total"
              value={service ? formatIDR(totalPrice) : "—"}
              mono
              emphasis
            />
            <SummaryRow
              label="Saldo setelah"
              value={service ? formatIDR(balanceAfter) : "—"}
              mono
              tone={insufficientBalance ? "danger" : "default"}
            />
          </dl>

          {insufficientBalance ? (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/10 p-3 text-xs text-danger">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                Saldo kamu kurang{" "}
                <span className="font-semibold">
                  {formatIDR(Math.abs(balanceAfter))}
                </span>
                .{" "}
                <Link
                  href="/dashboard/deposit"
                  className="font-semibold underline"
                >
                  Isi saldo dulu →
                </Link>
              </div>
            </div>
          ) : null}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="mt-4 w-full"
            disabled={!service || insufficientBalance}
          >
            <Sparkles className="h-4 w-4" />
            Pesan Sekarang
          </Button>

          <p className="mt-3 text-center text-[11px] text-muted">
            Saldo akan otomatis dipotong setelah konfirmasi.
          </p>
        </div>
      </aside>

      {/* ─── Confirmation modal ──────────────────────────────── */}
      {confirmOpen && service ? (
        <ConfirmModal
          service={service}
          quantity={quantity}
          targetUrl={targetUrl}
          totalPrice={totalPrice}
          balanceAfter={balanceAfter}
          submitting={submitting}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={onSubmit}
        />
      ) : null}
    </form>
  );
}

/* ─────────────────────────── Sub-components ─────────────────────────── */

function FormSection({
  step,
  title,
  disabled,
  children,
}: {
  step: number;
  title: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-surface/70 p-5 transition-opacity",
        disabled && "opacity-60",
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-brand font-display text-xs font-bold text-white">
          {step}
        </span>
        <h2 className="font-display text-base font-bold tracking-tight">
          {title}
        </h2>
      </div>
      <div className={cn(disabled && "pointer-events-none")}>{children}</div>
    </section>
  );
}

function ServiceDetail({ service }: { service: CatalogService }) {
  return (
    <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-surface/30 p-5">
      <div className="flex flex-wrap gap-1.5">
        {service.tags.map((tag) => (
          <Badge key={tag} variant="primary">
            {TAG_LABEL[tag]}
          </Badge>
        ))}
      </div>
      <h3 className="mt-3 font-display text-lg font-bold leading-snug tracking-tight">
        {service.name}
      </h3>
      <p className="mt-1 text-sm text-muted">{service.description}</p>

      <dl className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
        <DetailStat
          icon={<Gauge className="h-3.5 w-3.5" />}
          label="Kecepatan"
          value={service.estimatedSpeed}
        />
        <DetailStat
          icon={<Sparkles className="h-3.5 w-3.5" />}
          label="Kualitas"
          value={QUALITY_LABEL[service.quality]}
        />
        <DetailStat
          label="Tipe"
          value={TYPE_LABEL[service.type]}
        />
        <DetailStat
          icon={<CircleDollarSign className="h-3.5 w-3.5" />}
          label="Estimasi waktu"
          value={service.estimatedTime}
        />
      </dl>

      {service.note ? (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-warning/30 bg-warning/10 p-3 text-xs text-warning">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{service.note}</p>
        </div>
      ) : null}
    </div>
  );
}

function DetailStat({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-background/40 px-3 py-2">
      <dt className="inline-flex items-center gap-1 text-muted">
        {icon}
        {label}
      </dt>
      <dd className="mt-0.5 font-medium text-foreground">{value}</dd>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  mono,
  clamp,
  emphasis,
  tone = "default",
}: {
  label: string;
  value: string;
  mono?: boolean;
  clamp?: boolean;
  emphasis?: boolean;
  tone?: "default" | "danger";
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="shrink-0 text-muted">{label}</dt>
      <dd
        className={cn(
          "text-right",
          mono && "tabular-nums",
          clamp && "line-clamp-2 text-xs leading-snug",
          emphasis && "font-display text-lg font-bold text-gradient",
          tone === "danger" && !emphasis && "text-danger font-semibold",
          !emphasis && !clamp && "font-semibold",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function ConfirmModal({
  service,
  quantity,
  targetUrl,
  totalPrice,
  balanceAfter,
  submitting,
  onCancel,
  onConfirm,
}: {
  service: CatalogService;
  quantity: number;
  targetUrl: string;
  totalPrice: number;
  balanceAfter: number;
  submitting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-card">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-bold tracking-tight">
              Konfirmasi Order
            </h3>
            <p className="text-xs text-muted">
              Pastikan detail di bawah sudah benar.
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="rounded-lg p-1 text-muted hover:bg-background hover:text-foreground"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <dl className="space-y-3 rounded-2xl border border-border bg-background/40 p-4 text-sm">
          <ModalRow label="Layanan" value={service.name} />
          <ModalRow label="URL Target" value={targetUrl} mono />
          <ModalRow label="Kuantitas" value={formatNumber(quantity)} mono />
          <hr className="border-border" />
          <ModalRow label="Total dipotong" value={formatIDR(totalPrice)} bold />
          <ModalRow
            label="Saldo setelah"
            value={formatIDR(balanceAfter)}
            mono
          />
        </dl>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row-reverse">
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={onConfirm}
            disabled={submitting}
            className="flex-1"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Memproses…
              </>
            ) : (
              <>
                <Check className="h-4 w-4" /> Ya, Pesan Sekarang
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onCancel}
            disabled={submitting}
            className="flex-1"
          >
            Batal
          </Button>
        </div>
      </div>
    </div>
  );
}

function ModalRow({
  label,
  value,
  mono,
  bold,
}: {
  label: string;
  value: string;
  mono?: boolean;
  bold?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="shrink-0 text-muted">{label}</dt>
      <dd
        className={cn(
          "text-right",
          mono && "break-all font-mono text-xs",
          bold && "font-display text-base font-bold text-gradient",
          !bold && !mono && "font-semibold",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
