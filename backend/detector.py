from scipy.spatial import distance

def EAR(eye):
    A = distance.euclidean(eye[1], eye[5])
    B = distance.euclidean(eye[2], eye[4])
    C = distance.euclidean(eye[0], eye[3])
    return (A + B) / (2.0 * C)

def MAR(top, bottom, left, right):
    vertical = distance.euclidean(top, bottom)
    horizontal = distance.euclidean(left, right)
    return vertical / horizontal