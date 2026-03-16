# H4ch1Net Portfolio — CLAUDE.md

## Stack
- React 18 + Vite 6 (vanilla JSX, no TypeScript)
- Plain CSS (App.css is the single source of truth — index.css is intentionally empty)
- Deployed via GitHub Pages at h4ch1.net using .github/workflows
- Build command: `npm run build`
- Dev server: `npm run dev`
- No component library. No Tailwind. No external CSS framework.

## File Structure
```
/
├── src/
│   ├── App.jsx         ← ALL components live here (single-file React app)
│   ├── App.css         ← ALL styles live here
│   ├── main.jsx        ← entry point, do not touch
│   └── index.css       ← intentionally empty, do not add styles here
├── certificates/       ← PDF and PNG certificates, reference by filename
├── index.html          ← Vite entry HTML, do not touch
└── CLAUDE.md           ← this file
```

## Design System
- Background: #0a0a0a (primary), #050505 (alternate sections), #000 (header/footer)
- Accent: #00e38c (existing codebase uses this — keep consistent, do NOT switch to #00FA9A)
- Text: #e0e0e0 (primary), #c0c0c0 (body), #a0a0a0 (muted)
- Border: #2a2a2a (default), #00e38c (hover/active)
- Font: JetBrains Mono available at root (JetBrainsMonoNL-Thin.ttf) — use for code/terminal elements
- Body font: system font stack (as currently defined in App.css)
- Aesthetic: dark hacker terminal — minimal, purposeful, no rainbow effects

## About Me (use this content accurately)
- Name: Mauro / Handle: H4ch1Net
- CS student at California State University, San Bernardino (CSUSB), anticipated May 2027
- Dual-enrolled at College of the Desert (COD), A.S. in Computer Information Systems
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
- Keep everything in App.jsx and App.css — do NOT create new component files unless explicitly asked
- Use className (not class) — this is JSX
- CSS variables are not currently used — add them to :root in App.css if introducing new colors
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
