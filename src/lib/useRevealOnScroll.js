import { useEffect } from 'react'

// Marks every [data-reveal] element with [data-visible] the first time it
// scrolls into view; App.css owns the actual transition. Using a data
// attribute React never renders means re-renders can't strip it.
export default function useRevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (typeof IntersectionObserver === 'undefined') {
      els.forEach(el => el.setAttribute('data-visible', ''))
      return
    }
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-visible', '')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
