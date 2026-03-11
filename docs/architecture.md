# Architecture Overview

This portfolio uses a **feature-modular architecture** designed to work with Astro's conventions rather than against them. Features are self-contained, shared code is centralized, and structure scales with complexity.

## Goals

- Keep features self-contained and easy to reason about.
- Centralize shared non-UI code (API client, types, utilities).
- Follow Astro conventions for pages, layouts, and content.
- Avoid architectural overhead that doesn't earn its keep.

## Structure

```
client/src/
├── pages/              # Astro routes
├── layouts/            # Page shells (CreativeLayout)
├── content/            # Astro content collections (MDX)
├── styles/             # Global CSS + Tailwind theme
│
├── features/           # Self-contained feature modules
│   ├── hero/           #   Hero section + sub-components
│   ├── status/         #   Dashboard, hooks, stores
│   ├── control-plane/  #   Config toggle panel
│   ├── about/          #   Activity logs, system specs
│   └── projects/       #   Project cards, exhibit, report index
│
├── components/ui/      # Shared reusable UI primitives
│
└── lib/                # Shared non-UI code
    ├── api.ts          #   API client + endpoint functions
    ├── types.ts        #   All shared type definitions
    ├── env.ts          #   Environment configuration
    └── utils.ts        #   Utility functions (cn, status mappers)
```

## Key Principles

1. **Features own their complexity.** Each feature folder holds its own components, hooks, and state. A complex feature (status) has stores and hooks co-located. A simple feature (about) is just components.

2. **Shared code lives in `lib/`.** The API client, types, and utilities are shared across features. One flat folder, no layered indirection.

3. **Shared UI lives in `components/ui/`.** Reusable primitives like StatusPill, HudCard, and TypewriterText used by multiple features.

4. **Astro conventions stay untouched.** Pages, layouts, content collections, and styles remain where Astro expects them.

## Aliases

Configured in `client/tsconfig.json` and `client/astro.config.mjs`:

- `@features/*`
- `@components/*`
- `@lib/*`
- `@/*` (src root)

## Key Data Flow: System Status

1. Page renders `<MissionControl />` from `features/status/`.
2. Component calls `useSystemStatus()` (co-located hook).
3. Hook starts polling via `initSystemMonitor()` (ref-counted).
4. Store calls `getSystemStatus()` from `lib/api.ts`.
5. Response is normalized by `normalizeSystemHealth()` from `lib/utils.ts`.
6. NanoStore atom updates, component re-renders.

## How To Add A Feature

1. Create a folder under `features/<feature-name>/`.
2. Add components, hooks, and state inside that folder.
3. If you need shared types, add them to `lib/types.ts`.
4. If you need new API calls, add them to `lib/api.ts`.
5. If you need a reusable UI primitive, add it to `components/ui/`.

## When To Split A Feature

If a feature folder exceeds ~8 files, consider extracting sub-folders (e.g., `features/status/components/`). The goal is clarity, not ceremony.
