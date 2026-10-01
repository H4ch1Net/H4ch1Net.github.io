import { useEffect, useRef } from 'react'
import useInView from '../../lib/useInView'
import useReducedMotion from '../../lib/useReducedMotion'
import { PALETTE, rgba } from '../../lib/palette'
import { isLand } from './landmask'
import './previews.css'
import './ArgusPreview.css'

// Argus preview: an orthographic dotted-land globe that spins slowly while
// correlation arcs fly between monitored sites and a satellite tracks an
// inclined orbit. The feed column counts events and per-feed budget use.

const DEG = Math.PI / 180
const TAU = Math.PI * 2

const SPIN = 6 * DEG
const TILT = 20 * DEG
const START_LON = -38
const STATIC_LON = -58
const DOT_STEP = 2.2
const BUCKETS = 8

const ARC_SEGS = 64
const MAX_ARCS = 6
const TRAVEL = 1.6
const FADE = 1
const TAIL = 0.24
const DRAIN = 0.35
const PULSE = 1.2

const SAT_R = 1.22
const SAT_INC = 50 * DEG
const SAT_NODE = 35 * DEG
const SAT_RATE = TAU / 15
const SAT_TRAIL = 32 * DEG
const SAT_TRAIL_N = 18
const SAT_STATIC = 1.1
const ORBIT_N = 120
const DASH = [2, 5]
const NO_DASH = []

const TONES = [PALETTE.accent, PALETTE.info, PALETTE.warn]
const TONE_CLASS = ['', ' pv-argus__row--info', ' pv-argus__row--warn']

const FEEDS = [
  { name: 'FLIGHT', tone: 0, count: 12408, budget: 0.46 },
  { name: 'AIS', tone: 0, count: 8931, budget: 0.38 },
  { name: 'TLE', tone: 1, count: 3207, budget: 0.24 },
  { name: 'SEISMIC', tone: 2, count: 142, budget: 0.12 },
  { name: 'FIRE', tone: 2, count: 386, budget: 0.18 },
  { name: 'BGP', tone: 0, count: 5611, budget: 0.31 },
  { name: 'CT', tone: 0, count: 21774, budget: 0.58 },
  { name: 'SHODAN', tone: 0, count: 1093, budget: 0.27 },
]

// [lat, lon]
const SITES = [
  [34.05, -118.24], // Los Angeles
  [40.71, -74.01], // New York
  [-23.55, -46.63], // São Paulo
  [51.51, -0.13], // London
  [50.11, 8.68], // Frankfurt
  [6.52, 3.38], // Lagos
  [25.2, 55.27], // Dubai
  [19.08, 72.88], // Mumbai
  [1.35, 103.82], // Singapore
  [35.68, 139.69], // Tokyo
  [-33.87, 151.21], // Sydney
  [-26.2, 28.05], // Johannesburg
]

// Reduced-motion frame: [from site, to site, feed]
const STATIC_ARCS = [
  [1, 3, 0], // New York -> London, FLIGHT
  [2, 5, 1], // São Paulo -> Lagos, AIS
  [0, 2, 2], // Los Angeles -> São Paulo, TLE
]

function toUnit(lat, lon, out, j) {
  const la = lat * DEG
  const lo = lon * DEG
  out[j] = Math.cos(la) * Math.cos(lo)
  out[j + 1] = Math.cos(la) * Math.sin(lo)
  out[j + 2] = Math.sin(la)
}

let landCache = null

// Land dots on an even-spaced lat/lon grid, as unit vectors (z = north)
function landPoints() {
  if (landCache) return landCache
  const ll = []
  for (let lat = -90 + DOT_STEP / 2; lat < 90; lat += DOT_STEP) {
    const n = Math.max(1, Math.round((360 * Math.cos(lat * DEG)) / DOT_STEP))
    for (let k = 0; k < n; k++) {
      const lon = -180 + ((k + 0.5) * 360) / n
      if (isLand(lat, lon)) ll.push(lat, lon)
    }
  }
  const pts = new Float32Array((ll.length / 2) * 3)
  for (let i = 0; i < ll.length; i += 2) toUnit(ll[i], ll[i + 1], pts, (i / 2) * 3)
  landCache = pts
  return pts
}

let gratCache = null

// 30° graticule as polylines of unit vectors plus [start, count] runs
function graticule() {
  if (gratCache) return gratCache
  const pts = []
  const runs = []
  const add = (lat, lon) => {
    const j = pts.length
    pts.push(0, 0, 0)
    toUnit(lat, lon, pts, j)
  }
  for (let lon = -180; lon < 180; lon += 30) {
    runs.push(pts.length / 3, 61)
    for (let lat = -90; lat <= 90; lat += 3) add(lat, lon)
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    runs.push(pts.length / 3, 121)
    for (let lon = -180; lon <= 180; lon += 3) add(lat, lon)
  }
  gratCache = { pts: Float32Array.from(pts), runs: Int32Array.from(runs) }
  return gratCache
}

function tint(hex, t) {
  const n = parseInt(hex.slice(1), 16)
  const m = c => Math.round(c + (255 - c) * t)
  return `rgb(${m((n >> 16) & 255)}, ${m((n >> 8) & 255)}, ${m(n & 255)})`
}

function fmtCount(n) {
  return n.toLocaleString('en-US')
}

function fmtCenter(lon) {
  let d = (lon / DEG) % 360
  if (d > 180) d -= 360
  if (d < -180) d += 360
  const v = Math.abs(d).toFixed(1).padStart(5, ' ')
  return `${v}°${d < 0 ? 'W' : 'E'} · ${(TILT / DEG).toFixed(1)}°N`
}

function createGlobe(canvas, ui) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  const land = landPoints()
  const nLand = land.length / 3
  const dotX = new Float32Array(nLand)
  const dotY = new Float32Array(nLand)
  const dotB = new Uint8Array(nLand)
  const dotR = new Float32Array(BUCKETS)
  const dotA = new Float32Array(BUCKETS)
  const grat = graticule()

  const nSites = SITES.length
  const site = new Float32Array(nSites * 3)
  SITES.forEach(([lat, lon], i) => toUnit(lat, lon, site, i * 3))
  const siteX = new Float32Array(nSites)
  const siteY = new Float32Array(nSites)
  const siteZ = new Float32Array(nSites)
  const sep = new Float32Array(nSites * nSites)
  for (let i = 0; i < nSites; i++) {
    for (let j = 0; j < nSites; j++) {
      const d = site[i * 3] * site[j * 3] + site[i * 3 + 1] * site[j * 3 + 1] + site[i * 3 + 2] * site[j * 3 + 2]
      sep[i * nSites + j] = Math.acos(Math.min(1, Math.max(-1, d)))
    }
  }

  const arcs = []
  for (let i = 0; i < MAX_ARCS; i++) {
    arcs.push({
      live: false,
      landed: false,
      t0: 0,
      from: 0,
      to: 0,
      feed: 0,
      p: new Float32Array((ARC_SEGS + 1) * 3),
      sx: new Float32Array(ARC_SEGS + 1),
      sy: new Float32Array(ARC_SEGS + 1),
      vis: new Uint8Array(ARC_SEGS + 1),
    })
  }
  const pulses = []
  for (let i = 0; i < 8; i++) pulses.push({ live: false, t0: 0, site: 0, tone: 0 })

  const heads = TONES.map(c => tint(c, 0.6))
  const cosT = Math.cos(TILT)
  const sinT = Math.sin(TILT)
  const cosI = Math.cos(SAT_INC)
  const sinI = Math.sin(SAT_INC)
  const cosN = Math.cos(SAT_NODE)
  const sinN = Math.sin(SAT_NODE)

  let w = 0
  let h = 0
  let cx = 0
  let cy = 0
  let R = 0
  let S = 1
  // static atmosphere, disc and limb, pre-rendered on resize and blitted per frame
  const bg = document.createElement('canvas')
  const bgCtx = bg.getContext('2d')
  let bgX = 0
  let bgY = 0
  let bgW = 0
  let bgH = 0
  let lon0 = START_LON * DEG
  let cosL = 1
  let sinL = 0
  let sat = 0
  let clock = 0
  let last = 0
  let raf = 0
  let nextSpawn = 0
  let warm = false
  let still = false
  // scratch output of rotate()/satAt(), kept in closure to avoid allocations
  let PX = 0
  let PY = 0
  let PZ = 0

  const setView = lon => {
    lon0 = lon
    cosL = Math.cos(lon)
    sinL = Math.sin(lon)
  }

  // world -> view: spin about the polar axis, then tilt toward the viewer
  const rotate = (x, y, z) => {
    const qx = x * cosL + y * sinL
    PX = y * cosL - x * sinL
    PY = cosT * z - sinT * qx
    PZ = sinT * z + cosT * qx
  }

  // orbit is fixed in inertial space, so it gets the tilt but not the spin
  const satAt = theta => {
    const c = Math.cos(theta)
    const s = Math.sin(theta)
    const oy = s * cosI
    const x = (c * cosN - oy * sinN) * SAT_R
    const y = (c * sinN + oy * cosN) * SAT_R
    const z = s * sinI * SAT_R
    PX = y
    PY = cosT * z - sinT * x
    PZ = sinT * z + cosT * x
  }

  // 1 in front of the globe or clear of its disc, fading as it slips behind
  const exposure = () => {
    if (PZ >= 0) return 1
    const d = Math.sqrt(PX * PX + PY * PY)
    return d <= 1 ? 0 : d >= 1.06 ? 1 : (d - 1) / 0.06
  }

  const projectSites = () => {
    for (let i = 0; i < nSites; i++) {
      rotate(site[i * 3], site[i * 3 + 1], site[i * 3 + 2])
      siteX[i] = cx + R * PX
      siteY[i] = cy - R * PY
      siteZ[i] = PZ
    }
  }

  const buildArc = (a, from, to, feed) => {
    const ax = site[from * 3]
    const ay = site[from * 3 + 1]
    const az = site[from * 3 + 2]
    const bx = site[to * 3]
    const by = site[to * 3 + 1]
    const bz = site[to * 3 + 2]
    const ang = sep[from * nSites + to]
    const s = Math.sin(ang) || 1
    const lift = Math.min(0.3, Math.max(0.08, (ang / Math.PI) * 0.6))
    const p = a.p
    for (let i = 0, j = 0; i <= ARC_SEGS; i++, j += 3) {
      const t = i / ARC_SEGS
      const wa = Math.sin((1 - t) * ang) / s
      const wb = Math.sin(t * ang) / s
      const k = 1 + lift * Math.sin(Math.PI * t)
      p[j] = (ax * wa + bx * wb) * k
      p[j + 1] = (ay * wa + by * wb) * k
      p[j + 2] = (az * wa + bz * wb) * k
    }
    a.from = from
    a.to = to
    a.feed = feed
    a.live = true
    a.landed = false
  }

  const projectArc = a => {
    const p = a.p
    for (let i = 0, j = 0; i <= ARC_SEGS; i++, j += 3) {
      rotate(p[j], p[j + 1], p[j + 2])
      a.sx[i] = cx + R * PX
      a.sy[i] = cy - R * PY
      a.vis[i] = PZ > 0 || PX * PX + PY * PY > 1 ? 1 : 0
    }
  }

  const pairLive = (from, to) => {
    for (let i = 0; i < MAX_ARCS; i++) {
      const a = arcs[i]
      if (a.live && ((a.from === from && a.to === to) || (a.from === to && a.to === from))) return true
    }
    return false
  }

  const spawn = age => {
    let a = null
    for (let i = 0; i < MAX_ARCS; i++) {
      if (!arcs[i].live) {
        a = arcs[i]
        break
      }
    }
    if (!a) return
    for (let tries = 0; tries < 48; tries++) {
      const from = (Math.random() * nSites) | 0
      const to = (Math.random() * nSites) | 0
      const d = sep[from * nSites + to]
      if (from === to || d < 22 * DEG || d > 125 * DEG) continue
      if (tries < 36 && (siteZ[from] < 0.15 || siteZ[to] < -0.1)) continue
      if (pairLive(from, to)) continue
      const feed = (Math.random() * FEEDS.length) | 0
      buildArc(a, from, to, feed)
      a.t0 = clock - age
      ui.event(feed)
      return
    }
  }

  const pulse = (s, tone) => {
    for (let i = 0; i < pulses.length; i++) {
      const p = pulses[i]
      if (p.live) continue
      p.live = true
      p.t0 = clock
      p.site = s
      p.tone = tone
      return
    }
  }

  const drawGraticule = () => {
    const { pts, runs } = grat
    ctx.beginPath()
    for (let r = 0; r < runs.length; r += 2) {
      const start = runs[r]
      const count = runs[r + 1]
      let pen = false
      let ax = 0
      let ay = 0
      let az = 0
      for (let k = 0; k < count; k++) {
        const j = (start + k) * 3
        rotate(pts[j], pts[j + 1], pts[j + 2])
        if (PZ > 0) {
          if (!pen) {
            if (k > 0) {
              const t = az / (az - PZ)
              ctx.moveTo(cx + R * (ax + (PX - ax) * t), cy - R * (ay + (PY - ay) * t))
            } else {
              ctx.moveTo(cx + R * PX, cy - R * PY)
            }
            pen = true
          }
          ctx.lineTo(cx + R * PX, cy - R * PY)
        } else if (pen) {
          const t = az / (az - PZ)
          ctx.lineTo(cx + R * (ax + (PX - ax) * t), cy - R * (ay + (PY - ay) * t))
          pen = false
        }
        ax = PX
        ay = PY
        az = PZ
      }
    }
    ctx.globalAlpha = 0.06
    ctx.strokeStyle = PALETTE.accent
    ctx.lineWidth = 1
    ctx.stroke()
  }

  const drawDots = () => {
    for (let i = 0, j = 0; i < nLand; i++, j += 3) {
      const x = land[j]
      const y = land[j + 1]
      const z = land[j + 2]
      const qx = x * cosL + y * sinL
      const Z = sinT * z + cosT * qx
      if (Z <= 0.015) {
        dotB[i] = 255
        continue
      }
      dotX[i] = cx + R * (y * cosL - x * sinL)
      dotY[i] = cy - R * (cosT * z - sinT * qx)
      dotB[i] = Z >= 1 ? BUCKETS - 1 : (Z * BUCKETS) | 0
    }
    ctx.fillStyle = PALETTE.accent
    for (let b = 0; b < BUCKETS; b++) {
      const r = dotR[b]
      ctx.globalAlpha = dotA[b]
      ctx.beginPath()
      for (let i = 0; i < nLand; i++) {
        if (dotB[i] !== b) continue
        const x = dotX[i]
        const y = dotY[i]
        ctx.moveTo(x + r, y)
        ctx.arc(x, y, r, 0, TAU)
      }
      ctx.fill()
    }
  }

  const drawSites = () => {
    ctx.strokeStyle = PALETTE.text
    ctx.fillStyle = PALETTE.text
    ctx.lineWidth = 1
    for (let i = 0; i < nSites; i++) {
      const z = siteZ[i]
      if (z <= 0.04) continue
      const a = Math.min(1, z * 2.5)
      ctx.globalAlpha = 0.55 * a
      ctx.beginPath()
      ctx.arc(siteX[i], siteY[i], 1.2 + 1.6 * S, 0, TAU)
      ctx.stroke()
      ctx.globalAlpha = 0.8 * a
      ctx.beginPath()
      ctx.arc(siteX[i], siteY[i], 0.9, 0, TAU)
      ctx.fill()
    }
  }

  // point at fractional arc position u, interpolated between projected samples
  let UX = 0
  let UY = 0
  const arcPoint = (a, i, u) => {
    const f = u * ARC_SEGS - i
    UX = a.sx[i] + (a.sx[i + 1] - a.sx[i]) * f
    UY = a.sy[i] + (a.sy[i + 1] - a.sy[i]) * f
  }

  const strokeRange = (a, u0, u1) => {
    if (u1 <= u0) return
    const i0 = Math.floor(u0 * ARC_SEGS)
    const i1 = Math.min(ARC_SEGS - 1, Math.ceil(u1 * ARC_SEGS) - 1)
    let pen = false
    ctx.beginPath()
    for (let i = i0; i <= i1; i++) {
      if (!a.vis[i] || !a.vis[i + 1]) {
        pen = false
        continue
      }
      if (!pen) {
        arcPoint(a, i, Math.max(u0, i / ARC_SEGS))
        ctx.moveTo(UX, UY)
        pen = true
      }
      arcPoint(a, i, Math.min(u1, (i + 1) / ARC_SEGS))
      ctx.lineTo(UX, UY)
    }
    ctx.stroke()
  }

  // comet tail: alpha ramps up toward `end` over `len` of the arc
  const strokeTail = (a, u0, u1, end, len, peak) => {
    if (u1 <= u0) return
    const i0 = Math.floor(u0 * ARC_SEGS)
    const i1 = Math.min(ARC_SEGS - 1, Math.ceil(u1 * ARC_SEGS) - 1)
    for (let i = i0; i <= i1; i++) {
      if (!a.vis[i] || !a.vis[i + 1]) continue
      const s0 = Math.max(u0, i / ARC_SEGS)
      const s1 = Math.min(u1, (i + 1) / ARC_SEGS)
      if (s1 <= s0) continue
      const k = Math.max(0, ((s0 + s1) * 0.5 - (end - len)) / len)
      ctx.globalAlpha = peak * k * k
      ctx.beginPath()
      arcPoint(a, i, s0)
      ctx.moveTo(UX, UY)
      arcPoint(a, i, s1)
      ctx.lineTo(UX, UY)
      ctx.stroke()
    }
  }

  const drawDot = (x, y, tone, r, halo, alpha) => {
    ctx.fillStyle = TONES[tone]
    ctx.globalAlpha = 0.2 * alpha
    ctx.beginPath()
    ctx.arc(x, y, halo, 0, TAU)
    ctx.fill()
    ctx.fillStyle = heads[tone]
    ctx.globalAlpha = alpha
    ctx.beginPath()
    ctx.arc(x, y, r, 0, TAU)
    ctx.fill()
  }

  const drawArcs = () => {
    for (let n = 0; n < MAX_ARCS; n++) {
      const a = arcs[n]
      if (!a.live) continue
      const tone = FEEDS[a.feed].tone
      const age = clock - a.t0
      if (!still) {
        if (age >= TRAVEL + FADE) {
          a.live = false
          continue
        }
        if (!a.landed && age >= TRAVEL) {
          a.landed = true
          pulse(a.to, tone)
        }
      }
      projectArc(a)
      ctx.strokeStyle = TONES[tone]
      if (still) {
        ctx.lineCap = 'round'
        ctx.lineWidth = 1.1
        ctx.globalAlpha = 0.4
        strokeRange(a, 0, 1)
        ctx.lineCap = 'butt'
        ctx.lineWidth = 4 * S
        strokeTail(a, 0, 1, 1, 1, 0.12)
        ctx.lineWidth = 0.8 + 1.1 * S
        strokeTail(a, 0, 1, 1, 1, 0.95)
        continue
      }
      const q = age / TRAVEL
      const head = q < 1 ? 0.5 - 0.5 * Math.cos(Math.PI * q) : 1 + ((age - TRAVEL) / DRAIN) * TAIL
      const fade = q < 1 ? 1 : 1 - Math.min(1, (age - TRAVEL) / FADE)
      ctx.lineCap = 'round'
      ctx.lineWidth = 1.1
      ctx.globalAlpha = 0.4 * fade * fade
      strokeRange(a, 0, Math.min(1, head))
      const t0 = Math.max(0, head - TAIL)
      const t1 = Math.min(1, head)
      ctx.lineCap = 'butt'
      ctx.lineWidth = 4 * S
      strokeTail(a, t0, t1, head, TAIL, 0.14)
      ctx.lineWidth = 0.8 + 1.1 * S
      strokeTail(a, t0, t1, head, TAIL, 1)
      if (q < 1) {
        const f = Math.min(ARC_SEGS - 1e-4, head * ARC_SEGS)
        const i = f | 0
        if (a.vis[i] && a.vis[i + 1]) {
          arcPoint(a, i, head)
          drawDot(UX, UY, tone, 1.2 + 0.9 * S, 2 + 4 * S, 1)
        }
      }
    }
  }

  const drawPulses = () => {
    ctx.lineWidth = 1.2
    if (still) {
      for (let n = 0; n < STATIC_ARCS.length; n++) {
        const s = arcs[n].to
        if (siteZ[s] <= 0.05) continue
        ctx.strokeStyle = TONES[FEEDS[arcs[n].feed].tone]
        ctx.globalAlpha = 0.45
        ctx.beginPath()
        ctx.arc(siteX[s], siteY[s], 2.75 + 6 * S, 0, TAU)
        ctx.stroke()
      }
      return
    }
    for (let n = 0; n < pulses.length; n++) {
      const p = pulses[n]
      if (!p.live) continue
      const k = (clock - p.t0) / PULSE
      if (k >= 1) {
        p.live = false
        continue
      }
      const z = siteZ[p.site]
      if (z <= 0.05) continue
      const e = 1 - (1 - k) * (1 - k) * (1 - k)
      ctx.strokeStyle = TONES[p.tone]
      ctx.globalAlpha = 0.8 * (1 - k) * Math.min(1, z * 3)
      ctx.beginPath()
      ctx.arc(siteX[p.site], siteY[p.site], 2.75 + 13 * S * e, 0, TAU)
      ctx.stroke()
    }
  }

  const drawSatellite = () => {
    ctx.strokeStyle = PALETTE.info
    ctx.lineWidth = 1
    ctx.lineCap = 'butt'
    ctx.globalAlpha = 0.14
    ctx.setLineDash(DASH)
    ctx.beginPath()
    let pen = false
    for (let k = 0; k <= ORBIT_N; k++) {
      satAt((k / ORBIT_N) * TAU)
      if (PZ > 0 || PX * PX + PY * PY > 1) {
        if (pen) ctx.lineTo(cx + R * PX, cy - R * PY)
        else ctx.moveTo(cx + R * PX, cy - R * PY)
        pen = true
      } else {
        pen = false
      }
    }
    ctx.stroke()
    ctx.setLineDash(NO_DASH)

    ctx.lineWidth = 1.4
    ctx.lineCap = 'round'
    let x0 = 0
    let y0 = 0
    let e0 = 0
    for (let k = 0; k <= SAT_TRAIL_N; k++) {
      satAt(sat - (k / SAT_TRAIL_N) * SAT_TRAIL)
      const x = cx + R * PX
      const y = cy - R * PY
      const e = exposure()
      if (k > 0 && e > 0 && e0 > 0) {
        const f = 1 - k / SAT_TRAIL_N
        ctx.globalAlpha = 0.6 * f * f * Math.min(e, e0)
        ctx.beginPath()
        ctx.moveTo(x0, y0)
        ctx.lineTo(x, y)
        ctx.stroke()
      }
      x0 = x
      y0 = y
      e0 = e
    }
    satAt(sat)
    const e = exposure()
    if (e > 0) drawDot(cx + R * PX, cy - R * PY, 1, 1.3 + 0.8 * S, 2.5 + 3.5 * S, e)
  }

  const paintBackdrop = dpr => {
    const half = R * 1.25
    const x0 = Math.floor((cx - half) * dpr) / dpr
    const y0 = Math.floor((cy - half) * dpr) / dpr
    bgX = x0
    bgY = y0
    bgW = Math.ceil((cx + half) * dpr) / dpr - x0
    bgH = Math.ceil((cy + half) * dpr) / dpr - y0
    bg.width = Math.max(1, Math.round(bgW * dpr))
    bg.height = Math.max(1, Math.round(bgH * dpr))
    if (!bgCtx) return
    const b = bgCtx
    b.setTransform(dpr, 0, 0, dpr, -x0 * dpr, -y0 * dpr)
    const glow = b.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.24)
    glow.addColorStop(0, rgba(PALETTE.accent, 0))
    glow.addColorStop(0.25, rgba(PALETTE.accent, 0.11))
    glow.addColorStop(0.45, rgba(PALETTE.accent, 0.04))
    glow.addColorStop(1, rgba(PALETTE.accent, 0))
    b.fillStyle = glow
    b.beginPath()
    b.arc(cx, cy, R * 1.24, 0, TAU)
    b.fill()
    const disc = b.createRadialGradient(cx - R * 0.35, cy - R * 0.4, 0, cx, cy, R)
    disc.addColorStop(0, rgba(PALETTE.accent, 0.07))
    disc.addColorStop(1, rgba(PALETTE.accent, 0.015))
    b.fillStyle = disc
    b.beginPath()
    b.arc(cx, cy, R, 0, TAU)
    b.fill()
    b.globalAlpha = 0.16
    b.strokeStyle = PALETTE.accent
    b.lineWidth = 1
    b.beginPath()
    b.arc(cx, cy, R, 0, TAU)
    b.stroke()
  }

  const draw = () => {
    ctx.clearRect(0, 0, w, h)
    if (R < 4) return
    ctx.globalAlpha = 1
    ctx.drawImage(bg, bgX, bgY, bgW, bgH)
    drawGraticule()
    drawDots()
    drawSites()
    drawArcs()
    drawPulses()
    drawSatellite()
    ctx.globalAlpha = 1
  }

  const frame = now => {
    raf = requestAnimationFrame(frame)
    const dt = Math.min(0.05, Math.max(0, (now - last) / 1000))
    last = now
    clock += dt
    sat = (sat + SAT_RATE * dt) % TAU
    let lon = lon0 - SPIN * dt
    if (lon < -Math.PI) lon += TAU
    setView(lon)
    projectSites()
    if (clock >= nextSpawn) {
      spawn(0)
      nextSpawn = clock + 0.8 + Math.random() * 0.6
    }
    ui.tick(dt, clock, lon0)
    draw()
  }

  const start = () => {
    if (raf) return
    if (still) {
      still = false
      warm = false
      for (let i = 0; i < MAX_ARCS; i++) arcs[i].live = false
      setView(START_LON * DEG)
    }
    if (!warm) {
      warm = true
      setView(lon0)
      projectSites()
      spawn(1.15)
      spawn(0.5)
      nextSpawn = clock + 0.5
    }
    last = performance.now()
    raf = requestAnimationFrame(frame)
  }

  const stop = () => {
    if (raf) cancelAnimationFrame(raf)
    raf = 0
  }

  const renderStatic = () => {
    stop()
    still = true
    setView(STATIC_LON * DEG)
    sat = SAT_STATIC
    for (let i = 0; i < MAX_ARCS; i++) arcs[i].live = false
    for (let i = 0; i < pulses.length; i++) pulses[i].live = false
    STATIC_ARCS.forEach(([from, to, feed], i) => buildArc(arcs[i], from, to, feed))
    projectSites()
    draw()
    ui.readout(lon0)
  }

  const resize = () => {
    const parent = canvas.parentElement
    if (!parent) return
    w = parent.clientWidth
    h = parent.clientHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.max(1, Math.round(w * dpr))
    canvas.height = Math.max(1, Math.round(h * dpr))
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    cx = w / 2
    cy = h / 2
    R = Math.min(w, h) * 0.4
    S = Math.min(1.3, Math.max(0.6, R / 158))
    // dot size tracks the globe so density reads the same at every size, and
    // limb dots shrink and dim so foreshortening doesn't pile up into a band
    const base = Math.min(1.4, Math.max(0.75, R * 0.0086))
    for (let b = 0; b < BUCKETS; b++) {
      const f = (b + 0.5) / BUCKETS
      dotR[b] = base * (0.62 + 0.38 * f)
      dotA[b] = 0.18 + 0.6 * Math.pow(f, 0.8)
    }
    paintBackdrop(dpr)
    if (still) renderStatic()
    else {
      projectSites()
      draw()
    }
  }

  return { start, stop, resize, renderStatic }
}

export default function ArgusPreview() {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const readoutRef = useRef(null)
  const rowRefs = useRef([])
  const globeRef = useRef(null)
  const inView = useInView(rootRef, { rootMargin: '100px' })
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const feeds = FEEDS.map((f, i) => {
      const row = rowRefs.current[i]
      return {
        row,
        fill: row.querySelector('.pv-argus__fill'),
        text: row.querySelector('.pv-argus__count').firstChild,
        count: f.count,
        base: f.budget,
        level: f.budget,
        shown: -1,
        flip: false,
      }
    })
    const readout = readoutRef.current?.firstChild
    let budgetAt = 0
    let readoutAt = 0

    const paintBudgets = () => {
      for (let i = 0; i < feeds.length; i++) {
        const f = feeds[i]
        if (Math.abs(f.level - f.shown) < 0.004) continue
        f.shown = f.level
        f.fill.style.setProperty('--pv-argus-budget', f.level.toFixed(3))
      }
    }
    paintBudgets()

    const ui = {
      event(i) {
        const f = feeds[i]
        f.count += 1
        f.text.nodeValue = fmtCount(f.count)
        f.level = Math.min(0.96, f.level + 0.14)
        f.flip = !f.flip
        f.row.classList.remove(f.flip ? 'pv-argus__row--hit-b' : 'pv-argus__row--hit-a')
        f.row.classList.add(f.flip ? 'pv-argus__row--hit-a' : 'pv-argus__row--hit-b')
      },
      tick(dt, clock, lon) {
        const k = 1 - Math.exp(-dt / 5)
        for (let i = 0; i < feeds.length; i++) feeds[i].level += (feeds[i].base - feeds[i].level) * k
        if (clock >= budgetAt) {
          budgetAt = clock + 0.05
          paintBudgets()
        }
        if (clock >= readoutAt) {
          readoutAt = clock + 0.25
          ui.readout(lon)
        }
      },
      readout(lon) {
        if (readout) readout.nodeValue = fmtCenter(lon)
      },
    }

    const globe = createGlobe(canvas, ui)
    if (!globe) return undefined
    globeRef.current = globe
    globe.resize()
    const ro = new ResizeObserver(() => globe.resize())
    ro.observe(canvas.parentElement)
    return () => {
      ro.disconnect()
      globe.stop()
      globeRef.current = null
    }
  }, [])

  useEffect(() => {
    const globe = globeRef.current
    if (!globe) return undefined
    if (reduced) {
      globe.renderStatic()
      return undefined
    }
    if (!inView) return undefined
    globe.start()
    return () => globe.stop()
  }, [inView, reduced])

  return (
    <div ref={rootRef} className="pv pv-argus" aria-hidden="true">
      <div className="pv-head">
        <span className="pv-head__title">
          <span className="pv-dot" />
          argus · osint console
        </span>
        <span className="pv-head__meta">
          <span>8 feeds</span>
          <span className="pv-head__meta--optional">
            <span className="pv-argus__ok" />
            key-broker ok
          </span>
        </span>
      </div>
      <div className="pv-body pv-argus__body">
        <div className="pv-argus__stage">
          <canvas ref={canvasRef} className="pv-canvas" />
          <div className="pv-argus__readout">
            center{' '}
            <span ref={readoutRef} className="pv-argus__readout-val">
              {fmtCenter(START_LON * DEG)}
            </span>
          </div>
        </div>
        <div className="pv-argus__feeds">
          <div className="pv-argus__feeds-head">
            <span>feeds</span>
            <span>events</span>
          </div>
          <ul className="pv-argus__list">
            {FEEDS.map((f, i) => (
              <li
                key={f.name}
                ref={el => {
                  rowRefs.current[i] = el
                }}
                className={`pv-argus__row${TONE_CLASS[f.tone]}`}
              >
                <span className="pv-argus__swatch" />
                <span className="pv-argus__name">{f.name}</span>
                <span className="pv-argus__count">{fmtCount(f.count)}</span>
                <span className="pv-argus__budget">
                  <span className="pv-argus__fill" />
                </span>
              </li>
            ))}
          </ul>
          <div className="pv-argus__feeds-foot">
            <span className="pv-argus__key" />
            budget governor
          </div>
        </div>
      </div>
    </div>
  )
}
