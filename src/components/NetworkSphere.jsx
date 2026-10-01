import { useEffect, useRef } from 'react'
import useInView from '../lib/useInView'
import useReducedMotion from '../lib/useReducedMotion'
import { PALETTE, hexToRgb } from '../lib/palette'
import './NetworkSphere.css'

// Hero visual: a slowly rotating sphere of network nodes. Nodes sit on a
// fibonacci lattice, each linked to its nearest neighbours to form a mesh;
// packets random-walk the mesh, a few hub nodes pulse, and a "health check"
// ring periodically sweeps pole to pole lighting up the nodes it passes.
// Drag to spin it (with inertia). Plain 2D canvas, hand-rolled projection.

const TAU = Math.PI * 2
const GOLDEN = Math.PI * (3 - Math.sqrt(5))
const EDGE_BUCKETS = 6

function mulberry32(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildGraph(count, k, rand) {
  const pts = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const y = 1 - ((i + 0.5) * 2) / count
    const r = Math.sqrt(1 - y * y)
    const th = i * GOLDEN
    let x = Math.cos(th) * r + (rand() - 0.5) * 0.06
    let yy = y + (rand() - 0.5) * 0.06
    let z = Math.sin(th) * r + (rand() - 0.5) * 0.06
    const len = Math.hypot(x, yy, z)
    pts[i * 3] = x / len
    pts[i * 3 + 1] = yy / len
    pts[i * 3 + 2] = z / len
  }

  const neighbours = Array.from({ length: count }, () => [])
  const seen = new Set()
  const edges = []
  const best = new Float32Array(k)
  const bestIdx = new Int32Array(k)
  for (let i = 0; i < count; i++) {
    best.fill(Infinity)
    bestIdx.fill(-1)
    for (let j = 0; j < count; j++) {
      if (j === i) continue
      const dx = pts[i * 3] - pts[j * 3]
      const dy = pts[i * 3 + 1] - pts[j * 3 + 1]
      const dz = pts[i * 3 + 2] - pts[j * 3 + 2]
      const d = dx * dx + dy * dy + dz * dz
      if (d >= best[k - 1]) continue
      let s = k - 1
      while (s > 0 && best[s - 1] > d) {
        best[s] = best[s - 1]
        bestIdx[s] = bestIdx[s - 1]
        s--
      }
      best[s] = d
      bestIdx[s] = j
    }
    for (let s = 0; s < k; s++) {
      const j = bestIdx[s]
      if (j < 0) continue
      const key = i < j ? i * count + j : j * count + i
      if (seen.has(key)) continue
      seen.add(key)
      edges.push(i, j)
      neighbours[i].push(j)
      neighbours[j].push(i)
    }
  }
  return { pts, edges: Int32Array.from(edges), neighbours }
}

// Pre-rendered soft glow sprite, so hubs don't need shadowBlur every frame.
function makeGlow(rgb) {
  const size = 64
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  grad.addColorStop(0, `rgba(${rgb}, 0.55)`)
  grad.addColorStop(0.35, `rgba(${rgb}, 0.18)`)
  grad.addColorStop(1, `rgba(${rgb}, 0)`)
  g.fillStyle = grad
  g.fillRect(0, 0, size, size)
  return c
}

const easeOutExpo = t => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t))

export default function NetworkSphere({ className = '', nodes = 520, packets = 30 }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const inView = useInView(wrapRef, { rootMargin: '120px' })
  const reduced = useReducedMotion()
  const stateRef = useRef(null)

  // Graph + simulation state survive pause/resume so the sphere doesn't reset.
  if (!stateRef.current) {
    const rand = mulberry32(7)
    const graph = buildGraph(nodes, 3, rand)
    const hubs = []
    for (let i = 0; i < 10; i++) hubs.push(Math.floor(((i + 0.5) / 10) * nodes + (rand() - 0.5) * 20) % nodes)
    const walkers = Array.from({ length: packets }, () => {
      const a = Math.floor(rand() * nodes)
      const nb = graph.neighbours[a]
      return { a, b: nb[Math.floor(rand() * nb.length)], prev: -1, t: rand(), speed: 0.35 + rand() * 0.55 }
    })
    stateRef.current = {
      graph,
      hubs,
      hubPhase: hubs.map(() => rand() * TAU),
      walkers,
      rand,
      yaw: -0.6,
      pitch: -0.32,
      yawVel: 0,
      pitchVel: 0,
      parallaxX: 0,
      parallaxY: 0,
      targetX: 0,
      targetY: 0,
      dragging: false,
      intro: 0,
      time: 0,
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')
    const S = stateRef.current
    const { pts, edges, neighbours } = S.graph
    const count = pts.length / 3
    const proj = new Float32Array(count * 3) // screen x, screen y, depth (-1..1)
    const accentRgb = hexToRgb(PALETTE.accent)
    const glow = makeGlow(accentRgb)
    const edgeBuckets = Array.from({ length: EDGE_BUCKETS }, () => [])
    let width = 0
    let height = 0
    let dpr = 1
    let raf = 0
    let last = 0

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (reduced || !inView) draw(0)
    }

    const view = { cy: 1, sy: 0, cp: 1, sp: 0, radius: 1, cx: 0, cyy: 0 }
    const out = new Float32Array(3)
    const CAMERA = 3.4

    // Model-space point -> screen x/y + view depth, written into `out`.
    const projectPoint = (x, y, z) => {
      const x1 = x * view.cy + z * view.sy
      const z1 = -x * view.sy + z * view.cy
      const y2 = y * view.cp - z1 * view.sp
      const z2 = y * view.sp + z1 * view.cp
      const s = (CAMERA / (CAMERA - z2)) * view.radius
      out[0] = view.cx + x1 * s
      out[1] = view.cyy - y2 * s
      out[2] = z2
    }

    const project = () => {
      const yaw = S.yaw + S.parallaxX
      const pitch = S.pitch + S.parallaxY
      view.cy = Math.cos(yaw)
      view.sy = Math.sin(yaw)
      view.cp = Math.cos(pitch)
      view.sp = Math.sin(pitch)
      view.radius = Math.min(width, height) * 0.39 * (0.72 + 0.28 * easeOutExpo(S.intro))
      view.cx = width / 2
      view.cyy = height / 2
      for (let i = 0; i < count; i++) {
        projectPoint(pts[i * 3], pts[i * 3 + 1], pts[i * 3 + 2])
        proj[i * 3] = out[0]
        proj[i * 3 + 1] = out[1]
        proj[i * 3 + 2] = out[2]
      }
      return view.radius
    }

    // Projected circle of latitude `lat` (model y) or a tilted orbit, drawn as
    // front/back polylines so the far side can be dimmer.
    const ringPath = (radius, yLevel, tilt, phase, front) => {
      const r = Math.sqrt(Math.max(0, radius * radius - yLevel * yLevel))
      const ct = Math.cos(tilt)
      const st = Math.sin(tilt)
      ctx.beginPath()
      let pen = false
      for (let s = 0; s <= 72; s++) {
        const t = (s / 72) * TAU + phase
        const x = Math.cos(t) * r
        const z = Math.sin(t) * r
        projectPoint(x, yLevel * ct - z * st, yLevel * st + z * ct)
        if (out[2] >= 0 !== front) {
          pen = false
          continue
        }
        if (pen) ctx.lineTo(out[0], out[1])
        else ctx.moveTo(out[0], out[1])
        pen = true
      }
    }

    const depthAlpha = z => {
      const t = (z + 1) / 2
      return 0.05 + 0.95 * t * t
    }

    function draw(dt) {
      ctx.clearRect(0, 0, width, height)
      const radius = project()
      const fade = easeOutExpo(S.intro)

      // Limb + faint body so the sphere reads as a solid object.
      const cx = width / 2
      const cy = height / 2
      const body = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.35, radius * 0.1, cx, cy, radius * 1.05)
      body.addColorStop(0, `rgba(${accentRgb}, ${0.07 * fade})`)
      body.addColorStop(0.7, `rgba(${accentRgb}, ${0.02 * fade})`)
      body.addColorStop(1, `rgba(${accentRgb}, 0)`)
      ctx.fillStyle = body
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 1.05, 0, TAU)
      ctx.fill()

      // Edges, bucketed by depth so each alpha level is one stroke call.
      for (let b = 0; b < EDGE_BUCKETS; b++) edgeBuckets[b].length = 0
      for (let e = 0; e < edges.length; e += 2) {
        const za = proj[edges[e] * 3 + 2]
        const zb = proj[edges[e + 1] * 3 + 2]
        const z = Math.min(za, zb)
        const bucket = Math.min(EDGE_BUCKETS - 1, Math.max(0, Math.floor(((z + 1) / 2) * EDGE_BUCKETS)))
        edgeBuckets[bucket].push(e)
      }
      ctx.lineWidth = 1
      for (let b = 0; b < EDGE_BUCKETS; b++) {
        const list = edgeBuckets[b]
        if (!list.length) continue
        const z = ((b + 0.5) / EDGE_BUCKETS) * 2 - 1
        ctx.strokeStyle = `rgba(${accentRgb}, ${depthAlpha(z) * 0.32 * fade})`
        ctx.beginPath()
        for (const e of list) {
          const a = edges[e] * 3
          const c = edges[e + 1] * 3
          ctx.moveTo(proj[a], proj[a + 1])
          ctx.lineTo(proj[c], proj[c + 1])
        }
        ctx.stroke()
      }

      // Nodes, also bucketed by depth.
      for (let b = 0; b < EDGE_BUCKETS; b++) {
        const zLo = (b / EDGE_BUCKETS) * 2 - 1
        const zHi = ((b + 1) / EDGE_BUCKETS) * 2 - 1
        const zMid = (zLo + zHi) / 2
        const r = (0.6 + 1.0 * ((zMid + 1) / 2)) * (0.6 + 0.4 * fade)
        ctx.fillStyle = `rgba(${accentRgb}, ${Math.min(1, depthAlpha(zMid) * 1.1) * fade})`
        ctx.beginPath()
        for (let i = 0; i < count; i++) {
          const z = proj[i * 3 + 2]
          if (z < zLo || z >= zHi) continue
          ctx.moveTo(proj[i * 3] + r, proj[i * 3 + 1])
          ctx.arc(proj[i * 3], proj[i * 3 + 1], r, 0, TAU)
        }
        ctx.fill()
      }

      // Hubs: glow sprite, solid core, periodic sonar ring.
      for (let h = 0; h < S.hubs.length; h++) {
        const i = S.hubs[h]
        const z = proj[i * 3 + 2]
        if (z < -0.35) continue
        const x = proj[i * 3]
        const y = proj[i * 3 + 1]
        const a = depthAlpha(z) * fade
        const g = 26 + 10 * ((z + 1) / 2)
        ctx.globalAlpha = a
        ctx.drawImage(glow, x - g / 2, y - g / 2, g, g)
        ctx.globalAlpha = 1
        ctx.fillStyle = `rgba(234, 255, 246, ${a})`
        ctx.beginPath()
        ctx.arc(x, y, 1.6 + 1.2 * ((z + 1) / 2), 0, TAU)
        ctx.fill()
        const phase = (((S.time * 0.45 + S.hubPhase[h] / TAU) % 1) + 1) % 1
        ctx.strokeStyle = `rgba(${accentRgb}, ${(1 - phase) * 0.55 * a})`
        ctx.beginPath()
        ctx.arc(x, y, 3 + phase * 16, 0, TAU)
        ctx.stroke()
      }

      // Health-check sweep: a latitude ring travels pole to pole every few
      // seconds and briefly lights up the nodes it crosses.
      const cycle = 7.5
      const sweep = (S.time % cycle) / 2.6
      if (sweep <= 1 && fade > 0.5) {
        const level = 1.05 - sweep * 2.1
        const ringAlpha = Math.sin(Math.min(1, sweep) * Math.PI)
        ctx.lineWidth = 1.25
        ctx.strokeStyle = `rgba(${accentRgb}, ${0.5 * ringAlpha})`
        ringPath(1.0, Math.max(-0.999, Math.min(0.999, level)), 0, 0, true)
        ctx.stroke()
        ctx.strokeStyle = `rgba(${accentRgb}, ${0.1 * ringAlpha})`
        ringPath(1.0, Math.max(-0.999, Math.min(0.999, level)), 0, 0, false)
        ctx.stroke()
        ctx.lineWidth = 1
        ctx.fillStyle = `rgba(234, 255, 246, ${0.9 * ringAlpha})`
        ctx.beginPath()
        for (let i = 0; i < count; i++) {
          const d = Math.abs(pts[i * 3 + 1] - level)
          if (d > 0.06 || proj[i * 3 + 2] < -0.1) continue
          const r = 1.9 * (1 - d / 0.06) + 0.4
          ctx.moveTo(proj[i * 3] + r, proj[i * 3 + 1])
          ctx.arc(proj[i * 3], proj[i * 3 + 1], r, 0, TAU)
        }
        ctx.fill()
      }

      // A tilted orbit ring with two satellites riding it.
      const orbitTilt = 0.42
      const orbitR = 1.24
      ctx.strokeStyle = `rgba(${accentRgb}, ${0.05 * fade})`
      ringPath(orbitR, 0, orbitTilt, 0, false)
      ctx.stroke()
      ctx.strokeStyle = `rgba(${accentRgb}, ${0.16 * fade})`
      ringPath(orbitR, 0, orbitTilt, 0, true)
      ctx.stroke()
      for (let k = 0; k < 2; k++) {
        const t = S.time * 0.22 + k * Math.PI
        const x = Math.cos(t) * orbitR
        const z = Math.sin(t) * orbitR
        projectPoint(x, -z * Math.sin(orbitTilt), z * Math.cos(orbitTilt))
        const behind = out[2] < 0 && Math.hypot(out[0] - view.cx, out[1] - view.cyy) < view.radius
        if (behind) continue
        ctx.globalAlpha = fade
        ctx.drawImage(glow, out[0] - 9, out[1] - 9, 18, 18)
        ctx.globalAlpha = 1
        ctx.fillStyle = `rgba(234, 255, 246, ${fade})`
        ctx.beginPath()
        ctx.arc(out[0], out[1], 1.8, 0, TAU)
        ctx.fill()
      }

      // Packets random-walk the mesh, leaving a short tail.
      for (const w of S.walkers) {
        if (dt > 0) {
          w.t += dt * w.speed
          while (w.t >= 1) {
            w.t -= 1
            const options = neighbours[w.b]
            let next = options[Math.floor(S.rand() * options.length)]
            if (next === w.a && options.length > 1) next = options[(options.indexOf(next) + 1) % options.length]
            w.prev = w.a
            w.a = w.b
            w.b = next
          }
        }
        const a = w.a * 3
        const b = w.b * 3
        const z = proj[a + 2] + (proj[b + 2] - proj[a + 2]) * w.t
        if (z < -0.15) continue
        const alpha = depthAlpha(z) * fade
        if (z > 0.2) {
          const hx = proj[a] + (proj[b] - proj[a]) * w.t
          const hy = proj[a + 1] + (proj[b + 1] - proj[a + 1]) * w.t
          ctx.globalAlpha = alpha * 0.8
          ctx.drawImage(glow, hx - 7, hy - 7, 14, 14)
          ctx.globalAlpha = 1
        }
        for (let s = 3; s >= 0; s--) {
          const t = w.t - s * 0.07
          if (t < 0) continue
          const x = proj[a] + (proj[b] - proj[a]) * t
          const y = proj[a + 1] + (proj[b + 1] - proj[a + 1]) * t
          ctx.fillStyle = s === 0 ? `rgba(234, 255, 246, ${alpha})` : `rgba(${accentRgb}, ${alpha * (0.5 - s * 0.12)})`
          ctx.beginPath()
          ctx.arc(x, y, s === 0 ? 1.7 : 1.3, 0, TAU)
          ctx.fill()
        }
      }
    }

    const tick = now => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 0)
      last = now
      S.time += dt
      if (S.intro < 1) S.intro = Math.min(1, S.intro + dt / 1.8)

      if (!S.dragging) {
        // Ease the spin back toward a slow idle rotation after a fling.
        const idle = 0.075
        S.yawVel += (idle - S.yawVel) * Math.min(1, dt * 1.6)
        S.pitchVel += (0 - S.pitchVel) * Math.min(1, dt * 3)
        S.yaw += S.yawVel * dt
        S.pitch = Math.max(-1.1, Math.min(1.1, S.pitch + S.pitchVel * dt))
        S.pitch += (-0.32 - S.pitch) * Math.min(1, dt * 0.4)
      }
      S.parallaxX += (S.targetX - S.parallaxX) * Math.min(1, dt * 3)
      S.parallaxY += (S.targetY - S.parallaxY) * Math.min(1, dt * 3)
      draw(dt)
    }

    // Pointer interaction: drag to spin, gentle parallax from the cursor.
    let lastX = 0
    let lastY = 0
    let lastT = 0
    const onDown = e => {
      if (e.pointerType === 'touch') return
      S.dragging = true
      lastX = e.clientX
      lastY = e.clientY
      lastT = performance.now()
      canvas.setPointerCapture(e.pointerId)
      wrap.classList.add('network-sphere--grabbing')
    }
    const onMove = e => {
      if (S.dragging) {
        const now = performance.now()
        const dts = Math.max(0.008, (now - lastT) / 1000)
        const dx = e.clientX - lastX
        const dy = e.clientY - lastY
        const radius = Math.min(width, height) * 0.39
        S.yaw += dx / radius
        S.pitch = Math.max(-1.1, Math.min(1.1, S.pitch + dy / radius))
        S.yawVel = dx / radius / dts
        S.pitchVel = dy / radius / dts
        lastX = e.clientX
        lastY = e.clientY
        lastT = now
        if (reduced) draw(0)
        return
      }
      const rect = wrap.getBoundingClientRect()
      S.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.25
      S.targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.18
    }
    const onUp = e => {
      if (!S.dragging) return
      S.dragging = false
      wrap.classList.remove('network-sphere--grabbing')
      if (canvas.hasPointerCapture?.(e.pointerId)) canvas.releasePointerCapture(e.pointerId)
      const cap = 2.4
      S.yawVel = Math.max(-cap, Math.min(cap, S.yawVel))
      S.pitchVel = Math.max(-cap, Math.min(cap, S.pitchVel))
    }

    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    resize()
    canvas.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)

    if (reduced) {
      S.intro = 1
      draw(0)
    } else if (inView) {
      raf = requestAnimationFrame(tick)
    } else {
      draw(0)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [inView, reduced])

  return (
    <div ref={wrapRef} className={`network-sphere ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="network-sphere__canvas" />
    </div>
  )
}
