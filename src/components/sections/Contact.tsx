import { sectionIds, site } from "@/content/site";
import { type Dictionary, type Locale } from "@/content/types";

import { FadeUp } from "../motion/FadeUp";
import { FadeUpItem } from "../motion/FadeUpItem";
import { ContactChannel } from "../ui/ContactChannel";
import { ContactForm } from "../ui/ContactForm";
import { MailIcon } from "../ui/MailIcon";
import { MessengerIcon } from "../ui/MessengerIcon";
import { PhoneIcon } from "../ui/PhoneIcon";
import { SectionHeader } from "../ui/SectionHeader";

type Props = {
  t: Dictionary["contact"];
  locale: Locale;
};

/** Header + direct channels on the left (phone first), form card on the right. */
export function Contact({ t, locale }: Props) {
  const messengerHandle = site.messengerUrl.replace(/^https?:\/\//, "");

  return (
    <section
      id={sectionIds.contact}
      aria-labelledby="contact-title"
      className="border-t border-border"
    >
      <div className="shell grid gap-14 py-24 sm:py-32 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <SectionHeader id="contact-title" eyebrow={t.eyebrow} title={t.title} />
            <FadeUp>
              <FadeUpItem as="p" className="max-w-[36ch] text-lead text-muted">
                {t.sub}
              </FadeUpItem>
            </FadeUp>
          </div>

          <FadeUp className="flex flex-col">
            <FadeUpItem as="p" className="pb-2 eyebrow">
              {t.channelsTitle}
            </FadeUpItem>
            <FadeUpItem>
              <ContactChannel
                href={`tel:${site.phoneHref}`}
                icon={<PhoneIcon />}
                label={t.channels.phone}
                value={site.phone}
              />
            </FadeUpItem>
            <FadeUpItem>
              <ContactChannel
                href={site.messengerUrl}
                external
                icon={<MessengerIcon />}
                label={t.channels.messenger}
                value={messengerHandle}
              />
            </FadeUpItem>
            <FadeUpItem>
              <ContactChannel
                href={`mailto:${site.emailHref}`}
                icon={<MailIcon />}
                label={t.channels.email}
                value={site.email}
              />
            </FadeUpItem>
          </FadeUp>
        </div>

        <FadeUp>
          <FadeUpItem className="rounded-3xl border border-border bg-surface p-6 sm:p-10">
            <ContactForm t={t.form} locale={locale} />
          </FadeUpItem>
        </FadeUp>
      </div>
    </section>
  );
}
