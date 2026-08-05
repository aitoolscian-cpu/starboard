/** Southern Cross asterism — five 4-point stars. Generic astronomy; appears on several LATAM flags. */
export function Logomark({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M52 5 Q52 14 61 14 Q52 14 52 23 Q52 14 43 14 Q52 14 52 5 Z" />
      <path d="M44 80 Q44 88 52 88 Q44 88 44 96 Q44 88 36 88 Q44 88 44 80 Z" />
      <path d="M18 41 Q18 48 25 48 Q18 48 18 55 Q18 48 11 48 Q18 48 18 41 Z" />
      <path d="M76 27 Q76 34 83 34 Q76 34 76 41 Q76 34 69 34 Q76 34 76 27 Z" />
      <path d="M60 51.5 Q60 56 64.5 56 Q60 56 60 60.5 Q60 56 55.5 56 Q60 56 60 51.5 Z" />
    </svg>
  )
}
