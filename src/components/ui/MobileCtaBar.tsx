"use client";

import { type CSSProperties, useEffect, useState } from "react";

import { sectionIds, site } from "@/content/site";
import { type Dictionary } from "@/content/types";
import { buttonClasses } from "@/lib/buttonStyles";
import { cn } from "@/lib/cn";
import { MOBILE_BAR } from "@/lib/motion";

import { MessengerIcon } from "./MessengerIcon";
import { ScrollLink } from "./ScrollLink";

type Props = {
  t: Dictionary["mobileBar"];
};

const slideVar = { "--bar-slide": `${MOBILE_BAR.slideMs}ms` } as CSSProperties;

/**
 * Floating Messenger + "Start a project" bar (< md only, via CSS).
 * Shown once the hero has scrolled out, hidden while any part of Contact is
 * on screen. Sits above the iOS home indicator (safe-area inset). While hidden
 * it's `inert`, so it can't be focused off-screen. Slide = transform + opacity.
 */
export function MobileCtaBar({ t }: Props) {
  const [heroOut, setHeroOut] = useState(false);
  const [contactIn, setContactIn] = useState(false);
  const visible = heroOut && !contactIn;

  useEffect(() => {
    const hero = document.getElementById(sectionIds.hero);
    const contact = document.getElementById(sectionIds.contact);
    const observers: IntersectionObserver[] = [];

    if (hero) {
      const io = new IntersectionObserver(([e]) => setHeroOut(e ? !e.isIntersecting : false));
      io.observe(hero);
      observers.push(io);
    }
    if (contact) {
      const io = new IntersectionObserver(([e]) => setContactIn(e?.isIntersecting ?? false));
      io.observe(contact);
      observers.push(io);
    }
    return () => observers.forEach((io) => io.disconnect());
  }, []);

  return (
    <div
      aria-label={t.label}
      role="region"
      aria-hidden={!visible}
      inert={!visible}
      data-visible={visible || undefined}
      style={slideVar}
      className={cn(
        "mobile-bar fixed inset-x-0 bottom-0 z-40 px-[max(var(--gutter),env(safe-area-inset-left))] pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:hidden",
      )}
    >
      <div className="flex gap-2 rounded-full border border-border bg-surface/85 p-1.5 shadow-[0_12px_40px_-12px] shadow-black backdrop-blur-md">
        <a
          href={site.messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("secondary", "md", "flex-1 gap-2 border-0")}
        >
          <MessengerIcon />
          {t.messenger}
        </a>
        <ScrollLink
          href={`#${sectionIds.contact}`}
          className={buttonClasses("primary", "md", "flex-[1.4]")}
        >
          {t.start}
        </ScrollLink>
      </div>
    </div>
  );
}
