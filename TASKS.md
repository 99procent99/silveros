# Tasks

## 🔴 Critical

### Confirm the browser can reach the PJSIP WebSocket endpoint

- Verify the user's secure WebSocket URL, PJSIP transport, SIP domain, extension credentials,
  dialplan format, and NAT/ICE settings from the Replit preview.
- Use the existing Integrations form and Agent Console registration flow.
- Acceptance criteria: registration succeeds, microphone permission is granted, and a controlled
  outbound test call has two-way audio.

### Add authentication and authorization before production call control

- Add an identity boundary and role checks for administrators, supervisors, and agents.
- Define which users may configure providers, originate calls, control active calls, and export
  data.
- Acceptance criteria: unauthenticated requests cannot invoke telephony operations and each
  control has an explicit permission.

## 🟠 High Priority

### Move the browser SIP adapter behind a production boundary

- Keep the current SIP.js adapter for preview testing, but add authenticated server-side provider
  configuration and a provider-neutral telephony service for production.
- Add server-side health, agent presence, originate, answer, hangup, hold/resume, transfer, and
  normalized event operations.
- Keep credentials in Replit environment secrets and redact them from errors/logs.
- Acceptance criteria: an adapter health check reports honest connected/disconnected state and
  provider failures are not reported as successful calls.

### Add persistence and audit records

- Choose a supported database and add migrations for users, agents/extensions, provider
  connections, calls, call events, dispositions, and audit events.
- Add idempotency keys for originate requests and provider event handling.
- Acceptance criteria: call history and state survive a restart and every control action is
  attributable to an authenticated user.

### Implement call events and agent state

- Add a server event path (webhook, polling, or provider event stream as appropriate) and
  normalize ringing, answered, completed, failed, held, transferred, and disconnected states.
- Replace static agent/call values in the Call Center routes with server-backed queries. The
  current Agent Console only handles browser-side outbound calls.
- Acceptance criteria: UI state changes only after an adapter-confirmed event.

## 🟡 Medium Priority

### Implement campaign and hopper safety gates

- Connect eligible leads, consent, suppression, timezone, pacing, and retry rules to persisted
  data.
- Add a durable worker/queue for outbound dialing rather than running a loop in a request.
- Acceptance criteria: suppressed or consent-invalid leads cannot be dialed and the hopper pauses
  on configured safety limits.

### Add browser-agent media

- Select and implement the browser audio/signaling path if browser agents are required.
- Include microphone permission, reconnect, device selection, and call teardown behavior.
- Acceptance criteria: an agent can complete a test call with two-way audio through the chosen
  supported path.

### Add automated verification

- Add unit tests for adapter normalization, authorization, idempotency, suppression, and call
  state transitions.
- Add integration tests against a fake telephony adapter before connecting a live PBX.

## 🟢 Low Priority

- Replace remaining static mailer, hosting, lead, and admin demo screens with server-backed
  implementations.
- Add operational dashboards for latency, failure rates, provider events, and worker health.
- Remove or resolve the Vite tsconfig-paths warning after confirming the Lovable config supports
  the native Vite option.

## 🔵 Future

- Multiple telephony providers per workspace with failover.
- Recording storage, retention policies, and playback permissions.
- Advanced campaign analytics, supervisor monitoring, and quality workflows.