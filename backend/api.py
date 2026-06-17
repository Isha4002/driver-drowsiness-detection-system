from flask import Flask, jsonify
from flask_cors import CORS
from state import latest_data

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

if __name__ == "__main__":
    app.run(debug=True)
    
    
@app.route("/status")
def status():
    return jsonify(latest_data)