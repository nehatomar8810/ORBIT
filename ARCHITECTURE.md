# ORBIT Architectural Document

## 1. High-Level Overview

ORBIT is a real-time, interactive AI agent platform designed to assist users with various tasks by integrating with external services like Google Tasks, Gmail, Notion, and WhatsApp. The architecture is based on a microservices-like pattern, with a central WebSocket server orchestrating communication between a web-based frontend and a set of backend MCP (Model Context Protocol) servers.

The system is designed to be extensible, allowing for the easy addition of new tools and capabilities by creating new MCP servers.

## 2. Architectural Diagram

```
+-----------------+      +---------------------+      +--------------------+
|                 |      |                     |      |                    |
|  Frontend       |      |  WebSocket Server   |      |  AI Agent          |
|  (Next.js/React)|<---->|  (FastAPI)          |<---->|  (LangChain/LangGraph)|
|                 |      |                     |      |                    |
+-----------------+      +---------------------+      +--------------------+
                                 |
                                 |
               +-----------------v-----------------+
               |                                   |
               |  Multi-Server MCP Client          |
               |                                   |
               +-----------------v-----------------+
                                 |
       +-------------------------+-------------------------+-------------------------+
       |                         |                         |                         |
+------v------+           +------v------+           +------v------+           +------v------+
|             |           |             |           |             |           |             |
|  Gmail MCP  |           |  Tasks MCP  |           |  Notion MCP |           | WhatsApp MCP|
|  Server     |           |  Server     |           |  Server     |           |  Server     |
|             |           |             |           |             |           |             |
+-------------+           +-------------+           +-------------+           +-------------+
```

## 3. Component Breakdown

### 3.1. Frontend

*   **Framework**: Next.js with React
*   **Location**: `frontend/`
*   **Description**: The frontend provides the user interface for interacting with the AI agent. It establishes a WebSocket connection to the central server and provides a real-time chat interface. It is responsible for:
    *   Sending user messages to the WebSocket server.
    *   Receiving and displaying real-time updates from the agent, including status messages, tool usage, and final responses.
    *   Managing the UI state (e.g., connection status, processing state).

### 3.2. WebSocket Server

*   **Framework**: FastAPI (Python)
*   **Location**: `websocket_server.py`
*   **Description**: The WebSocket server is the central hub of the application. It manages WebSocket connections from clients and orchestrates the interaction with the AI agent. Its key responsibilities are:
    *   Handling WebSocket connections (`/ws` endpoint).
    *   Instantiating an `ORBITWebSocketAgent` for each client connection.
    *   Receiving messages from clients and passing them to the agent.
    *   Streaming events from the agent back to the client in real-time.
    *   Providing a health check endpoint (`/health`).

### 3.3. AI Agent

*   **Framework**: LangChain with LangGraph (Python)
*   **Location**: `client/agent.py`
*   **Description**: The AI agent is the core logic of the application. It is a ReAct (Reasoning and Acting) agent built with LangChain and LangGraph. Its responsibilities include:
    *   Using a large language model (Google's Gemini 2.5 Pro) to understand user input and reason about the necessary steps to fulfill the request.
    *   Using a system prompt (defined in `client/system_prompt.py`) to set its persona, goals, and constraints.
    *   Dynamically loading tools from the connected MCP servers.
    *   Deciding which tool to use based on the user's request.
    *   Executing tools and processing their output.
    *   Generating a final response for the user.

### 3.4. MCP Servers

*   **Location**: `server/`
*   **Description**: The MCP servers are backend services that provide the tools for the AI agent. Each server is responsible for a specific integration (e.g., Gmail, Google Tasks). This modular design allows for easy addition of new capabilities. The currently configured servers are:
    *   **Google Tasks**: `http://localhost:8000/mcp`
    *   **Gmail**: `http://localhost:8001/mcp`
    *   **Notion**: `http://localhost:3002/mcp`
    *   **WhatsApp**: `http://localhost:8002/mcp`

### 3.5. Authentication and Authorization

*   **Method**: OAuth 2.0 is used for Google services (Gmail and Google Tasks).
*   **Credential Storage**:
    *   `secrets/credentials.json`: The Google Cloud client credentials file. This file is required for the OAuth flow and is not checked into version control.
    *   `secrets/google-auth.pickle`: The generated token file after a successful OAuth authentication. This file is also not checked into version control.
*   **Flow**: On the first run, the application will open a browser window to prompt the user for authentication. Subsequent runs will use the saved token from `secrets/google-auth.pickle`.

### 3.6. Configuration

*   **Agent Configuration**: `client/config.py` contains the configuration for the AI agent, including the list of MCP servers and the name of the language model.
*   **Environment Variables**: The project uses a `.env` file in the `secrets/` directory to store sensitive information like the `GOOGLE_API_KEY`.
*   **Tool Registry**: `config/tool_registry.json` is likely used to register the available tools from the MCP servers.

### 3.7. Logging and Monitoring

*   **Logging**: The WebSocket server uses Python's built-in `logging` module to provide detailed logs.
    *   **Console Logging**: Logs are printed to the console with an `INFO` level.
    *   **File Logging**: Logs are written to `logs/orbit_websocket.log` with a `DEBUG` level. The log file is rotated to prevent it from growing too large.
*   **Health Check**: The `/health` endpoint provides a simple way to monitor the status of the WebSocket server.

## 4. Data Flow

1.  The user types a message in the frontend and clicks "Send".
2.  The frontend sends a JSON message of type `user_message` to the WebSocket server.
3.  The WebSocket server receives the message and passes it to the `ORBITWebSocketAgent` instance associated with that client.
4.  The agent's `chat` method is called. It adds the user's message to the conversation history and invokes the LangGraph agent.
5.  The agent streams events back to the WebSocket server, which are immediately forwarded to the client. These events include:
    *   `agent_thinking`: The agent is processing the request.
    *   `tool_called`: The agent has decided to use a tool.
    *   `tool_executing`: The tool is being executed.
    *   `tool_result`: The tool has finished executing.
6.  The LangGraph agent reasons about the tool's output and may call other tools or generate a final response.
7.  Once the agent has a final response, it sends an `agent_response` event to the client.
8.  The frontend receives the `agent_response` event and displays the final message to the user.

## 5. Key Technologies

*   **Backend**: Python, FastAPI, LangChain, LangGraph, Google Generative AI
*   **Frontend**: TypeScript, React, Next.js
*   **Communication**: WebSockets
*   **Package Management**: `uv` (Python), `npm` (Node.js)

## 6. Scalability and Extensibility

*   **Scalability**: The WebSocket server can be scaled horizontally by running multiple instances behind a load balancer with sticky sessions to ensure that a client remains connected to the same server instance. The MCP servers can also be scaled independently.
*   **Extensibility**: The architecture is highly extensible. New tools and capabilities can be added by creating new MCP servers and adding them to the `MCP_SERVERS` configuration in `client/config.py`. The agent will automatically discover and load the new tools without requiring any changes to the core agent logic.
