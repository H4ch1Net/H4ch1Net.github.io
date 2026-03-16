import { useState, useEffect, useRef } from 'react'

const NAMES = ['Mauro', 'H4ch1']
const CHARS = '!@#$%^&*<>?/|{}[]'
const HOLD_MS = 3000
const SCRAMBLE_MS = 600
const FRAME_MS = 40

const ScrambleText = () => {
  const [displayName, setDisplayName] = useState(NAMES[0])
  const [scrambling, setScrambling] = useState(false)
  const nameIndexRef = useRef(0)
  const scramblingRef = useRef(false)
  const timerRef = useRef(null)
  const frameRef = useRef(null)

  const clearAll = () => {
    clearTimeout(timerRef.current)
    clearInterval(frameRef.current)
  }

  const doScramble = (targetName, onDone) => {
    scramblingRef.current = true
    setScrambling(true)
    let elapsed = 0
    const len = targetName.length
    clearInterval(frameRef.current)
    frameRef.current = setInterval(() => {
      elapsed += FRAME_MS
      if (elapsed >= SCRAMBLE_MS) {
        clearInterval(frameRef.current)
        setDisplayName(targetName)
        scramblingRef.current = false
        setScrambling(false)
        onDone()
      } else {
        setDisplayName(
          Array.from({ length: len }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('')
        )
      }
    }, FRAME_MS)
  }

  const scheduleNext = (currentIndex) => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const next = (currentIndex + 1) % NAMES.length
      doScramble(NAMES[next], () => {
        nameIndexRef.current = next
        scheduleNext(next)
      })
    }, HOLD_MS)
  }

  useEffect(() => {
    scheduleNext(0)
    return clearAll
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleHover = () => {
    if (scramblingRef.current) return
    clearAll()
    const next = (nameIndexRef.current + 1) % NAMES.length
    doScramble(NAMES[next], () => {
      nameIndexRef.current = next
      scheduleNext(next)
    })
  }

  return (
    <h2 className="hero-scramble-text" onMouseEnter={handleHover}>
      <span className="scramble-static">Hi, I&apos;m </span>
      <span className={scrambling ? 'scramble-name scramble-active' : 'scramble-name'}>
        {displayName}
      </span>
    </h2>
  )
}

export default ScrambleText
