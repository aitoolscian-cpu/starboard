import { Suspense, lazy, useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { I18nProvider, useI18n } from './i18n'
import type { Nav } from './lib/nav'
import { Header } from './components/Header'
import { Starfield } from './components/Starfield'
import { Intro } from './components/Intro'
import { AboutModal } from './components/AboutModal'
import { SkyView } from './views/SkyView'
import { ProgramsListView } from './views/ProgramsListView'

const ProgramView = lazy(() => import('./views/ProgramView'))
const ComposerView = lazy(() => import('./views/ComposerView'))
const SteeringView = lazy(() => import('./views/SteeringView'))

const INTRO_KEY = 'starboard.intro.v1'

function introSeen(): boolean {
  try {
    return sessionStorage.getItem(INTRO_KEY) === '1'
  } catch {
    return true
  }
}

function Shell() {
  const { t } = useI18n()
  const [nav, setNav] = useState<Nav>({ view: 'sky' })
  const [aboutOpen, setAboutOpen] = useState(false)
  const [magic, setMagic] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [showIntro, setShowIntro] = useState(() => !introSeen())
  const logoClicks = useRef(0)
  const toastTimer = useRef<ReturnType<typeof setTimeout>>()

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2600)
  }, [])

  const onLogoClick = useCallback(() => {
    logoClicks.current += 1
    if (logoClicks.current >= 5) {
      logoClicks.current = 0
      setMagic((m) => {
        showToast(t(m ? 'egg.magicOff' : 'egg.magicOn'))
        return !m
      })
    } else {
      setNav({ view: 'sky' })
    }
  }, [showToast, t])

  const finishIntro = useCallback(() => {
    setShowIntro(false)
    try {
      sessionStorage.setItem(INTRO_KEY, '1')
    } catch {
      /* fine */
    }
  }, [])

  return (
    <div className="vignette relative min-h-screen">
      <Starfield magic={magic} />
      {magic && <div className="aurora-horizon no-print z-0" aria-hidden="true" />}

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header
          nav={nav}
          onNavigate={setNav}
          onLogoClick={onLogoClick}
          onAbout={() => setAboutOpen(true)}
        />
        <main className="flex-1">
          <Suspense
            fallback={
              <div className="flex h-[60vh] items-center justify-center text-muted" aria-busy="true">
                <span className="dot dot-amber" />
              </div>
            }
          >
            {nav.view === 'sky' && <SkyView onOpenProgram={(id) => setNav({ view: 'program', programId: id })} />}
            {nav.view === 'programs' && (
              <ProgramsListView onOpenProgram={(id) => setNav({ view: 'program', programId: id })} />
            )}
            {nav.view === 'program' && nav.programId && (
              <ProgramView
                programId={nav.programId}
                onBack={() => setNav({ view: 'sky' })}
                onOpenProgram={(id) => setNav({ view: 'program', programId: id })}
              />
            )}
            {nav.view === 'composer' && <ComposerView />}
            {nav.view === 'steering' && <SteeringView />}
          </Suspense>
        </main>
      </div>

      {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="panel fixed bottom-6 left-1/2 z-50 -translate-x-1/2 px-4 py-2 text-sm text-gold"
            role="status"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {showIntro && <Intro onDone={finishIntro} />}
    </div>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <Shell />
    </I18nProvider>
  )
}
