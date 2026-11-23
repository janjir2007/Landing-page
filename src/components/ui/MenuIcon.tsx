import { type SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

export function MenuIcon(props: Props) {
  return (
    <svg width={18} height={18} viewBox="0 0 18 18" aria-hidden focusable={false} {...props}>
      <path d="M2 6h14M2 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
