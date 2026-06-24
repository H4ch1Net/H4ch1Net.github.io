import { useState, useEffect } from 'react'
import './App.css'
import Particles from './components/Particles'
import SplitText from './components/SplitText'
import SpotlightCard from './components/SpotlightCard'
import DecryptedText from './components/DecryptedText'
import ScrambledText from './components/ScrambledText'
import LetterGlitch from './components/LetterGlitch'
import FaultyTerminal from './components/FaultyTerminal'

const SKILLS_TABS = ['Cybersecurity', 'Computer Science', 'IT']

function HeroName() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="hero-scramble-text"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="scramble-static">Hi, I'm </span>
      <DecryptedText
        key={hovered ? 'h4ch1' : 'mauro'}
        text={hovered ? 'H4ch1' : 'Mauro'}
        animateOn="view"
        sequential
        revealDirection="start"
        speed={40}
        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$"
        className="scramble-name"
        encryptedClassName="scramble-active"
      />
    </div>
  )
}

function SkillsSection() {
  const [activeTab, setActiveTab] = useState('Cybersecurity')

  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <h3>
          <SplitText
            text="Skills"
            tag="span"
            splitType="chars"
            delay={40}
            duration={0.8}
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            rootMargin="-80px"
          />
        </h3>

        <div className="skills-tabs">
          {SKILLS_TABS.map(tab => (
            <button
              key={tab}
              className={`skills-tab${activeTab === tab ? ' skills-tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="skills-content">
          {activeTab === 'Cybersecurity' && (
            <div className="skills-panel">
              <div className="skills-grid">
                <div className="card-spotlight skills-card">
                  <h4>Competitions & Leadership</h4>
                  <ul className="skills-list">
                    <li>President, COD Cyber Competition Team</li>
                    <li>NCL Diamond Tier — Top 3% (Fall 2024 Team Game)</li>
                    <li>1st Place, Inland Empire Mayors Cyber Cup 2025 (College Division)</li>
                    <li>MetaCTF, SkillBit Flash CTF, Vegetable CTF</li>
                  </ul>
                </div>
                <div className="card-spotlight skills-card">
                  <h4>Skill Areas</h4>
                  <ul className="skills-list">
                    <li>Network Analysis</li>
                    <li>OSINT</li>
                    <li>Web Exploitation</li>
                    <li>Reverse Engineering</li>
                    <li>Cryptography & Steganography</li>
                    <li>Log Analysis & Forensics</li>
                    <li>Vulnerability Assessment</li>
                    <li>OWASP Top 10, MITRE ATT&CK</li>
                    <li>CVE Research</li>
                  </ul>
                </div>
                <div className="card-spotlight skills-card">
                  <h4>Tools</h4>
                  <ul className="skills-list">
                    <li>Wireshark</li>
                    <li>Burp Suite</li>
                    <li>Nmap</li>
                    <li>Metasploit</li>
                    <li>John the Ripper</li>
                    <li>Gobuster</li>
                    <li>CyberChef</li>
                    <li>Autopsy</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Computer Science' && (
            <div className="skills-panel">
              <div className="skills-grid">
                <div className="card-spotlight skills-card">
                  <h4>Education & Programs</h4>
                  <ul className="skills-list">
                    <li>B.S. Computer Science — CSUSB (Expected 2029)</li>
                    <li>A.S. Computer Information Systems — COD (Expected 2027)</li>
                    <li>Dual-enrolled full-time at both institutions</li>
                    <li>Software engineering & agentic AI development</li>
                  </ul>
                </div>
                <div className="card-spotlight skills-card">
                  <h4>AI & Automation</h4>
                  <ul className="skills-list">
                    <li>Agentic AI systems</li>
                    <li>LLM API integration (OpenAI / Anthropic)</li>
                    <li>Automation pipeline design</li>
                    <li>Voice + text multimodal interfaces</li>
                    <li>AI agent development</li>
                  </ul>
                </div>
                <div className="card-spotlight skills-card">
                  <h4>Languages & Frameworks</h4>
                  <ul className="skills-list">
                    <li>Python, MicroPython</li>
                    <li>JavaScript, C, C++, C#</li>
                    <li>PowerShell, Bash</li>
                    <li>React, Vite, FastAPI</li>
                    <li>Git & GitHub</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'IT' && (
            <div className="skills-panel">
              <div className="skills-grid">
                <div className="card-spotlight skills-card">
                  <h4>Systems & Infrastructure</h4>
                  <ul className="skills-list">
                    <li>Active Directory & Group Policy</li>
                    <li>PowerShell automation & imaging</li>
                    <li>Windows 10/11/Server, Linux/Ubuntu</li>
                    <li>VMware, Ivanti, Blancco</li>
                    <li>Patch management & endpoint security</li>
                    <li>Healthcare IT (HIPAA, JIRA, ticketing)</li>
                  </ul>
                </div>
                <div className="card-spotlight skills-card">
                  <h4>Networking</h4>
                  <ul className="skills-list">
                    <li>TCP/IP, DNS, ICMP, SNMP</li>
                    <li>Cisco switching & port monitoring</li>
                    <li>Infoblox (DDI)</li>
                    <li>VPN & network monitoring</li>
                    <li>Network automation (Python)</li>
                  </ul>
                </div>
                <div className="card-spotlight skills-card">
                  <h4>Certifications</h4>
                  <ul className="skills-list">
                    <li>CompTIA A+</li>
                    <li className="cert-pending">CompTIA Security+ (In Progress — Sep 2026)</li>
                    <li>TestOut PC Pro</li>
                    <li>TestOut Network Pro</li>
                    <li>TestOut Security Pro</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

const EXPERIENCE = [
  {
    role: 'Systems Administrator',
    org: 'Eisenhower Health · IT Apprenticeship',
    location: 'Rancho Mirage, CA',
    period: 'Jun 2025 – Present',
    bullets: [
      'Develop Python network automation & inventory tools for enterprise infrastructure — three production tools shipped in the first 60 days',
      'Engineered NERD, a Python CLI replacing manual Excel tracking for 500+ switches, routers, and hardware assets with JSON-backed CRUD',
      'Building a real-time Cisco switch port monitor using threaded ICMP processes and a live color-coded ASCII interface',
      'Standardized all tooling on the Python standard library — zero third-party dependencies — while maintaining HIPAA compliance',
    ],
  },
  {
    role: 'IT Desktop Technician',
    org: 'Eisenhower Health · IT Apprenticeship',
    location: 'Rancho Mirage, CA',
    period: 'Sep 2024 – Jun 2025',
    bullets: [
      'Engineered a menu-driven PowerShell deployment framework — reduced imaging from 8 hours (4 computers) to parallel fire-and-forget processing with automated verification',
      'Managed Active Directory objects and security group memberships to enforce Group Policy; resolved 10+ daily tickets via Ivanti and RDP',
      'Executed Windows 11 upgrades and migrations with secure data wiping via Blancco under healthcare data-handling policies',
    ],
  },
  {
    role: 'IT Service Desk',
    org: 'Eisenhower Health · IT Apprenticeship',
    location: 'Rancho Mirage, CA',
    period: 'Jun 2024 – Sep 2024',
    bullets: [
      'Resolved 25–30+ daily IT support tickets via JIRA across clinical and administrative departments',
      'Maintained HIPAA compliance when accessing patient-adjacent systems',
    ],
  },
]

function ExperienceSection() {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <h3>
          <SplitText
            text="Experience"
            tag="span"
            splitType="chars"
            delay={40}
            duration={0.8}
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            rootMargin="-80px"
          />
        </h3>
        <div className="timeline">
          {EXPERIENCE.map((job, i) => (
            <div className="timeline-entry" key={i}>
              <div className="timeline-marker" />
              <SpotlightCard className="timeline-content" spotlightColor="rgba(0, 227, 140, 0.08)">
                <div className="timeline-header">
                  <h4 className="timeline-role">{job.role}</h4>
                  <span className="timeline-period">{job.period}</span>
                </div>
                <p className="timeline-org">{job.org} · {job.location}</p>
                <ul className="skills-list timeline-bullets">
                  {job.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const GITHUB_USERNAME = 'H4ch1Net'

function GitHubReposSection() {
  const [repos, setRepos] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let active = true
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6&type=public`)
      .then(res => {
        if (!res.ok) throw new Error(res.status === 403 ? 'rate-limited' : 'error')
        return res.json()
      })
      .then(data => {
        if (!active) return
        setRepos(data.filter(r => !r.fork))
        setStatus('done')
      })
      .catch(() => active && setStatus('error'))
    return () => { active = false }
  }, [])

  return (
    <div className="github-section">
      <h4 className="github-heading">// latest from github</h4>

      <div className="github-stats-wrap">
        <img
          className="github-stats-img"
          src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&hide_border=true&bg_color=0a0a0a&title_color=00e38c&icon_color=00e38c&text_color=c0c0c0&hide=issues`}
          alt={`${GITHUB_USERNAME} GitHub stats`}
          loading="lazy"
        />
        <img
          className="github-stats-img"
          src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&hide_border=true&bg_color=0a0a0a&title_color=00e38c&text_color=c0c0c0&langs_count=8`}
          alt={`${GITHUB_USERNAME} top languages`}
          loading="lazy"
        />
      </div>

      {status === 'loading' && (
        <p className="github-status">// fetching repositories…</p>
      )}

      {status === 'error' && (
        <p className="github-status">
          // rate limited —{' '}
          <a href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`} target="_blank" rel="noopener noreferrer">
            view all repos on GitHub
          </a>
        </p>
      )}

      {status === 'done' && repos.length > 0 && (
        <>
          <div className="github-repos-grid">
            {repos.map(repo => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="github-repo-card"
              >
                <div className="github-repo-top">
                  <span className="github-repo-name">{repo.name}</span>
                  {repo.stargazers_count > 0 && (
                    <span className="github-repo-stars">★ {repo.stargazers_count}</span>
                  )}
                </div>
                <p className="github-repo-desc">{repo.description || 'No description provided.'}</p>
                {repo.language && <span className="tag github-repo-lang">{repo.language}</span>}
              </a>
            ))}
          </div>
          <a className="github-all-link" href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer">
            view all repos →
          </a>
        </>
      )}
    </div>
  )
}

const HONORS = [
  {
    place: '1st',
    title: 'Inland Empire Mayors Cyber Cup',
    org: 'IEGO Collaborative · 2025',
    detail: 'College Division — 3rd overall / 143 teams',
  },
  {
    place: 'MVP',
    title: 'NASA NCAS 2026',
    org: 'National Community College Aerospace Scholars',
    detail: 'Team MVP — selected from the full cohort for the most autonomous rover performance',
  },
  {
    place: 'Diamond',
    title: 'National Cyber League',
    org: 'Fall 2024 Team Game',
    detail: 'Diamond Tier — Top 3%',
    verifyUrl: 'https://cyberskyline.com/verify/8N631HG39DG2',
  },
  {
    place: 'Diamond',
    title: 'National Cyber League',
    org: 'Fall 2025 Individual',
    detail: 'Diamond Tier — 83rd percentile',
    verifyUrl: 'https://cyberskyline.com/verify/P0GK5KL1N4VA',
  },
]

function HonorsSection() {
  return (
    <section id="honors" className="section honors-section">
      <div className="container">
        <h3>
          <SplitText
            text="Honors & Awards"
            tag="span"
            splitType="chars"
            delay={40}
            duration={0.8}
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            rootMargin="-80px"
          />
        </h3>
        <div className="honors-grid">
          {HONORS.map((honor, i) => (
            <SpotlightCard key={i} className="honor-card" spotlightColor="rgba(0, 227, 140, 0.1)">
              <span className="honor-place">{honor.place}</span>
              <h4 className="honor-title">{honor.title}</h4>
              <p className="honor-org">{honor.org}</p>
              <p className="honor-detail">{honor.detail}</p>
              {honor.verifyUrl && (
                <a className="honor-verify" href={honor.verifyUrl} target="_blank" rel="noopener noreferrer">
                  Verify ↗
                </a>
              )}
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1 className="logo">
            <ScrambledText text="H4CH1" />
          </h1>
          <nav className="nav">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#honors">Honors</a>
            <a href="#certificates">Certificates</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-glitch">
            <LetterGlitch
              glitchColors={['#003d1f', '#001a0d', '#002810']}
              glitchSpeed={200}
              outerVignette
              smooth
            />
          </div>
          <div className="hero-particles">
            <Particles
              particleCount={120}
              particleSpread={8}
              speed={0.05}
              particleColors={['#00e38c', '#00e38c', '#00c078']}
              alphaParticles={true}
              particleBaseSize={80}
              sizeRandomness={0.8}
              disableRotation={false}
            />
          </div>
          <div className="container hero-content">
            <HeroName />
            <p className="subtitle-terminal">
              Systems Administrator · Cybersecurity · Software Engineering
            </p>
            <p className="description">
              Building enterprise automation tools in production while competing in
              cybersecurity at the national level.
            </p>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container about-container">
            <h3>
              <SplitText
                text="About Me"
                tag="span"
                splitType="chars"
                delay={40}
                duration={0.8}
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                rootMargin="-80px"
              />
            </h3>
            <div className="content">
              <p>
                I'm a Systems Administrator and cybersecurity competitor building enterprise-grade
                automation tools in production at a 450-bed regional health system — all through an IT
                apprenticeship at Eisenhower Health, while dual-enrolled full-time across two university
                programs. I'm pursuing a B.S. in Computer Science at California State University, San Bernardino,
                and an A.S. in Computer Information Systems at College of the Desert.
              </p>
              <p>
                I specialize in Python-based infrastructure tooling, network automation, agentic AI systems,
                and endpoint security in HIPAA-regulated environments. Outside of work, I compete in Capture
                the Flag events at the national level — National Cyber League Diamond Tier — and was selected
                Team MVP at NASA NCAS 2026 for the most autonomous rover performance in the cohort.
              </p>
              <p>
                I'm bilingual in English and Spanish, President of the College of the Desert Cyber Competition
                Team, and I love working close to the metal — Raspberry Pi, ESP32, Arduino, and the occasional
                reverse-engineering rabbit hole.
              </p>
            </div>
          </div>
        </section>

        <ExperienceSection />

        <SkillsSection />

        <section id="projects" className="section section-alt">
          <div className="container">
            <h3>
              <SplitText
                text="Projects"
                tag="span"
                splitType="chars"
                delay={40}
                duration={0.8}
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                rootMargin="-80px"
              />
            </h3>
            <div className="projects-grid">
              <SpotlightCard className="card" spotlightColor="rgba(0, 227, 140, 0.1)">
                <div className="card-tags">
                  <span className="tag">Python</span>
                  <span className="tag">Agentic AI</span>
                  <span className="tag">SSH</span>
                </div>
                <h4>Bagley</h4>
                <p>
                  Fully agentic AI assistant that SSHs into remote devices, scans networks, and runs
                  diagnostics — all triggered by natural language via voice and text. Modular architecture
                  with a command routing engine, real-time event handler, and LLM API integration.
                </p>
                <a href="https://github.com/H4ch1Net" className="btn" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </SpotlightCard>
              <SpotlightCard className="card" spotlightColor="rgba(0, 227, 140, 0.1)">
                <div className="card-tags">
                  <span className="tag">Python</span>
                  <span className="tag">CLI</span>
                  <span className="tag">Production</span>
                </div>
                <h4>NERD</h4>
                <p>
                  Network Equipment Repository and Database — a production CLI in active enterprise use,
                  tracking 500+ switches, routers, and hardware assets. JSON-backed CRUD for asset tags,
                  serial numbers, and purchase orders, with zero third-party dependencies.
                </p>
                <a href="https://github.com/H4ch1Net" className="btn" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </SpotlightCard>
              <SpotlightCard className="card" spotlightColor="rgba(0, 227, 140, 0.1)">
                <div className="card-tags">
                  <span className="tag">Python</span>
                  <span className="tag">OSINT</span>
                  <span className="tag">CTF</span>
                </div>
                <h4>Nexus</h4>
                <p>
                  All-in-one Python cybersecurity toolkit covering cryptography, OSINT, password cracking,
                  log and network analysis, forensics, and exploitation. Built for CTF competition and
                  security research, and actively maintained.
                </p>
                <a href="https://github.com/H4ch1Net" className="btn" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </SpotlightCard>
              <SpotlightCard className="card" spotlightColor="rgba(0, 227, 140, 0.1)">
                <div className="card-tags">
                  <span className="tag">Python</span>
                  <span className="tag">MicroPython</span>
                  <span className="tag">LEGO EV3</span>
                </div>
                <h4>Autonomous Rover</h4>
                <p>
                  NASA NCAS 2026 — the most autonomous rover performance of all 4 competing teams:
                  coordinate navigation, gyroscopic correction, ultrasonic obstacle avoidance, and mineral
                  identification via color sensor. Selected Team MVP from the full cohort.
                </p>
                <a href="https://github.com/H4ch1Net" className="btn" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </SpotlightCard>
              <SpotlightCard className="card" spotlightColor="rgba(0, 227, 140, 0.1)">
                <div className="card-tags">
                  <span className="tag">React</span>
                  <span className="tag">Canvas API</span>
                  <span className="tag">pdf-lib</span>
                </div>
                <h4>Memory Threads Mockup Generator</h4>
                <p>
                  Client-side React/Vite app built and demoed for a real apparel brand at the PS/NExT
                  Vibe-a-thon (CSUSB). Generates four color-varied mockup concepts with manual artwork
                  placement, front/back views, and layer controls — exporting to PNG, PDF, PowerPoint, and SVG.
                </p>
                <a href="https://github.com/H4ch1Net" className="btn" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </SpotlightCard>
              <SpotlightCard className="card" spotlightColor="rgba(0, 227, 140, 0.1)">
                <div className="card-tags">
                  <span className="tag">Python</span>
                  <span className="tag">Bluetooth</span>
                  <span className="tag">Reverse Eng</span>
                </div>
                <h4>KS LED Controller</h4>
                <p>
                  Reverse-engineered the proprietary Bluetooth protocol of discontinued KS LED hardware
                  and built an open-source, cross-platform Python controller to replace the broken vendor
                  apps. Earned 5 GitHub stars from community adoption.
                </p>
                <a href="https://github.com/H4ch1Net/ks-led-controller" className="btn" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </SpotlightCard>
            </div>

            <GitHubReposSection />
          </div>
        </section>

        <HonorsSection />

        <section id="certificates" className="section">
          <div className="container">
            <h3>
              <SplitText
                text="Certifications"
                tag="span"
                splitType="chars"
                delay={40}
                duration={0.8}
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                rootMargin="-80px"
              />
            </h3>

            <h4 className="cert-category">Professional Certifications</h4>
            <div className="certs-grid">
              <div className="cert-item">
                <strong>CompTIA A+</strong>
                <a href="https://cp.certmetrics.com/comptia/en/public/verify/credential/NXCDHT0Y8JFE20DJ" target="_blank" rel="noopener noreferrer">
                  Verify
                </a>
              </div>
              <div className="cert-item">
                <strong>PC Pro Certification</strong>
                <a href="https://certification.testout.com/verifycert/6-2C6-M4997" target="_blank" rel="noopener noreferrer">
                  Verify
                </a>
              </div>
              <div className="cert-item">
                <strong>Network Pro Certification</strong>
                <a href="https://certification.testout.com/verifycert/6-2C6-SP9QT" target="_blank" rel="noopener noreferrer">
                  Verify
                </a>
              </div>
              <div className="cert-item">
                <strong>Security Pro Certification</strong>
                <a href="https://certification.testout.com/verifycert/6-2C6-V3A3KA" target="_blank" rel="noopener noreferrer">
                  Verify
                </a>
              </div>
            </div>

            <h4 className="cert-category">National Cyber League (NCL)</h4>
            <div className="certs-grid">
              <div className="cert-item">
                <strong>NCL Fall 2025 Team Game</strong>
                <span className="badge diamond">Diamond-4</span>
                <span className="percentile">87th Percentile</span>
                <a href="https://cyberskyline.com/verify/433Q1RTAP7WT" target="_blank" rel="noopener noreferrer">
                  Verify
                </a>
              </div>
              <div className="cert-item">
                <strong>NCL Fall 2025 Individual</strong>
                <span className="badge diamond">Diamond-1</span>
                <span className="percentile">83rd Percentile</span>
                <a href="https://cyberskyline.com/verify/P0GK5KL1N4VA" target="_blank" rel="noopener noreferrer">
                  Verify
                </a>
              </div>
              <div className="cert-item">
                <strong>NCL Fall 2024 Team Game</strong>
                <span className="badge diamond">Diamond-3</span>
                <span className="percentile">97th Percentile</span>
                <a href="https://cyberskyline.com/verify/8N631HG39DG2" target="_blank" rel="noopener noreferrer">
                  Verify
                </a>
              </div>
              <div className="cert-item">
                <strong>NCL Fall 2024 Individual</strong>
                <span className="badge diamond">Diamond-1</span>
                <span className="percentile">87th Percentile</span>
                <a href="https://cyberskyline.com/verify/D7YWWNXMDH4N" target="_blank" rel="noopener noreferrer">
                  Verify
                </a>
              </div>
              <div className="cert-item">
                <strong>NCL Fall 2022 Team Game</strong>
                <span className="badge gold">Gold</span>
                <a href="https://cyberskyline.com/verify/3RXF0FUJXNAW" target="_blank" rel="noopener noreferrer">
                  Verify
                </a>
              </div>
              <div className="cert-item">
                <strong>NCL Fall 2022 Individual</strong>
                <span className="badge platinum">Platinum</span>
                <a href="https://cyberskyline.com/verify/MUXA657MJX6X" target="_blank" rel="noopener noreferrer">
                  Verify
                </a>
              </div>
              <div className="cert-item">
                <strong>NCL Spring 2023 Team Game</strong>
                <span className="badge platinum">Platinum</span>
                <a href="https://cyberskyline.com/verify/UCQR3H95VD3V" target="_blank" rel="noopener noreferrer">
                  Verify
                </a>
              </div>
              <div className="cert-item">
                <strong>NCL Spring 2023 Individual</strong>
                <span className="badge platinum">Platinum</span>
                <a href="https://cyberskyline.com/verify/CPCFW8GL10N4" target="_blank" rel="noopener noreferrer">
                  Verify
                </a>
              </div>
              <div className="cert-item">
                <strong>NCL Fall 2023 Team Game</strong>
                <span className="badge gold">Gold</span>
                <a href="https://cyberskyline.com/verify/MLBDDJNL01K0" target="_blank" rel="noopener noreferrer">
                  Verify
                </a>
              </div>
              <div className="cert-item">
                <strong>NCL Fall 2023 Individual</strong>
                <span className="badge bronze">Bronze</span>
                <a href="https://cyberskyline.com/verify/JNDQPQJLPJPC" target="_blank" rel="noopener noreferrer">
                  Verify
                </a>
              </div>
            </div>

            <h4 className="cert-category">Cyber Cup Competitions</h4>
            <div className="certs-grid">
              <div className="cert-item">
                <strong>IE CA Mayors Cyber Cup 2025 Main Event</strong>
                <span className="achievement">3rd Place / 143 Teams</span>
                <span className="achievement">1st in Inland Empire Colleges</span>
                <span className="percentile">1470 / 2075 Points</span>
              </div>
              <div className="cert-item">
                <strong>SoCal Cyber Cup Final Round 2024</strong>
                <a href="https://cyberskyline.com/verify/8D3FU1H344UM" target="_blank" rel="noopener noreferrer">
                  Verify
                </a>
              </div>
              <div className="cert-item">
                <strong>IE/Desert CA Mayors Cyber Cup 2023</strong>
                <span className="achievement">25th Place / 91 Teams</span>
                <span className="percentile">725 / 2000 Points</span>
              </div>
              <div className="cert-item">
                <strong>SoCal Cyber Cup Qualifier Round</strong>
                <a href="https://cyberskyline.com/verify/UFVQF7TAVHP0" target="_blank" rel="noopener noreferrer">
                  Verify
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section section-alt contact-section">
          <div className="contact-faulty">
            <FaultyTerminal
              tint="#00e38c"
              brightness={0.15}
              scanlineIntensity={0.5}
              glitchAmount={1.2}
              flickerAmount={0.3}
              mouseReact={false}
              pageLoadAnimation={false}
              curvature={0}
            />
          </div>
          <div className="container contact-container">
            <h3>
              <SplitText
                text="Get In Touch"
                tag="span"
                splitType="chars"
                delay={40}
                duration={0.8}
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                rootMargin="-80px"
              />
            </h3>
            <div className="contact-info">
              <p>
                <strong>Email:</strong> <a href="mailto:h4ch1net@gmail.com">h4ch1net@gmail.com</a>
              </p>
              <p>
                <strong>GitHub:</strong> <a href="https://github.com/H4ch1Net" target="_blank" rel="noopener noreferrer">H4ch1Net</a>
              </p>
              <p>
                <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/mauro-hernandez-rico" target="_blank" rel="noopener noreferrer">mauro-hernandez-rico</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} H4ch1.Net</p>
        </div>
      </footer>
    </div>
  )
}

export default App
