# Notion MCP Server with HTTP Transport

MCP Server for the Notion API with streamable HTTP transport, enabling LLMs to interact with Notion workspaces over HTTP. This implementation supports session management and Server-Sent Events (SSE) for real-time communication.

## Features

- **HTTP Transport**: Uses streamable HTTP instead of stdio for better flexibility and debugging
- **Session Management**: Automatic session handling with UUID-based session IDs
- **Server-Sent Events**: Real-time streaming for notifications and updates
- **Markdown Conversion**: Optimizes token usage by converting responses to Markdown
- **Full Notion API**: Complete access to Notion's pages, databases, blocks, and users

## Setup

### Prerequisites

1. **Create a Notion Integration**:
   - Visit the [Notion Your Integrations page](https://www.notion.so/profile/integrations)
   - Click "New Integration"
   - Name your integration and select appropriate permissions
   - Copy the "Internal Integration Token"

2. **Add Integration to Workspace**:
   - Open the page/database you want to access in Notion
   - Click "···" → "Connections" → Select your integration

### Installation & Usage

1. **Set Environment Variables**:
   ```powershell
   # PowerShell
   $env:NOTION_API_TOKEN="your_notion_integration_token"
   
   # Optional: Enable experimental markdown conversion
   $env:NOTION_MARKDOWN_CONVERSION="true"
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Build the Server**:
   ```bash
   npm run build
   ```

4. **Start the HTTP Server**:
   ```bash
   # Start on default port 3001
   node build/index.js
   
   # Start on custom port
   node build/index.js --port 3002
   
   # Enable specific tools only
   node build/index.js --enabledTools "notion_retrieve_page,notion_query_database"
   ```

   Or use the convenience script:
   ```bash
   node start-server.js
   ```

## HTTP Endpoints

- **POST** `http://localhost:3001/mcp` - Send JSON-RPC requests
- **GET** `http://localhost:3001/mcp` - Server-Sent Events stream (requires session ID)
- **DELETE** `http://localhost:3001/mcp` - Terminate session (requires session ID)

## API Usage

### 1. Initialize Session

First, send an initialize request to establish a session:

```bash
curl -X POST http://localhost:3001/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
      "protocolVersion": "2024-11-05",
      "capabilities": {"tools": {}},
      "clientInfo": {"name": "test-client", "version": "1.0.0"}
    }
  }'
```

The response will include a `mcp-session-id` header that you must use for subsequent requests.

### 2. List Available Tools

```bash
curl -X POST http://localhost:3001/mcp \
  -H "Content-Type: application/json" \
  -H "mcp-session-id: your-session-id" \
  -d '{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/list",
    "params": {}
  }'
```

### 3. Call a Tool

```bash
curl -X POST http://localhost:3001/mcp \
  -H "Content-Type: application/json" \
  -H "mcp-session-id: your-session-id" \
  -d '{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "tools/call",
    "params": {
      "name": "notion_retrieve_page",
      "arguments": {
        "page_id": "your-page-id",
        "format": "markdown"
      }
    }
  }'
```

## Session Management

- Sessions are automatically created during initialization
- Each session gets a unique UUID-based session ID
- Sessions are required for all non-initialization requests
- Sessions can be terminated with DELETE requests
- Inactive sessions are automatically cleaned up when the transport closes

## Available Tools

The server provides access to all major Notion API operations:

### Pages
- `notion_retrieve_page` - Get page content
- `notion_update_page_properties` - Update page properties

### Databases
- `notion_query_database` - Query database entries
- `notion_create_database` - Create new database
- `notion_retrieve_database` - Get database schema
- `notion_update_database` - Update database properties
- `notion_create_database_item` - Add entry to database

### Blocks
- `notion_append_block_children` - Add blocks to page
- `notion_retrieve_block` - Get block content
- `notion_retrieve_block_children` - Get child blocks
- `notion_update_block` - Modify block content
- `notion_delete_block` - Remove block

### Users & Comments
- `notion_list_all_users` - List workspace users
- `notion_retrieve_user` - Get user details
- `notion_retrieve_bot_user` - Get bot user info
- `notion_create_comment` - Add comment
- `notion_retrieve_comments` - Get comments

### Search
- `notion_search` - Search across workspace

## Configuration Options

### Command Line Arguments
- `--port <number>` - HTTP port (default: 3001)
- `--enabledTools <comma-separated>` - Specific tools to enable

### Environment Variables
- `NOTION_API_TOKEN` - **Required** Notion integration token
- `NOTION_MARKDOWN_CONVERSION` - Set to "true" to enable Markdown output

### Response Formats
- `json` - Raw Notion API responses
- `markdown` - Human-readable Markdown (requires `NOTION_MARKDOWN_CONVERSION=true`)

## Testing

Test the server with the included test script:

```bash
node test-http.js
```

This will:
1. Initialize a session
2. List available tools
3. Verify the server is working correctly

## Development

### Building
```bash
npm run build
```

### Watching for Changes
```bash
npm run watch
```

### Running Tests
```bash
npm test
```

## Integration with MCP Clients

This HTTP server can be used with any MCP client that supports the streamable HTTP transport. The session-based approach ensures proper state management and allows for concurrent client connections.

## Security Notes

- The server includes DNS rebinding protection (disabled by default)
- For production use, enable protection with:
  ```typescript
  enableDnsRebindingProtection: true,
  allowedHosts: ['127.0.0.1', 'localhost'],
  allowedOrigins: ['http://localhost:3000']
  ```
- Always use HTTPS in production environments
- Protect your Notion API token as it provides access to your workspace

## Troubleshooting

### Common Issues

1. **Missing NOTION_API_TOKEN**: Ensure the environment variable is set
2. **Permission Errors**: Verify your integration has the required permissions in Notion
3. **Page/Database Access**: Make sure your integration is connected to the specific pages/databases you're trying to access
4. **Port Conflicts**: Use a different port with `--port` if 3001 is occupied

### Debug Mode

Enable debug logging by setting the environment variable:
```bash
NODE_ENV=development
```

## License

MIT License - see LICENSE file for details.
