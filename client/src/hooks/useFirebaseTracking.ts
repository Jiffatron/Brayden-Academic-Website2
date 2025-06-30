/**
 * Firebase Tracking Hook
 * 
 * Easy-to-use React hook for tracking user interactions
 * with automatic fallback to localStorage system.
 */

import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  trackPageView, 
  trackProjectView, 
  trackDownload, 
  trackCodeCopy,
  trackImageExpand,
  trackDeepScroll,
  trackLongRead
} from '@/services/firebaseAnalytics';
import { 
  getCurrentViewCount, 
  setViewCount 
} from '@/utils/viewCountManager';

export const useFirebaseTracking = (projectId?: string) => {
  const location = useLocation();

  // Track page views automatically
  useEffect(() => {
    const pageName = location.pathname === '/' ? 'Homepage' : 
                    location.pathname.includes('/projects') ? 'Project Page' :
                    location.pathname.includes('/blog') ? 'Blog' :
                    location.pathname.includes('/contact') ? 'Contact' : 'Unknown';
    
    trackPageView(pageName, projectId);
  }, [location, projectId]);

  // Track project view with session timing
  const trackProject = useCallback((options: {
    viewDuration?: number;
    scrollDepth?: number;
  } = {}) => {
    if (!projectId) return;

    // Firebase tracking
    trackProjectView({
      projectId,
      viewDuration: options.viewDuration,
      scrollDepth: options.scrollDepth,
      referrer: document.referrer,
      userAgent: navigator.userAgent
    });

    // Fallback: Update localStorage view count
    const currentCount = getCurrentViewCount(projectId);
    setViewCount(projectId, currentCount + 1);
  }, [projectId]);

  // Track file downloads
  const trackFileDownload = useCallback((fileName: string) => {
    if (!projectId) return;

    const fileType = fileName.split('.').pop() || 'unknown';
    
    trackDownload({
      projectId,
      fileName,
      fileType
    });
  }, [projectId]);

  // Track code copy events
  const trackCodeCopyEvent = useCallback((codeSection: string) => {
    if (!projectId) return;
    
    trackCodeCopy(projectId, codeSection);
  }, [projectId]);

  // Track image expansions
  const trackImageExpansion = useCallback((imageName: string) => {
    if (!projectId) return;
    
    trackImageExpand(projectId, imageName);
  }, [projectId]);

  // Track scroll depth
  const trackScrollDepth = useCallback((depth: number) => {
    if (!projectId) return;
    
    trackDeepScroll(projectId, depth);
  }, [projectId]);

  // Track long reading sessions
  const trackReadingTime = useCallback((seconds: number) => {
    if (!projectId) return;
    
    trackLongRead(projectId, seconds);
  }, [projectId]);

  return {
    trackProject,
    trackFileDownload,
    trackCodeCopyEvent,
    trackImageExpansion,
    trackScrollDepth,
    trackReadingTime
  };
};

// Session tracking hook
export const useSessionTracking = (projectId?: string) => {
  const { trackProject, trackScrollDepth, trackReadingTime } = useFirebaseTracking(projectId);

  useEffect(() => {
    if (!projectId) return;

    let startTime = Date.now();
    let maxScroll = 0;
    let scrollTimeout: NodeJS.Timeout;

    // Track scroll depth
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      maxScroll = Math.max(maxScroll, scrollPercent);
      
      // Debounce scroll tracking
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        trackScrollDepth(maxScroll);
      }, 1000);
    };

    // Track session end
    const handleBeforeUnload = () => {
      const sessionDuration = Math.round((Date.now() - startTime) / 1000);
      
      trackProject({
        viewDuration: sessionDuration,
        scrollDepth: maxScroll
      });
      
      trackReadingTime(sessionDuration);
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Track initial page view
    trackProject();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearTimeout(scrollTimeout);
      
      // Track session end on component unmount
      const sessionDuration = Math.round((Date.now() - startTime) / 1000);
      trackProject({
        viewDuration: sessionDuration,
        scrollDepth: maxScroll
      });
    };
  }, [projectId, trackProject, trackScrollDepth, trackReadingTime]);
};

// Download tracking hook
export const useDownloadTracking = (projectId?: string) => {
  const { trackFileDownload } = useFirebaseTracking(projectId);

  const trackDownloadClick = useCallback((fileName: string) => {
    trackFileDownload(fileName);
    
    // Optional: Show download confirmation
    console.log(`📥 Download tracked: ${fileName}`);
  }, [trackFileDownload]);

  return { trackDownloadClick };
};

// Code interaction tracking hook
export const useCodeTracking = (projectId?: string) => {
  const { trackCodeCopyEvent } = useFirebaseTracking(projectId);

  const trackCopyClick = useCallback((codeSection: string) => {
    trackCodeCopyEvent(codeSection);
    
    // Optional: Show copy confirmation
    console.log(`📋 Code copy tracked: ${codeSection}`);
  }, [trackCodeCopyEvent]);

  return { trackCopyClick };
};
