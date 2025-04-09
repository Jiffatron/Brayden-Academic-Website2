import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-8 px-6 md:px-16 lg:px-24 navy-dark-section border-t border-border">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <motion.div 
          className="text-muted-foreground text-sm mb-4 md:mb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          &copy; {new Date().getFullYear()} Brayden Swavey. All rights reserved.
        </motion.div>
        <motion.div 
          className="flex space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <a href="#about" className="text-muted-foreground hover:text-primary text-sm transition-colors">
            About
          </a>
          <a href="#research" className="text-muted-foreground hover:text-primary text-sm transition-colors">
            Research
          </a>
          <a href="#resume" className="text-muted-foreground hover:text-primary text-sm transition-colors">
            Resume
          </a>
          <a href="#blog" className="text-muted-foreground hover:text-primary text-sm transition-colors">
            Blog
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">
            Contact -- Under Construction
          </a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
