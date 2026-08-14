import { createFileRoute } from "@tanstack/react-router";

import { DataTable, Metric, Notice, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { suppression } from "@/lib/mock-data";

export const Route = createFileRoute("/leads/suppression")({
  head: () => ({
    meta: [
      { title: "Suppression — SilverLeads CRM" },
      {
        name: "description",
        content:
          "Central suppression list covering opt-outs, do-not-call entries, bounces and compliance imports enforced across calling and mail.",
      },
      { property: "og:title", content: "Suppression — SilverLeads CRM" },
      { property: "og:description", content: "Opt-outs, do-not-call, bounces and compliance imports in one enforced list." },
    ],
  }),
  component: SuppressionPage,
});

function SuppressionPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
      <PageHeader
        eyebrow="SilverLeads CRM"
        title="Suppression"
        description="One list, enforced by every module. Entries can be added but never silently removed — removals require a reason and are audited."
        actions={
          <>
            <Input placeholder="Search value" className="w-56" />
            <Button variant="outline" size="sm">
              Add entry
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Total entries" value="2,914" hint="Emails and phone numbers" tone="demo" />
        <Metric label="Do-not-call" value="1,204" hint="Registry + verbal opt-outs" tone="demo" />
        <Metric label="Added this week" value="87" hint="From provider events" tone="demo" />
      </div>

      <Notice>
        Suppression checks run server-side at dial time and send time. A suppressed contact cannot be
        reached even if a campaign still lists them.
      </Notice>

      <Panel title="Entries" description="Values are masked in the panel" padded={false}>
        <DataTable
          columns={["Value", "Type", "Reason", "Source", "Added"]}
          rows={suppression.map((s) => [
            <span className="font-mono text-xs">{s.value}</span>,
            <StatePill tone="neutral">{s.type}</StatePill>,
            <span className="font-medium">{s.reason}</span>,
            <span className="text-muted-foreground">{s.source}</span>,
            <span className="tabular font-mono text-xs text-muted-foreground">{s.added}</span>,
          ])}
        />
      </Panel>
    </div>
  );
}
