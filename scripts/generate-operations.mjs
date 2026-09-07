/**
 * Generate src/generated/operations.ts from the vendored Printify OpenAPI spec.
 *
 *   npm run generate
 *
 * To refresh:
 *   curl -o vendor/printify-openapi.json https://developers.printify.com/openapi.json
 *   npm run generate && npm test
 *
 * Printify's API is unusual in this family: every one of its 49 operations is
 * merchant-facing, so there is nothing here that an ordinary API token cannot
 * call. The exclusion list is therefore empty, and that is the honest answer
 * rather than a shorter claim.
 *
 * What DOES need care is consequence. Several of these place real, chargeable
 * orders and send them to production, so they are classified destructive
 * alongside the deletes - see actionFor below.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { buildCatalogue, renderCatalogue, reportBuild } from "@nasdigitaluk/mcp-server-core/generate";

const ROOT = new URL("..", import.meta.url).pathname;
const spec = JSON.parse(readFileSync(join(ROOT, "vendor/printify-openapi.json"), "utf8"));

/**
 * Operations that cost money or cannot be undone.
 *
 * Printify charges for an order the moment it goes to production, and there is
 * no endpoint that un-charges it. Grouping these with the deletes is what
 * makes MCP_NO_DESTRUCTIVE mean something to a shop owner.
 */
const IRREVERSIBLE = [
  /\/orders\.json$/,                        // places a real order
  /\/orders\/express\.json$/,               // ditto, express
  /\/send_to_production\.json$/,            // commits an existing order
  /\/support-requests\/(refund|reprint)$/,  // opens a chargeable support case
];

const actionFor = (op) => {
  if (op.method === "GET") return "read";
  if (op.method === "DELETE") return "destructive";
  if (IRREVERSIBLE.some((re) => re.test(op.path))) return "destructive";
  return "write";
};

const result = buildCatalogue(spec, {
  stripPrefix: "/v1",
  exclusions: [],
  toolFor: () => "printify_call",
  actionFor,
});

const counts = result.operations.reduce((acc, o) => ({ ...acc, [o.action]: (acc[o.action] ?? 0) + 1 }), {});

const header = `/**
 * GENERATED FILE - do not edit by hand.
 *
 * Produced by scripts/generate-operations.mjs from vendor/printify-openapi.json
 * (Printify Public API, OpenAPI ${spec.openapi}).
 *
 * ${result.operations.length} operations, all of them reachable: Printify's API is entirely
 * merchant-facing, so unlike the other servers in this family there is nothing
 * here an ordinary token cannot call.
 *
 * ${counts.read ?? 0} read, ${counts.write ?? 0} write, ${counts.destructive ?? 0} destructive - where destructive means
 * irreversible OR chargeable. Placing an order and sending it to production
 * both cost real money and cannot be undone, so they sit with the deletes.
 */`;

mkdirSync(join(ROOT, "src/generated"), { recursive: true });
writeFileSync(join(ROOT, "src/generated/operations.ts"), renderCatalogue(result, header), "utf8");
reportBuild(result);
console.log(`  by consequence: ${JSON.stringify(counts)}`);
