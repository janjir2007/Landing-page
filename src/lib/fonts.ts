import { Inter, Manrope } from "next/font/google";

/*
 * Both are variable fonts: one file per subset carries the whole weight axis
 * (Inter 100–900, Manrope 200–800), so every weight we use — Inter 400/500/600/700,
 * Manrope 600/700/800 — is a real outline, never synthesized.
 *
 * `cyrillic-ext` matters for Mongolian: Ө ө (U+04E8/9) and Ү ү (U+04AE/F) live
 * there, not in `cyrillic` (U+0400–045F). Listing it preloads that file too, so
 * those letters don't flash in the fallback font on first load.
 *
 * next/font options must be literals inside each call (compiled at build time),
 * so the subset list is repeated rather than shared.
 */

/** Body font. Exposes `--font-inter` (used by `--font-sans` in globals.css). */
export const inter = Inter({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-inter",
  display: "swap",
});

/** Heading font. Exposes `--font-manrope` (used by `--font-display`). */
export const manrope = Manrope({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-manrope",
  display: "swap",
});

export const fontVariables = `${inter.variable} ${manrope.variable}`;
