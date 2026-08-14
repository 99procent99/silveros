import { createFileRoute, Link } from "@tanstack/react-router";

import { DataTable, Metric, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { integrations, users } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Administration — Silver Operations" },
      {
        name: "description",
        content:
          "Accounts, roles, permissions, integrations and audit trail for the Silver Operations panel.",
      },
      { property: "og:title", content: "Administration — Silver Operations" },
      { property: "og:description", content: "Accounts, roles, integrations and audit trail." },
    ],
  }),
  component: AdminOverview,
});

function AdminOverview() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <PageHeader
        eyebrow="Administration"
        title="Overview"
        description="Permissions are denied by default and granted per role. Every privileged change is written to the audit trail with actor, target and before/after values."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Users" value="6" hint="5 active · 1 disabled" tone="demo" />
        <Metric label="Roles" value="6" hint="Deny by default" tone="demo" />
        <Metric label="Integrations" value="6" hint="0 connected" tone="disconnected" />
        <Metric label="Audit events (24 h)" value="42" hint="Immutable log" tone="demo" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel
          title="Recent users"
          padded={false}
          actions={
            <Link to="/admin/users" className="text-xs font-medium text-primary hover:underline">
              Manage users
            </Link>
          }
        >
          <DataTable
            columns={["Name", "Role", "Status", "Last active"]}
            rows={users.slice(0, 5).map((u) => [
              <span className="font-medium">{u.name}</span>,
              <span className="text-muted-foreground">{u.role}</span>,
              <StatePill tone={u.status === "Active" ? "connected" : "neutral"}>{u.status}</StatePill>,
              <span className="text-muted-foreground">{u.lastActive}</span>,
            ])}
          />
        </Panel>

        <Panel
          title="Integrations"
          padded={false}
          actions={
            <Link to="/admin/integrations" className="text-xs font-medium text-primary hover:underline">
              Configure
            </Link>
          }
        >
          <DataTable
            columns={["Integration", "Category", "State"]}
            rows={integrations.map((i) => [
              <span className="font-medium">{i.name}</span>,
              <span className="text-muted-foreground">{i.category}</span>,
              <StatePill tone={i.state}>{i.state}</StatePill>,
            ])}
          />
        </Panel>
      </div>
    </div>
  );
}
