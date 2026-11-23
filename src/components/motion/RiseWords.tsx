import { LOAD_REVEAL } from "@/lib/motion";
import { splitWords } from "@/lib/text";

type Props = {
  text: string;
  className?: string;
};

/**
 * Load-time word-by-word rise in pure CSS — no hydration wait, so the hero
 * headline paints immediately and LCP stays low. Each word slides up from
 * behind a mask (`.rise-mask` in globals.css). Spaces stay real text nodes, so
 * screen readers read normal text. Reduced motion: the global CSS rule
 * collapses the animation.
 */
export function RiseWords({ text, className }: Props) {
  const words = splitWords(text);

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i}>
          <span className="rise-mask">
            <span
              className="rise-word"
              style={{
                animationDuration: `${LOAD_REVEAL.wordDurationMs}ms`,
                animationDelay: `${LOAD_REVEAL.wordDelayMs + i * LOAD_REVEAL.wordStaggerMs}ms`,
              }}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
