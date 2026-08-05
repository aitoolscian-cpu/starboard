import { useEffect, useMemo, useState } from 'react'
import { useI18n } from '../i18n'
import type { Nav, View } from '../lib/nav'
import { Logomark } from './Logomark'

const ZONES = [
  { code: 'BUE', name: 'Buenos Aires', tz: 'America/Argentina/Buenos_Aires' },
  { code: 'SAO', name: 'São Paulo', tz: 'America/Sao_Paulo' },
  { code: 'MEX', name: 'Mexico City', tz: 'America/Mexico_City' },
  { code: 'BUR', name: 'Burbank', tz: 'America/Los_Angeles' },
]

function Clocks() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const formatters = useMemo(
    () =>
      ZONES.map((z) =>
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: z.tz,
        }),
      ),
    [],
  )
  return (
    <div className="tnum hidden items-center gap-4 text-xs text-muted xl:flex" aria-hidden="true">
      {ZONES.map((z, i) => (
        <span key={z.code} title={z.name} className="whitespace-nowrap">
          <span className="mr-1.5 font-semibold tracking-widest">{z.code}</span>
          {formatters[i].format(now)}
        </span>
      ))}
    </div>
  )
}

interface Props {
  nav: Nav
  onNavigate: (nav: Nav) => void
  onLogoClick: () => void
  onAbout: () => void
}

export function Header({ nav, onNavigate, onLogoClick, onAbout }: Props) {
  const { t, lang, setLang } = useI18n()

  const items: { view: View; label: string }[] = [
    { view: 'sky', label: t('nav.sky') },
    { view: 'programs', label: t('nav.programs') },
    { view: 'composer', label: t('nav.composer') },
    { view: 'steering', label: t('nav.steering') },
  ]
  const activeView = nav.view === 'program' ? 'programs' : nav.view

  return (
    <header className="no-print hairline-b sticky top-0 z-30 bg-[rgba(10,14,30,0.78)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-5 gap-y-0 px-4 sm:px-6">
        <button
          type="button"
          onClick={onLogoClick}
          className="flex h-14 items-center gap-2.5 text-gold"
          aria-label="STARBOARD"
        >
          <Logomark size={22} />
          <span className="wordmark text-[19px] leading-none">STARBOARD</span>
        </button>

        <nav className="order-last -mx-1 flex h-11 w-full items-stretch gap-1 overflow-x-auto sm:order-none sm:h-14 sm:w-auto sm:gap-2">
          {items.map((it) => {
            const active = activeView === it.view
            return (
              <button
                key={it.view}
                type="button"
                onClick={() => onNavigate({ view: it.view })}
                aria-current={active ? 'page' : undefined}
                className={`relative px-3 text-sm transition-colors ${
                  active ? 'text-gold' : 'text-muted hover:text-starlight'
                }`}
              >
                {it.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-gold"
                  />
                )}
              </button>
            )
          })}
        </nav>

        <div className="ml-auto flex h-14 items-center gap-4">
          <Clocks />
          <div
            className="flex items-center rounded-full border border-[var(--hairline)] p-0.5 text-xs"
            role="group"
            aria-label={t('shell.language')}
          >
            {(['en', 'es'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-full px-2.5 py-1 font-semibold uppercase tracking-wide transition-colors ${
                  lang === l ? 'bg-gold text-ink' : 'text-muted hover:text-starlight'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onAbout}
            className="text-sm text-muted transition-colors hover:text-starlight"
          >
            {t('nav.about')}
          </button>
        </div>
      </div>
    </header>
  )
}
