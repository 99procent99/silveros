import { createFileRoute } from "@tanstack/react-router";

import { Notice, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { capabilities, roleMatrix, roles } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/roles")({
  head: () => ({
    meta: [
      { title: "Roles & Permissions — Administration" },
      {
        name: "description",
        content:
          "Capability matrix per role, denied by default, enforced on the server for every action and export.",
      },
      { property: "og:title", content: "Roles & Permissions — Administration" },
      { property: "og:description", content: "Capability matrix per role, denied by default." },
    ],
  }),
  component: RolesPage,
});

function RolesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <PageHeader
        eyebrow="Administration"
        title="Roles & permissions"
        description="The matrix is the source of truth. Hiding a control in the interface is never treated as a permission — every action re-checks capability server-side."
      />

      <Notice>
        Sensitive capabilities — export, integrations and user management — are granted explicitly and
        never inherited implicitly.
      </Notice>

      <Panel title="Capability matrix" description="Deny by default" padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Role
                </th>
                {capabilities.map((c) => (
                  <th
                    key={c}
                    className="px-3 py-2.5 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role} className="border-b border-border/70 last:border-0">
                  <td className="px-4 py-2.5 font-medium">{role}</td>
                  {roleMatrix[role].map((allowed, i) => (
                    <td key={capabilities[i]} className="px-3 py-2.5 text-center">
                      <span
                        className={
                          allowed
                            ? "inline-block h-2.5 w-2.5 rounded-full bg-success"
                            : "inline-block h-2.5 w-2.5 rounded-full bg-border"
                        }
                        aria-label={allowed ? "allowed" : "denied"}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-success" /> allowed
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-border" /> denied
        </span>
        <StatePill tone="demo">demo matrix</StatePill>
      </div>
    </div>
  );
}
