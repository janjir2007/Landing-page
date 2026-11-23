import { cn } from "@/lib/cn";

type Props = { className?: string };

/** Rounded placeholder line for skeleton UI. */
export function SkeletonBar({ className }: Props) {
  return <div className={cn("rounded-full bg-border", className)} />;
}
