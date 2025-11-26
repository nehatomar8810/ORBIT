"""
FastAPI WebSocket server for ORBIT Agent
Integrates with the existing React Agent to provide real-time updates
"""
import json
import asyncio
from typing import Dict, Any, List, Union
from datetime import datetime
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn

from langchain_core.messages import HumanMessage, AIMessage, SystemMessage, BaseMessage

from client.agent import ORBITAgent

# Enhanced logging configuration
import logging
from logging.handlers import RotatingFileHandler
import os

# Create logs directory if it doesn't exist
os.makedirs("logs", exist_ok=True)

# Configure logging with both file and console handlers
logger = logging.getLogger("orbit_websocket")
logger.setLevel(logging.DEBUG)

# Console handler
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)
console_formatter = logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
console_handler.setFormatter(console_formatter)

# File handler with rotation
file_handler = RotatingFileHandler(
    "logs/orbit_websocket.log",
    maxBytes=10*1024*1024,  # 10MB
    backupCount=5
)
file_handler.setLevel(logging.DEBUG)
file_formatter = logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(funcName)s:%(lineno)d - %(message)s'
)
file_handler.setFormatter(file_formatter)

# Add handlers to logger
logger.addHandler(console_handler)
logger.addHandler(file_handler)

# Define a connection manager to handle WebSocket connections



class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        logger.info("ConnectionManager initialized")

    async def connect(self, websocket: WebSocket):
        try:
            await websocket.accept()
            self.active_connections.append(websocket)
            client_info = f"{websocket.client.host}:{websocket.client.port}" if websocket.client else "unknown"
            logger.info(f"WebSocket connection established with client {client_info}. Total connections: {len(self.active_connections)}")
        except Exception as e:
            logger.error(f"Failed to establish WebSocket connection: {str(e)}")
            raise

    def disconnect(self, websocket: WebSocket):
        try:
            if websocket in self.active_connections:
                self.active_connections.remove(websocket)
                client_info = f"{websocket.client.host}:{websocket.client.port}" if websocket.client else "unknown"
                logger.info(f"WebSocket connection closed for client {client_info}. Remaining connections: {len(self.active_connections)}")
            else:
                logger.warning("Attempted to disconnect a WebSocket that was not in active connections")
        except Exception as e:
            logger.error(f"Error during WebSocket disconnect: {str(e)}")

    async def send_personal_message(self, message: dict, websocket: WebSocket):
        try:
            message_str = json.dumps(message)
            await websocket.send_text(message_str)
            logger.debug(f"Sent message to client: {message.get('type', 'unknown_type')}")
        except Exception as e:
            client_info = f"{websocket.client.host}:{websocket.client.port}" if websocket.client else "unknown"
            logger.error(f"Failed to send message to client {client_info}: {str(e)}")
            # Remove the problematic connection
            self.disconnect(websocket)

    async def broadcast(self, message: dict):
        if not self.active_connections:
            logger.debug("No active connections for broadcast")
            return
            
        logger.info(f"Broadcasting message of type '{message.get('type', 'unknown')}' to {len(self.active_connections)} connections")
        disconnected_connections = []
        
        for connection in self.active_connections:
            try:
                await connection.send_text(json.dumps(message))
            except Exception as e:
                logger.warning(f"Failed to broadcast to a connection, marking for removal: {str(e)}")
                disconnected_connections.append(connection)
        
        # Remove broken connections
        for conn in disconnected_connections:
            self.disconnect(conn)


class ORBITWebSocketAgent(ORBITAgent):
    """Extended ORBIT Agent with WebSocket event emission"""
    
    def __init__(self, connection_manager: ConnectionManager, websocket: WebSocket):
        super().__init__()
        self.connection_manager = connection_manager
        self.websocket = websocket
        self.execution_id = None
        # Override the messages list with proper typing
        self.messages: List[Union[SystemMessage, HumanMessage, AIMessage, BaseMessage]] = []
        client_info = f"{websocket.client.host}:{websocket.client.port}" if websocket.client else "unknown"
        logger.info(f"ORBITWebSocketAgent initialized for client {client_info}")

    async def emit_event(self, event_type: str, data: Dict[str, Any]):
        """Emit events to connected WebSocket clients"""
        try:
            event = {
                "type": event_type,
                "timestamp": datetime.now().isoformat(),
                "execution_id": self.execution_id,
                "data": data
            }
            await self.connection_manager.send_personal_message(event, self.websocket)
            logger.debug(f"Emitted event '{event_type}' with execution_id '{self.execution_id}'")
        except Exception as e:
            logger.error(f"Failed to emit event '{event_type}': {str(e)}")

    async def initialize(self):
        """Override initialize to emit events"""
        logger.info("Starting agent initialization")
        await self.emit_event("agent_start", {"message": "Initializing ORBIT Agent..."})
        
        try:
            await super().initialize()
            logger.info("Agent initialized successfully")
            await self.emit_event("agent_ready", {"message": "Agent initialized successfully"})
        except Exception as e:
            logger.error(f"Agent initialization failed: {str(e)}")
            await self.emit_event("error", {"message": f"Initialization failed: {str(e)}"})
            raise

    async def chat(self, user_input: str):
        """Override chat to emit detailed execution events"""
        if not self.agent:
            error_msg = "Agent not initialized. Call initialize() first."
            logger.error(error_msg)
            raise RuntimeError(error_msg)
        
        # Generate unique execution ID
        self.execution_id = f"exec_{datetime.now().strftime('%Y%m%d_%H%M%S_%f')}"
        logger.info(f"Starting chat session with execution_id: {self.execution_id}")
        logger.debug(f"User input: {user_input}")
        
        await self.emit_event("user_input", {"message": user_input})
        
        # Add user message as proper LangChain message object
        self.messages.append(HumanMessage(content=user_input))

        try:
            await self.emit_event("agent_thinking", {"message": "Processing your request..."})
            logger.info(f"Agent processing request for execution_id: {self.execution_id}")
            
            # Create a custom invoke method that tracks tool usage
            response = await self._tracked_invoke({"messages": self.messages})
            
            reply = response['messages'][-1].content
            # Add assistant message as proper LangChain message object
            self.messages.append(AIMessage(content=reply))
            
            logger.info(f"Agent response generated for execution_id: {self.execution_id}")
            logger.debug(f"Agent response: {reply}")
            
            await self.emit_event("agent_response", {
                "message": reply,
                "execution_completed": True
            })
            
            return reply
            
        except Exception as e:
            logger.error(f"Agent processing failed for execution_id {self.execution_id}: {str(e)}")
            await self.emit_event("error", {"message": f"Agent processing failed: {str(e)}"})
            raise Exception(f"Agent processing failed: {str(e)}")

    async def _tracked_invoke(self, input_data):
        """Custom invoke method that tracks tool execution using LangGraph streaming"""
        logger.debug(f"Starting tracked invoke for execution_id: {self.execution_id}")
        
        if not self.agent:
            raise RuntimeError("Agent not initialized")
        
        final_response = None
        current_tool_name = None
        
        try:
            # Use astream with "updates" mode to capture agent progress and tool executions
            async for chunk in self.agent.astream(input_data, stream_mode="updates"):
                logger.debug(f"Received stream chunk: {chunk}")
                
                # chunk is a dict with node names as keys
                if isinstance(chunk, dict):
                    for node_name, node_data in chunk.items():
                        logger.debug(f"Processing node '{node_name}' with data type: {type(node_data)}")
                        
                        if node_name == "agent":
                            # Agent node - look for tool calls
                            if hasattr(node_data, 'get') and 'messages' in node_data:
                                messages = node_data['messages']
                                if messages and len(messages) > 0:
                                    latest_message = messages[-1]
                                    
                                    # Check for tool calls in AI message
                                    if hasattr(latest_message, 'tool_calls') and latest_message.tool_calls:
                                        for tool_call in latest_message.tool_calls:
                                            tool_name = tool_call.get('name', 'unknown_tool')
                                            current_tool_name = tool_name
                                            
                                            logger.info(f"Tool called: {tool_name}")
                                            
                                            await self.emit_event("tool_called", {
                                                "tool_name": tool_name,
                                                "description": f"Executing {tool_name}",
                                                "arguments": tool_call.get('args', {})
                                            })
                                            
                                            await self.emit_event("tool_executing", {
                                                "tool_name": tool_name,
                                                "status": "executing"
                                            })
                        
                        elif node_name == "tools":
                            # Tools node - tool execution completed
                            if current_tool_name:
                                logger.info(f"Tool {current_tool_name} execution completed")
                                
                                # Extract result from tool message
                                result_preview = "Tool executed successfully"
                                if hasattr(node_data, 'get') and 'messages' in node_data:
                                    messages = node_data['messages']
                                    if messages and len(messages) > 0:
                                        tool_message = messages[-1]
                                        if hasattr(tool_message, 'content'):
                                            content = str(tool_message.content)
                                            result_preview = content[:200] + "..." if len(content) > 200 else content
                                
                                await self.emit_event("tool_result", {
                                    "tool_name": current_tool_name,
                                    "status": "completed",
                                    "result": result_preview
                                })
                                
                                current_tool_name = None
                        
                        # Keep track of the final state
                        final_response = chunk
                
                else:
                    logger.debug(f"Received non-dict chunk: {type(chunk)}")
            
            # If we captured the final response through streaming, extract it
            if final_response and isinstance(final_response, dict):
                # Look for the final messages in the agent node
                for node_name, node_data in final_response.items():
                    if node_name == "agent" and hasattr(node_data, 'get') and 'messages' in node_data:
                        logger.info(f"Streaming completed for execution_id: {self.execution_id}")
                        return node_data
            
            # Fallback: if streaming didn't capture the response properly, invoke normally
            logger.warning("Streaming didn't capture final response, using fallback invoke")
            return await self.agent.ainvoke(input_data)
                
        except Exception as e:
            logger.error(f"Error in tracked invoke for execution_id {self.execution_id}: {str(e)}")
            await self.emit_event("error", {
                "message": f"Tool execution tracking failed: {str(e)}"
            })
            # Fallback to normal invoke
            try:
                return await self.agent.ainvoke(input_data)
            except Exception as fallback_error:
                logger.error(f"Fallback invoke also failed: {str(fallback_error)}")
                raise Exception(f"Agent processing failed: {str(fallback_error)}")


app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger.info("FastAPI app initialized with CORS middleware")

# Connection manager
manager = ConnectionManager()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    client_info = f"{websocket.client.host}:{websocket.client.port}" if websocket.client else "unknown"
    logger.info(f"WebSocket connection request from {client_info}")
    
    await manager.connect(websocket)
    
    # Create agent instance for this connection
    agent = ORBITWebSocketAgent(manager, websocket)
    
    try:
        # Initialize agent
        logger.info(f"Initializing agent for client {client_info}")
        await agent.initialize()
        
        logger.info(f"Agent initialized successfully for client {client_info}, entering message loop")
        while True:
            # Wait for messages from client
            data = await websocket.receive_text()
            message = json.loads(data)

            logger.info(f"Received message from {client_info}: {message}")
            
            if message["type"] == "user_message":
                user_input = message["content"]
                logger.info(f"Processing user message from {client_info}: '{user_input[:100]}...' ({len(user_input)} chars)")
                response = await agent.chat(user_input)
                logger.info(f"Successfully processed user message from {client_info}")
            else:
                logger.warning(f"Received unknown message type '{message.get('type', 'unknown')}' from {client_info}")
                
    except WebSocketDisconnect:
        logger.info(f"WebSocket disconnected for client {client_info}")
        manager.disconnect(websocket)
    except json.JSONDecodeError as e:
        logger.error(f"Invalid JSON received from client {client_info}: {str(e)}")
        await manager.send_personal_message({
            "type": "error",
            "timestamp": datetime.now().isoformat(),
            "data": {"message": "Invalid JSON format in message"}
        }, websocket)
    except Exception as e:
        logger.error(f"Unexpected error in WebSocket endpoint for client {client_info}: {str(e)}")
        try:
            await manager.send_personal_message({
                "type": "error",
                "timestamp": datetime.now().isoformat(),
                "data": {"message": f"Server error: {str(e)}"}
            }, websocket)
        except:
            logger.error(f"Failed to send error message to client {client_info}")
        finally:
            manager.disconnect(websocket)


@app.get("/health")
async def health_check():
    health_data = {
        "status": "healthy", 
        "service": "ORBIT WebSocket Server",
        "active_connections": len(manager.active_connections),
        "timestamp": datetime.now().isoformat()
    }
    logger.debug(f"Health check requested - {health_data}")
    return health_data


if __name__ == "__main__":
    logger.info("="*50)
    logger.info("Starting ORBIT WebSocket Server...")
    logger.info(f"Server configuration: host=0.0.0.0, port=8080")
    logger.info(f"CORS origins: http://localhost:3000")
    logger.info(f"Logs directory: logs/")
    logger.info(f"Log file: logs/orbit_websocket.log")
    logger.info("="*50)
    
    try:
        uvicorn.run(app, host="0.0.0.0", port=9000, log_level="info")
    except KeyboardInterrupt:
        logger.info("Server shutdown requested by user")
    except Exception as e:
        logger.error(f"Server failed to start: {str(e)}")
        raise
