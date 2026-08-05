import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useI18n } from '../../i18n'
import type { Program } from '../../data/types'
import { StatTile } from '../../components/StatTile'
import { TooltipShell } from '../../components/ChartTooltip'
import { PanelNote } from '../../components/PanelNote'

const AXIS_TICK = { fill: 'var(--muted)', fontSize: 11 }
const GRID = 'rgba(138,147,201,0.14)'

export default function ImprovementTab({ program: p }: { program: Program }) {
  const { t } = useI18n()
  const imp = p.improvement!
  const data = imp.series.map((v, i) => ({ week: i + 1, days: v }))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        <StatTile label={`${t('imp.metric')} · ${t('imp.before')}`} value={`${imp.beforeDays.toFixed(1)} ${t('imp.days')}`} />
        <StatTile
          label={`${t('imp.metric')} · ${t('imp.after')}`}
          value={`${imp.afterDays.toFixed(1)} ${t('imp.days')}`}
          tone="good"
        />
        <StatTile label={t('imp.title').split('—')[0].trim()} value={`−${imp.reductionPct}%`} sub={t('imp.reduction')} tone="good" />
      </div>

      <section className="panel p-5">
        <h2 className="eyebrow mb-4">{t('imp.chart')}</h2>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 4 }}>
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis
              dataKey="week"
              tick={AXIS_TICK}
              axisLine={false}
              tickLine={false}
              tickFormatter={(w: number) => `${t('ad.week').slice(0, 1)}${w}`}
            />
            <YAxis
              tick={AXIS_TICK}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${v}d`}
              domain={[3, 7]}
              width={40}
            />
            <Tooltip
              cursor={{ stroke: 'rgba(138,147,201,0.35)' }}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null
                return (
                  <TooltipShell title={`${t('ad.week')} ${label}`}>
                    <span>
                      MTTR:{' '}
                      <span className="tnum text-starlight">
                        {Number(payload[0].value).toFixed(1)} {t('imp.days')}
                      </span>
                    </span>
                  </TooltipShell>
                )
              }}
            />
            {/* before / after mean segments */}
            <ReferenceLine
              segment={[
                { x: 1, y: imp.beforeDays },
                { x: imp.interventionWeek, y: imp.beforeDays },
              ]}
              stroke="var(--muted)"
              strokeDasharray="5 5"
            />
            <ReferenceLine
              segment={[
                { x: imp.interventionWeek + 3, y: imp.afterDays },
                { x: imp.series.length, y: imp.afterDays },
              ]}
              stroke="var(--aurora)"
              strokeDasharray="5 5"
              strokeOpacity={0.7}
            />
            <ReferenceLine
              x={imp.interventionWeek + 1}
              stroke="var(--gold)"
              strokeDasharray="4 4"
              label={{ value: 'DMAIC', position: 'insideTopRight', fill: 'var(--gold)', fontSize: 11 }}
            />
            <Line
              dataKey="days"
              stroke="var(--starlight)"
              strokeWidth={2}
              dot={{ r: 2.5, fill: 'var(--starlight)', strokeWidth: 0 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{t('imp.note')}</p>
        <PanelNote />
      </section>
    </div>
  )
}
