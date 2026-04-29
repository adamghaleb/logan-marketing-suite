#!/usr/bin/env node
import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTools } from "./lib/register.js";

async function main() {
  const server = new McpServer({
    name: "mily-mcp",
    version: "0.1.0",
  });
  registerTools(server);
  const transport = new StdioServerTransport();
  try {
    await server.connect(transport);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`mily-mcp failed to start: ${message}\n`);
    process.exit(1);
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`mily-mcp fatal: ${message}\n`);
  process.exit(1);
});
