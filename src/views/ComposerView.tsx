import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useI18n, fmtDate } from '../i18n'
import type { Lang } from '../i18n'
import { PROGRAMS, PROGRAM_BY_ID } from '../data/programs'
import { STATUS_TEXTS } from '../data/status'
import type { StatusDraft } from '../data/status'
import type { ProgramId } from '../data/types'
import { TODAY } from '../data/types'

type Audience = 'exec' | 'team'
type Phase = 'idle' | 'composing' | 'streaming' | 'done'

interface Session {
  programId: ProgramId
  audience: Audience
  draft: StatusDraft
}

function buildText(s: Session, lang: Lang, labels: Record<string, string>): string {
  const p = PROGRAM_BY_ID[s.programId]
  const d = s.draft
  const pickL = (bi: { en: string; es: string }) => bi[lang]
  const lines: string[] = []
  lines.push(`STARBOARD · ${p.codename} — ${pickL(p.domain)}`)
  lines.push(`${labels.audience} · ${fmtDate(TODAY, lang, true)}`)
  lines.push('')
  lines.push(pickL(d.headline))
  lines.push('')
  lines.push(labels.wins)
  for (const w of d.wins) lines.push(`• ${pickL(w)}`)
  lines.push('')
  lines.push(labels.watch)
  for (const w of d.watch) lines.push(`• ${pickL(w)}`)
  lines.push('')
  lines.push(labels.ask)
  lines.push(`• ${pickL(d.ask)}`)
  lines.push('')
  lines.push(labels.next)
  lines.push(`• ${pickL(d.next)}`)
  return lines.join('\n')
}

const CHARS_PER_TICK = 3
const TICK_MS = 42 // ≈ 70 chars/sec — reads as typing without testing a recruiter's patience

export default function ComposerView() {
  const { t, lang, pick } = useI18n()
  const reduced = useReducedMotion()
  const [programId, setProgramId] = useState<ProgramId>('canopus')
  const [audience, setAudience] = useState<Audience>('exec')
  const [session, setSession] = useState<Session | null>(null)
  const [phase, setPhase] = useState<Phase>('idle')
  const [revealed, setRevealed] = useState(0)
  const [copied, setCopied] = useState(false)
  const variantRef = useRef<Record<string, number>>({})

  const labels = useMemo(
    () => ({
      audience: audience === 'exec' ? t('cp.exec') : t('cp.team'),
      wins: t('cp.wins'),
      watch: t('cp.watch'),
      ask: t('cp.ask'),
      next: t('cp.next'),
    }),
    [audience, t],
  )

  const fullText = session ? buildText(session, lang, labels) : ''

  const compose = () => {
    const key = `${programId}.${audience}`
    const idx = variantRef.current[key] ?? 0
    variantRef.current[key] = idx + 1
    const draft = STATUS_TEXTS[programId][audience][idx % 2]
    setSession({ programId, audience, draft })
    setCopied(false)
    setRevealed(0)
    if (reduced) {
      setPhase('done')
    } else {
      setPhase('composing')
    }
  }

  // composing shimmer → streaming
  useEffect(() => {
    if (phase !== 'composing') return
    const timer = setTimeout(() => setPhase('streaming'), 750)
    return () => clearTimeout(timer)
  }, [phase])

  // typewriter
  useEffect(() => {
    if (phase !== 'streaming') return
    const id = setInterval(() => {
      setRevealed((r) => {
        if (r + CHARS_PER_TICK >= fullText.length) {
          clearInterval(id)
          setPhase('done')
          return fullText.length
        }
        return r + CHARS_PER_TICK
      })
    }, TICK_MS)
    return () => clearInterval(id)
  }, [phase, fullText.length])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(fullText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  const shownText = phase === 'done' ? fullText : fullText.slice(0, revealed)

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <h1 className="display-title text-3xl text-starlight sm:text-4xl">{t('cp.title')}</h1>
        <p className="mt-1 text-muted">{t('cp.subtitle')}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="mt-6 flex flex-wrap items-end gap-4"
      >
        <label className="flex flex-col gap-1">
          <span className="eyebrow">{t('common.program')}</span>
          <select
            className="rounded-md border border-[var(--hairline)] bg-deep px-3 py-2 text-sm text-starlight"
            value={programId}
            onChange={(e) => setProgramId(e.target.value as ProgramId)}
          >
            {PROGRAMS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.codename} — {pick(p.domain)}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-col gap-1">
          <span className="eyebrow">{t('cp.audience')}</span>
          <div className="flex rounded-md border border-[var(--hairline)] p-0.5" role="group" aria-label={t('cp.audience')}>
            {(['exec', 'team'] as const).map((a) => (
              <button
                key={a}
                type="button"
                aria-pressed={audience === a}
                onClick={() => setAudience(a)}
                className={`rounded px-3 py-1.5 text-sm transition-colors ${
                  audience === a ? 'bg-gold font-semibold text-ink' : 'text-muted hover:text-starlight'
                }`}
              >
                {a === 'exec' ? t('cp.exec') : t('cp.team')}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={compose}
          disabled={phase === 'composing' || phase === 'streaming'}
          className="rounded-md bg-gold px-5 py-2 text-sm font-semibold text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {phase === 'idle' || session === null ? t('cp.compose') : t('cp.again')}
        </button>
      </motion.div>

      {phase === 'composing' && (
        <div className="mt-8 flex items-center gap-3 text-muted" aria-live="polite">
          <span className="dot dot-amber" />
          <span className="animate-pulse">{t('cp.composing')}</span>
        </div>
      )}

      {session && (phase === 'streaming' || phase === 'done') && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          <div className="panel border-[rgba(232,184,75,0.25)] p-6 sm:p-8">
            <pre
              className={`whitespace-pre-wrap font-sans text-[14px] leading-relaxed text-starlight ${
                phase === 'streaming' ? 'caret' : ''
              }`}
            >
              {shownText}
            </pre>
          </div>
          <div className="mt-3 flex items-center gap-3">
            {phase === 'done' && (
              <button
                type="button"
                onClick={copy}
                className="rounded-md border border-[var(--hairline)] px-4 py-1.5 text-sm text-starlight transition-colors hover:border-[rgba(232,184,75,0.5)]"
              >
                {copied ? t('cp.copied') : t('cp.copy')}
              </button>
            )}
            <span className="text-xs text-muted">{t('cp.caption')}</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
