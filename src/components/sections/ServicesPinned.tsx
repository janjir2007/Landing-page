"use client";

import { useRef } from "react";

import { motion } from "motion/react";

import { type Dictionary } from "@/content/types";
import { useScrollEffects } from "@/hooks/useMotionPrefs";
import { useSectionProgress } from "@/hooks/useSectionProgress";
import { useStepIndex } from "@/hooks/useStepIndex";
import { EASE_OUT_EXPO, SERVICES } from "@/lib/motion";

import { PhoneMockup } from "../ui/PhoneMockup";
import { ServiceScreen } from "../ui/ServiceScreen";
import { ServiceStepItem } from "../ui/ServiceStepItem";

/** Fill-line slice for step i: from its start, `stepSpan` long. */
const stepRange = (i: number): [number, number] => {
  const start = SERVICES.stepStarts[i] ?? 0;
  return [start, start + SERVICES.stepSpan];
};

type Props = {
  t: Dictionary["services"];
};

/**
 * Desktop pinned services. 300vh = 1 screen of layout + 2 screens of pin (~0.5 screen per step).
 * Steps switch at SERVICES.stepStarts, leaving step 04 a hold before release. The active step
 * is discrete; the phone screen cross-fades and the text panel slides in the
 * scroll direction (panels before the active one sit above, after sit below).
 */
export function ServicesPinned({ t }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useSectionProgress(ref);
  const enabled = useScrollEffects();
  const count = t.items.length;
  const step = useStepIndex(progress, SERVICES.stepStarts);
  const active = enabled ? step : 0;

  const fade = { duration: SERVICES.screenFade, ease: EASE_OUT_EXPO };
  const slide = { duration: SERVICES.textDuration, ease: EASE_OUT_EXPO };

  return (
    <div ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-svh items-center pt-[var(--nav-h)]">
        <div className="shell grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-12 xl:gap-20">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="eyebrow">{t.eyebrow}</p>
              <h2 className="text-h2">{t.title}</h2>
            </div>
            {/* Visual index; the same titles are read from the panels on the right. */}
            <ol aria-hidden>
              {t.items.map((item, i) => (
                <ServiceStepItem
                  key={item.num}
                  num={item.num}
                  title={item.title}
                  active={i === active}
                  progress={progress}
                  range={stepRange(i)}
                />
              ))}
            </ol>
          </div>

          <PhoneMockup className="h-[min(66svh,600px)]">
            {t.items.map((item, i) => (
              <motion.div
                key={item.num}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: i === active ? 1 : 0 }}
                transition={fade}
              >
                <ServiceScreen variant={i} screen={item.screen} />
              </motion.div>
            ))}
          </PhoneMockup>

          {/* All panels share one grid cell, so the column sizes to the tallest. */}
          <div className="grid">
            {t.items.map((item, i) => (
              <motion.article
                key={item.num}
                className="flex flex-col gap-5 [grid-area:1/1]"
                initial={false}
                animate={{
                  opacity: i === active ? 1 : 0,
                  y: i === active ? 0 : i < active ? -SERVICES.textShiftPx : SERVICES.textShiftPx,
                }}
                transition={slide}
              >
                <span className="font-display text-sm text-muted tabular-nums">
                  {item.num} / {String(count).padStart(2, "0")}
                </span>
                <h3 className="text-h3">{item.title}</h3>
                <p className="text-lead text-muted">{item.body}</p>
                <ul className="flex flex-col gap-2.5 pt-2">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-center gap-3">
                      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
