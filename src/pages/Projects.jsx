import Section from '../components/Section';

const Projects = () => {
  return (
    <Section title="Projects">
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
      }}>
        <p style={{
          fontSize: '2rem',
          color: '#00e38c',
          fontWeight: 'bold',
          textShadow: '0 0 20px rgba(0, 227, 140, 0.5)',
          marginBottom: '20px',
        }}>
          Nerd stuff.
        </p>
        <p style={{
          fontSize: '1.2rem',
          color: '#00e38c',
          opacity: 0.7,
        }}>
          More projects coming soon...
        </p>
      </div>
    </Section>
  );
};

export default Projects;
