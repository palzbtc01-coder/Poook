"use client";

import * as React from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { FAQS } from "@/lib/content";
import { cn } from "@/lib/utils";

function FaqRow({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-surface/60 transition-colors",
        open ? "border-primary/40" : "border-border",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-medium">{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-primary transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-muted">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section id="faq" className="section relative">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.4fr] lg:gap-12 lg:px-8">
        {/* Left intro */}
        <div className="flex flex-col items-start gap-5 lg:sticky lg:top-24 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title={
              <>
                Masih Ada{" "}
                <span className="text-gradient">Pertanyaan?</span>
              </>
            }
            description="Hal-hal yang paling sering ditanyakan calon pelanggan kami."
          />
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface/60 p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-secondary">
              <MessageCircleQuestion className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-semibold">Belum terjawab?</p>
              <p className="text-xs text-muted">Tim support kami online 24/7.</p>
            </div>
          </div>
          <Button href="#" variant="outline" size="md">
            Hubungi Support
          </Button>
        </div>

        {/* Right accordion */}
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, index) => (
            <FaqRow
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
