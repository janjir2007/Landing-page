import { type Dictionary } from "@/content/types";

import { FadeUp } from "../motion/FadeUp";
import { FadeUpItem } from "../motion/FadeUpItem";
import { SectionHeader } from "../ui/SectionHeader";
import { TeamCard } from "../ui/TeamCard";

type Props = {
  t: Dictionary["team"];
};

export function Team({ t }: Props) {
  return (
    <section aria-labelledby="team-title" className="border-t border-border">
      <div className="shell flex flex-col gap-14 py-24 sm:py-32">
        <SectionHeader id="team-title" eyebrow={t.eyebrow} title={t.title} />
        <FadeUp as="ul" className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {t.members.map((member, i) => (
            // Members are placeholders with identical names for now, so key by index.
            <FadeUpItem as="li" key={i}>
              <TeamCard member={member} index={i} />
            </FadeUpItem>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
