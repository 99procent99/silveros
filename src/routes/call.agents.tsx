import { createFileRoute } from "@tanstack/react-router";

import { DataTable, Notice, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { Button } from "@/components/ui/button";
import { agents } from "@/lib/mock-data";

export const Route = createFileRoute("/call/agents")({
  head: () => ({
    meta: [
      { title: "Agent Console — SilverCall Center" },
      {
        name: "description",
        content:
          "Agent presence, current call panel, hold, transfer and disposition controls — no control succeeds until the adapter confirms it.",
      },
      { property: "og:title", content: "Agent Console — SilverCall Center" },
      { property: "og:description", content: "Presence, call control and dispositions with adapter-confirmed states." },
    ],
  }),
  component: AgentConsole,
});

function AgentConsole() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <PageHeader
        eyebrow="SilverCall Center"
        title="Agent Console"
        description="Presence, queue membership and call control. Hold, resume, transfer and hangup are only marked as applied once the telephony adapter acknowledges them."
        status={{ label: "no active session", tone: "disconnected" }}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel className="lg:col-span-2" title="Current call">
          <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-center">
            <StatePill tone="disconnected">not connected</StatePill>
            <p className="text-sm text-muted-foreground">
              No call is assigned. Presence and call control require a connected PBX adapter.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {["Hold", "Resume", "Transfer", "Hangup"].map((a) => (
                <Button key={a} variant="outline" size="sm" disabled>
                  {a}
                </Button>
              ))}
            </div>
          </div>
        </Panel>

        <Panel title="My presence">
          <div className="space-y-2">
            {["Available", "Away", "Busy", "Offline"].map((p) => (
              <Button
                key={p}
                variant={p === "Offline" ? "secondary" : "outline"}
                size="sm"
                className="w-full justify-start"
                disabled={p !== "Offline"}
              >
                {p}
              </Button>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Presence changes are pushed to the PBX and recorded in the audit log.
          </p>
        </Panel>
      </div>

      <Notice tone="warning">
        Disposition and note fields stay editable offline, but contact outcomes are only recorded
        against a call the adapter has confirmed.
      </Notice>

      <Panel title="Team" padded={false}>
        <DataTable
          columns={["Agent", "Extension", "Queue / campaign", "Presence", "Talk time", "Calls today"]}
          rows={agents.map((a) => [
            <span className="font-medium">{a.name}</span>,
            <span className="font-mono text-xs text-muted-foreground">{a.ext}</span>,
            <span className="text-muted-foreground">{a.queue}</span>,
            <StatePill tone="disconnected">{a.presence}</StatePill>,
            <span className="tabular text-muted-foreground">{a.talkTime}</span>,
            <span className="tabular">{a.calls}</span>,
          ])}
        />
      </Panel>
    </div>
  );
}
