import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  CodeIcon,
  CopyIcon,
  GitHubMark,
  HashIcon,
  LinkedInMark,
  MailIcon,
  SearchIcon,
} from './Icons'
import './CommandPalette.css'

// Cmd/Ctrl+K command menu. Items are { id, group, label, hint?, keywords?,
// icon, run }. Filtering is a small fuzzy match: contiguous hits rank above
// scattered subsequence hits, and an empty query keeps the given order.

const ICONS = {
  section: HashIcon,
  project: ArrowRight,
  external: ArrowUpRight,
  copy: CopyIcon,
  mail: MailIcon,
  github: GitHubMark,
  linkedin: LinkedInMark,
  code: CodeIcon,
}

function matchScore(query, text) {
  if (!query) return 0
  const q = query.toLowerCase()
  const t = text.toLowerCase()
  const at = t.indexOf(q)
  if (at !== -1) return 1000 - at
  let from = 0
  let gaps = 0
  for (const ch of q) {
    const found = t.indexOf(ch, from)
    if (found === -1) return null
    gaps += found - from
    from = found + 1
  }
  return 500 - gaps
}

export default function CommandPalette({ open, onClose, items }) {
  const [mounted, setMounted] = useState(open)
  const [shown, setShown] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const returnFocusRef = useRef(null)

  useEffect(() => {
    if (open) {
      returnFocusRef.current = document.activeElement
      setMounted(true)
      setQuery('')
      setActive(0)
      const raf = requestAnimationFrame(() => setShown(true))
      const prevOverflow = document.documentElement.style.overflow
      document.documentElement.style.overflow = 'hidden'
      return () => {
        cancelAnimationFrame(raf)
        document.documentElement.style.overflow = prevOverflow
      }
    }
    setShown(false)
    const timer = setTimeout(() => setMounted(false), 180)
    const target = returnFocusRef.current
    returnFocusRef.current = null
    if (target && typeof target.focus === 'function' && document.contains(target)) target.focus()
    return () => clearTimeout(timer)
  }, [open])

  useEffect(() => {
    if (mounted && open) inputRef.current?.focus()
  }, [mounted, open])

  const results = useMemo(() => {
    const q = query.trim()
    if (!q) return items
    return items
      .map((item, order) => {
        const label = matchScore(q, item.label)
        const extra = matchScore(q, `${item.hint ?? ''} ${item.keywords ?? ''} ${item.group}`)
        const score = Math.max(label ?? -Infinity, extra == null ? -Infinity : extra - 300)
        return { item, order, score }
      })
      .filter(r => r.score > -Infinity)
      .sort((a, b) => b.score - a.score || a.order - b.order)
      .map(r => r.item)
  }, [items, query])

  useEffect(() => {
    setActive(0)
  }, [query])

  useEffect(() => {
    const el = listRef.current?.querySelector('[aria-selected="true"]')
    el?.scrollIntoView({ block: 'nearest' })
  }, [active, results])

  if (!mounted) return null

  const run = item => {
    if (!item) return
    onClose()
    // Let the scroll lock release before navigating.
    requestAnimationFrame(() => item.run())
  }

  const onKeyDown = e => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive(i => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive(i => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(results[active])
    } else if (e.key === 'Tab') {
      e.preventDefault()
    }
  }

  const grouped = !query.trim()
  const activeId = results[active] ? `cmdk-${results[active].id}` : undefined

  return (
    <div
      className={`cmdk${shown ? ' cmdk--open' : ''}`}
      onMouseDown={e => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="cmdk__panel" role="dialog" aria-modal="true" aria-label="Command menu" onKeyDown={onKeyDown}>
        <div className="cmdk__search">
          <SearchIcon size={18} className="cmdk__search-icon" />
          <input
            ref={inputRef}
            className="cmdk__input"
            type="text"
            placeholder="Jump to a section, open a project, copy my email..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-list"
            aria-activedescendant={activeId}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck="false"
          />
          <kbd className="cmdk__kbd">esc</kbd>
        </div>
        <ul className="cmdk__list" id="cmdk-list" role="listbox" ref={listRef} aria-label="Commands">
          {results.length === 0 && <li className="cmdk__empty">No matches for &ldquo;{query}&rdquo;</li>}
          {results.map((item, i) => {
            const Icon = ICONS[item.icon] ?? ArrowRight
            const showGroup = grouped && (i === 0 || results[i - 1].group !== item.group)
            return [
              showGroup && (
                <li key={`g-${item.group}`} className="cmdk__group" role="presentation">
                  {item.group}
                </li>
              ),
              <li
                key={item.id}
                id={`cmdk-${item.id}`}
                role="option"
                aria-selected={i === active}
                className={`cmdk__item${i === active ? ' cmdk__item--active' : ''}`}
                onMouseMove={() => i !== active && setActive(i)}
                onClick={() => run(item)}
              >
                <span className="cmdk__icon">
                  <Icon size={16} />
                </span>
                <span className="cmdk__label">{item.label}</span>
                {item.hint && <span className="cmdk__hint">{item.hint}</span>}
              </li>,
            ]
          })}
        </ul>
        <div className="cmdk__foot" aria-hidden="true">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>↵</kbd> select
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  )
}
