# H4ch1Net Portfolio - AGENTS.md

## Stack
- React 18 + Vite 6 (vanilla JSX, no TypeScript)
- Runtime dependencies: `react` and `react-dom` only. Every visual effect is hand-written
  (2D canvas or CSS). No animation, 3D, or UI library.
- Plain CSS: `App.css` holds page styling and the design tokens; self-contained components
  keep a small co-located CSS file next to them. `index.css` is intentionally empty.
- Fonts are self-hosted in `public/fonts/` (Geist + JetBrains Mono, Latin subsets, SIL OFL,
  license in `public/fonts/OFL.txt`). No Google Fonts or other third-party requests.
- Deployed via GitHub Pages at h4ch1.net using .github/workflows
- Build command: `npm run build`
- Dev server: `npm run dev`
- No component library. No Tailwind. No external CSS framework.

## Content Workflow
All page copy lives in `src/content/site.js` (projects, experience, honors, NCL results,
certifications, stack, contact text). Editing content never requires touching layout
code in `App.jsx`. This can be done from the GitHub web or mobile editor.

Log entries live as individual markdown files in `src/content/logs/`.
To publish a new entry: add one `.md` file with frontmatter, commit, push to `main`.
GitHub Actions handles the rest. The Logs section and its nav link only render when at
least one entry exists, so an empty log never shows up as an empty section.

Files prefixed with `_` (e.g. `_template.md`) are skipped by the loader. Use
`_template.md` as the reference for the expected frontmatter shape.

Résumé drop-in (deferred, not yet done): when the portfolio-safe résumé PDF is ready,
add it as `public/resume.pdf` and swap the `contact-resume` line in App.jsx from
"Résumé available on request." to a download link pointing at `/resume.pdf`.

## File Structure
```
/
├── public/
│   ├── fonts/                 ← self-hosted woff2 + OFL.txt
│   └── og.jpg                 ← 1200x630 social preview card (link unfurls)
├── src/
│   ├── App.jsx                ← page shell + section components (source of truth for structure)
│   ├── App.css                ← design tokens (:root) + all page/section styling
│   ├── main.jsx               ← entry point, do not touch
│   ├── index.css              ← intentionally empty, do not add styles here
│   ├── content/site.js        ← all page copy and data
│   ├── content/logs/*.md      ← log entries, loaded at build time via import.meta.glob
│   ├── components/
│   │   ├── NetworkSphere.jsx  ← hero canvas: rotating node mesh, packets, health-check sweep
│   │   ├── previews/          ← animated project panels (sentryd, switch-vis, Argus, Bagley)
│   │   ├── CommandPalette.jsx ← Cmd/Ctrl+K menu
│   │   ├── SpotlightCard.jsx  ← pointer-follow glow card
│   │   ├── CountUp.jsx, Icons.jsx
│   └── lib/                   ← small hooks (useInView, useReducedMotion, useScrollSpy, ...),
│                                 palette.js (canvas mirror of the CSS tokens), loadLogs.js
├── index.html                 ← Vite entry HTML; only edit <head> metadata
├── LICENSE                    ← MIT
└── AGENTS.md                  ← this file
```
New component files are allowed when they separate a genuinely reusable unit.

## Dependency Policy
Default to zero new dependencies. If a task seems to need one, prefer a small
hand-written utility (as in the loadLogs frontmatter parser) over pulling in a library,
unless the library removes meaningfully more complexity than it adds.

## Design System
- Background: #0a0a0a (primary), #050505 (alternate sections), #000 (header/footer)
- Accent: #00e38c (keep consistent, do NOT switch to #00FA9A)
- Text: #e0e0e0 (primary), #c0c0c0 (body), #a0a0a0 (muted), #8a8a8a (subtle: the dimmest
  tone that still passes WCAG AA for small text). #6e6e6e (`--color-dim`) is decoration only.
- Border: #2a2a2a (default), #1c1c1c (soft dividers), #00e38c (hover/active)
- Status colors (`--color-warn`, `--color-serious`, `--color-danger`) always appear with a
  text label, never color alone.
- Type: Geist for UI and headings (`--font-sans`), JetBrains Mono for labels, data, and
  terminal elements (`--font-mono`). Mono labels are small, uppercase, letter-spaced.
- Canvas code reads colors from `src/lib/palette.js`; keep it in sync with `:root`.

## Design Direction
Aesthetic is "systems operator," not "movie hacker." Dark, green accent (#00e38c),
precise. Framing reads like a NOC dashboard: status dots, uptime, local time, telemetry
labels, monitoring-style panels. The site is positioned as a software engineering
portfolio, with IT and security as the differentiators.

The motion set is purposeful and small:
- Hero: `NetworkSphere` (drag to rotate) and an ECG trace under "can't go down."
- Project previews: each featured project has a live mock panel showing what it does.
- Sections reveal on scroll (`data-reveal`), the experience timeline fills as you scroll,
  metrics count up, and the contact section has a slow radar sweep.

Do not reintroduce glitch, scramble, or decrypt effects. Every animation must stop
when offscreen (`useInView`) and respect `prefers-reduced-motion` (render a static frame).

## Content Sensitivity Rules
- Never commit `job-hunter`'s `criteria.yaml` or any file containing personal pay
  floor / scoring weights to this repo, public or not.
- Never commit API keys, tokens, or `.env` files. Check `git log -p` for a given
  file before making any previously-private repo public.
- The résumé linked from this site is a portfolio-safe version with reduced PII
  (name, email, LinkedIn, GitHub only — no phone number, no home address). The
  full résumé used for direct applications is never committed here.
- The site shows location only as "Coachella Valley, CA" (region level).
- job-hunter's project card intentionally has no GitHub link ("Private repo" label)
  until its history is verified clean of personal config.

## About Me (use this content accurately)
- Name: Mauro / Handle: H4ch1Net
- CS student at California State University, San Bernardino (CSUSB), B.S. Computer Science anticipated 2029
  (Dean's List, College of Natural Sciences, Spring 2026)
- Dual-enrolled at College of the Desert (COD), A.S. in Computer Information Systems anticipated 2027
- IT Apprentice at Eisenhower Health, Rancho Mirage CA
  - Roles spanning Service Desk (Jun 2024) through Systems Administrator (Jun 2025 - present)
- President, CODIS Cybersecurity Club (COD's competitive cyber team)
- CTF competitor: MetaCTF, SkillBit Flash CTF, Vegetable CTF, NCL (Diamond tier)
- 1st place college division, Inland Empire Mayors Cyber Cup 2025; Team MVP, NASA NCAS 2026
- Co-founder, Atlas Technology Systems (ATS) — MSP startup targeting Coachella Valley SMBs (not shown on the site)
- Software Engineering experience; aiming for software engineering roles
- Bilingual: English and Spanish

## Certificates
Certificates are verified through external links only (cyberskyline.com, TestOut,
CompTIA CertMetrics) — the site does not host any certificate files. Do NOT commit
certificate PDFs/PNGs to this repo; their filenames leak full-name PII and they add
no value over the external verify links.

## Key Verify Links (in src/content/site.js — preserve these exactly)
- CompTIA A+: https://cp.certmetrics.com/comptia/en/public/verify/credential/NXCDHT0Y8JFE20DJ
- NCL results with cyberskyline.com verify links (NCL_SEASONS, COMPETITIONS, HONORS)

## Coding Rules
- Use className (not class) — this is JSX
- CSS variables live in :root at the top of App.css — use them; add new ones there if introducing new colors
- All new sections must follow the existing .section / .section-alt / .container pattern
  and start with the `SectionHeader` component
- Animations: CSS, hand-written canvas, or the native Web Animations API (`element.animate`). No animation
  libraries. Check package.json before importing anything new.
- Scroll reveals use the `translate` property (not `transform`) so they compose with hover transforms
- Mobile breakpoint: 768px (plus a 1100px tablet step), at the bottom of App.css
- No inline `style={{}}` in JSX. Dynamic values go through CSS custom properties set from refs.
- No !important unless absolutely necessary (the reduced-motion override is the one exception)
- Copy style: no em dashes in visible text.

## How to Verify Changes
```bash
npm run dev     # start dev server, check localhost:5173
npm run build   # must complete with 0 errors before committing
```
Check both a desktop width and a ~390px phone width, and once with reduced motion enabled.

## Git Workflow
- Commit after each section is complete and builds successfully
- Use descriptive commit messages: "Add Skills section with Cybersecurity/CS/IT tabs"
- Push to main — GitHub Actions deploys automatically to h4ch1.net
