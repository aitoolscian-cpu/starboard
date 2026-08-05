import type { Severity } from '../data/types'
import { useI18n } from '../i18n'

const COLOR: Record<Severity, string> = {
  high: 'var(--ember)',
  medium: 'var(--amber)',
  low: 'var(--muted)',
}

/** Severity as a small 4-point star — constellation language instead of traffic-light pills. */
export function SevStar({ severity, withLabel = false }: { severity: Severity; withLabel?: boolean }) {
  const { t } = useI18n()
  const label = severity === 'high' ? t('sev.high') : severity === 'medium' ? t('sev.medium') : t('sev.low')
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg width="12" height="12" viewBox="0 0 100 100" fill={COLOR[severity]} aria-hidden="true">
        <path d="M50 4 Q50 50 96 50 Q50 50 50 96 Q50 50 4 50 Q50 50 50 4 Z" />
      </svg>
      {withLabel ? <span>{label}</span> : <span className="sr-only">{label}</span>}
    </span>
  )
}
