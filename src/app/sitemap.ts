import type { MetadataRoute } from "next";

import { locales } from "@/content";
import { getSiteUrl } from "@/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().origin;
  const languages = Object.fromEntries(locales.map((l) => [l, `${base}/${l}`]));

  return locales.map((locale) => ({
    url: `${base}/${locale}`,
    changeFrequency: "monthly",
    priority: locale === "mn" ? 1 : 0.9,
    alternates: { languages },
  }));
}
