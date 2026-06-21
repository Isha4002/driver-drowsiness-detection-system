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


@app.route("/stats")
def stats():

    alert_count = 0

    alerts_path = os.path.join(
        os.path.dirname(__file__),
        "alerts.json"
    )

    if os.path.exists(alerts_path):
        with open(alerts_path, "r") as file:
            alerts = json.load(file)

        alert_count = len(alerts)

    status_path = os.path.join(
        os.path.dirname(__file__),
        "status.json"
    )

    uptime = "00:00:00"

    if os.path.exists(status_path):
        with open(status_path, "r") as file:
            status = json.load(file)

        uptime = status.get(
            "uptime",
            "00:00:00"
        )

    return jsonify({
        "online": True,
        "model": "Active",
        "alerts": alert_count,
        "uptime": uptime
    })
    
    
@app.route("/screenshots")
def screenshots():

    folder = os.path.join(
        os.path.dirname(__file__),
        "screenshots"
    )

    if not os.path.exists(folder):
        return jsonify([])

    files = []

    for file in os.listdir(folder):

        if (
            file.endswith(".jpg")
            or file.endswith(".png")
        ):
            files.append(file)

    files.sort(reverse=True)

    return jsonify(files)

@app.route("/screenshot/<filename>")
def screenshot(filename):

    file_path = os.path.join(
        os.path.dirname(__file__),
        "screenshots",
        filename
    )

    return send_file(
        file_path,
        mimetype="image/jpeg"
    )
    
@app.route("/analytics")
def analytics():

    history_path = os.path.join(
        os.path.dirname(__file__),
        "history.json"
    )

    alerts_path = os.path.join(
        os.path.dirname(__file__),
        "alerts.json"
    )

    if not os.path.exists(history_path):
        return jsonify({
            "avgEAR": 0,
            "avgMAR": 0,
            "totalAlerts": 0,
            "drowsyPercent": 0
        })

    with open(history_path, "r") as file:
        history = json.load(file)

    avg_ear = sum(
        item["ear"] for item in history
    ) / len(history)

    avg_mar = sum(
        item["mar"] for item in history
    ) / len(history)

    total_alerts = 0

    if os.path.exists(alerts_path):
        with open(alerts_path, "r") as file:
            alerts = json.load(file)

        total_alerts = len(alerts)

    drowsy_count = len(
        [x for x in history if x["ear"] < 0.20]
    )

    drowsy_percent = (
        drowsy_count / len(history)
    ) * 100

    return jsonify({
        "avgEAR": round(avg_ear, 2),
        "avgMAR": round(avg_mar, 2),
        "totalAlerts": total_alerts,
        "drowsyPercent": round(
            drowsy_percent,
            1
        )
    })


if __name__ == "__main__":
    app.run(debug=True)