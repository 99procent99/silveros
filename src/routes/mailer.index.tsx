import { createFileRoute, Link } from "@tanstack/react-router";

import { DataTable, Metric, Notice, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { deliverability, mailCampaigns } from "@/lib/mock-data";

export const Route = createFileRoute("/mailer/")({
  head: () => ({
    meta: [
      { title: "SilverMailer — Overview" },
      {
        name: "description",
        content:
          "Authorized mail operations: mailbox health, sender authentication, campaign readiness and honest blocked-send states.",
      },
      { property: "og:title", content: "SilverMailer — Overview" },
      { property: "og:description", content: "Mailbox health, sender authentication and campaign readiness." },
    ],
  }),
  component: MailerOverview,
});

function MailerOverview() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <PageHeader
        eyebrow="SilverMailer"
        title="Overview"
        description="Sending is gated on verified authentication, consent and suppression checks. Nothing is reported as delivered unless the provider confirms it."
        status={{ label: "sending disabled", tone: "failed" }}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Mailboxes" value="3" hint="0 authenticated" tone="disconnected" />
        <Metric label="Sent (24 h)" value="0" hint="No provider connected" tone="disconnected" />
        <Metric label="Bounce rate" value="—" hint="No delivery data" tone="disconnected" />
        <Metric label="Suppression hits" value="0" hint="Nothing attempted" tone="disconnected" />
      </div>

      <Notice tone="warning">
        Sending is blocked: no verified sending domain and no mail provider credentials are
        configured server-side.
      </Notice>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel
          title="Sender authentication"
          padded={false}
          actions={
            <Link to="/mailer/deliverability" className="text-xs font-medium text-primary hover:underline">
              Details
            </Link>
          }
        >
          <DataTable
            columns={["Check", "State", "Detail"]}
            rows={deliverability.map((d) => [
              <span className="font-medium">{d.label}</span>,
              <StatePill tone={d.state}>{d.state}</StatePill>,
              <span className="text-muted-foreground">{d.detail}</span>,
            ])}
          />
        </Panel>

        <Panel
          title="Campaigns"
          padded={false}
          actions={
            <Link to="/mailer/campaigns" className="text-xs font-medium text-primary hover:underline">
              Manage
            </Link>
          }
        >
          <DataTable
            columns={["Campaign", "Audience", "State"]}
            rows={mailCampaigns.map((c) => [
              <span className="font-medium">{c.name}</span>,
              <span className="text-muted-foreground">{c.audience}</span>,
              <StatePill>{c.state}</StatePill>,
            ])}
          />
        </Panel>
      </div>
    </div>
  );
}
