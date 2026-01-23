# Portfolio v2 - Design Definition

> **Product Context**: Systems-Oriented DevOps Portfolio — an operational system, not a marketing page. Exposes system health, deployment state, and architectural decisions.

## 1. Design Goals

- **Operational Realism**: The UI should feel like a **running platform** — observable, imperfect, evolving.
- **Transparency Over Polish**: Failures and trade-offs are visible. No hiding cold starts or free-tier constraints.
- **Systems Over Pages**: Navigation mirrors infrastructure (Services, Status, Projects, Config).
- **Modern SaaS Dashboard**: Clean typography, status pills, card layouts — **avoiding "hacker" clichés**.

## 2. Design System Foundations

### Colors: "Operational Slate"

A professional, **SaaS-inspired** dark theme. Avoid neon greens/matrix terminals.

| Token            | Value (`#hex`) | Usage                                    |
| :--------------- | :------------- | :--------------------------------------- |
| **Background**   | `#0f1117`      | Page body (Dark, not pure black).        |
| **Surface**      | `#1c1f26`      | Cards, modals, panels.                   |
| **Surface-Alt**  | `#252830`      | Hover states on surfaces.                |
| **Primary**      | `#6366f1`      | CTAs, active nav items, primary actions. |
| **Success**      | `#22c55e`      | Healthy status, "Operational" pills.     |
| **Warning**      | `#eab308`      | Degraded, cold-start indicators.         |
| **Danger**       | `#ef4444`      | Errors, outages, critical alerts.        |
| **Text Primary** | `#f8fafc`      | Headings, key data.                      |
| **Text Muted**   | `#94a3b8`      | Labels, secondary info, metadata.        |
| **Border**       | `#2d3139`      | Subtle dividers.                         |

### Status Indicators (Key DevOps Element)

| State       | Color     | Pill Example                       |
| :---------- | :-------- | :--------------------------------- |
| Operational | `success` | `bg-green-500/10 text-green-400`   |
| Degraded    | `warning` | `bg-yellow-500/10 text-yellow-400` |
| Outage      | `danger`  | `bg-red-500/10 text-red-400`       |
| Cold Start  | `muted`   | `bg-slate-700/50 text-slate-400`   |

### Typography

- **Headings**: **Inter** (Variable). Clean, modern sans-serif.
- **Body**: **Inter** (Regular 400, Medium 500).
- **Code/Metrics**: **JetBrains Mono**. For status values, version numbers, endpoint paths like `/health`.

### Spacing

- **Base Unit**: 4px.
- **Card Padding**: `p-4` or `p-6`.
- **Section Gap**: `gap-6` between dashboard sections.

## 3. Core UI Components

### StatusPill (`<StatusPill status="operational" />`)

- Displays system health (Operational, Degraded, Outage).
- Small, uppercase text (`text-xs`), rounded-full, subtle background tint.

### MetricCard (`<MetricCard />`)

- Displays a single metric (e.g., CPU: 42%, RAM: 512MB).
- Contains: Label (muted), Value (large, mono font), optional sparkline/trend icon.
- Border-left colored by status.

### ServiceCard (`<ServiceCard />`)

- Represents a service (Frontend, Backend, Database).
- Contains: Service name, status pill, endpoint, last checked, and a link to details.

### Button (`<Button variant="primary|secondary|ghost" />`)

- **Primary**: Indigo background, white text.
- **Secondary**: `bg-surface-alt`, `text-primary`.
- **Ghost**: Transparent, `text-muted`, `hover:text-primary`.

### Card (`<Card />`)

- `bg-surface`, `border-border`, `rounded-lg`.
- Hover: subtle border lighten, not lift.

## 4. Layout & Interaction Patterns

### Navigation (Header)

- Sticky, `bg-background/80 backdrop-blur`.
- Left: Logo + "Portfolio" text.
- Right: Nav links (Home, Projects, Experience, Status).
- Mobile: Hamburger → slide-out drawer.

### Page Structure

- **Multi-page** (per PRD). Pages: Home, About, Projects, Status, Experience.
- Each page has a clear primary action.

### System Status Mode

- A persistent or collapsible "System Status" bar/section on the homepage or a dedicated `/status` page.
- Shows Backend status, last deployment date, and uptime (from external monitor).

### Motion (Framer Motion)

- Subtle entrance animations (`opacity`, `y`).
- Respect `prefers-reduced-motion`.

## 5. Accessibility & Responsiveness

- **Contrast**: WCAG AA compliant. Status colors chosen for readability.
- **Focus Rings**: `ring-2 ring-primary`.
- **Mobile**: All cards stack; nav becomes drawer.

## 6. Design Decisions (Confirmed)

- **Logo**: Custom geometric logo (generated).
- **Structure**: **Multi-page** application (per PRD).
- **Style**: **Modern SaaS Dashboard** (per PRD).
- **No Hacker Clichés**: No neon green terminals.
