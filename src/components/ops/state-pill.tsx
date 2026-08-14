import { cn } from "@/lib/utils";

export type Tone = "connected" | "pending" | "failed" | "disconnected" | "demo" | "stale" | "neutral";

const toneClass: Record<Tone, string> = {
  connected: "bg-success/12 text-success border-success/25",
  pending: "bg-warning/15 text-warning-foreground border-warning/35",
  failed: "bg-destructive/10 text-destructive border-destructive/25",
  disconnected: "bg-neutral-state text-neutral-state-foreground border-border",
  demo: "bg-info/10 text-info border-info/25",
  stale: "bg-muted text-muted-foreground border-border",
  neutral: "bg-muted text-muted-foreground border-border",
};

const labels: Record<string, Tone> = {
  active: "connected",
  connected: "connected",
  completed: "connected",
  customer: "connected",
  qualified: "connected",
  ok: "connected",
  paused: "pending",
  draft: "neutral",
  pending: "pending",
  working: "pending",
  new: "demo",
  nurture: "demo",
  demo: "demo",
  failed: "failed",
  blocked: "failed",
  cancelled: "failed",
  disabled: "failed",
  disconnected: "disconnected",
  offline: "disconnected",
  unverified: "pending",
  unknown: "stale",
};

export function StatePill({
  children,
  tone,
  className,
}: {
  children: string;
  tone?: Tone | undefined;
  className?: string | undefined;
}) {

  const key = String(children).toLowerCase().split(" ")[0] ?? "";
  const resolved: Tone = tone ?? labels[key] ?? "neutral";


  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        toneClass[resolved],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {children}
    </span>
  );
}
