import os
import pandas as pd
import joblib

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

# -----------------------------
# Load Dataset
# -----------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

csv_path = os.path.join(
    BASE_DIR,
    "dataset.csv"
)

data = pd.read_csv(csv_path)

print("\nDataset Preview:")
print(data.head())

# -----------------------------
# Features and Labels
# -----------------------------

X = data[["EAR", "MAR"]]
y = data["LABEL"]

# -----------------------------
# Train Test Split
# -----------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# -----------------------------
# Model
# -----------------------------

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

# -----------------------------
# Training
# -----------------------------

model.fit(X_train, y_train)

# -----------------------------
# Prediction
# -----------------------------

predictions = model.predict(X_test)

# -----------------------------
# Evaluation
# -----------------------------

accuracy = accuracy_score(
    y_test,
    predictions
)

print("\nAccuracy:")
print(f"{accuracy * 100:.2f}%")

print("\nClassification Report:")
print(
    classification_report(
        y_test,
        predictions
    )
)

print("\nConfusion Matrix:")
print(
    confusion_matrix(
        y_test,
        predictions
    )
)

# -----------------------------
# Save Model
# -----------------------------

model_path = os.path.join(
    BASE_DIR,
    "model.pkl"
)

joblib.dump(
    model,
    model_path
)

print("\n✅ Model saved successfully!")
print(f"Location: {model_path}")