import { placeOrder } from "./trade.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create MCP server instance
const server = new McpServer({
  name: "mcp-trader",
  version: "1.0.0"
});

// Buy a stock
server.registerTool("buy_stock", {
  title: "Buy Stock Tool",
  description: "Executes a real buy order in Zerodha for the user",
  inputSchema: { stock: z.string(), qty: z.number() }
}, async ({ stock, qty }) => {
  await placeOrder(stock, qty, "BUY");
  return { content: [{ type: "text", text: `Bought ${qty} shares of ${stock}` }] };
});

//  Sell a stock
server.registerTool("sell_stock", {
  title: "Sell Stock Tool",
  description: "Executes a real sell order in Zerodha for the user",
  inputSchema: { stock: z.string(), qty: z.number() }
}, async ({ stock, qty }) => {
  await placeOrder(stock, qty, "SELL");
  return { content: [{ type: "text", text: ` Sold ${qty} shares of ${stock}` }] };
});

server.registerTool("Show_portfolio",
  {
    description: "shows the portfolio of the uer",
    inputSchema: {}
  },
  async () => {
    const holdings = await getHoldings();
    return {
      content: [{ type: "text", text: holdings }]
    };
  });

// Start server using stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);
