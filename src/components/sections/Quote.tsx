import { type Dictionary } from "@/content/types";

import { FadeUp } from "../motion/FadeUp";
import { FadeUpItem } from "../motion/FadeUpItem";

type Props = {
  t: Dictionary["quote"];
};

/** Client testimonial — normal scroll, staggered fade-up. */
export function Quote({ t }: Props) {
  return (
    <section aria-label={t.author} className="border-t border-border">
      <FadeUp as="figure" className="shell flex flex-col gap-10 py-24 sm:py-32 lg:py-40">
        <FadeUpItem>
          <span
            aria-hidden
            className="block font-display text-[clamp(4rem,3rem+5vw,8rem)] leading-[0.6] font-extrabold text-accent"
          >
            “
          </span>
        </FadeUpItem>
        <FadeUpItem as="blockquote">
          <p className="max-w-[28ch] font-display text-h2 leading-[1.05] font-bold tracking-[-0.05em] text-balance">
            {t.text}
          </p>
        </FadeUpItem>
        <FadeUpItem as="figcaption" className="flex flex-col gap-1">
          <span className="font-semibold">{t.author}</span>
          <span className="text-sm text-muted">{t.role}</span>
        </FadeUpItem>
      </FadeUp>
    </section>
  );
}
