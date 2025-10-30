import Navigation from '../components/Navigation';
import { Terminal, Code, Bot, Laptop } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Bagley-Bot",
      description: "A Discord bot powered by ChatGPT that responds intelligently to user messages, bringing AI conversation capabilities to your server. Built with Python and OpenAI's API.",
      tech: ["Python", "Discord.py", "OpenAI API", "Async Programming"],
      icon: <Bot className="w-10 h-10 sm:w-12 sm:h-12" />,
      highlights: [
        "Natural language processing",
        "Context-aware responses",
        "Multi-server support"
      ]
    },
    {
      title: "H4ch1.Net Portfolio",
      description: "The website you're currently viewing - a modern, responsive portfolio showcasing projects and achievements. Built with React and Tailwind CSS for a sleek, cyberpunk-inspired design.",
      tech: ["React", "Tailwind CSS", "JavaScript", "Vite"],
      icon: <Laptop className="w-10 h-10 sm:w-12 sm:h-12" />,
      highlights: [
        "Responsive design",
        "Modern UI/UX",
        "Fast performance"
      ]
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <div className="border-b border-[#00e38c]/20 py-6 sm:py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 sm:mb-6">
            <span className="text-[#00e38c]">&lt;</span>
            Projects
            <span className="text-[#00e38c]">/&gt;</span>
          </h1>
          <Navigation />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-2xl sm:text-3xl md:text-4xl text-[#00e38c] font-bold mb-4" style={{ textShadow: '0 0 20px rgba(0, 227, 140, 0.5)' }}>
            Nerd stuff.
          </p>
          <p className="text-base sm:text-lg text-gray-400">
            A collection of projects I've built while learning and experimenting with different technologies
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-gray-900 to-black border border-[#00e38c]/20 rounded-xl p-6 sm:p-8 hover:border-[#00e38c]/60 transition-all transform hover:-translate-y-2 shadow-lg hover:shadow-[#00e38c]/20"
            >
              <div className="text-[#00e38c] mb-4">{project.icon}</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{project.title}</h3>
              <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed">{project.description}</p>

              {/* Highlights */}
              <div className="mb-4 sm:mb-6">
                <h4 className="text-sm font-semibold text-[#00e38c] mb-2">Key Features:</h4>
                <ul className="space-y-1 text-sm sm:text-base text-gray-400">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-[#00e38c] mr-2">▹</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-[#00e38c]/10 text-[#00e38c] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm border border-[#00e38c]/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-[#00e38c]/20 rounded-xl p-8 sm:p-12">
            <Terminal className="w-12 h-12 sm:w-16 sm:h-16 text-[#00e38c] mx-auto mb-4 sm:mb-6" />
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">More Coming Soon</h3>
            <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
              I'm constantly working on new projects and experiments. Check back later to see what I'm building next!
            </p>
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

export default Projects;
