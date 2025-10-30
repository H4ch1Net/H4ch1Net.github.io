import { useState } from 'react';

const CertificateCard = ({ image, title, verifyLink, reportLink }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="certificate-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'rgba(38, 38, 38, 0.8)',
        padding: '30px 20px',
        borderRadius: '12px',
        border: `2px solid ${isHovered ? '#00e38c' : 'rgba(0, 227, 140, 0.3)'}`,
        boxShadow: isHovered
          ? '0 8px 32px rgba(0, 227, 140, 0.3)'
          : '0 4px 16px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'all 0.3s ease',
        opacity: imageLoaded ? 1 : 0.5,
      }}
    >
      <img
        src={image}
        alt={`${title} Badge`}
        onLoad={() => setImageLoaded(true)}
        style={{
          maxWidth: image.includes('medals') ? '60px' : '120px',
          marginBottom: '20px',
          filter: isHovered ? 'drop-shadow(0 0 15px rgba(0, 227, 140, 0.6))' : 'none',
          transition: 'filter 0.3s ease',
        }}
      />
      <h3 style={{
        fontSize: '1.5rem',
        color: '#00e38c',
        marginBottom: '20px',
        textShadow: isHovered ? '0 0 15px rgba(0, 227, 140, 0.5)' : 'none',
        transition: 'text-shadow 0.3s ease',
      }}>
        {title}
      </h3>
      <div style={{
        display: 'flex',
        flexDirection: reportLink ? 'column' : 'row',
        gap: '15px',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <a
          href={verifyLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            backgroundColor: '#00e38c',
            color: '#000',
            padding: '10px 20px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '0.95rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(0, 227, 140, 0.3)',
            width: reportLink ? '100%' : 'auto',
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = '0 4px 16px rgba(0, 227, 140, 0.6)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = '0 2px 8px rgba(0, 227, 140, 0.3)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Verify Certificate
        </a>
        {reportLink && (
          <a
            href={reportLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              backgroundColor: 'rgba(0, 227, 140, 0.2)',
              color: '#00e38c',
              padding: '10px 20px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '0.95rem',
              border: '2px solid #00e38c',
              transition: 'all 0.3s ease',
              width: '100%',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#00e38c';
              e.target.style.color = '#000';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(0, 227, 140, 0.2)';
              e.target.style.color = '#00e38c';
              e.target.style.transform = 'scale(1)';
            }}
          >
            View Full Report
          </a>
        )}
      </div>
    </div>
  );
};

export default CertificateCard;
