import { placeOrder } from "./trade.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create MCP server instance
const server = new McpServer({
  name: "mcp-trader",
  version: "1.0.0"
});

// Tool 1: Add two numbers
server.registerTool("add", {
  title: "Addition Tool",
  description: "Add two numbers",
  inputSchema: { a: z.number(), b: z.number() }
}, async ({ a, b }) => ({
  content: [{ type: "text", text: String(a + b) }]
}));

// Tool 2: Calculate factorial
server.registerTool("factorial", {
  title: "Factorial Tool",
  description: "Calculate the factorial of a number",
  inputSchema: { a: z.number() }
}, async ({ a }) => {
  let result = 1;
  for (let i = 2; i <= a; i++) result *= i;
  return { content: [{ type: "text", text: String(result) }] };
});

// Tool 3: Buy a stock
server.registerTool("buy_stock", {
  title: "Buy Stock Tool",
  description: "Buy a stock using Kite Connect",
  inputSchema: { stock: z.string(), qty: z.number() }
}, async ({ stock, qty }) => {
  await placeOrder(stock, qty, "BUY");
  return { content: [{ type: "text", text: `✅ Bought ${qty} shares of ${stock}` }] };
});

// Tool 4: Sell a stock
server.registerTool("sell_stock", {
  title: "Sell Stock Tool",
  description: "Sell a stock using Kite Connect",
  inputSchema: { stock: z.string(), qty: z.number() }
}, async ({ stock, qty }) => {
  await placeOrder(stock, qty, "SELL");
  return { content: [{ type: "text", text: `✅ Sold ${qty} shares of ${stock}` }] };
});

// Start server using stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);
