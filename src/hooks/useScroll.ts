/**
 * Custom hook for scroll-related functionality
 * Extracts complex scroll logic from components
 */

import { useState, useEffect, useCallback } from 'react';
import { SCROLL_OFFSETS } from '@/constants/animations';

interface UseScrollOptions {
  threshold?: number;
  offset?: number;
}

export function useScroll(options: UseScrollOptions = {}) {
  const { threshold = SCROLL_OFFSETS.THRESHOLD, offset = SCROLL_OFFSETS.NAVBAR_HEIGHT } = options;
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToElement = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const targetPosition = element.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  }, [offset]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return {
    isScrolled,
    scrollY,
    scrollToElement,
    scrollToTop,
  };
}

/**
 * Hook for tracking active section in viewport
 */
export function useActiveSection(sections: string[]) {
  const [activeSection, setActiveSection] = useState(sections[0] || '');

  useEffect(() => {
    const handleSectionChange = () => {
      const scrollPosition = window.scrollY + SCROLL_OFFSETS.NAVBAR_HEIGHT + 50;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleSectionChange, { passive: true });
    handleSectionChange(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleSectionChange);
  }, [sections]);

  return activeSection;
}
