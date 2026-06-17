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

# --------------------------------
# Load Dataset
# --------------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATASET_PATH = os.path.join(
    BASE_DIR,
    "dataset.csv"
)

data = pd.read_csv(DATASET_PATH)

print("\nDataset Shape:")
print(data.shape)

print("\nFirst 5 Rows:")
print(data.head())

# --------------------------------
# Features & Labels
# --------------------------------

X = data[["EAR", "MAR"]]
y = data["LABEL"]

# --------------------------------
# Train Test Split
# --------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# --------------------------------
# Random Forest
# --------------------------------

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

# --------------------------------
# Train
# --------------------------------

model.fit(X_train, y_train)

# --------------------------------
# Predict
# --------------------------------

predictions = model.predict(X_test)

# --------------------------------
# Evaluation
# --------------------------------

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

# --------------------------------
# Save Model
# --------------------------------

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model.pkl"
)

joblib.dump(
    model,
    MODEL_PATH
)

print("\n✅ Model Saved")
print(MODEL_PATH)