from flask import Flask, jsonify
from flask_cors import CORS
import os
import logging

def create_app():
    app = Flask(__name__)

    # Configure logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s [%(levelname)s] %(message)s'
    )
    app.logger.setLevel(logging.INFO)

    # CORS: Restrict to frontend domain in production
    allowed_origins = os.environ.get(
        'CORS_ORIGINS',
        'http://localhost:4321'  # Default for local dev
    ).split(',')
    CORS(app, origins=allowed_origins)
    app.logger.info(f"CORS configured for: {allowed_origins}")

    # Health Check
    @app.route('/health')
    def health_check():
        return jsonify({"status": "healthy"}), 200

    @app.errorhandler(Exception)
    def handle_exception(e):
        app.logger.error(f"Unhandled Exception: {e}", exc_info=True)
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500


    from .routes import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    return app
