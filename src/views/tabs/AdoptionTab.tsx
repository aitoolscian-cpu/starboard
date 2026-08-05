import {
  Area,
  AreaChart,
  CartesianGrid,
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

export default function AdoptionTab({ program: p }: { program: Program }) {
  const { t } = useI18n()
  const a = p.adoption!
  const data = a.curve.map((v, i) => ({ week: i + 1, pct: v }))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        <StatTile label={t('ad.adoption')} value={`${a.curve[a.curve.length - 1]}%`} sub={`${t('ad.week')} 12`} />
        <StatTile label={t('ad.training')} value={`${a.trainingPct}%`} />
        <StatTile label={t('ad.champions')} value={String(a.champions)} sub={t('ad.championsDetail')} />
        <StatTile label={t('ad.pulse')} value={`${a.pulse.toFixed(1)} / 5`} />
      </div>

      <section className="panel p-5">
        <h2 className="eyebrow mb-4">{t('ad.curve')}</h2>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 4 }}>
            <defs>
              <linearGradient id="ad-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E8B84B" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#E8B84B" stopOpacity={0.02} />
              </linearGradient>
            </defs>
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
              tickFormatter={(v: number) => `${v}%`}
              domain={[0, 100]}
              width={44}
            />
            <Tooltip
              cursor={{ stroke: 'rgba(138,147,201,0.35)' }}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null
                return (
                  <TooltipShell title={`${t('ad.week')} ${label}`}>
                    <span>
                      {t('ad.adoption')}: <span className="tnum text-starlight">{payload[0].value}%</span>
                    </span>
                  </TooltipShell>
                )
              }}
            />
            <ReferenceLine
              y={80}
              stroke="var(--muted)"
              strokeDasharray="5 5"
              label={{ value: '80%', position: 'insideTopRight', fill: 'var(--muted)', fontSize: 11 }}
            />
            <Area
              dataKey="pct"
              stroke="var(--gold)"
              strokeWidth={2}
              fill="url(#ad-fill)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{t('ad.note')}</p>
        <PanelNote />
      </section>
    </div>
  )
}
