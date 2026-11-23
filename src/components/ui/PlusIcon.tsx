import { type SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

export function PlusIcon(props: Props) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" aria-hidden focusable={false} {...props}>
      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
