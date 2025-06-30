import { useState, useEffect, RefObject, useMemo } from "react";

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean; // Only trigger once
  enabled?: boolean; // Allow disabling the observer
}

export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  options: IntersectionObserverOptions = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Default options with performance optimizations
  const observerOptions = useMemo(() => ({
    root: null,
    rootMargin: '50px', // Start animation slightly before element is visible
    threshold: 0.1,
    once: true, // Default to only trigger once for performance
    enabled: true,
    ...options
  }), [options]);

  useEffect(() => {
    const element = elementRef.current;

    // Don't observe if disabled or element doesn't exist
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

  return isIntersecting;
}

// Enhanced hook for multiple elements
export function useIntersectionObserverMultiple(
  elementRefs: RefObject<Element>[],
  options: IntersectionObserverOptions = {}
): boolean[] {
  const [intersections, setIntersections] = useState<boolean[]>(
    new Array(elementRefs.length).fill(false)
  );

  const observerOptions = useMemo(() => ({
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    once: true,
    enabled: true,
    ...options
  }), [options]);

  useEffect(() => {
    const elements = elementRefs.map(ref => ref.current).filter(Boolean);
    if (elements.length === 0 || !observerOptions.enabled) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = elements.indexOf(entry.target as Element);
        if (index !== -1) {
          setIntersections(prev => {
            const newState = [...prev];
            newState[index] = entry.isIntersecting;
            return newState;
          });

          if (observerOptions.once && entry.isIntersecting) {
            observer.unobserve(entry.target);
          }
        }
      });
    }, {
      root: observerOptions.root,
      rootMargin: observerOptions.rootMargin,
      threshold: observerOptions.threshold
    });

    elements.forEach(element => observer.observe(element));

    return () => {
      elements.forEach(element => observer.unobserve(element));
      observer.disconnect();
    };
  }, [elementRefs, observerOptions]);

  return intersections;
}
