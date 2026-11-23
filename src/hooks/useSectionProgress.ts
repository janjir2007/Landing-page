"use client";

import { type RefObject } from "react";

import { type MotionValue, useScroll } from "motion/react";

/**
 * Scroll progress (0 → 1) through a pinned section: a tall outer <section ref>
 * wrapping a `sticky top-0 h-svh` inner.
 * 0 = section top reaches the viewport top (pin starts),
 * 1 = section bottom reaches the viewport bottom (pin ends).
 */
export function useSectionProgress(ref: RefObject<HTMLElement | null>): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return scrollYProgress;
}
