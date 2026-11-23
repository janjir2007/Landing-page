import { sectionIds, site } from "@/content/site";
import { type Dictionary } from "@/content/types";
import { getCurrentYear } from "@/lib/year";

import { FadeUp } from "../motion/FadeUp";
import { FadeUpItem } from "../motion/FadeUpItem";
import { ArrowIcon } from "../ui/ArrowIcon";
import { ScrollLink } from "../ui/ScrollLink";

type Props = {
  t: Dictionary["footer"];
  nav: Dictionary["nav"]["links"];
  channels: Dictionary["contact"]["channels"];
};

const link = "inline-flex min-h-11 items-center text-fg/80 hover:text-fg";

/**
 * Footer with the giant wordmark. On mobile the bottom padding clears the
 * floating CTA bar (bar height + iOS safe-area inset), so it never covers content.
 */
export async function Footer({ t, nav, channels }: Props) {
  const year = await getCurrentYear();
  const word = site.name.replace(/\.$/, "");
  const navLinks = [
    { id: sectionIds.work, label: nav.work },
    { id: sectionIds.services, label: nav.services },
    { id: sectionIds.faq, label: nav.faq },
    { id: sectionIds.contact, label: nav.contact },
  ];

  return (
    <footer className="border-t border-border pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-0">
      <div className="@container shell flex flex-col gap-16 pt-16 pb-10 sm:pt-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          <div className="flex flex-col items-start gap-6 sm:col-span-2 lg:col-span-1">
            <p className="max-w-[20ch] font-display text-h3 font-bold tracking-[-0.04em]">
              {t.tagline}
            </p>
            <ScrollLink href={`#${sectionIds.hero}`} className={`${link} group gap-2`}>
              {t.backToTop}
              <ArrowIcon className="-rotate-90 transition-transform group-hover:-translate-y-0.5" />
            </ScrollLink>
          </div>

          <nav aria-label={t.navTitle} className="flex flex-col gap-3">
            <p className="eyebrow">{t.navTitle}</p>
            <ul>
              {navLinks.map((l) => (
                <li key={l.id}>
                  <ScrollLink href={`#${l.id}`} className={link}>
                    {l.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <p className="eyebrow">{t.contactTitle}</p>
            <ul>
              <li>
                <a href={`tel:${site.phoneHref}`} className={link}>
                  {channels.phone} · {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.emailHref}`} className={link}>
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link}
                >
                  {channels.messenger}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Decorative: sized in container units so it spans the content width exactly. */}
        <FadeUp>
          <FadeUpItem>
            <p
              aria-hidden
              className="font-display text-wordmark leading-[0.8] font-extrabold tracking-[-0.05em] whitespace-nowrap select-none"
            >
              {word}
              <span className="text-accent">.</span>
            </p>
          </FadeUpItem>
        </FadeUp>

        <p className="flex flex-wrap gap-x-2 text-sm text-muted">
          <span>
            © {year} {site.name}
          </span>
          <span>{t.rights}</span>
        </p>
      </div>
    </footer>
  );
}
