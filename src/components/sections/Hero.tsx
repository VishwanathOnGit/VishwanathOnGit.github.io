'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SocialLinksList } from '@/components/ui/SocialLinks';
import { useScroll } from '@/hooks/useScroll';
import { commonAnimations } from '@/constants/animations';
import { 
  TypewriterTitle, 
  HeroDescription, 
  HeroCTA, 
  ScrollIndicator, 
  HeroBackground 
} from './HeroComponents';

interface HeroProps {
  className?: string;
}

// Social links data
const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub', color: '' },
  { icon: Linkedin, href: '#', label: 'LinkedIn', color: '' },
  { icon: Mail, href: 'mailto:your.email@example.com', label: 'Email', color: '' },
];

// Typewriter words
const typewriterWords = [
  'Full Stack Developer',
  'React Specialist',
  'UI/UX Designer',
  'Problem Solver',
  'Code Architect'
];

export function Hero({ className }: HeroProps) {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollToElement } = useScroll();

  // Check if hero section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScrollIndicator(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className={cn(
        'relative min-h-screen flex items-center justify-center overflow-hidden',
        className
      )}
    >
      <HeroBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={commonAnimations.containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <TypewriterTitle words={typewriterWords} />
          
          <HeroDescription />
          
          <HeroCTA 
            onViewWork={() => scrollToElement('projects')}
            onContact={() => scrollToElement('contact')}
          />

          {/* Social Links */}
          <motion.div
            variants={commonAnimations.itemVariants}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-16"
          >
            <SocialLinksList 
              links={socialLinks}
              variant="compact"
              layout="flex"
            />
          </motion.div>
        </motion.div>
      </div>

      <ScrollIndicator show={showScrollIndicator} />
    </section>
  );
}
