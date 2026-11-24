"use client";

import { useRef } from "react";

import { type Dictionary } from "@/content/types";
import { useScrollEffects } from "@/hooks/useMotionPrefs";
import { useSectionProgress } from "@/hooks/useSectionProgress";
import { STATEMENT } from "@/lib/motion";
import { staggerRange } from "@/lib/scroll";
import { splitWords } from "@/lib/text";

import { FadeUp } from "../motion/FadeUp";
import { FadeUpItem } from "../motion/FadeUpItem";
import { ScrollWord } from "../motion/ScrollWord";

type Props = {
  t: Dictionary["statement"];
};

/**
 * PINNED on lg+: 250vh section = 1.5 screens of pinned scroll. Words reveal in
 * sequence over the first `revealEnd` of the pin; the rest holds the full
 * sentence. Mobile and reduced motion: normal section, static white text.
 */
export function Statement({ t }: Props) {
  const ref = useRef<HTMLElement>(null);
  const progress = useSectionProgress(ref);
  const enabled = useScrollEffects();
  const words = splitWords(t.text);

  return (
    <section ref={ref} className="relative lg:h-[250vh] lg:motion-reduce:h-auto">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center lg:pt-[var(--nav-h)] lg:motion-reduce:static lg:motion-reduce:h-auto lg:motion-reduce:py-40">
        <FadeUp className="shell py-24 sm:py-32 lg:py-0">
          <FadeUpItem
            as="p"
            className="font-display text-statement leading-[1.08] font-bold tracking-[-0.05em] text-balance antialiased"
          >
            {words.map((word, i) => {
              const [a, b] = staggerRange(i, words.length, STATEMENT.overlap);
              return (
                <span key={i}>
                  <ScrollWord
                    word={word}
                    progress={progress}
                    range={[a * STATEMENT.revealEnd, b * STATEMENT.revealEnd]}
                    enabled={enabled}
                  />
                  {i < words.length - 1 ? " " : null}
                </span>
              );
            })}
          </FadeUpItem>
        </FadeUp>
      </div>
    </section>
  );
}
