import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { STRINGS } from './strings'
import type { StringKey } from './strings'

export type Lang = 'en' | 'es'

/** A bilingual string pair — used throughout the seed data. */
export interface Bi {
  en: string
  es: string
}

interface I18n {
  lang: Lang
  setLang: (l: Lang) => void
  /** Look up a UI string by key. */
  t: (key: StringKey) => string
  /** Pick the active language from a bilingual pair. */
  pick: (bi: Bi) => string
}

const I18nContext = createContext<I18n | null>(null)

const LS_KEY = 'starboard.lang'

function initialLang(): Lang {
  try {
    const stored = localStorage.getItem(LS_KEY)
    if (stored === 'en' || stored === 'es') return stored
  } catch {
    /* storage unavailable */
  }
  return 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(LS_KEY, l)
    } catch {
      /* storage unavailable */
    }
    document.documentElement.lang = l
  }, [])

  const value = useMemo<I18n>(
    () => ({
      lang,
      setLang,
      t: (key) => STRINGS[lang][key] ?? STRINGS.en[key] ?? key,
      pick: (bi) => bi[lang],
    }),
    [lang, setLang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18n {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n outside I18nProvider')
  return ctx
}

const MONTHS = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
}

/** '2026-08-05' → '5 Aug 2026' / '5 ago 2026' (no Date object: demo dates are fixed). */
export function fmtDate(iso: string, lang: Lang, withYear = false): string {
  const [y, m, d] = iso.split('-').map(Number)
  const month = MONTHS[lang][(m ?? 1) - 1]
  return withYear ? `${d} ${month} ${y}` : `${d} ${month}`
}

export function monthLabel(monthIndex: number, lang: Lang): string {
  return MONTHS[lang][monthIndex]
}
