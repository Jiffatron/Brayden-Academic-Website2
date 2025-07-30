import { useState, useCallback, useMemo } from 'react';

/**
 * Simple hook for slider animations, completely decoupled from IntersectionObserver
 * Provides consistent, immediate animations for slider transitions
 */
export const useSliderAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
  }, []);

  const endAnimation = useCallback(() => {
    setIsAnimating(false);
  }, []);

  // Slider-specific animation variants with reduced motion support
  const sliderVariants = useMemo(() => ({
    enter: {
      opacity: 1,
      x: 0,
      transition: prefersReducedMotion ? { duration: 0 } : {
        duration: 0.25,
        ease: [0.4, 0, 0.2, 1],
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : -50,
      transition: prefersReducedMotion ? { duration: 0 } : {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    initial: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : 50
    }
  }), [prefersReducedMotion]);

  // Card variants optimized for slider context
  const cardVariants = useMemo(() => ({
    initial: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 10
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion ? { duration: 0 } : {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    hover: {
      y: prefersReducedMotion ? 0 : -5,
      transition: prefersReducedMotion ? { duration: 0 } : {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }), [prefersReducedMotion]);

  return {
    isAnimating,
    startAnimation,
    endAnimation,
    sliderVariants,
    cardVariants
  };
};
