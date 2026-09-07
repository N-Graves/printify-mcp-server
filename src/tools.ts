import { z } from "zod";
import {
  HttpClient,
  httpUrl,
  pageNumber,
  pageSize,
  type ToolDefinition,
} from "@nasdigitaluk/mcp-server-core";
import { createDispatcher, COVERED } from "./dispatch.js";
import { OPERATIONS } from "./generated/operations.js";

const shopId = (fallback?: string) =>
  fallback
    ? z.string().optional().describe(`Defaults to PRINTIFY_SHOP_ID (${fallback}).`)
    : z.string().describe("Your shop id. printify_get_shops lists them.");

export function buildTools(http: HttpClient, defaultShopId?: string): ToolDefinition<any>[] {
  const d = createDispatcher(http, defaultShopId);
  const shop = (given?: string) => given ?? defaultShopId!;

  return [
    {
      name: "printify_list_operations",
      description:
        `Browse all ${OPERATIONS.length} operations in the Printify API. Every one is reachable — ` +
        `Printify's API is entirely merchant-facing, so unlike most providers there is ` +
        `nothing here an ordinary token cannot call. Use this to find an operation id ` +
        `for printify_call.`,
      action: "read",
      input: z.object({
        search: z.string().optional().describe("Filter by id, path, tag or summary."),
      }),
      handler: async ({ search }) => d.browse(search),
    },

    {
      name: "printify_call",
      description:
        "Call any Printify operation by id. shop_id is filled in from PRINTIFY_SHOP_ID " +
        "when you leave it out.",
      action: "destructive", // the strictest any operation reachable here can be
      input: z.object({
        operation_id: z.string().min(1),
        params: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
        body: z.unknown().optional(),
      }),
      handler: ({ operation_id, params, body }) => d.call(operation_id, params ?? {}, body),
    },

    {
      name: "printify_get_shops",
      description: "The shops connected to this Printify account, with their ids.",
      action: "read",
      input: z.object({}),
      handler: () => http.get("/v1/shops.json"),
    },

    {
      name: "printify_list_products",
      description: "Products in a shop, paginated.",
      action: "read",
      input: z.object({
        shop_id: shopId(defaultShopId),
        page: pageNumber,
        limit: pageSize(100, 20),
      }),
      handler: ({ shop_id, page, limit }) =>
        http.get(`/v1/shops/${shop(shop_id)}/products.json`, { page, limit }),
    },

    {
      name: "printify_get_product",
      description: "One product in full, including variants, images and print areas.",
      action: "read",
      input: z.object({ shop_id: shopId(defaultShopId), product_id: z.string().min(1) }),
      handler: ({ shop_id, product_id }) =>
        http.get(`/v1/shops/${shop(shop_id)}/products/${encodeURIComponent(product_id)}.json`),
    },

    {
      name: "printify_upload_image",
      description:
        "Upload artwork to the Printify media library so it can be placed on a product. " +
        "Takes a publicly reachable URL — Printify fetches it server-side, so a local " +
        "file path will not work.",
      action: "write",
      input: z.object({
        file_name: z.string().min(1).describe("Name to store it under, e.g. design.png."),
        url: httpUrl.describe("Publicly reachable URL of the image."),
      }),
      handler: ({ file_name, url }) => http.post("/v1/uploads/images.json", { file_name, url }),
    },

    {
      name: "printify_list_orders",
      description: "Orders in a shop, most recent first.",
      action: "read",
      input: z.object({
        shop_id: shopId(defaultShopId),
        page: pageNumber,
        limit: pageSize(100, 20),
        status: z.string().optional().describe("Filter by Printify order status."),
      }),
      handler: ({ shop_id, page, limit, status }) =>
        http.get(`/v1/shops/${shop(shop_id)}/orders.json`, { page, limit, status }),
    },

    {
      name: "printify_publish_product",
      description:
        "Mark a product as published to its connected sales channel. Note this tells " +
        "Printify the product is live; the storefront itself is updated by whatever " +
        "integration owns that channel.",
      action: "write",
      input: z.object({
        shop_id: shopId(defaultShopId),
        product_id: z.string().min(1),
      }),
      handler: ({ shop_id, product_id }) =>
        http.post(`/v1/shops/${shop(shop_id)}/products/${encodeURIComponent(product_id)}/publish.json`, {
          title: true,
          description: true,
          images: true,
          variants: true,
          tags: true,
          keyFeatures: true,
          shipping_template: true,
        }),
    },

    {
      name: "printify_get_shipping_cost",
      description:
        "What an order would cost to ship, before placing it. Worth calling first — " +
        "placing an order is chargeable and cannot be undone.",
      action: "read",
      input: z.object({
        shop_id: shopId(defaultShopId),
        line_items: z.array(z.record(z.unknown())).min(1),
        address_to: z.record(z.unknown()),
      }),
      handler: ({ shop_id, line_items, address_to }) =>
        http.post(`/v1/shops/${shop(shop_id)}/orders/shipping.json`, { line_items, address_to }),
    },
  ];
}
