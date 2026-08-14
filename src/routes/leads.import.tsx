import { createFileRoute } from "@tanstack/react-router";

import { DataTable, Notice, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { Button } from "@/components/ui/button";
import { importBatches } from "@/lib/mock-data";

export const Route = createFileRoute("/leads/import")({
  head: () => ({
    meta: [
      { title: "Import Center — SilverLeads CRM" },
      {
        name: "description",
        content:
          "CSV import with column mapping, preview before commit, row-level errors, duplicate strategy and full audit trail.",
      },
      { property: "og:title", content: "Import Center — SilverLeads CRM" },
      { property: "og:description", content: "Column mapping, preview, duplicate strategy and audit trail." },
    ],
  }),
  component: ImportPage,
});

const steps = [
  { step: "1", label: "Upload", detail: "CSV or supported structured file" },
  { step: "2", label: "Map columns", detail: "Required fields must be mapped" },
  { step: "3", label: "Preview", detail: "Row-level errors shown before commit" },
  { step: "4", label: "Commit", detail: "Batch summary + audit event written" },
];

const mapping = [
  { source: "company_name", target: "Lead name", state: "connected" as const },
  { source: "email_1", target: "Email", state: "connected" as const },
  { source: "phone_mobile", target: "Phone", state: "connected" as const },
  { source: "consent_ts", target: "Consent timestamp", state: "connected" as const },
  { source: "notes_free", target: "Unmapped", state: "pending" as const },
  { source: "score_legacy", target: "Rejected — field not approved", state: "failed" as const },
];

function ImportPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <PageHeader
        eyebrow="SilverLeads CRM"
        title="Import"
        description="Nothing is written until you commit. Suppression and consent rules are enforced on commit, and every batch produces a reviewable summary."
        actions={<Button size="sm">Upload file</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {steps.map((s) => (
          <div key={s.step} className="rounded-lg border border-border bg-card p-4 shadow-panel">
            <span className="font-mono text-xs text-primary">step {s.step}</span>
            <p className="mt-1 text-sm font-semibold">{s.label}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.detail}</p>
          </div>
        ))}
      </div>

      <Notice tone="warning">
        <strong>partner_list_v3.csv</strong> is awaiting column mapping. Two source columns are
        unmapped or rejected.
      </Notice>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Column mapping" description="partner_list_v3.csv" padded={false}>
          <DataTable
            columns={["Source column", "Target field", "State"]}
            rows={mapping.map((m) => [
              <span className="font-mono text-xs">{m.source}</span>,
              <span className="text-muted-foreground">{m.target}</span>,
              <StatePill tone={m.state}>{m.state}</StatePill>,
            ])}
          />
        </Panel>

        <Panel title="Duplicate strategy">
          <div className="space-y-3">
            {[
              { label: "Skip duplicates", detail: "Default — existing record untouched", active: true },
              { label: "Update allowed fields", detail: "Only fields you may edit are written", active: false },
              { label: "Create separate record", detail: "Explicit opt-in, audited", active: false },
            ].map((o) => (
              <div
                key={o.label}
                className={
                  o.active
                    ? "rounded-lg border border-primary/40 bg-accent/60 p-3"
                    : "rounded-lg border border-border p-3"
                }
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium">{o.label}</span>
                  {o.active ? <StatePill tone="connected">selected</StatePill> : null}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{o.detail}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="Import batches" padded={false}>
        <DataTable
          columns={["Batch", "File", "Rows", "Accepted", "Duplicates", "Rejected", "State", "When"]}
          rows={importBatches.map((b) => [
            <span className="font-mono text-xs">{b.id}</span>,
            <span className="font-medium">{b.file}</span>,
            <span className="tabular">{b.rows.toLocaleString()}</span>,
            <span className="tabular text-success">{b.accepted.toLocaleString()}</span>,
            <span className="tabular text-muted-foreground">{b.duplicates.toLocaleString()}</span>,
            <span className="tabular text-destructive">{b.rejected.toLocaleString()}</span>,
            <StatePill tone={b.state === "Completed" ? "connected" : "pending"}>{b.state}</StatePill>,
            <span className="text-muted-foreground">{b.when}</span>,
          ])}
        />
      </Panel>
    </div>
  );
}
