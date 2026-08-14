import { createFileRoute } from "@tanstack/react-router";

import { DataTable, Notice, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { Button } from "@/components/ui/button";
import { mailboxes } from "@/lib/mock-data";

export const Route = createFileRoute("/mailer/mailboxes")({
  head: () => ({
    meta: [
      { title: "Mailboxes — SilverMailer" },
      {
        name: "description",
        content:
          "Authorized mailboxes with server-side credentials, sending limits, warm-up plans and reputation state.",
      },
      { property: "og:title", content: "Mailboxes — SilverMailer" },
      { property: "og:description", content: "Server-side credentials, sending limits and warm-up state." },
    ],
  }),
  component: MailboxesPage,
});

function MailboxesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
      <PageHeader
        eyebrow="SilverMailer"
        title="Mailboxes"
        description="Mailbox credentials are stored server-side and never returned to the browser, logs or exports. The panel only shows connection state."
        actions={<Button variant="outline" size="sm">Add mailbox</Button>}
      />

      <Notice>
        Secrets are write-only from this panel. Once saved, a credential can be replaced or revoked
        but never read back.
      </Notice>

      <Panel title="Configured mailboxes" padded={false}>
        <DataTable
          columns={["Address", "Transport", "Credentials", "State", "Reputation", "Sent / limit"]}
          rows={mailboxes.map((m) => [
            <span className="font-medium">{m.address}</span>,
            <span className="text-muted-foreground">{m.provider}</span>,
            <span className="text-muted-foreground">{m.auth}</span>,
            <StatePill tone={m.state}>{m.state}</StatePill>,
            <span className="tabular text-muted-foreground">{m.reputation}</span>,
            <span className="tabular text-muted-foreground">{m.daily}</span>,
          ])}
        />
      </Panel>

      <Panel title="Warm-up plan" description="Disabled until a mailbox authenticates">
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            { week: "Week 1", cap: "50 / day" },
            { week: "Week 2", cap: "150 / day" },
            { week: "Week 3", cap: "400 / day" },
            { week: "Week 4", cap: "1,000 / day" },
          ].map((w) => (
            <div key={w.week} className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground">{w.week}</p>
              <p className="tabular mt-1 text-sm font-semibold">{w.cap}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
