import { useEffect, useState } from 'react'

// True while the referenced element intersects the viewport (grown by
// rootMargin). With `once`, it latches true after the first intersection.
// Animated components use this to stop their loops when scrolled away.
export default function useInView(ref, { rootMargin = '0px', threshold = 0, once = false } = {}) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (once) {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
          return
        }
        setInView(entry.isIntersecting)
      },
      { rootMargin, threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, rootMargin, threshold, once])

  return inView
}
