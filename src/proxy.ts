import { type NextRequest, NextResponse } from "next/server";

import { defaultLocale, hasLocale, type Locale } from "@/content/types";

/** Any unmatched multi-segment path — Next answers it with app/global-not-found.tsx (404). */
const NOT_FOUND_PATH = "/_404/not-found";

/**
 * - "/" → "/mn" by default, or "/en" when Accept-Language ranks English above
 *   Mongolian (or lists English but not Mongolian).
 * - "/<unknown>" → rewritten so the branded global 404 is served. The root
 *   layout lives under /[locale], so it can't render a 404 for a bad locale.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferredLocale(request.headers.get("accept-language"))}`;
    const res = NextResponse.redirect(url, 307);
    res.headers.set("Vary", "Accept-Language");
    return res;
  }

  if (!hasLocale(pathname.split("/")[1] ?? "")) {
    const url = request.nextUrl.clone();
    url.pathname = NOT_FOUND_PATH;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  // Everything except Next internals, API routes and files with an extension.
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};

/** Highest-q match between mn and en; ties and no match fall back to mn. */
function preferredLocale(header: string | null): Locale {
  if (!header) return defaultLocale;

  const q: Record<Locale, number> = { mn: -1, en: -1 };
  for (const part of header.split(",")) {
    const [tag = "", ...params] = part.trim().toLowerCase().split(";");
    const qParam = params.find((p) => p.trim().startsWith("q="));
    const weight = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
    const lang = tag.split("-")[0] ?? "";
    if (Number.isNaN(weight) || !hasLocale(lang)) continue;
    q[lang] = Math.max(q[lang], weight);
  }

  return q.en > q.mn ? "en" : defaultLocale;
}
