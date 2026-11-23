import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import { Analytics } from "@vercel/analytics/next";

import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { getDictionary, hasLocale, locales } from "@/content";
import { site } from "@/content/site";
import { fontVariables } from "@/lib/fonts";
import { getSiteUrl } from "@/lib/siteUrl";
import { colors } from "@/lib/theme";

import "../globals.css";

const ogLocale = { mn: "mn_MN", en: "en_US" } as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const t = getDictionary(locale).meta;

  return {
    metadataBase: getSiteUrl(),
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { mn: "/mn", en: "/en", "x-default": "/mn" },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t.title,
      description: t.description,
      url: `/${locale}`,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description },
  };
}

export const viewport: Viewport = {
  themeColor: colors.bg,
  colorScheme: "dark",
  // Lets env(safe-area-inset-*) report real values on iOS (mobile bar, landscape notch).
  viewportFit: "cover",
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  return (
    <html lang={locale} className={fontVariables}>
      <body>
        {/* Without JS, show content that would otherwise wait for a scroll reveal. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
