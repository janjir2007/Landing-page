import { type SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

export function CloseIcon(props: Props) {
  return (
    <svg width={18} height={18} viewBox="0 0 18 18" aria-hidden focusable={false} {...props}>
      <path
        d="M4 4l10 10M14 4 4 14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
