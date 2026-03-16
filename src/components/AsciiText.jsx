import { useEffect, useRef } from 'react'
import './AsciiText.css'

const CHARS = ' .,:-=+*#@'

export default function AsciiText({ text = 'Hello', color = '#00e38c', fontSize = 8 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const pre = document.createElement('pre')
    pre.className = 'ascii-pre'
    pre.style.fontSize = `${fontSize}px`
    pre.style.lineHeight = `${(fontSize * 1.1).toFixed(1)}px`
    pre.style.color = color
    container.appendChild(pre)

    const src = document.createElement('canvas')
    const srcCtx = src.getContext('2d')
    const smp = document.createElement('canvas')
    const smpCtx = smp.getContext('2d')
    smpCtx.imageSmoothingEnabled = false

    let rafId
    const start = performance.now()

    const tick = (now) => {
      const t = (now - start) / 1000
      const W = container.clientWidth
      const H = container.clientHeight
      if (!W || !H) { rafId = requestAnimationFrame(tick); return }

      // Render text at large size onto source canvas
      const srcH = 100
      const font = `700 ${srcH - 10}px monospace`
      srcCtx.font = font
      const srcW = Math.ceil(srcCtx.measureText(text).width) + 20
      src.width = srcW
      src.height = srcH
      srcCtx.clearRect(0, 0, srcW, srcH)
      srcCtx.fillStyle = '#fff'
      srcCtx.font = font
      srcCtx.fillText(text, 10, srcH - 10)

      // ASCII grid dimensions
      const charW = fontSize * 0.55
      const charH = fontSize * 1.1
      const cols = Math.floor(W / charW)
      const rows = Math.floor(H / charH)
      if (cols < 1 || rows < 1) { rafId = requestAnimationFrame(tick); return }

      // Fit source text into the grid, centered
      smp.width = cols
      smp.height = rows
      const scale = Math.min(cols / srcW, rows / srcH)
      const dw = Math.round(srcW * scale)
      const dh = Math.round(srcH * scale)
      const dx = Math.round((cols - dw) / 2)
      const dy = Math.round((rows - dh) / 2)
      smpCtx.clearRect(0, 0, cols, rows)
      smpCtx.drawImage(src, dx, dy, dw, dh)

      const px = smpCtx.getImageData(0, 0, cols, rows).data
      let out = ''

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (x + y * cols) * 4
          const alpha = px[i + 3] / 255
          if (alpha < 0.08) { out += ' '; continue }
          let lum = (0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]) / 255
          lum = Math.max(0, Math.min(1, lum + Math.sin(t * 2 + x * 0.2 + y * 0.4) * 0.1))
          out += CHARS[Math.floor(lum * (CHARS.length - 1))]
        }
        out += '\n'
      }

      pre.textContent = out
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      if (pre.parentNode === container) container.removeChild(pre)
    }
  }, [text, color, fontSize])

  return <div ref={containerRef} className="ascii-text-container" />
}
