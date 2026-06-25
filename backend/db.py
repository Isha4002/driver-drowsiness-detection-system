from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["driver_drowsiness"]

users_collection = db["users"]

alerts_collection = db["alerts"]

history_collection = db["history"]

screenshots_collection = db["screenshots"]

print("MongoDB Connected Successfully!")