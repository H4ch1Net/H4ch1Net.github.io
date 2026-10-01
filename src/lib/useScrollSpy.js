import { useEffect, useState } from 'react'

// Returns the id of the section currently crossing the middle band of the
// viewport, for highlighting the matching nav link.
export default function useScrollSpy(ids) {
  const [active, setActive] = useState(null)
  const key = ids.join('|')

  useEffect(() => {
    const sectionIds = key.split('|')
    const els = sectionIds.map(id => document.getElementById(id)).filter(Boolean)
    if (!els.length || typeof IntersectionObserver === 'undefined') return
    const visible = new Set()
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        setActive(sectionIds.find(id => visible.has(id)) ?? null)
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [key])

  return active
}
