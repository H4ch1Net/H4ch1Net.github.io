import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '/Home' },
    { path: '/about', label: '/About Me' },
    { path: '/projects', label: '/Projects' },
    { path: '/certificates', label: '/Certificates' },
    { path: 'https://github.com/H4ch1Net/', label: '/GitHub', external: true },
  ];

  return (
    <nav style={{
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: '20px',
    }}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;

        if (item.external) {
          return (
            <a
              key={item.path}
              href={item.path}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#00e38c',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                padding: '8px 16px',
                borderRadius: '6px',
                border: '2px solid transparent',
                transition: 'all 0.3s ease',
                background: 'rgba(0, 227, 140, 0.1)',
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#00e38c';
                e.target.style.boxShadow = '0 0 15px rgba(0, 227, 140, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'transparent';
                e.target.style.boxShadow = 'none';
              }}
            >
              {item.label}
            </a>
          );
        }

        return (
          <Link
            key={item.path}
            to={item.path}
            style={{
              color: isActive ? '#000' : '#00e38c',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              padding: '8px 16px',
              borderRadius: '6px',
              border: `2px solid ${isActive ? '#00e38c' : 'transparent'}`,
              background: isActive ? '#00e38c' : 'rgba(0, 227, 140, 0.1)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.target.style.borderColor = '#00e38c';
                e.target.style.boxShadow = '0 0 15px rgba(0, 227, 140, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.target.style.borderColor = 'transparent';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
