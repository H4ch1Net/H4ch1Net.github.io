import { memo, useCallback, useEffect, useRef, useState } from 'react'
import useInView from '../../lib/useInView'
import useReducedMotion from '../../lib/useReducedMotion'
import './previews.css'
import './SwitchPreview.css'

// switch-vis preview: a Catalyst-style 48-port front panel whose link LEDs
// flicker with traffic, an inspector for the selected port (auto-cycles, hover
// pins it) under a 5 s SNMP poll indicator, and a status legend with counts.

const CYCLE_MS = 1800
const RESUME_MS = 2500
const POLL_S = 5
const HOME = 14

// Ports 1-48 in blocks of 12. a ap, p phone, w workstation, r printer,
// c camera, m ups/pdu, - no link, x admin down, e err-disabled.
const LAYOUT = 'aappwwpp-wrw' + 'ppwwppw-ccxw' + 'aappwwewpp-w' + 'rwpwm-m-cx--'

const VLANS = { 10: '10 · data', 20: '20 · voice', 30: '30 · wifi', 99: '99 · mgmt' }
const AGES = ['12d 07h', '6h 12m', '3d 04h', '27d 02h', '1d 19h', '9d 15h', '41d 06h', '2h 47m', '18d 11h']
const NAMES = {
  1: 'ap-2b-east',
  2: 'ap-2b-west',
  25: 'ap-2b-north',
  26: 'ap-2b-south',
  11: 'printer-2b',
  37: 'printer-2b-2',
  21: 'cam-lobby-2',
  22: 'cam-lobby-1',
  45: 'cam-stair-2b',
  41: 'ups-idf-2b',
  43: 'pdu-idf-2b',
}
// Activity rhythm per device kind, rotated by port number (0 = steady link).
const RHYTHMS = { a: [4, 1], p: [5, 0, 6], w: [1, 3, 2, 0, 6], r: [0, 5], c: [4, 6], m: [0, 5] }
const KINDS = {
  a: { vlan: 30, cls: 4, watts: n => 13.6 + (n % 4) * 0.9 },
  p: { vlan: 20, cls: 2, watts: n => (n === HOME ? 6.4 : 4.2 + ((n * 7) % 10) / 5) },
  w: { vlan: 10 },
  r: { vlan: 10, speed: '100 / full', svc: 9100 },
  c: { vlan: 10, cls: 3, speed: '100 / full', svc: 554, watts: n => 6.2 + (n % 3) * 0.7 },
  m: { vlan: 99, speed: '100 / full' },
}

function accessPort(code, i) {
  const n = i + 1
  const base = {
    id: n,
    name: `Gi1/0/${n}`,
    row: n % 2 ? 'top' : 'bot',
    state: 'up',
    vlan: VLANS[10],
    speed: 'auto / auto',
    watts: 0,
    cls: 0,
    desc: '—',
    age: AGES[(n * 4) % AGES.length],
    rhythm: 0,
    phase: (n * 5) % 4,
    ip: '',
  }
  if (code === '-') return { ...base, state: 'off' }
  if (code === 'x') return { ...base, state: 'admin', desc: 'unused', age: '41d 06h' }
  if (code === 'e') {
    return { ...base, state: 'err', desc: `ws-2b-${99 + n}`, age: '14m', cause: 'bpduguard' }
  }
  const kind = KINDS[code]
  const rhythms = RHYTHMS[code]
  return {
    ...base,
    vlan: VLANS[kind.vlan],
    speed: kind.speed || '1000 / full',
    watts: kind.watts ? kind.watts(n) : 0,
    cls: kind.cls || 0,
    desc: NAMES[n] || (code === 'p' ? `phone-x${4007 + n}` : `ws-2b-${99 + n}`),
    rhythm: rhythms[n % rhythms.length],
    ip: `10.${kind.vlan}.2.${n + 10}`,
    svc: kind.svc,
  }
}

const ACCESS = [...LAYOUT].map(accessPort)

const UPLINKS = [1, 2, 3, 4].map(u => {
  const up = u <= 2
  const peer = u === 1 ? 'a' : 'b'
  return {
    id: 48 + u,
    name: `Te1/1/${u}`,
    row: u % 2 ? 'top' : 'bot',
    state: up ? 'up' : 'off',
    vlan: 'trunk · 4 vlans',
    speed: up ? '10G / full' : 'auto / auto',
    watts: 0,
    cls: 0,
    noPoe: true,
    desc: up ? `uplink-core-${peer}` : '—',
    age: '41d 06h',
    rhythm: up ? (u === 1 ? 4 : 2) : 0,
    phase: u,
    peer: up ? `core-${peer}` : '',
  }
})

const PORTS = {}
for (const p of [...ACCESS, ...UPLINKS]) PORTS[p.id] = p

// Each block lists its top row (odd ports) then its bottom row (even ports).
const BLOCKS = [0, 1, 2, 3].map(b => {
  const ports = ACCESS.slice(b * 12, b * 12 + 12)
  return [...ports.filter(p => p.row === 'top'), ...ports.filter(p => p.row === 'bot')]
})
// SFP cages sit 2 x 2: Te1/1/1 and 1/1/3 on top, 1/1/2 and 1/1/4 below.
const SFP_ORDER = [UPLINKS[0], UPLINKS[2], UPLINKS[1], UPLINKS[3]]

// Mostly connected ports, with the odd err-disabled, admin-down and uplink.
const TOUR = [14, 25, 5, 31, 37, 49, 21, 10, 46, 33, 2, 43, 18, 50, 29, 26]

const STATUS = { up: 'connected', err: 'err-disabled', admin: 'admin down', off: 'no link' }
const COUNTS = Object.values(PORTS).reduce((acc, p) => ({ ...acc, [p.state]: acc[p.state] + 1 }), {
  up: 0,
  err: 0,
  admin: 0,
  off: 0,
})

function portClass(p, selected) {
  let c = `pv-switch__port pv-switch__port--${p.row} pv-switch__port--${p.state}`
  if (p.rhythm) c += ` pv-switch__port--r${p.rhythm}`
  if (p.rhythm && p.phase) c += ` pv-switch__port--d${p.phase}`
  if (p.watts) c += ' pv-switch__port--poe'
  if (selected) c += ' pv-switch__port--sel'
  return c
}

function poeText(p, cycle) {
  if (p.noPoe) return 'n/a'
  if (!p.watts) return '0.0 W · off'
  const jitter = cycle ? ((cycle * 7 + p.id) % 3) - 1 : 0
  return `${(p.watts + jitter * 0.1).toFixed(1)} W · class ${p.cls}`
}

function lastRow(p) {
  if (p.cause) return ['cause', p.cause]
  if (p.id > 48) return ['cdp', p.peer ? `${p.peer} Te1/0/1` : '—']
  return ['ip', p.ip || '—']
}

// Poll log: an IF-MIB walk every poll, plus a tool probe of whichever port
// is selected in between. Clock starts at 14:02:00, newest entry first.
const LOG_MAX = 8
const T0 = 14 * 3600 + 2 * 60

function clock(t) {
  const s = T0 + t
  return [s / 3600, (s / 60) % 60, s % 60].map(v => String(Math.floor(v)).padStart(2, '0')).join(':')
}

function walk(k) {
  return { tool: 'walk', text: `if-mib · 52 ifs · ${172 + ((k * 37) % 41)} ms` }
}

function probe(p, t) {
  if (p.state !== 'up') return null
  if (p.peer) return { tool: 'trace', text: `${p.peer} · 1 hop · 0.4 ms` }
  const k = Math.floor(t / (POLL_S * 2)) % (p.svc ? 4 : 3)
  if (k === 0) return { tool: 'ping', text: `${p.ip} · 4/4 · ${(0.5 + ((p.id * 7 + t) % 9) / 10).toFixed(1)} ms` }
  if (k === 1) return { tool: 'arp', text: `${p.ip} → ${p.name}` }
  if (k === 2) return { tool: 'dns', text: `${p.desc} → ${p.ip}` }
  return { tool: 'tcp', text: `${p.ip}:${p.svc} · open` }
}

const SEED_LOG = [
  { id: 0, t: 0, ...walk(0) },
  { id: -1, t: -2, tool: 'ping', text: '10.20.2.24 · 4/4 · 0.8 ms' },
  { id: -2, t: -5, ...walk(3) },
  { id: -3, t: -10, ...walk(5) },
  { id: -4, t: -12, tool: 'dns', text: 'ap-2b-east → 10.30.2.11' },
  { id: -5, t: -15, ...walk(8) },
  { id: -6, t: -20, ...walk(2) },
  { id: -7, t: -25, ...walk(6) },
]

const Port = memo(function Port({ port, selected }) {
  return (
    <div className={portClass(port, selected)} data-port={port.id}>
      <span className="pv-switch__led" />
      <span className="pv-switch__jack" />
    </div>
  )
})

const Sfp = memo(function Sfp({ port, selected }) {
  return (
    <div className={`${portClass(port, selected)} pv-switch__port--sfp`} data-port={port.id}>
      <span className="pv-switch__led" />
      <span className="pv-switch__cage" />
    </div>
  )
})

const Faceplate = memo(function Faceplate({ sel, onOver, onLeave }) {
  return (
    <div className="pv-switch__face" onPointerOver={onOver} onPointerLeave={onLeave}>
      <span className="pv-switch__ear pv-switch__ear--l" />
      <div className="pv-switch__sys">
        <span className="pv-switch__model">C9300-48P</span>
        <div className="pv-switch__sysleds">
          {['SYST', 'STAT', 'PoE'].map(l => (
            <span className="pv-switch__sysled" key={l}>
              <span className="pv-switch__lamp" />
              <span className="pv-switch__sysled-label">{l}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="pv-switch__ports">
        {BLOCKS.map((block, b) => (
          <div className="pv-switch__block" key={b}>
            <span className="pv-switch__num pv-switch__num--tl">{b * 12 + 1}</span>
            <span className="pv-switch__num pv-switch__num--tr">{b * 12 + 11}</span>
            {block.map(p => (
              <Port key={p.id} port={p} selected={p.id === sel} />
            ))}
            <span className="pv-switch__num pv-switch__num--bl">{b * 12 + 2}</span>
            <span className="pv-switch__num pv-switch__num--br">{b * 12 + 12}</span>
          </div>
        ))}
      </div>
      <div className="pv-switch__uplinks">
        <span className="pv-switch__uplinks-label">10G SFP+</span>
        <div className="pv-switch__sfps">
          {SFP_ORDER.map(p => (
            <Sfp key={p.id} port={p} selected={p.id === sel} />
          ))}
        </div>
      </div>
      <span className="pv-switch__ear pv-switch__ear--r" />
    </div>
  )
})

function Inspector({ port, live, reduced }) {
  const [tick, setTick] = useState(0)
  const [log, setLog] = useState(SEED_LOG)
  const tickRef = useRef(0)
  const portRef = useRef(port)

  useEffect(() => {
    portRef.current = port
  }, [port])

  // One clock drives the poll bar, the "polled Ns ago" label and the log.
  useEffect(() => {
    if (!live) return
    const id = setInterval(() => {
      const t = ++tickRef.current
      setTick(t)
      let entry = null
      if (t % POLL_S === 0) entry = walk(t / POLL_S)
      else if (t % (POLL_S * 2) === 3) entry = probe(portRef.current, t)
      if (entry) setLog(l => [{ id: t, t, ...entry }, ...l.slice(0, LOG_MAX - 1)])
    }, 1000)
    return () => clearInterval(id)
  }, [live])

  const age = reduced ? 2 : tick % POLL_S
  const cycle = Math.floor(tick / POLL_S)
  const rows = [
    ['vlan', port.vlan],
    ['speed', port.speed],
    ['poe', poeText(port, cycle)],
    ['desc', port.desc],
    ['last chg', port.age],
    lastRow(port),
  ]

  return (
    <div className="pv-switch__insp">
      <span className="pv-switch__poll">
        <span
          key={reduced ? 'static' : cycle}
          className={`pv-switch__poll-fill${reduced ? ' pv-switch__poll-fill--static' : ''}`}
        />
      </span>
      <span className="pv-switch__polled">polled {age}s ago</span>
      <div className="pv-switch__detail" key={port.id}>
        <div className="pv-switch__insp-head">
          <span className="pv-switch__ifname">{port.name}</span>
          <span className="pv-switch__state">
            <span className={`pv-switch__dot pv-switch__dot--${port.state}`} />
            {STATUS[port.state]}
          </span>
        </div>
        <div className="pv-switch__kv">
          {rows.map(([k, v], i) => (
            <div className={`pv-switch__kv-row${i > 3 ? ' pv-switch__kv-row--opt' : ''}`} key={k}>
              <span className="pv-switch__k">{k}</span>
              <span className="pv-switch__v">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="pv-switch__log">
        <span className="pv-switch__log-head">poll log</span>
        <div className="pv-switch__log-list" key={log[0].id}>
          {log.map(e => (
            <div className="pv-switch__log-line" key={e.id}>
              <span className="pv-switch__log-time">{clock(e.t)}</span>
              <span className="pv-switch__log-tool">{e.tool}</span>
              <span className="pv-switch__log-text">{e.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Legend() {
  return (
    <div className="pv-switch__legend">
      {Object.entries(STATUS).map(([state, label]) => (
        <span className="pv-switch__legend-item" key={state}>
          <span className={`pv-switch__dot pv-switch__dot--${state}`} />
          {label}
        </span>
      ))}
      <span className="pv-switch__counts">
        {COUNTS.up} up · {COUNTS.err} err · {COUNTS.admin} down
      </span>
    </div>
  )
}

export default function SwitchPreview() {
  const rootRef = useRef(null)
  const inView = useInView(rootRef, { rootMargin: '100px' })
  const reduced = useReducedMotion()
  const live = inView && !reduced
  const [sel, setSel] = useState(HOME)
  const timerRef = useRef(0)
  const tourRef = useRef(0)
  const hoverRef = useRef(false)
  const liveRef = useRef(false)

  const schedule = useCallback(delay => {
    clearTimeout(timerRef.current)
    const step = () => {
      tourRef.current = (tourRef.current + 1) % TOUR.length
      setSel(TOUR[tourRef.current])
      timerRef.current = setTimeout(step, CYCLE_MS)
    }
    timerRef.current = setTimeout(step, delay)
  }, [])

  useEffect(() => {
    liveRef.current = live
    if (live && !hoverRef.current) schedule(CYCLE_MS)
    return () => clearTimeout(timerRef.current)
  }, [live, schedule])

  // Only a real mouse hover pins a port; taps on touch screens are ignored.
  const onOver = useCallback(e => {
    const el = e.pointerType === 'mouse' && e.target.closest('[data-port]')
    if (!el) return
    hoverRef.current = true
    clearTimeout(timerRef.current)
    setSel(Number(el.dataset.port))
  }, [])

  const onLeave = useCallback(() => {
    if (!hoverRef.current) return
    hoverRef.current = false
    if (liveRef.current) schedule(RESUME_MS)
  }, [schedule])

  return (
    <div ref={rootRef} className={`pv pv-switch${live ? '' : ' pv-switch--paused'}`} aria-hidden="true">
      <div className="pv-head">
        <span className="pv-head__title">
          <span className="pv-dot" />
          switch-vis · idf-2b / sw-01
        </span>
        <span className="pv-head__meta">
          <span>snmp v2c</span>
          <span className="pv-head__meta--optional">poll {POLL_S}s</span>
        </span>
      </div>
      <div className="pv-body pv-switch__body">
        <Faceplate sel={sel} onOver={onOver} onLeave={onLeave} />
        <Inspector port={PORTS[sel]} live={live} reduced={reduced} />
        <Legend />
      </div>
    </div>
  )
}
