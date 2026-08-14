# Silver Operations — Replit Notes

## Project overview

This is a TanStack Start + React + TypeScript operations-panel frontend for SilverCall Center,
SilverLeads CRM, SilverMailer, SilverHost, and administration. The current UI uses static demo
data and intentionally reports providers as disconnected until a real backend is added.

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
- Do not edit `src/routeTree.gen.ts` manually.
- Before enabling telephony actions, add authentication, authorization, persistence, and a
  provider-neutral server adapter.

See `PROJECT_STATUS.md`, `ARCHITECTURE.md`, and `TASKS.md` for the current handoff.