import { createFileRoute } from "@tanstack/react-router";

import { DataTable, Notice, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { Button } from "@/components/ui/button";
import { campaigns } from "@/lib/mock-data";

export const Route = createFileRoute("/call/campaigns")({
  head: () => ({
    meta: [
      { title: "Call Campaigns — SilverCall Center" },
      {
        name: "description",
        content:
          "Create and govern calling campaigns with consent policy, calling windows, timezone and suppression-aware eligibility.",
      },
      { property: "og:title", content: "Call Campaigns — SilverCall Center" },
      { property: "og:description", content: "Consent policy, calling windows and suppression-aware eligibility." },
    ],
  }),
  component: CallCampaigns,
});

function CallCampaigns() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <PageHeader
        eyebrow="SilverCall Center"
        title="Campaigns & Calling Lists"
        description="Each campaign declares a direction, consent policy, calling window and timezone. Eligibility is recomputed server-side against consent, do-not-call status and suppression."
        actions={<Button variant="outline" size="sm">New campaign</Button>}
      />

      <Notice>
        Eligibility counts exclude leads outside their calling window, without a recorded consent
        basis, or present on a suppression list.
      </Notice>

      <Panel title="All campaigns" padded={false}>
        <DataTable
          columns={[
            "ID",
            "Campaign",
            "Direction",
            "Status",
            "Consent basis",
            "Window",
            "Eligible",
            "Suppressed",
            "Completed",
          ]}
          rows={campaigns.map((c) => [
            <span className="font-mono text-xs">{c.id}</span>,
            <span className="font-medium">{c.name}</span>,
            <span className="text-muted-foreground">{c.direction}</span>,
            <StatePill>{c.status}</StatePill>,
            <span className="text-muted-foreground">{c.consent}</span>,
            <span className="font-mono text-xs text-muted-foreground">{c.window}</span>,
            <span className="tabular">{c.eligible.toLocaleString()}</span>,
            <span className="tabular text-destructive">{c.suppressed.toLocaleString()}</span>,
            <span className="tabular text-muted-foreground">{c.completed.toLocaleString()}</span>,
          ])}
        />
      </Panel>
    </div>
  );
}
