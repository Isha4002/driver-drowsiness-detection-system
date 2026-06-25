
import os
import cv2
import joblib
import mediapipe as mp
import json

from detector import EAR, MAR
from alarm import play_alarm
from alert_logger import save_alert
from datetime import datetime
from time import time

start_time = time()


def get_threshold():

    try:
        with open("settings.json", "r") as file:
            data = json.load(file)

        return float(
            data.get(
                "ear_threshold",
                0.20
            )
        )

    except:
        return 0.20
    
def alarm_enabled():

    try:

        with open("settings.json", "r") as file:
            data = json.load(file)

        return data.get(
            "alarm_enabled",
            True
        )

    except:
        return True


# --------------------------------
# Load ML Model
# --------------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model.pkl"
)

model = joblib.load(MODEL_PATH)

# --------------------------------
# MediaPipe Setup
# --------------------------------

mp_face_mesh = mp.solutions.face_mesh

face_mesh = mp_face_mesh.FaceMesh(
    max_num_faces=1,
    refine_landmarks=True,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

# --------------------------------
# Webcam
# --------------------------------

cap = cv2.VideoCapture(0)
last_state = "Alert"
closed_frames = 0
start_time = time()


# --------------------------------
# Landmark Indices
# --------------------------------

LEFT_EYE = [33, 160, 158, 133, 153, 144]
RIGHT_EYE = [362, 385, 387, 263, 373, 380]

UPPER_LIP = 13
LOWER_LIP = 14
LEFT_MOUTH = 78
RIGHT_MOUTH = 308

# --------------------------------
# Helper Function
# --------------------------------

def get_point(landmarks, index, w, h):
    point = landmarks[index]
    return (
        int(point.x * w),
        int(point.y * h)
    )

# --------------------------------
# Main Loop
# --------------------------------

while True:

    success, frame = cap.read()

    if not success:
        break

    h, w, _ = frame.shape

    rgb = cv2.cvtColor(
        frame,
        cv2.COLOR_BGR2RGB
    )

    results = face_mesh.process(rgb)

    state = "Alert"

    if results.multi_face_landmarks:

        face_landmarks = (
            results.multi_face_landmarks[0]
        )

        landmarks = (
            face_landmarks.landmark
        )

        # -------------------------
        # Eye Points
        # -------------------------

        left_eye = [
            get_point(
                landmarks,
                idx,
                w,
                h
            )
            for idx in LEFT_EYE
        ]

        right_eye = [
            get_point(
                landmarks,
                idx,
                w,
                h
            )
            for idx in RIGHT_EYE
        ]

        for point in left_eye:
            cv2.circle(
                frame,
                point,
                2,
                (0, 255, 0),
                -1
            )

        for point in right_eye:
            cv2.circle(
                frame,
                point,
                2,
                (0, 255, 0),
                -1
            )

        left_ear = EAR(left_eye)
        right_ear = EAR(right_eye)

        ear = (
            left_ear + right_ear
        ) / 2

        # -------------------------
        # Mouth Points
        # -------------------------

        top = get_point(
            landmarks,
            UPPER_LIP,
            w,
            h
        )

        bottom = get_point(
            landmarks,
            LOWER_LIP,
            w,
            h
        )

        left = get_point(
            landmarks,
            LEFT_MOUTH,
            w,
            h
        )

        right = get_point(
            landmarks,
            RIGHT_MOUTH,
            w,
            h
        )

        cv2.circle(frame, top, 4, (0,0,255), -1)
        cv2.circle(frame, bottom, 4, (0,0,255), -1)
        cv2.circle(frame, left, 4, (0,0,255), -1)
        cv2.circle(frame, right, 4, (0,0,255), -1)

        mar = MAR(
            top,
            bottom,
            left,
            right
        )

       
         # -------------------------
        # ML Prediction
        # -------------------------

        threshold = get_threshold()

        if ear < threshold:
            closed_frames += 1
            
        else:
            closed_frames = 0
            
        if closed_frames > 15:
            state = "Drowsy"
        else:
            state = "Alert"
                
        print(
            "EAR:",
            round(ear, 2),
            "Frames:",
            closed_frames,
            "State:",
            state,
            "Threshold:",
            threshold
            
         )
        # -------------------------
        # Save Live Status
        # -------------------------

        elapsed = int(time() - start_time)
        hours = elapsed // 3600
        minutes = (elapsed % 3600) // 60
        seconds = elapsed % 60
        
        uptime = (
            f"{hours:02d}:"
            f"{minutes:02d}:"
            f"{seconds:02d}"
        )
        
        status_data = {
            "ear": round(float(ear), 2),
            "mar": round(float(mar), 2),
            "state": state,
            "uptime": uptime
        }
        
        with open("status.json", "w") as file:
            json.dump(status_data, file)
            
            
            
        # -------------------------
        # Save History
        # -------------------------

        history_entry = {
            "ear": round(float(ear), 2),
            "mar": round(float(mar), 2)
        }
        history_path = os.path.join(
            BASE_DIR,
            "history.json"
        )
        
        if os.path.exists(history_path):
            
            try:
                with open(history_path, "r") as file:
                  history = json.load(file)
            except:
                history = []
                
        else:
            history = []
            
        history.append(history_entry)
        
        history = history[-20:]
        
        with open(history_path, "w") as file:
          json.dump(history, file)
          
          print("History Saved:", len(history))
                    

        # -------------------------
        # Alarm + Alert Logging
        # -------------------------

    if (
        state == "Drowsy"
        and last_state != "Drowsy"
        ):

        if alarm_enabled():
            play_alarm()

        save_alert("Drowsiness Detected")

        timestamp = datetime.now().strftime(
            "%Y%m%d_%H%M%S"
        )
        
        cv2.imwrite(
            f"screenshots/{timestamp}.jpg",
            frame
        )
        
        last_state = state
        # -------------------------
        # Display EAR
        # -------------------------

        cv2.putText(
            frame,
            f"EAR: {ear:.2f}",
            (20, 40),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (255, 0, 0),
            2
        )

        
        # -------------------------
        # Display MAR
        # -------------------------

        cv2.putText(
            frame,
            f"MAR: {mar:.2f}",
            (20, 80),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (255, 0, 0),
            2
        )

    # -------------------------
    # Display State
    # -------------------------

    color = (
        (0, 255, 0)
        if state == "Alert"
        else (0, 0, 255)
    )

    cv2.putText(
        frame,
        f"STATE: {state}",
        (20, 130),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        color,
        3
    )
    frame_path = os.path.join(
        BASE_DIR,
        "latest_frame.jpg"
    )
    
    print("Saving:", frame_path)

    cv2.imwrite(
        frame_path,
        frame
    )

    cv2.imshow(
        "AI Driver Drowsiness Detection",
        frame
    )

    if (
        cv2.waitKey(1)
        & 0xFF
        == ord("q")
    ):
        break

cap.release()
cv2.destroyAllWindows()