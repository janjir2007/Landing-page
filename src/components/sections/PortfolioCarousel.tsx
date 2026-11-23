import { type Dictionary } from "@/content/types";

import { PortfolioCtaCard } from "../ui/PortfolioCtaCard";
import { ProjectCard } from "../ui/ProjectCard";
import { SectionHeader } from "../ui/SectionHeader";

type Props = {
  t: Dictionary["portfolio"];
};

const CARD = "w-[82vw] max-w-[22rem] shrink-0 snap-start aspect-[4/5]";

/** Mobile / reduced-motion portfolio: native swipe carousel with scroll-snap (no JS). */
export function PortfolioCarousel({ t }: Props) {
  return (
    <div className="flex flex-col gap-10 py-24 sm:py-32">
      <SectionHeader eyebrow={t.eyebrow} title={t.title} className="shell" />

      {/* Focusable region so keyboard users can scroll it with arrow keys. */}
      <div
        role="region"
        aria-label={t.carouselLabel}
        tabIndex={0}
        className="flex snap-x snap-mandatory scroll-px-[var(--gutter)] overflow-x-auto overscroll-x-contain px-[var(--gutter)] pb-4"
      >
        <ul className="flex gap-4">
          {t.items.map((item, i) => (
            <li key={item.name} className={CARD}>
              <ProjectCard item={item} index={i} className="size-full" />
            </li>
          ))}
          <li className={CARD}>
            <PortfolioCtaCard t={t.cta} className="size-full" />
          </li>
        </ul>
      </div>
    </div>
  );
}
