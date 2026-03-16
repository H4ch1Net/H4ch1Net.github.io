import './Dither.css';

const Dither = ({ children, speed = 1, enableShadows = true, enableOnHover = false, className = '' }) => {
  const inlineStyles = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-5px 0 rgba(0, 80, 40, 0.9)' : 'none',
    '--before-shadow': enableShadows ? '5px 0 rgba(0, 200, 110, 0.7)' : 'none'
  };

  const hoverClass = enableOnHover ? 'enable-on-hover' : '';

  return (
    <div className={`glitch ${hoverClass} ${className}`.trim()} style={inlineStyles} data-text={children}>
      {children}
    </div>
  );
};

export default Dither;
