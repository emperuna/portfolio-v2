# Architecture Overview

This portfolio is intentionally small but structured with a lean Clean Architecture to keep responsibilities clear and code changes low-risk.

## Goals

- Keep UI code focused on rendering.
- Centralize application behavior (polling, orchestration).
- Keep domain rules pure and reusable.
- Isolate infrastructure details (HTTP, env) from UI.

## Layered Structure (Frontend)

```
Presentation  -> Application -> Domain
                     ^           ^
                     |           |
               Infrastructure ----
```

### Presentation
- **Location:** `client/src/presentation`
- **Role:** UI components, pages, and feature composition.
- **Rules:** Must not call `fetch` or read `import.meta.env` directly.

### Application
- **Location:** `client/src/application`
- **Role:** State orchestration and hooks (e.g., polling).
- **Rules:** Can call infrastructure, but should not depend on UI.

### Domain
- **Location:** `client/src/domain`
- **Role:** Pure types and rules (no framework, no side effects).
- **Rules:** No imports from presentation or infrastructure.

### Infrastructure
- **Location:** `client/src/infrastructure`
- **Role:** HTTP client, API adapters, env access.
- **Rules:** No UI imports.

## Folder Map

```
client/src/
  application/
    hooks/
    state/
  domain/
    contracts/
    entities/
    rules/
  infrastructure/
    api/
    env/
    http/
  presentation/
    components/
    features/
  shared/
    utils/
  pages/
  layouts/
  styles/
```

## Dependency Rules (TL;DR)

- Presentation -> Application -> Domain
- Infrastructure is only used by Application (or other infrastructure code).
- Domain has zero framework or IO dependencies.

## Key Data Flow: System Status

1. UI calls `useSystemStatus()` from `application/hooks`.
2. Hook starts polling via `initSystemMonitor()` (ref-counted).
3. Application calls `infrastructure/api/systemApi`.
4. Response is normalized by `domain/rules/systemStatus`.
5. Nanostore updates and UI re-renders.

## Aliases

Configured in `client/tsconfig.json` and `client/astro.config.mjs`:

- `@presentation/*`
- `@application/*`
- `@domain/*`
- `@infrastructure/*`
- `@shared/*`

Use these to avoid deep relative paths.

## How To Add A Feature

1. Create UI under `presentation/features/<feature>`.
2. If the feature needs state, add a hook/controller in `application`.
3. Add new types or rules in `domain` as needed.
4. Add API calls in `infrastructure/api`.

## When To Keep It Lean

If a new folder stays empty for multiple changes, remove it until needed. The goal is clarity, not ceremony.
