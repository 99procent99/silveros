import { createFileRoute, Link } from "@tanstack/react-router";

import { DataTable, Metric, Notice, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { agents, callHistory, campaigns } from "@/lib/mock-data";

export const Route = createFileRoute("/call/")({
  head: () => ({
    meta: [
      { title: "SilverCall Center — Overview" },
      {
        name: "description",
        content:
          "Authorized call operations overview: campaign eligibility, agent presence, dial requests and adapter connection state.",
      },
      { property: "og:title", content: "SilverCall Center — Overview" },
      { property: "og:description", content: "Campaign eligibility, agent presence and telephony adapter state." },
    ],
  }),
  component: CallOverview,
});

function CallOverview() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <PageHeader
        eyebrow="SilverCall Center"
        title="Overview"
        description="Authorized business calling across an Asterisk / FreePBX / VICIdial-compatible boundary. Credentials stay server-side; no call is reported as connected until the adapter confirms it."
        status={{ label: "adapter not connected", tone: "disconnected" }}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Active campaigns" value="2" hint="1 paused, 1 draft" tone="demo" />
        <Metric label="Eligible leads" value="9,582" hint="After consent + window checks" tone="demo" />
        <Metric label="Suppressed" value="1,283" hint="DNC, opt-out, invalid" tone="demo" />
        <Metric label="Agents online" value="0 / 12" hint="Presence requires PBX" tone="disconnected" />
      </div>

      <Notice tone="warning">
        Dialing is disabled. Opening a campaign, hopper or prompt configuration page never initiates
        a call.
      </Notice>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel
          title="Campaigns"
          padded={false}
          actions={
            <Link to="/call/campaigns" className="text-xs font-medium text-primary hover:underline">
              Manage
            </Link>
          }
        >
          <DataTable
            columns={["Campaign", "Direction", "Status", "Eligible"]}
            rows={campaigns.map((c) => [
              <span className="font-medium">{c.name}</span>,
              <span className="text-muted-foreground">{c.direction}</span>,
              <StatePill>{c.status}</StatePill>,
              <span className="tabular">{c.eligible.toLocaleString()}</span>,
            ])}
          />
        </Panel>

        <Panel
          title="Agent presence"
          padded={false}
          actions={
            <Link to="/call/agents" className="text-xs font-medium text-primary hover:underline">
              Console
            </Link>
          }
        >
          <DataTable
            columns={["Agent", "Ext", "Queue", "Presence"]}
            rows={agents.map((a) => [
              <span className="font-medium">{a.name}</span>,
              <span className="font-mono text-xs text-muted-foreground">{a.ext}</span>,
              <span className="text-muted-foreground">{a.queue}</span>,
              <StatePill tone="disconnected">{a.presence}</StatePill>,
            ])}
          />
        </Panel>
      </div>

      <Panel
        title="Latest calls"
        padded={false}
        actions={
          <Link to="/call/history" className="text-xs font-medium text-primary hover:underline">
            Full history
          </Link>
        }
      >
        <DataTable
          columns={["ID", "Time", "Direction", "Lead", "Result", "Duration"]}
          rows={callHistory.slice(0, 4).map((c) => [
            <span className="font-mono text-xs">{c.id}</span>,
            <span className="tabular font-mono text-xs text-muted-foreground">{c.time}</span>,
            <span className="text-muted-foreground">{c.direction}</span>,
            <span className="font-medium">{c.lead}</span>,
            <StatePill>{c.result}</StatePill>,
            <span className="tabular text-muted-foreground">{c.duration}</span>,
          ])}
        />
      </Panel>
    </div>
  );
}
