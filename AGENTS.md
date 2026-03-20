# AGENTS.md — Codebase Guidelines for AI Agents

This is a **personal DevOps/SRE portfolio** built as a production-style system with live simulation. The portfolio *is* the demo — it exposes real system signals, CI/CD metadata, and architectural thinking.

---

## Project Structure

```
portfolio-v2/
├── client/          # Astro 5 + React 19 frontend
│   ├── src/
│   │   ├── features/   # Feature-sliced modules (hero, about, status, projects)
│   │   ├── components/ # Shared UI components (ui/, layouts/)
│   │   ├── lib/        # API client, types, utilities
│   │   ├── content/    # MDX project case studies
│   │   └── pages/      # Astro routes
│   └── package.json
├── server/          # Python Flask backend API
│   ├── app/
│   │   ├── routes.py              # API endpoints
│   │   ├── config.py              # Simulation config
│   │   └── services/simulation_service.py
│   ├── tests/        # pytest tests
│   └── requirements.txt
└── docs/             # PRD, architecture, design system docs
```

---

## Build / Dev / Test Commands

### Frontend (client/)

```bash
cd client
npm run dev      # Start dev server (Astro)
npm run build    # Production build
npm run preview   # Preview production build
```

No lint/test commands configured. TypeScript strict mode provides type checking.

### Backend (server/)

```bash
cd server
python -m pytest --tb=short -v              # Run all tests
python -m pytest tests/test_api.py -v       # Run single test file
python -m pytest tests/test_api.py::test_health_check -v  # Run single test
python run.py                               # Dev server (port 5000)
```

---

## Tech Stack Summary

| Layer | Frontend | Backend |
|-------|----------|----------|
| Framework | Astro 5 + React 19 | Flask 3.0 |
| Styling | Tailwind CSS v4 (Vite plugin) | — |
| State | Nanostores + @nanostores/react | — |
| Animation | Framer Motion 12 | — |
| Content | MDX via @astrojs/mdx | — |
| Data Fetching | SWR 2 + custom polling | — |
| Language | TypeScript (strict) | Python 3.11 |

---

## Import Conventions

### TypeScript / Astro

Path aliases configured in `tsconfig.json` and `astro.config.mjs`:

```typescript
// Use aliases, not relative paths beyond same-directory
import { MissionControl } from '@features/status/MissionControl';
import { Button } from '@components/ui/Button';
import { getSystemStatus } from '@lib/api';
import type { SystemStatus } from '@lib/types';
```

Import order:
1. React / external libraries
2. Internal aliases (`@features/`, `@components/`, `@lib/`)
3. Local relative imports (same directory only)

### React Components

```tsx
// Standard pattern
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSystemStatus } from './useSystemStatus';
import { TelemetryChart } from './TelemetryChart';
```

### Python (Backend)

```python
# Standard library first
import os
import time
import random
import subprocess

# Third-party
from flask import Blueprint, jsonify, current_app, request

# Local imports
from .services.simulation_service import SimulationService
```

---

## Code Style Guidelines

### Directory Structure Pattern

Frontend follows **feature-sliced design**:

```
src/features/<feature>/
├── <Feature>.tsx       # Main component (PascalCase)
├── use<Feature>.ts      # Hooks (camelCase, use prefix)
├── components/          # Feature-specific subcomponents
└── index.ts             # Re-exports (optional)
```

### React Components

- **Functional components only** — no class components
- Named exports for components, not default exports:
  ```tsx
  export function MissionControl() { ... }
  ```
- Props: Use TypeScript interfaces, define above component
- State: Use `useState` for local, Nanostores atoms for global/shared state
- Animations: Use Framer Motion (`motion.div`, `initial`, `animate`, `transition`)

### Tailwind CSS

This project uses **Tailwind CSS v4** with the Vite plugin. Key design tokens:

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#0f1117` | Page body |
| Surface | `#1c1f26` | Cards, panels |
| Primary | `#6366f1` | CTAs, active elements |
| Success | `#22c55e` | Healthy status |
| Warning | `#eab308` | Degraded state |
| Danger | `#ef4444` | Errors, outages |
| Text Primary | `#f8fafc` | Headings |
| Text Muted | `#94a3b8` | Labels, secondary |

Common patterns:
- Glassmorphism: `backdrop-blur-md bg-opacity-50`
- Panels: `bg-[#08080a] border border-white/5 rounded-sm shadow-xl`
- Monospace data: `font-mono text-[10px] uppercase tracking-widest`

### TypeScript Types

Define shared types in `client/src/lib/types.ts`:

```typescript
export type SystemHealth = 'healthy' | 'degraded' | 'offline';

export interface SystemConfig {
  debug_mode: boolean;
  traffic_level: 'low' | 'high' | 'surge';
  sim_mode: 'standard' | 'maintenance' | 'offline';
}
```

Use strict typing — avoid `any`. Union types for finite states.

### Python / Flask

- Blueprints for route organization (`api_bp`)
- Config class with environment variable fallbacks
- Logging via `current_app.logger`
- Tests use pytest fixtures with Flask test client

---

## Naming Conventions

| Context | Convention | Example |
|---------|------------|---------|
| React components | PascalCase | `MissionControl`, `TelemetryChart` |
| React hooks | camelCase, use prefix | `useSystemStatus` |
| TypeScript files | PascalCase for components | `MissionControl.tsx` |
| Hook files | camelCase, use prefix | `useSystemStatus.ts` |
| Python files | snake_case | `simulation_service.py` |
| Python functions | snake_case | `get_system_metrics` |
| Environment vars | SCREAMING_SNAKE | `SIM_CPU_MIN`, `CORS_ORIGINS` |
| CSS classes | Tailwind utilities | Use inline classes |

---

## Error Handling

### Frontend

- API client throws on `!response.ok`:
  ```typescript
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }
  ```
- Let errors propagate to React error boundaries or fail silently in polled hooks

### Backend

- Use `current_app.logger.warning()` for recoverable errors
- Return `jsonify()` for all responses — no HTML error pages
- Subprocess errors: catch `SubprocessError` and `FileNotFoundError` explicitly

---

## Key Files to Understand

| File | Purpose |
|------|---------|
| `client/src/lib/api.ts` | Typed API client wrappers |
| `client/src/lib/types.ts` | Shared TypeScript interfaces |
| `server/app/routes.py` | All API endpoints |
| `server/app/config.py` | Simulation parameters |
| `server/app/services/simulation_service.py` | Deterministic metric generation |
| `docs/design_system.md` | Visual design tokens and patterns |

---

## Important Notes

- **No linting configured** — rely on TypeScript strict mode and visual review
- **No frontend tests** — confidence via TypeScript + manual testing
- **Backend tests in `server/tests/`** — use pytest
- **MDX projects** in `client/src/content/projects/` — frontmatter uses `incident_id`, `impact_level`, `root_cause`
- **Backend stores config in-memory** — changes to `/api/config` persist only until restart
- **Time-bucket seeding** (`time.time() // 30`) keeps metrics stable for 30-second windows