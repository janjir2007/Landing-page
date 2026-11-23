"use client";

import { MEDIA } from "@/lib/media";

import { useMediaQuery } from "./useMediaQuery";

/** True when the user asked the OS to reduce motion. */
export function useReducedMotion() {
  return useMediaQuery(MEDIA.reducedMotion);
}

/**
 * True only after mount, on ≥ lg screens, without reduced motion. Pinned
 * sections render static markup until this flips; their `lg:` classes already
 * reserve the desktop layout, so nothing shifts.
 */
export function useScrollEffects() {
  const desktop = useMediaQuery(MEDIA.lg);
  const reduced = useReducedMotion();
  return desktop && !reduced;
}

/** Magnetic hover effects: mouse/trackpad only, no reduced motion. */
export function useHoverEffects() {
  const fine = useMediaQuery(MEDIA.finePointer);
  const reduced = useReducedMotion();
  return fine && !reduced;
}
