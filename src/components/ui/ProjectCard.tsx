import { type Dictionary } from "@/content/types";
import { cn } from "@/lib/cn";

type Props = {
  item: Dictionary["portfolio"]["items"][number];
  /** Picks the placeholder artwork. */
  index: number;
  className?: string;
};

/** Placeholder artwork per card until real screenshots arrive (token colours only). */
const artwork = [
  "bg-linear-to-br from-accent/30 via-surface to-surface",
  "bg-radial-[at_30%_20%] from-fg/15 via-surface to-surface",
  "bg-linear-to-t from-accent/15 via-border to-surface",
];

/** Portfolio project card. */
export function ProjectCard({ item, index, className }: Props) {
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-3xl border border-border bg-surface",
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          "relative flex flex-1 items-end overflow-hidden p-6",
          artwork[index % artwork.length],
        )}
      >
        <span className="font-display text-[clamp(2.5rem,2rem+2vw,4rem)] leading-none font-extrabold tracking-[-0.05em] text-fg/15">
          {item.name}
        </span>
      </div>
      <div className="flex flex-col gap-2 border-t border-border p-6">
        <p className="text-sm text-muted">
          {item.category} · {item.year}
        </p>
        <h3 className="text-h3">{item.name}</h3>
        <p className="text-sm text-muted">{item.summary}</p>
      </div>
    </article>
  );
}
