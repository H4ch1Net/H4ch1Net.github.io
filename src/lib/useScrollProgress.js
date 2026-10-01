import { useEffect } from 'react'

// Writes a 0..1 `--progress` custom property onto the referenced element as it
// travels through the viewport: 0 when its top crosses `start` (fraction of
// viewport height), 1 when its bottom crosses `end`. CSS does the drawing.
export default function useScrollProgress(ref, { start = 0.8, end = 0.45 } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height + (start - end) * vh
      const p = Math.min(1, Math.max(0, (start * vh - rect.top) / total))
      el.style.setProperty('--progress', p.toFixed(4))
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ref, start, end])
}
