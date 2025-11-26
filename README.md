# ORBIT - AI Agent WebSocket Server

ORBIT is a FastAPI-based WebSocket server that integrates with a React frontend to provide real-time AI agent interactions. The project includes Gmail and Google Tasks integration through MCP (Model Context Protocol) servers.

## Prerequisites

- Python 3.13 or higher
- Node.js 18+ and npm
- [UV](https://docs.astral.sh/uv/) package manager
- Google API credentials (for Gmail and Tasks integration)

## Installation

### 1. Install UV

If you don't have UV installed, install it first:

**Windows (PowerShell):**
```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**macOS/Linux:**
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### 2. Clone and Setup Python Environment

```bash
# Clone the repository (if not already done)
cd ORBIT

# Create virtual environment and install Python dependencies
uv sync
```

This will automatically:
- Create a virtual environment
- Install all Python dependencies from `pyproject.toml`
- Lock dependencies in `uv.lock`

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

## Configuration

### Google API Setup

1. Create a Google Cloud project and enable Gmail and Tasks APIs
2. Download credentials and place them in `secrets/credentials.json`
3. The first run will prompt for OAuth authentication

## Running the Project

You have several options to run the project:

### Option 1: Using UV (Recommended)

**Start the WebSocket Server:**
```bash
uv run python websocket_server.py
```

**Start the Frontend (in a new terminal):**
```bash
cd frontend
npm run dev
```

### Option 2: Using VS Code Tasks

If you're using VS Code, you can use the built-in tasks:

1. Open VS Code in the project directory
2. Use `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS)
3. Type "Tasks: Run Task" and select:
   - "Start WebSocket Server" - Starts the Python backend
   - "Start Frontend Dev Server" - Starts the React frontend

### Option 3: Using Batch Scripts

**Windows:**
```powershell
.\start_servers.ps1
```

**Or using Command Prompt:**
```cmd
start_servers.bat
```

## Development

### Running with UV in Development Mode

```bash
# Install development dependencies
uv add --dev pytest black flake8

# Run the server with auto-reload
uv run uvicorn websocket_server:app --reload --host 0.0.0.0 --port 8000

# Run tests (when available)
uv run pytest

# Format code
uv run black .

# Lint code
uv run flake8 .
```

### Adding New Dependencies

**Python packages:**
```bash
# Add a new dependency
uv add package-name

# Add a development dependency
uv add --dev package-name

# Update all dependencies
uv sync --upgrade
```

**Frontend packages:**
```bash
cd frontend
npm install package-name
```

## Architecture

For a detailed explanation of the project's architecture and API design, see the following documents:

- [Architectural Document](ARCHITECTURE.md)
- [API and WebSocket Design](API_DESIGN.md)

## Project Structure

```
ORBIT/
├── client/                 # Python client and agent logic
├── server/                 # MCP servers (Gmail, Google Tasks)
├── frontend/               # Next.js React frontend
├── config/                 # Configuration files
├── secrets/                # API credentials (gitignored)
├── logs/                   # Application logs
├── pyproject.toml          # Python project configuration
├── uv.lock                 # UV lock file
├── websocket_server.py     # Main FastAPI WebSocket server
└── README.md              # This file
```

## API Endpoints

- **WebSocket**: `ws://localhost:8000/ws` - Main WebSocket connection for real-time communication
- **Health**: `http://localhost:8000/health` - Health check endpoint
- **Frontend**: `http://localhost:3000` - React frontend (development)

## Environment Variables

Create a `.env` file in the root directory with:

```env
# Optional: Custom port for WebSocket server
PORT=8000

# Optional: Log level
LOG_LEVEL=INFO
```

## Troubleshooting

### Common Issues

1. **Python version mismatch**: Ensure you have Python 3.13+ installed
2. **UV not found**: Make sure UV is properly installed and in your PATH
3. **Permission errors**: On Windows, you might need to run PowerShell as Administrator
4. **Port already in use**: Change the port in the configuration or kill the process using the port

### Logs

Check the application logs in the `logs/` directory:
- `logs/orbit_websocket.log` - WebSocket server logs

### Resetting Environment

If you encounter dependency issues:

```bash
# Remove the virtual environment
uv clean

# Reinstall everything
uv sync
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests and linting: `uv run pytest && uv run black . && uv run flake8 .`
5. Commit your changes: `git commit -am 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request
