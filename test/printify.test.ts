import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  HttpClient,
  ToolError,
  checkCoverage,
  formatCoverage,
  operationsFromOpenApi,
} from "@nasdigitaluk/mcp-server-core";
import { OPERATIONS } from "../src/generated/operations.js";
import { createDispatcher, COVERED } from "../src/dispatch.js";
import { buildTools } from "../src/tools.js";

const spec = JSON.parse(
  readFileSync(join(import.meta.dirname, "../vendor/printify-openapi.json"), "utf8"),
);

function client() {
  const calls: { url: string; method: string; body?: string }[] = [];
  const http = new HttpClient({
    baseUrl: "https://api.printify.com",
    fetchImpl: (async (url: string, opts: RequestInit = {}) => {
      calls.push({ url, method: opts.method ?? "GET", body: opts.body as string | undefined });
      return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
    }) as unknown as typeof fetch,
  });
  return { http, calls };
}

const toolNamed = (http: HttpClient, name: string, shop?: string) => {
  const t = buildTools(http, shop).find((x) => x.name === name);
  if (!t) throw new Error(`no tool ${name}`);
  return t;
};

describe("coverage", () => {
  it("accounts for every operation Printify publishes", () => {
    const report = checkCoverage(OPERATIONS, operationsFromOpenApi(spec));
    expect(report.ok, formatCoverage(report)).toBe(true);
  });

  it("covers all of them, because Printify's API is entirely merchant-facing", () => {
    expect(COVERED.length).toBe(OPERATIONS.length);
    expect(OPERATIONS.length).toBeGreaterThan(40);
  });
});

describe("consequence, not HTTP verb", () => {
  const action = (pathEnd: string, method = "POST") =>
    OPERATIONS.find((o) => o.path.endsWith(pathEnd) && o.method === method)?.action;

  it("treats placing an order as destructive, not a write", () => {
    // Printify charges for an order the moment it goes to production and there
    // is no endpoint that un-charges it. Classifying it as a plain write would
    // make MCP_NO_DESTRUCTIVE useless to the person it exists to protect.
    expect(action("/orders.json")).toBe("destructive");
    expect(action("/orders/express.json")).toBe("destructive");
    expect(action("/send_to_production.json")).toBe("destructive");
  });

  it("treats refund and reprint cases as destructive", () => {
    expect(action("/support-requests/refund")).toBe("destructive");
    expect(action("/support-requests/reprint")).toBe("destructive");
  });

  it("still treats ordinary edits as writes", () => {
    expect(action("/products.json")).toBe("write");
    expect(action("/publish.json")).toBe("write");
  });

  it("treats every read as a read and every delete as destructive", () => {
    for (const op of OPERATIONS) {
      if (op.method === "GET") expect(op.action, op.path).toBe("read");
      if (op.method === "DELETE") expect(op.action, op.path).toBe("destructive");
    }
  });

  it("costing shipping is a read, so it can be checked before committing", () => {
    // POST, but it changes nothing - and it is the call that tells you what an
    // order will cost before you place one.
    const { http } = client();
    expect(toolNamed(http, "printify_get_shipping_cost", "s1").action).toBe("read");
  });
});

describe("the default shop", () => {
  // Resolved by route rather than by a guessed id, so these do not break if the
  // derived-id scheme ever changes.
  const listProducts = OPERATIONS.find(
    (o) => o.method === "GET" && o.path === "/v1/shops/{shop_id}/products.json",
  )!;

  it("fills in shop_id from PRINTIFY_SHOP_ID when omitted", async () => {
    const { http, calls } = client();
    await createDispatcher(http, "shop-123").call(listProducts.id, {});
    expect(calls[0]!.url).toContain("/v1/shops/shop-123/products.json");
  });

  it("lets an explicit shop_id win", async () => {
    const { http, calls } = client();
    await createDispatcher(http, "shop-123").call(listProducts.id, { shop_id: "other" });
    expect(calls[0]!.url).toContain("/v1/shops/other/products.json");
  });

  it("says how to fix it when no shop is available at all", async () => {
    const { http } = client();
    await expect(createDispatcher(http).call(listProducts.id, {})).rejects.toThrow(
      /PRINTIFY_SHOP_ID/,
    );
  });
});

describe("tools", () => {
  it("refuses a local file path for artwork, since Printify fetches it server-side", () => {
    const { http } = client();
    const tool = toolNamed(http, "printify_upload_image", "s1");
    expect(tool.input.safeParse({ file_name: "a.png", url: "/home/me/a.png" }).success).toBe(false);
    expect(tool.input.safeParse({ file_name: "a.png", url: "file:///home/me/a.png" }).success).toBe(false);
    expect(tool.input.safeParse({ file_name: "a.png", url: "https://x.test/a.png" }).success).toBe(true);
  });

  it("keeps the advertised surface small despite covering everything", () => {
    const { http } = client();
    expect(buildTools(http, "s1").length).toBeLessThanOrEqual(10);
  });

  it("declares printify_call at the strictest level anything behind it can reach", () => {
    // The generic caller can reach a destructive operation, so a read-only or
    // no-destructive server has to refuse it outright rather than inspect the
    // id after the fact.
    const { http } = client();
    expect(toolNamed(http, "printify_call", "s1").action).toBe("destructive");
  });
});
