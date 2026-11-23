"use client";

import { type Locale, locales } from "@/content/types";
import { cn } from "@/lib/cn";

type Props = {
  current: Locale;
  label: string;
};

/** MN / EN switch. Keeps the current #section when switching. */
export function LocaleSwitch({ current, label }: Props) {
  return (
    <nav aria-label={label}>
      <ul className="flex items-center rounded-full border border-border p-1">
        {locales.map((l) => {
          const active = l === current;
          return (
            <li key={l}>
              <a
                href={`/${l}`}
                hrefLang={l}
                lang={l}
                aria-current={active ? "page" : undefined}
                onClick={(e) => {
                  if (active) {
                    e.preventDefault();
                    return;
                  }
                  // Read the hash at click time so the new page opens at the same section.
                  e.currentTarget.href = `/${l}${window.location.hash}`;
                }}
                className={cn(
                  "inline-flex h-9 min-w-11 items-center justify-center rounded-full px-3 text-xs font-semibold tracking-wider uppercase",
                  active ? "bg-fg text-bg" : "text-muted hover:text-fg",
                )}
              >
                {l}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
