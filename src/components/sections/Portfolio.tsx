import { sectionIds } from "@/content/site";
import { type Dictionary } from "@/content/types";

import { PortfolioCarousel } from "./PortfolioCarousel";
import { PortfolioPinned } from "./PortfolioPinned";

type Props = {
  t: Dictionary["portfolio"];
};

/**
 * Two layouts, chosen by CSS only (no layout shift):
 * - lg+ with motion → pinned horizontal track (PortfolioPinned)
 * - mobile, or reduced motion at any size → swipe carousel
 */
export function Portfolio({ t }: Props) {
  return (
    // Pinned layout pads itself below the nav, so land the anchor at the very top there.
    <section
      id={sectionIds.work}
      aria-label={t.title}
      className="lg:scroll-mt-0 lg:motion-reduce:scroll-mt-[var(--nav-h)]"
    >
      <div className="hidden lg:block lg:motion-reduce:hidden">
        <PortfolioPinned t={t} />
      </div>
      <div className="lg:hidden lg:motion-reduce:block">
        <PortfolioCarousel t={t} />
      </div>
    </section>
  );
}
