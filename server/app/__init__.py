from flask import Flask, jsonify, request, g
from flask_cors import CORS
import logging
import time

from .config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config['START_TIME'] = time.time()

    # Configure logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s [%(levelname)s] %(message)s'
    )
    app.logger.setLevel(logging.INFO)

    # CORS: Restrict to frontend domain in production
    allowed_origins = app.config.get('CORS_ORIGINS', '*')
    CORS(app, resources={r"/api/*": {"origins": allowed_origins}})
    app.logger.info(f"CORS configured for: {allowed_origins}")

    @app.before_request
    def start_timer():
        g.start_time = time.perf_counter()

    @app.after_request
    def log_request(response):
        if request.path.startswith('/api') or request.path == '/health':
            duration_ms = (time.perf_counter() - g.start_time) * 1000
            app.logger.info(
                "%s %s %s %.2fms",
                request.method,
                request.path,
                response.status_code,
                duration_ms
            )
        return response
    # Health Check
    @app.route('/health', methods=['GET', 'HEAD'])
    def health_check():
        if request.method == 'HEAD':
            return ("", 200)
        return jsonify({"status": "healthy"}), 200

    @app.errorhandler(Exception)
    def handle_exception(e):
        app.logger.error(f"Unhandled Exception: {e}", exc_info=True)
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500


    from .routes import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    return app
