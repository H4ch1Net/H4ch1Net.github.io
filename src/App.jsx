import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import NetworkSphere from './components/NetworkSphere'
import CommandPalette from './components/CommandPalette'
import CountUp from './components/CountUp'
import SpotlightCard from './components/SpotlightCard'
import SentrydPreview from './components/previews/SentrydPreview'
import SwitchPreview from './components/previews/SwitchPreview'
import ArgusPreview from './components/previews/ArgusPreview'
import BagleyPreview from './components/previews/BagleyPreview'
import {
  ArrowRight,
  ArrowUpRight,
  CheckIcon,
  CloseIcon,
  CodeIcon,
  CopyIcon,
  GitHubMark,
  LinkedInMark,
  MailIcon,
  MenuIcon,
  ProjectGlyph,
  SearchIcon,
  StackIcon,
} from './components/Icons'
import useClock from './lib/useClock'
import useInView from './lib/useInView'
import useRevealOnScroll from './lib/useRevealOnScroll'
import useScrollProgress from './lib/useScrollProgress'
import useScrollSpy from './lib/useScrollSpy'
import { loadLogs } from './lib/loadLogs'
import {
  ABOUT,
  CERTS,
  CERTS_IN_PROGRESS,
  COMPETITIONS,
  CONTACT,
  EMPLOYER,
  EXPERIENCE,
  FEATURED,
  HERO,
  HONORS,
  HUD,
  LEADERSHIP,
  MARQUEE,
  METRICS,
  NAV,
  NCL_SEASONS,
  PROFILE,
  PROJECTS,
  STACK,
} from './content/site'

const LOGS = loadLogs()
const NAV_ITEMS = NAV.filter(item => item.id !== 'logs' || LOGS.length > 0)
const SECTION_IDS = NAV_ITEMS.map(item => item.id)
const PREVIEWS = {
  sentryd: SentrydPreview,
  'switch-vis': SwitchPreview,
  argus: ArgusPreview,
  bagley: BagleyPreview,
}
const IS_MAC =
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent)
const EXTERNAL = { target: '_blank', rel: 'noopener noreferrer' }

function prefersReducedMotion() {
  return Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
}

function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', id === 'top' ? location.pathname : `#${id}`)
}

// onClick for in-page anchors: smooth scroll (unless reduced motion) without
// the browser's instant hash jump.
function jumpTo(id) {
  return e => {
    e.preventDefault()
    scrollToId(id)
  }
}

function openExternal(href) {
  window.open(href, '_blank', 'noopener,noreferrer')
}

const clockFormats = new Map()

function formatClock(date, timeZone) {
  let format = clockFormats.get(timeZone)
  if (!format) {
    format = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
      timeZoneName: 'short',
    })
    clockFormats.set(timeZone, format)
  }
  const parts = format.formatToParts(date)
  const get = type => parts.find(p => p.type === type)?.value ?? ''
  const hours = Number(get('hour'))
  const minutes = Number(get('minute'))
  return {
    hm: `${get('hour')}:${get('minute')}`,
    seconds: get('second'),
    zone: get('timeZoneName'),
    dayFraction: (hours * 60 + minutes) / 1440,
  }
}

function daysSince(iso) {
  return Math.floor((Date.now() - Date.parse(iso)) / 86400000)
}

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function SectionHeader({ id, index, kicker, title, aside }) {
  return (
    <header className="section-head" data-reveal="">
      <p className="section-head__kicker">
        <span className="section-head__index">{index}</span>
        <span className="section-head__rule" aria-hidden="true" />
        <span>{kicker}</span>
      </p>
      <div className="section-head__row">
        <h2 id={id} className="section-head__title">
          {title}
        </h2>
        {aside && <p className="section-head__aside">{aside}</p>}
      </div>
    </header>
  )
}

function Chips({ items, small = false }) {
  return (
    <ul className={`chips${small ? ' chips--sm' : ''}`}>
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

function Header({ active, onOpenPalette }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const indicatorRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      setScrolled(y > 8)
      const max = document.documentElement.scrollHeight - window.innerHeight
      progressRef.current?.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : '0')
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Slide the active-link indicator under whichever section is in view.
  useLayoutEffect(() => {
    const nav = navRef.current
    const indicator = indicatorRef.current
    if (!nav || !indicator) return
    const place = () => {
      const link = active ? nav.querySelector(`a[href="#${active}"]`) : null
      if (!link) {
        indicator.style.setProperty('--o', '0')
        return
      }
      indicator.style.setProperty('--x', `${link.offsetLeft}px`)
      indicator.style.setProperty('--w', `${link.offsetWidth}px`)
      indicator.style.setProperty('--o', '1')
    }
    place()
    document.fonts?.ready.then(place)
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [active])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = e => e.key === 'Escape' && setMenuOpen(false)
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const go = id => e => {
    e.preventDefault()
    setMenuOpen(false)
    requestAnimationFrame(() => scrollToId(id))
  }

  return (
    <>
      <header
        className={`site-header${scrolled ? ' site-header--scrolled' : ''}${menuOpen ? ' site-header--menu' : ''}`}
      >
        <div className="container site-header__inner">
          <a className="brand" href="#top" onClick={go('top')} aria-label="H4ch1.Net, back to top">
            <span className="brand__mark" aria-hidden="true">
              <CodeIcon size={15} />
              <span className="brand__dot" />
            </span>
            <span className="brand__name">
              H4ch1<span className="brand__tld">.Net</span>
            </span>
          </a>

          <nav className="site-nav" aria-label="Primary" ref={navRef}>
            {NAV_ITEMS.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={go(item.id)}
                className={active === item.id ? 'is-active' : undefined}
                aria-current={active === item.id ? 'true' : undefined}
              >
                {item.label}
              </a>
            ))}
            <span className="site-nav__indicator" ref={indicatorRef} aria-hidden="true" />
          </nav>

          <div className="site-header__actions">
            <button type="button" className="cmd-button" onClick={onOpenPalette} aria-label="Open command menu">
              <SearchIcon size={14} />
              <span className="cmd-button__label">Search</span>
              <kbd>{IS_MAC ? '⌘' : 'Ctrl'} K</kbd>
            </button>
            <button
              type="button"
              className="menu-button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(open => !open)}
            >
              {menuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
        <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      </header>

      <div id="mobile-menu" className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`}>
        <nav aria-label="Mobile">
          {NAV_ITEMS.map((item, i) => (
            <a key={item.id} href={`#${item.id}`} onClick={go(item.id)}>
              <span className="mobile-menu__index">{String(i + 1).padStart(2, '0')}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu__foot">
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          <a href={PROFILE.github} {...EXTERNAL}>
            GitHub
          </a>
          <a href={PROFILE.linkedin} {...EXTERNAL}>
            LinkedIn
          </a>
        </div>
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

// An ECG trace under the accent phrase: draws in once, then a pulse rides it.
function Heartbeat() {
  const d = 'M0 26 H232 L244 26 L252 15 L260 26 L274 26 L288 3 L304 39 L318 26 L332 26 L342 19 L352 26 H600'
  return (
    <svg className="heartbeat" viewBox="0 0 600 42" preserveAspectRatio="none" aria-hidden="true">
      <path className="heartbeat__trace" d={d} pathLength="1000" />
      <path className="heartbeat__pulse" d={d} pathLength="1000" />
    </svg>
  )
}

function Hero() {
  const now = useClock(15000)
  const clock = formatClock(now, PROFILE.timeZone)
  const uptime = daysSince(PROFILE.itSince)

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__backdrop" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">
            <span className="pulse-dot" aria-hidden="true" />
            <span className="hero__eyebrow-full">{HERO.eyebrow}</span>
            <span className="hero__eyebrow-short" aria-hidden="true">
              {HERO.eyebrowShort}
            </span>
          </p>
          <h1 id="hero-title" className="hero__title">
            {HERO.titleLines.map(line => (
              <span className="hero__line" key={line}>
                <span>{line}</span>
              </span>
            ))}
            <span className="hero__line">
              <span className="hero__accent">
                {HERO.titleAccent}
                <Heartbeat />
              </span>
            </span>
          </h1>
          <p className="hero__lede">{HERO.lede}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#work" onClick={jumpTo('work')}>
              View selected work
              <ArrowRight size={16} />
            </a>
            <a className="btn btn--ghost" href="#contact" onClick={jumpTo('contact')}>
              Get in touch
            </a>
          </div>
        </div>
        <div className="hero__visual">
          <NetworkSphere />
          <p className="hero__hint" aria-hidden="true">
            drag to rotate
          </p>
        </div>
      </div>

      <div className="container">
        <dl className="hud">
          {HUD.map(cell => (
            <div className="hud__cell" key={cell.label}>
              <dt>{cell.label}</dt>
              <dd>
                <span className="hud__value">{cell.value}</span>
                <span className="hud__sub">{cell.sub}</span>
              </dd>
            </div>
          ))}
          <div className="hud__cell">
            <dt>Local time</dt>
            <dd>
              <span className="hud__value hud__value--mono">
                {clock.hm} {clock.zone}
              </span>
              <span className="hud__sub">{PROFILE.region}</span>
            </dd>
          </div>
          <div className="hud__cell">
            <dt>Uptime</dt>
            <dd>
              <span className="hud__value hud__value--mono">{uptime.toLocaleString('en-US')} days</span>
              <span className="hud__sub">in enterprise IT, and counting</span>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

function Metrics() {
  return (
    <section className="metrics" aria-label="Highlights">
      <div className="container metrics__grid">
        {METRICS.map((m, i) => (
          <div className="metric" key={m.label} data-reveal={String(i)}>
            <p className="metric__value">
              <span className="sr-only">
                {m.prefix}
                {m.value}
                {m.suffix}
              </span>
              <span aria-hidden="true">
                {m.prefix && <span className="metric__affix">{m.prefix}</span>}
                <CountUp value={m.value} />
                {m.suffix && <span className="metric__affix">{m.suffix}</span>}
              </span>
            </p>
            <p className="metric__label">{m.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Marquee() {
  const items = [...MARQUEE, ...MARQUEE]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((item, i) => (
          <span className="marquee__item" key={`${item}-${i}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Work                                                                */
/* ------------------------------------------------------------------ */

function FeaturedProject({ project, index }) {
  const Preview = PREVIEWS[project.id]
  return (
    <article
      className={`work-item${index % 2 ? ' work-item--flip' : ''}`}
      id={`project-${project.id}`}
      aria-labelledby={`project-${project.id}-title`}
    >
      <div className="work-item__visual" data-reveal="">
        <div className="work-visual">{Preview && <Preview />}</div>
      </div>
      <div className="work-item__body" data-reveal="1">
        <p className="work-item__meta">
          <span className="work-item__index">{String(index + 1).padStart(2, '0')}</span>
          <span>{project.kind}</span>
          <span className="work-item__year">{project.year}</span>
        </p>
        <h3 id={`project-${project.id}-title`} className="work-item__title">
          {project.name}
        </h3>
        <p className="work-item__summary">{project.summary}</p>
        <ul className="work-item__points">
          {project.points.map(point => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <Chips items={project.stack} small />
        <a className="link-arrow" href={project.href} {...EXTERNAL}>
          <GitHubMark size={15} />
          View source
          <ArrowUpRight size={14} />
        </a>
      </div>
    </article>
  )
}

function ProjectCard({ project, index }) {
  return (
    <SpotlightCard as="article" className="project-card" data-reveal={String(index % 3)}>
      <div className="project-card__top">
        <span className="project-card__glyph">
          <ProjectGlyph id={project.id} />
        </span>
        {project.year && <span className="project-card__year">{project.year}</span>}
      </div>
      <h4 className="project-card__name">{project.name}</h4>
      <p className="project-card__kind">{project.kind}</p>
      <p className="project-card__summary">{project.summary}</p>
      <Chips items={project.stack} small />
      <div className="project-card__foot">
        {project.href ? (
          <a className="project-card__link" href={project.href} {...EXTERNAL}>
            View on GitHub
            <ArrowUpRight size={14} />
          </a>
        ) : (
          <span
            className={`project-card__status${/production/i.test(project.status) ? ' project-card__status--live' : ''}`}
          >
            {project.status}
          </span>
        )}
      </div>
    </SpotlightCard>
  )
}

function WorkSection() {
  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="container">
        <SectionHeader
          id="work-title"
          index="01"
          kicker="Selected work"
          title="Software I've designed, built, and shipped."
          aside={`${FEATURED.length} featured · ${PROJECTS.length} more`}
        />
        <div className="work-list">
          {FEATURED.map((project, i) => (
            <FeaturedProject key={project.id} project={project} index={i} />
          ))}
        </div>

        <div className="more-work">
          <h3 className="more-work__title" data-reveal="">
            More projects
          </h3>
          <div className="more-work__grid">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
          <a className="more-work__all" href={PROFILE.github} {...EXTERNAL} data-reveal="">
            <GitHubMark size={18} />
            <span>
              Everything else lives on GitHub
              <small>CTF tooling, experiments, and work-in-progress repos</small>
            </span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

function ExperienceSection() {
  const timelineRef = useRef(null)
  useScrollProgress(timelineRef)
  const steps = [...EXPERIENCE].reverse()

  return (
    <section id="experience" className="section section-alt experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeader
          id="experience-title"
          index="02"
          kicker="Experience"
          title="From the service desk to systems administration in a year."
        />
        <div className="xp">
          <aside className="xp__aside" data-reveal="">
            <div className="employer">
              <p className="employer__label">Employer</p>
              <p className="employer__name">{EMPLOYER.name}</p>
              <p className="employer__meta">
                {EMPLOYER.program} · {EMPLOYER.location}
              </p>
              <p className="employer__blurb">{EMPLOYER.blurb}</p>
              <ol className="ladder" aria-label="Role progression">
                {steps.map((job, i) => (
                  <li className={`ladder__step ladder__step--${i + 1}`} key={job.role}>
                    <span className="ladder__bar" aria-hidden="true" />
                    <span className="ladder__role">{job.role}</span>
                    <span className="ladder__date">{job.period.split(' - ')[0]}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <div className="timeline" ref={timelineRef}>
            <span className="timeline__track" aria-hidden="true">
              <span className="timeline__fill" />
            </span>
            <ol className="timeline__list">
              {EXPERIENCE.map(job => (
                <li
                  className={`timeline__item${job.current ? ' timeline__item--current' : ''}`}
                  key={job.role}
                  data-reveal=""
                >
                  <span className="timeline__node" aria-hidden="true" />
                  <div className="timeline__head">
                    <h3 className="timeline__role">{job.role}</h3>
                    {job.current && <span className="badge-live">Current</span>}
                    <span className="timeline__period">{job.period}</span>
                  </div>
                  <p className="timeline__org">
                    {EMPLOYER.name} · {EMPLOYER.program}
                  </p>
                  <ul className="timeline__points">
                    {job.points.map(point => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <Chips items={job.tags} small />
                </li>
              ))}
            </ol>
          </div>
        </div>

        <SpotlightCard className="leadership" data-reveal="">
          <div className="leadership__intro">
            <p className="leadership__label">Leadership</p>
            <h3 className="leadership__role">{LEADERSHIP.role}</h3>
            <p className="leadership__meta">
              {LEADERSHIP.org} · {LEADERSHIP.period}
            </p>
          </div>
          <ul className="leadership__points">
            {LEADERSHIP.points.map(point => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </SpotlightCard>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

function ClockTile() {
  const ref = useRef(null)
  const inView = useInView(ref, { rootMargin: '50px' })
  const now = useClock(1000, inView)
  const clock = formatClock(now, PROFILE.timeZone)

  useEffect(() => {
    ref.current?.style.setProperty('--day', clock.dayFraction.toFixed(4))
  }, [clock.dayFraction])

  return (
    <div className="bento__tile bento__tile--clock" ref={ref} data-reveal="1">
      <p className="tile-label">Local time</p>
      <p className="clock">
        <span className="clock__hm">{clock.hm}</span>
        <span className="clock__s">:{clock.seconds}</span>
      </p>
      <p className="tile-sub">
        {clock.zone} · {PROFILE.region}
      </p>
      <div className="dayline" aria-hidden="true">
        <span className="dayline__dot" />
      </div>
    </div>
  )
}

function AboutSection() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader id="about-title" index="03" kicker="About" title={ABOUT.title} />
        <div className="bento">
          <div className="bento__tile bento__tile--bio" data-reveal="">
            <p className="tile-label">whoami</p>
            {ABOUT.bio.map(p => (
              <p className="bio" key={p}>
                {p}
              </p>
            ))}
            <div className="bio__links">
              <a className="btn btn--ghost btn--sm" href={PROFILE.github} {...EXTERNAL}>
                <GitHubMark size={15} />
                GitHub
              </a>
              <a className="btn btn--ghost btn--sm" href={PROFILE.linkedin} {...EXTERNAL}>
                <LinkedInMark size={15} />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="bento__tile bento__tile--edu" data-reveal="1">
            <p className="tile-label">Education</p>
            <ul className="edu">
              {ABOUT.education.map(item => (
                <li className="edu__item" key={item.school}>
                  <div className="edu__head">
                    <p className="edu__degree">{item.degree}</p>
                    <p className="edu__year">{item.year}</p>
                  </div>
                  <p className="edu__school">{item.school}</p>
                  {item.note && <p className="edu__note">{item.note}</p>}
                </li>
              ))}
            </ul>
            <p className="tile-sub">Dual-enrolled full time at both, while working full time.</p>
          </div>

          <ClockTile />

          <div className="bento__tile bento__tile--lang" data-reveal="2">
            <p className="tile-label">Languages</p>
            <p className="greeting" aria-hidden="true">
              <span>Hello</span>
              <span>Hola</span>
            </p>
            <p className="tile-sub">Bilingual: English and Spanish (native)</p>
          </div>

          <div className="bento__tile bento__tile--focus" data-reveal="">
            <p className="tile-label">Recent focus</p>
            <ul className="focus">
              {ABOUT.focus.map(item => (
                <li key={item.label}>
                  <a href={`#project-${item.id}`} onClick={jumpTo(`project-${item.id}`)}>
                    <span>{item.label}</span>
                    <span className="focus__project">
                      {item.project}
                      <ArrowRight size={13} />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="bento__tile bento__tile--hw" data-reveal="1">
            <p className="tile-label">Off the clock</p>
            <p className="tile-text">
              Tinkering with hardware and reverse-engineering things just to see how they work.
            </p>
            <Chips items={ABOUT.hardware} small />
            <div className="led-strip" aria-hidden="true">
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Stack                                                               */
/* ------------------------------------------------------------------ */

function StackSection() {
  return (
    <section id="stack" className="section section-alt stack" aria-labelledby="stack-title">
      <div className="container">
        <SectionHeader
          id="stack-title"
          index="04"
          kicker="Stack"
          title="Three disciplines, one toolbox."
          aside="Software · Security · Infrastructure"
        />
        <div className="stack__grid">
          {STACK.map((col, i) => (
            <SpotlightCard as="article" className="stack-col" key={col.id} data-reveal={String(i)}>
              <div className="stack-col__icon">
                <StackIcon id={col.id} />
              </div>
              <h3 className="stack-col__title">{col.title}</h3>
              <p className="stack-col__blurb">{col.blurb}</p>
              {col.groups.map(group => (
                <div className="stack-col__group" key={group.label}>
                  <p className="stack-col__label">{group.label}</p>
                  <Chips items={group.items} small />
                </div>
              ))}
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Recognition                                                         */
/* ------------------------------------------------------------------ */

function TierBadge({ result, kind, season }) {
  const label = `${season} ${kind}: ${result.label}${result.pct ? `, ${result.pct}` : ''}. Verify on Cyber Skyline (opens in a new tab)`
  return (
    <a className={`tier tier--${result.tier}`} href={result.verify} {...EXTERNAL} aria-label={label}>
      <span className="tier__gem" aria-hidden="true" />
      <span className="tier__label">{result.label}</span>
      {result.pct && <span className="tier__pct">{result.pct}</span>}
      <ArrowUpRight size={12} className="tier__arrow" />
    </a>
  )
}

function RecognitionSection() {
  return (
    <section id="recognition" className="section recognition" aria-labelledby="recognition-title">
      <div className="container">
        <SectionHeader
          id="recognition-title"
          index="05"
          kicker="Recognition"
          title="Competition-tested, independently verified."
          aside="Every result links to its source"
        />

        <div className="honors">
          {HONORS.map((honor, i) => (
            <SpotlightCard as="article" className="honor" key={honor.title} data-reveal={String(i)}>
              <p className="honor__mark">{honor.mark}</p>
              <h3 className="honor__title">{honor.title}</h3>
              <p className="honor__meta">{honor.meta}</p>
              <p className="honor__detail">{honor.detail}</p>
              {honor.verify && (
                <a className="honor__verify" href={honor.verify} {...EXTERNAL}>
                  Verify
                  <ArrowUpRight size={13} />
                </a>
              )}
            </SpotlightCard>
          ))}
        </div>

        <div className="record record--ncl" data-reveal="">
          <div className="record__head">
            <h3 className="record__title">National Cyber League</h3>
            <p className="record__meta">
              Gold and Platinum in 2022, Diamond by 2024. Every badge links to its verification.
            </p>
          </div>
          <div className="ncl-scroll">
            <table className="ncl">
              <caption className="sr-only">National Cyber League results by season, oldest first</caption>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Game</span>
                  </th>
                  {NCL_SEASONS.map(s => (
                    <th scope="col" key={s.season}>
                      {s.season}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['team', 'Team game'],
                  ['individual', 'Individual'],
                ].map(([key, label]) => (
                  <tr key={key}>
                    <th scope="row">{label}</th>
                    {NCL_SEASONS.map(s => (
                      <td key={s.season}>
                        <TierBadge result={s[key]} kind={label.toLowerCase()} season={s.season} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="ncl-list">
            {[...NCL_SEASONS].reverse().map(s => (
              <li className="ncl-list__row" key={s.season}>
                <p className="ncl-list__season">{s.season}</p>
                <div className="ncl-list__results">
                  <span className="ncl-list__kind">Team</span>
                  <TierBadge result={s.team} kind="team game" season={s.season} />
                  <span className="ncl-list__kind">Individual</span>
                  <TierBadge result={s.individual} kind="individual game" season={s.season} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="records">
          <div className="record" data-reveal="">
            <div className="record__head">
              <h3 className="record__title">Competitions</h3>
            </div>
            <ul className="comp-list">
              {COMPETITIONS.map(c => (
                <li className="comp" key={c.name}>
                  <div className="comp__main">
                    <p className="comp__name">{c.name}</p>
                    {c.result && <p className="comp__result">{c.result}</p>}
                  </div>
                  {c.score && <span className="comp__score">{c.score}</span>}
                  {c.verify && (
                    <a
                      className="comp__verify"
                      href={c.verify}
                      {...EXTERNAL}
                      aria-label={`Verify ${c.name} on Cyber Skyline (opens in a new tab)`}
                    >
                      Verify
                      <ArrowUpRight size={12} />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="record" data-reveal="1">
            <div className="record__head">
              <h3 className="record__title">Certifications</h3>
            </div>
            <ul className="cert-list">
              {CERTS.map(cert => (
                <li className="cert" key={cert.name}>
                  <div className="cert__main">
                    <p className="cert__name">{cert.name}</p>
                    {cert.detail && <p className="cert__detail">{cert.detail}</p>}
                  </div>
                  <a
                    className="cert__verify"
                    href={cert.verify}
                    {...EXTERNAL}
                    aria-label={`Verify ${cert.name} (opens in a new tab)`}
                  >
                    Verify
                    <ArrowUpRight size={12} />
                  </a>
                </li>
              ))}
              {CERTS_IN_PROGRESS.map(name => (
                <li className="cert cert--pending" key={name}>
                  <div className="cert__main">
                    <p className="cert__name">{name}</p>
                  </div>
                  <span className="cert__pending">In progress</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Logs (only rendered when src/content/logs has entries)              */
/* ------------------------------------------------------------------ */

function LogsSection() {
  return (
    <section id="logs" className="section section-alt logs" aria-labelledby="logs-title">
      <div className="container">
        <SectionHeader id="logs-title" index="06" kicker="Logs" title="Field notes." aside="Short, dated, unpolished" />
        <ol className="logs__list">
          {LOGS.map(entry => (
            <li className="log" key={`${entry.date}-${entry.title}`} data-reveal="">
              <div className="log__meta">
                <time className="log__date" dateTime={entry.date}>
                  {entry.date}
                </time>
                {entry.tags.map(tag => (
                  <span className="log__tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="log__body">
                <h3 className="log__title">{entry.title}</h3>
                {entry.paragraphs.map(p => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Contact + footer                                                    */
/* ------------------------------------------------------------------ */

function ContactSection({ onCopyEmail, copied }) {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="contact__radar" aria-hidden="true">
        <span className="contact__sweep" />
        <span className="contact__ping" />
        <span className="contact__ping contact__ping--2" />
      </div>
      <div className="container contact__inner">
        <p className="section-head__kicker contact__kicker" data-reveal="">
          <span className="section-head__index">{LOGS.length > 0 ? '07' : '06'}</span>
          <span className="section-head__rule" aria-hidden="true" />
          <span>Contact</span>
        </p>
        <h2 id="contact-title" className="contact__title" data-reveal="1">
          {CONTACT.title[0]}
          <br />
          <span className="contact__title-accent">{CONTACT.title[1]}</span>
        </h2>
        <p className="contact__lede" data-reveal="2">
          {CONTACT.lede}
        </p>
        <div className="contact__actions" data-reveal="3">
          <a className="btn btn--primary btn--lg" href={`mailto:${PROFILE.email}`}>
            <MailIcon size={18} />
            {PROFILE.email}
          </a>
          <button type="button" className="btn btn--ghost btn--lg" onClick={onCopyEmail}>
            {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
            {copied ? 'Copied' : 'Copy email'}
          </button>
        </div>
        <ul className="contact__links" data-reveal="4">
          <li>
            <a href={PROFILE.github} {...EXTERNAL}>
              <GitHubMark size={16} />
              github.com/{PROFILE.handle}
            </a>
          </li>
          <li>
            <a href={PROFILE.linkedin} {...EXTERNAL}>
              <LinkedInMark size={16} />
              in/{PROFILE.linkedinLabel}
            </a>
          </li>
        </ul>
        <p className="contact-resume" data-reveal="4">
          Résumé available on request.
        </p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p className="site-footer__status">
          <span className="pulse-dot" aria-hidden="true" />
          All systems operational
        </p>
        <p className="site-footer__built">
          Designed and built by {PROFILE.name}. React, hand-written canvas, zero UI libraries.
        </p>
        <p className="site-footer__meta">
          <span>
            build {__BUILD_SHA__} · {__BUILD_DATE__}
          </span>
          <a href={PROFILE.source} {...EXTERNAL}>
            Source
            <ArrowUpRight size={12} />
          </a>
        </p>
      </div>
      <p className="site-footer__copy container">© {new Date().getFullYear()} H4ch1.Net</p>
    </footer>
  )
}

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */

function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [copied, setCopied] = useState(false)
  const active = useScrollSpy(SECTION_IDS)
  useRevealOnScroll()

  useEffect(() => {
    console.log(
      "%c H4ch1.Net %c\n\nThanks for looking under the hood. Press Ctrl/Cmd+K to get around.\nIf you like what you see and you're hiring, reach me at " +
        PROFILE.email,
      'background:#00e38c;color:#000;font-weight:700;padding:2px 8px;border-radius:3px;font-family:monospace;',
      'color:#00e38c;font-family:monospace;'
    )
  }, [])

  useEffect(() => {
    const onKey = e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen(open => !open)
        return
      }
      const typing =
        e.target instanceof HTMLElement &&
        (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))
      if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        setPaletteOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(null), 2200)
    return () => clearTimeout(id)
  }, [toast])

  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 2200)
    return () => clearTimeout(id)
  }, [copied])

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      setToast(`Copied ${PROFILE.email}`)
    } catch {
      setToast(`Email: ${PROFILE.email}`)
    }
  }, [])

  const paletteItems = useMemo(
    () => [
      ...NAV_ITEMS.map(item => ({
        id: `go-${item.id}`,
        group: 'Navigate',
        label: item.label,
        keywords: `section ${item.id}`,
        icon: 'section',
        run: () => scrollToId(item.id),
      })),
      {
        id: 'go-top',
        group: 'Navigate',
        label: 'Back to top',
        keywords: 'home hero start',
        icon: 'section',
        run: () => scrollToId('top'),
      },
      ...FEATURED.map(p => ({
        id: `p-${p.id}`,
        group: 'Projects',
        label: p.name,
        hint: p.kind,
        keywords: p.stack.join(' '),
        icon: 'project',
        run: () => scrollToId(`project-${p.id}`),
      })),
      ...PROJECTS.filter(p => p.href).map(p => ({
        id: `p-${p.id}`,
        group: 'Projects',
        label: p.name,
        hint: p.kind,
        keywords: p.stack.join(' '),
        icon: 'external',
        run: () => openExternal(p.href),
      })),
      {
        id: 'copy-email',
        group: 'Contact',
        label: 'Copy email address',
        hint: PROFILE.email,
        keywords: 'mail contact hire',
        icon: 'copy',
        run: copyEmail,
      },
      {
        id: 'send-email',
        group: 'Contact',
        label: 'Send an email',
        hint: 'mailto',
        keywords: 'mail contact hire',
        icon: 'mail',
        run: () => (window.location.href = `mailto:${PROFILE.email}`),
      },
      {
        id: 'github',
        group: 'Links',
        label: 'GitHub profile',
        hint: `@${PROFILE.handle}`,
        keywords: 'code repos',
        icon: 'github',
        run: () => openExternal(PROFILE.github),
      },
      {
        id: 'linkedin',
        group: 'Links',
        label: 'LinkedIn',
        hint: PROFILE.linkedinLabel,
        keywords: 'profile',
        icon: 'linkedin',
        run: () => openExternal(PROFILE.linkedin),
      },
      {
        id: 'source',
        group: 'Links',
        label: "This site's source code",
        hint: 'GitHub',
        keywords: 'repo react vite',
        icon: 'code',
        run: () => openExternal(PROFILE.source),
      },
    ],
    [copyEmail]
  )

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header active={active} onOpenPalette={() => setPaletteOpen(true)} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Metrics />
        <Marquee />
        <WorkSection />
        <ExperienceSection />
        <AboutSection />
        <StackSection />
        <RecognitionSection />
        {LOGS.length > 0 && <LogsSection />}
        <ContactSection onCopyEmail={copyEmail} copied={copied} />
      </main>
      <Footer />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} items={paletteItems} />
      <div className={`toast${toast ? ' toast--show' : ''}`} role="status" aria-live="polite">
        {toast && (
          <>
            <CheckIcon size={14} />
            {toast}
          </>
        )}
      </div>
    </div>
  )
}

export default App
