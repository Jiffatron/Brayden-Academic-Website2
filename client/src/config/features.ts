/**
 * Feature Configuration
 * 
 * Central configuration for enabling/disabling various features
 * across the portfolio website.
 */

export interface FeatureConfig {
  // Homepage features
  homepageTableOfContents: boolean;
  homepageTocStartsMinimized: boolean;

  // Analytics features
  firebaseAnalytics: boolean;
  
  // Development features
  adminPortal: boolean;
  seoTester: boolean;
  
  // Future features (for easy expansion)
  darkModeToggle: boolean;
  stockTicker: boolean;
  blogComments: boolean;
}

// Main feature configuration
export const FEATURES: FeatureConfig = {
  // Homepage Table of Contents
  homepageTableOfContents: true, // Set to false to disable TOC
  homepageTocStartsMinimized: true, // Set to false to start expanded

  // Analytics
  firebaseAnalytics: false, // Set to true when Firebase is configured
  
  // Development tools (automatically disabled in production)
  adminPortal: import.meta.env.DEV, // Only in development
  seoTester: import.meta.env.DEV,   // Only in development
  
  // UI features
  darkModeToggle: true,
  stockTicker: true,
  blogComments: true,
};

// Helper functions for feature checks
export const isFeatureEnabled = (feature: keyof FeatureConfig): boolean => {
  return FEATURES[feature];
};

export const getFeatureConfig = (): FeatureConfig => {
  return { ...FEATURES };
};

// Development helpers
if (import.meta.env.DEV) {
  // Make features available in development console
  (window as any).features = {
    config: FEATURES,
    isEnabled: isFeatureEnabled,
    getConfig: getFeatureConfig,
    
    // Quick toggles for development
    enableTOC: () => { FEATURES.homepageTableOfContents = true; },
    disableTOC: () => { FEATURES.homepageTableOfContents = false; },
    tocStartMinimized: () => { FEATURES.homepageTocStartsMinimized = true; },
    tocStartExpanded: () => { FEATURES.homepageTocStartsMinimized = false; },
    enableFirebase: () => { FEATURES.firebaseAnalytics = true; },
    disableFirebase: () => { FEATURES.firebaseAnalytics = false; },
  };
  
  console.log('🎛️ Feature configuration available in development mode');
  console.log('Use window.features to access feature controls');
  console.log('Example: features.disableTOC() to disable table of contents');
}
