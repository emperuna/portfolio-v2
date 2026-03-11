from flask import Blueprint, jsonify, current_app, request
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
    
    # Render natively injects RENDER_GIT_COMMIT during its own builds
    render_commit = os.environ.get('RENDER_GIT_COMMIT')
    
    if render_commit:
        commit_hash = render_commit[:7]
    else:
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
    
    version = current_app.config.get("APP_VERSION", "1.0.0")
    if version == "local" and commit_hash != "unknown":
        # Fall back to commit hash if APP_VERSION wasn't explicitly injected
        version = commit_hash

    return jsonify({
        "version": version,
        "commit": commit_hash,
        "environment": "production" if os.environ.get('RENDER') else "development",
        "build_time": current_app.config.get("BUILD_TIME", "unknown"),
        "uptime_seconds": uptime_seconds,
        "cold_start": cold_start
    })

@api_bp.route('/config', methods=['GET'])
def get_config():
    """
    Returns the current configuration state of the system.
    Used by the frontend to display active settings (like Traffic Level) in the UI.
    """
    return jsonify({
        "config": {
            "debug_mode": current_app.config.get('CONFIG_DEBUG_MODE'),
            "traffic_level": current_app.config.get('CONFIG_TRAFFIC_LEVEL'),
            "sim_mode": current_app.config.get('CONFIG_SIM_MODE')
        }
    })


@api_bp.route('/config', methods=['POST'])
def update_config():
    """
    Updates the runtime simulation configuration.
    Accepts JSON body with optional keys: debug_mode, traffic_level, sim_mode.
    Changes are applied in-memory and affect subsequent /api/status responses.
    """
    data = request.get_json(silent=True) or {}

    allowed_traffic = ('low', 'high', 'surge')
    allowed_sim = ('standard', 'maintenance', 'offline')

    if 'debug_mode' in data:
        current_app.config['CONFIG_DEBUG_MODE'] = bool(data['debug_mode'])

    if 'traffic_level' in data and data['traffic_level'] in allowed_traffic:
        current_app.config['CONFIG_TRAFFIC_LEVEL'] = data['traffic_level']

        # Dynamically adjust simulation ranges based on traffic level
        if data['traffic_level'] == 'low':
            current_app.config['SIM_CPU_MIN'] = 10
            current_app.config['SIM_CPU_MAX'] = 40
            current_app.config['SIM_DEGRADED_RATE'] = 0.05
        elif data['traffic_level'] == 'high':
            current_app.config['SIM_CPU_MIN'] = 40
            current_app.config['SIM_CPU_MAX'] = 80
            current_app.config['SIM_DEGRADED_RATE'] = 0.15
        elif data['traffic_level'] == 'surge':
            current_app.config['SIM_CPU_MIN'] = 70
            current_app.config['SIM_CPU_MAX'] = 99
            current_app.config['SIM_DEGRADED_RATE'] = 0.35

    if 'sim_mode' in data and data['sim_mode'] in allowed_sim:
        current_app.config['CONFIG_SIM_MODE'] = data['sim_mode']

        # Force status overrides based on sim mode
        if data['sim_mode'] == 'maintenance':
            current_app.config['SIM_OFFLINE_RATE'] = 0.0
            current_app.config['SIM_DEGRADED_RATE'] = 1.0  # Always degraded
        elif data['sim_mode'] == 'offline':
            current_app.config['SIM_OFFLINE_RATE'] = 1.0  # Always offline
            current_app.config['SIM_DEGRADED_RATE'] = 0.0
        else:  # standard
            current_app.config['SIM_OFFLINE_RATE'] = 0.02
            current_app.config['SIM_DEGRADED_RATE'] = 0.12

    current_app.logger.info(f"Config updated: {data}")

    return jsonify({
        "status": "success",
        "config": {
            "debug_mode": current_app.config.get('CONFIG_DEBUG_MODE'),
            "traffic_level": current_app.config.get('CONFIG_TRAFFIC_LEVEL'),
            "sim_mode": current_app.config.get('CONFIG_SIM_MODE')
        }
    })
