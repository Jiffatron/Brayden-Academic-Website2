import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  action: () => void;
}

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('home');

  // Scroll to section helper
  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Navigation items - Instagram/Twitter style
  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: 'fa-home',
      action: () => {
        navigate('/');
        setActiveTab('home');
      }
    },
    {
      id: 'about',
      label: 'About',
      icon: 'fa-user',
      action: () => {
        scrollToSection('about');
        setActiveTab('about');
      }
    },
    {
      id: 'projects',
      label: 'Work',
      icon: 'fa-briefcase',
      action: () => {
        navigate('/projects');
        setActiveTab('projects');
      }
    },
    {
      id: 'blog',
      label: 'Blog',
      icon: 'fa-edit',
      action: () => {
        navigate('/blog');
        setActiveTab('blog');
      }
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: 'fa-envelope',
      action: () => {
        scrollToSection('contact');
        setActiveTab('contact');
      }
    }
  ];

  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveTab('home');
    else if (path.startsWith('/projects')) setActiveTab('projects');
    else if (path.startsWith('/blog')) setActiveTab('blog');
  }, [location.pathname]);

  return (
    <motion.nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border/20 safe-area-pb"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={item.action}
            className={`flex flex-col items-center justify-center min-h-[60px] min-w-[60px] px-2 py-1 rounded-lg transition-all duration-200 ${
              activeTab === item.id
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <i className={`fas ${item.icon} text-lg mb-1`}></i>
            <span className="text-xs font-medium leading-tight">{item.label}</span>
            
            {/* Active indicator */}
            {activeTab === item.id && (
              <motion.div
                className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"
                layoutId="activeTab"
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.button>
        ))}
      </div>
      
      {/* Safe area padding for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-background/95"></div>
    </motion.nav>
  );
};

export default MobileBottomNav;
