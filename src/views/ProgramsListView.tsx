import { motion } from 'framer-motion'
import { useI18n, fmtDate } from '../i18n'
import { CITIES, PROGRAMS } from '../data/programs'
import type { ProgramId } from '../data/types'
import { KpiStrip } from '../components/KpiStrip'
import { StatusDot } from '../components/StatusDot'
import { Sparkline } from '../components/Sparkline'
import { nextMilestone } from '../lib/portfolio'
import { fmtMoney } from '../lib/format'

export function ProgramCards({ onOpenProgram }: { onOpenProgram: (id: ProgramId) => void }) {
  const { t, lang, pick } = useI18n()
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
      {PROGRAMS.map((p, i) => {
        const next = nextMilestone(p.id)
        return (
          <motion.button
            key={p.id}
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 + i * 0.06, ease: 'easeOut' }}
            onClick={() => onOpenProgram(p.id)}
            className="panel group flex flex-col gap-2.5 p-4 text-left transition-colors hover:border-[rgba(232,184,75,0.45)]"
          >
            <span className="flex items-baseline justify-between gap-3">
              <span className="display-title text-xl text-gold">{p.codename}</span>
              <StatusDot status={p.status} withLabel />
            </span>
            <span className="text-sm leading-snug text-starlight">{pick(p.domain)}</span>
            <span className="flex items-center justify-between gap-3 text-xs text-muted">
              <span>
                {pick(CITIES[p.city].name)} · <span className="tnum">{fmtMoney(p.budget)}</span>
              </span>
              <Sparkline data={p.burn} width={72} height={20} />
            </span>
            {next && (
              <span className="hairline-b -mx-4 border-t border-[var(--hairline)] px-4 pt-2 text-xs !border-b-0">
                <span className="eyebrow mr-2">{t('sky.nextMilestone')}</span>
                <span className="text-starlight">{pick(next.label)}</span>
                <span className="tnum text-muted"> · {fmtDate(next.date, lang)}</span>
              </span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}

export function ProgramsListView({ onOpenProgram }: { onOpenProgram: (id: ProgramId) => void }) {
  const { t } = useI18n()
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="display-title text-3xl text-starlight"
      >
        {t('common.programs')}
      </motion.h1>
      <KpiStrip />
      <ProgramCards onOpenProgram={onOpenProgram} />
    </div>
  )
}
