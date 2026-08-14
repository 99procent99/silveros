import { createFileRoute } from "@tanstack/react-router";

import { DataTable, Notice, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { Input } from "@/components/ui/input";
import { auditLog } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/audit")({
  head: () => ({
    meta: [
      { title: "Audit Trail — Administration" },
      {
        name: "description",
        content:
          "Append-only audit trail recording actor, action, target and before/after values for every privileged change.",
      },
      { property: "og:title", content: "Audit Trail — Administration" },
      { property: "og:description", content: "Append-only record of every privileged change." },
    ],
  }),
  component: AuditPage,
});

const toneMap = {
  info: "neutral",
  success: "connected",
  warning: "pending",
  destructive: "failed",
} as const;

function AuditPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <PageHeader
        eyebrow="Administration"
        title="Audit trail"
        description="Entries are append-only and cannot be edited or deleted from the panel, including by administrators."
        actions={<Input placeholder="Filter by actor, action or target" className="w-72" />}
      />

      <Notice>
        Blocked operations are logged with the same weight as successful ones, so a refusal is always
        explainable after the fact.
      </Notice>

      <Panel title="Events" padded={false}>
        <DataTable
          columns={["ID", "When", "Actor", "Action", "Target", "Summary"]}
          rows={auditLog.map((a) => [
            <span className="font-mono text-xs">{a.id}</span>,
            <span className="text-muted-foreground">{a.when}</span>,
            <span className="font-mono text-xs">{a.actor}</span>,
            <StatePill tone={toneMap[a.tone]}>{a.action}</StatePill>,
            <span className="font-mono text-xs text-muted-foreground">{a.target}</span>,
            <span className="text-muted-foreground">{a.summary}</span>,
          ])}
        />
      </Panel>
    </div>
  );
}
