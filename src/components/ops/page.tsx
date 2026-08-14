import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { StatePill, type Tone } from "@/components/ops/state-pill";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  status,
}: {
  eyebrow?: string | undefined;
  title: string;
  description?: string | undefined;
  actions?: ReactNode;
  status?: { label: string; tone?: Tone | undefined } | undefined;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
            {eyebrow}
          </p>
        ) : null}
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold">{title}</h1>
          {status ? <StatePill tone={status.tone}>{status.label}</StatePill> : null}
        </div>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function Panel({
  title,
  description,
  actions,
  children,
  className,
  padded = true,
}: {
  title?: string | undefined;
  description?: string | undefined;
  actions?: ReactNode;
  children: ReactNode;
  className?: string | undefined;
  padded?: boolean;
}) {
  return (
    <section
      className={cn(
        "rounded-lg border border-border bg-card shadow-panel",
        className,
      )}
    >
      {title ? (
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3.5">
          <div>
            <h2 className="text-sm font-semibold">{title}</h2>
            {description ? (
              <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {actions}
        </header>
      ) : null}
      <div className={padded ? "p-5" : ""}>{children}</div>
    </section>
  );
}

export function Metric({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint?: string | undefined;
  tone?: Tone | undefined;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-panel">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        {tone ? <StatePill tone={tone}>{tone === "demo" ? "demo" : tone}</StatePill> : null}
      </div>
      <p className="tabular mt-3 text-2xl font-semibold">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function DataTable({
  columns,
  rows,
  empty = "No records",
}: {
  columns: string[];
  rows: ReactNode[][];
  empty?: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            {columns.map((c) => (
              <th
                key={c}
                className="px-5 py-2.5 font-mono text-[11px] font-medium tracking-wider text-muted-foreground uppercase whitespace-nowrap"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-5 py-10 text-center text-muted-foreground">
                {empty}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={i} className="border-b border-border/60 last:border-0 hover:bg-muted/40">
                {row.map((cell, j) => (
                  <td key={j} className="px-5 py-3 whitespace-nowrap">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export function Notice({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "warning" }) {
  return (
    <div
      className={cn(
        "rounded-lg border px-4 py-3 text-sm",
        tone === "info"
          ? "border-info/25 bg-info/8 text-foreground"
          : "border-warning/35 bg-warning/10 text-foreground",
      )}
    >
      {children}
    </div>
  );
}
