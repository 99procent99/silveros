# Architecture

## Overview

The repository currently contains a single TanStack Start web application. It renders a shared
operations shell around file-based routes. Most route components read static records from
`src/lib/mock-data.ts` and use shared components from `src/components/ops`.

There is no application backend service, database, authentication system, or external provider
connection yet. `src/server.ts` is the TanStack Start SSR entry wrapper, not a domain API.

## Frontend

- **Framework:** React 19, TypeScript, TanStack Start, and Vite.
- **Routing:** TanStack Router file-based routes in `src/routes`; `src/routeTree.gen.ts` is
  generated.
- **App shell:** `src/routes/__root.tsx` provides the query client, sidebar, page chrome, outlet,
  error boundary, and toaster.
- **State:** TanStack Query is installed and passed through router context, but the current
  screens mostly render local/static data and do not call a live API.
- **UI:** Tailwind CSS, Radix UI primitives, Lucide icons, and shared operations components
  (`PageHeader`, `Panel`, `Metric`, `DataTable`, `Notice`, and `StatePill`).
- **Call surfaces:** `call.index.tsx`, `call.campaigns.tsx`, `call.hopper.tsx`,
  `call.agents.tsx`, and `call.history.tsx`.

## Backend

No domain backend is implemented. TanStack Start provides the server runtime and SSR entry:

- `src/start.ts` installs error handling and CSRF middleware for future server functions.
- `src/server.ts` delegates requests to the TanStack Start server entry and normalizes catastrophic
  SSR errors.

There are no REST endpoints, server functions, jobs, webhooks, WebSocket/SSE event stream,
telephony service, or persisted business logic in the repository.

## Database

No database technology, schema, migrations, tables, collections, or data-access layer is present.
All visible records are static values in `src/lib/mock-data.ts`.

## External Services

No external service is configured. The UI names intended future integrations:

- Asterisk/FreePBX/provider telephony for calls and agent presence
- SMTP/API mail provider
- DNS/hosting provider
- Lead intake API

These are currently represented as disconnected or demo states only. No credentials are present
or required by the current UI.

## Data Flow

Current flow:

```text
Browser request
  -> TanStack Start SSR/server entry
  -> TanStack Router route
  -> React component
  -> static demo data module
  -> rendered operations UI
```

Planned call flow:

```text
Agent browser
  -> authenticated Silver Operations API/server function
  -> provider-neutral telephony service
  -> Asterisk/FreePBX/provider interface
  -> normalized call event/presence result
  -> database + audit log
  -> browser query/event update
```

The planned flow must keep PBX credentials and provider control on the server.

## Authentication & Authorization

Authentication and authorization are not implemented. The existing CSRF middleware protects
future TanStack server functions from cross-site requests, but it is not an identity or
permission system.

## Deployment

The Replit development workflow runs `bun run dev --host 0.0.0.0 --port 5000` as a web preview.
The Vite/Nitro configuration can produce a production build. A production deployment target and
runtime services for a future backend have not been configured.

## Important Architectural Decisions

- Preserve TanStack Start and its file-based routing; the imported project does not need a
  framework migration.
- Keep provider states honest: disconnected/demo actions must not be rendered as successful.
- Keep external credentials server-side and normalize provider-specific behavior behind an
  adapter rather than coupling route components directly to Asterisk or a vendor.
- Treat `src/routeTree.gen.ts` as generated output.

## Potential Architectural Problems

- The lack of persistence, identity, and a server API means the current UI cannot safely perform
  real telephony operations.
- A browser-agent experience will require a deliberate media/signaling choice; an AMI/ARI
  control connection alone does not automatically provide browser audio.
- Long-running call events and provider webhooks will need durable event handling and idempotency
  before production use.