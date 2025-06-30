/**
 * Utility functions for reliable navigation and scrolling
 */

/**
 * Scrolls to an element with retry logic for better reliability
 */
export const scrollToElementWithRetry = (
  elementId: string, 
  maxRetries: number = 5, 
  retryDelay: number = 100
): Promise<boolean> => {
  return new Promise((resolve) => {
    let attempts = 0;
    
    const attemptScroll = () => {
      const element = document.getElementById(elementId);
      
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        resolve(true);
        return;
      }
      
      attempts++;
      if (attempts < maxRetries) {
        setTimeout(attemptScroll, retryDelay);
      } else {
        console.warn(`Failed to find element with ID: ${elementId} after ${maxRetries} attempts`);
        resolve(false);
      }
    };
    
    attemptScroll();
  });
};

/**
 * Navigates to home page and scrolls to section with proper timing
 */
export const navigateAndScroll = (
  navigate: (path: string) => void,
  sectionId: string,
  currentPath: string
): void => {
  if (currentPath !== "/") {
    // Navigate to home first
    navigate("/");
    
    // Wait for navigation and DOM to be ready, then scroll
    setTimeout(() => {
      scrollToElementWithRetry(sectionId, 10, 100);
    }, 600); // Increased delay for better reliability
  } else {
    // Already on home page, just scroll
    scrollToElementWithRetry(sectionId);
  }
};

/**
 * Checks if an element exists in the DOM
 */
export const elementExists = (elementId: string): boolean => {
  return document.getElementById(elementId) !== null;
};

/**
 * Waits for an element to appear in the DOM
 */
export const waitForElement = (
  elementId: string, 
  timeout: number = 5000
): Promise<HTMLElement | null> => {
  return new Promise((resolve) => {
    const element = document.getElementById(elementId);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const element = document.getElementById(elementId);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Timeout fallback
    setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, timeout);
  });
};
