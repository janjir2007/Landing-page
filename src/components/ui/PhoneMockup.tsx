import { type ReactNode } from "react";

import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  /** Smaller bezel, corners and island for thumbnails (portfolio cards). */
  compact?: boolean;
  className?: string;
};

/** Minimal phone frame (decorative). Screen content fills the inner rounded area. */
export function PhoneMockup({ children, compact = false, className }: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative aspect-[9/19] border border-border bg-surface shadow-[0_40px_120px_-40px] shadow-accent/20",
        compact ? "rounded-[1.6rem] p-1.5" : "rounded-[2.75rem] p-2.5",
        className,
      )}
    >
      <div
        className={cn(
          "relative size-full overflow-hidden bg-bg",
          compact ? "rounded-[1.25rem]" : "rounded-[2.2rem]",
        )}
      >
        {/* Dynamic island */}
        <div
          className={cn(
            "absolute left-1/2 z-10 -translate-x-1/2 rounded-full bg-surface",
            compact ? "top-1.5 h-3 w-10" : "top-2.5 h-6 w-24",
          )}
        />
        {children}
      </div>
    </div>
  );
}
