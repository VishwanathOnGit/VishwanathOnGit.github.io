import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Your Name',
  title: 'Your Name - Full Stack Developer',
  description: 'Passionate full-stack developer creating modern web applications with React, Next.js, and Node.js. Specialized in building scalable, user-centric solutions.',
  url: 'https://yourname.vercel.app',
  ogImage: 'https://yourname.vercel.app/og-image.jpg',
  contact: {
    email: 'your.email@example.com',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourprofile',
    twitter: 'https://twitter.com/yourusername',
    website: 'https://yourname.vercel.app',
  },
};

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

// Animation variants for consistent motion throughout the app
export const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -60 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
