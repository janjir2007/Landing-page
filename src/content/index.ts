import en from "./en";
import mn from "./mn";
import type { Dictionary, Locale } from "./types";

export * from "./types";

const dictionaries: Record<Locale, Dictionary> = { mn, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
