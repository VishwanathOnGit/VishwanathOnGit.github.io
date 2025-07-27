/**
 * Skills Component
 * Extracted from About component to handle skill-specific rendering
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { commonAnimations } from '@/constants/animations';
import { BORDERS } from '@/constants/ui';

export interface Skill {
  name: string;
  icon: LucideIcon;
  color: string;
  level: number;
}

interface SkillCardProps {
  skill: Skill;
  index: number;
  isHovered: boolean;
  isInView: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function SkillCard({ skill, index, isHovered, isInView, onHover, onLeave }: SkillCardProps) {
  const Icon = skill.icon;

  return (
    <motion.div
      className="group cursor-pointer"
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      variants={commonAnimations.itemVariants}
      whileHover={{ x: 4 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <div className={cn(
            'p-2 bg-gradient-to-r transition-all duration-300',
            BORDERS.RADIUS.MEDIUM,
            skill.color,
            isHovered ? 'scale-110 shadow-lg' : 'scale-100'
          )}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <span className="font-medium text-gray-900 dark:text-white">
            {skill.name}
          </span>
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {skill.level}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          className={cn('h-full bg-gradient-to-r rounded-full', skill.color)}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

interface SkillsListProps {
  skills: Skill[];
  isInView: boolean;
  title?: string;
  className?: string;
}

export function SkillsList({ skills, isInView, title = "Core Expertise", className }: SkillsListProps) {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  return (
    <motion.div 
      variants={commonAnimations.itemVariants} 
      className={cn('space-y-6', className)}
    >
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
        {title}
      </h3>
      
      <motion.div 
        variants={commonAnimations.containerVariants}
        className="space-y-4"
      >
        {skills.map((skill, index) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            index={index}
            isHovered={hoveredSkill === index}
            isInView={isInView}
            onHover={() => setHoveredSkill(index)}
            onLeave={() => setHoveredSkill(null)}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

/**
 * Skills progress bar component
 */
interface SkillProgressProps {
  skill: Skill;
  isVisible: boolean;
  delay?: number;
}

export function SkillProgress({ skill, isVisible, delay = 0 }: SkillProgressProps) {
  const Icon = skill.icon;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={cn(
            'p-1.5 bg-gradient-to-r rounded-md',
            skill.color
          )}>
            <Icon className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {skill.name}
          </span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {skill.level}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
        <motion.div
          className={cn('h-full bg-gradient-to-r rounded-full', skill.color)}
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
