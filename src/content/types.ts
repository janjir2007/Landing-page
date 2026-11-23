import type mn from "./mn";

/** Shape of every dictionary, derived from the Mongolian source. */
export type Dictionary = typeof mn;

export const locales = ["mn", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "mn";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);
