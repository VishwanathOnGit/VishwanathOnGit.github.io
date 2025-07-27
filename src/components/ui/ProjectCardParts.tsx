/**
 * Project Card Sub-components
 * Breaking down the large ProjectCard component
 */

import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Project, getStatusColor } from './ProjectComponents';
import { BORDERS } from '@/constants/ui';

// Project Image Component
interface ProjectImageProps {
  project: Project;
  isHovered: boolean;
}

export function ProjectImage({ project, isHovered }: ProjectImageProps) {
  return (
    <div className="relative h-48 overflow-hidden">
      {/* Placeholder for project image */}
      <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
        <div className="text-6xl opacity-30">🚀</div>
      </div>
      <motion.div
        className="absolute inset-0 bg-black/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Status Badge */}
      <div className="absolute top-4 left-4">
        <span className={cn(
          'px-3 py-1 text-xs font-medium',
          BORDERS.RADIUS.FULL,
          getStatusColor(project.status)
        )}>
          {project.status.replace('-', ' ')}
        </span>
      </div>

      <ProjectActionButtons project={project} isHovered={isHovered} />
    </div>
  );
}

// Project Action Buttons Component
interface ProjectActionButtonsProps {
  project: Project;
  isHovered: boolean;
}

export function ProjectActionButtons({ project, isHovered }: ProjectActionButtonsProps) {
  return (
    <motion.div
      className="absolute top-4 right-4 flex gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ 
        opacity: isHovered ? 1 : 0,
        y: isHovered ? 0 : -10
      }}
      transition={{ duration: 0.2 }}
    >
      {project.links.github && (
        <button 
          className="p-2 bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            window.open(project.links.github, '_blank');
          }}
        >
          <Github className="w-4 h-4" />
        </button>
      )}
      {(project.links.demo || project.links.live) && (
        <button 
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            window.open(project.links.demo || project.links.live, '_blank');
          }}
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
}

// Project Content Component
interface ProjectContentProps {
  project: Project;
}

export function ProjectContent({ project }: ProjectContentProps) {
  return (
    <div className="p-6 space-y-4">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      <ProjectTags tags={project.tags} />
      <ProjectTechnologies technologies={project.technologies} />
    </div>
  );
}

// Project Tags Component
interface ProjectTagsProps {
  tags: string[];
}

export function ProjectTags({ tags }: ProjectTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className={cn(
            'px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs',
            BORDERS.RADIUS.FULL
          )}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

// Project Technologies Component
interface ProjectTechnologiesProps {
  technologies: Project['technologies'];
}

export function ProjectTechnologies({ technologies }: ProjectTechnologiesProps) {
  return (
    <div className="flex items-center gap-3 pt-2">
      {technologies.slice(0, 4).map((tech) => {
        const Icon = tech.icon;
        return (
          <div
            key={tech.name}
            className={cn(
              'p-1.5 bg-gradient-to-r',
              BORDERS.RADIUS.MEDIUM,
              tech.color
            )}
            title={tech.name}
          >
            <Icon className="w-3 h-3 text-white" />
          </div>
        );
      })}
      {technologies.length > 4 && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          +{technologies.length - 4} more
        </span>
      )}
    </div>
  );
}
