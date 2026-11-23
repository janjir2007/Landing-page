/**
 * Shared motion tokens. Every duration, easing, spring and stagger used by
 * components lives here. CSS-driven animations receive these values through
 * inline styles / CSS custom properties, so this file is the single source.
 */

/** Expo-out: fast start, long soft landing. Same curve as `--ease-out-expo` in globals.css. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Lenis smooth scroll. Lower lerp = smoother / laggier. */
export const SMOOTH_SCROLL = {
  lerp: 0.1,
} as const;

/** Above-the-fold load reveals (CSS keyframes, no JS wait). */
export const LOAD_REVEAL = {
  wordDelayMs: 120,
  wordStaggerMs: 70,
  wordDurationMs: 1100,
  blockDurationMs: 1000,
  /** Gap between the last headline word starting and the blocks below. */
  afterHeadlineMs: 150,
  blockStaggerMs: 100,
} as const;

/** When the hero headline's last word has started, plus a gap — blocks below start here. */
export function afterHeadlineMs(wordCount: number) {
  return (
    LOAD_REVEAL.wordDelayMs + wordCount * LOAD_REVEAL.wordStaggerMs + LOAD_REVEAL.afterHeadlineMs
  );
}

/** Staggered fade-up for normal sections when they enter the viewport. */
export const FADE_UP = {
  duration: 0.9,
  distancePx: 24,
  stagger: 0.08,
  delayChildren: 0.05,
  viewportMargin: "0px 0px -12% 0px",
} as const;

/** Magnetic buttons. */
export const MAGNETIC = {
  /** Fraction of the cursor offset the button follows. */
  strength: 0.3,
  /** Fraction of the button's offset the label cancels (label moves less). */
  innerLag: 0.45,
  spring: { stiffness: 220, damping: 16, mass: 0.3 },
} as const;

/** Mobile menu fade/slide (CSS transitions fed via custom properties). */
export const MENU = {
  fadeMs: 350,
  itemFadeMs: 450,
  itemSlideMs: 600,
  itemStaggerMs: 55,
  itemDelayMs: 80,
  /** Wait this long for the exit transition before closing the dialog. */
  closeMs: 400,
} as const;

/**
 * Pinned services (2 screens of pin — `h-[300vh]` in ServicesPinned).
 * Step changes are discrete; the timings below animate between them.
 */
export const SERVICES = {
  /** Pin progress at which each step becomes active. Step 01 also shows before its start. */
  stepStarts: [0.08, 0.3, 0.52, 0.75],
  /** Length of each step's fill line; the last step fills early, then holds until release. */
  stepSpan: 0.22,
  screenFade: 0.5,
  textDuration: 0.6,
  /** Text panels slide this far in the scroll direction. */
  textShiftPx: 28,
} as const;

/** Pinned portfolio (1.5 screens of pin — `h-[250vh]` in PortfolioPinned): horizontal travel happens between these progress points (holds at both ends). */
export const PORTFOLIO = {
  travelStart: 0.06,
  travelEnd: 0.94,
} as const;

/**
 * FAQ answers: height animates via ::details-content where supported (the one
 * agreed exception to transform/opacity-only), and the text fades up on open.
 */
export const ACCORDION = {
  heightMs: 300,
  openMs: 450,
} as const;

/** Mobile floating CTA bar slide in/out (CSS transition fed via custom property). */
export const MOBILE_BAR = {
  slideMs: 450,
} as const;

/** Pinned statement word reveal. */
export const STATEMENT = {
  /** Share of the pin used for the reveal; the rest holds the finished text. */
  revealEnd: 0.82,
  /** How many neighbouring words animate at once (window overlap). */
  overlap: 3,
  riseEm: 0.4,
  blurPx: 10,
} as const;
