/**
 * Homepage Table of Contents
 * 
 * A sticky table of contents for the homepage that allows users to quickly
 * navigate between different sections of the homepage.
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FEATURES } from '@/config/features';

interface TocSection {
  id: string;
  title: string;
  icon: string;
}

interface HomepageTableOfContentsProps {
  enabled?: boolean;
}

const HomepageTableOfContents = ({ enabled = true }: HomepageTableOfContentsProps) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!FEATURES.homepageTocStartsMinimized);

  // Define homepage sections
  const sections: TocSection[] = [
    { id: 'hero', title: 'Welcome', icon: 'fa-home' },
    { id: 'about', title: 'About Me', icon: 'fa-user' },
    { id: 'projects', title: 'Featured Projects', icon: 'fa-briefcase' },
    { id: 'resume', title: 'Experience', icon: 'fa-file-alt' },
    { id: 'blog', title: 'Latest Posts', icon: 'fa-blog' },
    { id: 'contact', title: 'Contact', icon: 'fa-envelope' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for navbar
      
      // Show/hide TOC based on scroll position
      setIsVisible(window.scrollY > 300);

      // Find the current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = id === 'hero' ? 0 : element.offsetTop - 80; // Account for navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Don't render if disabled or not visible
  if (!enabled || !isVisible) {
    return null;
  }

  return (
    <motion.div
      className="hidden lg:block fixed left-6 top-1/2 transform -translate-y-1/2 z-30"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-lg overflow-hidden"
        animate={{
          width: isExpanded ? 'auto' : '3rem',
          maxWidth: isExpanded ? '20rem' : '3rem'
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {!isExpanded ? (
          /* Minimized State - Just the toggle button */
          <motion.button
            onClick={() => setIsExpanded(true)}
            className="w-full h-12 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
            title="Expand Table of Contents"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-bars text-lg"></i>
          </motion.button>
        ) : (
          /* Expanded State - Header with toggle button + content */
          <motion.div
            className="p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center mb-4 pb-3 border-b border-border">
              <motion.button
                onClick={() => setIsExpanded(false)}
                className="w-8 h-8 flex items-center justify-center text-primary hover:bg-primary/10 transition-colors rounded mr-3"
                title="Minimize Table of Contents"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-bars text-sm"></i>
              </motion.button>
              <h3 className="text-sm font-semibold text-foreground">
                Page Contents
              </h3>
            </div>

            <nav className="space-y-2">
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center w-full text-left text-sm py-2 px-3 rounded-md transition-all duration-200 ${
                    activeSection === section.id
                      ? 'text-primary bg-primary/10 font-medium shadow-sm border-l-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <i className={`fas ${section.icon} mr-3 w-4 text-center ${
                    activeSection === section.id ? 'text-primary' : 'text-muted-foreground'
                  }`}></i>
                  <span>{section.title}</span>
                </motion.button>
              ))}
            </nav>

            {/* Progress indicator */}
            <div className="mt-4 pt-3 border-t border-border">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>Reading Progress</span>
                <span>{Math.round(((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <motion.div
                  className="bg-primary h-1.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%`
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Quick actions */}
            <div className="mt-4 pt-3 border-t border-border flex gap-2">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex-1 text-xs py-2 px-3 bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
                title="Back to top"
              >
                <i className="fas fa-arrow-up mr-1"></i>
                Top
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="flex-1 text-xs py-2 px-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors"
                title="Jump to contact"
              >
                <i className="fas fa-envelope mr-1"></i>
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default HomepageTableOfContents;
