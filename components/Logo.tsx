type LogoProps = {
  variant?: 'dark' | 'light'
  className?: string
}

/**
 * Cadence logo mark — a rhythmic waveform inside a rounded tile.
 * The varying bar heights read as a "cadence" (rhythm of a voice),
 * with a single gold accent bar as the signature beat.
 */
export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const isDark = variant === 'dark'
  const tile = isDark ? 'bg-stone-900' : 'bg-stone-700'
  const wordmark = isDark ? 'text-stone-900' : 'text-stone-100'
  const bar = isDark ? '#f5f5f4' : '#d6d3d1' // stone-100 / stone-300

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className={`w-7 h-7 rounded-lg flex items-center justify-center ${tile}`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          {/* rhythmic bars — short, tall, accent, medium, short */}
          <rect x="2"  y="9"  width="2.6" height="6"  rx="1.3" fill={bar} />
          <rect x="6.7" y="4"  width="2.6" height="16" rx="1.3" fill={bar} />
          <rect x="11.4" y="6.5" width="2.6" height="11" rx="1.3" fill="#B8973E" />
          <rect x="16.1" y="2.5" width="2.6" height="19" rx="1.3" fill={bar} />
          <rect x="20.8" y="9"  width="1.2" height="6"  rx="0.6" fill={bar} />
        </svg>
      </span>
      <span className={`font-sans font-semibold tracking-tight text-[15px] ${wordmark}`}>
        Cadence
      </span>
    </span>
  )
}
