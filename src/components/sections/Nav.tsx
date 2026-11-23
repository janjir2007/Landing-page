import { sectionIds } from "@/content/site";
import { type Dictionary, type Locale } from "@/content/types";

import { LocaleSwitch } from "../ui/LocaleSwitch";
import { Logo } from "../ui/Logo";
import { MagneticButton } from "../ui/MagneticButton";
import { MobileMenu } from "../ui/MobileMenu";
import { ScrollLink } from "../ui/ScrollLink";

type Props = {
  t: Dictionary["nav"];
  locale: Locale;
};

export function Nav({ t, locale }: Props) {
  const links = [
    { href: `#${sectionIds.work}`, label: t.links.work },
    { href: `#${sectionIds.services}`, label: t.links.services },
    { href: `#${sectionIds.faq}`, label: t.links.faq },
  ] as const;

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-full bg-accent px-5 py-3 font-semibold text-accent-fg focus:translate-y-0"
      >
        {t.skip}
      </a>

      <header
        data-site-nav
        className="sticky top-0 z-50 border-b border-border/70 bg-bg/75 backdrop-blur-md"
      >
        <div className="shell flex h-[var(--nav-h)] items-center gap-4">
          <ScrollLink
            href={`#${sectionIds.hero}`}
            aria-label={t.home}
            className="-ml-2 inline-flex min-h-11 items-center px-2"
          >
            <Logo />
          </ScrollLink>

          <nav aria-label={t.primary} className="ml-auto hidden md:block">
            <ul className="flex items-center gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <ScrollLink
                    href={l.href}
                    className="inline-flex min-h-11 items-center rounded-full px-4 text-sm text-muted hover:text-fg"
                  >
                    {l.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 sm:gap-3 md:ml-2">
            <LocaleSwitch current={locale} label={t.language} />
            <MobileMenu t={t} locale={locale} />
            <MagneticButton
              href={`#${sectionIds.contact}`}
              size="md"
              className="hidden sm:inline-flex"
            >
              {t.cta}
            </MagneticButton>
          </div>
        </div>
      </header>
    </>
  );
}
