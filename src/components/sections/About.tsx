'use client';

import { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Code, Palette, Rocket, Zap, Heart, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AboutProps {
  className?: string;
}

const skills = [
  { name: 'Frontend Magic', icon: Code, color: 'from-blue-500 to-cyan-500', level: 95 },
  { name: 'UI/UX Design', icon: Palette, color: 'from-purple-500 to-pink-500', level: 90 },
  { name: 'Performance', icon: Rocket, color: 'from-green-500 to-emerald-500', level: 88 },
  { name: 'Innovation', icon: Zap, color: 'from-yellow-500 to-orange-500', level: 92 },
  { name: 'User Experience', icon: Heart, color: 'from-red-500 to-rose-500', level: 94 },
  { name: 'Problem Solving', icon: Brain, color: 'from-indigo-500 to-purple-500', level: 96 },
];

const stats = [
  { number: '3+', label: 'Years Experience', description: 'Building digital experiences' },
  { number: '50+', label: 'Projects Completed', description: 'From concept to deployment' },
  { number: '100%', label: 'Client Satisfaction', description: 'Exceeding expectations' },
  { number: '24/7', label: 'Dedicated Support', description: 'Always here to help' },
];

export function About({ className }: AboutProps) {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

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

  return (
    <section
      ref={ref}
      id="about"
      className={cn(
        'relative min-h-screen py-20 overflow-hidden',
        'bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50',
        'dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900',
        className
      )}
    >
      {/* Animated background elements */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left side - Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium border border-blue-500/20">
                ✨ About Me
              </span>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="block text-gray-900 dark:text-white mb-2">
                  Passionate
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Creator & Innovator
                </span>
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I&apos;m a full-stack developer with an insatiable passion for creating 
                digital experiences that not only look stunning but solve real problems. 
                My journey spans from pixel-perfect UI designs to robust backend architectures.
              </p>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                When I&apos;m not coding, you&apos;ll find me exploring the latest technologies, 
                contributing to open-source projects, or sharing knowledge with the developer community.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="group p-6 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/70 dark:hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right side - Skills & Image */}
          <div className="space-y-8">
            {/* Profile Image */}
            <motion.div 
              variants={itemVariants}
              className="relative group"
            >
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  {/* Placeholder for profile image */}
                  <div className="w-full h-full flex items-center justify-center text-6xl text-gray-400 dark:text-gray-600">
                    👨‍💻
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                Core Expertise
              </h3>
              
              <div className="space-y-4">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      className="group cursor-pointer"
                      onHoverStart={() => setHoveredSkill(index)}
                      onHoverEnd={() => setHoveredSkill(null)}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className={cn(
                            'p-2 rounded-lg bg-gradient-to-r transition-all duration-300',
                            skill.color,
                            hoveredSkill === index ? 'scale-110 shadow-lg' : 'scale-100'
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
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
