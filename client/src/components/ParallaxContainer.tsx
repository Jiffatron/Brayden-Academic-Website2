import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

interface ParallaxContainerProps {
  children: ReactNode;
  speed?: number; // Parallax speed multiplier (0.1 = slow, 1 = normal speed)
  direction?: 'up' | 'down';
  className?: string;
  disabled?: boolean; // Disable on mobile or for reduced motion
}

/**
 * Subtle parallax container that adds depth without being distracting
 * Automatically disabled for users who prefer reduced motion
 */
const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  disabled = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for reduced motion and mobile
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    
    setPrefersReducedMotion(mediaQuery.matches);
    setIsMobile(mobileQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    const handleMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    mediaQuery.addEventListener('change', handleMotionChange);
    mobileQuery.addEventListener('change', handleMobileChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      mobileQuery.removeEventListener('change', handleMobileChange);
    };
  }, []);

  // Get scroll progress for this element
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to parallax movement
  const yRange = direction === 'up' ? [-50, 50] : [50, -50];
  const y = useTransform(scrollYProgress, [0, 1], yRange.map(val => val * speed));

  // Disable parallax for reduced motion, mobile, or when explicitly disabled
  const shouldDisableParallax = prefersReducedMotion || isMobile || disabled;

  if (shouldDisableParallax) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{ 
          y,
          // GPU acceleration
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxContainer;
