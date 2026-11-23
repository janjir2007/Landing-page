import { type Dictionary } from "@/content/types";

import { FadeUp } from "../motion/FadeUp";
import { FadeUpItem } from "../motion/FadeUpItem";
import { SectionHeader } from "../ui/SectionHeader";

type Props = {
  t: Dictionary["process"];
};

/** Four steps in a row (2×2 on tablet, stacked on mobile). */
export function Process({ t }: Props) {
  return (
    <section aria-labelledby="process-title" className="border-t border-border">
      <div className="shell flex flex-col gap-14 py-24 sm:py-32">
        <SectionHeader id="process-title" eyebrow={t.eyebrow} title={t.title} />
        <FadeUp as="ol" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((step, i) => (
            <FadeUpItem as="li" key={step.title} className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="font-display text-sm text-muted tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="h-px flex-1 bg-border" />
              </div>
              <h3 className="text-h3">{step.title}</h3>
              <p className="text-muted">{step.body}</p>
            </FadeUpItem>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
