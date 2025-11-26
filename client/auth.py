import os
import pickle
from google.auth.transport.requests import Request
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

from .config import SCOPES, CREDENTIALS_PATH, TOKEN_PATH


def get_google_credentials():
    if not os.path.exists(CREDENTIALS_PATH):
        raise FileNotFoundError(
            f"Credentials file not found at {CREDENTIALS_PATH}. "
            "Please download credentials.json from Google Cloud Console and place it in the secrets/ directory."
        )
    
    creds = None
    if os.path.exists(TOKEN_PATH):
        with open(TOKEN_PATH, 'rb') as token:
            creds = pickle.load(token)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_PATH, SCOPES)
            creds = flow.run_local_server(port=0)
        with open(TOKEN_PATH, 'wb') as token:
            pickle.dump(creds, token)

    return creds


def save_credentials():
    creds = get_google_credentials()
    with open(TOKEN_PATH, 'wb') as token:
        pickle.dump(creds, token)