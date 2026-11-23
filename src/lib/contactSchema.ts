import { z } from "zod";

import { locales } from "@/content/types";

export const SERVICE_VALUES = ["mobile", "web", "design", "other"] as const;
export type ServiceValue = (typeof SERVICE_VALUES)[number];

/**
 * Error codes, not messages: client and server share this schema and the UI
 * maps each code to the dictionary (`contact.form.errors`) in the current locale.
 */
export type ContactErrorCode = "name" | "contact" | "phone" | "email" | "service" | "message";
export type ContactField = "name" | "phone" | "email" | "service" | "message";
export type ContactErrors = Partial<Record<ContactField, ContactErrorCode>>;

const CODES: readonly string[] = ["name", "contact", "phone", "email", "service", "message"];

const FIELDS: readonly ContactField[] = ["name", "phone", "email", "service", "message"];

/** 8–15 digits once spaces, dashes, brackets and a leading + are removed. */
const isPhone = (v: string) => /^\+?[\d\s()-]+$/.test(v) && /^\d{8,15}$/.test(v.replace(/\D/g, ""));
const isEmail = (v: string) => z.email().safeParse(v).success;
/** Safe on unvalidated input — the refine below also runs when fields are invalid. */
const filled = (v: unknown) => typeof v === "string" && v.trim() !== "";

export const contactSchema = z
  .object({
    name: z.string("name").trim().min(1, "name").max(100, "name"),
    // Phone and email are each optional ("" allowed); the refine below needs one of them.
    phone: z
      .string("phone")
      .trim()
      .max(30, "phone")
      .refine((v) => v === "" || isPhone(v), "phone"),
    email: z
      .string("email")
      .trim()
      .max(200, "email")
      .refine((v) => v === "" || isEmail(v), "email"),
    service: z.enum(SERVICE_VALUES, "service"),
    message: z.string("message").trim().min(10, "message").max(5000, "message"),
    locale: z.enum(locales),
    /** Honeypot — hidden from people; bots that fill it are silently dropped. */
    company: z.string().max(200).optional(),
  })
  .refine((d) => filled(d.phone) || filled(d.email), {
    error: "contact",
    path: ["phone"], // phone first: the shared error shows under the phone field
    // Run even when other fields are invalid, so every error shows on the first submit.
    when: () => true,
  });

export type ContactInput = z.infer<typeof contactSchema>;

/** First error code per field, for inline messages. */
export function fieldErrors(error: z.ZodError): ContactErrors {
  const out: ContactErrors = {};
  for (const issue of error.issues) {
    const field = FIELDS.find((f) => f === issue.path[0]);
    if (!field || out[field]) continue;
    // Unknown messages (shouldn’t happen) fall back to the field’s own code.
    out[field] = (CODES.includes(issue.message) ? issue.message : field) as ContactErrorCode;
  }
  return out;
}
