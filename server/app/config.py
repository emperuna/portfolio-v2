import os


class Config:
    """
    Central configuration for the application.
    Manages simulation parameters (CPU/Memory ranges, failure rates) and layout settings.
    Most values can be overridden via environment variables for testing or specific deployment scenarios.
    """

    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', '*')

    SIM_BUCKET_SECONDS = int(os.environ.get('SIM_BUCKET_SECONDS', '30'))
    SIM_CPU_MIN = int(os.environ.get('SIM_CPU_MIN', '10'))
    SIM_CPU_MAX = int(os.environ.get('SIM_CPU_MAX', '70'))
    SIM_MEM_MIN = int(os.environ.get('SIM_MEM_MIN', '20'))
    SIM_MEM_MAX = int(os.environ.get('SIM_MEM_MAX', '80'))

    SIM_OFFLINE_RATE = float(os.environ.get('SIM_OFFLINE_RATE', '0.02'))
    SIM_DEGRADED_RATE = float(os.environ.get('SIM_DEGRADED_RATE', '0.12'))

    SIM_LATENCY_CHANCE = float(os.environ.get('SIM_LATENCY_CHANCE', '0.1'))
    SIM_LATENCY_MS = int(os.environ.get('SIM_LATENCY_MS', '500'))

    APP_VERSION = os.environ.get('APP_VERSION', '1.0.0')
    BUILD_TIME = os.environ.get('APP_BUILD_TIME') or os.environ.get('BUILD_TIME') or 'unknown'
    COLD_START_SECONDS = int(os.environ.get('COLD_START_SECONDS', '60'))

    # Visual/Simulation Tweaks
    # These control the "live" feel of the system (traffic intensity, simulation mode).
    # Exposed via /api/config for the frontend deployment panel.
    CONFIG_DEBUG_MODE = os.environ.get('CONFIG_DEBUG_MODE', 'false').lower() == 'true'
    CONFIG_TRAFFIC_LEVEL = os.environ.get('CONFIG_TRAFFIC_LEVEL', 'low')
    CONFIG_SIM_MODE = os.environ.get('CONFIG_SIM_MODE', 'standard')
