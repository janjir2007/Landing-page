import { type Dictionary } from "@/content/types";
import { cn } from "@/lib/cn";

type Props = {
  member: Dictionary["team"]["members"][number];
  /** Picks the placeholder portrait tint. */
  index: number;
};

/** Portrait placeholder tints (token colours only) until real photos arrive — one per member. */
const portrait = [
  "bg-linear-to-br from-accent/20 via-surface to-surface",
  "bg-linear-to-b from-fg/10 via-surface to-surface",
  "bg-linear-to-tr from-accent/10 via-border to-surface",
  "bg-radial-[at_70%_15%] from-fg/10 via-surface to-surface",
];

export function TeamCard({ member, index }: Props) {
  return (
    <article className="flex flex-col gap-5">
      <div
        aria-hidden
        className={cn(
          "relative flex aspect-[4/5] items-end justify-center overflow-hidden rounded-3xl border border-border",
          portrait[index % portrait.length],
        )}
      >
        {/* Abstract head-and-shoulders silhouette */}
        <div className="absolute top-[28%] size-[34%] rounded-full bg-fg/[0.07]" />
        <div className="h-[34%] w-[70%] rounded-t-full bg-fg/[0.07]" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-xl font-bold tracking-[-0.03em]">{member.name}</h3>
        <p className="text-sm font-medium text-fg/75">{member.role}</p>
      </div>
    </article>
  );
}
