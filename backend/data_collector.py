import csv
import os

FILE_NAME = "dataset.csv"

def save_data(ear, mar, label):
    file_exists = os.path.isfile(FILE_NAME)

    with open(FILE_NAME, "a", newline="") as file:
        writer = csv.writer(file)

        if not file_exists:
            writer.writerow(["EAR", "MAR", "LABEL"])

        writer.writerow([
            round(ear, 4),
            round(mar, 4),
            label
        ])