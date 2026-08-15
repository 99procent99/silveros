# Silver Operations

Silver Operations is an operations-panel frontend for a planned call center, leads CRM,
mailer, hosting, and administration product. The current repository is an imported Lovable
project and is an MVP UI prototype: pages render realistic demo data, while provider actions
are intentionally shown as disconnected instead of pretending to have succeeded.

## Current state

The dashboard runs in Replit and builds successfully. SilverCall Center screens exist for
overview, campaigns, hopper/auto-dial, agent console, and call history, but there is currently
no API, database, authentication, or telephony adapter. Asterisk/FreePBX/provider connectivity
is the next major product task.

See [`PROJECT_STATUS.md`](PROJECT_STATUS.md), [`ARCHITECTURE.md`](ARCHITECTURE.md), and
[`TASKS.md`](TASKS.md) for the current handoff and roadmap.

## Technology stack

- TanStack Start and TanStack Router
- React 19 with TypeScript
- Vite and Nitro
- Tailwind CSS 4
- Radix UI primitives and Lucide icons
- TanStack Query is installed for client-side server-state integration, but no live API is wired
- Bun is used for dependency installation and scripts in Replit

There is no database, auth provider, payment provider, storage service, mail provider, or
telephony provider configured in the repository.

## Project structure

```text
src/
  components/       Shared app shell, operations components, and UI primitives
  lib/mock-data.ts  Static demo data used by the current screens
  routes/           TanStack file-based routes
  router.tsx        Router creation and query-client context
  start.ts          TanStack Start middleware, including CSRF protection for server functions
  server.ts         SSR/server entry wrapper with error normalization
  styles.css        Tailwind theme and global styles
public/              Static assets
vite.config.ts       Lovable TanStack/Vite configuration
```

`src/routeTree.gen.ts` is generated; do not edit it manually.

## Setup

Requirements: Node.js 20 and Bun (the Replit environment already provides both).

```sh
bun install
bun run dev --host 0.0.0.0 --port 5000
```

The Replit workflow runs the same development server on port 5000. Useful scripts:

```sh
bun run build       # production client and SSR build
bun run lint        # ESLint
bun run format      # Prettier
```

No environment variables are currently required for the demo UI. Do not add provider
credentials to source control; the future backend should use server-side environment secrets.

## Feature status

### Present in the current UI

- Cross-module live metrics dashboard
- Activity audit-style table using demo records
- SilverCall Center overview, campaigns, hopper, agent console, and call history screens
- SilverLeads CRM overview, lead list, import, and suppression screens
- SilverMailer and SilverHost screens
- Administration screens for integrations, users, roles, and audit
- Responsive sidebar and shared status/notice/table/metric components
- Error handling and CSRF middleware supplied by TanStack Start

### Partial or demo-only

- All metrics, leads, calls, agents, integrations, and audit records are static mock data
- Buttons and provider actions are disabled or explanatory until a real adapter is connected
- Server entry exists for SSR, but no application API or persistence exists

### Planned

- A secure backend and database
- Telephony adapter for the user's Asterisk/FreePBX/provider setup
- Agent presence, call control, call events, recordings, dispositions, and campaign dialing
- Authentication, authorization, audit persistence, and provider configuration