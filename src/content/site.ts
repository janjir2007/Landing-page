/**
 * Non-translated contact details and links. Replace [bracketed] placeholders.
 * `phoneHref` must be digits only (with +) for tel: links.
 */
export const site = {
  name: "Studio.",
  messengerUrl: "https://m.me/[page-username]",
  phone: "[+976 0000 0000]",
  phoneHref: "+97600000000",
  email: "[hello@studio.mn]",
  emailHref: "hello@example.com",
} as const;

/** Section anchor ids — shared by nav links and section components. */
export const sectionIds = {
  hero: "top",
  services: "services",
  work: "work",
  faq: "faq",
  contact: "contact",
} as const;

/**
 * Live portfolio sites. Screenshots live in /public/work as
 * `<slug>-desktop.webp` (1440×900) and `<slug>-mobile.webp` (390×844 @2x).
 */
export const projects = {
  prime: { url: "https://prime.mn/" },
  nandinmeat: { url: "https://nandinmeat.mn/" },
  "nandin-dursamj": { url: "https://nandindursamj.mn/" },
} as const;

export type ProjectSlug = keyof typeof projects;

export const projectShots = (slug: ProjectSlug) => ({
  desktop: `/work/${slug}-desktop.webp`,
  mobile: `/work/${slug}-mobile.webp`,
});
