import Section from '../components/Section';
import ProjectCard from '../components/ProjectCard';

const Home = () => {
  return (
    <>
      <Section id="intro" title="Hello There">
        <p style={{
          fontSize: '1.3rem',
          color: '#00e38c',
          textAlign: 'center',
          lineHeight: '1.8',
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          This is a place for all of my projects, achievements, and a portfolio overall.
          I am a <span style={{ fontWeight: 'bold', textShadow: '0 0 10px rgba(0, 227, 140, 0.5)' }}>
          computer science and information systems student</span> with a deep interest in
          coding, cybersecurity, and anything tech-related. Browse around to see what I'm working on!
        </p>
      </Section>

      <Section id="latest-projects" title="Latest Projects">
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          justifyContent: 'center',
        }}>
          <ProjectCard
            title="Bagley-Bot"
            description="A Discord bot that uses ChatGPT to answer to user's messages."
            link="/projects"
            linkText="View Project"
          />
          <ProjectCard
            title="My Website"
            description="You are looking at it right now. Built with React and ReactBits components."
            link="/"
            linkText="You're Here!"
          />
        </div>
      </Section>

      <Section id="blog" title="Nerd Stuff">
        <p style={{
          fontSize: '1.2rem',
          color: '#00e38c',
          textAlign: 'center',
        }}>
          Nerd things that I have done recently or other things.
        </p>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          textAlign: 'center',
          marginTop: '20px',
        }}>
          <li>
            <a
              href="#"
              style={{
                color: '#00e38c',
                textDecoration: 'none',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.textShadow = '0 0 15px rgba(0, 227, 140, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.target.style.textShadow = 'none';
              }}
            >
              Nothing to see here... yet...
            </a>
          </li>
        </ul>
      </Section>

      <Section id="contact" title="Get In Touch">
        <p style={{
          fontSize: '1.2rem',
          color: '#00e38c',
          textAlign: 'center',
          marginBottom: '20px',
        }}>
          If you want to collaborate or just say hello, feel free to contact me at:
        </p>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          textAlign: 'center',
        }}>
          <li style={{ marginBottom: '15px' }}>
            <span style={{ color: '#e6e6e6' }}>Email: </span>
            <a
              href="mailto:h4ch1net@gmail.com"
              style={{
                color: '#00e38c',
                textDecoration: 'none',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.textShadow = '0 0 15px rgba(0, 227, 140, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.target.style.textShadow = 'none';
              }}
            >
              h4ch1net@gmail.com
            </a>
          </li>
          <li>
            <span style={{ color: '#e6e6e6' }}>GitHub: </span>
            <a
              href="https://github.com/H4ch1Net/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#00e38c',
                textDecoration: 'none',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.textShadow = '0 0 15px rgba(0, 227, 140, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.target.style.textShadow = 'none';
              }}
            >
              H4ch1Net
            </a>
          </li>
        </ul>
      </Section>
    </>
  );
};

export default Home;
