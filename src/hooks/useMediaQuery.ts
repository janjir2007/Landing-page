"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribes to a media query. Always `false` on the server and during
 * hydration, so markup never differs between server and client — layout is
 * decided by CSS breakpoints; this only enables JS effects after mount.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
