#!/usr/bin/env node
/**
 * Notion MCP Server with Streamable HTTP Transport
 * 
 * All API endpoints support both JSON and Markdown response formats.
 * Set the "format" parameter to "json" or "markdown" (default is "markdown").
 * - Use "markdown" for human-readable output when only reading content
 * - Use "json" when you need to process or modify the data programmatically
 *
 * Command-line Arguments:
 * --enabledTools: Comma-separated list of tools to enable (e.g. "notion_retrieve_page,notion_query_database")
 * --port: Port to listen on for HTTP requests (default: 3001)
 *
 * Environment Variables:
 * - NOTION_API_TOKEN: Required. Your Notion API integration token.
 * - NOTION_MARKDOWN_CONVERSION: Optional. Set to "true" to enable
 *   experimental Markdown conversion. If not set or set to any other value,
 *   all responses will be in JSON format regardless of the "format" parameter.
 *
 * HTTP Endpoints:
 * - POST http://localhost:3001/mcp - Send MCP requests
 * - GET http://localhost:3001/mcp - Server-Sent Events for streaming responses
 */
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { startServer } from "./server/index.js";

// Parse command line arguments
const argv = yargs(hideBin(process.argv))
  .option("enabledTools", {
    type: "string",
    description: "Comma-separated list of tools to enable",
  })
  .option("port", {
    type: "number",
    description: "Port to listen on for HTTP requests",
    default: 3002,
  })
  .parseSync();

const enabledToolsSet = new Set(
  argv.enabledTools ? argv.enabledTools.split(",") : []
);

// if test environment, do not execute main()
if (process.env.NODE_ENV !== "test" && process.env.VITEST !== "true") {
  main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
  });
}

async function main() {
  const notionToken = process.env.NOTION_API_TOKEN;
  const enableMarkdownConversion =
    process.env.NOTION_MARKDOWN_CONVERSION === "true";

  if (!notionToken) {
    console.error("Please set NOTION_API_TOKEN environment variable");
    process.exit(1);
  }

  await startServer(notionToken, enabledToolsSet, enableMarkdownConversion, argv.port);
}
