"use client";

import { type FormEvent, useRef, useState } from "react";

import { type Dictionary, type Locale } from "@/content/types";
import { cn } from "@/lib/cn";
import {
  type ContactErrors,
  type ContactField,
  contactSchema,
  fieldErrors,
  SERVICE_VALUES,
} from "@/lib/contactSchema";

import { ArrowIcon } from "./ArrowIcon";
import { FormField } from "./FormField";
import { SubmitButton } from "./SubmitButton";

type Props = {
  t: Dictionary["contact"]["form"];
  locale: Locale;
};

type Status = "idle" | "sending" | "success" | "error";
type ApiResponse = { ok: boolean; error?: string; fields?: ContactErrors };

/** DOM order of fields — the first invalid one gets focus. */
const ORDER: ContactField[] = ["name", "phone", "email", "service", "message"];
const HINT_ID = "contact-hint";

/**
 * Contact form. Same zod schema on client and server; errors are codes mapped
 * to the current locale. Phone or email — at least one, phone first.
 * Without JS the form is inert (noValidate + no action); the channels beside it remain.
 */
export function ContactForm({ t, locale }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const msg = (field: ContactField) => {
    const code = errors[field];
    return code ? t.errors[code] : undefined;
  };

  const showErrors = (next: ContactErrors) => {
    setErrors(next);
    const first = ORDER.find((f) => next[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const value = (k: string) => String(fd.get(k) ?? "");
    const parsed = contactSchema.safeParse({
      name: value("name"),
      phone: value("phone"),
      email: value("email"),
      service: value("service"),
      message: value("message"),
      company: value("company"),
      locale,
    });

    if (!parsed.success) {
      showErrors(fieldErrors(parsed.error));
      return;
    }

    setErrors({});
    setStatus("sending");
    setStatusMessage(t.sending);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = (await res.json()) as ApiResponse;
      if (json.ok) {
        setStatus("success");
        setStatusMessage(t.success);
        formRef.current?.reset();
      } else if (json.fields) {
        setStatus("idle");
        setStatusMessage("");
        showErrors(json.fields);
      } else {
        setStatus("error");
        setStatusMessage(json.error === "rateLimit" ? t.errors.rateLimit : t.error);
      }
    } catch {
      setStatus("error");
      setStatusMessage(t.error);
    }
  };

  // Clear a field's error as soon as the user edits it (phone/email clear the shared one).
  const onInput = (e: FormEvent<HTMLFormElement>) => {
    const name = (e.target as HTMLInputElement).name as ContactField;
    setErrors((prev) => {
      if (!prev[name] && !(name === "email" && prev.phone === "contact")) return prev;
      const next = { ...prev };
      delete next[name];
      if (name === "email" && next.phone === "contact") delete next.phone;
      return next;
    });
    if (status === "success" || status === "error") setStatus("idle");
  };

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      onInput={onInput}
      className="flex flex-col gap-6"
    >
      <FormField
        id="name"
        name="name"
        label={t.name}
        autoComplete="name"
        aria-required
        error={msg("name")}
      />

      <fieldset className="flex flex-col gap-3" aria-describedby={HINT_ID}>
        <legend className="mb-1 text-sm font-medium">{t.contactLegend}</legend>
        <p id={HINT_ID} className="text-sm text-muted">
          {t.contactHint}
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            label={t.phone}
            placeholder={t.phonePlaceholder}
            describedBy={HINT_ID}
            error={msg("phone")}
          />
          <FormField
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            label={t.email}
            describedBy={HINT_ID}
            error={msg("email")}
          />
        </div>
      </fieldset>

      <FormField
        as="select"
        id="service"
        name="service"
        label={t.service}
        defaultValue={SERVICE_VALUES[0]}
        error={msg("service")}
      >
        {SERVICE_VALUES.map((v) => (
          <option key={v} value={v}>
            {t.serviceOptions[v]}
          </option>
        ))}
      </FormField>

      <FormField
        as="textarea"
        id="message"
        name="message"
        label={t.message}
        placeholder={t.messagePlaceholder}
        aria-required
        rows={5}
        error={msg("message")}
      />

      {/* Honeypot: off-screen and skipped by keyboard/screen readers; only bots fill it. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <SubmitButton pending={status === "sending"} icon={<ArrowIcon />}>
          {status === "sending" ? t.sending : t.submit}
        </SubmitButton>
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "text-sm",
            status === "success"
              ? "text-accent"
              : status === "error"
                ? "text-danger"
                : "text-muted",
          )}
        >
          {status === "idle" ? "" : statusMessage}
        </p>
      </div>
    </form>
  );
}
