"use client";

import { useCallback, useSyncExternalStore } from "react";

import { type MotionValue } from "motion/react";

/** Index of the last start ≤ v (0 before the first start). */
const toStep = (v: number, starts: readonly number[]) => {
  let step = 0;
  starts.forEach((start, i) => {
    if (v >= start) step = i;
  });
  return step;
};

/**
 * Discrete step for a 0→1 progress, given the progress at which each step
 * starts. Re-renders only when the step changes, not on every scroll frame.
 * Server and hydration render step 0; the real value follows after mount.
 */
export function useStepIndex(progress: MotionValue<number>, starts: readonly number[]): number {
  const subscribe = useCallback(
    (onChange: () => void) => progress.on("change", onChange),
    [progress],
  );

  return useSyncExternalStore(
    subscribe,
    () => toStep(progress.get(), starts),
    () => 0,
  );
}
