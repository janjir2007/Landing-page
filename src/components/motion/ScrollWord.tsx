"use client";

import { motion, type MotionValue, useTransform } from "motion/react";

import { useRangeProgress } from "@/hooks/useRangeProgress";
import { STATEMENT } from "@/lib/motion";

type Props = {
  word: string;
  progress: MotionValue<number>;
  /** Slice of `progress` over which this word reveals. */
  range: [number, number];
  enabled: boolean;
};

/**
 * One scroll-linked word: rises, un-blurs and turns grey → white over `range`.
 * The white copy is a stacked, aria-hidden overlay so only opacity animates
 * (no colour transition). Disabled → plain text.
 */
export function ScrollWord({ word, progress, range, enabled }: Props) {
  const t = useRangeProgress(progress, range);
  const y = useTransform(t, (v) => `${(1 - v) * STATEMENT.riseEm}em`);
  // Drop the filter entirely once sharp so the word stops being its own layer.
  const filter = useTransform(t, (v) =>
    v > 0.995 ? "none" : `blur(${(1 - v) * STATEMENT.blurPx}px)`,
  );

  if (!enabled) return <span>{word}</span>;

  return (
    <motion.span className="relative inline-block" style={{ y, filter }}>
      <span className="text-muted/70">{word}</span>
      <motion.span aria-hidden className="absolute inset-0 text-fg" style={{ opacity: t }}>
        {word}
      </motion.span>
    </motion.span>
  );
}
