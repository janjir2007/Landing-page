"use client";

import { type FocusEvent, useEffect, useRef } from "react";

import { motion, useMotionValue, useMotionValueEvent, useTransform } from "motion/react";

import { type Dictionary } from "@/content/types";
import { useScrollEffects } from "@/hooks/useMotionPrefs";
import { useRangeProgress } from "@/hooks/useRangeProgress";
import { useSectionProgress } from "@/hooks/useSectionProgress";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { PORTFOLIO } from "@/lib/motion";

import { PortfolioCtaCard } from "../ui/PortfolioCtaCard";
import { ProjectCard } from "../ui/ProjectCard";

type Props = {
  t: Dictionary["portfolio"];
};

/** Card height drives the track length; the aspect ratio keeps cards portrait. */
const CARD = "h-[min(62svh,560px)] aspect-[4/5] shrink-0";

/**
 * Desktop pinned portfolio. 250vh = 1 screen of layout + 1.5 screens of pin.
 * Vertical progress moves the track left by exactly its overflow, measured with
 * a ResizeObserver. The measurement only feeds a transform, so it can't shift layout.
 */
export function PortfolioPinned({ t }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const enabled = useScrollEffects();
  const { scrollToY } = useSmoothScroll();

  const progress = useSectionProgress(ref);
  const travel = useRangeProgress(progress, [PORTFOLIO.travelStart, PORTFOLIO.travelEnd]);
  const distance = useMotionValue(0);
  const x = useTransform(() => -travel.get() * distance.get());

  // Overflow = how far the last card's right edge (+ end padding) sits past the viewport.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const last = track.lastElementChild as HTMLElement | null;
      if (!last) return;
      const endPad = parseFloat(getComputedStyle(track).paddingRight) || 0;
      const contentRight = last.offsetLeft + last.offsetWidth + endPad;
      distance.set(Math.max(0, contentRight - track.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, [distance]);

  // Progress bar value for assistive tech, without re-rendering every frame.
  useMotionValueEvent(travel, "change", (v) =>
    barRef.current?.setAttribute("aria-valuenow", String(Math.round(v * 100))),
  );

  // Keyboard: focusing a card that's off-screen scrolls the page so the track brings it into view.
  const onFocus = (e: FocusEvent<HTMLUListElement>) => {
    const section = ref.current;
    const li = (e.target as HTMLElement).closest<HTMLElement>("[data-index]");
    if (!section || !li || !enabled) return;
    const count = trackRef.current?.children.length ?? 1;
    const share = Number(li.dataset.index) / Math.max(1, count - 1);
    const p = PORTFOLIO.travelStart + share * (PORTFOLIO.travelEnd - PORTFOLIO.travelStart);
    const top = section.getBoundingClientRect().top + window.scrollY;
    scrollToY(top + p * (section.offsetHeight - window.innerHeight));
  };

  return (
    <div ref={ref} className="relative h-[250vh]">
      <div className="sticky top-0 flex h-svh flex-col justify-center gap-10 overflow-hidden pt-[var(--nav-h)]">
        <div className="shell flex items-end justify-between gap-10">
          <div className="flex flex-col gap-4">
            <p className="eyebrow">{t.eyebrow}</p>
            <h2 className="text-h2">{t.title}</h2>
          </div>
          <div
            ref={barRef}
            role="progressbar"
            aria-label={t.progressLabel}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={0}
            className="mb-3 h-px w-48 shrink-0 bg-border"
          >
            <motion.div
              className="h-full origin-left bg-accent"
              style={{ scaleX: enabled ? travel : 0 }}
            />
          </div>
        </div>

        {/* Side padding lines the first/last card up with the 1248px container. */}
        <motion.ul
          ref={trackRef}
          onFocus={onFocus}
          style={enabled ? { x } : undefined}
          className="flex gap-6 px-[max(var(--gutter),calc((100%-1248px)/2))]"
        >
          {t.items.map((item, i) => (
            <li key={item.name} data-index={i} className={CARD}>
              <ProjectCard item={item} index={i} className="size-full" />
            </li>
          ))}
          <li data-index={t.items.length} className={CARD}>
            <PortfolioCtaCard t={t.cta} className="size-full" />
          </li>
        </motion.ul>
      </div>
    </div>
  );
}
