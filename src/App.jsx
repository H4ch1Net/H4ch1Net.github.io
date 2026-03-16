import { useState } from 'react'
import './App.css'
import Particles from './components/Particles'
import BlurText from './components/BlurText'
import SplitText from './components/SplitText'
import SpotlightCard from './components/SpotlightCard'

const SKILLS_TABS = ['Cybersecurity', 'Computer Science', 'IT']

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
                    <li>NCL Diamond Tier — 97th percentile (Team Game)</li>
                    <li>IE/CA Mayors Cyber Cup 2025 — 3rd Place / 143 Teams, 1st in Inland Empire Colleges</li>
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
                    <li>Steganography</li>
                    <li>Log Analysis</li>
                    <li>Cryptography</li>
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
                    <li>B.S. Computer Science — CSUSB (May 2027)</li>
                    <li>A.S. Computer Information Systems — COD</li>
                    <li>Helix Fellowship — AI benchmark task developer</li>
                    <li>Co-founder, Atlas Technology Systems (MSP startup, Coachella Valley)</li>
                  </ul>
                </div>
                <div className="card-spotlight skills-card">
                  <h4>Projects</h4>
                  <ul className="skills-list">
                    <li>Bagley AI kiosk (OpenClaw)</li>
                    <li>OSINT exposure tool (Python)</li>
                    <li>ESP8266 home temp monitor (Home Assistant)</li>
                    <li>KS LED Controller</li>
                  </ul>
                </div>
                <div className="card-spotlight skills-card">
                  <h4>Languages</h4>
                  <ul className="skills-list">
                    <li>Python</li>
                    <li>JavaScript</li>
                    <li>C</li>
                    <li>C++</li>
                    <li>C#</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'IT' && (
            <div className="skills-panel">
              <div className="skills-grid">
                <div className="card-spotlight skills-card">
                  <h4>Work Experience</h4>
                  <ul className="skills-list">
                    <li>IT Apprentice — Eisenhower Health, Rancho Mirage CA (~30–32 hrs/week)</li>
                    <li>Roles spanning Service Desk through Systems Administrator</li>
                  </ul>
                </div>
                <div className="card-spotlight skills-card">
                  <h4>Skill Areas</h4>
                  <ul className="skills-list">
                    <li>Endpoint management</li>
                    <li>Ticketing systems</li>
                    <li>Network infrastructure</li>
                    <li>Healthcare IT</li>
                    <li>Active Directory</li>
                    <li>Imaging and deployment</li>
                  </ul>
                </div>
                <div className="card-spotlight skills-card">
                  <h4>Certifications</h4>
                  <ul className="skills-list">
                    <li>CompTIA A+</li>
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

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1 className="logo">H4ch1.Net</h1>
          <nav className="nav">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#certificates">Certificates</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-particles">
            <Particles
              particleCount={80}
              particleSpread={8}
              speed={0.05}
              particleColors={['#00e38c', '#00e38c', '#00c078']}
              alphaParticles={true}
              particleBaseSize={60}
              sizeRandomness={0.8}
              disableRotation={false}
            />
          </div>
          <div className="container hero-content">
            <h2>
              <BlurText
                text="Hi, I'm Mauro"
                delay={120}
                animateBy="words"
                direction="top"
                stepDuration={0.4}
                className="hero-blur-text"
              />
            </h2>
            <p className="subtitle">Computer Science & Information Systems Student</p>
            <p className="description">
              Passionate about cybersecurity, software development, and all things tech.
            </p>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
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
                I'm currently studying Computer Science at California State University, San Bernardino,
                and Information Systems at College of the Desert. My passion for technology began when I
                started experimenting with code, and it's grown into a fascination with cybersecurity,
                software development, and everything in between.
              </p>
              <p>
                I'm bilingual in Spanish and English. My interests include coding in Python, C++, and C#,
                working with electronics like Raspberry Pi and Arduino, and competing in cybersecurity
                Capture the Flag events.
              </p>
              <p>
                By day, I work as an Information Systems Apprentice and Desktop Technician at Eisenhower Health,
                ensuring everything runs smoothly and learning along the way.
              </p>
            </div>
          </div>
        </section>

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
                <h4>KS LED Controller</h4>
                <p>Hardware LED controller with custom firmware and web interface.</p>
                <a href="https://github.com/H4ch1Net/ks-led-controller" className="btn" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </SpotlightCard>
              <SpotlightCard className="card" spotlightColor="rgba(0, 227, 140, 0.1)">
                <h4>Bagley-Bot</h4>
                <p>A Discord bot that uses ChatGPT to answer user messages.</p>
                <a href="https://github.com/H4ch1Net" className="btn" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </SpotlightCard>
              <SpotlightCard className="card" spotlightColor="rgba(0, 227, 140, 0.1)">
                <h4>Portfolio Website</h4>
                <p>This website - built with React and modern web technologies.</p>
                <a href="https://github.com/H4ch1Net/H4ch1Net.github.io" className="btn" target="_blank" rel="noopener noreferrer">
                  View Source
                </a>
              </SpotlightCard>
            </div>
          </div>
        </section>

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

        <section id="contact" className="section section-alt">
          <div className="container">
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
