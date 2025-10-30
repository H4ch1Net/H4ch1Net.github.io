import Section from '../components/Section';

const About = () => {
  return (
    <Section title="About Me">
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '1.2rem',
          color: '#00e38c',
          marginBottom: '20px',
          lineHeight: '1.8',
        }}>
          Hi, I'm <span style={{ fontWeight: 'bold', textShadow: '0 0 10px rgba(0, 227, 140, 0.5)' }}>Mauro</span>.
          I'm currently studying Computer Science at California State University, San Bernardino, and
          Information Systems at College of the Desert. My passion for technology began when I started
          experimenting with code, and it's grown into a fascination with cybersecurity, software development,
          and everything in between.
        </p>
        <p style={{
          fontSize: '1.2rem',
          color: '#00e38c',
          marginBottom: '20px',
          lineHeight: '1.8',
        }}>
          I'm bilingual and speak both <span style={{ fontWeight: 'bold' }}>Spanish and English</span> fluently.
          My interests span across coding in Python (with recent forays into C++ and C#), working with electronics
          like Raspberry Pi's and Arduino, and competing in cybersecurity Capture the Flag events.
        </p>
        <p style={{
          fontSize: '1.2rem',
          color: '#00e38c',
          marginBottom: '20px',
          lineHeight: '1.8',
        }}>
          By day, I work as an <span style={{ fontWeight: 'bold', textShadow: '0 0 10px rgba(0, 227, 140, 0.5)' }}>
          Information Systems Apprentice and Desktop Technician</span> at Eisenhower Health, ensuring everything
          runs smoothly and learning along the way. Outside of work, I'm often doing schoolwork, playing video games,
          coding, building projects, or learning nerdy stuff.
        </p>
        <p style={{
          fontSize: '1.2rem',
          color: '#00e38c',
          marginBottom: '20px',
          lineHeight: '1.8',
        }}>
          This website is where I share my projects, ideas, and things that I come across. Feel free to reach out—I'm
          always up for collaboration, a chat, or job opportunities.
        </p>
        <p style={{
          fontSize: '2rem',
          color: '#00e38c',
          marginTop: '30px',
          textShadow: '0 0 15px rgba(0, 227, 140, 0.6)',
        }}>
          :3
        </p>
      </div>
    </Section>
  );
};

export default About;
