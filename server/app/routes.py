from flask import Blueprint, jsonify, current_app
import random
import time
import subprocess
import os

api_bp = Blueprint('api', __name__)

@api_bp.route('/status')
def get_status():
    # Simulated Chaos: Occasionally add delay
    if random.random() < 0.1:
        current_app.logger.info("Simulating latency spike")
        time.sleep(0.5)

    return jsonify({
        "status": "operational",
        "system": {
            "cpu": random.randint(5, 45),
            "memory": random.randint(30, 60),
            "uptime_seconds": 3600 + random.randint(0, 500)
        }
    })

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

    return jsonify({
        "version": os.environ.get("APP_VERSION", "1.0.0"),
        "commit": commit_hash,
        "environment": "production" if os.environ.get('RENDER') else "development"
    })
