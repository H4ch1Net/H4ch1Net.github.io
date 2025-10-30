import Navigation from '../components/Navigation';
import { Code, Shield, Terminal, Briefcase, GraduationCap, Languages } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <div className="border-b border-[#00e38c]/20 py-6 sm:py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 sm:mb-6">
            <span className="text-[#00e38c]">&lt;</span>
            About Me
            <span className="text-[#00e38c]">/&gt;</span>
          </h1>
          <Navigation />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-[#00e38c]/20 rounded-xl p-6 sm:p-8 md:p-10 shadow-2xl mb-8 sm:mb-12">
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
            Hi, I'm <span className="font-bold text-[#00e38c]" style={{ textShadow: '0 0 10px rgba(0, 227, 140, 0.5)' }}>Mauro</span>.
            I'm currently studying Computer Science at California State University, San Bernardino, and
            Information Systems at College of the Desert. My passion for technology began when I started
            experimenting with code, and it's grown into a fascination with cybersecurity, software development,
            and everything in between.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
            I'm bilingual and speak both <span className="font-bold text-[#00e38c]">Spanish and English</span> fluently.
            My interests span across coding in Python (with recent forays into C++ and C#), working with electronics
            like Raspberry Pi's and Arduino, and competing in cybersecurity Capture the Flag events.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
            By day, I work as an <span className="font-bold text-[#00e38c]" style={{ textShadow: '0 0 10px rgba(0, 227, 140, 0.5)' }}>
            Information Systems Apprentice and Desktop Technician</span> at Eisenhower Health, ensuring everything
            runs smoothly and learning along the way. Outside of work, I'm often doing schoolwork, playing video games,
            coding, building projects, or learning nerdy stuff.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
            This website is where I share my projects, ideas, and things that I come across. Feel free to reach out—I'm
            always up for collaboration, a chat, or job opportunities.
          </p>
          <p className="text-3xl sm:text-4xl md:text-5xl text-[#00e38c] mt-8 text-center" style={{ textShadow: '0 0 15px rgba(0, 227, 140, 0.6)' }}>
            :3
          </p>
        </div>

        {/* Skills and Interests Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-black/50 border border-[#00e38c]/30 rounded-lg p-4 sm:p-6 hover:border-[#00e38c]/60 transition-all">
            <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 text-[#00e38c] mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Education</h3>
            <p className="text-sm sm:text-base text-gray-400">Computer Science & Information Systems</p>
          </div>
          <div className="bg-black/50 border border-[#00e38c]/30 rounded-lg p-4 sm:p-6 hover:border-[#00e38c]/60 transition-all">
            <Briefcase className="w-10 h-10 sm:w-12 sm:h-12 text-[#00e38c] mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Work</h3>
            <p className="text-sm sm:text-base text-gray-400">IS Apprentice & Desktop Technician</p>
          </div>
          <div className="bg-black/50 border border-[#00e38c]/30 rounded-lg p-4 sm:p-6 hover:border-[#00e38c]/60 transition-all">
            <Languages className="w-10 h-10 sm:w-12 sm:h-12 text-[#00e38c] mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Languages</h3>
            <p className="text-sm sm:text-base text-gray-400">Spanish & English (Bilingual)</p>
          </div>
          <div className="bg-black/50 border border-[#00e38c]/30 rounded-lg p-4 sm:p-6 hover:border-[#00e38c]/60 transition-all">
            <Code className="w-10 h-10 sm:w-12 sm:h-12 text-[#00e38c] mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Programming</h3>
            <p className="text-sm sm:text-base text-gray-400">Python, C++, C#, JavaScript</p>
          </div>
          <div className="bg-black/50 border border-[#00e38c]/30 rounded-lg p-4 sm:p-6 hover:border-[#00e38c]/60 transition-all">
            <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-[#00e38c] mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Cybersecurity</h3>
            <p className="text-sm sm:text-base text-gray-400">CTF Competitions & Research</p>
          </div>
          <div className="bg-black/50 border border-[#00e38c]/30 rounded-lg p-4 sm:p-6 hover:border-[#00e38c]/60 transition-all">
            <Terminal className="w-10 h-10 sm:w-12 sm:h-12 text-[#00e38c] mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Electronics</h3>
            <p className="text-sm sm:text-base text-gray-400">Raspberry Pi & Arduino Projects</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#00e38c]/20 py-6 sm:py-8 px-4 text-center mt-12 sm:mt-20">
        <p className="text-sm sm:text-base text-gray-400">
          <span className="text-[#00e38c]">~$</span> H4ch1.Net © {new Date().getFullYear()}
          <span className="mx-2">|</span>
          Built with React & Tailwind CSS
        </p>
      </footer>
    </div>
  );
};

export default About;
