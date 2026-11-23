import { site } from "@/content/site";
import { cn } from "@/lib/cn";

type Props = { className?: string };

/** "Studio." wordmark — the full stop is the accent. Decorative; the wrapping link supplies the label. */
export function Logo({ className }: Props) {
  const word = site.name.replace(/\.$/, "");
  return (
    <span
      aria-hidden
      className={cn("font-display text-xl font-extrabold tracking-[-0.05em]", className)}
    >
      {word}
      <span className="text-accent">.</span>
    </span>
  );
}
