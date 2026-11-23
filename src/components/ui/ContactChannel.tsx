import { type ReactNode } from "react";

import { ArrowIcon } from "./ArrowIcon";

type Props = {
  href: string;
  icon: ReactNode;
  label: string;
  value: string;
  external?: boolean;
};

/** Large tappable row: icon, label, value, arrow. */
export function ContactChannel({ href, icon, label, value, external }: Props) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex min-h-16 items-center gap-4 border-b border-border py-4"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-accent">
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-sm text-muted">{label}</span>
        <span className="truncate font-display text-lg font-semibold tracking-[-0.02em]">
          {value}
        </span>
      </span>
      <ArrowIcon className="shrink-0 text-muted transition-transform group-hover:translate-x-1" />
    </a>
  );
}
