/**
 * Hero Section Components
 * Breaking down the large Hero component into smaller, focused pieces
 */

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useTypewriter } from '@/hooks/useTypewriter';
import { GradientButton, Button } from '@/components/ui/Button';
import { commonAnimations } from '@/constants/animations';
import { COLORS } from '@/constants/ui';

/**
 * Typewriter Title Component
 */
interface TypewriterTitleProps {
  words: string[];
}

export function TypewriterTitle({ words }: TypewriterTitleProps) {
  const { text } = useTypewriter({ words });

  return (
    <motion.h1
      variants={commonAnimations.itemVariants}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="text-5xl sm:text-6xl lg:text-7xl font-bold text-center mb-6"
    >
      <span className="block text-white mb-4">
        Hi, I&apos;m <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Yash</span>
      </span>
      <span className="block text-2xl sm:text-3xl lg:text-4xl text-blue-300">
        {text}
        <span className="animate-pulse text-white">|</span>
      </span>
    </motion.h1>
  );
}

/**
 * Hero Description Component
 */
export function HeroDescription() {
  return (
    <motion.p
      variants={commonAnimations.itemVariants}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
    >
      Crafting extraordinary digital experiences with cutting-edge technology.
      I transform ideas into reality through clean code and innovative design.
    </motion.p>
  );
}

/**
 * Hero CTA Buttons Component
 */
interface HeroCTAProps {
  onViewWork: () => void;
  onContact: () => void;
}

export function HeroCTA({ onViewWork, onContact }: HeroCTAProps) {
  return (
    <motion.div
      variants={commonAnimations.itemVariants}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
    >
      <GradientButton size="large" onClick={onViewWork}>
        View My Work
      </GradientButton>
      
      <Button
        variant="outline"
        size="large"
        onClick={onContact}
        className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50"
      >
        Let&apos;s Connect
      </Button>
    </motion.div>
  );
}

/**
 * Scroll Indicator Component
 */
interface ScrollIndicatorProps {
  show: boolean;
}

export function ScrollIndicator({ show }: ScrollIndicatorProps) {
  if (!show) return null;

  return (
    <motion.div
      variants={commonAnimations.itemVariants}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="flex flex-col items-center text-white/60"
      >
        <span className="text-sm mb-2">Scroll to explore</span>
        <ArrowDown className="w-6 h-6" />
      </motion.div>
    </motion.div>
  );
}

/**
 * Background Effects Component
 */
export function HeroBackground() {
  return (
    <>
      {/* Cosmic Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${COLORS.GRADIENTS.COSMIC}`} />
      
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      </motion.div>
    </>
  );
}
