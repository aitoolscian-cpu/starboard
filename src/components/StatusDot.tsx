import { useI18n } from '../i18n'
import type { Status } from '../data/types'

const DOT: Record<Status, string> = {
  green: 'dot dot-green',
  amber: 'dot dot-amber',
  red: 'dot dot-red',
}

export function StatusDot({ status, withLabel = false }: { status: Status; withLabel?: boolean }) {
  const { t } = useI18n()
  const label =
    status === 'green' ? t('status.green') : status === 'amber' ? t('status.amber') : t('status.red')
  return (
    <span className="inline-flex items-center gap-2">
      <span className={DOT[status]} aria-hidden="true" />
      {withLabel ? <span className="text-sm">{label}</span> : <span className="sr-only">{label}</span>}
    </span>
  )
}
