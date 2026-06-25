from flask import Flask, jsonify, request
from flask_cors import CORS
from state import latest_data
from flask import send_file
from flask import request
import jwt
import datetime
import bcrypt


import json
import os
from dotenv import load_dotenv
from db import users_collection

from functools import wraps

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        token = request.headers.get("Authorization")

        if not token:
            return jsonify({
                "error": "Token Missing"
            }), 401

        try:

            token = token.replace("Bearer ", "")

            data = jwt.decode(
                token,
                SECRET_KEY,
                algorithms=["HS256"]
            )

            request.username = data["username"]

        except Exception:

            return jsonify({
                "error": "Invalid Token"
            }), 401

        return f(*args, **kwargs)

    return decorated


load_dotenv()
app = Flask(__name__)
SECRET_KEY = os.getenv("SECRET_KEY")
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
    
@app.route("/clear-alerts", methods=["POST"])
def clear_alerts():

    file_path = os.path.join(
        os.path.dirname(__file__),
        "alerts.json"
    )

    with open(file_path, "w") as file:
        json.dump([], file)

    return jsonify({
        "message": "Alerts Cleared"
    })


@app.route("/settings")
def get_settings():

    file_path = os.path.join(
        os.path.dirname(__file__),
        "settings.json"
    )

    if not os.path.exists(file_path):

        default_settings = {
            "ear_threshold": 0.20,
            "alarm_enabled": True
        }

        with open(file_path, "w") as file:
            json.dump(default_settings, file)

        return jsonify(default_settings)

    with open(file_path, "r") as file:
        data = json.load(file)

    return jsonify(data)


@app.route("/settings", methods=["POST"])
def save_settings():

    data = request.json

    file_path = os.path.join(
        os.path.dirname(__file__),
        "settings.json"
    )

    with open(file_path, "w") as file:
        json.dump(data, file)

    return jsonify({
        "message": "Settings Saved"
    })


@app.route("/latest-screenshot")
def latest_screenshot():

    folder = os.path.join(
        os.path.dirname(__file__),
        "screenshots"
    )

    if not os.path.exists(folder):
        return jsonify({
            "image": None
        })

    files = sorted(
        [
            f for f in os.listdir(folder)
            if f.endswith(".jpg")
        ],
        reverse=True
    )

    if not files:
        return jsonify({
            "image": None
        })

    return jsonify({
        "image": files[0]
    })
    
@app.route("/register", methods=["POST"])
def register():
    
    print("REGISTER API CALLED")

    data = request.json

    print(data)

    data = request.json

    username = data.get("username")
    password = data.get("password")

    if users_collection.find_one({"username": username}):

        return jsonify({
            "error": "Username already exists"
        }), 400

    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
        
    )
    
    print("Saving user:", username)
    
    users_collection.insert_one({
        
        "username": username,
        "password": hashed_password.decode("utf-8")

})

    return jsonify({
        "message": "Registration Successful"
    })
    
@app.route("/login", methods=["POST"])
def login():

    data = request.json

    username = data.get("username")
    password = data.get("password")

    user = users_collection.find_one({
        "username": username
    })

    if user and bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"].encode("utf-8")
    ):

        token = jwt.encode(
            {
                "username": username,
                "exp": datetime.datetime.utcnow()
                + datetime.timedelta(hours=12)
            },
            SECRET_KEY,
            algorithm="HS256"
        )

        return jsonify({
            "token": token,
            "username": username
        })

    return jsonify({
        "error": "Invalid Credentials"
    }), 401
    
    


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)