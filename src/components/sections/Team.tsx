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
        {/* 2×2 on mobile/tablet, 4 across on desktop. */}
        <FadeUp
          as="ul"
          className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4"
        >
          {t.members.map((member, i) => (
            <FadeUpItem as="li" key={member.name}>
              <TeamCard member={member} index={i} />
            </FadeUpItem>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
