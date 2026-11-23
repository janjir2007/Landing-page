import { notFound } from "next/navigation";

import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Logos } from "@/components/sections/Logos";
import { Nav } from "@/components/sections/Nav";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Quote } from "@/components/sections/Quote";
import { Services } from "@/components/sections/Services";
import { Statement } from "@/components/sections/Statement";
import { Team } from "@/components/sections/Team";
import { MobileCtaBar } from "@/components/ui/MobileCtaBar";
import { getDictionary, hasLocale } from "@/content";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <Nav t={t.nav} locale={locale} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero t={t.hero} />
        <Logos t={t.logos} />
        <Statement t={t.statement} />
        <Services t={t.services} />
        <Quote t={t.quote} />
        <Portfolio t={t.portfolio} />
        <Process t={t.process} />
        <Faq t={t.faq} />
        <Team t={t.team} />
        <Contact t={t.contact} locale={locale} />
      </main>
      <Footer t={t.footer} nav={t.nav.links} channels={t.contact.channels} />
      <MobileCtaBar t={t.mobileBar} />
    </>
  );
}
