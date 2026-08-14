import { createFileRoute, Link } from "@tanstack/react-router";

import { DataTable, Metric, Notice, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { activity, callVolume, liveMetrics, systemStatus } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Live Metrics — Silver Operations" },
      {
        name: "description",
        content:
          "Cross-module operational visibility for Silver Operations: call, leads, mail and hosting metrics with honest connection states.",
      },
      { property: "og:title", content: "Live Metrics — Silver Operations" },
      {
        property: "og:description",
        content: "Cross-module operational visibility with explicit connected, demo and disconnected states.",
      },
    ],
  }),
  component: LiveMetricsPage,
});

const maxVolume = Math.max(...callVolume.map((d) => d.connected + d.failed));

function LiveMetricsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <PageHeader
        eyebrow="Silver Operations"
        title="Live Metrics"
        description="Operational visibility across every module. Values sourced from a static demo dataset — provider adapters are not connected in this environment."
        status={{ label: "demo / static", tone: "demo" }}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {liveMetrics.map((m) => (
          <Metric key={m.label} label={m.label} value={m.value} hint={m.hint} tone={m.tone} />
        ))}
      </div>

      <Notice tone="warning">
        No telephony, mail or DNS adapter is configured. Actions that would reach an external
        provider are blocked and reported as <strong>not connected</strong> rather than shown as
        succeeding.
      </Notice>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel
          className="lg:col-span-2"
          title="Call volume — sample day"
          description="Connected vs failed attempts per hour (demo dataset)"
        >
          <div className="flex h-56 items-end gap-3">
            {callVolume.map((d) => {
              const total = d.connected + d.failed;
              return (
                <div key={d.hour} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full flex-1 flex-col justify-end gap-0.5">
                    <div
                      className="w-full rounded-t-sm bg-destructive/35"
                      style={{ height: `${(d.failed / maxVolume) * 100}%` }}
                    />
                    <div
                      className="w-full rounded-b-sm bg-primary/80"
                      style={{ height: `${(d.connected / maxVolume) * 100}%` }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">{d.hour}</span>
                  <span className="tabular text-[10px] text-muted-foreground">{total}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-sm bg-primary/80" /> connected
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-sm bg-destructive/35" /> failed
            </span>
          </div>
        </Panel>

        <Panel title="Adapter status" description={`Environment: ${systemStatus.environment}`}>
          <ul className="space-y-3.5">
            {systemStatus.adapters.map((a) => (
              <li key={a.name} className="space-y-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium">{a.name}</span>
                  <StatePill tone={a.state}>{a.state}</StatePill>
                </div>
                <p className="text-xs text-muted-foreground">{a.detail}</p>
              </li>
            ))}
          </ul>
          <Link
            to="/admin/integrations"
            className="mt-4 inline-flex text-xs font-medium text-primary hover:underline"
          >
            Manage integrations →
          </Link>
        </Panel>
      </div>

      <Panel
        title="Recent activity"
        description="Audited events across all modules"
        padded={false}
        actions={
          <Link to="/activity" className="text-xs font-medium text-primary hover:underline">
            View all
          </Link>
        }
      >
        <DataTable
          columns={["Time", "Actor", "Event", "Detail", "Module"]}
          rows={activity.slice(0, 5).map((a) => [
            <span className="tabular font-mono text-xs text-muted-foreground">{a.when}</span>,
            <span className="font-medium">{a.who}</span>,
            a.what,
            <span className="text-muted-foreground">{a.detail}</span>,
            <StatePill tone="neutral">{a.module}</StatePill>,
          ])}
        />
      </Panel>
    </div>
  );
}
