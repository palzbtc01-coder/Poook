import Link from "next/link";
import { Zap } from "lucide-react";
import { SITE } from "@/lib/content";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-10">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-30" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-72 w-72 rounded-full bg-secondary/15 blur-[100px]" />

      {/* Brand */}
      <Link
        href="/"
        className="relative mb-8 inline-flex items-center gap-2"
        aria-label={SITE.name}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand shadow-glow">
          <Zap className="h-5 w-5 text-white" fill="white" />
        </span>
        <span className="font-display text-xl font-bold tracking-tight">
          Suntik<span className="text-gradient">Social</span>
        </span>
      </Link>

      <div className="relative flex w-full justify-center">{children}</div>
    </div>
  );
}
