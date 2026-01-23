# Product Requirements Document (PRD)

## 1. Product Overview

**Product Name:** Portfolio v2 — Systems-Oriented DevOps Portfolio  
**Owner:** Jeremy Garin  
**Primary Goal:** Demonstrate DevOps / SRE / Platform Engineering mindset through a living, system-aware portfolio rather than a static showcase.

This portfolio is designed as an **operational system**, not a marketing page. It exposes system health, deployment state, architectural decisions, and honest retrospectives to signal real-world engineering maturity.

---

## 2. Vision & Principles

### Vision

Create a portfolio that feels like a **running platform** — observable, imperfect, evolving — mirroring how real production systems behave.

### Design Philosophy

- Light Operational Realism — real signals, simulated safely
- Transparency over polish — failures included
- Systems over pages — navigation mirrors infrastructure
- Constraints acknowledged — free tiers, cold starts, trade-offs are visible
- **Visual Style:** Modern SaaS Dashboard (Clean typography, status pills, card layouts) - avoiding "hacker" clichés

---

## 3. Target Users

### Primary User

- Recruiters hiring for **DevOps, SRE, Platform, Infrastructure** roles

### Secondary Users

- Fellow Computer Science students
- Engineering peers and collaborators

---

## 4. User Problems & Use Cases

### Core Problems

- Traditional portfolios fail to show operational thinking
- DevOps skill is hard to demonstrate without production systems

### Key Use Cases

1. As a recruiter, I want to see system health so I can assess operational thinking.
2. As a recruiter, I want to explore projects and infra decisions to understand real-world experience.
3. As a student or peer, I want to learn from both successful and failed projects.

---

## 5. Scope

### In Scope

- Multi-page portfolio application
- Live system status visualization
- Backend service with health and status endpoints
- CI/CD pipeline with visible deployment state
- Project case studies (including failures)

### Out of Scope

- Authentication & user accounts
- Payments or commerce
- Real user data
- Admin dashboards

---

## 6. System Boundaries

### Frontend Responsibilities

- Rendering content and navigation
- Visualizing system health and deployment state
- Interactive configuration toggles

### Backend Responsibilities

- Simulated system status
- Configuration state exposure
- Health check endpoints
- Metadata about deployments

### Explicit Exclusions

- No authentication
- No persistent user data
- No real production metrics

---

## 7. Functional Requirements

### Frontend

- Multi-page navigation (not a one-pager)
- System Status Mode (global visibility)
- Live Configuration Toggles (simulated)
- Project pages with architecture and retrospectives
- Experience, certificates, and links section

### Backend

- `HEAD /health` — uptime monitoring
- `GET /status` — system state payload (Simulated CPU/RAM with randomized fluctuations)
- `GET /meta` — deployment metadata

---

## 8. Non-Functional Requirements

- **Availability:** Best-effort (free-tier acceptable)
- **Performance:** Cold starts acceptable if visible
- **Observability:** External uptime monitoring (Uptimerobot)
- **Security:** Public read-only endpoints only
- **Maintainability:** Simple architecture, minimal dependencies

---

## 9. Technology Stack

### Frontend

- Framework: Astro
- Content Management: Local Markdown/MDX (Astro Content Collections)
- Deployment: Cloudflare Pages
- Interactivity: Astro Islands
- Diagrams: Mermaid (SVG)

### Backend

- Language: Python
- Framework: Flask
- Deployment: Render

### CI/CD

- GitHub Actions
- Automated build and deploy
- Status badges visible in UI

---

## 10. Success Metrics

### Engagement

- Recruiters spend more than 2 minutes on site

### Hiring Signal

- At least one interview mentions infrastructure or system design

### Visibility

- Increase in GitHub profile views or stars

### Operational

- CI/CD pipeline remains green

---

## 11. Risks & Trade-offs

### Risks

- Free-tier instability or downtime
- Simulated metrics misunderstood as production
- Perception of overengineering
- Ongoing maintenance burden

### Trade-offs

| Decision           | Trade-off                      |
| ------------------ | ------------------------------ |
| Flask over FastAPI | Simplicity > scalability       |
| Render over Fly.io | Familiarity > control          |
| Simulated metrics  | Safety > realism               |
| No auth            | Transparency > personalization |
| Multi-page app     | Depth > instant impression     |

---

## 12. Project Evolution

This portfolio is designed as an **evolving platform**:

- New projects added as systems
- Infrastructure choices revisited
- Potential expansion to other platforms (Railway, Fly.io)
- Public ADRs added over time

---

## 13. Open Questions (Deferred)

- Depth of monitoring (logs vs metrics)
- Multi-region simulation
- Automated failure injection

---

## 14. Out-of-Scope (Future Enhancements)

- Real-time dashboards
- Multi-backend comparison
- Advanced observability stacks
- Admin controls
