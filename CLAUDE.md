# H4ch1Net Portfolio — CLAUDE.md

## Stack
- React 18 + Vite 6 (vanilla JSX, no TypeScript)
- Plain CSS (App.css is the single source of truth — index.css is intentionally empty)
- Deployed via GitHub Pages at h4ch1.net using .github/workflows
- Build command: `npm run build`
- Dev server: `npm run dev`
- No component library. No Tailwind. No external CSS framework.

## Content Workflow
Log entries live as individual markdown files in `src/content/logs/`, not inline in App.jsx.
To publish a new entry: add one `.md` file with frontmatter, commit, push to `main`.
GitHub Actions handles the rest. This can be done entirely from the GitHub mobile app —
no dev environment required for a content update.

Files prefixed with `_` (e.g. `_template.md`) are skipped by the loader — use
`_template.md` as the reference for the expected frontmatter shape.

Résumé drop-in (deferred, not yet done): when the portfolio-safe résumé PDF is ready,
add it as `public/resume.pdf` and swap the `contact-resume` line in App.jsx from
"Résumé available on request." to a download link pointing at `/resume.pdf`.

## File Structure
```
/
├── src/
│   ├── App.jsx             ← page shell, section components, layout — source of truth for structure
│   ├── App.css             ← still the single CSS file for page styling
│   ├── main.jsx            ← entry point, do not touch
│   ├── index.css           ← intentionally empty, do not add styles here
│   ├── components/         ← decorative effect components (Particles, SplitText, etc.)
│   ├── content/logs/*.md   ← individual write-up entries, loaded at build time via import.meta.glob
│   └── lib/loadLogs.js     ← small frontmatter parser + loader
├── certificates/       ← PDF and PNG certificates (not bundled by Vite; verify links are external)
├── index.html          ← Vite entry HTML, do not touch
└── CLAUDE.md           ← this file
```
New component files are allowed when they separate a genuinely reusable unit
(e.g. the log loader) — the old "single file only" rule is retired.

## Dependency Policy
Default to zero new dependencies. If a task seems to need one, prefer a small
hand-written utility (as in the loadLogs frontmatter parser) over pulling in a library,
unless the library removes meaningfully more complexity than it adds.

## Design System
- Background: #0a0a0a (primary), #050505 (alternate sections), #000 (header/footer)
- Accent: #00e38c (existing codebase uses this — keep consistent, do NOT switch to #00FA9A)
- Text: #e0e0e0 (primary), #c0c0c0 (body), #a0a0a0 (muted)
- Border: #2a2a2a (default), #00e38c (hover/active)
- Font: JetBrains Mono available at root (JetBrainsMonoNL-Thin.ttf) — use for code/terminal elements
- Body font: system font stack (as currently defined in App.css)

## Design Direction
Aesthetic is "systems operator," not "movie hacker." Still dark terminal / green
accent (#00e38c) — keep that. But framing should read like a NOC dashboard
(status, uptime, monitored assets) rather than Matrix-style glitch-for-glitch's-sake.
Concretely: prefer status indicators, log timestamps, and monitoring-style framing
over pure decorative effects. Effects are consolidated to a small purposeful set
(Particles in hero, FaultyTerminal in contact, SplitText on headings) — do not
reintroduce glitch/scramble/decrypt effects.

## Content Sensitivity Rules
- Never commit `job-hunter`'s `criteria.yaml` or any file containing personal pay
  floor / scoring weights to this repo, public or not.
- Never commit API keys, tokens, or `.env` files. Check `git log -p` for a given
  file before making any previously-private repo public.
- The résumé linked from this site is a portfolio-safe version with reduced PII
  (name, email, LinkedIn, GitHub only — no phone number, no home address). The
  full résumé used for direct applications is never committed here.
- job-hunter's project card intentionally has no GitHub link ("Private repo" label)
  until its history is verified clean of personal config.

## About Me (use this content accurately)
- Name: Mauro / Handle: H4ch1Net
- CS student at California State University, San Bernardino (CSUSB), B.S. Computer Science anticipated 2029
- Dual-enrolled at College of the Desert (COD), A.S. in Computer Information Systems anticipated 2027
- IT Apprentice at Eisenhower Health, Rancho Mirage CA (~30-32 hrs/week)
  - Roles spanning Service Desk through Systems Administrator
- President, COD Cyber Competition Team
- CTF competitor: MetaCTF, SkillBit Flash CTF, Vegetable CTF, NCL (Diamond tier)
- Co-founder, Atlas Technology Systems (ATS) — MSP startup targeting Coachella Valley SMBs
- Software Engineering experience
- Bilingual: English and Spanish

## Certificates (actual files in /certificates/)
- certificates/Certificate.pdf
- certificates/Certificate-1.pdf
- certificates/Certificate-2.pdf
- certificates/Mauro Hernandez - Cyber Skyline Certificate.pdf
- certificates/Mauro Hernandez - Cyber Skyline Certificate-1.pdf
- certificates/Mauro Hernandez Rico - Cyber Skyline Certificate.pdf
- certificates/Mauro Hernandez Rico - Cyber Skyline Certificate-1.pdf
- certificates/Mauro Hernandez Rico - Cyber Skyline Certificate-2.pdf
- certificates/Mauro Hernandez Rico - Cyber Skyline Certificate-3.pdf
- certificates/6-2C6-M4997.png (TestOut PC Pro)
- certificates/6-2C6-SP9QT.png (TestOut Network Pro)
- certificates/6-2C6-V3A3KA.png (TestOut Security Pro)

## Key Verify Links (already in App.jsx — preserve these exactly)
- CompTIA A+: https://cp.certmetrics.com/comptia/en/public/verify/credential/NXCDHT0Y8JFE20DJ
- NCL Diamond achievements with cyberskyline.com verify links

## Coding Rules
- Use className (not class) — this is JSX
- CSS variables live in :root at the top of App.css — use them; add new ones there if introducing new colors
- All new sections must follow the existing .section / .section-alt / .container pattern
- Animations: CSS only unless a JS library is already installed. Check package.json before importing anything new.
- Mobile breakpoint: 768px (match the existing @media query at bottom of App.css)
- No inline styles
- No !important unless absolutely necessary

## How to Verify Changes
```bash
npm run dev     # start dev server, check localhost:5173
npm run build   # must complete with 0 errors before committing
```

## Git Workflow
- Commit after each section is complete and builds successfully
- Use descriptive commit messages: "Add Skills section with Cybersecurity/CS/IT tabs"
- Push to main — GitHub Actions deploys automatically to h4ch1.net
