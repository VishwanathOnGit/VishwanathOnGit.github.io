/**
 * Contact Form Component
 * Extracted from the large Contact component to handle form-specific logic
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { FormGroup, FormField, Input, TextArea, ContactFormData, ContactFormErrors, validateContactForm } from '@/components/ui/Form';
import { commonAnimations } from '@/constants/animations';

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    
    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default simulation
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800"
      >
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-green-600 dark:text-green-300">
          Thank you for reaching out. I&apos;ll get back to you soon!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      variants={commonAnimations.itemVariants}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Send me a message
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          I&apos;d love to hear from you. Fill out the form below and I&apos;ll get back to you as soon as possible.
        </p>
      </div>

      <FormGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField 
            label="Name" 
            required 
            error={errors.name}
          >
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
              error={!!errors.name}
            />
          </FormField>
          
          <FormField 
            label="Email" 
            required 
            error={errors.email}
          >
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              error={!!errors.email}
            />
          </FormField>
        </div>

        <FormField 
          label="Subject" 
          required 
          error={errors.subject}
        >
          <Input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="What's this about?"
            error={!!errors.subject}
          />
        </FormField>

        <FormField 
          label="Message" 
          required 
          error={errors.message}
        >
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            placeholder="Tell me about your project, ideas, or just say hello!"
            error={!!errors.message}
          />
        </FormField>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
              />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              Send Message
            </>
          )}
        </button>
      </FormGroup>
    </motion.form>
  );
}
