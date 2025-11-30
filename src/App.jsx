import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1 className="logo">H4ch1.Net</h1>
          <nav className="nav">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#certificates">Certificates</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <h2>Hi, I'm Mauro</h2>
            <p className="subtitle">Computer Science & Information Systems Student</p>
            <p className="description">
              Passionate about cybersecurity, software development, and all things tech.
            </p>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <h3>About Me</h3>
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

        <section id="projects" className="section section-alt">
          <div className="container">
            <h3>Projects</h3>
            <div className="projects-grid">
              <div className="card">
                <h4>Bagley-Bot</h4>
                <p>A Discord bot that uses ChatGPT to answer user messages.</p>
                <a href="https://github.com/H4ch1Net" className="btn" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </div>
              <div className="card">
                <h4>Portfolio Website</h4>
                <p>This website - built with React and modern web technologies.</p>
                <a href="https://github.com/H4ch1Net/H4ch1Net.github.io" className="btn" target="_blank" rel="noopener noreferrer">
                  View Source
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="certificates" className="section">
          <div className="container">
            <h3>Certifications</h3>
            <div className="certs-grid">
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
          </div>
        </section>

        <section id="contact" className="section section-alt">
          <div className="container">
            <h3>Get In Touch</h3>
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
