// Global type definitions for the portfolio application

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  category: 'web' | 'mobile' | 'desktop' | 'ai' | 'other';
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools' | 'other';
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
  location: string;
  type: 'work' | 'education' | 'project';
}

export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  website?: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  contact: ContactInfo;
}

// Component prop types
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface PageProps {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Animation variants for consistent motion
export interface AnimationVariants {
  hidden: { [key: string]: number | string | boolean };
  visible: { [key: string]: number | string | boolean };
  exit?: { [key: string]: number | string | boolean };
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}
