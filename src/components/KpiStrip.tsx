import { useI18n } from '../i18n'
import { KPIS } from '../lib/portfolio'
import { fmtPct } from '../lib/format'

/** Derived portfolio KPI strip — health, variance, milestones, risks, escalations. */
export function KpiStrip() {
  const { t } = useI18n()
  const k = KPIS

  const cell = 'flex flex-col gap-0.5 px-4 py-2.5 sm:px-5'
  const value = 'tnum text-[15px] font-semibold leading-tight text-starlight'

  return (
    <div className="panel flex flex-wrap items-stretch divide-x divide-[var(--hairline)] overflow-hidden">
      <div className={cell}>
        <span className="eyebrow">{t('kpi.health')}</span>
        <span className={`${value} flex items-center gap-3`}>
          <span className="flex items-center gap-1.5">
            <span className="dot dot-green" />
            {k.statusCounts.green}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="dot dot-amber" />
            {k.statusCounts.amber}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="dot dot-red" />
            {k.statusCounts.red}
          </span>
        </span>
      </div>
      <div className={cell}>
        <span className="eyebrow">{t('kpi.variance')}</span>
        <span className={value}>
          {fmtPct(k.variancePct)}{' '}
          <span className="font-normal text-muted">({t('kpi.under')})</span>
        </span>
      </div>
      <div className={cell}>
        <span className="eyebrow">{t('kpi.milestones')}</span>
        <span className={value}>
          {k.quarterMilestonesDone}
          <span className="text-muted"> / {k.quarterMilestonesTotal}</span>
        </span>
      </div>
      <div className={cell}>
        <span className="eyebrow">{t('kpi.risks')}</span>
        <span className={value}>
          {k.openRisks}{' '}
          <span className="font-normal text-muted">
            ({k.highRisks} {t('kpi.risksHigh')})
          </span>
        </span>
      </div>
      <div className={cell}>
        <span className="eyebrow">{t('kpi.escalations')}</span>
        <span className={value}>{k.escalations}</span>
      </div>
    </div>
  )
}
