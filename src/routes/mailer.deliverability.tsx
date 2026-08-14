import { createFileRoute } from "@tanstack/react-router";

import { DataTable, Metric, Notice, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { deliverability } from "@/lib/mock-data";

export const Route = createFileRoute("/mailer/deliverability")({
  head: () => ({
    meta: [
      { title: "Deliverability — SilverMailer" },
      {
        name: "description",
        content:
          "Sender authentication, reputation signals and delivery outcomes with explicit pending, failed and disconnected states.",
      },
      { property: "og:title", content: "Deliverability — SilverMailer" },
      { property: "og:description", content: "Authentication, reputation and delivery outcomes." },
    ],
  }),
  component: DeliverabilityPage,
});

const dnsToPublish = [
  { host: "@", type: "TXT", value: "v=spf1 include:_spf.provider ~all" },
  { host: "silver._domainkey", type: "TXT", value: "v=DKIM1; k=rsa; p=•••••" },
  { host: "_dmarc", type: "TXT", value: "v=DMARC1; p=quarantine; rua=mailto:dmarc@•••" },
];

function DeliverabilityPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
      <PageHeader
        eyebrow="SilverMailer"
        title="Deliverability"
        description="Authentication and reputation are read from live DNS and provider events. Missing records are shown as failing rather than assumed valid."
        status={{ label: "not authenticated", tone: "failed" }}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Delivered" value="—" hint="No provider events" tone="disconnected" />
        <Metric label="Bounces" value="—" hint="No provider events" tone="disconnected" />
        <Metric label="Complaints" value="—" hint="No provider events" tone="disconnected" />
        <Metric label="Blocklist checks" value="0 / 12" hint="Requires sending IP" tone="disconnected" />
      </div>

      <Notice tone="warning">
        Publish the records below on the sending domain, then re-run verification. Sending stays
        blocked until SPF, DKIM and DMARC all pass.
      </Notice>

      <Panel title="Authentication checks" padded={false}>
        <DataTable
          columns={["Check", "State", "Detail"]}
          rows={deliverability.map((d) => [
            <span className="font-medium">{d.label}</span>,
            <StatePill tone={d.state}>{d.state}</StatePill>,
            <span className="text-muted-foreground">{d.detail}</span>,
          ])}
        />
      </Panel>

      <Panel title="Records to publish" padded={false}>
        <DataTable
          columns={["Host", "Type", "Value"]}
          rows={dnsToPublish.map((r) => [
            <span className="font-mono text-xs">{r.host}</span>,
            <StatePill tone="neutral">{r.type}</StatePill>,
            <span className="font-mono text-xs break-all text-muted-foreground">{r.value}</span>,
          ])}
        />
      </Panel>
    </div>
  );
}
