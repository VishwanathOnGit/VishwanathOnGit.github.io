/**
 * Reusable Form Components
 * Breaks down the massive Contact form into manageable pieces
 */

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FORM } from '@/constants/ui';
import { commonAnimations } from '@/constants/animations';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ label, error, required, children }: FormFieldProps) {
  return (
    <motion.div 
      variants={commonAnimations.itemVariants}
      className="space-y-2"
    >
      <label className={cn(FORM.LABEL_CLASSES)}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={FORM.ERROR_CLASSES}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          FORM.INPUT_CLASSES,
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          FORM.INPUT_CLASSES,
          'resize-none',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
    );
  }
);

TextArea.displayName = 'TextArea';

interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function FormGroup({ children, className }: FormGroupProps) {
  return (
    <motion.div 
      variants={commonAnimations.containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('space-y-6', className)}
    >
      {children}
    </motion.div>
  );
}

/**
 * Contact form validation schema
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.subject.trim()) {
    errors.subject = 'Subject is required';
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
}
