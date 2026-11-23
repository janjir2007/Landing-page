import { sectionIds, site } from "@/content/site";
import { type Dictionary } from "@/content/types";
import { afterHeadlineMs, LOAD_REVEAL } from "@/lib/motion";
import { splitWords } from "@/lib/text";

import { FadeIn } from "../motion/FadeIn";
import { RiseWords } from "../motion/RiseWords";
import { ArrowIcon } from "../ui/ArrowIcon";
import { MagneticButton } from "../ui/MagneticButton";
import { MessengerIcon } from "../ui/MessengerIcon";

type Props = {
  t: Dictionary["hero"];
};

/** Fits one screen: nav + hero = 100svh. */
export function Hero({ t }: Props) {
  const blocksStart = afterHeadlineMs(splitWords(t.headline).length);
  const blockDelay = (i: number) => blocksStart + i * LOAD_REVEAL.blockStaggerMs;

  return (
    <section
      id={sectionIds.hero}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-var(--nav-h))] flex-col overflow-clip"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 right-[-20%] -z-10 aspect-square w-[70rem] max-w-[140vw] rounded-full opacity-60 [background:radial-gradient(closest-side,rgba(198,244,50,0.08),transparent)]"
      />

      <div className="shell flex flex-1 flex-col justify-center gap-[clamp(1.75rem,4vh,3rem)] py-[clamp(2.5rem,7vh,5rem)]">
        <FadeIn as="p" className="flex items-center gap-3 eyebrow">
          <span aria-hidden className="size-2 rounded-full bg-accent" />
          {t.eyebrow}
        </FadeIn>

        <h1 id="hero-title" className="max-w-[15ch] text-display leading-[0.95]">
          <RiseWords text={t.headline} />
        </h1>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <div className="flex flex-col gap-6">
            <FadeIn as="p" delay={blockDelay(0)} className="max-w-[46ch] text-lead text-muted">
              {t.sub}
            </FadeIn>
            <FadeIn delay={blockDelay(1)}>
              <ul aria-label={t.tagsLabel} className="flex flex-wrap gap-2">
                {t.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border px-4 py-1.5 text-sm text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          <FadeIn
            delay={blockDelay(2)}
            className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row"
          >
            <MagneticButton
              href={`#${sectionIds.contact}`}
              icon={
                <ArrowIcon className="order-last transition-transform group-hover:translate-x-0.5" />
              }
            >
              {t.ctaPrimary}
            </MagneticButton>
            <MagneticButton
              href={site.messengerUrl}
              external
              variant="secondary"
              icon={<MessengerIcon />}
            >
              {t.ctaMessenger}
            </MagneticButton>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
