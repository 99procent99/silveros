import { createFileRoute } from "@tanstack/react-router";

import { DataTable, Notice, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { Input } from "@/components/ui/input";
import { callHistory } from "@/lib/mock-data";

export const Route = createFileRoute("/call/history")({
  head: () => ({
    meta: [
      { title: "Call History — SilverCall Center" },
      {
        name: "description",
        content:
          "Auditable call records with direction, result, disposition and duration. Numbers are masked for operators without reveal permission.",
      },
      { property: "og:title", content: "Call History — SilverCall Center" },
      { property: "og:description", content: "Auditable call records with masked numbers and dispositions." },
    ],
  }),
  component: CallHistoryPage,
});

function CallHistoryPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <PageHeader
        eyebrow="SilverCall Center"
        title="Call History"
        description="Every request, attempt and outcome is stored with actor, timestamp and disposition. Records are read-only once closed."
        actions={<Input placeholder="Search lead, number or ID" className="w-64" />}
      />

      <Notice>
        Phone numbers are masked. Full values are only returned to roles holding the reveal
        capability, and each reveal is audited.
      </Notice>

      <Panel title="Records" description="Sample day" padded={false}>
        <DataTable
          columns={["ID", "Time", "Direction", "Lead", "Number", "Result", "Disposition", "Duration"]}
          rows={callHistory.map((c) => [
            <span className="font-mono text-xs">{c.id}</span>,
            <span className="tabular font-mono text-xs text-muted-foreground">{c.time}</span>,
            <span className="text-muted-foreground">{c.direction}</span>,
            <span className="font-medium">{c.lead}</span>,
            <span className="font-mono text-xs text-muted-foreground">{c.number}</span>,
            <StatePill>{c.result}</StatePill>,
            <span className="text-muted-foreground">{c.disposition}</span>,
            <span className="tabular text-muted-foreground">{c.duration}</span>,
          ])}
        />
      </Panel>
    </div>
  );
}
