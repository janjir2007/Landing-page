import { cacheLife } from "next/cache";

/**
 * Current year for the footer. Cache Components forbids `new Date()` in a
 * prerender, so it runs inside a cached scope that refreshes daily — the static
 * page picks up the new year on 1 January without a redeploy.
 */
export async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
