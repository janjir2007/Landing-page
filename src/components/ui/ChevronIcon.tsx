import { type SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

export function ChevronIcon(props: Props) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" aria-hidden focusable={false} {...props}>
      <path
        d="m4 6 4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
