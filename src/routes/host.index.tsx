import { createFileRoute, Link } from "@tanstack/react-router";

import { DataTable, Metric, Notice, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { deployments, sites } from "@/lib/mock-data";

export const Route = createFileRoute("/host/")({
  head: () => ({
    meta: [
      { title: "SilverHost — Overview" },
      {
        name: "description",
        content:
          "Hosted pages, domains, certificates and deployment health with real provider status instead of assumed success.",
      },
      { property: "og:title", content: "SilverHost — Overview" },
      { property: "og:description", content: "Pages, domains, certificates and deployment health." },
    ],
  }),
  component: HostOverview,
});

function HostOverview() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <PageHeader
        eyebrow="SilverHost"
        title="Overview"
        description="Site and domain state is read from the hosting and DNS providers. With no provider connected, deployments are blocked rather than queued indefinitely."
        status={{ label: "provider not connected", tone: "disconnected" }}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Sites" value="3" hint="0 deployed" tone="pending" />
        <Metric label="Domains" value="2" hint="0 verified" tone="pending" />
        <Metric label="Certificates" value="0" hint="Issued after verification" tone="disconnected" />
        <Metric label="Uptime" value="—" hint="No health probes" tone="disconnected" />
      </div>

      <Notice tone="warning">
        Connect a DNS/hosting provider with a zone-scoped token to enable verification, deployment
        and certificate issuance.
      </Notice>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel
          title="Sites & pages"
          padded={false}
          actions={
            <Link to="/host/domains" className="text-xs font-medium text-primary hover:underline">
              Domains
            </Link>
          }
        >
          <DataTable
            columns={["Name", "Type", "Deployment", "Health"]}
            rows={sites.map((s) => [
              <span className="font-medium">{s.name}</span>,
              <span className="text-muted-foreground">{s.type}</span>,
              <StatePill>{s.deployment}</StatePill>,
              <StatePill tone={s.health}>{s.health}</StatePill>,
            ])}
          />
        </Panel>

        <Panel
          title="Recent deployments"
          padded={false}
          actions={
            <Link to="/host/deployments" className="text-xs font-medium text-primary hover:underline">
              All deployments
            </Link>
          }
        >
          <DataTable
            columns={["ID", "Site", "State", "Reason"]}
            rows={deployments.map((d) => [
              <span className="font-mono text-xs">{d.id}</span>,
              <span className="font-medium">{d.site}</span>,
              <StatePill>{d.state}</StatePill>,
              <span className="text-muted-foreground">{d.detail}</span>,
            ])}
          />
        </Panel>
      </div>
    </div>
  );
}
