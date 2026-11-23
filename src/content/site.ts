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
