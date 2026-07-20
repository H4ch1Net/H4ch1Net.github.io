import { useEffect, useRef } from 'react'
import './NetworkParticles.css'

// Lightweight 2D-canvas "constellation" for the hero. Drifting nodes with
// links drawn between nearby pairs (and toward the cursor) read as a network
// graph rather than ambient sparkle. Plain canvas, no dependencies. Reduced-
// motion users never reach this: LazyDecoration declines to mount it.
function hexToRgb(hex) {
  hex = hex.replace(/^#/, '')
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('')
  const int = parseInt(hex, 16)
  return `${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}`
}

const NetworkParticles = ({
  color = '#00e38c',
  linkDistance = 150,
  speed = 0.25,
  maxNodes = 90,
  className = '',
}) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rgb = hexToRgb(color)
    const linkSq = linkDistance * linkDistance
    const mouseLinkSq = linkSq * 1.6
    const mouse = { x: -9999, y: -9999, active: false }
    let width = 0
    let height = 0
    let nodes = []

    const buildNodes = () => {
      const target = Math.max(18, Math.min(maxNodes, Math.floor((width * height) / 9000)))
      nodes = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
      }))
    }

    const resize = () => {
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildNodes()
    }
    resize()

    const onResize = () => resize()
    const onMove = e => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = mouse.x >= 0 && mouse.x <= width && mouse.y >= 0 && mouse.y <= height
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMove)

    let raf
    const draw = () => {
      raf = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, width, height)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x <= 0 || n.x >= width) { n.vx *= -1; n.x = Math.max(0, Math.min(width, n.x)) }
        if (n.y <= 0 || n.y >= height) { n.vy *= -1; n.y = Math.max(0, Math.min(height, n.y)) }
      }

      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < linkSq) {
            ctx.strokeStyle = `rgba(${rgb}, ${(1 - d2 / linkSq) * 0.45})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      if (mouse.active) {
        for (const n of nodes) {
          const dx = n.x - mouse.x
          const dy = n.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < mouseLinkSq) {
            ctx.strokeStyle = `rgba(${rgb}, ${(1 - d2 / mouseLinkSq) * 0.6})`
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
      }

      ctx.fillStyle = `rgba(${rgb}, 0.85)`
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [color, linkDistance, speed, maxNodes])

  return <canvas ref={canvasRef} className={`network-particles-canvas ${className}`} aria-hidden="true" />
}

export default NetworkParticles
