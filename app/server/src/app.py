from flask import Flask, abort, jsonify, request, send_from_directory
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

from src.db import Database
from src.chatbot import sanitize_json_input, gen_message


def create_app():
    app = Flask(__name__, static_folder="public")
    CORS(app)
    limiter = Limiter(
        get_remote_address,
        app=app,
    )

    # Set up the database connection
    db = Database("db.sqlite3")

    # API Routes
    @app.route("/api/search", methods=["POST"])
    @limiter.limit("1/second", override_defaults=True)
    def search():
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON payload"}), 400

        try:
            lat = data["lat"]
            lon = data["lon"]
            distance = data["distance"]
            filters = data.get("filters", {})  # Optional filters
        except KeyError as e:
            return jsonify({"error": f"Missing key: {e.args[0]}"}), 400

        try:
            houses = db.get_houses_near_location(
                lat=lat, lon=lon, distance=distance, **filters
            )
        except Exception as e:
            return jsonify({"error": str(e)}), 500

        return jsonify({"houses": houses})

    @app.route("/api/city/<string:city_name>", methods=["GET"])
    @limiter.limit("1/second", override_defaults=True)
    def get_houses_in_city(city_name):
        try:
            houses = db.get_houses_in_city(city_name)
            return jsonify({"houses": houses})
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @app.route("/api/property/<int:pk>", methods=["GET"])
    def get_house(pk):
        try:
            house = db.get_house(pk)
            if house is None:
                return jsonify({"error": "House not found"}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500

        return jsonify(house)

    @app.route("/api/images/<int:pk>", methods=["GET"])
    def get_image(pk):
        filename = f"{pk}.jpg"
        try:
            # Attempt to send the file from the public folder
            return send_from_directory(app.static_folder, filename)
        except FileNotFoundError:
            # Return a 404 error if the file is not found
            abort(404, description="Image not found")

    @app.route("/api/chat", methods=["POST"])
    @limiter.limit("10/minute", override_defaults=True)
    def chat():
        try:
            data = request.get_json()
            message = data.get("message")
            context = data.get("context", {})
            history = sanitize_json_input(data.get("history", []))

            if not message:
                return jsonify({"error": "Missing message"}), 400

            response = gen_message(message, context, history)
            return jsonify({"response": response})

        except Exception as e:
            print(e)
            return jsonify({"error": str(e)}), 500

    return app


if __name__ == "__main__":
    instance = create_app()
    instance.run(host="0.0.0.0", port=8000)
