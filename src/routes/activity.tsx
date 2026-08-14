import { createFileRoute } from "@tanstack/react-router";

import { DataTable, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { activity } from "@/lib/mock-data";

export const Route = createFileRoute("/activity")({
  head: () => ({
    meta: [
      { title: "Activity Timeline — Silver Operations" },
      {
        name: "description",
        content: "Global activity timeline of audited operator and system events across all Silver Operations modules.",
      },
      { property: "og:title", content: "Activity Timeline — Silver Operations" },
      { property: "og:description", content: "Audited operator and system events across every module." },
    ],
  }),
  component: ActivityPage,
});

function ActivityPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
      <PageHeader
        eyebrow="Silver Operations"
        title="Activity"
        description="Every operator and system event, in order. Each entry carries actor, target, timestamp and a before/after summary in the audit log."
        status={{ label: "demo / static", tone: "demo" }}
      />

      <Panel title="Timeline" description="Newest first" padded={false}>
        <DataTable
          columns={["Time", "Actor", "Event", "Detail", "Module"]}
          rows={activity.map((a) => [
            <span className="tabular font-mono text-xs text-muted-foreground">{a.when}</span>,
            <span className="font-medium">{a.who}</span>,
            a.what,
            <span className="text-muted-foreground">{a.detail}</span>,
            <StatePill tone="neutral">{a.module}</StatePill>,
          ])}
        />
      </Panel>
    </div>
  );
}
