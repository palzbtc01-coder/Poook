import { Zap, Mail, MessageCircle, Send } from "lucide-react";
import {
  SiInstagram,
  SiTiktok,
  SiYoutube,
  SiX,
  SiTelegram,
} from "react-icons/si";
import { FOOTER_LINKS, SITE } from "@/lib/content";

const SOCIALS = [
  { name: "Instagram", icon: SiInstagram, href: "#" },
  { name: "TikTok", icon: SiTiktok, href: "#" },
  { name: "YouTube", icon: SiYoutube, href: "#" },
  { name: "Twitter / X", icon: SiX, href: "#" },
  { name: "Telegram", icon: SiTelegram, href: "#" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-secondary"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand + contact */}
          <div className="flex flex-col gap-5">
            <a href="#hero" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand shadow-glow">
                <Zap className="h-5 w-5 text-white" fill="white" />
              </span>
              <span className="font-display text-lg font-bold tracking-tight">
                Suntik<span className="text-gradient">Social</span>
              </span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Panel SMM terpercaya untuk suntik followers, likes, dan views
              real di 10+ platform sosial media. Proses otomatis 24/7.
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted">
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4 text-secondary" />
                {SITE.email}
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <MessageCircle className="h-4 w-4 text-success" />
                {SITE.whatsapp}
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Send className="h-4 w-4 text-secondary" />
                {SITE.telegram}
              </a>
            </div>
          </div>

          {/* Link columns */}
          <FooterColumn title="Produk" links={FOOTER_LINKS.produk} />
          <FooterColumn title="Perusahaan" links={FOOTER_LINKS.perusahaan} />
          <FooterColumn title="Legal" links={FOOTER_LINKS.legal} />
        </div>

        {/* Disclaimer */}
        <p className="mt-10 rounded-2xl border border-border bg-background/40 p-4 text-xs leading-relaxed text-muted">
          <span className="font-semibold text-foreground/80">Disclaimer:</span>{" "}
          SuntikSocial menyediakan layanan untuk keperluan marketing dan tidak
          berafiliasi dengan platform sosial media mana pun. Kami tidak menjamin
          hasil dari kebijakan pihak ketiga.
        </p>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} {SITE.name}. Seluruh hak cipta
            dilindungi.
          </p>
          <div className="flex items-center gap-2">
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-secondary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
