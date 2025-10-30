import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout>
      <section className="mb-16 p-8 bg-gray-900/60 rounded-xl border border-[#00e38c]/20 shadow-2xl">
        <h2 className="text-4xl text-[#00e38c] mb-8 text-center tracking-wide" style={{ textShadow: '0 0 20px rgba(0, 227, 140, 0.4)' }}>
          About Me
        </h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl text-[#00e38c] mb-5 leading-relaxed">
            Hi, I'm <span className="font-bold" style={{ textShadow: '0 0 10px rgba(0, 227, 140, 0.5)' }}>Mauro</span>.
            I'm currently studying Computer Science at California State University, San Bernardino, and
            Information Systems at College of the Desert. My passion for technology began when I started
            experimenting with code, and it's grown into a fascination with cybersecurity, software development,
            and everything in between.
          </p>
          <p className="text-xl text-[#00e38c] mb-5 leading-relaxed">
            I'm bilingual and speak both <span className="font-bold">Spanish and English</span> fluently.
            My interests span across coding in Python (with recent forays into C++ and C#), working with electronics
            like Raspberry Pi's and Arduino, and competing in cybersecurity Capture the Flag events.
          </p>
          <p className="text-xl text-[#00e38c] mb-5 leading-relaxed">
            By day, I work as an <span className="font-bold" style={{ textShadow: '0 0 10px rgba(0, 227, 140, 0.5)' }}>
            Information Systems Apprentice and Desktop Technician</span> at Eisenhower Health, ensuring everything
            runs smoothly and learning along the way. Outside of work, I'm often doing schoolwork, playing video games,
            coding, building projects, or learning nerdy stuff.
          </p>
          <p className="text-xl text-[#00e38c] mb-5 leading-relaxed">
            This website is where I share my projects, ideas, and things that I come across. Feel free to reach out—I'm
            always up for collaboration, a chat, or job opportunities.
          </p>
          <p className="text-3xl text-[#00e38c] mt-8" style={{ textShadow: '0 0 15px rgba(0, 227, 140, 0.6)' }}>
            :3
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default About;
