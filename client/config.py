import os
from dotenv import load_dotenv

load_dotenv(dotenv_path="./secrets/.env")

SCOPES = [
    'https://www.googleapis.com/auth/tasks',

    'https://www.googleapis.com/auth/gmail.readonly',         # Read only access to Gmail
    'https://www.googleapis.com/auth/gmail.modify',           # Read/write access excluding permanent deletion
    'https://www.googleapis.com/auth/gmail.compose',          # Create and send drafts
    'https://www.googleapis.com/auth/gmail.send',             # Send messages only
    'https://www.googleapis.com/auth/gmail.insert',           # Insert messages only
    'https://www.googleapis.com/auth/gmail.labels',           # Manage labels
    'https://www.googleapis.com/auth/gmail.settings.basic',   # Manage basic settings (filters, forwarding)
    'https://www.googleapis.com/auth/gmail.settings.sharing',
    'https://www.googleapis.com/auth/gmail.metadata',
]
CREDENTIALS_PATH = './secrets/credentials.json'
TOKEN_PATH = './secrets/google-auth.pickle'

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")

MCP_SERVERS = {
    "google-tasks": {
        "url": "http://localhost:8000/mcp",
        "transport": "streamable_http",
    },
    "gmail": {
        "url": "http://localhost:8001/mcp",
        "transport": "streamable_http",
    },
    "notion": {
        "url": "http://localhost:3002/mcp",
        "transport": "streamable_http",
    },
    "whatsapp": {
        "url": "http://localhost:8002/mcp",
        "transport": "streamable_http",
    }
}

MODEL_NAME = "gemini-2.5-pro"