import { sectionIds } from "@/content/site";
import { type Dictionary } from "@/content/types";

import { FadeUp } from "../motion/FadeUp";
import { FadeUpItem } from "../motion/FadeUpItem";
import { FaqItem } from "../ui/FaqItem";
import { SectionHeader } from "../ui/SectionHeader";

type Props = {
  t: Dictionary["faq"];
};

/** Header on the left (sticky on desktop), questions on the right. */
export function Faq({ t }: Props) {
  return (
    <section id={sectionIds.faq} aria-labelledby="faq-title" className="border-t border-border">
      <div className="shell grid gap-12 py-24 sm:py-32 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <SectionHeader
            id="faq-title"
            eyebrow={t.eyebrow}
            title={t.title}
            className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]"
          />
        </div>
        <FadeUp className="border-t border-border">
          {t.items.map((item) => (
            <FadeUpItem key={item.q}>
              <FaqItem question={item.q} answer={item.a} />
            </FadeUpItem>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
