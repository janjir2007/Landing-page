import { type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { LOAD_REVEAL } from "@/lib/motion";

type Props = {
  children: ReactNode;
  /** Delay before this block fades in, ms. */
  delay?: number;
  className?: string;
  as?: "div" | "p" | "ul";
};

/** Load-time fade-up for an above-the-fold block (CSS only, `.fade-in` in globals.css). */
export function FadeIn({ children, delay = 0, className, as: Tag = "div" }: Props) {
  return (
    <Tag
      className={cn("fade-in", className)}
      style={{
        animationDuration: `${LOAD_REVEAL.blockDurationMs}ms`,
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
