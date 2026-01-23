# Portfolio v2 - Design Definition

> **Product Context**: Systems-Oriented DevOps Portfolio — an operational system/dashboard.

## 1. Design Goals

- **Operational Realism as Art**: The UI should feel like a **living system**, integrated with system health signals.
- **Data as Texture**: Use data streams, scrolling logs, and topology lines as the primary visual texture instead of 3D models or illustrations.
- **Narrative Infrastructure**: Use scrolling (scrollytelling) to tell the story of a system.
- **Creative Technical**: A "Hacker-Chic" / "Command Center" vibe. **Glassmorphism**, **Monospace Typography**, and **Radiant Glows**.

## 2. Design System Foundations

### Colors: "Operational Slate"

| Token            | Value (`#hex`) | Usage                                    |
| :--------------- | :------------- | :--------------------------------------- |
| **Background**   | `#0f1117`      | Page body (Dark, not pure black).        |
| **Surface**      | `#1c1f26`      | Cards, modals, panels.                   |
| **Primary**      | `#6366f1`      | CTAs, active nav items, primary actions. |
| **Success**      | `#22c55e`      | Healthy status, "Operational" pills.     |
| **Warning**      | `#eab308`      | Degraded, cold-start indicators.         |
| **Danger**       | `#ef4444`      | Errors, outages, critical alerts.        |
| **Text Primary** | `#f8fafc`      | Headings, key data.                      |
| **Text Muted**   | `#94a3b8`      | Labels, secondary info, metadata.        |

### Visual Effects

- **Radiant Glows**: Large, blurred fixed-position circles (indigo/teal) behind content.
- **Abstract Topology**: CSS/SVG grid lines, glowing nodes, and "data rain" backgrounds.
- **Glassmorphism**: `backdrop-blur-md bg-opacity-50` for cards and nav.

### Typography

- **Headings**: **Inter**. Tall x-height.
- **Data/Code**: **JetBrains Mono**. Used heavily for metrics, logs, and labels.

## 3. Core UI Components

### StatusPill (`<StatusPill />`)

- **Style**: HUD-like. Thin border (`border-current`), low opacity background (`bg-opacity-10`), glowing text.

### HudCard (`<HudCard />`)

- **Usage**: Displaying key metrics (Uptime, Commits).
- **Style**: Glassmorphic panel with monospaced data values.

### TerminalWindow (`<TerminalWindow />`)

- **Usage**: "Scrollytelling" element.
- **Style**: Black window with typewriter animation for logs.

### Button (`<Button />`)

- **Primary**: Indigo background, glow on hover.

## 4. Layout & Interaction Patterns

### "The Command Center" (Hero Layout)

- **Centerpiece**: Typographic & Data. No 3D models.
- **Background**: Interactive `HeroBackground` (Topology/Grid).
- **HUD Elements**: `HudCard`s floating loosely.
- **Visual Anchor**: Large monospaced counters.

### "Terminal Scrollytelling" (Project Section)

- **Concept**: As the user scrolls project cards, a sticky `TerminalWindow` types out related commands.

### Navigation (Header)

- **Style**: Floating "Glass Dock".

### System Status Mode

- **Status Bar**: Fixed at bottom (like VS Code).

## 5. Accessibility & Responsiveness

- **Contrast**: WCAG AA.
- **Motion**: `framer-motion` for float and reveal. Disable if `prefers-reduced-motion`.

## 6. Design Decisions (Confirmed)

- **Logo**: Custom geometric logo.
- **Structure**: Multi-page.
- **Style**: **Typographic & Data / Sci-Fi HUD**.
- **Visuals**: No 3D. Emphasize Code/Stats.
