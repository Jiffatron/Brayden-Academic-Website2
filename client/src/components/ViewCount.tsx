import { useState, useEffect } from 'react';
import { apiService } from '@/services/api';

interface ViewCountProps {
  projectId: string;
  className?: string;
  recordView?: boolean; // Whether to record this as a page view
}

const ViewCount = ({ projectId, className = "", recordView = false }: ViewCountProps) => {
  const [viewCount, setViewCount] = useState<number>(0);
  const [isLive, setIsLive] = useState<boolean>(false);

  // Static base view counts (easily updatable by you)
  const baseViewCounts: Record<string, number> = {
    'PythonMonteCarloBasic': 127,  // Monte Carlo project
    'BondTracker': 89,             // Bond Tracker project
    'mandelbrot-excel': 64,        // Excel Mandelbrot project
    'boeing': 43,                  // Boeing equity research
    // Add more projects here as needed
  };

  // Get stored view count from localStorage or initialize with base count
  const getStoredViewCount = (projectId: string): number => {
    const stored = localStorage.getItem(`viewCount_${projectId}`);
    if (stored) {
      return parseInt(stored, 10);
    }
    // Initialize with base count if not stored
    const baseCount = baseViewCounts[projectId] || Math.floor(Math.random() * 60) + 15;
    localStorage.setItem(`viewCount_${projectId}`, baseCount.toString());
    return baseCount;
  };

  // Check if we should increment the view count (every few days)
  const shouldIncrementViews = (projectId: string): boolean => {
    const lastIncrementKey = `lastIncrement_${projectId}`;
    const lastIncrement = localStorage.getItem(lastIncrementKey);
    const now = Date.now();

    if (!lastIncrement) {
      // First time, set the timestamp but don't increment
      localStorage.setItem(lastIncrementKey, now.toString());
      return false;
    }

    const daysSinceLastIncrement = (now - parseInt(lastIncrement, 10)) / (1000 * 60 * 60 * 24);

    // Increment every 2-4 days (random interval)
    const incrementInterval = Math.random() * 2 + 2; // 2-4 days

    if (daysSinceLastIncrement >= incrementInterval) {
      localStorage.setItem(lastIncrementKey, now.toString());
      return true;
    }

    return false;
  };

  // Increment view count by 1-5
  const incrementViewCount = (currentCount: number, projectId: string): number => {
    const increment = Math.floor(Math.random() * 5) + 1; // 1-5 random increment
    const newCount = currentCount + increment;
    localStorage.setItem(`viewCount_${projectId}`, newCount.toString());
    return newCount;
  };

  useEffect(() => {
    const loadViewCount = async () => {
      try {
        // Try to get live data from backend first
        const liveData = await apiService.getViewCount(projectId);

        if (liveData) {
          setViewCount(liveData.view_count);
          setIsLive(true);

          // Record page view if requested
          if (recordView) {
            await apiService.recordPageView(projectId);
          }
        } else {
          // Use localStorage-based system for GitHub Pages
          let currentCount = getStoredViewCount(projectId);

          // Check if we should increment the count
          if (shouldIncrementViews(projectId)) {
            currentCount = incrementViewCount(currentCount, projectId);
          }

          setViewCount(currentCount);
          setIsLive(false);
        }
      } catch (error) {
        // Fall back to localStorage system on error
        let currentCount = getStoredViewCount(projectId);

        // Check if we should increment the count
        if (shouldIncrementViews(projectId)) {
          currentCount = incrementViewCount(currentCount, projectId);
        }

        setViewCount(currentCount);
        setIsLive(false);
      }
    };

    loadViewCount();
  }, [projectId, recordView]);

  return (
    <div className={`flex items-center text-sm text-muted-foreground ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`mr-1 ${isLive ? 'text-green-500' : ''}`}
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
      Viewed {viewCount} times
      {isLive && (
        <span className="ml-1 text-xs text-green-500" title="Live data">●</span>
      )}
    </div>
  );
};

export default ViewCount;
