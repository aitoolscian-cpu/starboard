import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useI18n, monthLabel } from '../../i18n'
import type { Program } from '../../data/types'
import { StatTile } from '../../components/StatTile'
import { TooltipShell } from '../../components/ChartTooltip'
import { PanelNote } from '../../components/PanelNote'
import { fmtMoney, fmtPct } from '../../lib/format'

const AXIS_TICK = { fill: 'var(--muted)', fontSize: 11 }
const GRID = 'rgba(138,147,201,0.14)'

export default function FinancialsTab({ program: p }: { program: Program }) {
  const { t, lang } = useI18n()

  let running = 0
  const data = p.burn.map((v, i) => {
    running += v
    const actual = i < p.actualsThrough
    return {
      month: monthLabel(i, lang),
      burn: v,
      cumActual: actual ? running : null,
      cumForecast: i >= p.actualsThrough - 1 ? running : null,
      actual,
    }
  })

  const variancePct = ((p.fac - p.budget) / p.budget) * 100
  const under = p.fac <= p.budget

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        <StatTile label={t('fin.budget')} value={fmtMoney(p.budget)} />
        <StatTile label={t('fin.spendToDate')} value={fmtMoney(p.spendToDate)} />
        <StatTile label={t('fin.fac')} value={fmtMoney(p.fac)} />
        <StatTile
          label={t('fin.variance')}
          value={fmtPct(variancePct)}
          sub={under ? t('fin.underBudget') : t('fin.overBudget')}
          tone={under ? 'good' : 'bad'}
        />
      </div>

      <section className="panel p-5">
        <h2 className="eyebrow mb-4">{t('fin.title')}</h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 4 }}>
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis dataKey="month" tick={AXIS_TICK} axisLine={false} tickLine={false} />
            <YAxis
              tick={AXIS_TICK}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => fmtMoney(v)}
              width={58}
            />
            <Tooltip
              cursor={{ stroke: 'rgba(138,147,201,0.35)' }}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null
                const row = payload[0].payload as (typeof data)[number]
                const cum = row.cumActual ?? row.cumForecast ?? 0
                return (
                  <TooltipShell title={String(label)}>
                    <span>
                      {row.actual ? t('fin.actuals') : t('fin.forecast')}:{' '}
                      <span className="tnum text-starlight">{fmtMoney(cum)}</span>
                    </span>
                    <span>
                      {t('fin.budget')}: <span className="tnum">{fmtMoney(p.budget)}</span>
                    </span>
                  </TooltipShell>
                )
              }}
            />
            <ReferenceLine
              y={p.budget}
              stroke="var(--muted)"
              strokeDasharray="5 5"
              label={{ value: t('fin.budget'), position: 'insideTopRight', fill: 'var(--muted)', fontSize: 11 }}
            />
            <Line
              dataKey="cumActual"
              stroke="var(--gold)"
              strokeWidth={2}
              dot={false}
              name={t('fin.actuals')}
              isAnimationActive={false}
            />
            <Line
              dataKey="cumForecast"
              stroke="var(--gold)"
              strokeWidth={2}
              strokeDasharray="4 5"
              strokeOpacity={0.55}
              dot={false}
              name={t('fin.forecast')}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <svg width="18" height="4" aria-hidden="true">
              <line x1="0" y1="2" x2="18" y2="2" stroke="var(--gold)" strokeWidth="2" />
            </svg>
            {t('fin.actuals')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg width="18" height="4" aria-hidden="true">
              <line x1="0" y1="2" x2="18" y2="2" stroke="var(--gold)" strokeWidth="2" strokeDasharray="4 4" opacity="0.55" />
            </svg>
            {t('fin.forecast')}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg width="18" height="4" aria-hidden="true">
              <line x1="0" y1="2" x2="18" y2="2" stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>
            {t('fin.budget')}
          </span>
        </div>
      </section>

      <section className="panel p-5">
        <h2 className="eyebrow mb-1">{t('fin.monthlyBurn')}</h2>
        <p className="mb-3 text-xs text-muted">{t('fin.actualsToDate')}</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} margin={{ top: 4, right: 12, bottom: 0, left: 4 }} barCategoryGap="28%">
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis dataKey="month" tick={AXIS_TICK} axisLine={false} tickLine={false} />
            <YAxis
              tick={AXIS_TICK}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => fmtMoney(v)}
              width={58}
            />
            <Tooltip
              cursor={{ fill: 'rgba(138,147,201,0.08)' }}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null
                const row = payload[0].payload as (typeof data)[number]
                return (
                  <TooltipShell title={String(label)}>
                    <span>
                      {row.actual ? t('fin.actuals') : t('fin.forecast')}:{' '}
                      <span className="tnum text-starlight">{fmtMoney(row.burn)}</span>
                    </span>
                  </TooltipShell>
                )
              }}
            />
            <Bar dataKey="burn" radius={[4, 4, 0, 0]} isAnimationActive={false}>
              {data.map((row, i) => (
                <Cell key={i} fill={row.actual ? 'var(--gold)' : 'rgba(232,184,75,0.30)'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <PanelNote />
      </section>
    </div>
  )
}
