/**
 * View Count Management Utility
 * 
 * This utility helps you manually manage view counts for your projects.
 * Since GitHub Pages doesn't support backend functionality, view counts are stored
 * in localStorage and automatically increment every few days.
 */

// Project ID mapping for easy reference
export const PROJECT_IDS = {
  MONTE_CARLO: 'PythonMonteCarloBasic',
  BOND_TRACKER: 'BondTracker', 
  MANDELBROT: 'mandelbrot-excel',
  BOEING: 'boeing'
} as const;

// Base view counts (you can update these anytime)
export const BASE_VIEW_COUNTS = {
  [PROJECT_IDS.MONTE_CARLO]: 127,  // Monte Carlo project
  [PROJECT_IDS.BOND_TRACKER]: 89,  // Bond Tracker project  
  [PROJECT_IDS.MANDELBROT]: 64,    // Excel Mandelbrot project
  [PROJECT_IDS.BOEING]: 43,        // Boeing equity research
} as const;

/**
 * Get current view count for a project
 */
export const getCurrentViewCount = (projectId: string): number => {
  const stored = localStorage.getItem(`viewCount_${projectId}`);
  if (stored) {
    return parseInt(stored, 10);
  }
  return BASE_VIEW_COUNTS[projectId as keyof typeof BASE_VIEW_COUNTS] || 0;
};

/**
 * Set view count for a project (manual override)
 */
export const setViewCount = (projectId: string, count: number): void => {
  localStorage.setItem(`viewCount_${projectId}`, count.toString());
  console.log(`✅ Set view count for ${projectId} to ${count}`);
};

/**
 * Reset view count to base value
 */
export const resetViewCount = (projectId: string): void => {
  const baseCount = BASE_VIEW_COUNTS[projectId as keyof typeof BASE_VIEW_COUNTS];
  if (baseCount) {
    localStorage.setItem(`viewCount_${projectId}`, baseCount.toString());
    console.log(`🔄 Reset view count for ${projectId} to base value: ${baseCount}`);
  } else {
    console.warn(`⚠️ No base count found for project: ${projectId}`);
  }
};

/**
 * Reset increment timer (force next increment)
 */
export const resetIncrementTimer = (projectId: string): void => {
  localStorage.removeItem(`lastIncrement_${projectId}`);
  console.log(`⏰ Reset increment timer for ${projectId}`);
};

/**
 * Get all view counts
 */
export const getAllViewCounts = (): Record<string, number> => {
  const counts: Record<string, number> = {};
  
  Object.values(PROJECT_IDS).forEach(projectId => {
    counts[projectId] = getCurrentViewCount(projectId);
  });
  
  return counts;
};

/**
 * Clear all view count data
 */
export const clearAllViewCounts = (): void => {
  Object.values(PROJECT_IDS).forEach(projectId => {
    localStorage.removeItem(`viewCount_${projectId}`);
    localStorage.removeItem(`lastIncrement_${projectId}`);
  });
  console.log('🗑️ Cleared all view count data');
};

/**
 * Export view counts to console (for backup)
 */
export const exportViewCounts = (): void => {
  const counts = getAllViewCounts();
  console.log('📊 Current View Counts:');
  console.table(counts);
  
  // Also log as JSON for easy copying
  console.log('JSON format for backup:');
  console.log(JSON.stringify(counts, null, 2));
};

/**
 * Import view counts from backup
 */
export const importViewCounts = (counts: Record<string, number>): void => {
  Object.entries(counts).forEach(([projectId, count]) => {
    setViewCount(projectId, count);
  });
  console.log('📥 Imported view counts successfully');
};

// Development helper functions (only available in development)
if (import.meta.env.DEV) {
  // Make functions available globally in development
  (window as any).viewCountManager = {
    getCurrentViewCount,
    setViewCount,
    resetViewCount,
    resetIncrementTimer,
    getAllViewCounts,
    clearAllViewCounts,
    exportViewCounts,
    importViewCounts,
    PROJECT_IDS,
    BASE_VIEW_COUNTS
  };
  
  console.log('🛠️ View Count Manager available in development mode');
  console.log('Use window.viewCountManager to access functions');
  console.log('Example: viewCountManager.setViewCount("PythonMonteCarloBasic", 150)');
}
