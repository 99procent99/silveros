// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss,
//     tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     VITE_* env injection, @ path alias, React/TanStack dedupe, error logger
//     plugins, and sandbox detection (port/host/strictPort).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts
    server: { entry: "server" },
  },

  vite: {
    server: {
      allowedHosts: [
        "a2d3c22b-5499-4828-bd80-380f923ce6b5-00-3cusensv5eaak.archer.replit.dev",
      ],
    },
  },
});