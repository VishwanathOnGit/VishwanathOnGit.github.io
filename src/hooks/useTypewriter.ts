/**
 * Typewriter Effect Hook
 * Extracts complex typewriter logic from Hero component
 */

import { useState, useEffect, useMemo } from 'react';

interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
}

export function useTypewriter({ 
  words, 
  typeSpeed = 100, 
  deleteSpeed = 50, 
  pauseDuration = 2000 
}: UseTypewriterOptions) {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const titles = useMemo(() => words, [words]);

  useEffect(() => {
    const currentTitle = titles[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < currentTitle.length) {
          setText(currentTitle.slice(0, text.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [text, currentIndex, isDeleting, titles, typeSpeed, deleteSpeed, pauseDuration]);

  return { text, isDeleting };
}
