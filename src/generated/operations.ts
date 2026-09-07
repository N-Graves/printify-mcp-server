/**
 * GENERATED FILE - do not edit by hand.
 *
 * Produced by scripts/generate-operations.mjs from vendor/printify-openapi.json
 * (Printify Public API, OpenAPI 3.0.3).
 *
 * 49 operations, all of them reachable: Printify's API is entirely
 * merchant-facing, so unlike the other servers in this family there is nothing
 * here an ordinary token cannot call.
 *
 * 25 read, 16 write, 8 destructive - where destructive means
 * irreversible OR chargeable. Placing an order and sending it to production
 * both cost real money and cannot be undone, so they sit with the deletes.
 */
import type { Operation } from "@nasdigitaluk/mcp-server-core";

export interface CataloguedOperation extends Operation {
  tags: string[];
  summary: string;
  pathParams: string[];
  queryParams: string[];
  hasBody: boolean;
  /** Consequence, not HTTP verb: destructive means irreversible OR chargeable. */
  action: "read" | "write" | "destructive";
}

export const OPERATIONS: CataloguedOperation[] = [
  {
    "id": "retrievesListOfBlueprintsInTheCatalog",
    "method": "GET",
    "path": "/v1/catalog/blueprints.json",
    "tags": [
      "Catalog"
    ],
    "summary": "Retrieves list of blueprints in the catalog",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  },
  {
    "id": "retrieveASpecificBlueprint",
    "method": "GET",
    "path": "/v1/catalog/blueprints/{blueprint_id}.json",
    "tags": [
      "Catalog"
    ],
    "summary": "Retrieve a specific blueprint",
    "pathParams": [
      "blueprint_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  },
  {
    "id": "retrieveAListOfAllPrintProvidersThatFulfillOrdersForASpecificBlueprint",
    "method": "GET",
    "path": "/v1/catalog/blueprints/{blueprint_id}/print_providers.json",
    "tags": [
      "Catalog"
    ],
    "summary": "Retrieve a list of all print providers that fulfill orders for a specific blueprint",
    "pathParams": [
      "blueprint_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  },
  {
    "id": "retrieveAListOfVariantsOfABlueprintFromASpecificPrintProvider",
    "method": "GET",
    "path": "/v1/catalog/blueprints/{blueprint_id}/print_providers/{print_provider_id}/variants.json",
    "tags": [
      "Catalog"
    ],
    "summary": "Retrieve a list of variants of a blueprint from a specific print provider",
    "pathParams": [
      "blueprint_id",
      "print_provider_id"
    ],
    "queryParams": [
      "show-out-of-stock "
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  },
  {
    "id": "retrieveShippingInformation",
    "method": "GET",
    "path": "/v1/catalog/blueprints/{blueprint_id}/print_providers/shipping.json",
    "tags": [
      "Catalog"
    ],
    "summary": "Retrieve shipping information",
    "pathParams": [
      "blueprint_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  },
  {
    "id": "retrieveEconomyShippingMethodInformation",
    "method": "GET",
    "path": "/v1/catalog/blueprints/{blueprint_id}/print_providers/shipping/economy.json",
    "tags": [
      "V2 Catalog Blueprints"
    ],
    "summary": "Retrieve economy shipping method information",
    "pathParams": [
      "blueprint_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  },
  {
    "id": "retrieveExpressShippingMethodInformation",
    "method": "GET",
    "path": "/v1/catalog/blueprints/{blueprint_id}/print_providers/shipping/express.json",
    "tags": [
      "V2 Catalog Blueprints"
    ],
    "summary": "Retrieve express shipping method information",
    "pathParams": [
      "blueprint_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  },
  {
    "id": "retrievePriorityShippingMethodInformation",
    "method": "GET",
    "path": "/v1/catalog/blueprints/{blueprint_id}/print_providers/shipping/priority.json",
    "tags": [
      "V2 Catalog Blueprints"
    ],
    "summary": "Retrieve priority shipping method information",
    "pathParams": [
      "blueprint_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  },
  {
    "id": "retrieveSpecificShippingMethodInformation",
    "method": "GET",
    "path": "/v1/catalog/blueprints/{blueprint_id}/print_providers/shipping/standard.json",
    "tags": [
      "V2 Catalog Blueprints"
    ],
    "summary": "Retrieve specific shipping method information",
    "pathParams": [
      "blueprint_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  },
  {
    "id": "retrieveAListOfAvailablePrintProviders",
    "method": "GET",
    "path": "/v1/catalog/print_providers.json",
    "tags": [
      "Catalog"
    ],
    "summary": "Retrieve a list of available print providers",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  },
  {
    "id": "retrieveASpecificPrintProvider",
    "method": "GET",
    "path": "/v1/catalog/print_providers/{print_provider_id}.json",
    "tags": [
      "Catalog"
    ],
    "summary": "Retrieve a specific print provider",
    "pathParams": [
      "print_provider_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  },
  {
    "id": "retrieveListOfShopsInAPrintifyAccount",
    "method": "GET",
    "path": "/v1/shops.json",
    "tags": [
      "Shops"
    ],
    "summary": "Retrieve list of shops in a Printify account",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  },
  {
    "id": "disconnectAShop",
    "method": "DELETE",
    "path": "/v1/shops/{shop_id}/connection.json",
    "tags": [
      "Shops"
    ],
    "summary": "Disconnect a shop",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "destructive"
  },
  {
    "id": "retrieveAListOfOrders",
    "method": "GET",
    "path": "/v1/shops/{shop_id}/orders.json",
    "tags": [
      "Orders"
    ],
    "summary": "Retrieve a list of orders",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [
      "limit",
      "page",
      "status",
      "sku"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  },
  {
    "id": "submitAnOrder",
    "method": "POST",
    "path": "/v1/shops/{shop_id}/orders.json",
    "tags": [
      "Orders"
    ],
    "summary": "Submit an order",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "printify_call",
    "action": "destructive"
  },
  {
    "id": "getOrderDetailsById",
    "method": "GET",
    "path": "/v1/shops/{shop_id}/orders/{order_id}.json",
    "tags": [
      "Orders"
    ],
    "summary": "Get order details by ID",
    "pathParams": [
      "shop_id",
      "order_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  },
  {
    "id": "cancelAnOrder",
    "method": "POST",
    "path": "/v1/shops/{shop_id}/orders/{order_id}/cancel.json",
    "tags": [
      "Orders"
    ],
    "summary": "Cancel an order",
    "pathParams": [
      "shop_id",
      "order_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "write"
  },
  {
    "id": "sendAnExistingOrderToProduction",
    "method": "POST",
    "path": "/v1/shops/{shop_id}/orders/{order_id}/send_to_production.json",
    "tags": [
      "Orders"
    ],
    "summary": "Send an existing order to production",
    "pathParams": [
      "shop_id",
      "order_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "destructive"
  },
  {
    "id": "retrieveAListOfOrderSupportRequests",
    "method": "GET",
    "path": "/v1/shops/{shop_id}/orders/{order_id}/support-requests",
    "tags": [
      "Support Requests"
    ],
    "summary": "Retrieve a list of support requests for an order",
    "pathParams": [
      "shop_id",
      "order_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  },
  {
    "id": "getOrderSupportRequestById",
    "method": "GET",
    "path": "/v1/shops/{shop_id}/orders/{order_id}/support-requests/{supportRequestId}",
    "tags": [
      "Support Requests"
    ],
    "summary": "Get an order support request by ID",
    "pathParams": [
      "shop_id",
      "order_id",
      "supportRequestId"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  },
  {
    "id": "submitOrderAddressChangeSupportRequest",
    "method": "POST",
    "path": "/v1/shops/{shop_id}/orders/{order_id}/support-requests/address-change",
    "tags": [
      "Orders"
    ],
    "summary": "Change an order's shipping address",
    "pathParams": [
      "shop_id",
      "order_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "printify_call",
    "action": "write"
  },
  {
    "id": "requestAnOrderRefund",
    "method": "POST",
    "path": "/v1/shops/{shop_id}/orders/{order_id}/support-requests/refund",
    "tags": [
      "Orders"
    ],
    "summary": "Request a refund for an order",
    "pathParams": [
      "shop_id",
      "order_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "printify_call",
    "action": "destructive"
  },
  {
    "id": "requestAnOrderReprint",
    "method": "POST",
    "path": "/v1/shops/{shop_id}/orders/{order_id}/support-requests/reprint",
    "tags": [
      "Orders"
    ],
    "summary": "Request a reprint for an order",
    "pathParams": [
      "shop_id",
      "order_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "printify_call",
    "action": "destructive"
  },
  {
    "id": "submitAPrintifyExpressOrder",
    "method": "POST",
    "path": "/v1/shops/{shop_id}/orders/express.json",
    "tags": [
      "Orders"
    ],
    "summary": "Submit a Printify Express order",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "printify_call",
    "action": "destructive"
  },
  {
    "id": "calculateTheShippingCostOfAnOrder",
    "method": "POST",
    "path": "/v1/shops/{shop_id}/orders/shipping.json",
    "tags": [
      "Orders"
    ],
    "summary": "Calculate the shipping cost of an order",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "printify_call",
    "action": "write"
  },
  {
    "id": "retrieveAListOfProducts",
    "method": "GET",
    "path": "/v1/shops/{shop_id}/products.json",
    "tags": [
      "Products"
    ],
    "summary": "Retrieve a list of products",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [
      "limit",
      "page"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  },
  {
    "id": "createANewProduct",
    "method": "POST",
    "path": "/v1/shops/{shop_id}/products.json",
    "tags": [
      "Products"
    ],
    "summary": "Create a new product",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "printify_call",
    "action": "write"
  },
  {
    "id": "deleteAProduct",
    "method": "DELETE",
    "path": "/v1/shops/{shop_id}/products/{product_id}.json",
    "tags": [
      "Products"
    ],
    "summary": "Delete a product",
    "pathParams": [
      "shop_id",
      "product_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "destructive"
  },
  {
    "id": "retrieveAProduct",
    "method": "GET",
    "path": "/v1/shops/{shop_id}/products/{product_id}.json",
    "tags": [
      "Products"
    ],
    "summary": "Retrieve a product",
    "pathParams": [
      "shop_id",
      "product_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  },
  {
    "id": "updateAProduct",
    "method": "PUT",
    "path": "/v1/shops/{shop_id}/products/{product_id}.json",
    "tags": [
      "Products"
    ],
    "summary": "Update a product",
    "pathParams": [
      "shop_id",
      "product_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "printify_call",
    "action": "write"
  },
  {
    "id": "retrieveProductGpsrInformation",
    "method": "GET",
    "path": "/v1/shops/{shop_id}/products/{product_id}/gpsr.json",
    "tags": [
      "Products"
    ],
    "summary": "Retrieve product GPSR information",
    "pathParams": [
      "shop_id",
      "product_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  },
  {
    "id": "retrievePersonalizationOptions",
    "method": "GET",
    "path": "/v1/shops/{shop_id}/products/{product_id}/personalization_options.json",
    "tags": [
      "Personalization"
    ],
    "summary": "Retrieve personalization options",
    "pathParams": [
      "shop_id",
      "product_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  },
  {
    "id": "requestAPersonalizationPreview",
    "method": "POST",
    "path": "/v1/shops/{shop_id}/products/{product_id}/personalization_previews.json",
    "tags": [
      "Personalization"
    ],
    "summary": "Request a personalization preview",
    "pathParams": [
      "shop_id",
      "product_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "printify_call",
    "action": "write"
  },
  {
    "id": "retrieveAPersonalizationPreviewTaskStatus",
    "method": "GET",
    "path": "/v1/shops/{shop_id}/products/{product_id}/personalization_previews/tasks/{task_id}.json",
    "tags": [
      "Personalization"
    ],
    "summary": "Retrieve a personalization preview task status",
    "pathParams": [
      "shop_id",
      "product_id",
      "task_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  },
  {
    "id": "createAPersonalizationConfiguration",
    "method": "POST",
    "path": "/v1/shops/{shop_id}/products/{product_id}/personalization.json",
    "tags": [
      "Personalization"
    ],
    "summary": "Create a personalization configuration",
    "pathParams": [
      "shop_id",
      "product_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "printify_call",
    "action": "write"
  },
  {
    "id": "publishAProduct",
    "method": "POST",
    "path": "/v1/shops/{shop_id}/products/{product_id}/publish.json",
    "tags": [
      "Products"
    ],
    "summary": "Publish a product",
    "pathParams": [
      "shop_id",
      "product_id"
    ],
    "queryParams": [
      "limit",
      "page"
    ],
    "hasBody": true,
    "status": "covered",
    "tool": "printify_call",
    "action": "write"
  },
  {
    "id": "setProductPublishStatusToFailed",
    "method": "POST",
    "path": "/v1/shops/{shop_id}/products/{product_id}/publishing_failed.json",
    "tags": [
      "Products"
    ],
    "summary": "Set product publish status to failed",
    "pathParams": [
      "shop_id",
      "product_id"
    ],
    "queryParams": [
      "limit",
      "page"
    ],
    "hasBody": true,
    "status": "covered",
    "tool": "printify_call",
    "action": "write"
  },
  {
    "id": "setProductPublishStatusToSucceeded",
    "method": "POST",
    "path": "/v1/shops/{shop_id}/products/{product_id}/publishing_succeeded.json",
    "tags": [
      "Products"
    ],
    "summary": "Set product publish status to succeeded",
    "pathParams": [
      "shop_id",
      "product_id"
    ],
    "queryParams": [
      "limit",
      "page"
    ],
    "hasBody": true,
    "status": "covered",
    "tool": "printify_call",
    "action": "write"
  },
  {
    "id": "notifyThatAProductHasBeenUnpublished",
    "method": "POST",
    "path": "/v1/shops/{shop_id}/products/{product_id}/unpublish.json",
    "tags": [
      "Products"
    ],
    "summary": "Notify that a product has been unpublished",
    "pathParams": [
      "shop_id",
      "product_id"
    ],
    "queryParams": [
      "limit",
      "page"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "write"
  },
  {
    "id": "retrieveAListOfWebhooks",
    "method": "GET",
    "path": "/v1/shops/{shop_id}/webhooks.json",
    "tags": [
      "Webhooks"
    ],
    "summary": "Retrieve a list of webhooks",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [
      "limit",
      "page"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  },
  {
    "id": "createANewWebhook",
    "method": "POST",
    "path": "/v1/shops/{shop_id}/webhooks.json",
    "tags": [
      "Webhooks"
    ],
    "summary": "Create a new webhook",
    "pathParams": [
      "shop_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "printify_call",
    "action": "write"
  },
  {
    "id": "deleteAWebhook",
    "method": "DELETE",
    "path": "/v1/shops/{shop_id}/webhooks/{webhook_id}.json",
    "tags": [
      "Webhooks"
    ],
    "summary": "Delete a webhook",
    "pathParams": [
      "shop_id",
      "webhook_id"
    ],
    "queryParams": [
      "host"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "destructive"
  },
  {
    "id": "modifyAWebhook",
    "method": "PUT",
    "path": "/v1/shops/{shop_id}/webhooks/{webhook_id}.json",
    "tags": [
      "Webhooks"
    ],
    "summary": "Modify a webhook",
    "pathParams": [
      "shop_id",
      "webhook_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "printify_call",
    "action": "write"
  },
  {
    "id": "simulateWebhook",
    "method": "POST",
    "path": "/v1/shops/{shop_id}/webhooks/{webhook_id}/simulate",
    "tags": [
      "Webhooks"
    ],
    "summary": "Simulate a webhook",
    "pathParams": [
      "shop_id",
      "webhook_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "write"
  },
  {
    "id": "retrieveAListOfUploadedImages",
    "method": "GET",
    "path": "/v1/uploads.json",
    "tags": [
      "Uploads"
    ],
    "summary": "Retrieve a list of uploaded images",
    "pathParams": [],
    "queryParams": [
      "limit",
      "page"
    ],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  },
  {
    "id": "retrieveAnUploadedImageById",
    "method": "GET",
    "path": "/v1/uploads/{image_id}.json",
    "tags": [
      "Uploads"
    ],
    "summary": "Retrieve an uploaded image by id",
    "pathParams": [
      "image_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  },
  {
    "id": "archiveAnUploadedImage",
    "method": "POST",
    "path": "/v1/uploads/{image_id}/archive.json",
    "tags": [
      "Uploads"
    ],
    "summary": "Archive an uploaded image",
    "pathParams": [
      "image_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "write"
  },
  {
    "id": "uploadAnImage",
    "method": "POST",
    "path": "/v1/uploads/images.json",
    "tags": [
      "Uploads"
    ],
    "summary": "Upload an image",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "status": "covered",
    "tool": "printify_call",
    "action": "write"
  },
  {
    "id": "retrieveAvailableShippingListInformation",
    "method": "GET",
    "path": "/v2/catalog/blueprints/{blueprint_id}/print_providers/{print_provider_id}/shipping.json",
    "tags": [
      "V2 Catalog Blueprints"
    ],
    "summary": "Retrieve available shipping list information",
    "pathParams": [
      "blueprint_id",
      "print_provider_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "status": "covered",
    "tool": "printify_call",
    "action": "read"
  }
];

export const OPERATIONS_BY_ID = new Map(OPERATIONS.map((o) => [o.id, o]));
