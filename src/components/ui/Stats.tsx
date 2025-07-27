/**
 * Statistics Component
 * Extracted from About component for reusability
 */

import { motion } from 'framer-motion';
import { StatCard } from './Card';
import { commonAnimations } from '@/constants/animations';

export interface Stat {
  number: string;
  label: string;
  description: string;
}

interface StatsGridProps {
  stats: Stat[];
  className?: string;
}

export function StatsGrid({ stats, className }: StatsGridProps) {
  return (
    <motion.div 
      variants={commonAnimations.itemVariants} 
      className={`grid grid-cols-2 gap-6 ${className || ''}`}
    >
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          number={stat.number}
          label={stat.label}
          description={stat.description}
        />
      ))}
    </motion.div>
  );
}

/**
 * Inline stats component for compact display
 */
interface InlineStatsProps {
  stats: Stat[];
  className?: string;
}

export function InlineStats({ stats, className }: InlineStatsProps) {
  return (
    <motion.div 
      variants={commonAnimations.containerVariants}
      className={`flex flex-wrap justify-center gap-8 ${className || ''}`}
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          variants={commonAnimations.itemVariants}
          className="text-center"
        >
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {stat.number}
          </div>
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
