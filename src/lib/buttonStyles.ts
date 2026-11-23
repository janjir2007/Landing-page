import { cn } from "./cn";

/** `inverse` = dark pill for use on an accent background. */
export type ButtonVariant = "primary" | "secondary" | "inverse";
export type ButtonSize = "md" | "lg";

const base =
  "group relative isolate inline-flex min-h-11 items-center justify-center overflow-hidden rounded-full font-display font-semibold tracking-tight whitespace-nowrap select-none " +
  // Hover/press feedback is an opacity overlay — no colour transitions.
  "before:absolute before:inset-0 before:-z-10 before:rounded-full before:opacity-0 before:transition-opacity hover:before:opacity-100 active:before:opacity-100 " +
  "disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-fg before:bg-white/25",
  secondary: "border border-border bg-surface text-fg before:bg-white/[0.06]",
  inverse: "bg-bg text-fg before:bg-white/10",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

/** Pill button classes shared by link-buttons and real <button>s. */
export function buttonClasses(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}
