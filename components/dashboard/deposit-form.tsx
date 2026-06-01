"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  Gift,
  Info,
  Loader2,
  Sparkles,
  Wallet,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PaymentChannelCard } from "./payment-channel-card";
import {
  VIOLET_CHANNELS,
  CHANNEL_TYPE_LABEL,
  calculateChannelFee,
  findChannel,
} from "@/lib/violet/channels";
import type { ChannelType } from "@/lib/violet/types";
import { formatIDR, cn } from "@/lib/utils";

interface DepositFormProps {
  /**
   * Whether the gateway has live credentials. When false, the form still works
   * — submissions hit our /api/violet/create which transparently falls back to
   * an in-memory simulation that auto-confirms after 30 seconds.
   */
  isConfigured: boolean;
}

const NOMINAL_PRESETS = [50_000, 100_000, 200_000, 500_000, 1_000_000, 2_000_000];
const MIN_AMOUNT = 10_000;
const MAX_AMOUNT = 10_000_000;

const TAB_ORDER: ChannelType[] = ["qris", "ewallet", "va", "counter"];

/** Bonus rules — must mirror the API route to avoid mismatched UI vs backend. */
function calculateBonus(amount: number): number {
  if (amount >= 1_000_000) return Math.min(100_000, Math.round(amount * 0.05));
  if (amount >= 500_000) return Math.round(amount * 0.05);
  if (amount >= 100_000) return Math.round(amount * 0.03);
  return 0;
}

export function DepositForm({ isConfigured }: DepositFormProps) {
  const router = useRouter();

  // ─── State ────────────────────────────────────────────────────────
  const [amount, setAmount] = React.useState<number>(100_000);
  const [voucherCode, setVoucherCode] = React.useState("");
  const [showVoucher, setShowVoucher] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<ChannelType>("qris");
  const [channelCode, setChannelCode] = React.useState<string>("QRIS");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string>();

  const channel = findChannel(channelCode);
  const tabsWithChannels = React.useMemo(() => {
    const result: Record<ChannelType, typeof VIOLET_CHANNELS> = {
      qris: [],
      ewallet: [],
      va: [],
      counter: [],
    };
    for (const c of VIOLET_CHANNELS) result[c.type].push(c);
    return result;
  }, []);

  // ─── Derived values ────────────────────────────────────────────────
  const fee = channel && amount > 0 ? calculateChannelFee(channel, amount) : 0;
  const bonus = calculateBonus(amount);
  const totalToPay = amount + fee;
  const netCredit = amount + bonus;

  const validAmount = amount >= MIN_AMOUNT && amount <= MAX_AMOUNT;
  const canSubmit = validAmount && !!channel && !submitting;

  // ─── Submit ────────────────────────────────────────────────────────
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError(undefined);
    setSubmitting(true);

    try {
      const res = await fetch("/api/violet/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          channel: channelCode,
          voucherCode: voucherCode.trim() || undefined,
        }),
      });
      const data = (await res.json()) as { ref?: string; error?: string };
      if (!res.ok || !data.ref) {
        setError(data.error ?? "Gagal memulai pembayaran");
        setSubmitting(false);
        return;
      }
      router.push(`/dashboard/deposit/${data.ref}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      {/* ─── LEFT: form steps ─────────────────────────────────────── */}
      <div className="flex flex-col gap-5">
        {!isConfigured ? (
          <div className="flex items-start gap-3 rounded-2xl border border-warning/30 bg-warning/10 p-4 text-sm text-warning">
            <Info className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">Mode Demo</p>
              <p className="mt-0.5 text-warning/80">
                Credentials VioletMediaPay belum diset. Form ini tetap berjalan
                dengan invoice simulasi yang otomatis sukses setelah 30 detik.
                Tetapkan{" "}
                <code className="rounded bg-warning/20 px-1 font-mono text-[11px]">
                  VIOLET_API_KEY
                </code>{" "}
                &amp;{" "}
                <code className="rounded bg-warning/20 px-1 font-mono text-[11px]">
                  VIOLET_SECRET_KEY
                </code>{" "}
                di env (atau nanti via panel admin) untuk live mode.
              </p>
            </div>
          </div>
        ) : null}

        {/* Step 1 — Pilih Nominal */}
        <FormSection step={1} title="Pilih Nominal Deposit">
          <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {NOMINAL_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setAmount(preset)}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors",
                  amount === preset
                    ? "border-primary bg-primary/15 text-foreground shadow-glow"
                    : "border-border bg-background/40 text-muted hover:border-primary/40 hover:text-foreground",
                )}
              >
                {formatIDR(preset)}
              </button>
            ))}
          </div>
          <Input
            type="number"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            min={MIN_AMOUNT}
            max={MAX_AMOUNT}
            placeholder="Atau ketik nominal sendiri"
            leftIcon={<Wallet />}
            error={
              !validAmount && amount > 0
                ? `Nominal harus antara ${formatIDR(MIN_AMOUNT)} – ${formatIDR(MAX_AMOUNT)}`
                : undefined
            }
            hint={
              validAmount && bonus > 0
                ? `🎉 Kamu dapat bonus ${formatIDR(bonus)} (${Math.round((bonus / amount) * 100)}%)!`
                : `Minimum ${formatIDR(MIN_AMOUNT)} · Maksimum ${formatIDR(MAX_AMOUNT)}`
            }
          />
        </FormSection>

        {/* Step 2 — Voucher (collapsible) */}
        <FormSection step={2} title="Kode Voucher (opsional)">
          {showVoucher ? (
            <div className="flex gap-2">
              <Input
                placeholder="Masukkan kode voucher"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                leftIcon={<Gift />}
                containerClassName="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => {
                  setVoucherCode("");
                  setShowVoucher(false);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowVoucher(true)}
              className="text-sm font-medium text-secondary hover:underline"
            >
              + Punya kode voucher?
            </button>
          )}
        </FormSection>

        {/* Step 3 — Pilih metode pembayaran */}
        <FormSection step={3} title="Pilih Metode Pembayaran">
          <div className="-mx-1 mb-4 overflow-x-auto pb-1">
            <div className="flex min-w-max gap-2 px-1">
              {TAB_ORDER.map((tab) => {
                const count = tabsWithChannels[tab].length;
                if (count === 0) return null;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    aria-pressed={activeTab === tab}
                    className={cn(
                      "rounded-xl border px-4 py-2 text-sm font-semibold transition-colors",
                      activeTab === tab
                        ? "border-transparent bg-gradient-brand text-white shadow-glow"
                        : "border-border bg-surface/60 text-muted hover:text-foreground",
                    )}
                  >
                    {CHANNEL_TYPE_LABEL[tab]}
                  </button>
                );
              })}
            </div>
          </div>
          <div role="radiogroup" className="grid gap-2 sm:grid-cols-2">
            {tabsWithChannels[activeTab].map((c) => (
              <PaymentChannelCard
                key={c.code}
                channel={c}
                amount={amount}
                selected={channelCode === c.code}
                onSelect={() => setChannelCode(c.code)}
              />
            ))}
          </div>
        </FormSection>
      </div>

      {/* ─── RIGHT: summary (sticky on desktop) ────────────────────── */}
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-2xl border border-border bg-surface/70 p-5">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-display text-base font-bold tracking-tight">
              Ringkasan
            </h3>
            <Sparkles className="h-4 w-4 text-secondary" />
          </div>

          <dl className="my-4 space-y-3 text-sm">
            <Row label="Nominal" value={formatIDR(amount)} />
            {bonus > 0 ? (
              <Row
                label={
                  <span className="inline-flex items-center gap-1">
                    Bonus <Badge variant="accent">+{formatIDR(bonus)}</Badge>
                  </span>
                }
                value={`+${formatIDR(bonus)}`}
                tone="success"
              />
            ) : null}
            <Row
              label={
                <span className="inline-flex items-center gap-1">
                  Fee {channel ? `(${channel.name})` : ""}
                </span>
              }
              value={`+${formatIDR(fee)}`}
            />
            <hr className="border-border" />
            <Row
              label="Total dibayar"
              value={formatIDR(totalToPay)}
              emphasis
            />
            <Row
              label="Saldo masuk"
              value={formatIDR(netCredit)}
              tone="success"
            />
          </dl>

          {error ? (
            <div className="mb-3 flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/10 p-3 text-xs text-danger">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          ) : null}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={!canSubmit}
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Memproses...
              </>
            ) : (
              <>
                Lanjutkan Pembayaran <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>

          <p className="mt-3 text-center text-[11px] text-muted">
            Pembayaran diproses oleh{" "}
            <span className="font-semibold">VioletMediaPay</span>. Aman &amp;
            terenkripsi.
          </p>
        </div>
      </aside>
    </form>
  );
}

/* ─────────────────────────── helpers ─────────────────────────── */

function FormSection({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-surface/70 p-5">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-brand font-display text-xs font-bold text-white">
          {step}
        </span>
        <h2 className="font-display text-base font-bold tracking-tight">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Row({
  label,
  value,
  tone = "default",
  emphasis,
}: {
  label: React.ReactNode;
  value: string;
  tone?: "default" | "success" | "danger";
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted">{label}</dt>
      <dd
        className={cn(
          "tabular-nums",
          emphasis && "font-display text-lg font-bold text-gradient",
          !emphasis && tone === "success" && "font-semibold text-success",
          !emphasis && tone === "danger" && "font-semibold text-danger",
          !emphasis && tone === "default" && "font-semibold",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
