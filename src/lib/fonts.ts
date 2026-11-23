import { Inter, Manrope } from "next/font/google";

/** Body font. Exposes `--font-inter` (used by `--font-sans` in globals.css). */
export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

/** Heading font. Exposes `--font-manrope` (used by `--font-display`). */
export const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const fontVariables = `${inter.variable} ${manrope.variable}`;
