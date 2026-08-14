import { createFileRoute } from "@tanstack/react-router";

import { DataTable, Notice, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { leads } from "@/lib/mock-data";

export const Route = createFileRoute("/leads/all")({
  head: () => ({
    meta: [
      { title: "Leads — SilverLeads CRM" },
      {
        name: "description",
        content:
          "Server-side filtered lead table with column visibility policy, consent state, suppression flags and owner assignment.",
      },
      { property: "og:title", content: "Leads — SilverLeads CRM" },
      { property: "og:description", content: "Filterable lead table with column policy and consent state." },
    ],
  }),
  component: LeadsTable,
});

const filters = [
  "Campaign",
  "Origin",
  "Country",
  "Status",
  "Disposition",
  "Owner",
  "Consent",
  "Suppression",
  "Lead age",
  "Value range",
];

function LeadsTable() {
  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-6 p-6">
      <PageHeader
        eyebrow="SilverLeads CRM"
        title="Leads"
        description="Filtering, sorting and pagination run server-side with safe query limits. Column visibility follows the role and per-user policy, and exports match the authorized columns."
        actions={
          <>
            <Input placeholder="Search leads" className="w-56" />
            <Button variant="outline" size="sm">
              Export
            </Button>
          </>
        }
      />

      <Panel title="Filters" description="Combined filters are reflected in the shareable URL state">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <Button key={f} variant="outline" size="sm" className="text-xs">
              {f}
            </Button>
          ))}
        </div>
      </Panel>

      <Notice>
        Contact fields are partially masked. A client-side column preference can never reveal a
        restricted field — the server omits it from the response entirely.
      </Notice>

      <Panel title="48,219 leads" description="Showing page 1 · demo dataset" padded={false}>
        <DataTable
          columns={[
            "ID",
            "Lead",
            "Contact",
            "Country",
            "Origin",
            "Campaign",
            "Status",
            "Owner",
            "Value",
            "Consent",
            "Age",
          ]}
          rows={leads.map((l) => [
            <span className="font-mono text-xs">{l.id}</span>,
            <span className="flex items-center gap-2 font-medium">
              {l.name}
              {l.suppressed ? <StatePill tone="failed">suppressed</StatePill> : null}
            </span>,
            <span className="font-mono text-xs text-muted-foreground">{l.contact}</span>,
            <span className="font-mono text-xs text-muted-foreground">{l.country}</span>,
            <span className="text-muted-foreground">{l.origin}</span>,
            <span className="text-muted-foreground">{l.campaign}</span>,
            <StatePill>{l.status}</StatePill>,
            <span className="text-muted-foreground">{l.owner}</span>,
            <span className="tabular">{l.value}</span>,
            <span className="text-muted-foreground">{l.consent}</span>,
            <span className="tabular text-muted-foreground">{l.age}</span>,
          ])}
        />
      </Panel>
    </div>
  );
}
