# API and WebSocket Design

This document outlines the design of the HTTP API and the WebSocket communication protocol used in the ORBIT project.

## 1. HTTP API

### Health Check Endpoint

*   **Endpoint**: `GET /health`
*   **Description**: Provides a simple health check of the WebSocket server.
*   **Success Response (200 OK)**:
    ```json
    {
      "status": "healthy",
      "service": "ORBIT WebSocket Server",
      "active_connections": 1,
      "timestamp": "2023-10-27T10:00:00.000Z"
    }
    ```

## 2. WebSocket Communication

*   **Endpoint**: `ws://localhost:9000/ws`
*   **Description**: The primary endpoint for real-time, bidirectional communication between the client and the AI agent.

### 2.1. Message Format

All messages exchanged over the WebSocket connection are JSON objects with the following base structure:

```json
{
  "type": "event_name",
  "timestamp": "ISO_8601_timestamp",
  "execution_id": "unique_execution_id", // Optional, present in most server-to-client messages
  "data": {
    // Message-specific payload
  }
}
```

### 2.2. Client-to-Server Messages

#### `user_message`

*   **Direction**: Client -> Server
*   **Description**: Sent when the user submits a message to the agent.
*   **Payload (`data`)**:
    *   `content` (string): The text of the user's message.
*   **Example**:
    ```json
    {
      "type": "user_message",
      "content": "What are the top 3 tasks on my to-do list?"
    }
    ```

### 2.3. Server-to-Client Messages

#### `agent_start`

*   **Direction**: Server -> Client
*   **Description**: Sent when the agent begins its initialization process.
*   **Payload (`data`)**:
    *   `message` (string): A message indicating that the agent is starting.
*   **Example**:
    ```json
    {
      "type": "agent_start",
      "timestamp": "...",
      "data": { "message": "Initializing ORBIT Agent..." }
    }
    ```

#### `agent_ready`

*   **Direction**: Server -> Client
*   **Description**: Sent when the agent has successfully initialized and is ready to receive messages.
*   **Payload (`data`)**:
    *   `message` (string): A confirmation that the agent is ready.
*   **Example**:
    ```json
    {
      "type": "agent_ready",
      "timestamp": "...",
      "data": { "message": "Agent initialized successfully" }
    }
    ```

#### `user_input`

*   **Direction**: Server -> Client
*   **Description**: Echoes the user's input back to the client to be displayed in the message history.
*   **Payload (`data`)**:
    *   `message` (string): The user's original message.
*   **Example**:
    ```json
    {
      "type": "user_input",
      "timestamp": "...",
      "execution_id": "...",
      "data": { "message": "What are the top 3 tasks on my to-do list?" }
    }
    ```

#### `agent_thinking`

*   **Direction**: Server -> Client
*   **Description**: Sent when the agent starts processing a user's request.
*   **Payload (`data`)**:
    *   `message` (string): A message indicating that the agent is working.
*   **Example**:
    ```json
    {
      "type": "agent_thinking",
      "timestamp": "...",
      "execution_id": "...",
      "data": { "message": "Processing your request..." }
    }
    ```

#### `tool_called`

*   **Direction**: Server -> Client
*   **Description**: Sent when the agent decides to call a tool.
*   **Payload (`data`)**:
    *   `tool_name` (string): The name of the tool being called.
    *   `description` (string): A description of what the tool is doing.
    *   `arguments` (dict): The arguments passed to the tool.
*   **Example**:
    ```json
    {
      "type": "tool_called",
      "timestamp": "...",
      "execution_id": "...",
      "data": {
        "tool_name": "google_tasks_list_tasks",
        "description": "Executing google_tasks_list_tasks",
        "arguments": { "tasklist_id": "XYZ" }
      }
    }
    ```

#### `tool_executing`

*   **Direction**: Server -> Client
*   **Description**: Sent just before the tool is executed.
*   **Payload (`data`)**:
    *   `tool_name` (string): The name of the tool.
    *   `status` (string): "executing"
*   **Example**:
    ```json
    {
      "type": "tool_executing",
      "timestamp": "...",
      "execution_id": "...",
      "data": {
        "tool_name": "google_tasks_list_tasks",
        "status": "executing"
      }
    }
    ```

#### `tool_result`

*   **Direction**: Server -> Client
*   **Description**: Sent when the tool has finished executing.
*   **Payload (`data`)**:
    *   `tool_name` (string): The name of the tool.
    *   `status` (string): "completed"
    *   `result` (string): A preview or summary of the tool's result.
*   **Example**:
    ```json
    {
      "type": "tool_result",
      "timestamp": "...",
      "execution_id": "...",
      "data": {
        "tool_name": "google_tasks_list_tasks",
        "status": "completed",
        "result": "1. Buy milk\\n2. Finish report..."
      }
    }
    ```

#### `agent_response`

*   **Direction**: Server -> Client
*   **Description**: The final response from the agent to the user's query.
*   **Payload (`data`)**:
    *   `message` (string): The agent's final text response.
    *   `execution_completed` (boolean): `true`
*   **Example**:
    ```json
    {
      "type": "agent_response",
      "timestamp": "...",
      "execution_id": "...",
      "data": {
        "message": "Here are your top 3 tasks: ...",
        "execution_completed": true
      }
    }
    ```

#### `error`

*   **Direction**: Server -> Client
*   **Description**: Sent when an error occurs on the server.
*   **Payload (`data`)**:
    *   `message` (string): A description of the error.
*   **Example**:
    ```json
    {
      "type": "error",
      "timestamp": "...",
      "data": { "message": "Agent processing failed: ..." }
    }
