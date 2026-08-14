/**
 * Static demo data for the Silver Operations panel.
 * Everything here is clearly labelled as demo/static in the UI —
 * no provider adapter is connected in this build.
 */

export type StateTone = "connected" | "pending" | "failed" | "disconnected" | "demo" | "stale";

export const systemStatus = {
  environment: "Preview",
  dataMode: "Demo / static",
  adapters: [
    { name: "Telephony (Asterisk / FreePBX)", state: "disconnected" as StateTone, detail: "No adapter credentials configured" },
    { name: "Mail provider (SMTP / API)", state: "disconnected" as StateTone, detail: "Awaiting server-side configuration" },
    { name: "DNS / hosting provider", state: "disconnected" as StateTone, detail: "Awaiting server-side configuration" },
    { name: "Lead intake API", state: "demo" as StateTone, detail: "Serving static sample batches" },
  ],
};

export const liveMetrics = [
  { label: "Active agents", value: "0 / 12", hint: "Telephony adapter not connected", tone: "disconnected" as StateTone },
  { label: "Calls in progress", value: "—", hint: "Requires connected PBX", tone: "disconnected" as StateTone },
  { label: "Leads in database", value: "48,219", hint: "Demo dataset", tone: "demo" as StateTone },
  { label: "Emails queued", value: "0", hint: "Sending paused — no provider", tone: "disconnected" as StateTone },
];

export const callVolume = [
  { hour: "08", connected: 42, failed: 8 },
  { hour: "09", connected: 96, failed: 14 },
  { hour: "10", connected: 128, failed: 19 },
  { hour: "11", connected: 141, failed: 12 },
  { hour: "12", connected: 88, failed: 9 },
  { hour: "13", connected: 74, failed: 15 },
  { hour: "14", connected: 132, failed: 11 },
  { hour: "15", connected: 154, failed: 17 },
  { hour: "16", connected: 118, failed: 10 },
];

export const campaigns = [
  { id: "CMP-1041", name: "EU Renewals Q3", direction: "Outbound", status: "Active", consent: "Explicit opt-in", window: "09:00–17:00 CET", eligible: 3120, suppressed: 288, completed: 1904 },
  { id: "CMP-1039", name: "Warm Callback List", direction: "Outbound", status: "Paused", consent: "Prior business relation", window: "10:00–18:00 CET", eligible: 842, suppressed: 61, completed: 402 },
  { id: "CMP-1032", name: "Inbound Support Queue", direction: "Inbound", status: "Active", consent: "N/A", window: "24/7", eligible: 0, suppressed: 0, completed: 5311 },
  { id: "CMP-1028", name: "US West Reactivation", direction: "Outbound", status: "Draft", consent: "Explicit opt-in", window: "09:00–17:00 PT", eligible: 5620, suppressed: 934, completed: 0 },
];

export const agents = [
  { name: "A. Moreau", ext: "1021", presence: "Offline", queue: "EU Renewals", talkTime: "—", calls: 0 },
  { name: "J. Okafor", ext: "1022", presence: "Offline", queue: "Support", talkTime: "—", calls: 0 },
  { name: "L. Tanaka", ext: "1023", presence: "Offline", queue: "US West", talkTime: "—", calls: 0 },
  { name: "R. Silva", ext: "1024", presence: "Offline", queue: "Support", talkTime: "—", calls: 0 },
];

export const callHistory = [
  { id: "CL-88213", time: "14:52", direction: "Outbound", lead: "Northwind Ltd", number: "+33 1 •• •• •• 21", result: "Completed", disposition: "Callback booked", duration: "4m 12s" },
  { id: "CL-88212", time: "14:47", direction: "Outbound", lead: "Byte Foundry", number: "+44 20 •••• 8841", result: "Failed", disposition: "No answer", duration: "0m 22s" },
  { id: "CL-88211", time: "14:31", direction: "Inbound", lead: "Aurora Systems", number: "+1 415 ••• 0192", result: "Completed", disposition: "Support resolved", duration: "9m 05s" },
  { id: "CL-88210", time: "14:12", direction: "Outbound", lead: "Vela Group", number: "+49 30 ••• 4410", result: "Cancelled", disposition: "Outside calling window", duration: "—" },
  { id: "CL-88209", time: "13:58", direction: "Outbound", lead: "Helix Retail", number: "+34 91 ••• 2277", result: "Completed", disposition: "Not interested", duration: "1m 48s" },
];

export const leads = [
  { id: "LD-40219", name: "Northwind Ltd", contact: "ops@•••••••.com", country: "FR", origin: "Webform", campaign: "EU Renewals Q3", status: "Working", owner: "A. Moreau", value: "€ 12,400", consent: "Opt-in", suppressed: false, age: "12d" },
  { id: "LD-40218", name: "Byte Foundry", contact: "hello@•••••••.io", country: "GB", origin: "Partner list", campaign: "Warm Callback List", status: "New", owner: "Unassigned", value: "€ 4,100", consent: "Prior relation", suppressed: false, age: "3d" },
  { id: "LD-40217", name: "Aurora Systems", contact: "team@•••••••.com", country: "US", origin: "Inbound call", campaign: "—", status: "Customer", owner: "J. Okafor", value: "$ 28,900", consent: "Opt-in", suppressed: false, age: "94d" },
  { id: "LD-40216", name: "Vela Group", contact: "info@•••••••.de", country: "DE", origin: "CSV import", campaign: "US West Reactivation", status: "Blocked", owner: "L. Tanaka", value: "€ 9,750", consent: "Unknown", suppressed: true, age: "41d" },
  { id: "LD-40215", name: "Helix Retail", contact: "sales@•••••••.es", country: "ES", origin: "Webform", campaign: "EU Renewals Q3", status: "Nurture", owner: "R. Silva", value: "€ 2,300", consent: "Opt-in", suppressed: false, age: "22d" },
  { id: "LD-40214", name: "Kestrel Labs", contact: "contact@•••••••.nl", country: "NL", origin: "API intake", campaign: "—", status: "Qualified", owner: "A. Moreau", value: "€ 18,050", consent: "Opt-in", suppressed: false, age: "8d" },
];

export const importBatches = [
  { id: "IMP-2291", file: "eu_renewals_july.csv", rows: 4820, accepted: 4411, duplicates: 288, rejected: 121, state: "Completed", when: "Today 09:14" },
  { id: "IMP-2290", file: "partner_list_v3.csv", rows: 1290, accepted: 0, duplicates: 0, rejected: 0, state: "Awaiting mapping", when: "Today 08:02" },
  { id: "IMP-2287", file: "us_west_q2.csv", rows: 9140, accepted: 8102, duplicates: 712, rejected: 326, state: "Manual review", when: "Yesterday 17:40" },
];

export const suppression = [
  { value: "•••••@northwind-partners.fr", type: "Email", reason: "Unsubscribed", source: "Mailer link", added: "2026-07-28" },
  { value: "+49 30 ••• 4410", type: "Phone", reason: "Do-not-call registry", source: "Compliance import", added: "2026-07-21" },
  { value: "•••••@vela-group.de", type: "Email", reason: "Hard bounce", source: "Provider event", added: "2026-07-19" },
  { value: "+1 415 ••• 8890", type: "Phone", reason: "Verbal opt-out", source: "Agent disposition", added: "2026-07-11" },
];

export const mailboxes = [
  { address: "ops@silver-ops.example", provider: "SMTP relay", auth: "Not configured", state: "disconnected" as StateTone, reputation: "—", daily: "0 / 0" },
  { address: "billing@silver-ops.example", provider: "SMTP relay", auth: "Not configured", state: "disconnected" as StateTone, reputation: "—", daily: "0 / 0" },
  { address: "support@silver-ops.example", provider: "IMAP + SMTP", auth: "Not configured", state: "disconnected" as StateTone, reputation: "—", daily: "0 / 0" },
];

export const mailCampaigns = [
  { id: "MC-512", name: "Renewal reminder — EU", audience: "3,120 recipients", state: "Blocked", detail: "No verified sending domain", opens: "—", clicks: "—" },
  { id: "MC-509", name: "Product update July", audience: "18,402 recipients", state: "Draft", detail: "Template pending review", opens: "—", clicks: "—" },
  { id: "MC-501", name: "Warm-up sequence", audience: "250 recipients", state: "Paused", detail: "Warm-up plan not started", opens: "—", clicks: "—" },
];

export const deliverability = [
  { label: "SPF", state: "failed" as StateTone, detail: "No record published" },
  { label: "DKIM", state: "failed" as StateTone, detail: "Selector not found" },
  { label: "DMARC", state: "failed" as StateTone, detail: "No policy" },
  { label: "Reverse DNS", state: "pending" as StateTone, detail: "Awaiting provider" },
];

export const sites = [
  { name: "silver-ops.example", type: "Hosted page", deployment: "Not deployed", ssl: "None", health: "disconnected" as StateTone, updated: "—" },
  { name: "lp.renewals.example", type: "Landing page", deployment: "Draft", ssl: "None", health: "pending" as StateTone, updated: "Today 10:02" },
  { name: "status.silver-ops.example", type: "Status page", deployment: "Draft", ssl: "None", health: "pending" as StateTone, updated: "Yesterday" },
];

export const domains = [
  { domain: "silver-ops.example", registrar: "Not linked", verification: "Unverified", nameservers: "Unknown", expiry: "—" },
  { domain: "renewals.example", registrar: "Not linked", verification: "Pending TXT", nameservers: "Unknown", expiry: "—" },
];

export const dnsRecords = [
  { host: "@", type: "A", value: "—", ttl: "3600", state: "pending" as StateTone },
  { host: "www", type: "CNAME", value: "—", ttl: "3600", state: "pending" as StateTone },
  { host: "@", type: "TXT", value: "silver-verify=•••••", ttl: "300", state: "pending" as StateTone },
  { host: "mail", type: "MX", value: "—", ttl: "3600", state: "failed" as StateTone },
];

export const deployments = [
  { id: "DEP-771", site: "lp.renewals.example", trigger: "Manual", state: "Blocked", detail: "Provider not connected", when: "Today 10:04" },
  { id: "DEP-770", site: "status.silver-ops.example", trigger: "Manual", state: "Blocked", detail: "Provider not connected", when: "Yesterday 16:31" },
];

export const users = [
  { name: "Dana Whitfield", email: "dana@silver-ops.example", role: "Administrator", modules: "All", status: "Active", lastActive: "2 min ago", created: "2025-11-02" },
  { name: "Amir Haddad", email: "amir@silver-ops.example", role: "Supervisor", modules: "Call, Leads", status: "Active", lastActive: "1 h ago", created: "2026-01-18" },
  { name: "Lena Vogt", email: "lena@silver-ops.example", role: "CRM Operator", modules: "Leads", status: "Active", lastActive: "Yesterday", created: "2026-03-04" },
  { name: "Tomas Reyes", email: "tomas@silver-ops.example", role: "Agent", modules: "Call", status: "Disabled", lastActive: "18 d ago", created: "2026-02-11" },
  { name: "Priya Nair", email: "priya@silver-ops.example", role: "Mail Operator", modules: "Mailer", status: "Active", lastActive: "3 h ago", created: "2026-05-22" },
  { name: "Auditor (shared)", email: "audit@silver-ops.example", role: "Read Only", modules: "All (read)", status: "Active", lastActive: "5 d ago", created: "2026-04-09" },
];

export const roles = [
  "Administrator",
  "Supervisor",
  "Agent",
  "CRM Operator",
  "Mail Operator",
  "Read Only",
] as const;

export const capabilities = [
  "View",
  "Create",
  "Edit",
  "Delete",
  "Import",
  "Export",
  "Call",
  "Send",
  "Campaigns",
  "Integrations",
  "Users",
] as const;

/** Role matrix: true = allowed, false = denied by default. */
export const roleMatrix: Record<(typeof roles)[number], boolean[]> = {
  Administrator: [true, true, true, true, true, true, true, true, true, true, true],
  Supervisor: [true, true, true, false, true, true, true, true, true, false, false],
  Agent: [true, false, true, false, false, false, true, false, false, false, false],
  "CRM Operator": [true, true, true, false, true, true, false, false, false, false, false],
  "Mail Operator": [true, true, true, false, false, true, false, true, true, false, false],
  "Read Only": [true, false, false, false, false, false, false, false, false, false, false],
};

export const auditLog = [
  { id: "AUD-90412", when: "Today 14:58", actor: "dana@silver-ops.example", action: "role.update", target: "lena@silver-ops.example", summary: "Role: Agent → CRM Operator", tone: "info" as const },
  { id: "AUD-90411", when: "Today 14:20", actor: "amir@silver-ops.example", action: "campaign.pause", target: "CMP-1039", summary: "Status: Active → Paused", tone: "warning" as const },
  { id: "AUD-90410", when: "Today 09:16", actor: "lena@silver-ops.example", action: "leads.import", target: "IMP-2291", summary: "4,411 accepted · 121 rejected", tone: "success" as const },
  { id: "AUD-90409", when: "Today 08:44", actor: "system", action: "mailer.send.block", target: "MC-512", summary: "Blocked: unverified sending domain", tone: "destructive" as const },
  { id: "AUD-90408", when: "Yesterday 17:41", actor: "dana@silver-ops.example", action: "user.disable", target: "tomas@silver-ops.example", summary: "Status: Active → Disabled", tone: "warning" as const },
  { id: "AUD-90407", when: "Yesterday 16:31", actor: "dana@silver-ops.example", action: "host.deploy.request", target: "DEP-770", summary: "Blocked: provider not connected", tone: "destructive" as const },
];

export const integrations = [
  { name: "Asterisk / FreePBX", category: "Telephony", state: "disconnected" as StateTone, secrets: "Server-side only", detail: "AMI/ARI host, credentials and dialplan scope required" },
  { name: "VICIdial", category: "Telephony", state: "disconnected" as StateTone, secrets: "Server-side only", detail: "API user, list and campaign mapping required" },
  { name: "SMTP relay", category: "Mail", state: "disconnected" as StateTone, secrets: "Server-side only", detail: "Host, port, auth and sending domain required" },
  { name: "IMAP inbox", category: "Mail", state: "disconnected" as StateTone, secrets: "Server-side only", detail: "Mailbox credentials required" },
  { name: "DNS provider", category: "Host", state: "disconnected" as StateTone, secrets: "Server-side only", detail: "API token with zone scope required" },
  { name: "Lead intake webhook", category: "Leads", state: "demo" as StateTone, secrets: "Signed secret", detail: "Serving static sample payloads in this build" },
];

export const activity = [
  { when: "14:58", who: "Dana Whitfield", what: "changed a role", detail: "Lena Vogt is now CRM Operator", module: "Administration" },
  { when: "14:47", who: "System", what: "recorded a failed call", detail: "CL-88212 · no answer", module: "Call Center" },
  { when: "14:20", who: "Amir Haddad", what: "paused a campaign", detail: "Warm Callback List", module: "Call Center" },
  { when: "09:16", who: "Lena Vogt", what: "committed an import", detail: "eu_renewals_july.csv · 4,411 accepted", module: "Leads" },
  { when: "08:44", who: "System", what: "blocked a send", detail: "MC-512 · unverified sending domain", module: "Mailer" },
  { when: "08:02", who: "Lena Vogt", what: "uploaded a file", detail: "partner_list_v3.csv awaiting column mapping", module: "Leads" },
];
