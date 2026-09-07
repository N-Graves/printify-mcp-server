#!/usr/bin/env node
/**
 * printify-mcp-server — a Model Context Protocol server for the Printify API.
 *
 *   PRINTIFY_API_KEY=... npx @nasdigital/printify-mcp
 *
 * Configuration:
 *   PRINTIFY_API_KEY  required. Printify → My Profile → Connections → Personal
 *                     Access Tokens.
 *   PRINTIFY_SHOP_ID  optional but recommended. Nearly every route is scoped to
 *                     a shop; set this and it is filled in when omitted.
 *                     printify_get_shops lists yours.
 *   MCP_READ_ONLY=1      refuse anything that changes state.
 *   MCP_NO_DESTRUCTIVE=1 allow writes, refuse anything irreversible or chargeable.
 *
 * ⚠️  Printify orders cost real money and go to production. This server treats
 *     placing an order, sending one to production, and opening a refund or
 *     reprint case as DESTRUCTIVE rather than merely a write, so
 *     MCP_NO_DESTRUCTIVE genuinely protects a shop owner rather than only
 *     blocking deletes.
 */

import {
  HttpClient,
  authorizerFromEnv,
  requireEnv,
  runServer,
} from "@nasdigital/mcp-server-core";
import { buildTools } from "./tools.js";
import { COVERED } from "./dispatch.js";
import { OPERATIONS } from "./generated/operations.js";

const VERSION = "1.0.0";

async function main() {
  const apiKey = requireEnv(
    "PRINTIFY_API_KEY",
    "Create one at https://printify.com/app/account/api under Personal Access Tokens.",
  );

  const http = new HttpClient({
    baseUrl: process.env.PRINTIFY_BASE_URL || "https://api.printify.com",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "User-Agent": `printify-mcp-server/${VERSION}`,
    },
    // Printify's catalogue endpoints are large and occasionally slow; product
    // creation with many variants is slower still.
    timeoutMs: 60_000,
    // A full blueprint listing is genuinely megabytes.
    maxBytes: 32 * 1024 * 1024,
  });

  const shopId = process.env.PRINTIFY_SHOP_ID;

  await runServer({
    name: "printify-mcp-server",
    version: VERSION,
    authorizer: authorizerFromEnv(),
    tools: buildTools(http, shopId),
  });

  const destructive = OPERATIONS.filter((o) => o.action === "destructive").length;
  console.error(
    `Printify API: all ${COVERED.length} operations reachable, ${destructive} of them ` +
      `irreversible or chargeable.` +
      (shopId ? ` Default shop ${shopId}.` : " No PRINTIFY_SHOP_ID set; pass shop_id per call."),
  );
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
