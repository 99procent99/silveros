# Silver Operations — Replit Notes

## Project overview

This is a TanStack Start + React + TypeScript operations-panel frontend for SilverCall Center,
SilverLeads CRM, SilverMailer, SilverHost, and administration. The Agent Console now includes a
preview browser SIP.js adapter for PJSIP over secure WebSocket/WebRTC, but the rest of the app
still uses static demo data.

## Run commands

```sh
bun install
bun run dev --host 0.0.0.0 --port 5000
bun run build
bun run lint
```

The Replit `Start application` workflow runs the development server on port 5000.

## Important project preferences

- Preserve the existing TanStack Start, TanStack Router, Vite, React, and Tailwind structure.
- Keep provider credentials server-side in environment secrets; never expose or log them.
- Do not claim demo/static data is live.
- PJSIP settings are intentionally session-scoped in the browser for preview testing only; add
  authentication and server-side secret storage before production use.
- Do not edit `src/routeTree.gen.ts` manually.
- Before enabling telephony actions, add authentication, authorization, persistence, and a
  provider-neutral server adapter.

See `PROJECT_STATUS.md`, `ARCHITECTURE.md`, and `TASKS.md` for the current handoff.