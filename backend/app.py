import cv2

# Open Webcam
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("Error: Could not open webcam")
    exit()

while True:
    success, frame = cap.read()

    if not success:
        print("Failed to capture frame")
        break

    cv2.imshow("Driver Drowsiness Detection", frame)

    # Press Q to quit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()