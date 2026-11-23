"use client";

import { motion, type MotionValue } from "motion/react";

import { useRangeProgress } from "@/hooks/useRangeProgress";
import { cn } from "@/lib/cn";

type Props = {
  num: string;
  title: string;
  active: boolean;
  progress: MotionValue<number>;
  /** This step's slice of the pin progress — drives the fill line. */
  range: [number, number];
};

/** One row of the pinned services list: highlight when active + scroll-linked fill line. */
export function ServiceStepItem({ num, title, active, progress, range }: Props) {
  const fill = useRangeProgress(progress, range);

  return (
    <li className="relative py-4">
      <div
        className={cn(
          "flex items-baseline gap-4 transition-opacity",
          // 0.55 keeps inactive rows ≥ 4.5:1 contrast on the background.
          active ? "opacity-100" : "opacity-55",
        )}
      >
        <span className="font-display text-sm text-muted tabular-nums">{num}</span>
        <span className="font-display text-h3 font-bold tracking-[-0.04em]">{title}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-border">
        <motion.div className="h-full origin-left bg-accent" style={{ scaleX: fill }} />
      </div>
    </li>
  );
}
