/**
 * MCP server setup and request handling
 */

import express from "express";
import { randomUUID } from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { NotionClientWrapper } from "../client/index.js";
import { filterTools } from "../utils/index.js";
import * as schemas from "../types/schemas.js";
import * as args from "../types/args.js";

/**
 * Create and configure an MCP server with Notion tools
 */
function createMcpServer(
  notionToken: string,
  enabledToolsSet: Set<string>,
  enableMarkdownConversion: boolean
): McpServer {
  const server = new McpServer({
    name: "Notion MCP Server",
    version: "1.0.0",
  }, {
    capabilities: {
      tools: {},
    },
  });

  const notionClient = new NotionClientWrapper(notionToken);

  // Register all Notion tools
  const allTools = [
    schemas.appendBlockChildrenTool,
    schemas.retrieveBlockTool,
    schemas.retrieveBlockChildrenTool,
    schemas.deleteBlockTool,
    schemas.updateBlockTool,
    schemas.retrievePageTool,
    schemas.updatePagePropertiesTool,
    schemas.listAllUsersTool,
    schemas.retrieveUserTool,
    schemas.retrieveBotUserTool,
    schemas.createDatabaseTool,
    schemas.queryDatabaseTool,
    schemas.retrieveDatabaseTool,
    schemas.updateDatabaseTool,
    schemas.createDatabaseItemTool,
    schemas.createCommentTool,
    schemas.retrieveCommentsTool,
    schemas.searchTool,
  ];

  const enabledTools = filterTools(allTools, enabledToolsSet);

  // Register each tool with the server
  for (const tool of enabledTools) {
    server.tool(tool.name, tool.description || "", tool.inputSchema, async (args) => {
      console.error(`Executing tool: ${tool.name}`, args);
      
      try {
        let response;

        switch (tool.name) {
          case "notion_append_block_children": {
            const typedArgs = args as unknown as args.AppendBlockChildrenArgs;
            if (!typedArgs.block_id || !typedArgs.children) {
              throw new Error("Missing required arguments: block_id and children");
            }
            response = await notionClient.appendBlockChildren(
              typedArgs.block_id,
              typedArgs.children
            );
            break;
          }

          case "notion_retrieve_block": {
            const typedArgs = args as unknown as args.RetrieveBlockArgs;
            if (!typedArgs.block_id) {
              throw new Error("Missing required argument: block_id");
            }
            response = await notionClient.retrieveBlock(typedArgs.block_id);
            break;
          }

          case "notion_retrieve_block_children": {
            const typedArgs = args as unknown as args.RetrieveBlockChildrenArgs;
            if (!typedArgs.block_id) {
              throw new Error("Missing required argument: block_id");
            }
            response = await notionClient.retrieveBlockChildren(
              typedArgs.block_id,
              typedArgs.start_cursor,
              typedArgs.page_size
            );
            break;
          }

          case "notion_delete_block": {
            const typedArgs = args as unknown as args.DeleteBlockArgs;
            if (!typedArgs.block_id) {
              throw new Error("Missing required argument: block_id");
            }
            response = await notionClient.deleteBlock(typedArgs.block_id);
            break;
          }

          case "notion_update_block": {
            const typedArgs = args as unknown as args.UpdateBlockArgs;
            if (!typedArgs.block_id || !typedArgs.block) {
              throw new Error("Missing required arguments: block_id and block");
            }
            response = await notionClient.updateBlock(
              typedArgs.block_id,
              typedArgs.block
            );
            break;
          }

          case "notion_retrieve_page": {
            const typedArgs = args as unknown as args.RetrievePageArgs;
            if (!typedArgs.page_id) {
              throw new Error("Missing required argument: page_id");
            }
            response = await notionClient.retrievePage(typedArgs.page_id);
            break;
          }

          case "notion_update_page_properties": {
            const typedArgs = args as unknown as args.UpdatePagePropertiesArgs;
            if (!typedArgs.page_id || !typedArgs.properties) {
              throw new Error("Missing required arguments: page_id and properties");
            }
            response = await notionClient.updatePageProperties(
              typedArgs.page_id,
              typedArgs.properties
            );
            break;
          }

          case "notion_list_all_users": {
            const typedArgs = args as unknown as args.ListAllUsersArgs;
            response = await notionClient.listAllUsers(
              typedArgs.start_cursor,
              typedArgs.page_size
            );
            break;
          }

          case "notion_retrieve_user": {
            const typedArgs = args as unknown as args.RetrieveUserArgs;
            if (!typedArgs.user_id) {
              throw new Error("Missing required argument: user_id");
            }
            response = await notionClient.retrieveUser(typedArgs.user_id);
            break;
          }

          case "notion_retrieve_bot_user": {
            response = await notionClient.retrieveBotUser();
            break;
          }

          case "notion_query_database": {
            const typedArgs = args as unknown as args.QueryDatabaseArgs;
            if (!typedArgs.database_id) {
              throw new Error("Missing required argument: database_id");
            }
            response = await notionClient.queryDatabase(
              typedArgs.database_id,
              typedArgs.filter,
              typedArgs.sorts,
              typedArgs.start_cursor,
              typedArgs.page_size
            );
            break;
          }

          case "notion_create_database": {
            const typedArgs = args as unknown as args.CreateDatabaseArgs;
            response = await notionClient.createDatabase(
              typedArgs.parent,
              typedArgs.properties,
              typedArgs.title
            );
            break;
          }

          case "notion_retrieve_database": {
            const typedArgs = args as unknown as args.RetrieveDatabaseArgs;
            response = await notionClient.retrieveDatabase(typedArgs.database_id);
            break;
          }

          case "notion_update_database": {
            const typedArgs = args as unknown as args.UpdateDatabaseArgs;
            response = await notionClient.updateDatabase(
              typedArgs.database_id,
              typedArgs.title,
              typedArgs.description,
              typedArgs.properties
            );
            break;
          }

          case "notion_create_database_item": {
            const typedArgs = args as unknown as args.CreateDatabaseItemArgs;
            response = await notionClient.createDatabaseItem(
              typedArgs.database_id,
              typedArgs.properties
            );
            break;
          }

          case "notion_create_comment": {
            const typedArgs = args as unknown as args.CreateCommentArgs;
            if (!typedArgs.parent && !typedArgs.discussion_id) {
              throw new Error("Either parent.page_id or discussion_id must be provided");
            }
            response = await notionClient.createComment(
              typedArgs.parent,
              typedArgs.discussion_id,
              typedArgs.rich_text
            );
            break;
          }

          case "notion_retrieve_comments": {
            const typedArgs = args as unknown as args.RetrieveCommentsArgs;
            if (!typedArgs.block_id) {
              throw new Error("Missing required argument: block_id");
            }
            response = await notionClient.retrieveComments(
              typedArgs.block_id,
              typedArgs.start_cursor,
              typedArgs.page_size
            );
            break;
          }

          case "notion_search": {
            const typedArgs = args as unknown as args.SearchArgs;
            response = await notionClient.search(
              typedArgs.query,
              typedArgs.filter,
              typedArgs.sort,
              typedArgs.start_cursor,
              typedArgs.page_size
            );
            break;
          }

          default:
            throw new Error(`Unknown tool: ${tool.name}`);
        }

        // Check format parameter and return appropriate response
        const requestedFormat = (args as any)?.format || "markdown";

        // Only convert to markdown if both conditions are met:
        // 1. The requested format is markdown
        // 2. The experimental markdown conversion is enabled via environment variable
        if (enableMarkdownConversion && requestedFormat === "markdown") {
          const markdown = await notionClient.toMarkdown(response);
          return {
            content: [{ type: "text", text: markdown }],
          };
        } else {
          return {
            content: [
              { type: "text", text: JSON.stringify(response, null, 2) },
            ],
          };
        }
      } catch (error) {
        console.error("Error executing tool:", error);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                error: error instanceof Error ? error.message : String(error),
              }),
            },
          ],
        };
      }
    });
  }

  return server;
}

/**
 * Start the MCP server with HTTP transport
 */
export async function startServer(
  notionToken: string,
  enabledToolsSet: Set<string>,
  enableMarkdownConversion: boolean,
  port: number = 3002
) {
  const app = express();
  app.use(express.json());

  // Create the MCP server once for all connections
  const mcpServer = createMcpServer(notionToken, enabledToolsSet, enableMarkdownConversion);

  // Map to store transports by session ID
  const transports: { [sessionId: string]: StreamableHTTPServerTransport } = {};

  // Handle POST requests for client-to-server communication
  app.post('/mcp', async (req, res) => {
    try {
      // Check for existing session ID
      const sessionId = req.headers['mcp-session-id'] as string | undefined;
      let transport: StreamableHTTPServerTransport;

      if (sessionId && transports[sessionId]) {
        // Reuse existing transport
        transport = transports[sessionId];
      } else if (!sessionId && isInitializeRequest(req.body)) {
        // New initialization request
        transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: () => randomUUID(),
          onsessioninitialized: (sessionId) => {
            // Store the transport by session ID
            transports[sessionId] = transport;
            console.log(`New session initialized: ${sessionId}`);
          },
          // DNS rebinding protection is disabled by default for backwards compatibility. If you are running this server
          // locally, make sure to set:
          // enableDnsRebindingProtection: true,
          // allowedHosts: ['127.0.0.1'],
        });

        // Clean up transport when closed
        transport.onclose = () => {
          if (transport.sessionId) {
            console.log(`Session closed: ${transport.sessionId}`);
            delete transports[transport.sessionId];
          }
        };

        // Connect the transport to the existing MCP server
        await mcpServer.connect(transport);
      } else {
        // Invalid request
        res.status(400).json({
          jsonrpc: '2.0',
          error: {
            code: -32000,
            message: 'Bad Request: No valid session ID provided or not an initialize request',
          },
          id: req.body?.id || null,
        });
        return;
      }

      // Handle the request
      await transport.handleRequest(req, res, req.body);
    } catch (error) {
      console.error('Error handling MCP request:', error);
      res.status(500).json({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal error',
        },
        id: req.body?.id || null,
      });
    }
  });

  // Reusable handler for GET and DELETE requests
  const handleSessionRequest = async (req: express.Request, res: express.Response) => {
    try {
      const sessionId = req.headers['mcp-session-id'] as string | undefined;
      if (!sessionId || !transports[sessionId]) {
        res.status(400).send('Invalid or missing session ID');
        return;
      }
      
      const transport = transports[sessionId];
      await transport.handleRequest(req, res);
    } catch (error) {
      console.error('Error handling session request:', error);
      res.status(500).send('Internal server error');
    }
  };

  // Handle GET requests for server-to-client notifications via SSE
  app.get('/mcp', handleSessionRequest);

  // Handle DELETE requests for session termination
  app.delete('/mcp', async (req, res) => {
    try {
      const sessionId = req.headers['mcp-session-id'] as string | undefined;
      if (!sessionId || !transports[sessionId]) {
        res.status(400).send('Invalid or missing session ID');
        return;
      }
      
      const transport = transports[sessionId];
      
      // Clean up the session
      if (transport.sessionId) {
        delete transports[transport.sessionId];
        console.log(`Session terminated: ${transport.sessionId}`);
      }
      
      await transport.handleRequest(req, res);
    } catch (error) {
      console.error('Error handling session termination:', error);
      res.status(500).send('Internal server error');
    }
  });

  // Graceful shutdown handling
  process.on('SIGINT', () => {
    console.log('\nReceived SIGINT, shutting down gracefully...');
    
    // Close all active transports
    Object.values(transports).forEach(transport => {
      if (transport.sessionId) {
        console.log(`Closing session: ${transport.sessionId}`);
        transport.close();
      }
    });
    
    process.exit(0);
  });

  // Start the HTTP server
  const server = app.listen(port, () => {
    console.log(`Notion MCP Server listening on port ${port}`);
    console.log(`POST endpoint: http://localhost:${port}/mcp`);
    console.log(`SSE endpoint: http://localhost:${port}/mcp`);
    console.log('Server is ready to accept connections...');
  });

  // Handle server errors
  server.on('error', (error) => {
    console.error('Server error:', error);
  });

  return server;
}
