from flask import Blueprint, jsonify, current_app
import random
import time
import subprocess
import os

api_bp = Blueprint('api', __name__)

@api_bp.route('/status')
def get_status():
    # Simulated latency spikes (configurable)
    if random.random() < current_app.config.get('SIM_LATENCY_CHANCE', 0.1):
        current_app.logger.info("Simulating latency spike")
        time.sleep(current_app.config.get('SIM_LATENCY_MS', 500) / 1000)

    from .services.simulation_service import SimulationService
    uptime_seconds = int(time.time() - current_app.config.get('START_TIME', time.time()))
    return jsonify(SimulationService.get_system_metrics(current_app.config, uptime_seconds))

@api_bp.route('/meta')
def get_meta():
    commit_hash = "unknown"
    try:
        commit_hash = subprocess.check_output(
            ['git', 'rev-parse', '--short', 'HEAD'],
            stderr=subprocess.DEVNULL
        ).decode('ascii').strip()
    except subprocess.SubprocessError as e:
        current_app.logger.warning(f"Failed to get git commit: {e}")
    except FileNotFoundError:
        current_app.logger.warning("Git not found in PATH")

    uptime_seconds = int(time.time() - current_app.config.get('START_TIME', time.time()))
    cold_start = uptime_seconds < current_app.config.get('COLD_START_SECONDS', 60)

    return jsonify({
        "version": current_app.config.get("APP_VERSION", "1.0.0"),
        "commit": commit_hash,
        "environment": "production" if os.environ.get('RENDER') else "development",
        "build_time": current_app.config.get("BUILD_TIME", "unknown"),
        "uptime_seconds": uptime_seconds,
        "cold_start": cold_start
    })

@api_bp.route('/config')
def get_config():
    """
    Returns the current configuration state of the system.
    Used by the frontend to display active settings (like Traffic Level) in the UI.
    Read-only.
    """
    return jsonify({
        "config": {
            "debug_mode": current_app.config.get('CONFIG_DEBUG_MODE'),
            "traffic_level": current_app.config.get('CONFIG_TRAFFIC_LEVEL'),
            "sim_mode": current_app.config.get('CONFIG_SIM_MODE')
        }
    })
