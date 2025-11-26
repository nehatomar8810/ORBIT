#!/usr/bin/env node

/**
 * Simple test script to verify the HTTP MCP server is working
 */

const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}/mcp`;

async function testServer() {
  console.log('Testing Notion MCP Server HTTP transport...');
  
  try {
    // Test 1: Initialize first to get a session
    console.log('\n1. Testing initialize request...');
    const initRequest = {
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2024-11-05",
        capabilities: {
          tools: {}
        },
        clientInfo: {
          name: "test-client",
          version: "1.0.0"
        }
      }
    };

    const initResponse = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(initRequest)
    });

    if (!initResponse.ok) {
      throw new Error(`HTTP error! status: ${initResponse.status}`);
    }

    const initData = await initResponse.json();
    console.log('✓ Initialize response:', JSON.stringify(initData, null, 2));
    
    // Extract session ID from response headers
    const sessionId = initResponse.headers.get('mcp-session-id');
    console.log('✓ Session ID:', sessionId);

    if (!sessionId) {
      throw new Error('No session ID returned from initialize request');
    }

    // Test 2: List tools using the session ID
    console.log('\n2. Testing list tools request with session...');
    const listToolsRequest = {
      jsonrpc: "2.0",
      id: 2,
      method: "tools/list",
      params: {}
    };

    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'mcp-session-id': sessionId,
      },
      body: JSON.stringify(listToolsRequest)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✓ List tools response:', JSON.stringify(data, null, 2));

    console.log('\n✅ HTTP MCP server is working correctly!');
    
  } catch (error) {
    console.error('❌ Error testing server:', error.message);
    process.exit(1);
  }
}

testServer();
