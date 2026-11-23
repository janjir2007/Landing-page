import {
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

import { cn } from "@/lib/cn";

import { ChevronIcon } from "./ChevronIcon";

const control =
  "w-full rounded-2xl border bg-bg px-4 text-fg placeholder:text-muted " +
  "hover:border-muted/60 focus-visible:border-accent " +
  "aria-[invalid=true]:border-danger";

type Common = {
  id: string;
  label: string;
  /** Error message to show; also marks the control invalid. */
  error?: string;
  /** Extra element ids describing this control (e.g. a shared hint). */
  describedBy?: string;
  className?: string;
};

type Props =
  | (Common & { as?: "input" } & InputHTMLAttributes<HTMLInputElement>)
  | (Common & { as: "textarea" } & TextareaHTMLAttributes<HTMLTextAreaElement>)
  | (Common & { as: "select"; children: ReactNode } & SelectHTMLAttributes<HTMLSelectElement>);

/**
 * Labelled form control with an inline error. The error is linked through
 * aria-describedby and the control gets aria-invalid, so screen readers
 * announce both. Visible label always; ≥ 48px tall controls.
 */
export function FormField(props: Props) {
  const { id, label, error, describedBy, className } = props;
  const errorId = `${id}-error`;
  const aria = {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": [describedBy, error && errorId].filter(Boolean).join(" ") || undefined,
  };
  const border = error ? "border-danger" : "border-border";

  let field: ReactNode;
  if (props.as === "textarea") {
    const { as: _as, label: _l, error: _e, describedBy: _d, className: _c, ...rest } = props;
    field = (
      <textarea {...rest} {...aria} className={cn(control, border, "min-h-36 resize-y py-3")} />
    );
  } else if (props.as === "select") {
    const {
      as: _as,
      label: _l,
      error: _e,
      describedBy: _d,
      className: _c,
      children,
      ...rest
    } = props;
    field = (
      <div className="relative">
        <select {...rest} {...aria} className={cn(control, border, "h-12 appearance-none pr-10")}>
          {children}
        </select>
        <ChevronIcon className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted" />
      </div>
    );
  } else {
    const { as: _as, label: _l, error: _e, describedBy: _d, className: _c, ...rest } = props;
    field = <input {...rest} {...aria} className={cn(control, border, "h-12")} />;
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {field}
      {error && (
        <p id={errorId} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
