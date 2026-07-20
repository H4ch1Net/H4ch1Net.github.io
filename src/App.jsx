import { useState, useEffect, useRef } from 'react'
import './App.css'
import Particles from './components/Particles'
import SplitText from './components/SplitText'
import SpotlightCard from './components/SpotlightCard'
import FaultyTerminal from './components/FaultyTerminal'
import { loadLogs } from './lib/loadLogs'

const HERO_STATS = [
  'NCL Diamond',
  '1st · IE Cyber Cup',
  'NASA Team MVP',
  'Sysadmin @ Eisenhower Health',
]

const SKILLS_TABS = ['Cybersecurity', 'Computer Science', 'IT']

// Mounts heavy WebGL/canvas background decorations only while they are near the
// viewport, so their animation loops stop running when scrolled away. Reduced-
// motion users never get the decoration at all.
function LazyDecoration({ children, className, rootMargin = '150px' }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {active ? children : null}
    </div>
  )
}

function HeroName() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="hero-scramble-text"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="scramble-static">Hi, I'm </span>
      <span className="scramble-name" key={hovered ? 'h4ch1' : 'mauro'}>
        {hovered ? 'H4ch1' : 'Mauro'}
      </span>
    </div>
  )
}

// Baseline for the hero uptime counter: start of the Eisenhower apprenticeship.
const SITE_EPOCH = Date.parse('2024-06-01T00:00:00')

function StatusIndicator() {
  const days = Math.floor((Date.now() - SITE_EPOCH) / 86400000)
  return (
    <div className="status-indicator">
      <span className="status-dot" aria-hidden="true" />
      <span className="status-label">operational</span>
      <span className="status-uptime">uptime {days}d</span>
    </div>
  )
}

function SkillsSection() {
  const [activeTab, setActiveTab] = useState('Cybersecurity')

  return (
    <section id="skills" className="section">
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
                    <li>NCL, MetaCTF, SkillBit Flash CTF competitor</li>
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
                  <ul className="skills-pills">
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
                    <li>B.S. Computer Science, CSUSB (Expected 2029)</li>
                    <li>A.S. Computer Information Systems, COD (Expected 2027)</li>
                    <li>Dual-enrolled full-time at both institutions</li>
                    <li>Software engineering & agentic AI development</li>
                  </ul>
                </div>
                <div className="card-spotlight skills-card">
                  <h4>AI & Tooling</h4>
                  <ul className="skills-list">
                    <li>LLM API integration (OpenAI, Anthropic)</li>
                    <li>Autonomous task execution</li>
                    <li>Voice + text input pipelines</li>
                    <li>Python automation scripting</li>
                    <li>FastAPI, REST</li>
                  </ul>
                </div>
                <div className="card-spotlight skills-card">
                  <h4>Languages & Frameworks</h4>
                  <ul className="skills-list">
                    <li>Python, MicroPython</li>
                    <li>JavaScript, C, C++, C#</li>
                    <li>PowerShell, Bash</li>
                    <li>React, Vite</li>
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
                    <li className="cert-pending">CompTIA Security+ (In Progress, Sep 2026)</li>
                    <li className="cert-pending">CCNA (In Progress, Fall 2026)</li>
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
    period: 'Jun 2025 - Present',
    bullets: [
      'Built NERD, a Python CLI replacing spreadsheets for tracking 500+ switches, routers, and hardware; full CRUD, JSON-backed, zero external libraries',
      'Building a real-time Cisco port monitor: threaded ICMP pings, color-coded ASCII output for the network team',
      'Shipped three production tools in the first 60 days; all run on Python stdlib, so there is no install friction on segmented hospital infrastructure',
      'HIPAA-compliant across all system access and data handling',
    ],
  },
  {
    role: 'IT Desktop Technician',
    org: 'Eisenhower Health · IT Apprenticeship',
    location: 'Rancho Mirage, CA',
    period: 'Sep 2024 - Jun 2025',
    bullets: [
      'Wrote a PowerShell imaging script with AD group selection and software profiles, cutting an 8-hour process down to parallel, fire-and-forget jobs',
      'AD object management, Group Policy enforcement, 10+ daily tickets via Ivanti and RDP across clinical and admin departments',
      'Windows 11 upgrades and Blancco secure wipes for healthcare data compliance',
    ],
  },
  {
    role: 'IT Service Desk',
    org: 'Eisenhower Health · IT Apprenticeship',
    location: 'Rancho Mirage, CA',
    period: 'Jun 2024 - Sep 2024',
    bullets: [
      '25-30+ tickets per day via JIRA across clinical and admin departments',
      'HIPAA compliance on all patient-adjacent system access',
    ],
  },
]

function ExperienceSection() {
  return (
    <section id="experience" className="section section-alt experience-section">
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
  return (
    <div className="github-section">
      <h4 className="github-heading">// more on github</h4>
      <p className="github-blurb">
        Most of what I build lives on GitHub, from CTF tooling to work automation. Public repos are
        open to browse.
      </p>
      <a className="github-all-link" href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer">
        view all repos →
      </a>
    </div>
  )
}

const HONORS = [
  {
    place: '1st',
    title: 'Inland Empire Mayors Cyber Cup',
    org: 'IEGO Collaborative · 2025',
    detail: 'College Division, 3rd overall / 143 teams',
  },
  {
    place: 'MVP',
    title: 'NASA NCAS 2026',
    org: 'National Community College Aerospace Scholars',
    detail: 'Selected Team MVP, most autonomous rover in the competition',
  },
  {
    place: 'Diamond',
    title: 'National Cyber League',
    org: 'Fall 2024 Team Game',
    detail: 'Diamond Tier, Top 3%',
    verifyUrl: 'https://cyberskyline.com/verify/8N631HG39DG2',
  },
  {
    place: 'Diamond',
    title: 'National Cyber League',
    org: 'Fall 2025 Individual',
    detail: 'Diamond Tier, 83rd percentile',
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

const LOGS = loadLogs()

function LogsSection() {
  return (
    <section id="logs" className="section logs-section">
      <div className="container">
        <h3>
          <SplitText
            text="Logs"
            tag="span"
            splitType="chars"
            delay={40}
            duration={0.8}
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            rootMargin="-80px"
          />
        </h3>
        <p className="logs-intro">Field notes from work, competitions, and the lab. Short, dated, unpolished.</p>
        {LOGS.length === 0 ? (
          <p className="logs-empty">── no entries logged ──</p>
        ) : (
          <div className="logs-list">
            {LOGS.map(entry => (
              <SpotlightCard
                key={`${entry.date}-${entry.title}`}
                className="log-entry"
                spotlightColor="rgba(0, 227, 140, 0.08)"
              >
                <div className="log-meta">
                  <span className="log-dot" aria-hidden="true" />
                  <span className="log-date">{entry.date}</span>
                  {entry.tags.map(tag => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <h4 className="log-title">{entry.title}</h4>
                {entry.paragraphs.map((p, i) => (
                  <p className="log-body" key={i}>{p}</p>
                ))}
              </SpotlightCard>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function App() {
  useEffect(() => {
    console.log(
      '%c H4ch1.Net %c\n\nThanks for looking under the hood. If you like what you see and you\'re hiring, reach me at h4ch1net@gmail.com',
      'background:#00e38c;color:#000;font-weight:700;padding:2px 8px;border-radius:3px;font-family:monospace;',
      'color:#00e38c;font-family:monospace;'
    )
  }, [])

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1 className="logo">H4CH1</h1>
          <nav className="nav">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#honors">Honors</a>
            <a href="#certificates">Certificates</a>
            <a href="#logs">Logs</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <LazyDecoration className="hero-particles">
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
          </LazyDecoration>
          <div className="container hero-content">
            <StatusIndicator />
            <HeroName />
            <p className="subtitle-terminal">
              Systems Administrator · Cybersecurity · Software Engineering
            </p>
            <p className="description">
              IT apprentice shipping Python tools at a health system, competing in CTFs, and studying CS, all at once.
            </p>
            <div className="hero-stats">
              {HERO_STATS.map((stat, i) => (
                <span className="hero-stat" key={stat} style={{ animationDelay: `${0.15 * i + 0.3}s` }}>
                  {stat}
                </span>
              ))}
            </div>
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
                I work in IT at Eisenhower Health through an apprenticeship, currently as Systems Administrator.
                At the same time, I'm studying CS at CSUSB and CIS at College of the Desert, full-time at both.
              </p>
              <p>
                My work is mostly Python: network automation, CLI tools, and monitoring scripts that the team
                actually runs. I also compete in CTF events. The placements and verifications are in the
                Honors section below.
              </p>
              <p>
                Bilingual (English & Spanish), President of the COD Cyber Competition Team. I enjoy hardware
                like Raspberry Pi, ESP32, and Arduino, and have a habit of reverse-engineering things just to
                see how they work.
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
                  <span className="tag">Detection Engineering</span>
                  <span className="tag">FastAPI</span>
                </div>
                <h4>sentryd</h4>
                <p>
                  Network anomaly detection tool. A rule-based detection engine paired with an LLM
                  analyst layer, a Textual terminal dashboard, and a FastAPI web UI for reviewing
                  flagged events.
                </p>
                <a href="https://github.com/H4ch1Net/sentryd" className="btn" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </SpotlightCard>
              <SpotlightCard className="card" spotlightColor="rgba(0, 227, 140, 0.1)">
                <div className="card-tags">
                  <span className="tag">Python</span>
                  <span className="tag">Automation</span>
                  <span className="tag">SQLite</span>
                </div>
                <h4>job-hunter</h4>
                <p>
                  Personal job search automation. Aggregates listings from Adzuna, USAJobs,
                  The Muse, and RemoteOK, scores relevance with an LLM, and serves results
                  through a local dashboard backed by SQLite.
                </p>
                <span className="card-note">Private repo</span>
              </SpotlightCard>
              <SpotlightCard className="card" spotlightColor="rgba(0, 227, 140, 0.1)">
                <div className="card-tags">
                  <span className="tag">Python</span>
                  <span className="tag">LLM APIs</span>
                  <span className="tag">SSH</span>
                </div>
                <h4>Bagley</h4>
                <p>
                  AI assistant controlled by voice or text. It SSHs into machines, runs network scans,
                  and executes system tasks on command. Built in Python with LLM API integration.
                </p>
                <a href="https://github.com/H4ch1Net/bagley-assistant" className="btn" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </SpotlightCard>
              <SpotlightCard className="card" spotlightColor="rgba(0, 227, 140, 0.1)">
                <div className="card-tags">
                  <span className="tag">Python</span>
                  <span className="tag">CLI</span>
                  <span className="tag">In Production</span>
                </div>
                <h4>NERD</h4>
                <p>
                  Python CLI I built at work to replace a spreadsheet. Tracks 500+ switches, routers,
                  and hardware: asset tags, serials, purchase orders. No external dependencies.
                </p>
                <span className="card-note">Internal tool</span>
              </SpotlightCard>
              <SpotlightCard className="card" spotlightColor="rgba(0, 227, 140, 0.1)">
                <div className="card-tags">
                  <span className="tag">Python</span>
                  <span className="tag">OSINT</span>
                  <span className="tag">CTF</span>
                </div>
                <h4>Nexus</h4>
                <p>
                  My go-to Python toolkit for CTF events. Crypto, OSINT, password cracking, network
                  analysis, forensics, all in one place, actively maintained.
                </p>
                <a href="https://github.com/H4ch1Net/Nexus" className="btn" target="_blank" rel="noopener noreferrer">
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
                  Built for NASA NCAS 2026. Coordinate navigation, gyro correction, ultrasonic obstacle
                  avoidance, color-based mineral ID. Outperformed all other teams and earned Team MVP.
                </p>
                <a href="https://github.com/H4ch1Net/NCAS26-RedGiant-Jarvis" className="btn" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </SpotlightCard>
              <SpotlightCard className="card" spotlightColor="rgba(0, 227, 140, 0.1)">
                <div className="card-tags">
                  <span className="tag">React</span>
                  <span className="tag">Canvas API</span>
                  <span className="tag">pdf-lib</span>
                </div>
                <h4>Memory Threads</h4>
                <p>
                  Mockup generator built in a day at the PS/NExT Vibe-a-thon for a sustainable apparel
                  client. 4 color variants, front/back views, exports to PNG, PDF, PowerPoint, and SVG.
                </p>
                <span className="card-note">Private repo</span>
              </SpotlightCard>
              <SpotlightCard className="card" spotlightColor="rgba(0, 227, 140, 0.1)">
                <div className="card-tags">
                  <span className="tag">Python</span>
                  <span className="tag">Bluetooth</span>
                  <span className="tag">Reverse Eng</span>
                </div>
                <h4>KS LED Controller</h4>
                <p>
                  Reverse-engineered the Bluetooth protocol for discontinued KS LED hardware, then wrote
                  a Python replacement for the broken vendor app. Open source, 5 stars.
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

        <section id="certificates" className="section section-alt">
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

        <LogsSection />

        <section id="contact" className="section section-alt contact-section">
          <LazyDecoration className="contact-faulty">
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
          </LazyDecoration>
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
                <span className="contact-icon">✉</span>
                <strong>Email:</strong> <a href="mailto:h4ch1net@gmail.com">h4ch1net@gmail.com</a>
              </p>
              <p>
                <span className="contact-icon">⌗</span>
                <strong>GitHub:</strong> <a href="https://github.com/H4ch1Net" target="_blank" rel="noopener noreferrer">H4ch1Net</a>
              </p>
              <p>
                <span className="contact-icon">in</span>
                <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/mauro-hernandez-rico" target="_blank" rel="noopener noreferrer">mauro-hernandez-rico</a>
              </p>
              <p className="contact-resume">Résumé available on request.</p>
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
