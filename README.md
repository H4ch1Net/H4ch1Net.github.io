# H4ch1.Net — Personal Portfolio

[![Live Site](https://img.shields.io/badge/live-h4ch1.net-00e38c?style=flat-square&logo=github)](https://h4ch1.net)
[![Built with React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Deployed on GitHub Pages](https://img.shields.io/badge/deployed-GitHub%20Pages-222?style=flat-square&logo=github)](https://pages.github.com)

I'm Mauro (H4ch1Net) — a CS student at CSUSB + dual-enrolled at COD, cybersecurity competitor, and IT professional based in the Coachella Valley. This is my personal portfolio site.

🌐 **[h4ch1.net](https://h4ch1.net)** &nbsp;|&nbsp; 💻 **[GitHub](https://github.com/H4ch1Net)** &nbsp;|&nbsp; 📧 **[h4ch1net@gmail.com](mailto:h4ch1net@gmail.com)**

---

## 📸 Screenshot

> _Coming soon_

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18.3 | UI framework |
| Vite | 6 | Build tool & dev server |
| Framer Motion | 12 | Scroll animations (SplitText, DecryptedText) |
| OGL | 1 | WebGL (Particles hero, FaultyTerminal contact) |
| HTML Canvas | — | AsciiText, LetterGlitch — no extra deps |
| Plain CSS | — | All styling, no UI frameworks |

---

## ✨ Features

- **LetterGlitch hero background** — pure canvas matrix of glitching green characters behind the particle field
- **Particle hero** — WebGL particle field using OGL, sparse green accent particles layered above LetterGlitch
- **DecryptedText name** — hero name cycles Mauro ↔ H4ch1 with a hacker-style char-by-char decrypt on hover
- **ScrambledText logo** — nav logo "H4CH1" scrambles left-to-right on hover, no GSAP required
- **Skills tabs** — three-panel tabbed section: Cybersecurity / Computer Science / IT
- **SpotlightCard** — mouse-tracking radial spotlight on every project card
- **GlitchText heading** — "About Me" heading rendered with CSS clip-path glitch animation
- **FaultyTerminal contact** — OGL WebGL shader behind the Contact section, green-tinted CRT terminal aesthetic
- **AsciiText subtitle** — hero subtitle rendered as animated ASCII art via HTML canvas
- **SplitText headings** — section headings animate in character-by-character on scroll

---

## 🏆 Highlights

- 🥉 IE/CA Mayors Cyber Cup 2025 — **3rd place out of 143 teams**, 1st in Inland Empire Colleges
- 💎 NCL Diamond Tier — **97th percentile** (Team Game, Fall 2024)
- 🏥 IT Apprentice @ Eisenhower Health — spanning Service Desk through Systems Administrator
- 🛡️ President, COD Cyber Competition Team
- 🚀 Co-founder, Atlas Technology Systems (MSP startup, Coachella Valley)
- 📜 CompTIA A+ certified
- 💻 Software engineering experience

---

## 🚀 Dev Setup

```bash
git clone https://github.com/H4ch1Net/H4ch1Net.github.io.git
cd H4ch1Net.github.io
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

---

## 🔄 Deploy

Pushing to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`) which builds and deploys to GitHub Pages automatically. No manual steps needed.

---

## 📄 License

MIT
