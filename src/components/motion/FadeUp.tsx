"use client";

import { type ReactNode } from "react";

import { motion, type Variants } from "motion/react";

import { useReducedMotion } from "@/hooks/useMotionPrefs";
import { FADE_UP } from "@/lib/motion";

const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: FADE_UP.stagger, delayChildren: FADE_UP.delayChildren } },
};

export type FadeUpTag =
  "div" | "ul" | "ol" | "li" | "p" | "header" | "figure" | "figcaption" | "blockquote";

type Props = {
  children: ReactNode;
  className?: string;
  as?: FadeUpTag;
};

/**
 * Staggers its <FadeUpItem> children in (fade + rise) once the group scrolls
 * into view. With reduced motion the items render in place.
 */
export function FadeUp({ children, className, as = "div" }: Props) {
  const reduced = useReducedMotion();
  const Comp = motion[as];

  return (
    <Comp
      className={className}
      variants={groupVariants}
      initial={reduced ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: FADE_UP.viewportMargin }}
    >
      {children}
    </Comp>
  );
}
