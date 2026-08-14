import { createFileRoute } from "@tanstack/react-router";

import { Metric, Notice, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/call/hopper")({
  head: () => ({
    meta: [
      { title: "Hopper & Auto-Dial — SilverCall Center" },
      {
        name: "description",
        content:
          "Conservative auto-dial controls: pacing, concurrency, retries, calling windows and hard safety limits, all audited.",
      },
      { property: "og:title", content: "Hopper & Auto-Dial — SilverCall Center" },
      { property: "og:description", content: "Pacing, concurrency, retries and hard safety limits." },
    ],
  }),
  component: HopperPage,
});

const settings = [
  { label: "Concurrency", value: "2 lines per agent", limit: "hard limit 3" },
  { label: "Pacing", value: "1.0× (no over-dial)", limit: "hard limit 1.5×" },
  { label: "Retry attempts", value: "3 per lead", limit: "hard limit 5" },
  { label: "Retry interval", value: "4 h", limit: "min 1 h" },
  { label: "Calling window", value: "09:00–17:00 local", limit: "lead timezone enforced" },
  { label: "Abandon guard", value: "Drop rate cap 2%", limit: "non-configurable" },
];

function HopperPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
      <PageHeader
        eyebrow="SilverCall Center"
        title="Hopper / Auto-Dial"
        description="Defaults are deliberately conservative. Limits are enforced server-side and cannot be used to work around carrier limits or consent restrictions."
        status={{ label: "stopped", tone: "disconnected" }}
        actions={
          <Button size="sm" disabled>
            Start hopper
          </Button>
        }
      />

      <Notice tone="warning">
        The hopper cannot start while the telephony adapter reports <strong>not connected</strong>.
      </Notice>

      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Queued leads" value="0" hint="Hopper empty" tone="disconnected" />
        <Metric label="Dial requests / min" value="0" hint="Stopped" tone="disconnected" />
        <Metric label="Agents available" value="0" hint="Presence unavailable" tone="disconnected" />
      </div>

      <Panel title="Pacing & safety" description="Changes are audited with before/after values">
        <ul className="divide-y divide-border">
          {settings.map((s) => (
            <li key={s.label} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <span className="text-sm font-medium">{s.label}</span>
              <span className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{s.value}</span>
                <StatePill tone="neutral">{s.limit}</StatePill>
              </span>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Guards" description="Cannot be disabled by non-administrators">
        <div className="space-y-4">
          {[
            "Respect lead timezone and calling window",
            "Skip leads without a recorded consent basis",
            "Skip suppression and do-not-call matches",
            "Pause automatically when drop rate exceeds cap",
          ].map((g) => (
            <div key={g} className="flex items-center justify-between gap-4">
              <Label className="text-sm font-normal">{g}</Label>
              <Switch checked disabled />
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
