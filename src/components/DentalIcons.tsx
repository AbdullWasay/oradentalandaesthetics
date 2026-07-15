import { type ReactElement, type ReactNode } from "react";

type IconProps = { className?: string };

function IconBase({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

/** Tooth with shield — preventive care */
export function PreventiveIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path
        d="M12 3c-2.8 0-5 2-5 4.8 0 1.6.4 2.8 1 4 .6 1.2 1.2 2.4 1.5 4.2.3 1.6.5 3.4.5 5 0 .6.4 1 1 1h2c.6 0 1-.4 1-1 0-1.6.2-3.4.5-5 .3-1.8.9-3 1.5-4.2.6-1.2 1-2.4 1-4C17 5 14.8 3 12 3Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 19.5 7 21.5M15.5 19.5 17 21.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M4 8.5 3 6.5 5 5.5 7 6.5 8 4.5 10 5.5"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

/** Crown on tooth — restorative */
export function RestorativeIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path
        d="M12 11c-2.2 0-4 1.6-4 3.6 0 1 .3 1.8.7 2.6.5 1 .9 2 .9 3.3 0 .6.4 1 1 1h2.8c.6 0 1-.4 1-1 0-1.3.4-2.3.9-3.3.4-.8.7-1.6.7-2.6 0-2-1.8-3.6-4-3.6Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path
        d="M8 11.5 9 7.5c.3-1.2 1.4-2 2.5-2h1c1.1 0 2.2.8 2.5 2l1 4"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 7.2 10 4.8h4l1 2.4"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 5.2h4" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </IconBase>
  );
}

/** Tooth cross-section — endodontics / root canal */
export function EndodonticsIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path
        d="M12 3.5c-2.5 0-4.5 1.8-4.5 4.2 0 1.4.5 2.5 1.1 3.5.6 1 1.2 2.1 1.4 3.6.2 1.3.3 2.8.3 4.2"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M12 3.5c2.5 0 4.5 1.8 4.5 4.2 0 1.4-.5 2.5-1.1 3.5-.6 1-1.2 2.1-1.4 3.6-.2 1.3-.3 2.8-.3 4.2"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M12 11v8.5M10 14.5h4M10 17h4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="9.5" r="1.2" fill="currentColor" />
    </IconBase>
  );
}

/** Tooth with extraction forceps */
export function ExtractionIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path
        d="M10.5 4.5c-1.8 0-3 1.4-3 3.2 0 1.1.4 2 .9 2.9.5.9 1 1.8 1.1 3.1.1 1.1.2 2.3.2 3.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M13.5 4.5c1.8 0 3 1.4 3 3.2 0 1.1-.4 2-.9 2.9-.5.9-1 1.8-1.1 3.1-.1 1.1-.2 2.3-.2 3.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M5 8.5c1.5-1 3-1.5 4.5-1M19 8.5c-1.5-1-3-1.5-4.5-1"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path d="M5 8.5v2.5l2 1.5M19 8.5v2.5l-2 1.5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </IconBase>
  );
}

/** Tooth with gum line — periodontal care */
export function GumCareIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path
        d="M12 4c-2.6 0-4.5 1.9-4.5 4.3 0 1.3.4 2.3 1 3.2.6.9 1.1 1.8 1.3 3 .2 1.1.3 2.3.3 3.5 0 .6.4 1 1 1h2.4c.6 0 1-.4 1-1 0-1.2.1-2.4.3-3.5.2-1.2.7-2.1 1.3-3 .6-.9 1-1.9 1-3.2C16.5 5.9 14.6 4 12 4Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 12.5c1.2.8 2.7 1.2 4.5 1.2s3.3-.4 4.5-1.2"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M6 15.5h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M8 17.5h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    </IconBase>
  );
}

/** Tooth with alert pulse — emergency */
export function EmergencyIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path
        d="M11 5c-2.2 0-3.8 1.6-3.8 3.7 0 1.2.4 2.1.9 3 .5.9 1 1.8 1.1 3 .2 1.1.3 2.2.3 3.3"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M13 5c2.2 0 3.8 1.6 3.8 3.7 0 1.2-.4 2.1-.9 3-.5.9-1 1.8-1.1 3-.2 1.1-.3 2.2-.3 3.3"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M18.5 4.5 20 3l1.5 1.5M20 3v3.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

/** Small tooth with star — pediatric */
export function PediatricIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path
        d="M11 8.5c-1.6 0-2.8 1.1-2.8 2.6 0 .9.3 1.6.7 2.3.4.7.8 1.4.9 2.4.1.8.2 1.7.2 2.7"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M13 8.5c1.6 0 2.8 1.1 2.8 2.6 0 .9-.3 1.6-.7 2.3-.4.7-.8 1.4-.9 2.4-.1.8-.2 1.7-.2 2.7"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M16.5 5.5 17.8 4l1.3 1.5 1.7-.3-.8 1.5.8 1.5-1.7-.3-1.3 1.5-1.3-1.5-1.7.3.8-1.5-.8-1.5 1.7.3 1.3-1.5Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

/** Tooth with shine lines — cosmetic */
export function CosmeticIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path
        d="M12 4.5c-2.4 0-4.2 1.7-4.2 3.9 0 1.3.4 2.2 1 3.1.6.9 1.1 1.8 1.3 3 .2 1.1.3 2.3.3 3.5 0 .6.4 1 1 1h1.6c.6 0 1-.4 1-1 0-1.2.1-2.4.3-3.5.2-1.2.7-2.1 1.3-3 .6-.9 1-1.8 1-3.1 0-2.2-1.8-3.9-4.2-3.9Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path d="M5 6.5 6.5 5M4.5 10 6 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M19 6.5 17.5 5M19.5 10 18 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </IconBase>
  );
}

/** Mouth guard / shield — oral health */
export function OralHealthIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path
        d="M6 10c0-3.3 2.7-6 6-6s6 2.7 6 6c0 2.2-.8 4.2-2 5.8-.8 1-1.5 2.2-1.8 3.7-.2 1-.3 2-.3 3"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M18 10c0-3.3-2.7-6-6-6S6 6.7 6 10c0 2.2.8 4.2 2 5.8.8 1 1.5 2.2 1.8 3.7.2 1 .3 2 .3 3"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path d="M9 13.5h6M10 16h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </IconBase>
  );
}

/** Tooth with x-ray beam — diagnostics */
export function DiagnosticIcon({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path
        d="M12 6.5c-2 0-3.5 1.4-3.5 3.2 0 1 .3 1.8.8 2.6.5.8 1 1.6 1.1 2.7.1.9.2 1.9.2 2.9"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M12 6.5c2 0 3.5 1.4 3.5 3.2 0 1-.3 1.8-.8 2.6-.5.8-1 1.6-1.1 2.7-.1.9-.2 1.9-.2 2.9"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path d="M4 5.5 7 8.5M4 8.5 7 5.5M4 7h2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="14.5" y="4" width="5" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M15.5 5.5h3M15.5 7h3M15.5 8.5h2" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.8" />
    </IconBase>
  );
}

export type DentalIconComponent = ({ className }: IconProps) => ReactElement;
