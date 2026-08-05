import { useState } from 'react'
import { useI18n, fmtDate } from '../../i18n'
import type { Program, RaidType } from '../../data/types'
import { SevStar } from '../../components/SevStar'
import { PanelNote } from '../../components/PanelNote'

type Filter = 'all' | RaidType

export function RaidTab({ program: p }: { program: Program }) {
  const { t, lang, pick } = useI18n()
  const [filter, setFilter] = useState<Filter>('all')

  const typeLabel: Record<RaidType, string> = {
    risk: t('raid.risk'),
    assumption: t('raid.assumption'),
    issue: t('raid.issue'),
    dependency: t('raid.dependency'),
  }

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: t('raid.all') },
    { id: 'risk', label: t('raid.risk') },
    { id: 'assumption', label: t('raid.assumption') },
    { id: 'issue', label: t('raid.issue') },
    { id: 'dependency', label: t('raid.dependency') },
  ]

  const rows = p.raid.filter((r) => filter === 'all' || r.type === filter)
  const sevRank = { high: 0, medium: 1, low: 2 }
  rows.sort((a, b) => sevRank[a.severity] - sevRank[b.severity] || a.due.localeCompare(b.due))

  return (
    <div className="panel p-5">
      <div className="mb-4 flex flex-wrap gap-1.5" role="group" aria-label={t('raid.type')}>
        {filters.map((f) => {
          const count = f.id === 'all' ? p.raid.length : p.raid.filter((r) => r.type === f.id).length
          const active = filter === f.id
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={active}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                active
                  ? 'border-[rgba(232,184,75,0.6)] bg-[rgba(232,184,75,0.12)] text-gold'
                  : 'border-[var(--hairline)] text-muted hover:text-starlight'
              }`}
            >
              {f.label} <span className="tnum opacity-70">{count}</span>
            </button>
          )
        })}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-sm">
          <thead>
            <tr className="text-left">
              <th className="eyebrow pb-2 pr-4 font-semibold">{t('raid.type')}</th>
              <th className="eyebrow pb-2 pr-4 font-semibold">{t('raid.severity')}</th>
              <th className="eyebrow pb-2 pr-4 font-semibold">{t('raid.item')}</th>
              <th className="eyebrow pb-2 pr-4 font-semibold">{t('common.owner')}</th>
              <th className="eyebrow pb-2 font-semibold">{t('common.due')}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-[var(--hairline)] align-top">
                <td className="py-3 pr-4 text-muted">{typeLabel[r.type]}</td>
                <td className="whitespace-nowrap py-3 pr-4 text-muted">
                  <SevStar severity={r.severity} withLabel />
                </td>
                <td className="py-3 pr-4">
                  <div className="max-w-xl leading-snug text-starlight">{pick(r.title)}</div>
                  <div className="mt-1 max-w-xl text-xs leading-relaxed text-muted">
                    <span className="eyebrow mr-1.5">{t('raid.mitigation')}</span>
                    {pick(r.mitigation)}
                  </div>
                </td>
                <td className="whitespace-nowrap py-3 pr-4 text-muted">{r.owner}</td>
                <td className="tnum whitespace-nowrap py-3 text-muted">{fmtDate(r.due, lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PanelNote />
    </div>
  )
}
