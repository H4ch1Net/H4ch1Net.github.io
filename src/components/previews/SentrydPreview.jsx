import { useEffect, useRef, useState } from 'react'
import useInView from '../../lib/useInView'
import useReducedMotion from '../../lib/useReducedMotion'
import { PALETTE, rgba, FONT_MONO } from '../../lib/palette'
import './previews.css'
import './SentrydPreview.css'

// sentryd preview: packets/sec scrolling right to left over an EWMA baseline
// with a ±3σ band. Bursts that cross the band leave a danger marker, and the
// same simulation feeds the alert table and the status counters. Seeded, so
// every visit opens on the same complete frame.

const SAMPLE_S = 0.14
const VISIBLE = 100 // samples across the plot: a 14s window
const CAP = VISIBLE + 3 // plus one sample past the left edge and the next one in
const HEAD = CAP - 2 // newest sample reached; the line interpolates toward CAP - 1
const Y_MAX = 2400
const TICKS = [
  [0, '0'],
  [1000, '1k'],
  [2000, '2k'],
]
const CLOCK_START = 14 * 3600 + 2 * 60 + 7 // fake clock reads 14:02:07 at t = 0
const FEED_MAX = 5 // four visible rows plus the one fading out
const SURFACE = '#070707'
const FADE_W = 40
const RING_S = 0.9

const COLOR = {
  grid: PALETTE.borderSoft,
  tick: PALETTE.muted,
  traffic: PALETTE.accent,
  baseline: PALETTE.dim,
  band: 'rgba(255, 255, 255, 0.05)',
  bandEdge: 'rgba(255, 255, 255, 0.1)',
  danger: PALETTE.danger,
  hairline: rgba(PALETTE.danger, 0.55),
  window: rgba(PALETTE.danger, 0.06),
}

const SEV_LABEL = { high: 'HIGH', med: 'MED', low: 'LOW' }
const RULES = ['port_scan', 'sig:ssh_bruteforce', 'port_scan', 'sig:ssh_bruteforce', 'arp_spoof']
const OUIS = ['3c:22:fb', 'a4:83:e7', 'f0:18:98', 'b8:27:eb']

function mulberry32(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const between = (rand, lo, hi) => lo + rand() * (hi - lo)
const intBetween = (rand, lo, hi) => lo + Math.floor(rand() * (hi - lo + 1))
const smoothstep = q => q * q * (3 - 2 * q)
const pad2 = n => String(n).padStart(2, '0')
const fmtInt = n => Math.round(n).toLocaleString('en-US')
const host = rand => `10.0.${intBetween(rand, 1, 9)}.${intBetween(rand, 11, 240)}`

function clock(t) {
  const s = CLOCK_START + Math.floor(t)
  return `${pad2(Math.floor(s / 3600) % 24)}:${pad2(Math.floor(s / 60) % 60)}:${pad2(s % 60)}`
}

function makeAlert(sim, t, rule, sev, evidence, conf) {
  return {
    id: sim.nextId++,
    time: clock(t),
    rule,
    sev,
    evidence,
    conf: Math.min(conf, 0.99).toFixed(2),
    live: sim.live,
  }
}

function spikeAlert(sim, z) {
  const sev = z >= 4.5 ? 'high' : z >= 3.6 ? 'med' : 'low'
  return makeAlert(sim, sim.t, 'ewma_spike', sev, `eth0 +${z.toFixed(1)}σ over baseline`, 0.8 + z * 0.025)
}

function ruleAlert(sim) {
  const rand = sim.arand
  let rule = sim.lastRule
  while (rule === sim.lastRule) rule = RULES[Math.floor(rand() * RULES.length)]
  sim.lastRule = rule
  if (rule === 'port_scan') {
    const ports = intBetween(rand, 14, 96)
    const secs = intBetween(rand, 3, 9)
    const rate = ports / secs
    const sev = rate >= 16 ? 'high' : rate >= 7 ? 'med' : 'low'
    const evidence = `${host(rand)} -> ${ports} ports / ${secs}s`
    return makeAlert(sim, sim.t, rule, sev, evidence, 0.74 + Math.min(rate, 20) * 0.011 + rand() * 0.03)
  }
  if (rule === 'arp_spoof') {
    const oui = OUIS[Math.floor(rand() * OUIS.length)]
    const tail = intBetween(rand, 16, 255).toString(16)
    return makeAlert(sim, sim.t, rule, 'high', `gw mac changed ${oui}:…:${tail}`, 0.94 + rand() * 0.05)
  }
  const fails = intBetween(rand, 6, 44)
  const sev = fails >= 30 ? 'high' : fails >= 14 ? 'med' : 'low'
  const evidence = `${fails} auth fails / min · ${host(rand)}`
  return makeAlert(sim, sim.t, rule, sev, evidence, 0.8 + Math.min(fails, 40) * 0.004 + rand() * 0.03)
}

// Burst envelope: eased attack, optional hold, exponential decay.
function burstAt(sim, t) {
  const u = t - sim.bStart
  if (u <= 0 || u >= sim.bDur) return 0
  const { bRise, bHold } = sim
  if (u < bRise) return sim.bAmp * smoothstep(u / bRise)
  if (u < bRise + bHold) return sim.bAmp
  return sim.bAmp * Math.exp((bRise + bHold - u) / sim.bTau)
}

function setBurst(sim, start, amp, rise, hold, tau) {
  sim.bStart = start
  sim.bAmp = amp
  sim.bRise = rise
  sim.bHold = hold
  sim.bTau = tau
  sim.bDur = rise + hold + 4.5 * tau
}

// Writes sample k + 1 into the last slot and runs the EWMA detector on it.
// The baseline freezes while traffic is above the band, as the real one does.
function pushSample(sim) {
  const { rand, v, m, s, marks } = sim
  const j = sim.k + 1
  const t = j * SAMPLE_S
  if (t > sim.bStart + sim.bDur) {
    const start = sim.bNext
    sim.bNext = start + between(rand, 4.6, 6.8)
    const amp = between(rand, 480, 1050)
    const rise = between(rand, 0.22, 0.45)
    const hold = between(rand, 0.2, 0.6)
    const tau = between(rand, 0.28, 0.5)
    setBurst(sim, start, amp, rise, hold, tau)
  }
  const drift = 1050 + 70 * Math.sin(t * 0.21 + 0.8) + 38 * Math.sin(t * 0.063 + 2.1)
  sim.noise = Math.max(-100, Math.min(100, sim.noise * 0.88 + (rand() - 0.5) * 58))
  sim.jitter = sim.jitter * 0.6 + (rand() - 0.5) * 0.24
  const x = drift + sim.noise + burstAt(sim, t) * (1 + sim.jitter)
  const mean = sim.mean
  const sd = Math.max(34, Math.sqrt(sim.vr))
  const i = CAP - 1
  const upPrev = m[i - 1] + 3 * s[i - 1]
  const up = mean + 3 * sd
  const d0 = v[i - 1] - upPrev
  const d1 = x - up
  v[i] = x
  m[i] = mean
  s[i] = sd
  if (d1 > 0 && d0 <= 0 && sim.active < 0 && j - sim.lastEnd > 8) {
    let slot = 0
    while (slot < marks.length - 1 && marks[slot].on) slot++
    const f = -d0 / (d1 - d0)
    const mk = marks[slot]
    mk.on = true
    mk.fired = false
    mk.k = j - 1 + f
    mk.y = upPrev + (up - upPrev) * f
    mk.z = (x - mean) / sd
    mk.label = `+${mk.z.toFixed(1)}σ`
    mk.end = Infinity
    sim.active = slot
  } else if (d1 <= 0 && d0 > 0 && sim.active >= 0) {
    marks[sim.active].end = j - 1 + d0 / (d0 - d1)
    sim.active = -1
    sim.lastEnd = j
  }
  if (d1 <= 0) {
    const diff = x - mean
    sim.mean = mean + 0.05 * diff
    sim.vr = 0.97 * (sim.vr + 0.03 * diff * diff)
  }
}

function advance(sim, dt, emit) {
  sim.t += dt
  sim.phase += dt / SAMPLE_S
  while (sim.phase >= 1) {
    sim.phase -= 1
    sim.k += 1
    sim.v.copyWithin(0, 1)
    sim.m.copyWithin(0, 1)
    sim.s.copyWithin(0, 1)
    pushSample(sim)
  }
  const head = sim.k + sim.phase
  sim.rate = sim.v[HEAD] + (sim.v[HEAD + 1] - sim.v[HEAD]) * sim.phase
  sim.pkts += sim.rate * dt
  for (let i = 0; i < sim.marks.length; i++) {
    const mk = sim.marks[i]
    if (!mk.on) continue
    if (!mk.fired && head >= mk.k) {
      mk.fired = true
      sim.lastPushAt = sim.t
      emit(spikeAlert(sim, mk.z))
    } else if (head - mk.end > VISIBLE + 2) {
      mk.on = false
    }
  }
  if (sim.t >= sim.nextAlertAt) {
    // Keep rule alerts clear of the spike alert so rows never arrive in a pile.
    const toBurst = sim.bStart - sim.t
    if (sim.t - sim.lastPushAt < 1.3 || (toBurst < 1.3 && toBurst > -2)) {
      sim.nextAlertAt = sim.t + 0.35
    } else {
      sim.lastPushAt = sim.t
      sim.nextAlertAt = sim.t + between(sim.arand, 2.5, 4)
      emit(ruleAlert(sim))
    }
  }
}

function createSim() {
  const sim = {
    rand: mulberry32(0x5e47d),
    arand: mulberry32(0xa1e27),
    v: new Float32Array(CAP).fill(1050),
    m: new Float32Array(CAP).fill(1050),
    s: new Float32Array(CAP).fill(44),
    k: 0,
    t: 0,
    phase: 0,
    rate: 1050,
    pkts: 0,
    noise: 0,
    jitter: 0,
    mean: 1050,
    vr: 44 * 44,
    bStart: 0,
    bAmp: 0,
    bRise: 1,
    bHold: 0,
    bTau: 1,
    bDur: 0,
    bNext: 1.6,
    marks: Array.from({ length: 4 }, () => ({ on: false, fired: false, k: 0, y: 0, z: 0, label: '', end: Infinity })),
    active: -1,
    lastEnd: -1e9,
    nextAlertAt: Infinity,
    lastPushAt: -1e9,
    lastRule: 'port_scan',
    nextId: 1,
    live: false,
  }

  // Replay 24s of history so the first frame is a full window: one burst is
  // parked ~5.6s before t = 0 (the opening marker) and the next is queued to
  // land shortly after the panel starts moving (bNext above).
  setBurst(sim, -5.75, 620, 0.4, 0.75, 0.45)
  const steps = 172
  const early = []
  const collect = alert => early.push(alert)
  sim.k = -steps
  sim.t = -steps * SAMPLE_S
  pushSample(sim)
  for (let n = 0; n < steps; n++) advance(sim, SAMPLE_S, collect)

  sim.t = 0
  sim.pkts = 1284019
  sim.initial = [
    makeAlert(sim, -3, 'port_scan', 'med', '10.0.4.23 -> 61 ports / 4s', 0.94),
    ...early,
    makeAlert(sim, -10, 'sig:ssh_bruteforce', 'low', '11 auth fails / min · 10.0.7.12', 0.83),
    makeAlert(sim, -14, 'arp_spoof', 'high', 'gw mac changed 3c:22:fb:…:41', 0.97),
  ].slice(0, 4)
  sim.rate0 = fmtInt(sim.rate)
  sim.pkts0 = fmtInt(sim.pkts)
  sim.live = true
  sim.lastPushAt = -3
  sim.nextAlertAt = 3.4
  return sim
}

function layout(geo, ctx, w, h) {
  const small = w < 400
  geo.small = small
  geo.w = w
  geo.h = h
  geo.x0 = small ? 19 : 22
  geo.x1 = w - 8
  geo.y0 = 6
  geo.y1 = h - 6
  geo.font = `${small ? 9 : 9.5}px ${FONT_MONO}`
  geo.fade = ctx.createLinearGradient(geo.x0, 0, geo.x0 + FADE_W, 0)
  geo.fade.addColorStop(0, 'rgba(0, 0, 0, 1)')
  geo.fade.addColorStop(1, 'rgba(0, 0, 0, 0)')
  geo.area = ctx.createLinearGradient(0, geo.y0, 0, geo.y1)
  geo.area.addColorStop(0, rgba(PALETTE.accent, 0.14))
  geo.area.addColorStop(0.55, rgba(PALETTE.accent, 0.1))
  geo.area.addColorStop(1, rgba(PALETTE.accent, 0.015))
}

function dot(ctx, x, y, color) {
  ctx.fillStyle = SURFACE
  ctx.beginPath()
  ctx.arc(x, y, 6, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x, y, 4, 0, Math.PI * 2)
  ctx.fill()
}

// Traces a[i] + kb * b[i] left to right, ending at the interpolated head.
function trace(ctx, g, a, b, kb, move) {
  const { xs, dx, x1, y1, ky, ph } = g
  for (let i = 0; i <= HEAD; i++) {
    const y = y1 - (a[i] + kb * b[i]) * ky
    if (move && i === 0) ctx.moveTo(xs, y)
    else ctx.lineTo(xs + i * dx, y)
  }
  const ha = a[HEAD] + (a[HEAD + 1] - a[HEAD]) * ph
  const hb = b[HEAD] + (b[HEAD + 1] - b[HEAD]) * ph
  ctx.lineTo(x1, y1 - (ha + kb * hb) * ky)
}

// The same series right to left, to close the band polygon.
function traceBack(ctx, g, a, b, kb) {
  const { xs, dx, x1, y1, ky, ph } = g
  const ha = a[HEAD] + (a[HEAD + 1] - a[HEAD]) * ph
  const hb = b[HEAD] + (b[HEAD + 1] - b[HEAD]) * ph
  ctx.lineTo(x1, y1 - (ha + kb * hb) * ky)
  for (let i = HEAD; i >= 0; i--) ctx.lineTo(xs + i * dx, y1 - (a[i] + kb * b[i]) * ky)
}

function draw(ctx, g, sim) {
  const { w, h, x0, x1, y0, y1 } = g
  const { v, m, s, marks } = sim
  const ph = sim.phase
  const head = sim.k + ph
  const dx = (x1 - x0) / VISIBLE
  const ky = (y1 - y0) / Y_MAX
  const hv = v[HEAD] + (v[HEAD + 1] - v[HEAD]) * ph
  g.ph = ph
  g.dx = dx
  g.ky = ky
  g.xs = x1 - (HEAD + ph) * dx

  ctx.clearRect(0, 0, w, h)
  ctx.save()
  ctx.beginPath()
  ctx.rect(x0, 0, w - x0, h)
  ctx.clip()
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'

  // Shade the span each alert spent above the band.
  ctx.fillStyle = COLOR.window
  for (let i = 0; i < marks.length; i++) {
    const mk = marks[i]
    if (!mk.on || !mk.fired) continue
    const xa = x1 - (head - mk.k) * dx
    const xb = mk.end <= head ? x1 - (head - mk.end) * dx : x1
    ctx.fillRect(xa, y0, xb - xa, y1 - y0)
  }

  // ±3σ band: a faint wash, with a hairline on the upper edge (the threshold)
  ctx.beginPath()
  trace(ctx, g, m, s, 3, true)
  traceBack(ctx, g, m, s, -3)
  ctx.closePath()
  ctx.fillStyle = COLOR.band
  ctx.fill()
  ctx.beginPath()
  trace(ctx, g, m, s, 3, true)
  ctx.lineWidth = 1
  ctx.strokeStyle = COLOR.bandEdge
  ctx.stroke()

  // traffic area
  ctx.beginPath()
  ctx.moveTo(g.xs, y1)
  trace(ctx, g, v, v, 0, false)
  ctx.lineTo(x1, y1)
  ctx.closePath()
  ctx.fillStyle = g.area
  ctx.fill()

  // EWMA baseline
  ctx.beginPath()
  trace(ctx, g, m, m, 0, true)
  ctx.lineWidth = 1.5
  ctx.strokeStyle = COLOR.baseline
  ctx.stroke()

  // alert hairlines
  ctx.lineWidth = 1
  ctx.strokeStyle = COLOR.hairline
  for (let i = 0; i < marks.length; i++) {
    const mk = marks[i]
    if (!mk.on || !mk.fired) continue
    const x = Math.round(x1 - (head - mk.k) * dx) + 0.5
    ctx.beginPath()
    ctx.moveTo(x, y0)
    ctx.lineTo(x, y1)
    ctx.stroke()
  }

  // traffic line
  ctx.beginPath()
  trace(ctx, g, v, v, 0, true)
  ctx.lineWidth = 2
  ctx.strokeStyle = COLOR.traffic
  ctx.stroke()

  for (let i = 0; i < marks.length; i++) {
    const mk = marks[i]
    if (!mk.on || !mk.fired) continue
    const x = x1 - (head - mk.k) * dx
    const y = y1 - mk.y * ky
    // one expanding ring as the alert fires
    const p = ((head - mk.k) * SAMPLE_S) / RING_S
    if (p < 1) {
      ctx.globalAlpha = 0.6 * (1 - p)
      ctx.lineWidth = 1.5
      ctx.strokeStyle = COLOR.danger
      ctx.beginPath()
      ctx.arc(x, y, 5 + 11 * (1 - (1 - p) * (1 - p)), 0, Math.PI * 2)
      ctx.stroke()
      ctx.globalAlpha = 1
    }
    dot(ctx, x, y, COLOR.danger)
  }
  dot(ctx, x1, y1 - hv * ky, COLOR.traffic)

  // z-score tag left of each hairline, where traffic is still at baseline
  if (!g.small) {
    ctx.font = g.font
    ctx.fillStyle = COLOR.tick
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    for (let i = 0; i < marks.length; i++) {
      const mk = marks[i]
      if (mk.on && mk.fired) ctx.fillText(mk.label, Math.round(x1 - (head - mk.k) * dx) - 5, y0 + 8)
    }
  }
  ctx.restore()

  // Fade the oldest samples out at the left edge.
  ctx.globalCompositeOperation = 'destination-out'
  ctx.fillStyle = g.fade
  ctx.fillRect(x0, 0, FADE_W, h)

  // Gridlines slide underneath everything drawn so far.
  ctx.globalCompositeOperation = 'destination-over'
  ctx.fillStyle = COLOR.grid
  for (let i = 0; i < TICKS.length; i++) ctx.fillRect(x0, Math.round(y1 - TICKS[i][0] * ky), w - x0, 1)

  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = COLOR.tick
  ctx.font = g.font
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  for (let i = 0; i < TICKS.length; i++) ctx.fillText(TICKS[i][1], 0, Math.round(y1 - TICKS[i][0] * ky) + 0.5)
}

export default function SentrydPreview() {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const rateRef = useRef(null)
  const pktsRef = useRef(null)
  const paintRef = useRef(null)
  const [sim] = useState(createSim)
  const [feed, setFeed] = useState(() => ({ items: sim.initial, total: 37 }))
  const reduced = useReducedMotion()
  const inView = useInView(rootRef, { rootMargin: '100px' })

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const geo = {}
    let alive = true
    const paint = () => {
      if (geo.w) draw(ctx, geo, sim)
    }
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = parent.clientWidth
      const h = parent.clientHeight
      if (!w || !h) return
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      layout(geo, ctx, w, h)
      paint()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(parent)
    resize()
    document.fonts?.ready.then(() => {
      if (alive) paint()
    })
    paintRef.current = paint
    return () => {
      alive = false
      ro.disconnect()
      paintRef.current = null
    }
  }, [sim])

  useEffect(() => {
    if (reduced || !inView) return
    const push = alert => setFeed(f => ({ items: [alert, ...f.items].slice(0, FEED_MAX), total: f.total + 1 }))
    let raf = 0
    let last = performance.now()
    let lastText = 0
    const tick = now => {
      raf = requestAnimationFrame(tick)
      const dt = Math.max(0, Math.min(now - last, 64)) / 1000
      last = now
      advance(sim, dt, push)
      paintRef.current?.()
      if (now - lastText > 250) {
        lastText = now
        rateRef.current.textContent = fmtInt(sim.rate)
        pktsRef.current.textContent = fmtInt(sim.pkts)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [sim, inView, reduced])

  return (
    <div ref={rootRef} className="pv pv-sentryd" aria-hidden="true">
      <div className="pv-head">
        <span className="pv-head__title">
          <span className="pv-dot" />
          sentryd · eth0
        </span>
        <span className="pv-head__meta">
          <span>4 rules</span>
          <span className="pv-sentryd__sep pv-head__meta--optional" />
          <span className="pv-head__meta--optional">pcap replay</span>
        </span>
      </div>
      <div className="pv-body pv-sentryd__body">
        <div className="pv-sentryd__legend">
          <span className="pv-sentryd__key">
            <span className="pv-sentryd__swatch" />
            traffic
          </span>
          <span className="pv-sentryd__key">
            <span className="pv-sentryd__swatch pv-sentryd__swatch--base" />
            <span className="pv-sentryd__long">baseline · </span>ewma ±3σ
          </span>
          <span className="pv-sentryd__key">
            <span className="pv-sentryd__swatch pv-sentryd__swatch--alert" />
            alert
          </span>
          <span className="pv-sentryd__rate">
            <span ref={rateRef} className="pv-sentryd__num">
              {sim.rate0}
            </span>{' '}
            pkts/s
          </span>
        </div>
        <div className="pv-sentryd__chart">
          <canvas ref={canvasRef} className="pv-canvas" />
        </div>
        <div className="pv-sentryd__feed">
          <div className="pv-sentryd__thead">
            <span>time</span>
            <span>sev</span>
            <span>rule</span>
            <span className="pv-sentryd__ev">evidence</span>
            <span className="pv-sentryd__conf">conf</span>
          </div>
          <div className="pv-sentryd__rows">
            {feed.items.map((a, i) => (
              <div
                key={a.id}
                className={`pv-sentryd__row pv-sentryd__row--s${i} pv-sentryd__row--${a.sev}${a.live ? ' pv-sentryd__row--new' : ''}`}
              >
                <span className="pv-sentryd__time">{a.time}</span>
                <span className="pv-sentryd__sev">{SEV_LABEL[a.sev]}</span>
                <span className="pv-sentryd__rule">{a.rule}</span>
                <span className="pv-sentryd__ev">{a.evidence}</span>
                <span className="pv-sentryd__conf">{a.conf}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="pv-sentryd__status">
          <span>
            pkts{' '}
            <span ref={pktsRef} className="pv-sentryd__num">
              {sim.pkts0}
            </span>
          </span>
          <span>
            alerts <span className="pv-sentryd__num">{feed.total}</span>
          </span>
          <span className="pv-sentryd__llm">
            <span className="pv-sentryd__llm-dot" />
            llm triage: explain-only
          </span>
        </div>
      </div>
    </div>
  )
}
