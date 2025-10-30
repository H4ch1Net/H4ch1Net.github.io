import { useEffect, useRef } from 'react';

const AsciiText = ({
  text = "H4ch1.Net",
  className = "",
  animationSpeed = 50,
  iterations = 2
}) => {
  const elementRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`";
    let iteration = 0;

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (elementRef.current) {
        elementRef.current.innerText = text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("");

        if (iteration >= text.length * iterations) {
          clearInterval(intervalRef.current);
          elementRef.current.innerText = text;
        }

        iteration += 1 / iterations;
      }
    }, animationSpeed);

    return () => clearInterval(intervalRef.current);
  }, [text, animationSpeed, iterations]);

  return (
    <h1
      ref={elementRef}
      className={`ascii-text ${className}`}
      style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '3.5rem',
        fontWeight: 'bold',
        color: '#00e38c',
        textShadow: '0 0 20px rgba(0, 227, 140, 0.5)',
        letterSpacing: '0.1em',
      }}
    >
      {text}
    </h1>
  );
};

export default AsciiText;
