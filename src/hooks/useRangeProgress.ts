"use client";

import { type MotionValue, useTransform } from "motion/react";

import { clamp01 } from "@/lib/scroll";

/**
 * 0→1 as `progress` moves through [start, end], clamped.
 *
 * Use this instead of `useTransform(progress, [a, b], [0, 1])` for
 * scroll-linked values: Motion can offload array-mapped scroll opacity to a
 * native ScrollTimeline, which mis-mapped sub-ranges in testing. A function
 * transform always stays in JS.
 */
export function useRangeProgress(
  progress: MotionValue<number>,
  [start, end]: [number, number],
): MotionValue<number> {
  return useTransform(progress, (v) => clamp01((v - start) / (end - start || 1)));
}
