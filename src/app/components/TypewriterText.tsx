import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
}

export function TypewriterText({ text, delay = 100, onComplete }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, delay, onComplete]);

  return <span>{displayedText}</span>;
}
