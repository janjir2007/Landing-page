import { sectionIds } from "@/content/site";
import { type Dictionary } from "@/content/types";

import { ServicesPinned } from "./ServicesPinned";
import { FadeUp } from "../motion/FadeUp";
import { FadeUpItem } from "../motion/FadeUpItem";
import { SectionHeader } from "../ui/SectionHeader";
import { ServiceCard } from "../ui/ServiceCard";

type Props = {
  t: Dictionary["services"];
};

/**
 * Two layouts, chosen by CSS only (no layout shift):
 * - lg+ with motion → pinned phone + steps (ServicesPinned)
 * - mobile, or reduced motion at any size → stacked cards
 */
export function Services({ t }: Props) {
  return (
    // Pinned layout pads itself below the nav, so land the anchor at the very top there.
    <section
      id={sectionIds.services}
      aria-label={t.title}
      className="lg:scroll-mt-0 lg:motion-reduce:scroll-mt-[var(--nav-h)]"
    >
      <div className="hidden lg:block lg:motion-reduce:hidden">
        <ServicesPinned t={t} />
      </div>

      <div className="shell flex flex-col gap-10 py-24 sm:py-32 lg:hidden lg:motion-reduce:flex">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} />
        <FadeUp as="ul" className="grid gap-4 sm:grid-cols-2">
          {t.items.map((item) => (
            <FadeUpItem as="li" key={item.num}>
              <ServiceCard item={item} />
            </FadeUpItem>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
