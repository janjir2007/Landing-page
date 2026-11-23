# Studio. — Landing page

Bilingual (Mongolian / English) landing page for a studio that builds mobile apps and websites for clients in Mongolia.

<!-- Screenshot: save one as docs/screenshot.png, then uncomment the line below. -->
<!-- ![Studio. landing page](docs/screenshot.png) -->

## Tech stack

- **Next.js 16** (App Router, Cache Components) + **TypeScript**
- **Tailwind CSS v4** — design tokens live in `src/app/globals.css`
- **Motion** (Framer Motion) for scroll-linked animation, **Lenis** for smooth scrolling
- **zod** + **Resend** for the contact form
- **Vercel Analytics**, deployed on **Vercel**

## Project structure

```
src/
├─ app/           routes: /[locale] page + layout, api/contact, sitemap, robots, OG image
├─ components/
│  ├─ sections/   page sections (Hero, Services, Portfolio, Contact, Footer…)
│  ├─ ui/         buttons, cards, form fields, icons
│  ├─ motion/     reveal components (FadeUp, RiseWords, ScrollWord…)
│  └─ providers/  SmoothScroll (Lenis)
├─ content/       all copy: mn.ts (default), en.ts, site.ts (contact details)
├─ hooks/         scroll progress, media queries, magnetic hover
├─ lib/           helpers: motion tokens, contact schema, theme, fonts
└─ proxy.ts       / → /mn or /en from Accept-Language; 404 for unknown locales
```

All text is in `src/content/`. Values in `[brackets]` are placeholders still to be filled in.

## Getting started

Requires Node.js 20+.

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
```

Without `RESEND_API_KEY`, the contact form still works in development and logs submissions to the terminal instead of sending them.

## Scripts

| Command          | What it does                                     |
| ---------------- | ------------------------------------------------ |
| `npm run dev`    | Start the dev server                             |
| `npm run build`  | Production build                                 |
| `npm start`      | Serve the production build                       |
| `npm run check`  | Type-check, lint (0 warnings) and Prettier check |
| `npm run format` | Format everything with Prettier                  |

## Environment variables

| Variable               | Required   | Description                                                                                 |
| ---------------------- | ---------- | ------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Production | Public URL, no trailing slash (canonical links, sitemap, OG). Falls back to the Vercel URL. |
| `RESEND_API_KEY`       | Production | API key from [resend.com](https://resend.com/api-keys).                                     |
| `CONTACT_TO_EMAIL`     | Production | Inbox that receives contact form messages.                                                  |
| `CONTACT_FROM_EMAIL`   | No         | Sender. Defaults to `Studio. <onboarding@resend.dev>`.                                      |

> **Resend test sender:** until your domain is verified in Resend, keep the default `onboarding@resend.dev` sender. It can only deliver to the email address of your Resend account, so `CONTACT_TO_EMAIL` must be that address. After verifying your domain, set `CONTACT_FROM_EMAIL` to e.g. `Studio. <hello@yourdomain.mn>`.

## Deploy on Vercel

1. Import this repository at [vercel.com/new](https://vercel.com/new) — the Next.js preset is detected automatically.
2. Add the environment variables above under **Settings → Environment Variables**.
3. Deploy. Every push to `main` redeploys; pull requests get preview URLs.
4. Custom domain: add it under **Settings → Domains**, then set `NEXT_PUBLIC_SITE_URL` to it and redeploy.
5. Turn on **Analytics** in the Vercel project to collect page views.
