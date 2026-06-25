import json
import os
from datetime import datetime

FILE_PATH = os.path.join(
    os.path.dirname(__file__),
    "alerts.json"
)

def save_alert(message):

    if not os.path.exists(FILE_PATH):
        with open(FILE_PATH, "w") as f:
            json.dump([], f)

    with open(FILE_PATH, "r") as f:
        alerts = json.load(f)

    alerts.append({
        "event": message,
        "time": datetime.now().strftime("%I:%M:%S %p")
    })

    with open(FILE_PATH, "w") as f:
        json.dump(alerts, f, indent=4) 