import { useState, useEffect, RefObject, useMemo } from "react";
import { useScrollVelocity } from "./useScrollVelocity";

interface AdaptiveIntersectionOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
  enabled?: boolean;
  fastScrollMultiplier?: number; // Speed up animations for fast scrollers
}

/**
 * Enhanced intersection observer that adapts animation timing based on scroll velocity
 * Provides faster animations for users who scroll quickly through content
 */
export function useAdaptiveIntersection(
  elementRef: RefObject<Element>,
  options: AdaptiveIntersectionOptions = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const scrollData = useScrollVelocity(1.2); // More sensitive detection for better responsiveness
  
  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Calculate adaptive animation duration based on scroll speed
  const getAnimationDuration = useMemo(() => {
    const baseDuration = 0.6; // Default animation duration in seconds
    const fastScrollMultiplier = options.fastScrollMultiplier || 0.4;
    
    if (prefersReducedMotion) return 0;
    if (scrollData.isFastScrolling) return baseDuration * fastScrollMultiplier;
    
    return baseDuration;
  }, [scrollData.isFastScrolling, prefersReducedMotion, options.fastScrollMultiplier]);

  // Default options with performance optimizations
  const observerOptions = useMemo(() => ({
    root: null,
    rootMargin: scrollData.isFastScrolling ? '100px' : '50px', // Larger margin for fast scrollers
    threshold: 0.1,
    once: true,
    enabled: true,
    ...options
  }), [options, scrollData.isFastScrolling]);

  useEffect(() => {
    const element = elementRef.current;
    
    if (!element || !observerOptions.enabled) return;
    
    // If user prefers reduced motion, immediately set to visible
    if (prefersReducedMotion) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      const isVisible = entry.isIntersecting;
      setIsIntersecting(isVisible);
      
      // If 'once' is true and element is visible, stop observing
      if (observerOptions.once && isVisible) {
        observer.unobserve(element);
      }
    }, {
      root: observerOptions.root,
      rootMargin: observerOptions.rootMargin,
      threshold: observerOptions.threshold
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [elementRef, observerOptions, prefersReducedMotion]);

  return {
    isIntersecting,
    animationDuration: getAnimationDuration,
    isFastScrolling: scrollData.isFastScrolling,
    scrollVelocity: scrollData.velocity
  };
}
