const Section = ({ title, children, id }) => {
  return (
    <section
      id={id}
      style={{
        marginBottom: '60px',
        padding: '30px',
        background: 'rgba(38, 38, 38, 0.6)',
        borderRadius: '12px',
        border: '1px solid rgba(0, 227, 140, 0.2)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
      }}
    >
      {title && (
        <h2 style={{
          fontSize: '2.5rem',
          color: '#00e38c',
          marginBottom: '30px',
          textAlign: 'center',
          textShadow: '0 0 20px rgba(0, 227, 140, 0.4)',
          letterSpacing: '0.05em',
        }}>
          {title}
        </h2>
      )}
      {children}
    </section>
  );
};

export default Section;
