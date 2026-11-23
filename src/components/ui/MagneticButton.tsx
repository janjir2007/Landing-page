"use client";

import { type ReactNode } from "react";

import { motion } from "motion/react";

import { useMagnetic } from "@/hooks/useMagnetic";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/lib/buttonStyles";

type Props = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
  className?: string;
  icon?: ReactNode;
};

/** Pill link-button with a magnetic hover. `#hash` hrefs smooth-scroll. */
export function MagneticButton({
  href,
  children,
  variant = "primary",
  size = "lg",
  external,
  className,
  icon,
}: Props) {
  const { outer, inner, handlers } = useMagnetic();
  const { scrollTo } = useSmoothScroll();
  const isHash = href.startsWith("#");

  return (
    <motion.a
      href={href}
      style={outer}
      {...handlers}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={(e) => {
        if (!isHash || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        scrollTo(href);
      }}
      className={buttonClasses(variant, size, className)}
    >
      <motion.span style={inner} className="inline-flex items-center gap-2.5">
        {icon}
        {children}
      </motion.span>
    </motion.a>
  );
}
