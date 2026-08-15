import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";

import { DataTable, Notice, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { integrations } from "@/lib/mock-data";
import { loadSipProvider, saveSipProvider, type SipProviderConfig } from "@/lib/sip-client";

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
  const [provider, setProvider] = useState<SipProviderConfig>({
    label: "My PJSIP provider",
    websocketUrl: "",
    domain: "",
    username: "",
    password: "",
    displayName: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = loadSipProvider();
    if (existing) setProvider(existing);
  }, []);

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveSipProvider(provider);
    setSaved(true);
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <PageHeader
        eyebrow="Administration"
        title="Integrations"
        description="Configure the browser SIP transport used by the Agent Console. Registration is tested from the console because WebRTC media must be granted by the browser."
        status={{ label: provider.websocketUrl ? "1 configured" : "0 configured", tone: provider.websocketUrl ? "pending" : "disconnected" }}
      />

      <Notice tone="warning">
        Preview mode: these values stay in this browser session so SIP.js can authenticate to your
        provider. Do not use this storage model for a shared production deployment until the
        server-side credentials and authentication layer are added.
      </Notice>

      <Panel
        title="PJSIP over WebRTC"
        description="Your Asterisk/FreePBX server must expose a secure WebSocket transport and allow browser WebRTC media."
      >
        <form className="space-y-5" onSubmit={handleSave}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="sip-label">Connection name</Label>
              <Input
                id="sip-label"
                value={provider.label}
                onChange={(event) => setProvider({ ...provider, label: event.target.value })}
                placeholder="Main office PJSIP"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="sip-websocket">Secure WebSocket URL</Label>
              <Input
                id="sip-websocket"
                type="url"
                required
                value={provider.websocketUrl}
                onChange={(event) => setProvider({ ...provider, websocketUrl: event.target.value })}
                placeholder="wss://pbx.example.com:8089/ws"
              />
              <p className="text-xs text-muted-foreground">
                PJSIP WebSocket transport, normally WSS in a browser. Plain ws:// is blocked on
                an HTTPS Replit preview.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sip-domain">SIP domain / PBX host</Label>
              <Input
                id="sip-domain"
                required
                value={provider.domain}
                onChange={(event) => setProvider({ ...provider, domain: event.target.value })}
                placeholder="pbx.example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sip-username">PJSIP username / extension</Label>
              <Input
                id="sip-username"
                autoComplete="username"
                required
                value={provider.username}
                onChange={(event) => setProvider({ ...provider, username: event.target.value })}
                placeholder="1001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sip-password">PJSIP password</Label>
              <Input
                id="sip-password"
                type="password"
                autoComplete="current-password"
                required
                value={provider.password}
                onChange={(event) => setProvider({ ...provider, password: event.target.value })}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sip-display-name">Display name (optional)</Label>
              <Input
                id="sip-display-name"
                value={provider.displayName}
                onChange={(event) => setProvider({ ...provider, displayName: event.target.value })}
                placeholder="Silver agent"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit">Save for this session</Button>
            {saved ? <StatePill tone="pending">saved in browser session</StatePill> : null}
          </div>
        </form>
      </Panel>

      <Panel title="Available integrations" padded={false}>
        <DataTable
          columns={["Integration", "Category", "State", "Secrets", "Requirements"]}
          rows={integrations.map((i) => [
            <span className="font-medium">{i.name}</span>,
            <span className="text-muted-foreground">{i.category}</span>,
            <StatePill tone={i.name === "Asterisk / FreePBX" && provider.websocketUrl ? "pending" : i.state}>
              {i.name === "Asterisk / FreePBX" && provider.websocketUrl ? "configured" : i.state}
            </StatePill>,
            <span className="text-muted-foreground">
              {i.name === "Asterisk / FreePBX" && provider.websocketUrl ? "Browser session only" : i.secrets}
            </span>,
            <span className="text-muted-foreground">{i.detail}</span>,
          ])}
        />
      </Panel>

      <Panel title="Secret handling">
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• This preview stores the SIP password only in sessionStorage for this browser tab.</li>
          <li>• SIP.js sends it to the configured SIP WebSocket endpoint during registration.</li>
          <li>• Values are not sent to this app's server, logs, exports, or support bundles.</li>
          <li>• Clear the browser session after testing, and use server-side storage before sharing.</li>
        </ul>
      </Panel>
    </div>
  );
}
