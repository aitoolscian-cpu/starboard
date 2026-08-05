import { useEffect, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useI18n } from '../i18n'

/** The Southern Cross, centered in a 400×300 field. */
const CRUX = [
  { x: 208, y: 62, r: 3.6 },
  { x: 184, y: 214, r: 3.2 },
  { x: 122, y: 142, r: 2.7 },
  { x: 278, y: 108, r: 2.7 },
  { x: 234, y: 152, r: 1.9 },
]

interface IntroStar {
  x: number
  y: number
  r: number
  x0: number
  y0: number
  bright: boolean
}

/** ≤4s cinematic intro: stars drift and snap into the Southern Cross, wordmark resolves. Skippable instantly. */
export function Intro({ onDone }: { onDone: () => void }) {
  const { t } = useI18n()
  const reduced = useReducedMotion()

  const stars = useMemo<IntroStar[]>(() => {
    const minor = Array.from({ length: 25 }, () => ({
      x: 20 + Math.random() * 360,
      y: 16 + Math.random() * 268,
      r: 0.7 + Math.random() * 1.0,
      x0: 200 + (Math.random() - 0.5) * 520,
      y0: 150 + (Math.random() - 0.5) * 420,
      bright: false,
    }))
    const crux = CRUX.map((c) => ({
      ...c,
      x0: c.x + (Math.random() - 0.5) * 260,
      y0: c.y + (Math.random() - 0.5) * 200,
      bright: true,
    }))
    return [...minor, ...crux]
  }, [])

  useEffect(() => {
    const timer = setTimeout(onDone, reduced ? 1800 : 4000)
    const onKey = () => onDone()
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
    }
  }, [onDone, reduced])

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex cursor-pointer flex-col items-center justify-center bg-black"
      onClick={onDone}
      initial={{ opacity: 1 }}
      animate={{ backgroundColor: '#0A0E1E' }}
      transition={{ duration: 1.0 }}
      role="presentation"
    >
      <svg viewBox="0 0 400 300" className="w-full max-w-md px-8" aria-hidden="true">
        {stars.map((s, i) => (
          <motion.circle
            key={i}
            r={s.r}
            fill={s.bright ? '#E8B84B' : '#DCE0F5'}
            initial={
              reduced
                ? { cx: s.x, cy: s.y, opacity: 0 }
                : { cx: s.x0, cy: s.y0, opacity: 0 }
            }
            animate={{ cx: s.x, cy: s.y, opacity: s.bright ? 1 : 0.55 }}
            transition={
              reduced
                ? { duration: 0.8 }
                : {
                    cx: { duration: 1.5, delay: 0.15 + (i % 7) * 0.06, ease: [0.22, 0.8, 0.3, 1] },
                    cy: { duration: 1.5, delay: 0.15 + (i % 7) * 0.06, ease: [0.22, 0.8, 0.3, 1] },
                    opacity: { duration: 0.9, delay: 0.15 + (i % 7) * 0.06 },
                  }
            }
          />
        ))}
      </svg>

      <motion.div
        className="wordmark text-3xl sm:text-4xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: reduced ? 0.2 : 1.7 }}
      >
        STARBOARD
      </motion.div>

      <motion.p
        className="display-title mt-3 px-6 text-center text-lg text-starlight/90 sm:text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: reduced ? 0.4 : 2.3 }}
      >
        {t('intro.tagline')}
      </motion.p>

      <button
        type="button"
        onClick={onDone}
        className="absolute bottom-6 right-6 text-xs text-muted transition-colors hover:text-starlight"
      >
        {t('shell.skipIntro')} →
      </button>
    </motion.div>
  )
}
