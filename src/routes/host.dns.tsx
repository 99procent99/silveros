import { createFileRoute } from "@tanstack/react-router";

import { DataTable, Notice, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { Button } from "@/components/ui/button";
import { dnsRecords } from "@/lib/mock-data";

export const Route = createFileRoute("/host/dns")({
  head: () => ({
    meta: [
      { title: "DNS — SilverHost" },
      {
        name: "description",
        content:
          "Managed DNS records with propagation state, verification results and a read-only view when no provider token is present.",
      },
      { property: "og:title", content: "DNS — SilverHost" },
      { property: "og:description", content: "Records, propagation state and verification results." },
    ],
  }),
  component: DnsPage,
});

function DnsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
      <PageHeader
        eyebrow="SilverHost"
        title="DNS"
        description="Records are read from the authoritative zone. Without a provider token the panel is read-only and no record is silently assumed correct."
        status={{ label: "read-only", tone: "disconnected" }}
        actions={
          <Button variant="outline" size="sm" disabled>
            Add record
          </Button>
        }
      />

      <Notice tone="warning">
        Editing is disabled: no DNS provider token is configured. Records below reflect the last
        successful zone read.
      </Notice>

      <Panel title="Zone records" description="silver-ops.example" padded={false}>
        <DataTable
          columns={["Host", "Type", "Value", "TTL", "State"]}
          rows={dnsRecords.map((r) => [
            <span className="font-mono text-xs">{r.host}</span>,
            <StatePill tone="neutral">{r.type}</StatePill>,
            <span className="font-mono text-xs text-muted-foreground">{r.value}</span>,
            <span className="tabular text-muted-foreground">{r.ttl}</span>,
            <StatePill tone={r.state}>{r.state}</StatePill>,
          ])}
        />
      </Panel>

      <Panel title="Propagation">
        <p className="text-sm text-muted-foreground">
          Propagation checks query multiple public resolvers and report each result separately. No
          checks have run because the zone has no resolvable target yet.
        </p>
      </Panel>
    </div>
  );
}
