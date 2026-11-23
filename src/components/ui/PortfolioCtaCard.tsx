import { sectionIds } from "@/content/site";
import { type Dictionary } from "@/content/types";
import { cn } from "@/lib/cn";

import { ArrowIcon } from "./ArrowIcon";
import { MagneticButton } from "./MagneticButton";

type Props = {
  t: Dictionary["portfolio"]["cta"];
  className?: string;
};

/** Last portfolio card: "Your app here" → contact. The only accent-filled card. */
export function PortfolioCtaCard({ t, className }: Props) {
  return (
    <article
      className={cn(
        "flex flex-col justify-between gap-8 rounded-3xl bg-accent p-8 text-accent-fg",
        className,
      )}
    >
      <h3 className="text-[clamp(2.5rem,1.8rem+3vw,4.5rem)] leading-[0.95]">{t.title}</h3>
      <div className="flex flex-col items-start gap-6">
        <p className="max-w-[24ch] text-lead">{t.body}</p>
        <MagneticButton
          href={`#${sectionIds.contact}`}
          variant="inverse"
          icon={<ArrowIcon className="order-last" />}
        >
          {t.button}
        </MagneticButton>
      </div>
    </article>
  );
}
