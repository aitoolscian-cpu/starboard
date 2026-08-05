import { motion } from 'framer-motion'
import { useI18n, fmtDate } from '../i18n'
import { PROGRAMS, PROGRAM_BY_ID } from '../data/programs'
import { TODAY } from '../data/types'
import { KPIS, nextMilestone } from '../lib/portfolio'
import { fmtMoney, fmtPct } from '../lib/format'
import { StatusDot } from '../components/StatusDot'
import { SevStar } from '../components/SevStar'
import { Logomark } from '../components/Logomark'

export default function SteeringView() {
  const { t, lang, pick } = useI18n()

  const highRisks = PROGRAMS.flatMap((p) =>
    p.raid
      .filter((r) => r.type === 'risk' && r.severity === 'high')
      .map((r) => ({ program: p, risk: r })),
  ).slice(0, 3)

  const escalation = PROGRAM_BY_ID.antares.raid.find((r) => r.id === 'ant-i1')!

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="no-print mb-5 flex flex-wrap items-end justify-between gap-3"
      >
        <div>
          <h1 className="display-title text-3xl text-starlight sm:text-4xl">{t('st.title')}</h1>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-md bg-gold px-5 py-2 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
        >
          {t('st.export')}
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        id="steering-sheet"
        className="panel p-6 sm:p-8"
      >
        {/* sheet header */}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--hairline)] pb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-gold print-ink">
              <Logomark size={20} />
            </span>
            <div>
              <div className="wordmark text-base leading-none print-ink">STARBOARD</div>
              <h2 className="mt-1 text-lg font-semibold leading-tight text-starlight print-ink">
                {t('st.title')}
              </h2>
            </div>
          </div>
          <div className="text-right text-xs text-muted print-muted">
            <div>
              {t('st.asOf')} <span className="tnum">{fmtDate(TODAY, lang, true)}</span>
            </div>
            <div>
              {t('st.preparedBy')} C. O’Donovan · {t('common.pm')}
            </div>
          </div>
        </div>

        {/* portfolio RAG table */}
        <section className="mt-5">
          <h3 className="eyebrow mb-2">{t('st.portfolio')}</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-[13px]">
              <thead>
                <tr className="text-left">
                  <th className="eyebrow pb-1.5 pr-3 font-semibold">{t('st.program')}</th>
                  <th className="eyebrow pb-1.5 pr-3 font-semibold" />
                  <th className="eyebrow pb-1.5 pr-3 text-right font-semibold">{t('common.budget')}</th>
                  <th className="eyebrow pb-1.5 pr-3 text-right font-semibold">{t('fin.fac')}</th>
                  <th className="eyebrow pb-1.5 pr-3 text-right font-semibold">{t('fin.variance')}</th>
                  <th className="eyebrow pb-1.5 font-semibold">{t('st.trend')}</th>
                </tr>
              </thead>
              <tbody>
                {PROGRAMS.map((p) => {
                  const next = nextMilestone(p.id)
                  const v = ((p.fac - p.budget) / p.budget) * 100
                  return (
                    <tr key={p.id} className="border-t border-[var(--hairline)] align-baseline">
                      <td className="py-2 pr-3">
                        <span className="font-semibold text-starlight print-ink">{p.codename}</span>
                        <span className="ml-2 hidden text-muted print-muted sm:inline">{pick(p.domain)}</span>
                      </td>
                      <td className="whitespace-nowrap py-2 pr-3">
                        <StatusDot status={p.status} withLabel />
                      </td>
                      <td className="tnum py-2 pr-3 text-right text-starlight print-ink">{fmtMoney(p.budget)}</td>
                      <td className="tnum py-2 pr-3 text-right text-starlight print-ink">{fmtMoney(p.fac)}</td>
                      <td
                        className={`tnum py-2 pr-3 text-right ${v > 0 ? 'text-ember' : 'text-aurora'} print-ink`}
                      >
                        {fmtPct(v)}
                      </td>
                      <td className="py-2 text-muted print-muted">
                        {next ? (
                          <>
                            {pick(next.label)} <span className="tnum">· {fmtDate(next.date, lang)}</span>
                          </>
                        ) : (
                          '—'
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {/* top risks */}
          <section>
            <h3 className="eyebrow mb-2">{t('st.topRisks')}</h3>
            <ul className="flex flex-col gap-2.5 text-[13px]">
              {highRisks.map(({ program, risk }) => (
                <li key={risk.id} className="flex gap-2">
                  <span className="mt-0.5">
                    <SevStar severity={risk.severity} />
                  </span>
                  <span>
                    <span className="font-semibold text-starlight print-ink">{program.codename}</span>{' '}
                    <span className="text-starlight/90 print-ink">{pick(risk.title)}</span>
                    <span className="block text-xs text-muted print-muted">
                      {risk.owner} · {t('common.due')} {fmtDate(risk.due, lang)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* open escalation */}
          <section>
            <h3 className="eyebrow mb-2">{t('st.escalation')}</h3>
            <div className="panel border-[rgba(228,88,107,0.35)] p-3.5 text-[13px]">
              <div className="flex items-center gap-2">
                <StatusDot status="red" />
                <span className="font-semibold text-starlight print-ink">
                  ANTARES · {t('ov.tier2')}
                </span>
              </div>
              <p className="mt-1.5 leading-snug text-starlight/90 print-ink">{pick(escalation.title)}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted print-muted">{pick(escalation.mitigation)}</p>
            </div>
          </section>
        </div>

        {/* decisions needed */}
        <section className="mt-6">
          <h3 className="eyebrow mb-2">{t('st.decisions')}</h3>
          <div className="panel border-[rgba(232,184,75,0.45)] p-3.5 text-[13px] text-starlight print-ink">
            {t('st.decision1')}
          </div>
        </section>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {/* financial summary */}
          <section>
            <h3 className="eyebrow mb-2">{t('st.finSummary')}</h3>
            <dl className="text-[13px]">
              {(
                [
                  [t('st.totalBudget'), fmtMoney(KPIS.totalBudget)],
                  [t('st.totalSpend'), fmtMoney(KPIS.totalSpend)],
                  [t('st.totalFac'), fmtMoney(KPIS.totalFac)],
                  [t('fin.variance'), `${fmtPct(KPIS.variancePct)} (${t('fin.underBudget')})`],
                ] as const
              ).map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between border-t border-[var(--hairline)] py-1.5 first:border-t-0"
                >
                  <dt className="text-muted print-muted">{label}</dt>
                  <dd className="tnum font-semibold text-starlight print-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* next 30 days */}
          <section>
            <h3 className="eyebrow mb-2">{t('st.next30')}</h3>
            <ul className="flex flex-col gap-1.5 text-[13px] text-starlight/90 print-ink">
              {([t('st.n1'), t('st.n2'), t('st.n3'), t('st.n4'), t('st.n5')] as string[]).map((line) => (
                <li key={line} className="tnum leading-snug">
                  {line}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <p className="mt-6 border-t border-[var(--hairline)] pt-3 text-[11px] text-muted print-muted">
          {t('st.printNote')}
        </p>
      </motion.div>
    </div>
  )
}
