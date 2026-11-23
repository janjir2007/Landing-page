import { type Dictionary } from "@/content/types";

type Props = {
  item: Dictionary["services"]["items"][number];
};

/** Static service card — the mobile / reduced-motion version of a pinned step. */
export function ServiceCard({ item }: Props) {
  return (
    <article className="flex h-full flex-col gap-5 rounded-3xl border border-border bg-surface p-6 sm:p-8">
      <span className="font-display text-sm text-muted tabular-nums">{item.num}</span>
      <h3 className="text-h3">{item.title}</h3>
      <p className="text-muted">{item.body}</p>
      <ul className="mt-auto flex flex-col gap-2 pt-2">
        {item.points.map((point) => (
          <li key={point} className="flex items-center gap-3 text-sm">
            <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent" />
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}
