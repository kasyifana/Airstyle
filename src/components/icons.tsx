import type { SVGProps } from "react";

export function AirstyleLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      {...props}
    >
      <path fill="none" d="M0 0h256v256H0z" />
      <path
        fill="currentColor"
        d="M128 24a104 104 0 0 0-91.85 153.11c13.2-31.52 35.25-56.74 61-75.29-12-10-21-25.22-21-42.32a52 52 0 0 1 104 0c0 17.1-9 32.32-21.05 42.32 25.79 18.55 47.84 43.77 61 75.29A104 104 0 0 0 128 24Z"
      />
    </svg>
  );
}
