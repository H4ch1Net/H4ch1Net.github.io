import React, { useState, useEffect } from 'react';
import { Github, Mail, Terminal, Code, Shield, Server, ChevronDown, Menu, X } from 'lucide-react';

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'projects', 'achievements', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const projects = [
    {
      title: "Bagley-Bot",
      description: "A Discord bot powered by ChatGPT that responds intelligently to user messages, bringing AI conversation capabilities to your server.",
      tech: ["Python", "Discord.py", "OpenAI API"],
      icon: <Terminal className="w-8 h-8" />
    },
    {
      title: "H4ch1.Net Portfolio",
      description: "The website you're currently viewing - a modern, responsive portfolio showcasing projects and achievements.",
      tech: ["React", "Tailwind CSS", "JavaScript"],
      icon: <Code className="w-8 h-8" />
    }
  ];

  const achievements = [
    {
      title: "Cybersecurity Research",
      description: "Ongoing exploration of security vulnerabilities and defensive strategies",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Full-Stack Development",
      description: "Building scalable applications from database to frontend",
      icon: <Server className="w-6 h-6" />
    },
    {
      title: "Open Source Contributions",
      description: "Contributing to various tech projects and communities",
      icon: <Code className="w-6 h-6" />
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-sm border-b border-[#00e38c]/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold">
              <span className="text-[#00e38c]">~$</span>
              <span className="ml-2">H4ch1</span>
              <span className="text-[#00e38c]">.Net</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'achievements', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors ${
                    activeSection === item ? 'text-[#00e38c]' : 'text-white hover:text-[#00e38c]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#00e38c]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              {['home', 'about', 'projects', 'achievements', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left capitalize py-2 ${
                    activeSection === item ? 'text-[#00e38c]' : 'text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00e38c] rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00e38c] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="mb-6 inline-block">
            <span className="text-[#00e38c] text-xl font-mono">// Welcome to</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold mb-6">
            <span className="text-[#00e38c]">H4ch1</span>
            <span className="text-white">.Net</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8">
            Computer Science & Information Systems Student
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Passionate about coding, cybersecurity, and everything tech-related.
            Building innovative solutions and exploring the digital frontier.
          </p>
          <button
            onClick={() => scrollToSection('projects')}
            className="bg-[#00e38c] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#00e38c]/90 transition-all transform hover:scale-105"
          >
            View My Work
          </button>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-[#00e38c]" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="text-[#00e38c]">&lt;</span>
            About Me
            <span className="text-[#00e38c]">/&gt;</span>
          </h2>

          <div className="bg-gradient-to-br from-gray-900 to-black border border-[#00e38c]/20 rounded-xl p-8 shadow-2xl">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 mb-6">
                I'm a computer science and information systems student with a deep interest in coding,
                cybersecurity, and anything tech-related. My journey in technology is driven by curiosity
                and the desire to create meaningful solutions to complex problems.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                From building Discord bots to exploring security vulnerabilities, I love diving deep into
                projects that challenge me and expand my skillset. I believe in continuous learning and
                staying at the forefront of technological innovation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                <div className="bg-black/50 border border-[#00e38c]/30 rounded-lg p-6 text-center">
                  <Code className="w-12 h-12 text-[#00e38c] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Development</h3>
                  <p className="text-gray-400">Full-stack web & software development</p>
                </div>
                <div className="bg-black/50 border border-[#00e38c]/30 rounded-lg p-6 text-center">
                  <Shield className="w-12 h-12 text-[#00e38c] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Security</h3>
                  <p className="text-gray-400">Cybersecurity research & analysis</p>
                </div>
                <div className="bg-black/50 border border-[#00e38c]/30 rounded-lg p-6 text-center">
                  <Terminal className="w-12 h-12 text-[#00e38c] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                  <p className="text-gray-400">Building the future of technology</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="text-[#00e38c]">&lt;</span>
            Projects
            <span className="text-[#00e38c]">/&gt;</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="bg-black border border-[#00e38c]/20 rounded-xl p-8 hover:border-[#00e38c]/60 transition-all transform hover:-translate-y-2 shadow-lg hover:shadow-[#00e38c]/20"
              >
                <div className="text-[#00e38c] mb-4">{project.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-gray-400 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-[#00e38c]/10 text-[#00e38c] px-3 py-1 rounded-full text-sm border border-[#00e38c]/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="text-[#00e38c]">&lt;</span>
            Achievements
            <span className="text-[#00e38c]">/&gt;</span>
          </h2>

          <div className="space-y-6">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-r from-gray-900 to-black border border-[#00e38c]/20 rounded-xl p-6 hover:border-[#00e38c]/60 transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-[#00e38c] mt-1">{achievement.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-gray-400">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 italic">
              "Nerd things that I have done recently or other things..."
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-[#00e38c]">&lt;</span>
            Get In Touch
            <span className="text-[#00e38c]">/&gt;</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Want to collaborate or just say hello? Feel free to reach out!
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            <a
              href="https://github.com/H4ch1Net"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#00e38c] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#00e38c]/90 transition-all transform hover:scale-105"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <a
              href="mailto:h4ch1net@gmail.com"
              className="flex items-center justify-center gap-2 bg-[#00e38c] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#00e38c]/90 transition-all transform hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              Email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#00e38c]/20 py-8 px-4 text-center">
        <p className="text-gray-400">
          <span className="text-[#00e38c]">~$</span> H4ch1.Net © {new Date().getFullYear()}
          <span className="mx-2">|</span>
          Built with React & Tailwind CSS
        </p>
      </footer>
    </div>
  );
};

export default Home;
