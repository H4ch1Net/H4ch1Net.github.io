# H4ch1.Net - Personal Portfolio

[![Live Site](https://img.shields.io/badge/live-h4ch1.net-00e38c?style=flat-square&logo=github)](https://h4ch1.net)
[![Built with React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Deployed on GitHub Pages](https://img.shields.io/badge/deployed-GitHub%20Pages-222?style=flat-square&logo=github)](https://pages.github.com)

I'm Mauro (H4ch1Net), a CS student at CSUSB, dual-enrolled at College of the Desert,
cybersecurity competitor, and IT professional in the Coachella Valley. This is my
personal portfolio site.

**[h4ch1.net](https://h4ch1.net)** &nbsp;|&nbsp; **[GitHub](https://github.com/H4ch1Net)** &nbsp;|&nbsp; **[h4ch1net@gmail.com](mailto:h4ch1net@gmail.com)**

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| Vite | 6 | Build tool and dev server |
| Framer Motion | 12 | SplitText heading animations |
| OGL | 1 | WebGL (Particles hero, FaultyTerminal contact) |
| Plain CSS | n/a | All styling, no UI frameworks |

## Features

- **Particle hero** built on OGL, a sparse green particle field behind the intro.
- **SplitText headings** that animate in character by character on scroll.
- **SpotlightCard** mouse-tracking spotlight on project and honors cards.
- **FaultyTerminal contact** using an OGL shader for a green CRT terminal look.
- **Operator status indicator** in the hero: a live uptime counter and status dot.
- **Markdown-driven Logs** section. Drop a `.md` file in `src/content/logs/`, push,
  and it publishes. No code changes needed. See `src/content/logs/_template.md`.
- **Skills tabs** across Cybersecurity, Computer Science, and IT.

## Content Workflow

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

Released under the [MIT License](LICENSE).
