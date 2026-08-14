import { createFileRoute, Link } from "@tanstack/react-router";

import { DataTable, Metric, Notice, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { importBatches, leads } from "@/lib/mock-data";

export const Route = createFileRoute("/leads/")({
  head: () => ({
    meta: [
      { title: "SilverLeads CRM — Overview" },
      {
        name: "description",
        content:
          "Lead pipeline overview with consent state, suppression, import health and field-level access awareness.",
      },
      { property: "og:title", content: "SilverLeads CRM — Overview" },
      { property: "og:description", content: "Pipeline, consent state, suppression and import health." },
    ],
  }),
  component: LeadsOverview,
});

const pipeline = [
  { stage: "New", count: 8214, share: 34 },
  { stage: "Working", count: 6120, share: 25 },
  { stage: "Qualified", count: 3980, share: 16 },
  { stage: "Nurture", count: 3410, share: 14 },
  { stage: "Customer", count: 1802, share: 7 },
  { stage: "Blocked", count: 940, share: 4 },
];

function LeadsOverview() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <PageHeader
        eyebrow="SilverLeads CRM"
        title="Overview"
        description="Authorized business leads with consent, retention and suppression respected end to end. Sensitive fields are never returned to roles without permission."
        status={{ label: "demo dataset", tone: "demo" }}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Total leads" value="48,219" hint="Across 14 sources" tone="demo" />
        <Metric label="With consent basis" value="41,806" hint="86.7% of database" tone="demo" />
        <Metric label="Suppressed" value="2,914" hint="Opt-out, DNC, bounced" tone="demo" />
        <Metric label="Awaiting review" value="1,038" hint="Import validation errors" tone="pending" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Pipeline" description="By status">
          <ul className="space-y-3">
            {pipeline.map((p) => (
              <li key={p.stage} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{p.stage}</span>
                  <span className="tabular text-muted-foreground">{p.count.toLocaleString()}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary/70" style={{ width: `${p.share}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          title="Recent imports"
          padded={false}
          actions={
            <Link to="/leads/import" className="text-xs font-medium text-primary hover:underline">
              Import center
            </Link>
          }
        >
          <DataTable
            columns={["Batch", "File", "Rows", "State"]}
            rows={importBatches.map((b) => [
              <span className="font-mono text-xs">{b.id}</span>,
              <span className="font-medium">{b.file}</span>,
              <span className="tabular">{b.rows.toLocaleString()}</span>,
              <StatePill tone={b.state === "Completed" ? "connected" : "pending"}>{b.state}</StatePill>,
            ])}
          />
        </Panel>
      </div>

      <Notice>
        Calling and emailing a lead route through SilverCall Center and SilverMailer permissions and
        eligibility rules — the CRM never duplicates that logic.
      </Notice>

      <Panel
        title="Latest leads"
        padded={false}
        actions={
          <Link to="/leads/all" className="text-xs font-medium text-primary hover:underline">
            All leads
          </Link>
        }
      >
        <DataTable
          columns={["ID", "Lead", "Country", "Origin", "Status", "Owner", "Value"]}
          rows={leads.slice(0, 5).map((l) => [
            <span className="font-mono text-xs">{l.id}</span>,
            <span className="font-medium">{l.name}</span>,
            <span className="font-mono text-xs text-muted-foreground">{l.country}</span>,
            <span className="text-muted-foreground">{l.origin}</span>,
            <StatePill>{l.status}</StatePill>,
            <span className="text-muted-foreground">{l.owner}</span>,
            <span className="tabular">{l.value}</span>,
          ])}
        />
      </Panel>
    </div>
  );
}
