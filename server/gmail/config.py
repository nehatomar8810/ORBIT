import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.join(SCRIPT_DIR, '..', '..')
TOKEN_PATH = os.path.join(PROJECT_ROOT, 'secrets', 'google-auth.pickle')