import { type ReactNode } from "react";

import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Minimal phone frame (decorative). Screen content fills the inner rounded area. */
export function PhoneMockup({ children, className }: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative aspect-[9/19] rounded-[2.75rem] border border-border bg-surface p-2.5 shadow-[0_40px_120px_-40px] shadow-accent/20",
        className,
      )}
    >
      <div className="relative size-full overflow-hidden rounded-[2.2rem] bg-bg">
        {/* Dynamic island */}
        <div className="absolute top-2.5 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-surface" />
        {children}
      </div>
    </div>
  );
}
