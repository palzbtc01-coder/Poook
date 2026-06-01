import * as React from "react";

interface AuthCardProps {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-3xl border border-border bg-surface/70 p-6 shadow-card backdrop-blur-xl sm:p-8">
        <div className="mb-6 flex flex-col gap-2 text-center">
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h1>
          {description ? (
            <p className="text-sm leading-relaxed text-muted">{description}</p>
          ) : null}
        </div>
        {children}
      </div>
      {footer ? (
        <p className="mt-6 text-center text-sm text-muted">{footer}</p>
      ) : null}
    </div>
  );
}
