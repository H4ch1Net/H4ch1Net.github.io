import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AsciiText from './components/AsciiText';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Certificates from './pages/Certificates';

function App() {
  return (
    <Router>
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#000',
        color: '#00e38c',
        fontFamily: 'JetBrains Mono, monospace',
      }}>
        <header style={{
          textAlign: 'center',
          padding: '40px 20px',
          backgroundColor: '#000',
          boxShadow: '0 4px 24px rgba(0, 227, 140, 0.2)',
          borderBottom: '2px solid rgba(0, 227, 140, 0.3)',
          marginBottom: '40px',
        }}>
          <AsciiText text="H4ch1.Net" />
          <Navigation />
        </header>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px 60px',
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certificates" element={<Certificates />} />
          </Routes>
        </div>

        <footer style={{
          textAlign: 'center',
          padding: '30px 20px',
          borderTop: '2px solid rgba(0, 227, 140, 0.3)',
          marginTop: '60px',
          background: 'rgba(0, 227, 140, 0.05)',
        }}>
          <p style={{
            color: '#00e38c',
            fontSize: '1rem',
            margin: 0,
          }}>
            © {new Date().getFullYear()} H4ch1.Net - Built with React & ReactBits
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
