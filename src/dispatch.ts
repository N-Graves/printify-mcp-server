/**
 * The Printify dispatcher.
 *
 * All the generic behaviour lives in the shared Dispatcher. The one thing
 * added here is the default shop: nearly every Printify route is scoped to
 * /shops/{shop_id}/..., and a merchant almost always has exactly one shop, so
 * requiring it on every single call is friction with no purpose. Set
 * PRINTIFY_SHOP_ID and it is filled in when omitted; pass shop_id explicitly
 * and that always wins.
 */

import { Dispatcher, ToolError, type HttpClient } from "@nasdigital/mcp-server-core";
import { OPERATIONS, type CataloguedOperation } from "./generated/operations.js";

export const COVERED = OPERATIONS.filter((o) => o.status === "covered");

export class PrintifyDispatcher extends Dispatcher<CataloguedOperation> {
  constructor(
    http: HttpClient,
    private readonly defaultShopId?: string,
  ) {
    super(http, OPERATIONS, "printify_list_operations");
  }

  override async call(
    id: string,
    params: Record<string, unknown> = {},
    body?: unknown,
  ): Promise<unknown> {
    const op = this.resolve(id);
    const filled = { ...params };

    if (op.pathParams.includes("shop_id") && !filled.shop_id) {
      if (!this.defaultShopId) {
        throw new ToolError(
          `${id} is scoped to a shop, so it needs shop_id. Either pass it, or set ` +
            `PRINTIFY_SHOP_ID so it is filled in automatically. ` +
            `printify_call with operation_id "getShops" lists your shops and their ids.`,
        );
      }
      filled.shop_id = this.defaultShopId;
    }

    return super.call(id, filled, body);
  }
}

export function createDispatcher(http: HttpClient, defaultShopId?: string) {
  return new PrintifyDispatcher(http, defaultShopId);
}
