import { Resend } from "resend";

import { getDictionary } from "@/content";
import { site } from "@/content/site";
import { contactSchema, fieldErrors, type ContactInput } from "@/lib/contactSchema";
import { rateLimit } from "@/lib/rateLimit";

const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 } as const;
const DEFAULT_FROM = `${site.name} <onboarding@resend.dev>`;

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(ip, RATE_LIMIT.max, RATE_LIMIT.windowMs)) {
    return Response.json({ ok: false, error: "rateLimit" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "invalid", fields: fieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  const data = parsed.data;
  // Honeypot filled → pretend it worked so the bot learns nothing.
  if (data.company) return Response.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        "[contact] RESEND_API_KEY / CONTACT_TO_EMAIL not set — message not sent:\n",
        toText(data),
      );
      return Response.json({ ok: true, dev: true });
    }
    console.error("[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return Response.json({ ok: false, error: "server" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
    to,
    replyTo: data.email || undefined,
    subject: `${site.name} — ${data.name.replace(/[\r\n]+/g, " ")}`,
    text: toText(data),
  });

  if (error) {
    console.error("[contact] Resend error:", error.name, error.message);
    return Response.json({ ok: false, error: "server" }, { status: 502 });
  }
  return Response.json({ ok: true });
}

/** Plain-text email body (no HTML → nothing to inject). Labels in Mongolian for the team. */
function toText(d: ContactInput): string {
  const f = getDictionary("mn").contact.form;
  return [
    `${f.name}: ${d.name}`,
    `${f.phone}: ${d.phone || "—"}`,
    `${f.email}: ${d.email || "—"}`,
    `${f.service}: ${f.serviceOptions[d.service]}`,
    `Locale: ${d.locale}`,
    "",
    d.message,
  ].join("\n");
}
