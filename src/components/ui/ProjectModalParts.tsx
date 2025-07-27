/**
 * Project Modal Sub-components
 * Breaking down the large ProjectModal component
 */

import { Star, Play, Github, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Project } from './ProjectComponents';
import { BORDERS, COLORS } from '@/constants/ui';

// Modal Header Component
interface ModalHeaderProps {
  project: Project;
  onClose: () => void;
}

export function ModalHeader({ project, onClose }: ModalHeaderProps) {
  return (
    <>
      {/* Close Button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* Modal Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {project.title}
        </h2>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                'px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm',
                BORDERS.RADIUS.FULL
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

// Project Description Component
interface ProjectDescriptionProps {
  description: string;
}

export function ProjectDescription({ description }: ProjectDescriptionProps) {
  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        About This Project
      </h4>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// Project Features Component
interface ProjectFeaturesProps {
  features: string[];
}

export function ProjectFeatures({ features }: ProjectFeaturesProps) {
  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Key Features
      </h4>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
            <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Project Technologies Component
interface ProjectTechStackProps {
  technologies: Project['technologies'];
}

export function ProjectTechStack({ technologies }: ProjectTechStackProps) {
  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Technologies Used
      </h4>
      <div className="grid grid-cols-2 gap-3">
        {technologies.map((tech) => {
          const Icon = tech.icon;
          return (
            <div
              key={tech.name}
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <div className={cn(
                'p-2 bg-gradient-to-r',
                BORDERS.RADIUS.MEDIUM,
                tech.color
              )}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-gray-900 dark:text-white">
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Project Stats Component
interface ProjectStatsProps {
  stats: Project['stats'];
}

export function ProjectStats({ stats }: ProjectStatsProps) {
  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Project Impact
      </h4>
      <div className="grid grid-cols-1 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Modal Action Buttons Component
interface ModalActionsProps {
  links: Project['links'];
}

export function ModalActions({ links }: ModalActionsProps) {
  return (
    <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
      {links.demo && (
        <a
          href={links.demo}
          className={cn(
            'flex items-center gap-2 px-6 py-3 bg-gradient-to-r text-white hover:shadow-lg transition-all',
            BORDERS.RADIUS.FULL,
            COLORS.GRADIENTS.PRIMARY
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Play className="w-4 h-4" />
          Live Demo
        </a>
      )}
      {links.github && (
        <a
          href={links.github}
          className={cn(
            'flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-all',
            BORDERS.RADIUS.FULL
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="w-4 h-4" />
          View Code
        </a>
      )}
    </div>
  );
}
