# MCP Server Startup Guide

This document provides comprehensive instructions for running various Model Context Protocol (MCP) servers in the ORBIT system.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Available MCP Servers](#available-mcp-servers)
- [Core System Components](#core-system-components)
- [Complete Startup Sequence](#complete-startup-sequence)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Security Notes](#security-notes)

## Prerequisites

- **Python 3.8+** with `uv` package manager installed
- **Node.js 18+** and npm for the frontend and Notion server
- **Go 1.19+** for WhatsApp bridge
- **Git** for version control
- Proper authentication credentials configured in `secrets/` directory

## Environment Setup

Before running any servers, ensure your environment is properly configured:

```bash
# Install Python dependencies
uv sync

# Install frontend dependencies
cd frontend
npm install
cd ..

# Install Notion server dependencies (if using Notion)
cd server/notion
npm install
cd ../..
```

## Available MCP Servers

### 1. Google Tasks Server
Provides access to Google Tasks API for task management.

```bash
uv run -m server.google_tasks.main
```

### 2. Gmail Server
Enables Gmail integration for email operations.

```bash
uv run -m server.gmail.main
```

### 3. WhatsApp Server
Provides WhatsApp messaging capabilities through a Go bridge.

**Step 1: Start the WhatsApp Bridge**
```bash
cd ./server/whatsapp/whatsapp-bridge/
go run main.go
```
> **Note:** If authorization is required, the process will stop and prompt you to scan a QR code. Follow the on-screen instructions to authenticate.

**Step 2: Start the WhatsApp MCP Server**
```bash
uv run -m server.whatsapp.main
```

### 4. Notion Server
Enables Notion workspace integration.

```powershell
$env:NOTION_API_TOKEN='ntn_...'
node ./server/notion/build/index.js
```

## Core System Components

### WebSocket Server
The WebSocket server handles real-time communication between components.

```bash
uv run websocket_server.py
```

### Frontend Development Server
The Next.js frontend provides the user interface.

```bash
cd frontend
npm run dev
```

## Complete Startup Sequence

### Option 1: Manual Startup (Recommended for Development)

1. **Start WebSocket Server** (Required first)
   ```bash
   uv run websocket_server.py
   ```

2. **Start Frontend** (Required second)
   ```bash
   cd frontend
   npm run dev
   ```

3. **Start MCP Servers** (As needed)
   ```bash
   # Google Tasks
   uv run -m server.google_tasks.main
   
   # Gmail
   uv run -m server.gmail.main
   
   # WhatsApp (two-step process)
   cd .\server\whatsapp\whatsapp-bridge\
   go run main.go
   # In another terminal:
   uv run -m server.whatsapp.main
   
   # Notion
   $env:NOTION_API_TOKEN='ntn_...'
   node .\server\notion\build\index.js
   ```

### Option 2: Automated Startup

TBD

## Troubleshooting

### Common Issues

1. **Authentication Errors**: 
   - Ensure all required credentials are in the `secrets/` directory
   - Check that `credentials.json` and `google-auth.pickle` exist for Google services
   - Verify Notion API token is valid and has proper permissions

2. **Port Conflicts**: 
   - WebSocket server typically runs on port 8765
   - Frontend dev server runs on port 3000
   - Check `netstat -an` to identify port conflicts

3. **Missing Dependencies**: 
   - Run `uv sync` for Python dependencies
   - Run `npm install` in `frontend/` and `server/notion/` directories
   - Ensure Go modules are up to date in WhatsApp bridge

4. **WebSocket Connection Issues**:
   - Ensure WebSocket server is running before starting frontend
   - Check firewall settings
   - Verify network connectivity

5. **WhatsApp Authentication**:
   - QR code must be scanned within 60 seconds
   - Ensure phone has stable internet connection
   - Check WhatsApp Web is not open elsewhere

### Debug Commands

```bash
# Check if servers are running
netstat -an | findstr :8765  # WebSocket server
netstat -an | findstr :3000  # Frontend server

# View real-time logs
Get-Content .\logs\orbit_websocket.log -Wait

# Test individual components
uv run -c "import server.gmail.main; print('Gmail server OK')"
node -e "console.log('Node.js OK')"
go version
```

### Logs

Server logs are stored in the `logs/` directory:
- `orbit_websocket.log` - WebSocket server logs
- Individual MCP server logs (if configured)

```bash
# View recent logs
Get-Content .\logs\orbit_websocket.log -Tail 50
```

## Configuration

### Environment Variables

Set these environment variables as needed:

```powershell
# Notion Integration
$env:NOTION_API_TOKEN='your_notion_token_here'

# Optional: Custom ports
$env:WEBSOCKET_PORT='8765'
$env:FRONTEND_PORT='3000'
```

### Tool Registry

The system uses `config/tool_registry.json` to manage available tools and their configurations. Modify this file to enable/disable specific MCP servers.

## Security Notes

⚠️ **Important Security Considerations:**

1. **API Tokens**: Never commit real API tokens to version control
2. **Credentials**: Store sensitive data in `secrets/` directory (gitignored)
3. **Network**: Ensure WebSocket server is not exposed to public internet
4. **Updates**: Regularly update dependencies for security patches

**Environment Variable Best Practices:**
```powershell
# Create a .env file or use PowerShell profile
$env:NOTION_API_TOKEN='ntn_your_actual_token_here'
# Never use the example token in production
```  