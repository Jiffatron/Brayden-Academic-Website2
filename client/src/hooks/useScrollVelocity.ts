import { useState, useEffect, useRef } from 'react';

interface ScrollVelocityData {
  velocity: number;
  direction: 'up' | 'down' | 'idle';
  isScrolling: boolean;
  isFastScrolling: boolean;
}

/**
 * Hook to detect scroll velocity and adjust animation speeds accordingly
 * Fast scrollers get quicker animations for better responsiveness
 */
export const useScrollVelocity = (threshold = 1.5): ScrollVelocityData => {
  const [scrollData, setScrollData] = useState<ScrollVelocityData>({
    velocity: 0,
    direction: 'idle',
    isScrolling: false,
    isFastScrolling: false
  });

  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(0);
  const velocityHistory = useRef<number[]>([]);
  const scrollTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      
      // Calculate velocity (pixels per millisecond)
      const deltaY = currentScrollY - lastScrollY.current;
      const deltaTime = currentTime - lastTimestamp.current;
      const velocity = deltaTime > 0 ? Math.abs(deltaY / deltaTime) : 0;
      
      // Keep a rolling average of velocity for smoother detection
      velocityHistory.current.push(velocity);
      if (velocityHistory.current.length > 3) { // Shorter history for more responsive detection
        velocityHistory.current.shift();
      }

      const avgVelocity = velocityHistory.current.reduce((a, b) => a + b, 0) / velocityHistory.current.length;
      
      // Determine direction
      const direction = deltaY > 0 ? 'down' : deltaY < 0 ? 'up' : 'idle';
      
      // Fast scrolling detection (adjustable threshold)
      const isFastScrolling = avgVelocity > threshold;
      
      setScrollData({
        velocity: avgVelocity,
        direction,
        isScrolling: true,
        isFastScrolling
      });

      // Clear scrolling state after scroll ends
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setScrollData(prev => ({
          ...prev,
          isScrolling: false,
          direction: 'idle',
          velocity: 0
        }));
        velocityHistory.current = [];
      }, 150);

      lastScrollY.current = currentScrollY;
      lastTimestamp.current = currentTime;
    };

    // Initialize
    lastScrollY.current = window.scrollY;
    lastTimestamp.current = Date.now();

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, [threshold]);

  return scrollData;
};
