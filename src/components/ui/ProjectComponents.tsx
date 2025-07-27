/**
 * Project Components
 * Breaking down the massive Projects component into manageable pieces
 */

import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { commonAnimations, hoverAnimations } from '@/constants/animations';
import { BORDERS, COLORS } from '@/constants/ui';
import { ProjectImage, ProjectContent } from './ProjectCardParts';
import { 
  ModalHeader, 
  ProjectDescription, 
  ProjectFeatures, 
  ProjectTechStack, 
  ProjectStats, 
  ModalActions 
} from './ProjectModalParts';

// Project type definition
export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  technologies: { name: string; icon: LucideIcon; color: string }[];
  features: string[];
  stats: { label: string; value: string }[];
  links: {
    demo?: string;
    github?: string;
    live?: string;
  };
  status: 'completed' | 'in-progress' | 'coming-soon';
  category: 'web' | 'mobile' | 'design' | 'ai';
}

// Project status utilities
export function getStatusColor(status: Project['status']) {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'coming-soon':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
}

// Category Filter Component
interface CategoryFilterProps {
  categories: Array<{ id: string; name: string; count: number }>;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <motion.div 
      variants={commonAnimations.itemVariants} 
      className="flex flex-wrap justify-center gap-3"
    >
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            'px-6 py-3 font-medium transition-all duration-300 border border-transparent',
            BORDERS.RADIUS.FULL,
            selectedCategory === category.id
              ? `bg-gradient-to-r ${COLORS.GRADIENTS.PRIMARY} text-white shadow-lg`
              : 'bg-white/50 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 border-gray-200 dark:border-gray-700'
          )}
        >
          {category.name}
          <span className="ml-2 text-xs opacity-75">({category.count})</span>
        </button>
      ))}
    </motion.div>
  );
}

// Project Card Component
interface ProjectCardProps {
  project: Project;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

export function ProjectCard({ project, isHovered, onHover, onLeave, onClick }: ProjectCardProps) {
  return (
    <motion.div
      variants={commonAnimations.itemVariants}
      className="group cursor-pointer"
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      onClick={onClick}
      whileHover={hoverAnimations.lift}
    >
      <div className={cn(
        'overflow-hidden bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 transition-all duration-300 group-hover:shadow-xl group-hover:border-blue-300 dark:group-hover:border-blue-600',
        BORDERS.RADIUS.LARGE
      )}>
        <ProjectImage project={project} isHovered={isHovered} />
        <ProjectContent project={project} />
      </div>
    </motion.div>
  );
}

// Project Modal Component
interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={cn(
                'relative max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 shadow-2xl',
                BORDERS.RADIUS.LARGE
              )}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-8">
                <ModalHeader project={project} onClose={onClose} />

                {/* Project Details */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <ProjectDescription description={project.longDescription} />
                    <ProjectFeatures features={project.features} />
                  </div>

                  <div className="space-y-6">
                    <ProjectTechStack technologies={project.technologies} />
                    <ProjectStats stats={project.stats} />
                  </div>
                </div>

                <ModalActions links={project.links} />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
