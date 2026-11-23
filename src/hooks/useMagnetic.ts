"use client";

import { type PointerEvent, useCallback } from "react";

import { type MotionValue, useMotionValue, useSpring, useTransform } from "motion/react";

import { MAGNETIC } from "@/lib/motion";

import { useHoverEffects } from "./useMotionPrefs";

type XY = { x: MotionValue<number>; y: MotionValue<number> };

type MagneticResult = {
  /** For the outer element's `style`. */
  outer: XY;
  /** For the inner label's `style` — offsets against `outer`, so it moves less. */
  inner: XY;
  /** Spread onto the outer element. Empty when effects are disabled. */
  handlers: {
    onPointerMove?: (e: PointerEvent<HTMLElement>) => void;
    onPointerLeave?: () => void;
  };
};

/**
 * Magnetic hover: the element drifts toward the cursor, the label drifts less.
 * Fine pointers only, never with reduced motion. Transform-only.
 */
export function useMagnetic(): MagneticResult {
  const enabled = useHoverEffects();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, MAGNETIC.spring);
  const sy = useSpring(y, MAGNETIC.spring);
  const ix = useTransform(sx, (v) => -v * MAGNETIC.innerLag);
  const iy = useTransform(sy, (v) => -v * MAGNETIC.innerLag);

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      if (e.pointerType !== "mouse") return;
      const r = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - (r.left + r.width / 2)) * MAGNETIC.strength);
      y.set((e.clientY - (r.top + r.height / 2)) * MAGNETIC.strength);
    },
    [x, y],
  );

  const onPointerLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return {
    outer: { x: sx, y: sy },
    inner: { x: ix, y: iy },
    handlers: enabled ? { onPointerMove, onPointerLeave } : {},
  };
}
