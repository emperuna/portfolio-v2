# ── Build arguments (injected by CI pipeline) ──────────────────────────────────
ARG APP_VERSION=local
ARG APP_BUILD_TIME=unknown

# ── Base image ─────────────────────────────────────────────────────────────────
FROM python:3.11-slim

# ── Non-root user (security baseline) ─────────────────────────────────────────
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

WORKDIR /app

# ── Dependencies (separate layer → cached on source-only changes) ──────────────
COPY --chown=appuser:appgroup requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ── Application source ─────────────────────────────────────────────────────────
COPY --chown=appuser:appgroup . .

# ── Build metadata (from CI args → readable by /api/meta) ─────────────────────
ARG APP_VERSION
ARG APP_BUILD_TIME
ENV APP_VERSION=${APP_VERSION}
ENV APP_BUILD_TIME=${APP_BUILD_TIME}

# ── Runtime environment ────────────────────────────────────────────────────────
ENV FLASK_APP=run.py
ENV PORT=5000

USER appuser

EXPOSE 5000

# ── Health check (uses the existing /health endpoint) ─────────────────────────
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:5000/health')" || exit 1

# ── Start gunicorn ─────────────────────────────────────────────────────────────
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "2", "run:app"]
