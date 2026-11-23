import { type Dictionary } from "@/content/types";
import { cn } from "@/lib/cn";

import { FadeUp } from "../motion/FadeUp";
import { FadeUpItem } from "../motion/FadeUpItem";

type Props = {
  t: Dictionary["logos"];
};

/** Client wordmarks. [Bracketed] entries are placeholders and render dimmed. */
export function Logos({ t }: Props) {
  return (
    <section aria-labelledby="logos-title" className="border-y border-border">
      <div className="shell flex flex-col gap-8 py-12 lg:flex-row lg:items-center lg:gap-16 lg:py-14">
        <h2
          id="logos-title"
          className="shrink-0 font-sans eyebrow leading-snug tracking-[0.08em] lg:max-w-[14ch]"
        >
          {t.label}
        </h2>
        <FadeUp
          as="ul"
          className="grid flex-1 grid-cols-2 items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5"
        >
          {t.items.map((name) => {
            const placeholder = name.startsWith("[");
            return (
              <FadeUpItem
                as="li"
                key={name}
                className={cn(
                  "font-display text-xl font-extrabold tracking-[-0.04em] whitespace-nowrap sm:text-2xl lg:text-center",
                  placeholder ? "text-base font-semibold text-muted sm:text-lg" : "text-fg/85",
                )}
              >
                {name}
              </FadeUpItem>
            );
          })}
        </FadeUp>
      </div>
    </section>
  );
}
