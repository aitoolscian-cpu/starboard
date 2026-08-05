import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

interface Star {
  x: number
  y: number
  r: number
  /** depth 0..1 — used for parallax strength */
  z: number
  phase: number
  speed: number
  baseA: number
  color: string
}

const COLORS = ['#F7F4EC', '#F7F4EC', '#F7F4EC', '#DCE0F5', '#DCE0F5', '#E8B84B']

function makeStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: 0.3 + Math.random() * 1.1,
    z: 0.25 + Math.random() * 0.75,
    phase: Math.random() * Math.PI * 2,
    speed: 0.4 + Math.random() * 0.9,
    baseA: 0.25 + Math.random() * 0.55,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }))
}

interface Shot {
  t0: number
  x0: number
  y0: number
  dx: number
  dy: number
}

/**
 * Ambient starfield: ~140 stars, sine twinkle, slight mouse parallax,
 * a shooting star every 45–90s. Reduced motion → one static draw.
 */
export function Starfield({ magic }: { magic: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const stars = makeStars(magic ? 196 : 140)
    const mouse = { x: 0, y: 0 }
    let raf = 0
    let shot: Shot | null = null
    let nextShotAt = performance.now() + 45_000 + Math.random() * 45_000
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
    }
    resize()

    const draw = (t: number) => {
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        const alpha = reduced
          ? s.baseA
          : Math.max(0.06, s.baseA + 0.35 * Math.sin((t / 1000) * s.speed + s.phase))
        const px = s.x * w + mouse.x * s.z * 14 * dpr
        const py = s.y * h + mouse.y * s.z * 9 * dpr
        ctx.globalAlpha = alpha
        ctx.fillStyle = s.color
        ctx.beginPath()
        ctx.arc(px, py, s.r * dpr, 0, Math.PI * 2)
        ctx.fill()
      }
      // shooting star
      if (!reduced) {
        if (!shot && t > nextShotAt) {
          shot = {
            t0: t,
            x0: (0.1 + Math.random() * 0.5) * w,
            y0: (0.05 + Math.random() * 0.3) * h,
            dx: (0.18 + Math.random() * 0.1) * w,
            dy: (0.1 + Math.random() * 0.08) * h,
          }
          nextShotAt = t + 45_000 + Math.random() * 45_000
        }
        if (shot) {
          const p = (t - shot.t0) / 900
          if (p >= 1) {
            shot = null
          } else {
            const hx = shot.x0 + shot.dx * p
            const hy = shot.y0 + shot.dy * p
            const tail = Math.min(p, 0.25)
            const tx = shot.x0 + shot.dx * (p - tail)
            const ty = shot.y0 + shot.dy * (p - tail)
            const grad = ctx.createLinearGradient(tx, ty, hx, hy)
            grad.addColorStop(0, 'rgba(247,244,236,0)')
            grad.addColorStop(1, `rgba(247,244,236,${0.8 * (1 - p)})`)
            ctx.globalAlpha = 1
            ctx.strokeStyle = grad
            ctx.lineWidth = 1.4 * dpr
            ctx.beginPath()
            ctx.moveTo(tx, ty)
            ctx.lineTo(hx, hy)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
    }

    if (reduced) {
      draw(0)
      const onResize = () => {
        resize()
        draw(0)
      }
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }

    const loop = (t: number) => {
      draw(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5
      mouse.y = e.clientY / window.innerHeight - 0.5
    }
    const onResize = () => resize()
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
    }
  }, [magic, reduced])

  return (
    <canvas
      ref={ref}
      className="no-print pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  )
}
