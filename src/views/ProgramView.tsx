import { Suspense, lazy, useState } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n'
import { CITIES, PROGRAM_BY_ID } from '../data/programs'
import type { ProgramId } from '../data/types'
import { StatusDot } from '../components/StatusDot'
import { fmtMoney } from '../lib/format'
import { OverviewTab } from './tabs/OverviewTab'
import { TimelineTab } from './tabs/TimelineTab'
import { RaidTab } from './tabs/RaidTab'

const FinancialsTab = lazy(() => import('./tabs/FinancialsTab'))
const AdoptionTab = lazy(() => import('./tabs/AdoptionTab'))
const ImprovementTab = lazy(() => import('./tabs/ImprovementTab'))

type TabId = 'overview' | 'timeline' | 'raid' | 'financials' | 'adoption' | 'improvement'

interface Props {
  programId: ProgramId
  onBack: () => void
  onOpenProgram: (id: ProgramId) => void
}

export default function ProgramView({ programId, onBack, onOpenProgram }: Props) {
  const { t, pick } = useI18n()
  const [tab, setTab] = useState<TabId>('overview')
  const p = PROGRAM_BY_ID[programId]

  const tabs: { id: TabId; label: string }[] = [
    { id: 'overview', label: t('tab.overview') },
    { id: 'timeline', label: t('tab.timeline') },
    { id: 'raid', label: t('tab.raid') },
    { id: 'financials', label: t('tab.financials') },
  ]
  if (p.adoption) tabs.push({ id: 'adoption', label: t('tab.adoption') })
  if (p.improvement) tabs.push({ id: 'improvement', label: t('tab.improvement') })

  const method =
    p.methodology === 'agile' ? t('method.agile') : p.methodology === 'waterfall' ? t('method.waterfall') : t('method.hybrid')

  const activeTab = tabs.some((x) => x.id === tab) ? tab : 'overview'

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6" key={programId}>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <button
          type="button"
          onClick={onBack}
          className="mb-3 text-sm text-muted transition-colors hover:text-starlight"
        >
          ← {t('shell.backToSky')}
        </button>

        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h1 className="display-title text-4xl text-gold sm:text-5xl">{p.codename}</h1>
          <span className="text-lg text-starlight">{pick(p.domain)}</span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
          <StatusDot status={p.status} withLabel />
          <span className="rounded-full border border-[var(--hairline)] px-2.5 py-0.5 text-xs">{method}</span>
          <span>
            {t('common.city')}: <span className="text-starlight">{pick(CITIES[p.city].name)}</span>
          </span>
          <span>
            {t('common.budget')}: <span className="tnum text-starlight">{fmtMoney(p.budget)}</span>
          </span>
          <span>
            {t('common.pm')}: <span className="text-starlight">{p.stakeholders.pm}</span>
          </span>
        </div>
      </motion.div>

      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="hairline-b mt-5 flex gap-1 overflow-x-auto"
        aria-label={t('common.program')}
      >
        {tabs.map((x) => {
          const active = activeTab === x.id
          return (
            <button
              key={x.id}
              type="button"
              onClick={() => setTab(x.id)}
              aria-current={active ? 'true' : undefined}
              className={`relative whitespace-nowrap px-3.5 py-2.5 text-sm transition-colors ${
                active ? 'text-gold' : 'text-muted hover:text-starlight'
              }`}
            >
              {x.label}
              {active && (
                <span aria-hidden="true" className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-gold" />
              )}
            </button>
          )
        })}
      </motion.nav>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="pt-5"
      >
        <Suspense
          fallback={
            <div className="flex h-64 items-center justify-center" aria-busy="true">
              <span className="dot dot-amber" />
            </div>
          }
        >
          {activeTab === 'overview' && <OverviewTab program={p} onOpenProgram={onOpenProgram} />}
          {activeTab === 'timeline' && <TimelineTab program={p} />}
          {activeTab === 'raid' && <RaidTab program={p} />}
          {activeTab === 'financials' && <FinancialsTab program={p} />}
          {activeTab === 'adoption' && p.adoption && <AdoptionTab program={p} />}
          {activeTab === 'improvement' && p.improvement && <ImprovementTab program={p} />}
        </Suspense>
      </motion.div>
    </div>
  )
}
