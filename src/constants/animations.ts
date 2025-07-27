/**
 * Animation constants and utilities
 * Centralized animation values to avoid magic numbers and primitive obsession
 */

export const ANIMATION_DURATIONS = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  STAGGER: 0.1,
  DELAY: 0.2,
} as const;

export const ANIMATION_EASINGS = {
  EASE_OUT: 'easeOut',
  EASE_IN_OUT: 'easeInOut',
  SPRING: { type: 'spring', stiffness: 100, damping: 10 },
} as const;

export const SCROLL_OFFSETS = {
  NAVBAR_HEIGHT: 80,
  SECTION_MARGIN: 100,
  THRESHOLD: 50,
} as const;

/**
 * Common animation variants to reduce duplication
 */
export const commonAnimations = {
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: ANIMATION_DURATIONS.STAGGER,
        delayChildren: ANIMATION_DURATIONS.DELAY,
      },
    },
  },
  
  itemVariants: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  },
  
  fadeInVariants: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  
  slideUpVariants: {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: ANIMATION_DURATIONS.NORMAL },
    },
  },
  
  scaleVariants: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: ANIMATION_DURATIONS.NORMAL },
    },
  },
} as const;

/**
 * Hover animation presets
 */
export const hoverAnimations = {
  lift: { y: -2, transition: { duration: ANIMATION_DURATIONS.FAST } },
  scale: { scale: 1.05, transition: { duration: ANIMATION_DURATIONS.FAST } },
  glow: { 
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
    transition: { duration: ANIMATION_DURATIONS.FAST },
  },
} as const;

/**
 * Common transition presets
 */
export const transitions = {
  default: { duration: ANIMATION_DURATIONS.NORMAL },
  fast: { duration: ANIMATION_DURATIONS.FAST },
  slow: { duration: ANIMATION_DURATIONS.SLOW },
  spring: ANIMATION_EASINGS.SPRING,
} as const;
