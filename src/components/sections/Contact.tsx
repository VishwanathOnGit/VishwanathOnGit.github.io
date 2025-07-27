'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  Github, 
  Linkedin, 
  Twitter,
  Download,
  ExternalLink,
  Globe,
  MessageCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactProps {
  className?: string;
}

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@yourportfolio.com',
    href: 'mailto:hello@yourportfolio.com',
    description: 'Send me an email anytime',
    color: 'from-red-500 to-rose-500'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
    description: 'Available 9 AM - 6 PM EST',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'San Francisco, CA',
    href: '#',
    description: 'Open to remote work',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Globe,
    label: 'Time Zone',
    value: 'PST (UTC-8)',
    href: '#',
    description: 'Usually respond within 24h',
    color: 'from-purple-500 to-indigo-500'
  }
];

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/yourusername',
    color: 'hover:bg-gray-800 hover:text-white',
    followers: '1.2K'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/yourusername',
    color: 'hover:bg-blue-600 hover:text-white',
    followers: '5.8K'
  },
  {
    icon: Twitter,
    label: 'Twitter',
    href: 'https://twitter.com/yourusername',
    color: 'hover:bg-sky-500 hover:text-white',
    followers: '2.1K'
  },
  {
    icon: MessageCircle,
    label: 'Discord',
    href: '#',
    color: 'hover:bg-indigo-600 hover:text-white',
    followers: 'Available'
  }
];

export function Contact({ className }: ContactProps) {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

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
      id="contact"
      className={cn(
        'relative min-h-screen py-20 overflow-hidden',
        'bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50',
        'dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950',
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-tr from-pink-500/10 to-orange-500/10 rounded-full blur-3xl" />
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
              💬 Get In Touch
            </span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="block text-gray-900 dark:text-white mb-2">
                Let&apos;s Create
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Something Amazing
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Have a project in mind? Want to collaborate? Or just want to say hello? 
              I&apos;d love to hear from you. Let&apos;s discuss how we can bring your ideas to life.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Send me a message
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Fill out the form below and I&apos;ll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="What's this about?"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={cn(
                    'w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300',
                    'flex items-center justify-center gap-2',
                    isSubmitted
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:scale-105'
                  )}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      ✓ Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info & Social */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Contact Methods */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Other ways to reach me
                </h3>
                
                <div className="grid gap-4">
                  {contactMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <motion.a
                        key={method.label}
                        href={method.href}
                        className="group p-4 bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                        whileHover={{ y: -2 }}
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            'p-3 rounded-xl bg-gradient-to-r',
                            method.color
                          )}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {method.label}
                              </h4>
                              <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-blue-600 dark:text-blue-400 font-medium">
                              {method.value}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {method.description}
                            </p>
                          </div>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Connect with me
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'group p-4 bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300',
                          social.color
                        )}
                        whileHover={{ y: -2 }}
                      >
                        <div className="text-center space-y-2">
                          <Icon className="w-8 h-8 mx-auto text-gray-600 dark:text-gray-400 group-hover:text-current transition-colors" />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white group-hover:text-current">
                              {social.label}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-current">
                              {social.followers}
                            </p>
                          </div>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Resume Download */}
              <motion.div
                className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                    <Download className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Download My Resume
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Get a detailed overview of my experience and skills
                    </p>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all">
                    Download PDF
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
