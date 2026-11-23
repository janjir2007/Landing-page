"use client";

import { createContext, type ReactNode, useCallback, useEffect, useMemo, useRef } from "react";

import Lenis from "lenis";

import { MEDIA } from "@/lib/media";
import { SMOOTH_SCROLL } from "@/lib/motion";

type ScrollTarget = string | HTMLElement;

type SmoothScrollContextValue = {
  /** Smooth-scroll to a selector ("#work") or element, and move focus there. */
  scrollTo: (target: ScrollTarget) => void;
  /** Scroll to an absolute Y position without moving focus. */
  scrollToY: (y: number) => void;
  /** Lock/unlock page scrolling (e.g. while a modal menu is open). */
  setLocked: (locked: boolean) => void;
};

export const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

type Props = { children: ReactNode };

/**
 * Lenis smooth scrolling. Lenis drives the native window scroll position, so
 * Motion's `useScroll` keeps working. Disabled for reduced motion. The children
 * tree never changes, so toggling Lenis never remounts the page.
 */
export function SmoothScroll({ children }: Props) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(MEDIA.reducedMotion);

    const start = () => {
      if (mq.matches || lenisRef.current) return;
      lenisRef.current = new Lenis({ autoRaf: true, lerp: SMOOTH_SCROLL.lerp, anchors: false });
    };
    const stop = () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
    const onChange = () => (mq.matches ? stop() : start());

    start();
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  const scrollTo = useCallback((target: ScrollTarget) => {
    const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
    if (!el) return;

    // Both paths honour `scroll-margin-top` (nav height, set in globals.css).
    if (lenisRef.current) lenisRef.current.scrollTo(el);
    else el.scrollIntoView({ block: "start" });

    // Move keyboard focus to the target for screen-reader/keyboard users.
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
    if (el.id) history.replaceState(null, "", `#${el.id}`);
  }, []);

  const setLocked = useCallback((locked: boolean) => {
    const root = document.documentElement;
    if (locked) {
      lenisRef.current?.stop();
      root.style.scrollbarGutter = "stable"; // no layout jump when the scrollbar hides
      root.style.overflow = "hidden";
    } else {
      lenisRef.current?.start();
      root.style.overflow = "";
      root.style.scrollbarGutter = "";
    }
  }, []);

  const scrollToY = useCallback((y: number) => {
    if (lenisRef.current) lenisRef.current.scrollTo(y);
    else window.scrollTo({ top: y });
  }, []);

  const value = useMemo(
    () => ({ scrollTo, scrollToY, setLocked }),
    [scrollTo, scrollToY, setLocked],
  );

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}
