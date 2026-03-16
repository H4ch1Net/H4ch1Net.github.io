import { useState, useEffect, useRef, useCallback } from 'react';
import './ScrambledText.css';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$';
const DURATION = 500;

export default function ScrambledText({ text = '' }) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);

  const scramble = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startTimeRef.current = performance.now();
    const step = now => {
      const progress = Math.min((now - startTimeRef.current) / DURATION, 1);
      const revealed = Math.floor(progress * text.length);
      const chars = text.split('').map((char, i) =>
        i < revealed ? char : CHARS[Math.floor(Math.random() * CHARS.length)]
      ).join('');
      setDisplay(chars);
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  }, [text]);

  const reset = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setDisplay(text);
  }, [text]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <span className="scrambled-text" onMouseEnter={scramble} onMouseLeave={reset}>
      {display}
    </span>
  );
}
