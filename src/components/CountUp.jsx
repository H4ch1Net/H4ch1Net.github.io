import { useEffect, useRef, useState } from 'react'
import useInView from '../lib/useInView'
import useReducedMotion from '../lib/useReducedMotion'

// Counts from 0 to `value` with an ease-out curve the first time it scrolls
// into view. Purely visual: pair it with an sr-only copy of the real value.
export default function CountUp({ value, duration = 1600, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, rootMargin: '0px 0px -10% 0px' })
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (reduced) {
      setShown(value)
      return
    }
    if (!inView) return
    let raf = 0
    let start = 0
    const tick = now => {
      if (!start) start = now
      const t = Math.min(1, (now - start) / duration)
      setShown(Math.round(value * (1 - Math.pow(1 - t, 4))))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduced, value, duration])

  return (
    <span ref={ref} className={className} aria-hidden="true">
      {shown}
    </span>
  )
}
