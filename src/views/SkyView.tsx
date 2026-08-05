import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { geoMercator, geoPath } from 'd3-geo'
import type { FeatureCollection } from 'geojson'
import latamGeo from '../data/latam-geo.json'
import { CITIES, DEPENDENCIES, PROGRAMS } from '../data/programs'
import type { Program, ProgramId, Status } from '../data/types'
import { useI18n, fmtDate } from '../i18n'
import { KpiStrip } from '../components/KpiStrip'
import { StatusDot } from '../components/StatusDot'
import { Sparkline } from '../components/Sparkline'
import { ProgramCards } from './ProgramsListView'
import { nextMilestone } from '../lib/portfolio'
import { fmtMoney } from '../lib/format'

const W = 900
const H = 640

/** Stars sharing a city get a small celestial offset so they never overlap. */
const OFFSETS: Partial<Record<ProgramId, [number, number]>> = {
  canopus: [-2.8, 2.6],
  hadar: [3.4, -1.6],
}

const GLOW_FILL: Record<Status, string> = {
  green: 'url(#glow-gold)',
  amber: 'url(#glow-amber)',
  red: 'url(#glow-ember)',
}
const GLOW_ANIM: Record<Status, string> = {
  green: '',
  amber: 'glow-amber',
  red: 'glow-red',
}

interface StarPos {
  program: Program
  x: number
  y: number
  r: number
}

function useStarPositions(): { stars: StarPos[]; mapD: string } {
  return useMemo(() => {
    const projection = geoMercator().scale(465).center([-66.5, -7.5]).translate([W / 2, H / 2 + 6])
    const path = geoPath(projection)
    const mapD = path(latamGeo as unknown as FeatureCollection) ?? ''
    const stars = PROGRAMS.map((program) => {
      const [lon, lat] = CITIES[program.city].coordinates
      const [dLon, dLat] = OFFSETS[program.id] ?? [0, 0]
      const pos = projection([lon + dLon, lat + dLat]) ?? [0, 0]
      // star size scales gently with budget
      const r = 2.4 + Math.sqrt(program.budget / 1_000_000) * 0.85
      return { program, x: pos[0], y: pos[1], r }
    })
    return { stars, mapD }
  }, [])
}

interface Hover {
  id: ProgramId
  x: number
  y: number
}

function HoverCard({ hover, stars }: { hover: Hover; stars: StarPos[] }) {
  const { t, lang, pick } = useI18n()
  const star = stars.find((s) => s.program.id === hover.id)
  if (!star) return null
  const p = star.program
  const next = nextMilestone(p.id)
  const methodKey =
    p.methodology === 'agile' ? t('method.agile') : p.methodology === 'waterfall' ? t('method.waterfall') : t('method.hybrid')
  const left = Math.min(hover.x + 18, window.innerWidth - 292)
  const top = Math.min(hover.y + 16, window.innerHeight - 220)
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className="panel pointer-events-none fixed z-40 w-[272px] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
      style={{ left, top }}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="display-title text-xl text-gold">{p.codename}</span>
        <StatusDot status={p.status} withLabel />
      </div>
      <div className="mt-1 text-sm leading-snug text-starlight">{pick(p.domain)}</div>
      <div className="mt-1.5 flex items-center gap-2 text-xs text-muted">
        <span>{pick(CITIES[p.city].name)}</span>
        <span aria-hidden="true">·</span>
        <span>{methodKey}</span>
        <span aria-hidden="true">·</span>
        <span className="tnum">{fmtMoney(p.budget)}</span>
      </div>
      {next && (
        <div className="mt-2.5 border-t border-[var(--hairline)] pt-2.5">
          <div className="eyebrow">{t('sky.nextMilestone')}</div>
          <div className="mt-0.5 text-[13px] leading-snug text-starlight">
            {pick(next.label)} <span className="tnum text-muted">· {fmtDate(next.date, lang)}</span>
          </div>
        </div>
      )}
      <div className="mt-2.5 flex items-center justify-between border-t border-[var(--hairline)] pt-2">
        <span className="eyebrow">{t('fin.monthlyBurn')}</span>
        <Sparkline data={p.burn} />
      </div>
    </motion.div>
  )
}

function Legend() {
  const { t } = useI18n()
  return (
    <div className="panel hidden w-[248px] flex-col gap-1.5 p-3.5 text-xs text-muted md:flex">
      <span className="eyebrow mb-1">{t('sky.legendTitle')}</span>
      <span className="flex items-center gap-2.5">
        <span className="dot dot-gold" /> {t('sky.legendGreen')}
      </span>
      <span className="flex items-center gap-2.5">
        <span className="dot dot-amber" /> {t('sky.legendAmber')}
      </span>
      <span className="flex items-center gap-2.5">
        <span className="dot dot-red" /> {t('sky.legendRed')}
      </span>
      <span className="mt-1 flex items-center gap-2.5">
        <svg width="18" height="6" aria-hidden="true">
          <line x1="1" y1="3" x2="17" y2="3" stroke="var(--muted)" strokeWidth="1" opacity="0.6" />
        </svg>
        {t('sky.legendEdge')}
      </span>
      <span className="flex items-center gap-2.5">
        <svg width="18" height="6" aria-hidden="true">
          <line x1="1" y1="3" x2="17" y2="3" stroke="var(--gold)" strokeWidth="1.4" strokeDasharray="3 3" />
        </svg>
        {t('sky.legendEdgeCritical')}
      </span>
    </div>
  )
}

const selectCls =
  'rounded-md border border-[var(--hairline)] bg-deep px-2.5 py-1.5 text-sm text-starlight focus:outline-none focus-visible:outline-2'

export function SkyView({ onOpenProgram }: { onOpenProgram: (id: ProgramId) => void }) {
  const { t, pick } = useI18n()
  const { stars, mapD } = useStarPositions()
  const [hover, setHover] = useState<Hover | null>(null)
  const [country, setCountry] = useState('all')
  const [status, setStatus] = useState('all')

  const visible = (p: Program) =>
    (country === 'all' || CITIES[p.city].country === country) &&
    (status === 'all' || p.status === status)

  const countries = [...new Set(Object.values(CITIES).map((c) => c.country))].sort()
  const starById = Object.fromEntries(stars.map((s) => [s.program.id, s])) as Record<ProgramId, StarPos>

  return (
    <>
      {/* ── Desktop: the constellation ───────────────────────────── */}
      <div className="relative hidden h-[calc(100vh-3.5rem)] min-h-[540px] overflow-hidden md:block">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-full w-full"
          role="img"
          aria-label={t('kpi.health')}
        >
          <defs>
            <radialGradient id="glow-gold">
              <stop offset="0%" stopColor="#E8B84B" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#E8B84B" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#E8B84B" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="glow-amber">
              <stop offset="0%" stopColor="#F2A65A" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#F2A65A" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F2A65A" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="glow-ember">
              <stop offset="0%" stopColor="#E4586B" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#E4586B" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#E4586B" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* faint LATAM outline */}
          <motion.path
            d={mapD}
            fill="rgba(138,147,201,0.05)"
            stroke="rgba(138,147,201,0.25)"
            strokeWidth="0.7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />

          {/* constellation dependency lines */}
          {DEPENDENCIES.map((dep, i) => {
            const a = starById[dep.from]
            const b = starById[dep.to]
            const dim = !visible(a.program) || !visible(b.program)
            const label = pick(dep.label)
            return (
              <g key={`${dep.from}-${dep.to}`} opacity={dim ? 0.1 : 1}>
                <title>{`${a.program.codename} → ${b.program.codename} — ${label}`}</title>
                <motion.line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={dep.critical ? 'var(--gold)' : 'var(--muted)'}
                  strokeWidth={dep.critical ? 1.1 : 0.8}
                  opacity={dep.critical ? 0.4 : 0.32}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 1.15 + i * 0.15, ease: 'easeInOut' }}
                />
                {dep.critical && (
                  <motion.line
                    className="edge-critical"
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="var(--gold)"
                    strokeWidth="1.6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    transition={{ duration: 0.8, delay: 1.6 }}
                  />
                )}
              </g>
            )
          })}

          {/* program stars */}
          {stars.map((s, i) => {
            const dim = !visible(s.program)
            const p = s.program
            return (
              <motion.g
                key={p.id}
                className="star-hit"
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: dim ? 0.12 : 1, scale: 1 }}
                transition={{
                  opacity: { duration: 0.35 },
                  scale: { type: 'spring', stiffness: 160, damping: 14, delay: 0.35 + i * 0.13 },
                }}
                style={{ transformOrigin: `${s.x}px ${s.y}px` }}
                tabIndex={dim ? -1 : 0}
                role="button"
                aria-label={`${p.codename} — ${pick(p.domain)}`}
                onClick={() => !dim && onOpenProgram(p.id)}
                onKeyDown={(e) => {
                  if (!dim && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault()
                    onOpenProgram(p.id)
                  }
                }}
                onMouseEnter={(e) => !dim && setHover({ id: p.id, x: e.clientX, y: e.clientY })}
                onMouseLeave={() => setHover(null)}
                onFocus={(e) => {
                  const rect = (e.target as SVGGElement).getBoundingClientRect()
                  setHover({ id: p.id, x: rect.right, y: rect.top })
                }}
                onBlur={() => setHover(null)}
              >
                <circle
                  className={`star-glow ${GLOW_ANIM[p.status]}`}
                  cx={s.x}
                  cy={s.y}
                  r={s.r * 3.1}
                  fill={GLOW_FILL[p.status]}
                />
                {s.r >= 4 && (
                  <g stroke="#FFFDF5" strokeWidth="0.7" opacity="0.55" aria-hidden="true">
                    <line x1={s.x - s.r * 2.4} y1={s.y} x2={s.x + s.r * 2.4} y2={s.y} />
                    <line x1={s.x} y1={s.y - s.r * 2.4} x2={s.x} y2={s.y + s.r * 2.4} />
                  </g>
                )}
                <circle cx={s.x} cy={s.y} r={s.r} fill="#FFFDF5" />
                <text
                  x={s.x}
                  y={s.y + s.r * 3.1 + 15}
                  textAnchor="middle"
                  fill="var(--muted)"
                  style={{ fontSize: 11, letterSpacing: '0.14em', fontWeight: 600 }}
                >
                  {p.codename}
                </text>
              </motion.g>
            )
          })}
        </svg>

        {/* overlays */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="pointer-events-auto absolute inset-x-4 top-4 flex justify-center"
        >
          <KpiStrip />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.7 }}
          className="absolute right-4 top-24 flex gap-2"
        >
          <label className="flex flex-col gap-1">
            <span className="eyebrow">{t('sky.filterCountry')}</span>
            <select className={selectCls} value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="all">{t('sky.allCountries')}</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="eyebrow">{t('sky.filterStatus')}</span>
            <select className={selectCls} value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">{t('sky.allStatuses')}</option>
              <option value="green">{t('status.green')}</option>
              <option value="amber">{t('status.amber')}</option>
              <option value="red">{t('status.red')}</option>
            </select>
          </label>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.9 }}
          className="absolute bottom-5 left-4"
        >
          <Legend />
        </motion.div>

        {hover && <HoverCard hover={hover} stars={stars} />}
      </div>

      {/* ── Mobile: decorative band + card list ─────────────────── */}
      <div className="md:hidden">
        <div className="relative mx-auto max-w-md px-4 pt-5" aria-hidden="true">
          <svg viewBox="0 0 400 130" className="w-full">
            <g stroke="var(--muted)" strokeWidth="0.7" opacity="0.35">
              <line x1={70} y1={28} x2={205} y2={96} />
              <line x1={205} y1={96} x2={340} y2={50} />
              <line x1={140} y1={62} x2={230} y2={102} />
            </g>
            <line
              x1={95}
              y1={104}
              x2={300}
              y2={44}
              stroke="var(--gold)"
              strokeWidth="1.2"
              className="edge-critical"
              opacity="0.8"
            />
            {(
              [
                ['acrux', 70, 28],
                ['atria', 140, 62],
                ['antares', 300, 44],
                ['mimosa', 95, 104],
                ['canopus', 205, 96],
                ['hadar', 230, 102],
              ] as [ProgramId, number, number][]
            ).map(([id, x, y]) => {
              const p = PROGRAMS.find((q) => q.id === id)!
              const r = 1.8 + Math.sqrt(p.budget / 1_000_000) * 0.6
              return (
                <g key={id}>
                  <circle cx={x} cy={y} r={r * 2.6} fill={GLOW_FILL[p.status]} />
                  <circle cx={x} cy={y} r={r} fill="#FFFDF5" />
                </g>
              )
            })}
          </svg>
        </div>
        <div className="mx-auto flex max-w-md flex-col gap-4 px-4 pb-8 pt-2">
          <KpiStrip />
          <ProgramCards onOpenProgram={onOpenProgram} />
        </div>
      </div>
    </>
  )
}
