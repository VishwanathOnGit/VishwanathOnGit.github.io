/**
 * Contact Method Component
 * Extracts contact method rendering from the large Contact component
 */

import { motion } from 'framer-motion';
import { ExternalLink, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { commonAnimations, hoverAnimations } from '@/constants/animations';
import { BORDERS } from '@/constants/ui';

export interface ContactMethod {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
  description: string;
  color: string;
}

interface ContactMethodCardProps {
  method: ContactMethod;
}

export function ContactMethodCard({ method }: ContactMethodCardProps) {
  const Icon = method.icon;

  return (
    <motion.a
      href={method.href}
      className={cn(
        'group p-4 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300',
        BORDERS.RADIUS.LARGE
      )}
      variants={commonAnimations.itemVariants}
      whileHover={hoverAnimations.lift}
      target={method.href.startsWith('http') ? '_blank' : undefined}
      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      <div className="flex items-center gap-4">
        <div className={cn(
          'p-3 bg-gradient-to-r',
          BORDERS.RADIUS.MEDIUM,
          method.color
        )}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {method.label}
            </h4>
            <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-blue-600 dark:text-blue-400 font-medium">
            {method.value}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {method.description}
          </p>
        </div>
      </div>
    </motion.a>
  );
}

interface ContactMethodsListProps {
  methods: ContactMethod[];
}

export function ContactMethodsList({ methods }: ContactMethodsListProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
        Other ways to reach me
      </h3>
      
      <motion.div 
        variants={commonAnimations.containerVariants}
        className="grid gap-4"
      >
        {methods.map((method) => (
          <ContactMethodCard key={method.label} method={method} />
        ))}
      </motion.div>
    </div>
  );
}
