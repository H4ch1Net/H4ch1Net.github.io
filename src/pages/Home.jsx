import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail, Code, Shield, Terminal, ChevronDown } from 'lucide-react';
import Navigation from '../components/Navigation';

const Home = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-[#00e38c] rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-[#00e38c] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-6 inline-block">
            <span className="text-[#00e38c] text-base sm:text-xl font-mono">// Welcome to</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
            <span className="text-[#00e38c]">H4ch1</span>
            <span className="text-white">.Net</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8">
            Computer Science & Information Systems Student
          </p>
          <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            Passionate about coding, cybersecurity, and everything tech-related.
            Building innovative solutions and exploring the digital frontier.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 px-4">
            <Link
              to="/projects"
              className="bg-[#00e38c] text-black px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-[#00e38c]/90 transition-all transform hover:scale-105"
            >
              View My Work
            </Link>
            <Link
              to="/about"
              className="border-2 border-[#00e38c] text-[#00e38c] px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-[#00e38c]/10 transition-all"
            >
              Learn More
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 sm:mt-16 px-4">
            <div className="bg-black/50 border border-[#00e38c]/30 rounded-lg p-4 sm:p-6 text-center">
              <Code className="w-10 h-10 sm:w-12 sm:h-12 text-[#00e38c] mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Development</h3>
              <p className="text-sm sm:text-base text-gray-400">Full-stack web & software</p>
            </div>
            <div className="bg-black/50 border border-[#00e38c]/30 rounded-lg p-4 sm:p-6 text-center">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-[#00e38c] mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Security</h3>
              <p className="text-sm sm:text-base text-gray-400">Cybersecurity research</p>
            </div>
            <div className="bg-black/50 border border-[#00e38c]/30 rounded-lg p-4 sm:p-6 text-center">
              <Terminal className="w-10 h-10 sm:w-12 sm:h-12 text-[#00e38c] mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-sm sm:text-base text-gray-400">Building the future</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-[#00e38c]" />
        </div>
      </section>

      {/* Navigation Section */}
      <section className="py-12 sm:py-20 px-4 border-t border-[#00e38c]/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
            <span className="text-[#00e38c]">&lt;</span>
            Explore
            <span className="text-[#00e38c]">/&gt;</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-12 px-4">
            Discover more about my work, achievements, and journey in tech
          </p>
          <Navigation />
        </div>
      </section>

      {/* Quick Contact Section */}
      <section className="py-12 sm:py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            <span className="text-[#00e38c]">&lt;</span>
            Get In Touch
            <span className="text-[#00e38c]">/&gt;</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 px-4">
            Want to collaborate or just say hello? Feel free to reach out!
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4">
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
      <footer className="border-t border-[#00e38c]/20 py-6 sm:py-8 px-4 text-center">
        <p className="text-sm sm:text-base text-gray-400">
          <span className="text-[#00e38c]">~$</span> H4ch1.Net © {new Date().getFullYear()}
          <span className="mx-2">|</span>
          Built with React & Tailwind CSS
        </p>
      </footer>
    </div>
  );
};

export default Home;
