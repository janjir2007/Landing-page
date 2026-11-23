import { cn } from "@/lib/cn";

import { FadeUp } from "../motion/FadeUp";
import { FadeUpItem } from "../motion/FadeUpItem";

type Props = {
  eyebrow: string;
  title: string;
  /** Give the h2 an id so the section can use aria-labelledby. */
  id?: string;
  className?: string;
};

/** Eyebrow + h2 used by every normal section, with the standard fade-up. */
export function SectionHeader({ eyebrow, title, id, className }: Props) {
  return (
    <FadeUp className={cn("flex flex-col gap-4", className)}>
      <FadeUpItem as="p" className="eyebrow">
        {eyebrow}
      </FadeUpItem>
      <FadeUpItem>
        <h2 id={id} className="text-h2">
          {title}
        </h2>
      </FadeUpItem>
    </FadeUp>
  );
}
