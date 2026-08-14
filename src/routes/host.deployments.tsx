import { createFileRoute } from "@tanstack/react-router";

import { DataTable, PageHeader, Panel, Notice } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { deployments, sites } from "@/lib/mock-data";

export const Route = createFileRoute("/host/deployments")({
  head: () => ({
    meta: [
      { title: "Deployments — SilverHost" },
      {
        name: "description",
        content:
          "Deployment history with trigger, outcome and the exact reason a release was blocked or rolled back.",
      },
      { property: "og:title", content: "Deployments — SilverHost" },
      { property: "og:description", content: "Trigger, outcome and blocking reason for every release." },
    ],
  }),
  component: DeploymentsPage,
});

function DeploymentsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
      <PageHeader
        eyebrow="SilverHost"
        title="Deployments"
        description="Every deployment records who triggered it, what changed and why it succeeded or failed. Blocked releases keep the previous version live."
        status={{ label: "blocked", tone: "failed" }}
      />

      <Notice tone="warning">
        Deployments are blocked because no hosting provider is connected. Requests are recorded but
        never marked as released.
      </Notice>

      <Panel title="History" padded={false}>
        <DataTable
          columns={["ID", "Site", "Trigger", "State", "Reason", "When"]}
          rows={deployments.map((d) => [
            <span className="font-mono text-xs">{d.id}</span>,
            <span className="font-medium">{d.site}</span>,
            <span className="text-muted-foreground">{d.trigger}</span>,
            <StatePill tone="failed">{d.state}</StatePill>,
            <span className="text-muted-foreground">{d.detail}</span>,
            <span className="text-muted-foreground">{d.when}</span>,
          ])}
        />
      </Panel>

      <Panel title="Current versions" padded={false}>
        <DataTable
          columns={["Site", "Deployment", "SSL", "Updated"]}
          rows={sites.map((s) => [
            <span className="font-medium">{s.name}</span>,
            <StatePill>{s.deployment}</StatePill>,
            <span className="text-muted-foreground">{s.ssl}</span>,
            <span className="text-muted-foreground">{s.updated}</span>,
          ])}
        />
      </Panel>
    </div>
  );
}
