#!/usr/bin/env node

/**
 * Start the Notion MCP Server for testing
 * Make sure to set NOTION_API_TOKEN environment variable
 */

const { spawn } = require('child_process');
const path = require('path');

const serverPath = path.join(__dirname, 'build', 'index.js');

console.log('Starting Notion MCP Server...');
console.log('Server path:', serverPath);

// Check if NOTION_API_TOKEN is set
if (!process.env.NOTION_API_TOKEN) {
  console.error('❌ NOTION_API_TOKEN environment variable is not set!');
  console.log('Please set it with: $env:NOTION_API_TOKEN="your_token_here" (PowerShell)');
  process.exit(1);
}

// Start the server
const server = spawn('node', [serverPath, '--port', '3001'], {
  stdio: 'inherit',
  env: process.env
});

server.on('close', (code) => {
  console.log(`Server exited with code ${code}`);
});

server.on('error', (err) => {
  console.error('Failed to start server:', err);
});

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  server.kill('SIGINT');
});
