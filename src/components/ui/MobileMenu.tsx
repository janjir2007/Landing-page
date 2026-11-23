"use client";

import {
  type CSSProperties,
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { sectionIds } from "@/content/site";
import { type Dictionary, type Locale } from "@/content/types";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { MEDIA } from "@/lib/media";
import { MENU } from "@/lib/motion";

import { ArrowIcon } from "./ArrowIcon";
import { CloseIcon } from "./CloseIcon";
import { LocaleSwitch } from "./LocaleSwitch";
import { Logo } from "./Logo";
import { MenuIcon } from "./MenuIcon";

type Props = {
  t: Dictionary["nav"];
  locale: Locale;
};

/** Timing tokens handed to the CSS transitions in globals.css (`.mobile-menu`). */
const menuVars = {
  "--menu-fade": `${MENU.fadeMs}ms`,
  "--menu-item-fade": `${MENU.itemFadeMs}ms`,
  "--menu-item-slide": `${MENU.itemSlideMs}ms`,
  "--menu-item-stagger": `${MENU.itemStaggerMs}ms`,
  "--menu-item-delay": `${MENU.itemDelayMs}ms`,
} as CSSProperties;

const itemIndex = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * Full-screen mobile menu (< md) built on a native modal <dialog>:
 * showModal() makes the page inert (real focus trap), Esc fires `cancel`
 * (we animate out first), and closing returns focus to the ☰ button.
 */
export function MobileMenu({ t, locale }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const { scrollTo, setLocked } = useSmoothScroll();

  const links = [
    { id: sectionIds.work, label: t.links.work },
    { id: sectionIds.services, label: t.links.services },
    { id: sectionIds.faq, label: t.links.faq },
    { id: sectionIds.contact, label: t.links.contact },
  ];

  const show = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    window.clearTimeout(closeTimer.current);
    dialog.showModal();
    setLocked(true);
    setOpen(true);
    // Wait two frames so the closed styles are painted before transitioning in.
    requestAnimationFrame(() => requestAnimationFrame(() => dialog.setAttribute("data-open", "")));
  }, [setLocked]);

  /** Animate out, then close. `then` runs once the dialog is closed. */
  const hide = useCallback(
    (then?: () => void) => {
      const dialog = dialogRef.current;
      if (!dialog?.open) return;
      dialog.removeAttribute("data-open");
      setOpen(false);
      const reduced = window.matchMedia(MEDIA.reducedMotion).matches;
      closeTimer.current = window.setTimeout(
        () => {
          dialog.close();
          setLocked(false);
          then?.();
        },
        reduced ? 0 : MENU.closeMs,
      );
    },
    [setLocked],
  );

  // Close if the viewport grows past the mobile breakpoint while open.
  useEffect(() => {
    const mq = window.matchMedia(MEDIA.md);
    const onChange = () => mq.matches && hide();
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      window.clearTimeout(closeTimer.current);
    };
  }, [hide]);

  const go = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    hide(() => scrollTo(`#${id}`));
  };

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={t.menuOpen}
        onClick={show}
        className="inline-flex size-11 items-center justify-center rounded-full border border-border md:hidden"
      >
        <MenuIcon />
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-label={t.menuLabel}
        style={menuVars}
        onCancel={(e) => {
          e.preventDefault(); // run the exit animation instead of closing instantly
          hide();
        }}
        className="mobile-menu fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-bg p-0 text-fg backdrop:bg-transparent"
      >
        <div className="flex h-full flex-col">
          <div className="shell flex h-[var(--nav-h)] shrink-0 items-center gap-3">
            <Logo />
            <div className="ml-auto">
              <LocaleSwitch current={locale} label={t.language} />
            </div>
            <button
              type="button"
              aria-label={t.menuClose}
              onClick={() => hide()}
              className="inline-flex size-11 items-center justify-center rounded-full border border-border"
            >
              <CloseIcon />
            </button>
          </div>

          <nav aria-label={t.primary} className="shell flex flex-1 flex-col justify-center">
            <ul className="flex flex-col">
              {links.map((l, i) => (
                <li key={l.id} className="menu-item border-b border-border" style={itemIndex(i)}>
                  <a
                    href={`#${l.id}`}
                    onClick={go(l.id)}
                    className="flex min-h-16 items-center justify-between py-4 font-display text-[clamp(2rem,9vw,3rem)] font-bold tracking-[-0.05em]"
                  >
                    {l.label}
                    <ArrowIcon className="text-muted" width={24} height={24} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="menu-item shell shrink-0 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            style={itemIndex(links.length)}
          >
            <a
              href={`#${sectionIds.contact}`}
              onClick={go(sectionIds.contact)}
              className="flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-accent font-display font-semibold text-accent-fg"
            >
              {t.cta}
              <ArrowIcon />
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
