"use client";

import * as React from "react";
import { Paperclip, Send } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  type SupportTicket,
  type TicketMessage,
} from "@/lib/mock-tickets";
import { formatRelative, formatDateTime, cn } from "@/lib/utils";

export function TicketThread({ ticket }: { ticket: SupportTicket }) {
  const [messages, setMessages] = React.useState(ticket.messages);
  const [reply, setReply] = React.useState("");
  const [sending, setSending] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim()) return;
    setSending(true);
    // TODO: POST /support/tickets/:id/messages in Fase 1f.
    setTimeout(() => {
      const newMessage: TicketMessage = {
        id: `msg_${Date.now()}`,
        fromAdmin: false,
        authorName: "Budi Santoso",
        authorInitials: "BS",
        message: reply.trim(),
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setReply("");
      setSending(false);
    }, 500);
  };

  const isClosed = ticket.status === "closed" || ticket.status === "resolved";

  return (
    <div className="rounded-2xl border border-border bg-surface/70">
      {/* Messages */}
      <ol className="flex flex-col gap-4 p-5">
        {messages.map((m) => (
          <Bubble key={m.id} message={m} />
        ))}
      </ol>

      {/* Reply form */}
      <div className="border-t border-border p-5">
        {isClosed ? (
          <div className="rounded-xl border border-border bg-background/40 p-4 text-center text-sm text-muted">
            Tiket ini sudah ditutup. Buat tiket baru jika kamu masih butuh
            bantuan.
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <Textarea
              placeholder="Tulis balasan…"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows={4}
              required
              aria-label="Balasan"
            />
            <div className="flex items-center justify-between gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-label="Lampirkan file"
              >
                <Paperclip className="h-4 w-4" />
                Lampirkan
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={!reply.trim() || sending}
              >
                <Send className="h-4 w-4" />
                {sending ? "Mengirim..." : "Kirim Balasan"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Bubble({ message }: { message: TicketMessage }) {
  const isAdmin = message.fromAdmin;
  return (
    <li
      className={cn(
        "flex max-w-full gap-3",
        isAdmin ? "flex-row" : "flex-row-reverse",
      )}
    >
      <Avatar
        initials={message.authorInitials}
        size="sm"
        className={cn(
          "shrink-0",
          isAdmin && "bg-secondary/30 [&]:!bg-secondary/40",
        )}
      />
      <div className={cn("flex max-w-[80%] flex-col", isAdmin ? "items-start" : "items-end")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm",
            isAdmin
              ? "rounded-tl-sm border border-border bg-background/40"
              : "rounded-tr-sm bg-gradient-brand text-white shadow-glow",
          )}
        >
          <p className="whitespace-pre-wrap break-words">{message.message}</p>
          {message.attachments?.length ? (
            <div className="mt-3 flex flex-col gap-1.5">
              {message.attachments.map((att) => (
                <div
                  key={att.name}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs",
                    isAdmin ? "bg-surface/60" : "bg-white/15",
                  )}
                >
                  <Paperclip className="h-3 w-3" />
                  <span className="truncate font-medium">{att.name}</span>
                  <span className="opacity-70">{att.size}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <p
          className="mt-1 px-1 text-[11px] text-muted"
          title={formatDateTime(message.createdAt)}
        >
          {message.authorName} · {formatRelative(message.createdAt)}
        </p>
      </div>
    </li>
  );
}
