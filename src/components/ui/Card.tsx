/**
 * Reusable Card Components
 * Provides consistent card styling across the application
 */

import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BORDERS } from '@/constants/ui';
import { commonAnimations, hoverAnimations, transitions } from '@/constants/animations';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'none' | 'small' | 'medium' | 'large';
  hover?: boolean;
  onClick?: () => void;
}

type MotionCardProps = CardProps & Omit<MotionProps, keyof CardProps>;

const cardVariants = {
  default: 'bg-white dark:bg-gray-800 shadow-md',
  elevated: 'bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl',
  outlined: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
  glass: 'bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-white/20',
};

const cardPadding = {
  none: '',
  small: 'p-4',
  medium: 'p-6',
  large: 'p-8',
};

export function Card({ 
  children, 
  className, 
  variant = 'default',
  padding = 'medium',
  hover = false,
  onClick,
  ...motionProps 
}: MotionCardProps) {
  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      className={cn(
        'transition-all duration-300',
        BORDERS.RADIUS.LARGE,
        cardVariants[variant],
        cardPadding[padding],
        hover && 'hover:scale-105',
        onClick && 'cursor-pointer',
        className
      )}
      whileHover={hover ? hoverAnimations.lift : undefined}
      transition={transitions.default}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </Component>
  );
}

/**
 * Specialized card for statistics
 */
interface StatCardProps {
  number: string;
  label: string;
  description?: string;
  className?: string;
}

export function StatCard({ number, label, description, className }: StatCardProps) {
  return (
    <Card
      variant="glass"
      hover
      className={cn('text-center', className)}
      variants={commonAnimations.itemVariants}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {number}
      </div>
      <div className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
        {label}
      </div>
      {description && (
        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          {description}
        </div>
      )}
    </Card>
  );
}

/**
 * Feature card with icon
 */
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <Card
      variant="outlined"
      hover
      className={cn('text-center space-y-4', className)}
      variants={commonAnimations.itemVariants}
    >
      <div className="flex justify-center">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
    </Card>
  );
}

/**
 * Section wrapper card
 */
interface SectionCardProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  background?: 'default' | 'gradient-light' | 'gradient-dark';
}

const backgroundVariants = {
  default: '',
  'gradient-light': 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50',
  'gradient-dark': 'dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950',
};

export function SectionCard({ children, id, className, background = 'default' }: SectionCardProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative min-h-screen py-20 overflow-hidden',
        backgroundVariants[background],
        className
      )}
    >
      {children}
    </section>
  );
}
