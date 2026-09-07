# printify-mcp-server

A [Model Context Protocol](https://modelcontextprotocol.io) server for the **Printify API**.

All **49** of Printify's published operations are reachable. Printify's API is entirely merchant-facing, so unlike most providers in this family there is nothing here an ordinary token cannot call — and the catalogue says so rather than quietly claiming a smaller surface.

MIT licensed.

## Install

```bash
npm install -g @nasdigitaluk/printify-mcp
```

Get a token from **Printify → My Profile → Connections → Personal Access Tokens**.

```json
{
  "mcpServers": {
    "printify": {
      "command": "printify-mcp",
      "env": {
        "PRINTIFY_API_KEY": "your-token",
        "PRINTIFY_SHOP_ID": "12345678"
      }
    }
  }
}
```

## Configuration

| Variable | |
|---|---|
| `PRINTIFY_API_KEY` | **Required.** |
| `PRINTIFY_SHOP_ID` | Optional but recommended. Nearly every route is scoped to a shop; set this and it is filled in whenever you leave it out. `printify_get_shops` lists yours. |
| `MCP_READ_ONLY=1` | Refuse anything that changes state. |
| `MCP_NO_DESTRUCTIVE=1` | Allow writes, refuse anything irreversible or chargeable. |

## ⚠️ Orders cost real money

This is the thing that makes Printify different from the other servers in this family, and it shapes how the tools are classified.

`destructive` here does **not** mean "deletes something". It means **irreversible or chargeable**:

| Operation | Why |
|---|---|
| `POST /orders.json` | Places a real order. |
| `POST /orders/express.json` | Same, expedited. |
| `POST .../send_to_production.json` | Commits an existing order to print. |
| `POST .../support-requests/refund` | Opens a chargeable support case. |
| `POST .../support-requests/reprint` | Same. |
| every `DELETE` | The ordinary meaning. |

Classifying order placement as a plain write would have made `MCP_NO_DESTRUCTIVE` useless to exactly the person it exists to protect. **8 of the 49 operations are destructive by this definition**, and there is a test asserting each one.

`printify_get_shipping_cost` is a `POST` that changes nothing, so it is classified `read` — it is the call that tells you what an order will cost *before* you commit to it, and a read-only server should still be able to make it.

## Tools

Nine tools cover 49 operations. Every tool description is paid for in the model's context window on every turn, so the common path gets purpose-built tools and everything else goes through one dispatcher.

| Tool | |
|---|---|
| `printify_list_operations` | Browse the catalogue. Start here. |
| `printify_call` | Call any operation by id. |
| `printify_get_shops` | Your shops and their ids. |
| `printify_list_products` | Products in a shop. |
| `printify_get_product` | One product in full. |
| `printify_upload_image` | Artwork into the media library. |
| `printify_list_orders` | Orders in a shop. |
| `printify_publish_product` | Mark a product published to its channel. |
| `printify_get_shipping_cost` | What an order would cost, before placing it. |

`printify_call` is declared `destructive` because it can reach a destructive operation. A read-only server has to refuse it outright rather than inspect the id after the fact.

**Artwork must be a publicly reachable URL.** Printify fetches it server-side, so a local file path cannot work — and the schema refuses `file://`, `javascript:` and anything with embedded credentials rather than letting it fail confusingly at the provider.

## Refreshing the catalogue

```bash
curl -o vendor/printify-openapi.json https://developers.printify.com/openapi.json
npm run generate
npm test
```

The coverage test compares the catalogue against the vendored spec, so an endpoint Printify adds fails the build rather than making this README untrue.

## A note on Printify's spec

Printify declares every parameter by `$ref` into `components.parameters`. That broke the first version of the shared generator, which filtered on `p.in === "path"` — a `$ref` object has no `in`, so all of them were dropped and the catalogue claimed these operations took no path parameters at all.

It surfaced because the dispatcher refuses a path it cannot fully resolve and **blames the catalogue rather than the caller**. Without that guard, the first call would have gone out with a literal `{shop_id}` in the URL and come back as an opaque 404. The generator now resolves refs, and also takes path parameters from the route template as the authority, so an undeclared one cannot go missing.

## Testing

```bash
npm test                                   # 13 tests
PRINTIFY_API_KEY=x npm run smoke           # real MCP over stdio
```

## Built on

[`@nasdigitaluk/mcp-server-core`](https://github.com/N-Graves/mcp-server-core).

## Licence

MIT.
