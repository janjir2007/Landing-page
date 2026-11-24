import Image from "next/image";

import { projectShots, projects } from "@/content/site";
import { type Dictionary } from "@/content/types";
import { cn } from "@/lib/cn";

import { PhoneMockup } from "./PhoneMockup";

type Portfolio = Dictionary["portfolio"];

type Props = {
  item: Portfolio["items"][number];
  /** "Visit site" + screen-reader "opens in a new tab". */
  labels: Pick<Portfolio, "visit" | "newTab">;
  className?: string;
};

/**
 * Portfolio project card → live site in a new tab. Desktop screenshot as a dimmed
 * background, mobile screenshot inside a phone frame bleeding off the bottom.
 */
export function ProjectCard({ item, labels, className }: Props) {
  const shots = projectShots(item.slug);

  return (
    <a
      href={projects[item.slug].url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        // `relative` contains the sr-only label, which would otherwise escape the carousel's clip and widen the page.
        "group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-colors hover:border-fg/25 focus-visible:-outline-offset-2",
        className,
      )}
    >
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={shots.desktop}
          alt=""
          fill
          sizes="(min-width: 1024px) 450px, 82vw"
          className="object-cover object-left-top opacity-45 transition-opacity group-hover:opacity-60"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-surface via-surface/30 to-transparent"
        />
        <PhoneMockup
          compact
          className="absolute right-6 bottom-0 h-[88%] translate-y-[14%] shadow-black/60"
        >
          {/* Top inset stands in for the status bar so the island doesn't cover the site's header. */}
          <div className="absolute inset-x-0 top-4 bottom-0">
            <Image
              src={shots.mobile}
              alt=""
              fill
              sizes="180px"
              className="object-cover object-top"
            />
          </div>
        </PhoneMockup>
      </div>

      <div className="flex flex-col gap-2 border-t border-border p-6">
        <p className="text-sm text-muted">
          {item.category} · {item.year}
        </p>
        <h3 className="text-h3">{item.name}</h3>
        <p className="text-sm text-muted">{item.summary}</p>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-fg">
          <span className="underline decoration-fg/30 underline-offset-4 transition-colors group-hover:decoration-accent">
            {labels.visit}
          </span>
          <span aria-hidden className="text-accent">
            ↗
          </span>
          <span className="sr-only">({labels.newTab})</span>
        </span>
      </div>
    </a>
  );
}
