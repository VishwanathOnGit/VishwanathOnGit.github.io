/**
 * Reusable Button Components
 * Eliminates code duplication and provides consistent styling
 */

import { forwardRef } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { COLORS, BORDERS } from '@/constants/ui';
import { hoverAnimations, transitions } from '@/constants/animations';

interface BaseButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

type ButtonProps = BaseButtonProps & Omit<MotionProps, keyof BaseButtonProps>;

const buttonVariants = {
  primary: `bg-gradient-to-r ${COLORS.GRADIENTS.PRIMARY} text-white hover:shadow-lg`,
  secondary: `bg-gradient-to-r ${COLORS.GRADIENTS.SECONDARY} text-white hover:shadow-lg`,
  outline: 'border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800',
  ghost: 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
};

const buttonSizes = {
  small: 'px-4 py-2 text-sm',
  medium: 'px-6 py-3 text-base',
  large: 'px-8 py-4 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    className, 
    variant = 'primary', 
    size = 'medium', 
    fullWidth = false,
    disabled = false,
    onClick,
    ...motionProps 
  }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          // Base styles
          'relative font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          BORDERS.RADIUS.FULL,
          // Variant styles
          buttonVariants[variant],
          // Size styles
          buttonSizes[size],
          // Width
          fullWidth && 'w-full',
          // Disabled state
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        whileHover={disabled ? {} : hoverAnimations.scale}
        whileTap={disabled ? {} : { scale: 0.95 }}
        transition={transitions.fast}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        {...motionProps}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

/**
 * Specialized button for CTAs with gradient effects
 */
export function GradientButton({ 
  children, 
  className, 
  ...props 
}: Omit<ButtonProps, 'variant'>) {
  return (
    <Button
      variant="primary"
      className={cn(
        'group relative overflow-hidden',
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Button>
  );
}

/**
 * Icon button component
 */
interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  icon: React.ReactNode;
  label: string;
  iconOnly?: boolean;
}

export function IconButton({ 
  icon, 
  label, 
  iconOnly = false, 
  className,
  size = 'medium',
  ...props 
}: IconButtonProps) {
  const iconSizes = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6',
  };

  return (
    <Button
      className={cn(
        iconOnly && 'aspect-square',
        className
      )}
      size={size}
      aria-label={label}
      {...props}
    >
      <div className={cn('flex items-center gap-2', iconOnly && 'justify-center')}>
        <span className={iconSizes[size]}>{icon}</span>
        {!iconOnly && <span>{label}</span>}
      </div>
    </Button>
  );
}

/**
 * Social link button
 */
interface SocialButtonProps {
  icon: React.ReactNode;
  href: string;
  label: string;
  className?: string;
}

export function SocialButton({ icon, href, label, className }: SocialButtonProps) {
  return (
    <motion.a
      href={href}
      className={cn(
        'group p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300',
        className
      )}
      whileHover={hoverAnimations.scale}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {icon}
    </motion.a>
  );
}
