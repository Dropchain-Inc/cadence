type LogoProps = {
  variant?: 'dark' | 'light'
  className?: string
}

/**
 * Cadence logo mark — a monogram "C" built from two nested arcs that
 * read as a sonic pulse radiating outward: the AI voice reaching the lead,
 * the rhythm of a cadence, and the letter C all at once. The inner arc is
 * struck in gold as the signature beat.
 */
export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const isDark = variant === 'dark'
  const tile = isDark ? 'bg-stone-900' : 'bg-stone-700'
  const wordmark = isDark ? 'text-stone-900' : 'text-stone-100'
  const outer = isDark ? '#fafaf9' : '#e7e5e4' // stone-50 / stone-200

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className={`w-8 h-8 rounded-xl flex items-center justify-center ${tile}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          {/* outer pulse — the open "C" */}
          <path
            d="M17.79 5.11 A9 9 0 1 0 17.79 18.89"
            stroke={outer}
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          {/* inner pulse — gold accent echo */}
          <path
            d="M15.34 8.02 A5.2 5.2 0 1 0 15.34 15.98"
            stroke="#B8973E"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* origin point — the call being placed */}
          <circle cx="12" cy="12" r="1.35" fill={outer} />
        </svg>
      </span>
      <span className={`font-sans font-semibold tracking-tight text-[15px] ${wordmark}`}>
        Cadence
      </span>
    </span>
  )
}
