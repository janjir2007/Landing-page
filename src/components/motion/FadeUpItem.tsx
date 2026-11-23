"use client";

import { type ReactNode } from "react";

import { motion, type Variants } from "motion/react";

import { useReducedMotion } from "@/hooks/useMotionPrefs";
import { EASE_OUT_EXPO, FADE_UP } from "@/lib/motion";

import { type FadeUpTag } from "./FadeUp";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: FADE_UP.distancePx },
  show: { opacity: 1, y: 0, transition: { duration: FADE_UP.duration, ease: EASE_OUT_EXPO } },
};

const staticVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

type Props = {
  children: ReactNode;
  className?: string;
  as?: FadeUpTag;
};

/**
 * One item inside <FadeUp>. `data-reveal` lets the <noscript> rule in the
 * layout show content when JS is off.
 */
export function FadeUpItem({ children, className, as = "div" }: Props) {
  const reduced = useReducedMotion();
  const Comp = motion[as];

  return (
    <Comp data-reveal className={className} variants={reduced ? staticVariants : itemVariants}>
      {children}
    </Comp>
  );
}
