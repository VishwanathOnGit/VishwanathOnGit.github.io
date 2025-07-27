'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Play, 
  Star, 
  Code,
  Palette,
  Zap,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectsProps {
  className?: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  technologies: { name: string; icon: typeof Code; color: string }[];
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

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A modern, scalable e-commerce solution with advanced features',
    longDescription: 'A comprehensive e-commerce platform built with Next.js, featuring real-time inventory management, advanced search capabilities, secure payment processing, and an intuitive admin dashboard. The platform supports multiple vendors, automated order tracking, and personalized recommendations.',
    image: '/api/placeholder/600/400',
    tags: ['Featured', 'Full-Stack', 'E-Commerce'],
    technologies: [
      { name: 'Next.js', icon: Code, color: 'from-black to-gray-600' },
      { name: 'TypeScript', icon: Code, color: 'from-blue-500 to-blue-600' },
      { name: 'Stripe', icon: Zap, color: 'from-purple-500 to-purple-600' },
      { name: 'PostgreSQL', icon: Code, color: 'from-blue-600 to-indigo-600' },
    ],
    features: [
      'Real-time inventory tracking',
      'Advanced product filtering',
      'Secure payment processing',
      'Multi-vendor support',
      'Admin analytics dashboard'
    ],
    stats: [
      { label: 'Users', value: '10K+' },
      { label: 'Orders', value: '25K+' },
      { label: 'Revenue', value: '$2M+' }
    ],
    links: {
      demo: '#',
      github: '#',
      live: '#'
    },
    status: 'completed',
    category: 'web'
  },
  {
    id: 2,
    title: 'AI Content Generator',
    description: 'Intelligent content creation platform powered by machine learning',
    longDescription: 'An AI-powered content generation platform that helps creators produce high-quality articles, social media posts, and marketing copy. Features include tone adjustment, SEO optimization, plagiarism detection, and multi-language support.',
    image: '/api/placeholder/600/400',
    tags: ['AI/ML', 'SaaS', 'Content'],
    technologies: [
      { name: 'React', icon: Code, color: 'from-cyan-400 to-blue-500' },
      { name: 'Python', icon: Code, color: 'from-yellow-400 to-green-500' },
      { name: 'OpenAI', icon: Zap, color: 'from-green-400 to-emerald-500' },
      { name: 'FastAPI', icon: Code, color: 'from-teal-500 to-cyan-500' },
    ],
    features: [
      'Multi-format content generation',
      'SEO optimization tools',
      'Plagiarism detection',
      'Tone and style adjustment',
      'Multi-language support'
    ],
    stats: [
      { label: 'Generated', value: '100K+' },
      { label: 'Languages', value: '25' },
      { label: 'Accuracy', value: '95%' }
    ],
    links: {
      demo: '#',
      github: '#'
    },
    status: 'completed',
    category: 'ai'
  },
  {
    id: 3,
    title: 'Design System Pro',
    description: 'Comprehensive design system and component library',
    longDescription: 'A complete design system built with React and Storybook, featuring 100+ components, dark/light themes, accessibility compliance, and comprehensive documentation. Used by multiple teams to maintain design consistency.',
    image: '/api/placeholder/600/400',
    tags: ['Design System', 'Components', 'Open Source'],
    technologies: [
      { name: 'React', icon: Code, color: 'from-cyan-400 to-blue-500' },
      { name: 'Storybook', icon: Palette, color: 'from-pink-500 to-rose-500' },
      { name: 'Figma', icon: Palette, color: 'from-purple-500 to-indigo-500' },
      { name: 'CSS', icon: Palette, color: 'from-blue-500 to-purple-500' },
    ],
    features: [
      '100+ reusable components',
      'Dark & light themes',
      'Accessibility compliant',
      'Comprehensive documentation',
      'Design tokens system'
    ],
    stats: [
      { label: 'Components', value: '100+' },
      { label: 'Downloads', value: '50K+' },
      { label: 'Teams', value: '20+' }
    ],
    links: {
      demo: '#',
      github: '#'
    },
    status: 'completed',
    category: 'design'
  },
  {
    id: 4,
    title: 'Mobile Fitness App',
    description: 'Cross-platform fitness tracking and social workout app',
    longDescription: 'A comprehensive fitness application built with React Native, featuring workout tracking, social challenges, nutrition planning, and real-time progress analytics. Includes wearable device integration and personalized coaching.',
    image: '/api/placeholder/600/400',
    tags: ['Mobile', 'Health', 'Social'],
    technologies: [
      { name: 'React Native', icon: Code, color: 'from-cyan-400 to-blue-500' },
      { name: 'Node.js', icon: Code, color: 'from-green-500 to-emerald-500' },
      { name: 'MongoDB', icon: Code, color: 'from-green-600 to-teal-600' },
      { name: 'Firebase', icon: Zap, color: 'from-orange-400 to-red-500' },
    ],
    features: [
      'Workout tracking & planning',
      'Social challenges & leaderboards',
      'Nutrition & meal planning',
      'Wearable device integration',
      'AI-powered coaching'
    ],
    stats: [
      { label: 'Downloads', value: '500K+' },
      { label: 'Workouts', value: '2M+' },
      { label: 'Rating', value: '4.8★' }
    ],
    links: {
      demo: '#'
    },
    status: 'in-progress',
    category: 'mobile'
  }
];

const categories = [
  { id: 'all', name: 'All Projects', count: projects.length },
  { id: 'web', name: 'Web Apps', count: projects.filter(p => p.category === 'web').length },
  { id: 'mobile', name: 'Mobile', count: projects.filter(p => p.category === 'mobile').length },
  { id: 'ai', name: 'AI/ML', count: projects.filter(p => p.category === 'ai').length },
  { id: 'design', name: 'Design', count: projects.filter(p => p.category === 'design').length },
];

export function Projects({ className }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-600 dark:text-green-400';
      case 'in-progress':
        return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400';
      case 'coming-soon':
        return 'bg-blue-500/20 text-blue-600 dark:text-blue-400';
      default:
        return 'bg-gray-500/20 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <section
      ref={ref}
      id="projects"
      className={cn(
        'relative min-h-screen py-20 overflow-hidden',
        'bg-gradient-to-br from-gray-50 via-white to-blue-50/30',
        'dark:from-gray-900 dark:via-gray-800 dark:to-slate-900',
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-500/10 to-orange-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium border border-blue-500/20">
              🚀 Featured Work
            </span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="block text-gray-900 dark:text-white mb-2">
                Projects That
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Make Impact
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A showcase of innovative solutions I&apos;ve built, from AI-powered platforms 
              to comprehensive design systems. Each project represents a unique challenge 
              and creative solution.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  'px-6 py-3 rounded-full font-medium transition-all duration-300',
                  'border border-transparent',
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white/50 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 border-gray-200 dark:border-gray-700'
                )}
              >
                {category.name}
                <span className="ml-2 text-xs opacity-75">({category.count})</span>
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            className="grid lg:grid-cols-2 gap-8"
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group cursor-pointer"
                  onHoverStart={() => setHoveredProject(project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative bg-white dark:bg-gray-800/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50">
                    {/* Project Image */}
                    <div className="relative h-64 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <div className="text-6xl opacity-30">🚀</div>
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-black/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={cn(
                          'px-3 py-1 rounded-full text-xs font-medium',
                          getStatusColor(project.status)
                        )}>
                          {project.status.replace('-', ' ')}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <motion.div
                        className="absolute top-4 right-4 flex gap-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ 
                          opacity: hoveredProject === project.id ? 1 : 0,
                          y: hoveredProject === project.id ? 0 : -10 
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.links.demo && (
                          <a
                            href={project.links.demo}
                            className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Play className="w-4 h-4 text-gray-700" />
                          </a>
                        )}
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className="w-4 h-4 text-gray-700" />
                          </a>
                        )}
                      </motion.div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div className="flex items-center gap-3 pt-2">
                        {project.technologies.slice(0, 4).map((tech) => {
                          const Icon = tech.icon;
                          return (
                            <div
                              key={tech.name}
                              className={cn(
                                'p-2 rounded-lg bg-gradient-to-r',
                                tech.color
                              )}
                            >
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                          );
                        })}
                        {project.technologies.length > 4 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 space-y-6">
                {/* Modal Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {selectedProject.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedProject.description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                {/* Project Details */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {/* Long Description */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        About This Project
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {selectedProject.longDescription}
                      </p>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                            <Star className="w-4 h-4 text-yellow-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Technologies */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Technologies Used
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedProject.technologies.map((tech) => {
                          const Icon = tech.icon;
                          return (
                            <div
                              key={tech.name}
                              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                            >
                              <div className={cn('p-2 rounded-lg bg-gradient-to-r', tech.color)}>
                                <Icon className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {tech.name}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Stats */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Project Impact
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {selectedProject.stats.map((stat) => (
                          <div
                            key={stat.label}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                          >
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {stat.label}
                            </span>
                            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {stat.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  {selectedProject.links.demo && (
                    <a
                      href={selectedProject.links.demo}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:shadow-lg transition-all"
                    >
                      <Play className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {selectedProject.links.github && (
                    <a
                      href={selectedProject.links.github}
                      className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </a>
                  )}
                  {selectedProject.links.live && (
                    <a
                      href={selectedProject.links.live}
                      className="flex items-center gap-2 px-6 py-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full hover:bg-green-200 dark:hover:bg-green-900/50 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit Site
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
