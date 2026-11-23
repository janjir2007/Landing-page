/** Media queries shared by hooks and components. Widths match Tailwind's defaults. */
export const MEDIA = {
  /** Tailwind `md` — desktop nav replaces the mobile menu. */
  md: "(min-width: 768px)",
  /** Tailwind `lg` — pinned, scroll-linked sections switch on. */
  lg: "(min-width: 1024px)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
  finePointer: "(hover: hover) and (pointer: fine)",
} as const;
