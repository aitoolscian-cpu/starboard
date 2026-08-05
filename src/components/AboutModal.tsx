import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '../i18n'

const LINKS = {
  linkedin: 'https://www.linkedin.com/in/cianodonovan1/',
  github: 'https://github.com/aitoolscian-cpu',
  repo: 'https://github.com/aitoolscian-cpu/starboard',
}

export function AboutModal({ onClose }: { onClose: () => void }) {
  const { t } = useI18n()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const why: [string, string][] = [
    [t('ab.why1a'), t('ab.why1b')],
    [t('ab.why2a'), t('ab.why2b')],
    [t('ab.why3a'), t('ab.why3b')],
    [t('ab.why4a'), t('ab.why4b')],
    [t('ab.why5a'), t('ab.why5b')],
  ]

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="panel max-h-[86vh] w-full max-w-2xl overflow-y-auto p-6 sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-label={t('ab.title')}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="display-title text-2xl text-gold sm:text-3xl">{t('ab.title')}</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t('common.close')}
            className="rounded-md border border-[var(--hairline)] px-2.5 py-1 text-sm text-muted transition-colors hover:text-starlight"
          >
            ✕
          </button>
        </div>

        <section className="mt-5">
          <h3 className="eyebrow mb-1.5">{t('ab.builtByTitle')}</h3>
          <p className="text-sm leading-relaxed text-starlight">{t('ab.builtBy')}</p>
          <p className="mt-1.5 flex flex-wrap gap-x-4 text-sm">
            <a
              className="text-gold underline decoration-[rgba(232,184,75,0.4)] underline-offset-2 hover:decoration-gold"
              href={LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="text-gold underline decoration-[rgba(232,184,75,0.4)] underline-offset-2 hover:decoration-gold"
              href={LINKS.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="text-gold underline decoration-[rgba(232,184,75,0.4)] underline-offset-2 hover:decoration-gold"
              href={LINKS.repo}
              target="_blank"
              rel="noreferrer"
            >
              {t('nav.about')} · repo
            </a>
          </p>
        </section>

        <section className="mt-5">
          <h3 className="eyebrow mb-1.5">{t('ab.whatTitle')}</h3>
          <p className="text-sm leading-relaxed text-starlight/90">{t('ab.what')}</p>
        </section>

        <section className="mt-5">
          <h3 className="eyebrow mb-2">{t('ab.whyTitle')}</h3>
          <table className="w-full border-collapse text-sm">
            <tbody>
              {why.map(([role, place]) => (
                <tr key={role} className="border-t border-[var(--hairline)]">
                  <td className="py-2 pr-4 align-top text-starlight/90">{role}</td>
                  <td className="py-2 align-top text-muted">{place}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-5">
          <h3 className="eyebrow mb-1.5">{t('ab.honestyTitle')}</h3>
          <ul className="flex list-disc flex-col gap-1 pl-5 text-sm leading-relaxed text-starlight/90">
            <li>{t('ab.honesty1')}</li>
            <li>{t('ab.honesty2')}</li>
          </ul>
        </section>

        <p className="mt-6 border-t border-[var(--hairline)] pt-4 text-xs italic leading-relaxed text-muted">
          {t('ab.disclaimer')}
        </p>
      </motion.div>
    </div>
  )
}
