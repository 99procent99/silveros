import { createFileRoute } from "@tanstack/react-router";

import { DataTable, Notice, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { integrations } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations — Administration" },
      {
        name: "description",
        content:
          "Telephony, mail, DNS and webhook integrations with server-side secrets, connection tests and honest disconnected states.",
      },
      { property: "og:title", content: "Integrations — Administration" },
      { property: "og:description", content: "Server-side secrets, connection tests and honest states." },
    ],
  }),
  component: IntegrationsPage,
});

function IntegrationsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <PageHeader
        eyebrow="Administration"
        title="Integrations"
        description="Credentials are submitted once, stored server-side and never returned to the browser. Connection state comes from a real test call, not from the presence of a saved value."
        status={{ label: "0 connected", tone: "disconnected" }}
      />

      <Notice tone="warning">
        This build runs on demo data. Every module that needs a provider reports itself as
        disconnected instead of showing invented results.
      </Notice>

      <Panel title="Available integrations" padded={false}>
        <DataTable
          columns={["Integration", "Category", "State", "Secrets", "Requirements"]}
          rows={integrations.map((i) => [
            <span className="font-medium">{i.name}</span>,
            <span className="text-muted-foreground">{i.category}</span>,
            <StatePill tone={i.state}>{i.state}</StatePill>,
            <span className="text-muted-foreground">{i.secrets}</span>,
            <span className="text-muted-foreground">{i.detail}</span>,
          ])}
        />
      </Panel>

      <Panel title="Secret handling">
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Secrets are write-only from the panel and never echoed back after saving.</li>
          <li>• Values are excluded from logs, error messages, exports and support bundles.</li>
          <li>• Rotation replaces a credential atomically and records the change in the audit trail.</li>
          <li>• A failed connection test never silently falls back to a previous credential.</li>
        </ul>
      </Panel>
    </div>
  );
}
