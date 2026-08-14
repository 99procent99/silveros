import { createFileRoute } from "@tanstack/react-router";

import { DataTable, Notice, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { users } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [
      { title: "Users — Administration" },
      {
        name: "description",
        content:
          "Manage operator accounts, module access, session state and account disabling with every change audited.",
      },
      { property: "og:title", content: "Users — Administration" },
      { property: "og:description", content: "Operator accounts, module access and audited changes." },
    ],
  }),
  component: UsersPage,
});

function UsersPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <PageHeader
        eyebrow="Administration"
        title="Users"
        description="Accounts are disabled rather than deleted so history stays attributable. Role changes take effect on the next request, not just in the interface."
        actions={
          <>
            <Input placeholder="Search users" className="w-56" />
            <Button size="sm">Invite user</Button>
          </>
        }
      />

      <Notice>
        A user cannot grant themselves a capability they do not already hold. Privilege escalation
        attempts are rejected server-side and recorded.
      </Notice>

      <Panel title="Accounts" padded={false}>
        <DataTable
          columns={["Name", "Email", "Role", "Modules", "Status", "Last active", "Created"]}
          rows={users.map((u) => [
            <span className="font-medium">{u.name}</span>,
            <span className="font-mono text-xs text-muted-foreground">{u.email}</span>,
            <StatePill tone="neutral">{u.role}</StatePill>,
            <span className="text-muted-foreground">{u.modules}</span>,
            <StatePill tone={u.status === "Active" ? "connected" : "failed"}>{u.status}</StatePill>,
            <span className="text-muted-foreground">{u.lastActive}</span>,
            <span className="tabular font-mono text-xs text-muted-foreground">{u.created}</span>,
          ])}
        />
      </Panel>
    </div>
  );
}
