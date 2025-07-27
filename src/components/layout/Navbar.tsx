'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { navItems } from '@/config/site';
import { cn } from '@/lib/utils';
import { useScroll, useActiveSection } from '@/hooks/useScroll';
import { IconButton } from '@/components/ui/Button';
import { commonAnimations } from '@/constants/animations';

interface NavbarProps {
  className?: string;
}

/**
 * Navigation Logo Component
 */
function NavLogo({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      className="flex-shrink-0"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <button
        onClick={onClick}
        className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
      >
        YN
      </button>
    </motion.div>
  );
}

/**
 * Desktop Navigation Items
 */
function DesktopNav({ 
  activeSection, 
  onSectionClick 
}: { 
  activeSection: string; 
  onSectionClick: (section: string) => void;
}) {
  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4">
        {navItems.map((item) => {
          const sectionId = item.href.slice(1);
          const isActive = activeSection === sectionId;
          
          return (
            <motion.button
              key={item.label}
              onClick={() => onSectionClick(sectionId)}
              className={cn(
                'px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative',
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
              {isActive && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  layoutId="activeSection"
                  initial={false}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Mobile Navigation Menu
 */
function MobileNav({ 
  isOpen, 
  activeSection, 
  onSectionClick 
}: { 
  isOpen: boolean;
  activeSection: string; 
  onSectionClick: (section: string) => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md border-b border-border/40"
            variants={commonAnimations.containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item) => {
              const sectionId = item.href.slice(1);
              const isActive = activeSection === sectionId;
              
              return (
                <motion.button
                  key={item.label}
                  onClick={() => onSectionClick(sectionId)}
                  className={cn(
                    'block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200',
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  )}
                  variants={commonAnimations.itemVariants}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Navbar({ className }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isScrolled, scrollToElement } = useScroll();
  const activeSection = useActiveSection(navItems.map(item => item.href.slice(1)));

  const handleSectionClick = (sectionId: string) => {
    scrollToElement(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border/40 shadow-lg'
          : 'bg-transparent',
        className
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLogo onClick={() => handleSectionClick('home')} />
          
          <DesktopNav 
            activeSection={activeSection}
            onSectionClick={handleSectionClick}
          />

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <IconButton
                icon={isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                label="Toggle mobile menu"
                iconOnly
                variant="ghost"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </div>
        </div>
      </div>

      <MobileNav 
        isOpen={isMobileMenuOpen}
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />
    </motion.nav>
  );
}
