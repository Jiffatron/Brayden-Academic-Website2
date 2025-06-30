import React, { useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useAdaptiveIntersection } from '@/hooks/useAdaptiveIntersection';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  delay?: number;
  distance?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
  stagger?: boolean; // For staggering child animations
}

/**
 * Reusable scroll-reveal component that adapts animation speed to user scroll velocity
 * Provides smooth, responsive animations that feel natural for all scroll speeds
 */
const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  distance = 20,
  duration,
  className = '',
  once = true,
  threshold = 0.1,
  stagger = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting, animationDuration, isFastScrolling } = useAdaptiveIntersection(ref, {
    threshold,
    once,
    fastScrollMultiplier: 0.6 // More conservative speed increase for fast scrollers
  });

  // Use provided duration or adaptive duration
  const finalDuration = duration || animationDuration;

  // Create animation variants based on direction
  const getVariants = () => {
    const baseTransition = {
      duration: finalDuration,
      delay: isFastScrolling ? delay * 0.7 : delay, // More conservative delay reduction
      ease: [0.25, 0.1, 0.25, 1] // Custom easing for smooth feel
    };

    switch (direction) {
      case 'up':
        return {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0, transition: baseTransition }
        };
      case 'down':
        return {
          hidden: { opacity: 0, y: -distance },
          visible: { opacity: 1, y: 0, transition: baseTransition }
        };
      case 'left':
        return {
          hidden: { opacity: 0, x: distance },
          visible: { opacity: 1, x: 0, transition: baseTransition }
        };
      case 'right':
        return {
          hidden: { opacity: 0, x: -distance },
          visible: { opacity: 1, x: 0, transition: baseTransition }
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: baseTransition }
        };
      case 'fade':
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: baseTransition }
        };
    }
  };

  const variants = getVariants();

  // Stagger container variants for child animations
  const containerVariants = stagger ? {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isFastScrolling ? 0.05 : 0.1,
        delayChildren: isFastScrolling ? delay * 0.5 : delay
      }
    }
  } : variants;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isIntersecting ? "visible" : "hidden"}
      variants={stagger ? containerVariants : variants}
      className={className}
      style={{
        // GPU acceleration for smooth animations
        transform: 'translateZ(0)',
        willChange: isIntersecting ? 'transform, opacity' : 'auto'
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
