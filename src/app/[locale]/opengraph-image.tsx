import { ImageResponse } from "next/og";

import { locales } from "@/content";
import en from "@/content/en";
import { site } from "@/content/site";
import { colors } from "@/lib/theme";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Placeholder OG image, generated at build time. Latin-only text: the built-in
 * OG font has no Cyrillic glyphs. Swap for a designed `opengraph-image.png` later.
 */
export const alt = en.meta.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: colors.bg,
        color: colors.fg,
      }}
    >
      <div style={{ display: "flex", fontSize: 28, color: colors.muted, letterSpacing: 2 }}>
        {en.hero.eyebrow.toUpperCase()}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          fontSize: 220,
          fontWeight: 800,
          letterSpacing: -11,
          lineHeight: 1,
        }}
      >
        {site.name.replace(/\.$/, "")}
        <span style={{ color: colors.accent }}>.</span>
      </div>
    </div>,
    size,
  );
}
