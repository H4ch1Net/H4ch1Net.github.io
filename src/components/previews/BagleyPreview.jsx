import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import useInView from '../../lib/useInView'
import useReducedMotion from '../../lib/useReducedMotion'
import './previews.css'
import './BagleyPreview.css'

// Product preview for Bagley, the voice- and text-driven ops assistant. A
// four-stage pipeline (interface → router → executor → llm) lights up as
// control moves through it, above a looping transcript of scripted exchanges:
// a listening waveform or typed ask, the SSH/scan route it resolves to, and a
// reply streamed word by word.

const STAGES = [
  { name: 'interface', sub: 'voice · text' },
  { name: 'router', sub: 'intent → command' },
  { name: 'executor', sub: 'ssh · scan · diag' },
  { name: 'llm', sub: 'summarize' },
]

// *figure* marks the token a reply emphasises; \u00a0 keeps a figure one word.
const EXCHANGES = [
  {
    mode: 'voice',
    ask: 'scan the lab subnet and tell me what’s up',
    route: 'net.scan 10.0.20.0/24',
    took: '2.3s',
    runFor: 850,
    reply: '*14\u00a0hosts* up. Two have SSH open, and nothing’s new since yesterday’s scan.',
  },
  {
    mode: 'text',
    ask: 'check disk on lab-01',
    route: 'ssh lab-01 · df -h /',
    took: '0.4s',
    runFor: 550,
    reply: 'Root is at *71%* with about *38\u00a0GB* free. No action needed.',
  },
  {
    mode: 'voice',
    ask: 'why is lab-02 slow?',
    route: 'ssh lab-02 · top -b -n 1',
    took: '0.7s',
    runFor: 700,
    reply: 'A backup job is pinning the CPU at *92%*. Want me to renice it?',
  },
].map(ex => ({
  ...ex,
  words: ex.reply.split(' ').map(word => {
    const m = /^\*(.+)\*(.*)$/.exec(word)
    return m ? { em: m[1], tail: m[2] } : { em: '', tail: word }
  }),
}))

// Bar heights (levels 1-6) for the listening waveform, shaped like a phrase.
const WAVE = [3, 4, 5, 4, 6, 5, 3, 4, 6, 6, 5, 3, 2, 4, 5, 6, 4, 3, 5, 4, 3, 2, 1, 1]

// Between asks every stage reads as done (path lit, nothing active).
const IDLE = STAGES.length
// The log never clears; rows this far back are long gone under the top mask.
const KEEP = 18

const INITIAL = { lines: [], stage: -1, loop: 0, events: 12 }

// Line keys carry the loop number so each pass of the script mounts fresh rows.
const add = line => s => ({
  ...s,
  lines: [...s.lines, { ...line, key: `${s.loop}-${line.id}` }].slice(-KEEP),
  events: s.events + 1,
})
const patch = (id, next) => s => ({
  ...s,
  lines: s.lines.map(l => (l.key === `${s.loop}-${id}` ? { ...l, ...next } : l)),
})
const toStage = stage => s => ({ ...s, stage })
const chain =
  (...fns) =>
  s =>
    fns.reduce((acc, fn) => fn(acc), s)
// A new pass dims the previous conversation, which then scrolls away.
const nextLoop = s => ({ ...s, loop: s.loop + 1, lines: s.lines.map(l => (l.old ? l : { ...l, old: true })) })

// Flattens the exchanges into timed steps: `wait` ms, then apply `run`.
// `starts[i]` is the index of exchange i's first step.
function buildScript() {
  const steps = []
  const starts = []
  const at = (wait, run) => steps.push({ wait, run })

  EXCHANGES.forEach((ex, i) => {
    const ask = `${i}-ask`
    const route = `${i}-route`
    const reply = `${i}-reply`
    starts.push(steps.length)

    if (ex.mode === 'voice') {
      at(450, chain(toStage(0), add({ id: ask, ex: i, kind: 'ask', phase: 'listen' })))
      at(1150, patch(ask, { phase: 'final' }))
    } else {
      at(450, chain(toStage(0), add({ id: ask, ex: i, kind: 'ask', phase: 'type', count: 0 })))
      for (let c = 1; c <= ex.ask.length; c++) {
        at(c === 1 ? 220 : 22 + ((c * 13) % 17), patch(ask, { count: c }))
      }
      at(320, patch(ask, { phase: 'final' }))
    }
    at(420, toStage(1))
    at(440, chain(toStage(2), add({ id: route, ex: i, kind: 'route', phase: 'run' })))
    at(ex.runFor, patch(route, { phase: 'done' }))
    at(260, chain(toStage(3), add({ id: reply, ex: i, kind: 'reply', phase: 'think', count: 0 })))
    ex.words.forEach((_, k) => {
      at(k === 0 ? 440 : 35 + ((k * 7) % 11), patch(reply, { phase: 'stream', count: k + 1 }))
    })
    // Long enough for the idle caret to blink out rather than pop off.
    at(600, patch(reply, { phase: 'done' }))
    at(250, toStage(IDLE))
  })
  at(1600, nextLoop)
  return { steps, starts }
}

const { steps: SCRIPT, starts: STARTS } = buildScript()
const replay = count => SCRIPT.slice(0, count).reduce((s, step) => step.run(s), INITIAL)

// First paint already shows exchange 1 complete, so the panel is never blank;
// the live script picks up at exchange 2.
const OPENING = replay(STARTS[1])
// Reduced motion: exchanges 1 and 2 complete, exchange 3 listening.
const STILL = replay(STARTS[2] + 1)

function MicGlyph() {
  return (
    <svg className="pv-bagley__glyph" viewBox="0 0 12 12">
      <rect x="4.25" y="1" width="3.5" height="6.25" rx="1.75" />
      <path d="M2.5 5.75a3.5 3.5 0 0 0 7 0M6 9.25V11" />
    </svg>
  )
}

function KeysGlyph() {
  return (
    <svg className="pv-bagley__glyph" viewBox="0 0 12 12">
      <rect x="0.75" y="2.5" width="10.5" height="7" rx="1.5" />
      <path d="M3 4.9h.01M4.98 4.9h.01M7.02 4.9h.01M9 4.9h.01M3.75 7.2h4.5" />
    </svg>
  )
}

function Line({ line }) {
  const ex = EXCHANGES[line.ex]
  const rowClass = `pv-bagley__row pv-bagley__row--${line.kind}${line.old ? ' pv-bagley__row--old' : ''}`

  if (line.kind === 'route') {
    return (
      <div className={rowClass}>
        <span className="pv-bagley__route">
          <span className="pv-bagley__arrow">→</span>
          <span className="pv-bagley__verb">route</span>
          <span className="pv-bagley__cmd">{ex.route}</span>
          <span className={`pv-bagley__status pv-bagley__status--${line.phase}`}>
            <span className="pv-bagley__status-dot" />
            {line.phase === 'run' ? 'running' : `ok ${ex.took}`}
          </span>
        </span>
      </div>
    )
  }

  // The whole reply is laid out up front and revealed word by word, so line
  // breaks never shift mid-stream. The caret hangs off a zero-width anchor
  // beside the newest word (outside its fade-in) and takes no space itself;
  // each word and its anchor share a no-wrap box, because an absolutely
  // positioned child would otherwise add a line-break opportunity.
  if (line.kind === 'reply') {
    const streaming = line.phase !== 'done'
    const caret = lead => (
      <span className={`pv-bagley__anchor${lead ? ' pv-bagley__anchor--lead' : ''}`}>
        <span className="pv-bagley__caret" />
      </span>
    )
    return (
      <div className={rowClass}>
        <span className="pv-bagley__tag">
          <span className="pv-bagley__mark">
            <span className="pv-bagley__bot" />
          </span>
          bagley<span className="pv-bagley__chev">›</span>
        </span>
        <span className="pv-bagley__reply">
          {ex.words.map((w, k) => (
            <Fragment key={k}>
              {k > 0 && ' '}
              <span className="pv-bagley__slot">
                {streaming && !k && !line.count && caret(true)}
                <span className={`pv-bagley__word${k < line.count ? '' : ' pv-bagley__word--hidden'}`}>
                  {w.em && <span className="pv-bagley__em">{w.em}</span>}
                  {w.tail}
                </span>
                {streaming && k === line.count - 1 && caret(false)}
              </span>
            </Fragment>
          ))}
        </span>
      </div>
    )
  }

  const voice = ex.mode === 'voice'
  return (
    <div className={rowClass}>
      <span className="pv-bagley__tag">
        <span className="pv-bagley__mark">{voice ? <MicGlyph /> : <KeysGlyph />}</span>
        you<span className="pv-bagley__chev">›</span>
      </span>
      <span className={`pv-bagley__ask pv-bagley__ask--${line.phase}`}>
        <span className="pv-bagley__said">
          {line.phase === 'type' ? (
            <>
              <span className="pv-bagley__typed">
                {ex.ask.slice(0, line.count)}
                <span className="pv-bagley__ibeam" />
              </span>
              <span className="pv-bagley__ghost">{ex.ask.slice(line.count)}</span>
            </>
          ) : (
            ex.ask
          )}
        </span>
        {voice && (
          <span className="pv-bagley__wave">
            <span className="pv-bagley__bars">
              {WAVE.map((level, k) => (
                <span key={k} className={`pv-bagley__bar pv-bagley__bar--l${level}`} />
              ))}
            </span>
            <span className="pv-bagley__listening">
              <span className="pv-bagley__rec" />
              listening
            </span>
          </span>
        )}
      </span>
    </div>
  )
}

// Notes where the newest transcript row sits, or nothing while the panel has
// no layout (display: none somewhere above it), so hidden mounts never measure.
function remember(list, g) {
  g.row = list.offsetParent ? list.lastElementChild : null
  g.y = g.row ? list.offsetTop + g.row.offsetTop : 0
}

function nodeClass(i, stage) {
  if (i === stage) return 'pv-bagley__node pv-bagley__node--active'
  if (i < stage) return 'pv-bagley__node pv-bagley__node--past'
  return 'pv-bagley__node'
}

export default function BagleyPreview() {
  const rootRef = useRef(null)
  const listRef = useRef(null)
  const reduced = useReducedMotion()
  const inView = useInView(rootRef, { rootMargin: '100px' })
  const live = inView && !reduced
  const [state, setState] = useState(OPENING)
  const [clock, setClock] = useState(42)
  const cursor = useRef({ index: STARTS[1], remaining: null })
  const glide = useRef({ row: null, y: 0, lines: null })
  const view = reduced ? STILL : state

  // One timeout at a time; leaving the viewport keeps the remaining delay so
  // the script resumes exactly where it stopped.
  useEffect(() => {
    if (!live) return
    const c = cursor.current
    let timer = 0
    let due = 0
    const schedule = ms => {
      due = performance.now() + ms
      timer = setTimeout(() => {
        setState(SCRIPT[c.index].run)
        c.index = (c.index + 1) % SCRIPT.length
        schedule(SCRIPT[c.index].wait)
      }, ms)
    }
    schedule(c.remaining ?? SCRIPT[c.index].wait)
    const tick = setInterval(() => setClock(t => t + 1), 1000)
    return () => {
      clearTimeout(timer)
      clearInterval(tick)
      c.remaining = Math.max(0, due - performance.now())
    }
  }, [live])

  // When new lines push the log upward, start the list where it was and glide
  // it into place (FLIP on transform), so older lines never jump. The previous
  // newest row is the reference: pruning rows far above the fold resizes the
  // list without moving anything visible, so measuring the list would lie.
  // Glides compose additively, so an overlapping one needs no read-back.
  useLayoutEffect(() => {
    const list = listRef.current
    const g = glide.current
    const { row, y } = g
    const changed = g.lines !== view.lines
    g.lines = view.lines
    remember(list, g)
    if (!changed || !row?.isConnected || !g.row || reduced || !list.animate) return
    const shift = y - (list.offsetTop + row.offsetTop)
    if (!Number.isFinite(shift) || Math.abs(shift) < 0.5 || Math.abs(shift) > list.parentElement.clientHeight) return
    list.animate([{ transform: `translateY(${shift}px)` }, { transform: 'translateY(0)' }], {
      duration: 560,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      composite: 'add',
    })
  })

  // A reflow without a commit (resize, late font load, layout settling while
  // offscreen) refreshes the reference instead of reading as movement later.
  useEffect(() => {
    const list = listRef.current
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => remember(list, glide.current))
    observer.observe(list)
    observer.observe(list.parentElement)
    return () => observer.disconnect()
  }, [])

  const mm = String(Math.floor(clock / 60) % 100).padStart(2, '0')
  const ss = String(clock % 60).padStart(2, '0')

  return (
    <div ref={rootRef} className={`pv pv-bagley${live ? '' : ' pv-bagley--paused'}`} aria-hidden="true">
      <div className="pv-head">
        <span className="pv-head__title">
          <span className="pv-dot" />
          bagley · ops assistant
        </span>
        <span className="pv-head__meta">
          <span>voice + text</span>
          <span className="pv-head__meta--optional pv-bagley__sep">·</span>
          <span className="pv-head__meta--optional">ssh</span>
        </span>
      </div>
      <div className="pv-body pv-bagley__body">
        <div className="pv-bagley__pipe">
          {STAGES.map((st, i) => (
            <Fragment key={st.name}>
              {i > 0 && (
                <span className={`pv-bagley__link${view.stage >= i ? ' pv-bagley__link--done' : ''}`}>
                  <span className="pv-bagley__spark" />
                </span>
              )}
              <span className={nodeClass(i, view.stage)}>
                <span className="pv-bagley__node-name">
                  <span className="pv-bagley__node-dot" />
                  {st.name}
                </span>
                <span className="pv-bagley__node-sub">{st.sub}</span>
              </span>
            </Fragment>
          ))}
        </div>
        <div className="pv-bagley__log">
          <div ref={listRef} className="pv-bagley__list">
            {view.lines.map(line => (
              <Line key={line.key} line={line} />
            ))}
          </div>
        </div>
        <div className="pv-bagley__foot">
          <span className="pv-bagley__stat">
            session{' '}
            <span className="pv-bagley__val">
              {mm}:{ss}
            </span>
          </span>
          <span className="pv-bagley__stat pv-bagley__stat--push">
            hosts <span className="pv-bagley__val">3</span>
          </span>
          <span className="pv-bagley__stat">
            events <span className="pv-bagley__val">{view.events}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
