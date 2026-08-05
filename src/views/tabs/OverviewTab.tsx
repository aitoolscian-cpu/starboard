import { useI18n } from '../../i18n'
import { DEPENDENCIES, PROGRAM_BY_ID } from '../../data/programs'
import type { Program, ProgramId } from '../../data/types'
import { PanelNote } from '../../components/PanelNote'

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="panel p-5">
      <h2 className="eyebrow mb-3">{title}</h2>
      {children}
    </section>
  )
}

export function OverviewTab({
  program: p,
  onOpenProgram,
}: {
  program: Program
  onOpenProgram: (id: ProgramId) => void
}) {
  const { t, pick } = useI18n()

  const tiers = [t('ov.tier1'), t('ov.tier2'), t('ov.tier3')]
  const upstream = DEPENDENCIES.filter((d) => d.to === p.id)
  const downstream = DEPENDENCIES.filter((d) => d.from === p.id)

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="flex flex-col gap-4 lg:col-span-3">
        <Panel title={t('ov.health')}>
          <p className="text-[15px] leading-relaxed text-starlight">{pick(p.description)}</p>
          <p className="mt-3 text-[15px] leading-relaxed text-starlight/90">{pick(p.narrative)}</p>
          <PanelNote />
        </Panel>

        <Panel title={t('ov.escalation')}>
          <div className="flex flex-wrap items-center gap-2">
            {tiers.map((tier, i) => {
              const level = (i + 1) as 1 | 2 | 3
              const active = p.escalationTier === level && level > 1
              return (
                <span key={tier} className="flex items-center gap-2">
                  {i > 0 && <span className="text-muted" aria-hidden="true">→</span>}
                  <span
                    className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm ${
                      active
                        ? 'border-[rgba(242,166,90,0.6)] text-amber'
                        : 'border-[var(--hairline)] text-muted'
                    }`}
                  >
                    {active && <span className="dot dot-amber" aria-hidden="true" />}
                    {tier}
                    {active && <span className="eyebrow !text-amber">{t('ov.tierActive')}</span>}
                  </span>
                </span>
              )
            })}
          </div>
        </Panel>

        <Panel title={t('ov.dependencies')}>
          <div className="flex flex-col gap-3 text-sm">
            {upstream.length > 0 && (
              <div>
                <span className="eyebrow mr-2">{t('ov.dependsOn')}</span>
                <div className="mt-1.5 flex flex-col gap-1.5">
                  {upstream.map((d) => (
                    <button
                      key={d.from}
                      type="button"
                      onClick={() => onOpenProgram(d.from)}
                      className="group flex flex-wrap items-baseline gap-x-2 text-left"
                    >
                      <span className="display-title text-base text-gold group-hover:underline">
                        {PROGRAM_BY_ID[d.from].codename}
                      </span>
                      {d.critical && <span className="eyebrow !text-ember">{t('ov.critical')}</span>}
                      <span className="text-muted">{pick(d.label)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {downstream.length > 0 && (
              <div>
                <span className="eyebrow mr-2">{t('ov.feeds')}</span>
                <div className="mt-1.5 flex flex-col gap-1.5">
                  {downstream.map((d) => (
                    <button
                      key={d.to}
                      type="button"
                      onClick={() => onOpenProgram(d.to)}
                      className="group flex flex-wrap items-baseline gap-x-2 text-left"
                    >
                      <span className="display-title text-base text-gold group-hover:underline">
                        {PROGRAM_BY_ID[d.to].codename}
                      </span>
                      {d.critical && <span className="eyebrow !text-ember">{t('ov.critical')}</span>}
                      <span className="text-muted">{pick(d.label)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Panel>
      </div>

      <div className="flex flex-col gap-4 lg:col-span-2">
        <Panel title={t('ov.governance')}>
          <ul className="flex flex-col gap-1.5 text-sm text-starlight">
            <li>{t('ov.cadence1')}</li>
            <li>{t('ov.cadence2')}</li>
            <li>{t('ov.cadence3')}</li>
          </ul>
        </Panel>

        <Panel title={t('ov.stakeholders')}>
          <dl className="flex flex-col gap-2.5 text-sm">
            <div>
              <dt className="eyebrow">{t('ov.sponsor')}</dt>
              <dd className="mt-0.5 text-starlight">{p.stakeholders.sponsor}</dd>
            </div>
            <div>
              <dt className="eyebrow">{t('ov.serviceOwner')}</dt>
              <dd className="mt-0.5 text-starlight">{p.stakeholders.owner}</dd>
            </div>
            <div>
              <dt className="eyebrow">{t('common.pm')}</dt>
              <dd className="mt-0.5 text-starlight">{p.stakeholders.pm}</dd>
            </div>
          </dl>
        </Panel>

        <Panel title={t('ov.vendors')}>
          <ul className="flex flex-col gap-3 text-sm">
            {p.vendors.map((v) => (
              <li key={v.name}>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-semibold text-starlight">{v.name}</span>
                  <span className={v.slaBreached ? 'text-xs text-ember' : 'text-xs text-aurora'}>
                    {v.slaBreached ? t('ov.slaBreached') : t('ov.slaOk')}
                  </span>
                </div>
                <div className="text-muted">{pick(v.service)}</div>
                {v.slaNote && <div className="mt-0.5 text-xs text-ember/90">{pick(v.slaNote)}</div>}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  )
}
