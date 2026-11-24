import type { Dictionary } from "./types";

/** English dictionary — must match the shape of `mn.ts` (enforced by the type). */
const en: Dictionary = {
  meta: {
    title: "Studio. — Mobile app & website development",
    description:
      "A studio building mobile apps and websites for businesses in Mongolia — from first design to launch.",
    ogAlt: "Studio. — Mobile app & website development",
  },

  nav: {
    skip: "Skip to main content",
    home: "Studio. — home",
    primary: "Main navigation",
    links: {
      work: "Work",
      services: "Services",
      faq: "FAQ",
      contact: "Contact",
    },
    cta: "Start a project",
    language: "Choose language",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    menuLabel: "Menu",
  },

  hero: {
    eyebrow: "Mobile apps · Websites · Ulaanbaatar",
    headline: "We build apps and websites people love to use.",
    sub: "Design, development and launch — all from one team. Fast, reliable, beautiful products for businesses in Mongolia.",
    tagsLabel: "Services",
    tags: ["iOS & Android", "Websites", "UI/UX design", "Support"],
    ctaPrimary: "Start a project",
    ctaMessenger: "Chat on Messenger",
  },

  logos: {
    label: "Trusted by",
    items: ["PRIME", "NandinMeat", "Нандин Дурсамж", "[Client 4]", "[Client 5]"],
  },

  statement: {
    text: "We don't just write code. We get to know your customers and build the product that grows your business — together, from the first sketch to launch day.",
  },

  services: {
    eyebrow: "Services",
    title: "From idea to launch",
    items: [
      {
        num: "01",
        title: "Mobile apps",
        body: "One codebase, fast and smooth on both iOS and Android.",
        points: [
          "iOS & Android",
          "Payments & push notifications",
          "App Store & Play Store release",
        ],
        screen: { title: "Orders", caption: "Your app here" },
      },
      {
        num: "02",
        title: "Websites",
        body: "Fast-loading, search-friendly websites that look great on every screen.",
        points: ["Next.js", "SEO & analytics", "Content management"],
        screen: { title: "Home", caption: "Fast. Clear." },
      },
      {
        num: "03",
        title: "UI/UX design",
        body: "From research to prototype — interfaces that are easy to use.",
        points: ["User research", "Wireframes & prototypes", "Design systems"],
        screen: { title: "Prototype", caption: "User-centred" },
      },
      {
        num: "04",
        title: "Launch & support",
        body: "We stay with you after launch — updates, monitoring and fixes.",
        points: ["Hosting & domains", "Error monitoring", "Regular updates"],
        screen: { title: "Version 2.0", caption: "Always improving" },
      },
    ],
  },

  quote: {
    text: "[Client testimonial — the real quote goes here.]",
    author: "[Full name]",
    role: "[Title, Company]",
  },

  portfolio: {
    eyebrow: "Work",
    title: "Recent projects",
    progressLabel: "Project scroll progress",
    carouselLabel: "Projects — swipe sideways",
    visit: "Visit site",
    newTab: "opens in a new tab",
    items: [
      {
        slug: "prime",
        name: "PRIME",
        category: "[Mobile app]",
        year: "[2025]",
        summary: "[Short project description]",
      },
      {
        slug: "nandinmeat",
        name: "NandinMeat",
        category: "[Website]",
        year: "[2025]",
        summary: "[Short project description]",
      },
      {
        slug: "nandin-dursamj",
        name: "Нандин Дурсамж",
        category: "[Website]",
        year: "[2024]",
        summary: "[Short project description]",
      },
    ],
    cta: {
      title: "Your app here",
      body: "The next success story could be yours.",
      button: "Start a project",
    },
  },

  process: {
    eyebrow: "Process",
    title: "Four clear steps",
    steps: [
      { title: "Discover", body: "A free call to understand your goals, users and budget." },
      { title: "Design", body: "Structure, prototype and final design — approved by you." },
      { title: "Build", body: "A working build to review every two weeks." },
      { title: "Launch", body: "We ship it, train your team and keep supporting you." },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Questions?",
    items: [
      {
        q: "How much does an app or website cost?",
        a: "It depends on scope. Websites start from [₮X], mobile apps from [₮Y]. After a discovery call we send a detailed quote.",
      },
      {
        q: "How long does it take?",
        a: "A website usually takes [X] weeks, a mobile app [Y] weeks. You get a clear timeline before we start.",
      },
      {
        q: "Do you offer support after launch?",
        a: "Yes. You get [X] months of free maintenance after launch, then an optional monthly support plan.",
      },
      {
        q: "Who owns the code?",
        a: "Once the project is fully paid, the source code, design files and all rights are 100% yours.",
      },
    ],
  },

  team: {
    eyebrow: "Team",
    title: "The people behind your project",
    members: [
      { name: "Ganbat", role: "CEO" },
      { name: "Munhu", role: "Senior IT Engineer" },
      { name: "Buyna", role: "Project Manager" },
      { name: "Sanchir", role: "Full-Stack Engineer" },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: "Let's talk about your project",
    sub: "Tell us your idea — we reply within 24 hours.",
    form: {
      name: "Name",
      contactLegend: "How can we reach you?",
      contactHint: "Phone or email — either one is enough.",
      phone: "Phone",
      phonePlaceholder: "9911 2233",
      email: "Email",
      service: "What are you interested in?",
      serviceOptions: {
        mobile: "Mobile app",
        web: "Website",
        design: "UI/UX design",
        other: "Other",
      },
      message: "About your project",
      messagePlaceholder: "What you want to build, when you need it…",
      submit: "Send",
      sending: "Sending…",
      success: "Thank you! We'll be in touch soon.",
      error: "Something went wrong. Please try again or message us on Messenger.",
      errors: {
        name: "Please enter your name.",
        contact: "Please enter a phone number or an email.",
        phone: "That phone number doesn't look right.",
        email: "Please enter a valid email address.",
        service: "Please choose a service.",
        message: "Please write at least 10 characters about your project.",
        rateLimit: "Too many attempts. Please wait a moment and try again.",
      },
    },
    channelsTitle: "Or reach us directly",
    channels: {
      messenger: "Messenger",
      phone: "Phone",
      email: "Email",
    },
  },

  footer: {
    navTitle: "Menu",
    contactTitle: "Contact",
    tagline: "Made in Mongolia.",
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },

  mobileBar: {
    label: "Quick contact",
    messenger: "Messenger",
    start: "Start a project",
  },

  notFound: {
    title: "Page not found",
    back: "Back to home",
  },
};

export default en;
