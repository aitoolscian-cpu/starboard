import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import { useI18n, fmtDate, monthLabel } from '../../i18n'
import type { Milestone, Program } from '../../data/types'
import { TODAY, TODAY_YEAR_FRACTION } from '../../data/types'
import { PanelNote } from '../../components/PanelNote'

const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

function frac(iso: string): number {
  const [, m, d] = iso.split('-').map(Number)
  return (m - 1 + (d - 1) / DAYS[m - 1]) / 12
}

const FOURTEEN_DAYS_AGO = '2026-07-22'

function MilestoneStar({ m }: { m: Milestone }) {
  if (m.state === 'done') {
    return (
      <g>
        <circle r="9" fill="url(#tl-glow)" />
        <path
          d="M0 -7 Q0 0 7 0 Q0 0 0 7 Q0 0 -7 0 Q0 0 0 -7 Z"
          fill="var(--gold)"
        />
      </g>
    )
  }
  if (m.state === 'atRisk') {
    return (
      <g className="glow-red">
        <circle r="8" fill="url(#tl-glow-ember)" />
        <path
          d="M0 -6.5 Q0 0 6.5 0 Q0 0 0 6.5 Q0 0 -6.5 0 Q0 0 0 -6.5 Z"
          fill="var(--ember)"
        />
      </g>
    )
  }
  return <circle r="4" fill="none" stroke="var(--starlight)" strokeWidth="1.4" opacity="0.8" />
}

export function TimelineTab({ program: p }: { program: Program }) {
  const { t, lang, pick } = useI18n()
  const wrapRef = useRef<HTMLDivElement>(null)

  // one restrained gold firework when a recent milestone win exists — once per program per session
  useEffect(() => {
    const eligible = p.milestones.some(
      (m) => m.state === 'done' && m.date >= FOURTEEN_DAYS_AGO && m.date <= TODAY,
    )
    const key = `starboard.firework.${p.id}`
    let seen = true
    try {
      seen = sessionStorage.getItem(key) === '1'
    } catch {
      /* fine */
    }
    if (!eligible || seen) return
    try {
      sessionStorage.setItem(key, '1')
    } catch {
      /* fine */
    }
    const timer = setTimeout(() => {
      const rect = wrapRef.current?.getBoundingClientRect()
      if (!rect) return
      confetti({
        disableForReducedMotion: true,
        particleCount: 55,
        spread: 78,
        startVelocity: 26,
        gravity: 0.85,
        scalar: 0.8,
        ticks: 140,
        colors: ['#E8B84B', '#F2CD7E', '#F7F4EC'],
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: Math.max(0.08, rect.top / window.innerHeight),
        },
      })
    }, 600)
    return () => clearTimeout(timer)
  }, [p])

  const W = 1000
  const AXIS_Y = 150
  const H = 260
  const todayX = TODAY_YEAR_FRACTION * W

  return (
    <div className="panel p-5" ref={wrapRef}>
      <h2 className="eyebrow mb-1">
        {t('tl.milestones')} · 2026
        {p.sprintWeeks
          ? ` · ${t('tl.sprints')}`
          : p.phases
            ? ` · ${t('tl.phases')}`
            : ''}
      </h2>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="min-w-[760px]" role="img" aria-label={t('tab.timeline')}>
          <defs>
            <radialGradient id="tl-glow">
              <stop offset="0%" stopColor="#E8B84B" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#E8B84B" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="tl-glow-ember">
              <stop offset="0%" stopColor="#E4586B" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#E4586B" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* month grid + labels */}
          {Array.from({ length: 12 }, (_, i) => {
            const x = (i / 12) * W
            return (
              <g key={i}>
                <line x1={x} y1={24} x2={x} y2={H - 28} stroke="var(--hairline)" strokeWidth="1" />
                <text
                  x={x + W / 24}
                  y={H - 10}
                  textAnchor="middle"
                  fill="var(--muted)"
                  style={{ fontSize: 11, letterSpacing: '0.08em' }}
                >
                  {monthLabel(i, lang)}
                </text>
              </g>
            )
          })}

          {/* phase blocks (waterfall / hybrid) */}
          {p.phases?.map((ph) => {
            const x = (ph.start / 12) * W
            const w = ((ph.end - ph.start + 1) / 12) * W
            return (
              <g key={pick(ph.label)}>
                <rect
                  x={x + 2}
                  y={30}
                  width={w - 4}
                  height={26}
                  rx={5}
                  fill="rgba(138,147,201,0.10)"
                  stroke="var(--hairline)"
                />
                <text
                  x={x + 10}
                  y={47}
                  fill="var(--muted)"
                  style={{ fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase' }}
                >
                  {pick(ph.label)}
                </text>
              </g>
            )
          })}

          {/* sprint ticks (agile) */}
          {p.sprintWeeks &&
            Array.from({ length: Math.floor(52 / p.sprintWeeks) }, (_, i) => {
              const x = ((i * p.sprintWeeks!) / 52) * W
              return <line key={i} x1={x} y1={40} x2={x} y2={50} stroke="var(--muted)" strokeWidth="1" opacity="0.5" />
            })}

          {/* baseline */}
          <line x1={0} y1={AXIS_Y} x2={W} y2={AXIS_Y} stroke="rgba(138,147,201,0.4)" strokeWidth="1.2" />

          {/* milestones — labels alternate above/below */}
          {p.milestones.map((m, i) => {
            const x = frac(m.date) * W
            const above = i % 2 === 0
            const labelY = above ? AXIS_Y - 52 : AXIS_Y + 34
            return (
              <g key={m.id}>
                <line
                  x1={x}
                  y1={AXIS_Y + (above ? -12 : 12)}
                  x2={x}
                  y2={above ? labelY + 18 : labelY - 12}
                  stroke="var(--hairline)"
                  strokeWidth="1"
                />
                <g transform={`translate(${x}, ${AXIS_Y})`}>
                  <MilestoneStar m={m} />
                  <title>{`${pick(m.label)} — ${fmtDate(m.date, lang, true)}`}</title>
                </g>
                <foreignObject x={x - 70} y={labelY - (above ? 26 : 8)} width="140" height="46">
                  <div
                    style={{
                      textAlign: 'center',
                      fontSize: 11,
                      lineHeight: 1.25,
                      color: m.state === 'atRisk' ? 'var(--ember)' : 'var(--starlight)',
                      opacity: m.state === 'done' ? 0.92 : 1,
                    }}
                  >
                    {pick(m.label)}
                    <div style={{ color: 'var(--muted)', fontVariantNumeric: 'tabular-nums' }}>
                      {fmtDate(m.date, lang)}
                    </div>
                  </div>
                </foreignObject>
              </g>
            )
          })}

          {/* today line */}
          <line x1={todayX} y1={18} x2={todayX} y2={H - 28} stroke="var(--gold)" strokeWidth="1.4" opacity="0.9" />
          <text
            x={todayX}
            y={12}
            textAnchor="middle"
            fill="var(--gold)"
            style={{ fontSize: 11, letterSpacing: '0.08em', fontWeight: 600 }}
          >
            {t('common.today')} · {fmtDate(TODAY, lang)}
          </text>
        </svg>
      </div>

      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="-8 -8 16 16" aria-hidden="true">
            <path d="M0 -6 Q0 0 6 0 Q0 0 0 6 Q0 0 -6 0 Q0 0 0 -6 Z" fill="var(--gold)" />
          </svg>
          {t('ms.done')}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="-8 -8 16 16" aria-hidden="true">
            <circle r="4" fill="none" stroke="var(--starlight)" strokeWidth="1.4" />
          </svg>
          {t('ms.onTrack')}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="-8 -8 16 16" aria-hidden="true">
            <path d="M0 -6 Q0 0 6 0 Q0 0 0 6 Q0 0 -6 0 Q0 0 0 -6 Z" fill="var(--ember)" />
          </svg>
          {t('ms.atRisk')}
        </span>
      </div>
      <PanelNote />
    </div>
  )
}
