import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const SplitText = ({
  text = '',
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'easeOut',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const segments = splitType === 'chars' ? text.split('') : text.split(' ');

  const Tag = tag;

  return (
    <Tag
      ref={ref}
      className={`split-parent ${className}`}
      style={{ textAlign, overflow: 'hidden', display: 'block' }}
    >
      {segments.map((segment, index) => (
        <motion.span
          key={index}
          initial={from}
          animate={inView ? to : from}
          transition={{
            duration,
            ease,
            delay: (index * delay) / 1000
          }}
          style={{ display: 'inline-block', willChange: 'transform, opacity' }}
          onAnimationComplete={
            index === segments.length - 1 && inView ? onLetterAnimationComplete : undefined
          }
        >
          {segment === ' ' ? '\u00A0' : segment}
          {splitType === 'words' && index < segments.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </Tag>
  );
};

export default SplitText;
