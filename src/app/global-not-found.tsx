import type { Metadata } from "next";
import Link from "next/link";

import { getDictionary } from "@/content";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

const mn = getDictionary("mn").notFound;
const en = getDictionary("en").notFound;

export const metadata: Metadata = {
  title: `404 — ${mn.title}`,
  robots: { index: false },
};

/** Bilingual 404 for any URL that doesn't match a route. */
export default function GlobalNotFound() {
  return (
    <html lang="mn" className={fontVariables}>
      <body>
        <main id="main" className="shell flex min-h-svh flex-col items-start justify-center gap-8">
          <p className="eyebrow">404</p>
          <h1 className="text-h2">
            {mn.title}
            <span className="block text-muted" lang="en">
              {en.title}
            </span>
          </h1>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/mn"
              className="inline-flex min-h-11 items-center rounded-full bg-accent px-6 font-semibold text-accent-fg"
            >
              {mn.back}
            </Link>
            <Link
              href="/en"
              lang="en"
              className="inline-flex min-h-11 items-center rounded-full border border-border px-6"
            >
              {en.back}
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
