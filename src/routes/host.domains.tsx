import { createFileRoute } from "@tanstack/react-router";

import { DataTable, Notice, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { Button } from "@/components/ui/button";
import { domains } from "@/lib/mock-data";

export const Route = createFileRoute("/host/domains")({
  head: () => ({
    meta: [
      { title: "Domains — SilverHost" },
      {
        name: "description",
        content:
          "Domain ownership verification, nameserver state and certificate readiness, each shown with its real verification result.",
      },
      { property: "og:title", content: "Domains — SilverHost" },
      { property: "og:description", content: "Ownership verification, nameservers and certificate readiness." },
    ],
  }),
  component: DomainsPage,
});

function DomainsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
      <PageHeader
        eyebrow="SilverHost"
        title="Domains"
        description="A domain is only treated as usable once ownership verification passes against live DNS. Unverified domains cannot receive traffic or certificates."
        actions={<Button variant="outline" size="sm">Add domain</Button>}
      />

      <Notice tone="warning">
        No domain is verified yet. Publish the verification TXT record, then run verification from
        the DNS tab.
      </Notice>

      <Panel title="Registered domains" padded={false}>
        <DataTable
          columns={["Domain", "Registrar", "Verification", "Nameservers", "Expiry"]}
          rows={domains.map((d) => [
            <span className="font-medium">{d.domain}</span>,
            <span className="text-muted-foreground">{d.registrar}</span>,
            <StatePill tone={d.verification === "Unverified" ? "failed" : "pending"}>
              {d.verification}
            </StatePill>,
            <span className="text-muted-foreground">{d.nameservers}</span>,
            <span className="tabular text-muted-foreground">{d.expiry}</span>,
          ])}
        />
      </Panel>

      <Panel title="Certificates" description="Issued automatically after verification">
        <p className="text-sm text-muted-foreground">
          No certificates issued. Certificate requests are queued only after a domain resolves to
          this platform, so nothing is reported as secured prematurely.
        </p>
      </Panel>
    </div>
  );
}
