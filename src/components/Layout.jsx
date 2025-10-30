import { Link } from 'react-router-dom';
import AsciiText from './AsciiText';

const Layout = ({ children }) => {
  return (
    <div className="bg-black text-white min-h-screen font-mono">
      <header className="text-center py-10 px-5 bg-black shadow-[0_4px_24px_rgba(0,227,140,0.2)] border-b-2 border-[#00e38c]/30 mb-10">
        <AsciiText text="H4ch1.Net" />
        <nav className="flex gap-5 justify-center flex-wrap mt-5">
          <Link
            to="/"
            className="text-[#00e38c] no-underline text-lg font-bold py-2 px-4 rounded-md border-2 border-transparent bg-[#00e38c]/10 transition-all hover:border-[#00e38c] hover:shadow-[0_0_15px_rgba(0,227,140,0.4)]"
          >
            /Home
          </Link>
          <Link
            to="/about"
            className="text-[#00e38c] no-underline text-lg font-bold py-2 px-4 rounded-md border-2 border-transparent bg-[#00e38c]/10 transition-all hover:border-[#00e38c] hover:shadow-[0_0_15px_rgba(0,227,140,0.4)]"
          >
            /About Me
          </Link>
          <Link
            to="/projects"
            className="text-[#00e38c] no-underline text-lg font-bold py-2 px-4 rounded-md border-2 border-transparent bg-[#00e38c]/10 transition-all hover:border-[#00e38c] hover:shadow-[0_0_15px_rgba(0,227,140,0.4)]"
          >
            /Projects
          </Link>
          <Link
            to="/certificates"
            className="text-[#00e38c] no-underline text-lg font-bold py-2 px-4 rounded-md border-2 border-transparent bg-[#00e38c]/10 transition-all hover:border-[#00e38c] hover:shadow-[0_0_15px_rgba(0,227,140,0.4)]"
          >
            /Certificates
          </Link>
          <a
            href="https://github.com/H4ch1Net/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00e38c] no-underline text-lg font-bold py-2 px-4 rounded-md border-2 border-transparent bg-[#00e38c]/10 transition-all hover:border-[#00e38c] hover:shadow-[0_0_15px_rgba(0,227,140,0.4)]"
          >
            /GitHub
          </a>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-5 pb-16">
        {children}
      </div>

      <footer className="text-center py-8 px-5 border-t-2 border-[#00e38c]/30 mt-16 bg-[#00e38c]/5">
        <p className="text-gray-400 text-base m-0">
          <span className="text-[#00e38c]">~$</span> H4ch1.Net © {new Date().getFullYear()}
          <span className="mx-2">|</span>
          Built with React & Tailwind CSS
        </p>
      </footer>
    </div>
  );
};

export default Layout;
