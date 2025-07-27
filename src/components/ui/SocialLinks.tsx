/**
 * Social Links Component
 * Reusable component for social media links with consistent styling
 */

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { commonAnimations, hoverAnimations } from '@/constants/animations';
import { BORDERS } from '@/constants/ui';

export interface SocialLink {
  icon: LucideIcon;
  label: string;
  href: string;
  color: string;
  followers?: string;
}

interface SocialLinkCardProps {
  social: SocialLink;
  variant?: 'default' | 'compact' | 'detailed';
}

export function SocialLinkCard({ social, variant = 'default' }: SocialLinkCardProps) {
  const Icon = social.icon;

  if (variant === 'compact') {
    return (
      <motion.a
        href={social.href}
        className={cn(
          'group p-3 bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300',
          BORDERS.RADIUS.FULL
        )}
        whileHover={hoverAnimations.scale}
        whileTap={{ scale: 0.95 }}
        aria-label={social.label}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className="w-6 h-6" />
      </motion.a>
    );
  }

  if (variant === 'detailed') {
    return (
      <motion.a
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'group p-4 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 transition-all duration-300',
          BORDERS.RADIUS.LARGE,
          social.color
        )}
        variants={commonAnimations.itemVariants}
        whileHover={hoverAnimations.lift}
      >
        <div className="text-center space-y-2">
          <Icon className="w-8 h-8 mx-auto text-gray-600 dark:text-gray-400 group-hover:text-current transition-colors" />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white group-hover:text-current">
              {social.label}
            </p>
            {social.followers && (
              <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-current">
                {social.followers}
              </p>
            )}
          </div>
        </div>
      </motion.a>
    );
  }

  // Default variant
  return (
    <motion.a
      href={social.href}
      className={cn(
        'p-2 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300',
        BORDERS.RADIUS.MEDIUM
      )}
      whileHover={hoverAnimations.scale}
      whileTap={{ scale: 0.95 }}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  );
}

interface SocialLinksListProps {
  links: SocialLink[];
  variant?: 'default' | 'compact' | 'detailed';
  title?: string;
  layout?: 'grid' | 'flex';
  className?: string;
}

export function SocialLinksList({ 
  links, 
  variant = 'default',
  title,
  layout = 'flex',
  className 
}: SocialLinksListProps) {
  const containerClass = layout === 'grid' 
    ? 'grid grid-cols-2 gap-4'
    : 'flex justify-center space-x-6';

  return (
    <div className={cn('space-y-6', className)}>
      {title && (
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
      )}
      
      <motion.div 
        variants={commonAnimations.containerVariants}
        className={containerClass}
      >
        {links.map((social) => (
          <SocialLinkCard 
            key={social.label} 
            social={social} 
            variant={variant}
          />
        ))}
      </motion.div>
    </div>
  );
}
