import { type Dictionary } from "@/content/types";
import { cn } from "@/lib/cn";

import { SkeletonBar } from "./SkeletonBar";

type Screen = Dictionary["services"]["items"][number]["screen"];

type Props = {
  /** 0 = mobile app, 1 = website, 2 = UI/UX, 3 = launch & support. */
  variant: number;
  screen: Screen;
};

/**
 * Placeholder app screen for the phone mockup — abstract skeleton UI so it
 * needs no extra copy. Decorative (the mockup is aria-hidden).
 */
export function ServiceScreen({ variant, screen }: Props) {
  return (
    <div className="flex size-full flex-col gap-4 px-5 pt-14 pb-6">
      <div className="flex items-center justify-between">
        <p className="font-display text-lg font-bold tracking-[-0.04em]">{screen.title}</p>
        <div className="size-7 rounded-full bg-border" />
      </div>

      {variant === 0 && (
        <>
          <div className="rounded-2xl bg-accent p-4 text-accent-fg">
            <p className="text-xs font-semibold opacity-70">{screen.caption}</p>
            <div className="mt-3 h-6 w-2/3 rounded-full bg-accent-fg/15" />
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl bg-surface p-3">
              <div className="size-10 shrink-0 rounded-xl bg-border" />
              <div className="flex flex-1 flex-col gap-2">
                <SkeletonBar className="h-2.5 w-3/4" />
                <SkeletonBar className="h-2 w-1/2 opacity-60" />
              </div>
            </div>
          ))}
        </>
      )}

      {variant === 1 && (
        <>
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="size-2 rounded-full bg-border" />
            ))}
          </div>
          <div className="flex flex-1 flex-col justify-center gap-3 rounded-2xl bg-surface p-4">
            <p className="font-display text-2xl leading-none font-bold tracking-[-0.05em]">
              {screen.caption}
            </p>
            <SkeletonBar className="h-2 w-full" />
            <SkeletonBar className="h-2 w-4/5" />
            <div className="mt-2 h-8 w-24 rounded-full bg-accent" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-square rounded-2xl bg-surface" />
            <div className="aspect-square rounded-2xl bg-surface" />
          </div>
        </>
      )}

      {variant === 2 && (
        <>
          <div className="grid flex-1 grid-cols-2 gap-3">
            <div className="col-span-2 rounded-2xl border border-dashed border-muted/40" />
            <div className="rounded-2xl border border-dashed border-muted/40" />
            <div className="rounded-2xl border border-dashed border-accent/60" />
          </div>
          <div className="flex items-center gap-2">
            <div className="size-4 rounded-full bg-accent" />
            <p className="text-xs text-muted">{screen.caption}</p>
          </div>
        </>
      )}

      {variant === 3 && (
        <>
          <div className="rounded-2xl bg-surface p-4">
            <p className="text-xs text-muted">{screen.caption}</p>
            <div className="mt-4 flex h-28 items-end gap-2">
              {[40, 55, 45, 70, 62, 85, 100].map((h, i) => (
                <div
                  key={i}
                  className={cn("flex-1 rounded-t-md", i === 6 ? "bg-accent" : "bg-border")}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center justify-between rounded-2xl bg-surface p-3">
              <SkeletonBar className="h-2.5 w-1/2" />
              <div className="h-5 w-10 rounded-full bg-accent/20" />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
