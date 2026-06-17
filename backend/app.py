import cv2
import mediapipe as mp
from detector import EAR, MAR
from alarm import play_alarm

# --------------------------
# MediaPipe Setup
# --------------------------

mp_face_mesh = mp.solutions.face_mesh

face_mesh = mp_face_mesh.FaceMesh(
    max_num_faces=1,
    refine_landmarks=True,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

# --------------------------
# Webcam
# --------------------------

cap = cv2.VideoCapture(0)

# --------------------------
# Landmark Indices
# --------------------------

LEFT_EYE = [33, 160, 158, 133, 153, 144]
RIGHT_EYE = [362, 385, 387, 263, 373, 380]

UPPER_LIP = 13
LOWER_LIP = 14
LEFT_MOUTH = 78
RIGHT_MOUTH = 308

# --------------------------
# Thresholds
# --------------------------

EAR_THRESHOLD = 0.20
MAR_THRESHOLD = 0.65

eye_counter = 0
yawn_counter = 0

# --------------------------
# Helper Function
# --------------------------

def get_point(landmarks, index, w, h):
    point = landmarks[index]
    return (int(point.x * w), int(point.y * h))

# --------------------------
# Main Loop
# --------------------------

while True:

    success, frame = cap.read()

    if not success:
        break

    h, w, _ = frame.shape

    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    results = face_mesh.process(rgb)

    state = "ALERT"

    if results.multi_face_landmarks:

        face_landmarks = results.multi_face_landmarks[0]
        landmarks = face_landmarks.landmark

        # LEFT EYE
        left_eye = [
            get_point(landmarks, idx, w, h)
            for idx in LEFT_EYE
        ]

        # RIGHT EYE
        right_eye = [
            get_point(landmarks, idx, w, h)
            for idx in RIGHT_EYE
        ]

        # Draw eye points
        for point in left_eye:
            cv2.circle(frame, point, 2, (0, 255, 0), -1)

        for point in right_eye:
            cv2.circle(frame, point, 2, (0, 255, 0), -1)

        # EAR
        left_ear = EAR(left_eye)
        right_ear = EAR(right_eye)

        ear = (left_ear + right_ear) / 2

        # Mouth Points
        top = get_point(landmarks, UPPER_LIP, w, h)
        bottom = get_point(landmarks, LOWER_LIP, w, h)
        left = get_point(landmarks, LEFT_MOUTH, w, h)
        right = get_point(landmarks, RIGHT_MOUTH, w, h)

        cv2.circle(frame, top, 4, (0, 0, 255), -1)
        cv2.circle(frame, bottom, 4, (0, 0, 255), -1)
        cv2.circle(frame, left, 4, (0, 0, 255), -1)
        cv2.circle(frame, right, 4, (0, 0, 255), -1)

        # MAR
        mar = MAR(top, bottom, left, right)

        # Eye Closure Detection
        if ear < EAR_THRESHOLD:
            eye_counter += 1
        else:
            eye_counter = 0

        # Yawning Detection
        if mar > MAR_THRESHOLD:
            yawn_counter += 1
        else:
            yawn_counter = 0

        # Drowsiness State
        if eye_counter > 15:
            state = "EYES CLOSED"
            play_alarm()

        elif yawn_counter > 15:
            state = "YAWNING"
            play_alarm()

        # Display EAR
        cv2.putText(
            frame,
            f"EAR: {ear:.2f}",
            (20, 40),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (255, 0, 0),
            2
        )

        # Display MAR
        cv2.putText(
            frame,
            f"MAR: {mar:.2f}",
            (20, 80),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (255, 0, 0),
            2
        )

    # Display State
    cv2.putText(
        frame,
        state,
        (20, 130),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 0, 255),
        3
    )

    cv2.imshow(
        "Driver Drowsiness Detection",
        frame
    )

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()