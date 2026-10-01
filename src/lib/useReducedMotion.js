import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

// Tracks the OS-level reduced-motion preference. Animated components render a
// single static frame instead of running their loops when this is true.
export default function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && Boolean(window.matchMedia?.(QUERY).matches)
  )

  useEffect(() => {
    const mq = window.matchMedia?.(QUERY)
    if (!mq) return
    const onChange = () => setReduced(mq.matches)
    onChange()
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  return reduced
}
