import { createFileRoute } from "@tanstack/react-router";

import { DataTable, Notice, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { Button } from "@/components/ui/button";
import { mailCampaigns } from "@/lib/mock-data";

export const Route = createFileRoute("/mailer/campaigns")({
  head: () => ({
    meta: [
      { title: "Mail Campaigns — SilverMailer" },
      {
        name: "description",
        content:
          "Campaign readiness with audience checks, template review, consent and suppression gating before any send is permitted.",
      },
      { property: "og:title", content: "Mail Campaigns — SilverMailer" },
      { property: "og:description", content: "Audience checks, template review and send gating." },
    ],
  }),
  component: MailCampaignsPage,
});

const checks = [
  { label: "Verified sending domain", state: "failed" as const },
  { label: "Consent basis on every recipient", state: "connected" as const },
  { label: "Suppression list applied", state: "connected" as const },
  { label: "Unsubscribe link present", state: "connected" as const },
  { label: "Template approved", state: "pending" as const },
  { label: "Provider connected", state: "failed" as const },
];

function MailCampaignsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
      <PageHeader
        eyebrow="SilverMailer"
        title="Campaigns"
        description="A campaign can only leave draft when every pre-send check passes. Blocked sends state the reason instead of silently failing."
        actions={<Button variant="outline" size="sm">New campaign</Button>}
      />

      <Notice tone="warning">
        Two pre-send checks are failing, so all sends are blocked at the server boundary.
      </Notice>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Pre-send checks" description="Evaluated per campaign at send time">
          <ul className="divide-y divide-border">
            {checks.map((c) => (
              <li key={c.label} className="flex items-center justify-between gap-3 py-2.5">
                <span className="text-sm">{c.label}</span>
                <StatePill tone={c.state}>{c.state === "connected" ? "pass" : c.state}</StatePill>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Templates">
          <ul className="space-y-3">
            {[
              { name: "Renewal reminder", state: "Draft" },
              { name: "Product update", state: "Draft" },
              { name: "Warm-up filler", state: "Active" },
            ].map((t) => (
              <li key={t.name} className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium">{t.name}</span>
                <StatePill>{t.state}</StatePill>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="All campaigns" padded={false}>
        <DataTable
          columns={["ID", "Campaign", "Audience", "State", "Reason", "Opens", "Clicks"]}
          rows={mailCampaigns.map((c) => [
            <span className="font-mono text-xs">{c.id}</span>,
            <span className="font-medium">{c.name}</span>,
            <span className="text-muted-foreground">{c.audience}</span>,
            <StatePill>{c.state}</StatePill>,
            <span className="text-muted-foreground">{c.detail}</span>,
            <span className="tabular text-muted-foreground">{c.opens}</span>,
            <span className="tabular text-muted-foreground">{c.clicks}</span>,
          ])}
        />
      </Panel>
    </div>
  );
}
