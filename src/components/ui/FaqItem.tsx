import { type CSSProperties } from "react";

import { ACCORDION } from "@/lib/motion";

import { PlusIcon } from "./PlusIcon";

type Props = {
  question: string;
  answer: string;
};

/** Timing handed to `.faq-item::details-content` in globals.css. */
const heightVar = { "--faq-height-ms": `${ACCORDION.heightMs}ms` } as CSSProperties;

/**
 * Native <details> accordion row: keyboard + screen-reader support and
 * in-page search for free, no JS. Height eases open where the browser supports
 * ::details-content + interpolate-size (instant elsewhere); the answer fades up
 * and the + rotates into ×.
 */
export function FaqItem({ question, answer }: Props) {
  return (
    <details className="faq-item group border-b border-border" style={heightVar}>
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-[clamp(1.125rem,1rem+0.6vw,1.5rem)] font-semibold tracking-[-0.03em] [&::-webkit-details-marker]:hidden">
        {question}
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border transition-transform group-open:rotate-45">
          <PlusIcon />
        </span>
      </summary>
      <p
        className="faq-answer max-w-[60ch] pr-16 pb-6 text-muted"
        style={{ animationDuration: `${ACCORDION.openMs}ms` }}
      >
        {answer}
      </p>
    </details>
  );
}
