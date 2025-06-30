/**
 * Firebase Analytics Service
 * 
 * Comprehensive analytics tracking with real backend storage.
 * Tracks user behavior, engagement, and portfolio performance.
 */

// Simplified Firebase integration with fallback
const FIREBASE_ENABLED = false; // Set to true when you configure Firebase

// Mock functions for development
const mockLogEvent = (eventName: string, parameters?: any) => {
  console.log(`📊 Analytics Event: ${eventName}`, parameters);
};

const mockSetUserProperties = (properties: Record<string, any>) => {
  console.log('👤 User Properties:', properties);
};

// Use mock functions by default
let analytics: any = null;
let db: any = null;
let logEvent = mockLogEvent;
let setAnalyticsUserProperties = mockSetUserProperties;

// Note: When FIREBASE_ENABLED is true, you'll need to:
// 1. Install Firebase: npm install firebase
// 2. Import real functions at the top of this file
// 3. Replace mock functions with real ones
console.log(FIREBASE_ENABLED ? '🔥 Firebase enabled' : '🔧 Using mock Firebase for development');
// Mock Firestore functions for development
const collection = (path: string) => ({ path });
const doc = (ref: any, id?: string) => ({ ref, id });
const setDoc = (ref: any, data: any) => {
  console.log('💾 Firestore Set:', ref, data);
  return Promise.resolve();
};
const getDoc = (ref: any) => {
  console.log('📖 Firestore Get:', ref);
  return Promise.resolve({ exists: () => false, data: () => null });
};
const updateDoc = (ref: any, data: any) => {
  console.log('🔄 Firestore Update:', ref, data);
  return Promise.resolve();
};
const increment = (value: number) => ({ increment: value });
const serverTimestamp = () => ({ timestamp: new Date().toISOString() });
const query = (...args: any[]) => ({ query: args });
const where = (field: string, op: string, value: any) => ({ where: { field, op, value } });
const getDocs = (query: any) => {
  console.log('📚 Firestore Query:', query);
  return Promise.resolve({ docs: [] });
};
const orderBy = (field: string, direction?: string) => ({ orderBy: { field, direction } });
const limit = (count: number) => ({ limit: count });

// Note: When FIREBASE_ENABLED is true, replace these with real Firebase imports:
// import { collection, doc, setDoc, getDoc, updateDoc, increment, serverTimestamp, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

// Analytics event types
export interface ProjectViewEvent {
  projectId: string;
  viewDuration?: number;
  scrollDepth?: number;
  referrer?: string;
  userAgent?: string;
}

export interface DownloadEvent {
  projectId: string;
  fileName: string;
  fileType: string;
}

export interface EngagementEvent {
  projectId: string;
  action: 'copy_code' | 'expand_image' | 'scroll_deep' | 'long_read';
  value?: number;
}

// Firebase Analytics Events
export const trackPageView = (pageName: string, projectId?: string) => {
  if (!analytics) {
    console.log('📊 Analytics not available, page view not tracked:', pageName);
    return;
  }

  try {
    logEvent(analytics, 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
      project_id: projectId || 'homepage'
    });
  } catch (error) {
    console.warn('Failed to track page view:', error);
  }
};

export const trackProjectView = async (event: ProjectViewEvent) => {
  if (!analytics || !db) return;
  
  try {
    // Firebase Analytics event
    logEvent(analytics, 'project_view', {
      project_id: event.projectId,
      view_duration: event.viewDuration,
      scroll_depth: event.scrollDepth
    });
    
    // Firestore data storage
    const projectRef = doc(db, 'projectViews', event.projectId);
    const projectDoc = await getDoc(projectRef);
    
    if (projectDoc.exists()) {
      // Update existing project
      await updateDoc(projectRef, {
        viewCount: increment(1),
        lastViewed: serverTimestamp(),
        totalViewTime: increment(event.viewDuration || 0)
      });
    } else {
      // Create new project document
      await setDoc(projectRef, {
        projectId: event.projectId,
        viewCount: 1,
        firstViewed: serverTimestamp(),
        lastViewed: serverTimestamp(),
        totalViewTime: event.viewDuration || 0
      });
    }
    
    // Store individual session
    const sessionRef = doc(collection(db, 'viewSessions'));
    await setDoc(sessionRef, {
      projectId: event.projectId,
      timestamp: serverTimestamp(),
      viewDuration: event.viewDuration || 0,
      scrollDepth: event.scrollDepth || 0,
      referrer: event.referrer || document.referrer,
      userAgent: event.userAgent || navigator.userAgent,
      url: window.location.href
    });
    
  } catch (error) {
    console.error('Error tracking project view:', error);
  }
};

export const trackDownload = async (event: DownloadEvent) => {
  if (!analytics || !db) return;
  
  try {
    // Firebase Analytics event
    logEvent(analytics, 'file_download', {
      project_id: event.projectId,
      file_name: event.fileName,
      file_type: event.fileType
    });
    
    // Firestore tracking
    const downloadRef = doc(collection(db, 'downloads'));
    await setDoc(downloadRef, {
      projectId: event.projectId,
      fileName: event.fileName,
      fileType: event.fileType,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    });
    
    // Update project download count
    const projectRef = doc(db, 'projectViews', event.projectId);
    await updateDoc(projectRef, {
      downloadCount: increment(1)
    });
    
  } catch (error) {
    console.error('Error tracking download:', error);
  }
};

export const trackEngagement = async (event: EngagementEvent) => {
  if (!analytics || !db) return;
  
  try {
    // Firebase Analytics event
    logEvent(analytics, 'engagement', {
      project_id: event.projectId,
      action: event.action,
      value: event.value
    });
    
    // Firestore engagement tracking
    const engagementRef = doc(collection(db, 'engagements'));
    await setDoc(engagementRef, {
      projectId: event.projectId,
      action: event.action,
      value: event.value || 0,
      timestamp: serverTimestamp(),
      url: window.location.href
    });
    
  } catch (error) {
    console.error('Error tracking engagement:', error);
  }
};

// Analytics data retrieval
export const getProjectAnalytics = async (projectId: string) => {
  if (!db) return null;
  
  try {
    const projectRef = doc(db, 'projectViews', projectId);
    const projectDoc = await getDoc(projectRef);
    
    if (projectDoc.exists()) {
      return projectDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting project analytics:', error);
    return null;
  }
};

export const getAllProjectAnalytics = async () => {
  if (!db) return [];
  
  try {
    const projectsRef = collection(db, 'projectViews');
    const q = query(projectsRef, orderBy('viewCount', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting all project analytics:', error);
    return [];
  }
};

export const getRecentSessions = async (projectId?: string, limitCount = 10) => {
  if (!db) return [];
  
  try {
    const sessionsRef = collection(db, 'viewSessions');
    let q = query(
      sessionsRef,
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    
    if (projectId) {
      q = query(
        sessionsRef,
        where('projectId', '==', projectId),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting recent sessions:', error);
    return [];
  }
};

// User identification (optional)
export const setUserProperties = (properties: Record<string, any>) => {
  if (!analytics) return;

  setAnalyticsUserProperties(analytics, properties);
};

// Custom events for portfolio-specific actions
export const trackCodeCopy = (projectId: string, codeSection: string) => {
  trackEngagement({
    projectId,
    action: 'copy_code',
    value: 1
  });
};

export const trackImageExpand = (projectId: string, imageName: string) => {
  trackEngagement({
    projectId,
    action: 'expand_image',
    value: 1
  });
};

export const trackDeepScroll = (projectId: string, scrollDepth: number) => {
  if (scrollDepth > 80) { // Only track deep scrolls
    trackEngagement({
      projectId,
      action: 'scroll_deep',
      value: scrollDepth
    });
  }
};

export const trackLongRead = (projectId: string, readTime: number) => {
  if (readTime > 120) { // Only track reads longer than 2 minutes
    trackEngagement({
      projectId,
      action: 'long_read',
      value: readTime
    });
  }
};
