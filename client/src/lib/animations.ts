// Animation configuration for consistent, reusable animations across the site
// All animations use GPU-friendly properties (transform, opacity) for optimal performance

// Check for reduced motion preference
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Base animation settings that respect user preferences
const getAnimationConfig = (config: any) => {
  if (prefersReducedMotion()) {
    return {
      ...config,
      transition: { duration: 0 },
      animate: config.animate ? { ...config.animate, transition: { duration: 0 } } : undefined,
    };
  }
  return config;
};

// Common easing functions
export const easings = {
  easeOut: [0.0, 0.0, 0.2, 1],
  easeIn: [0.4, 0.0, 1, 1],
  easeInOut: [0.4, 0.0, 0.2, 1],
  spring: { type: "spring", stiffness: 300, damping: 30 },
  gentle: { type: "spring", stiffness: 100, damping: 20 },
} as const;

// Fade animations
export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: easings.easeOut }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3, ease: easings.easeIn }
  }
};

// Slide animations (GPU-optimized with transform)
export const slideVariants = {
  up: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: easings.easeOut }
    }
  },
  down: {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: easings.easeOut }
    }
  },
  left: {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: easings.easeOut }
    }
  },
  right: {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: easings.easeOut }
    }
  }
};

// Scale animations
export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: easings.easeOut }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.3, ease: easings.easeIn }
  }
};

// Container animations with stagger
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggeredContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

// Item animations for use with containers
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easings.easeOut },
  },
};

// Modal animations
export const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.3, ease: easings.easeOut }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20,
    transition: { duration: 0.2, ease: easings.easeIn }
  }
};

export const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

// Navbar animations
export const navbarVariants = {
  visible: { y: 0, opacity: 1 },
  hidden: { y: -100, opacity: 0 }
};

// Hover animations (for interactive elements)
export const hoverVariants = {
  hover: { 
    y: -2,
    transition: { duration: 0.2, ease: easings.easeOut }
  },
  tap: { 
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

export const cardHoverVariants = {
  hover: { 
    y: -5,
    transition: { duration: 0.3, ease: easings.easeOut }
  }
};

// Page transition animations
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

export const pageTransition = {
  type: "tween",
  ease: easings.easeInOut,
  duration: 0.4
};

// Utility function to create scroll-triggered animations
export const createScrollAnimation = (threshold = 0.1) => ({
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, threshold },
  variants: slideVariants.up
});

// Utility function to apply reduced motion preferences
export const withReducedMotion = (animation: any) => {
  return getAnimationConfig(animation);
};

// Export commonly used combinations
export const fadeInUp = withReducedMotion({
  initial: "hidden",
  animate: "visible",
  variants: slideVariants.up
});

export const fadeInScale = withReducedMotion({
  initial: "hidden",
  animate: "visible",
  variants: scaleVariants
});

export const staggerContainer = withReducedMotion({
  initial: "hidden",
  animate: "visible",
  variants: containerVariants
});
