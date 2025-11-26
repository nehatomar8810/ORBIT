import os
import pickle
from googleapiclient.discovery import build
from .config import TOKEN_PATH

def get_gmail_service():
    if not os.path.exists(TOKEN_PATH):
        raise FileNotFoundError("Gmail credentials not found. Please authenticate via gmail_client.py first.")
    
    with open(TOKEN_PATH, 'rb') as token:
        creds = pickle.load(token)
    
    return build('gmail', 'v1', credentials=creds)