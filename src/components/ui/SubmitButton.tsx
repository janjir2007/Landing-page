"use client";

import { type ReactNode } from "react";

import { motion } from "motion/react";

import { useMagnetic } from "@/hooks/useMagnetic";
import { buttonClasses } from "@/lib/buttonStyles";

type Props = {
  children: ReactNode;
  pending: boolean;
  icon?: ReactNode;
  className?: string;
};

/** Magnetic primary <button type="submit">. Disabled + aria-busy while sending. */
export function SubmitButton({ children, pending, icon, className }: Props) {
  const { outer, inner, handlers } = useMagnetic();

  return (
    <motion.button
      type="submit"
      disabled={pending}
      aria-busy={pending || undefined}
      style={outer}
      {...handlers}
      className={buttonClasses("primary", "lg", className)}
    >
      <motion.span style={inner} className="inline-flex items-center gap-2.5">
        {children}
        {icon}
      </motion.span>
    </motion.button>
  );
}
