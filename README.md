# H4ch1.Net - Personal Portfolio

[![Live Site](https://img.shields.io/badge/live-h4ch1.net-00e38c?style=flat-square&logo=github)](https://h4ch1.net)
[![Built with React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Deployed on GitHub Pages](https://img.shields.io/badge/deployed-GitHub%20Pages-222?style=flat-square&logo=github)](https://pages.github.com)

I'm Mauro (H4ch1Net): a CS student at CSUSB, dual-enrolled at College of the Desert, an
IT apprentice working as a systems administrator in Southern California, and a
cybersecurity competitor working toward software engineering. This is my personal
portfolio site.

**[h4ch1.net](https://h4ch1.net)** &nbsp;|&nbsp; **[GitHub](https://github.com/H4ch1Net)** &nbsp;|&nbsp; **[h4ch1net@gmail.com](mailto:h4ch1net@gmail.com)**

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI framework (the only runtime dependency) |
| Vite | 6 | Build tool and dev server |
| Canvas 2D | n/a | Hand-written renderers: hero network sphere, Argus globe, sentryd chart |
| Plain CSS | n/a | All styling and motion, no UI frameworks |
| Geist + JetBrains Mono | n/a | Self-hosted variable fonts (SIL OFL) |

## Features

- **Network sphere hero.** A draggable 3D mesh of network nodes with packets walking the
  links and a periodic "health check" ring sweeping pole to pole. Hand-rolled projection.
- **Project previews.** Each featured project has an animated mockup panel (simulated
  data, clearly labeled) that shows what it does: sentryd's detection chart and alert
  feed, switch-vis's front panel with hoverable ports, Argus's dotted-earth globe with
  feed arcs, and Bagley's agent pipeline.
- **Command menu.** Press `Ctrl+K` / `Cmd+K` (or `/`) to jump to sections, open projects,
  or copy my email.
- **NOC-style framing.** Status dots, a live local clock, time in enterprise IT, scroll
  progress, and a timeline that fills as you scroll.
- **Verifiable recognition.** NCL results and certifications link to their official
  verification pages, as do competitions wherever a verification page exists.
- **Accessible and fast.** Semantic landmarks, keyboard support, `prefers-reduced-motion`
  support everywhere, and every animation pauses when offscreen.
- **Markdown-driven Logs.** Drop a `.md` file in `src/content/logs/`, push, and it publishes.
  The section appears automatically once the first entry exists.

## Content Workflow

All page copy lives in `src/content/site.js`, so content edits never touch layout code.

To publish a log entry, copy `src/content/logs/_template.md` to a new file, fill in the
`title`, `date`, and `tags` frontmatter, write a few paragraphs, and push to `main`.
GitHub Actions builds and deploys the rest. This works from the GitHub mobile app.

## Dev Setup

```bash
git clone https://github.com/H4ch1Net/H4ch1Net.github.io.git
cd H4ch1Net.github.io
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
deploys it to GitHub Pages automatically. No manual steps needed.

## License

Code is released under the [MIT License](LICENSE). Fonts in `public/fonts/` are under the
SIL Open Font License (see `public/fonts/OFL.txt`).
