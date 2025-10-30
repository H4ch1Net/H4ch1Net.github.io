import { useState } from 'react';

const ProjectCard = ({ title, description, link, linkText = "View Project" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="project-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'rgba(38, 38, 38, 0.8)',
        padding: '30px',
        borderRadius: '12px',
        border: `2px solid ${isHovered ? '#00e38c' : 'rgba(0, 227, 140, 0.3)'}`,
        boxShadow: isHovered
          ? '0 8px 32px rgba(0, 227, 140, 0.3)'
          : '0 4px 16px rgba(0, 0, 0, 0.3)',
        maxWidth: '350px',
        textAlign: 'center',
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
      }}
    >
      <h3 style={{
        color: '#00e38c',
        marginBottom: '15px',
        fontSize: '1.8rem',
        textShadow: '0 0 10px rgba(0, 227, 140, 0.3)',
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '1rem',
        color: '#e6e6e6',
        marginBottom: '20px',
        lineHeight: '1.6',
      }}>
        {description}
      </p>
      <a
        href={link}
        style={{
          display: 'inline-block',
          backgroundColor: '#00e38c',
          color: '#000',
          padding: '12px 24px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 'bold',
          transition: 'all 0.3s ease',
          boxShadow: isHovered
            ? '0 4px 16px rgba(0, 227, 140, 0.5)'
            : '0 2px 8px rgba(0, 227, 140, 0.3)',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        {linkText}
      </a>
    </div>
  );
};

export default ProjectCard;
