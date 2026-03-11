# CI/CD Workflows

This directory contains the GitHub Actions workflows for continuous integration and continuous deployment of the Portfolio v2 project. The pipelines are divided into two main components: the Client (Frontend) and the Server (Backend).

## Workflows Overview

### 1. Client CI/CD (`client.yml`)

This workflow manages the build and deployment process for the Astro/React frontend.

- **Triggers**: 
  - Push and Pull Requests to the `main` branch that modify files in the `client/**` directory.
- **Concurrency**: 
  - Cancels any in-progress runs on the same branch to save CI minutes.
- **Jobs**:
  - `build`: 
    - Sets up Node.js v20.
    - Installs dependencies using `npm ci` for consistent package versions.
    - Builds the client application (`npm run build`).
    - Uploads the resulting build artifact (`client-dist`).
  - `deploy`: 
    - Only runs after a successful `build` and **only on pushes** to the `main` branch.
    - Downloads the build artifact.
    - Deploys the static assets directly to **Cloudflare Pages** using the Cloudflare API.

**Required Secrets:**
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `GITHUB_TOKEN`

### 2. Server CI/CD (`server.yml`)

This workflow handles the testing and deployment orchestration for the Python Flask backend.

- **Triggers**: 
  - Push and Pull Requests to the `main` branch that modify files in the `server/**` directory.
- **Concurrency**: 
  - Cancels any in-progress runs on the same branch to save CI minutes.
- **Jobs**:
  - `test`: 
    - Sets up Python 3.11.
    - Installs dependencies from `requirements.txt` and `pytest`.
    - Executes the backend test suite using `pytest`.
  - `deploy`: 
    - Only runs after a successful `test` and **only on pushes** to the `main` branch.
    - Triggers a deployment on **Render** by calling an external deploy hook. (Render automatically pulls the repository and builds the Docker container).

**Required Secrets:**
- `RENDER_DEPLOY_HOOK_URL`

## Automation Philosophy

These workflows follow standard DevOps practices:
- **Separation of Concerns**: Client and server have decoupled deployment lifecycles.
- **Fail-Fast**: Code changes must pass validation boundaries (build/test) before any deployment steps are initiated.
- **Immutable Environments**: Direct pushes to production are automated and strictly gated by version control.
