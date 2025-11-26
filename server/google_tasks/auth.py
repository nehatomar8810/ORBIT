import os
import pickle
from googleapiclient.discovery import build
from .config import TOKEN_PATH

def get_tasks_service():
    if not os.path.exists(TOKEN_PATH):
        raise FileNotFoundError("Google credentials not found. Please authenticate via client.py first.")
    
    with open(TOKEN_PATH, 'rb') as token:
        creds = pickle.load(token)
    
    return build('tasks', 'v1', credentials=creds)