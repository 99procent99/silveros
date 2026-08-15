import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Delete, Mic, MicOff, Phone, PhoneOff, Settings2, Wifi, WifiOff } from "lucide-react";

import { DataTable, Notice, PageHeader, Panel } from "@/components/ops/page";
import { StatePill } from "@/components/ops/state-pill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { agents } from "@/lib/mock-data";
import {
  BrowserSipClient,
  getSipErrorMessage,
  loadSipProvider,
  type SipProviderConfig,
  type SipSessionState,
} from "@/lib/sip-client";

export const Route = createFileRoute("/call/agents")({
  head: () => ({
    meta: [
      { title: "Agent Console — SilverCall Center" },
      {
        name: "description",
        content:
          "Agent presence, current call panel, hold, transfer and disposition controls — no control succeeds until the adapter confirms it.",
      },
      { property: "og:title", content: "Agent Console — SilverCall Center" },
      { property: "og:description", content: "Presence, call control and dispositions with adapter-confirmed states." },
    ],
  }),
  component: AgentConsole,
});

function AgentConsole() {
  const clientRef = useRef<BrowserSipClient | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [provider, setProvider] = useState<SipProviderConfig | null>(null);
  const [connectionState, setConnectionState] = useState<"idle" | "connecting" | "connected" | "error">("idle");
  const [callState, setCallState] = useState<SipSessionState>("idle");
  const [number, setNumber] = useState("");
  const [muted, setMuted] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setProvider(loadSipProvider());
    clientRef.current = new BrowserSipClient();
    return () => {
      void clientRef.current?.disconnect();
    };
  }, []);

  const isInCall = callState === "dialing" || callState === "ringing" || callState === "in-call";

  async function connectProvider() {
    if (!provider) return;
    setConnectionState("connecting");
    setMessage("");
    try {
      await clientRef.current?.connect(provider);
      setConnectionState("connected");
      setMessage("SIP registration accepted. You can dial from the number pad.");
    } catch (error) {
      setConnectionState("error");
      setMessage(getSipErrorMessage(error));
    }
  }

  async function disconnectProvider() {
    await clientRef.current?.disconnect();
    setConnectionState("idle");
    setCallState("idle");
    setMessage("SIP session disconnected.");
  }

  async function dial() {
    if (!number) {
      setMessage("Enter a number before dialing.");
      return;
    }
    try {
      await clientRef.current?.dial(
        number,
        (state) => {
          setCallState(state);
          if (state === "ended") setMessage("Call ended.");
        },
        (stream) => {
          if (audioRef.current) {
            audioRef.current.srcObject = stream ?? null;
            if (stream) void audioRef.current.play().catch(() => undefined);
          }
        },
      );
    } catch (error) {
      setCallState("error");
      setMessage(getSipErrorMessage(error));
    }
  }

  async function hangup() {
    await clientRef.current?.endSession();
    setCallState("ended");
  }

  function handlePadPress(digit: string) {
    if (isInCall) {
      const sent = clientRef.current?.sendDtmf(digit);
      setMessage(sent ? `Sent DTMF ${digit}` : "DTMF is not available on this call.");
      return;
    }
    setNumber((current) => `${current}${digit}`);
  }

  function toggleMute() {
    const nextMuted = !muted;
    clientRef.current?.setMuted(nextMuted);
    setMuted(nextMuted);
  }

  const statusTone =
    connectionState === "connected" ? "connected" : connectionState === "error" ? "failed" : "disconnected";

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-6">
      <PageHeader
        eyebrow="SilverCall Center"
        title="Agent Console"
        description="Connect a PJSIP WebSocket endpoint, grant microphone access, and place browser calls with WebRTC."
        status={{
          label:
            connectionState === "connected"
              ? isInCall
                ? callState.replace("-", " ")
                : "registered"
              : "not connected",
          tone: statusTone,
        }}
      />

      <audio ref={audioRef} autoPlay />

      {!provider ? (
        <Notice tone="warning">
          No PJSIP provider is configured. Add your WebSocket URL, SIP domain, extension, and
          password in <Link to="/admin/integrations" className="font-medium underline">Integrations</Link>.
        </Notice>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Panel title="Current call" description={provider?.label ?? "No provider configured"}>
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border bg-muted/30 p-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Destination</p>
                <p className="mt-1 font-mono text-2xl font-semibold">{number || "—"}</p>
              </div>
              <StatePill tone={isInCall ? "connected" : statusTone}>
                {isInCall ? callState.replace("-", " ") : connectionState}
              </StatePill>
            </div>

            {message ? (
              <p className={connectionState === "error" || callState === "error" ? "text-sm text-destructive" : "text-sm text-muted-foreground"}>
                {message}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                {isInCall ? "Audio is routed through the browser microphone and speaker." : "Enter a number and press Dial."}
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              {!isInCall ? (
                <Button onClick={() => void dial()} disabled={connectionState !== "connected" || !number}>
                  <Phone /> Dial
                </Button>
              ) : (
                <Button variant="destructive" onClick={() => void hangup()}>
                  <PhoneOff /> Hang up
                </Button>
              )}
              <Button variant="outline" onClick={toggleMute} disabled={!isInCall}>
                {muted ? <MicOff /> : <Mic />} {muted ? "Unmute" : "Mute"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setNumber("")}
                disabled={isInCall || !number}
              >
                Clear
              </Button>
            </div>
          </div>
        </Panel>

        <Panel title="Number pad" description={isInCall ? "Keys send DTMF tones to the active call" : "Dial a SIP destination"}>
          <div className="space-y-3">
            <Input
              aria-label="Dial number"
              inputMode="tel"
              value={number}
              onChange={(event) => setNumber(event.target.value.replace(/[^\d*#+]/g, ""))}
              disabled={isInCall}
              placeholder="Enter number"
              className="h-12 text-center font-mono text-xl"
            />
            <div className="grid grid-cols-3 gap-2">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((digit) => (
                <Button
                  key={digit}
                  type="button"
                  variant="outline"
                  className="h-12 text-lg font-semibold"
                  onClick={() => handlePadPress(digit)}
                >
                  {digit}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                className="flex-1"
                onClick={() => setNumber((current) => current.slice(0, -1))}
                disabled={isInCall || !number}
              >
                <Delete /> Backspace
              </Button>
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="SIP registration" description="Browser-to-provider WebSocket status">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              {connectionState === "connected" ? <Wifi className="text-success" /> : <WifiOff className="text-muted-foreground" />}
              <span>{provider?.username || "No extension"} @ {provider?.domain || "No PBX domain"}</span>
            </div>
            {connectionState === "connected" ? (
              <Button variant="outline" className="w-full" onClick={() => void disconnectProvider()}>
                Disconnect
              </Button>
            ) : (
              <Button className="w-full" onClick={() => void connectProvider()} disabled={!provider || connectionState === "connecting"}>
                {connectionState === "connecting" ? "Registering…" : "Connect & register"}
              </Button>
            )}
            <Link to="/admin/integrations" className="flex items-center justify-center gap-1 text-xs text-primary hover:underline">
              <Settings2 /> Configure provider
            </Link>
          </div>
        </Panel>

        <Panel className="lg:col-span-2" title="My presence" description="Presence is local until a provider is registered">
          <div className="grid gap-2 sm:grid-cols-4">
            {["Available", "Away", "Busy", "Offline"].map((presence) => (
              <Button
                key={presence}
                variant={presence === "Offline" ? "secondary" : "outline"}
                disabled={connectionState !== "connected" || presence !== "Available"}
                onClick={() => setMessage(`Presence set to ${presence}.`)}
              >
                {presence}
              </Button>
            ))}
          </div>
        </Panel>
      </div>

      <Notice tone="warning">
        This is a browser-side PJSIP/WebRTC connection for preview testing. Call history,
        dispositions, hold/transfer, inbound calls, and server-side audit persistence remain
        disconnected until the backend is added.
      </Notice>

      <Panel title="Team" padded={false}>
        <DataTable
          columns={["Agent", "Extension", "Queue / campaign", "Presence", "Talk time", "Calls today"]}
          rows={agents.map((a) => [
            <span className="font-medium">{a.name}</span>,
            <span className="font-mono text-xs text-muted-foreground">{a.ext}</span>,
            <span className="text-muted-foreground">{a.queue}</span>,
            <StatePill tone={a.ext === provider?.username && connectionState === "connected" ? "connected" : "disconnected"}>
              {a.ext === provider?.username && connectionState === "connected" ? "Available" : a.presence}
            </StatePill>,
            <span className="tabular text-muted-foreground">{a.talkTime}</span>,
            <span className="tabular">{a.calls}</span>,
          ])}
        />
      </Panel>
    </div>
  );
}
