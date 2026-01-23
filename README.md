# Portfolio v2 — Systems-Oriented DevOps Portfolio

![Build Status](https://img.shields.io/badge/build-passing-success?style=for-the-badge)
![System Status](https://img.shields.io/badge/system-operational-success?style=for-the-badge)
![Astro](https://img.shields.io/badge/astro-%23BC52EE.svg?style=for-the-badge&logo=astro&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

> **"A portfolio that behaves like a production system."**

This is not just a static collection of screenshots. It is a live, observable platform designed to demonstrate **DevOps**, **SRE**, and **Platform Engineering** competencies. It features simulated system metrics, meaningful architectural decisions, and visible deployment pipelines.

## 🏗 System Architecture

The system is composed of a decoupled frontend and backend, designed to mimic a real-world microservices environment.

```mermaid
graph TD
    User((User)) -->|HTTPS| Cloudflare[Cloudflare Pages\n(Frontend)]
    Cloudflare -->|Fetch /status| Render[Render.com\n(Backend API)]

    subgraph Client [Astro + React]
        Store[NanoStore\n(System State)]
        UI[Dashboard UI]
    end

    subgraph Server [Python Flask]
        API[Status API]
        Sim[Chaos Simulator]
    end

    Cloudflare --> Client
    Render --> Server
```

## 🚀 Key Features

- **Operational Realism**: The UI reacts to "System Health" signals (CPU, Memory, Latency) simulated by the backend.
- **Transparency**: Cold starts, errors, and trade-offs are exposed, not hidden.
- **Modern Stack**: Built with **Astro** (for performance) and **Python Flask** (for simplicity and data simulation).
- **Infrastructure as Code**: Deployed via immutable containers and automated pipelines.

## 🛠️ Development

This repository is a **monorepo** containing both client and server applications.

### Quick Start

1.  **Backend (Pulse)**

    ```bash
    cd server
    python3 -m venv venv && source venv/bin/activate
    pip install -r requirements.txt
    python run.py
    # API available at http://localhost:5000
    ```

2.  **Frontend (Dashboard)**
    ```bash
    cd client
    npm install
    npm run dev
    # UI available at http://localhost:4321
    ```

## 📂 Project Structure

- `/client` - Astro + React frontend application.
- `/server` - Python Flask API service.
- `/docs` - Product Requirements (PRD) and Architecture Records (ADRs).
- `/.agent` - Agentic workflows and rule sets.

## 📜 License

MIT © 2026 Jeremy Garin
