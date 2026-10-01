import { useEffect, useState } from 'react'

// Re-renders every `intervalMs` with the current Date while `enabled`.
export default function useClock(intervalMs = 1000, enabled = true) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    if (!enabled) return
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs, enabled])

  return now
}
