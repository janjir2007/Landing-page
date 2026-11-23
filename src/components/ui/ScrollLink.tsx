"use client";

import { type AnchorHTMLAttributes } from "react";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: `#${string}` };

/**
 * In-page anchor that scrolls smoothly and moves focus to the target.
 * Without JS it's a plain `#hash` link, so it always works.
 */
export function ScrollLink({ href, onClick, ...rest }: Props) {
  const { scrollTo } = useSmoothScroll();

  return (
    <a
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        scrollTo(href);
      }}
      {...rest}
    />
  );
}
