from flask import Flask, jsonify
from flask_cors import CORS
from state import latest_data
from flask import send_file


import json
import os

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({
        "message": "Driver Drowsiness Detection API Running"
    })

@app.route("/health")
def health():
    return jsonify({
        "status": "healthy"
    })

@app.route("/alerts")
def alerts():

    file_path = os.path.join(
        os.path.dirname(__file__),
        "alerts.json"
    )

    if not os.path.exists(file_path):
        return jsonify([])

    with open(file_path, "r") as file:
        data = json.load(file)

    return jsonify(data[::-1])


@app.route("/status")
def status():

    file_path = os.path.join(
        os.path.dirname(__file__),
        "status.json"
    )

    if not os.path.exists(file_path):
        return jsonify({
            "ear": 0,
            "mar": 0,
            "state": "Alert"
        })

    with open(file_path, "r") as file:
        data = json.load(file)

    return jsonify(data)

@app.route("/frame")
def frame():

    file_path = os.path.join(
        os.path.dirname(__file__),
        "latest_frame.jpg"
    )

    if os.path.exists(file_path):
        return send_file(
            file_path,
            mimetype="image/jpeg"
        )

    return jsonify({
        "error": "No frame available"
    })
    
@app.route("/alert-count")
def alert_count():

    file_path = os.path.join(
        os.path.dirname(__file__),
        "alerts.json"
    )

    if not os.path.exists(file_path):
        return jsonify({
            "count": 0
        })

    with open(file_path, "r") as file:
        data = json.load(file)

    return jsonify({
        "count": len(data)
    })
    
@app.route("/history")
def history():

    file_path = os.path.join(
        os.path.dirname(__file__),
        "history.json"
    )

    if not os.path.exists(file_path):
        return jsonify([])

    with open(file_path, "r") as file:
        data = json.load(file)

    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)