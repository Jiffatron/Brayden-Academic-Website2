/**
 * Advanced Analytics Manager
 * 
 * Comprehensive analytics system for tracking user engagement,
 * read times, scroll behavior, and other metrics.
 * All data stored in localStorage for GitHub Pages compatibility.
 */

import { PROJECT_IDS } from './viewCountManager';

// Analytics data interfaces
export interface ReadTimeData {
  projectId: string;
  averageTime: number;
  totalReads: number;
  lastRead: string;
  sessions: ReadSession[];
}

export interface ReadSession {
  startTime: number;
  endTime: number;
  duration: number;
  scrollDepth: number;
  date: string;
}

export interface ScrollAnalytics {
  projectId: string;
  averageScrollDepth: number;
  maxScrollDepth: number;
  bounceRate: number;
  engagementScore: number;
}

export interface UserEngagement {
  totalVisits: number;
  uniqueVisits: number;
  returningVisitor: boolean;
  firstVisit: string;
  lastVisit: string;
  favoriteProject: string;
}

// Read time tracking
export const startReadSession = (projectId: string): void => {
  const sessionData = {
    projectId,
    startTime: Date.now(),
    scrollDepth: 0,
    date: new Date().toISOString()
  };
  
  sessionStorage.setItem('currentReadSession', JSON.stringify(sessionData));
};

export const updateScrollDepth = (depth: number): void => {
  const session = sessionStorage.getItem('currentReadSession');
  if (session) {
    const sessionData = JSON.parse(session);
    sessionData.scrollDepth = Math.max(sessionData.scrollDepth, depth);
    sessionStorage.setItem('currentReadSession', JSON.stringify(sessionData));
  }
};

export const endReadSession = (): void => {
  const session = sessionStorage.getItem('currentReadSession');
  if (!session) return;
  
  const sessionData = JSON.parse(session);
  const endTime = Date.now();
  const duration = Math.round((endTime - sessionData.startTime) / 1000); // seconds
  
  // Only record sessions longer than 10 seconds
  if (duration > 10) {
    const readSession: ReadSession = {
      startTime: sessionData.startTime,
      endTime,
      duration,
      scrollDepth: sessionData.scrollDepth,
      date: sessionData.date
    };
    
    saveReadSession(sessionData.projectId, readSession);
  }
  
  sessionStorage.removeItem('currentReadSession');
};

const saveReadSession = (projectId: string, session: ReadSession): void => {
  const key = `readSessions_${projectId}`;
  const existing = localStorage.getItem(key);
  const sessions = existing ? JSON.parse(existing) : [];
  
  sessions.push(session);
  
  // Keep only last 100 sessions per project
  if (sessions.length > 100) {
    sessions.splice(0, sessions.length - 100);
  }
  
  localStorage.setItem(key, JSON.stringify(sessions));
};

// Analytics calculations
export const getReadTimeData = (projectId: string): ReadTimeData => {
  const key = `readSessions_${projectId}`;
  const sessions: ReadSession[] = JSON.parse(localStorage.getItem(key) || '[]');
  
  if (sessions.length === 0) {
    return {
      projectId,
      averageTime: 0,
      totalReads: 0,
      lastRead: new Date().toISOString(),
      sessions: []
    };
  }
  
  const totalTime = sessions.reduce((sum, session) => sum + session.duration, 0);
  const averageTime = Math.round(totalTime / sessions.length);
  const lastRead = sessions[sessions.length - 1]?.date || new Date().toISOString();
  
  return {
    projectId,
    averageTime,
    totalReads: sessions.length,
    lastRead,
    sessions: sessions.slice(-10) // Last 10 sessions
  };
};

export const getScrollAnalytics = (projectId: string): ScrollAnalytics => {
  const readData = getReadTimeData(projectId);
  const sessions = readData.sessions;
  
  if (sessions.length === 0) {
    return {
      projectId,
      averageScrollDepth: 0,
      maxScrollDepth: 0,
      bounceRate: 0,
      engagementScore: 0
    };
  }
  
  const scrollDepths = sessions.map(s => s.scrollDepth);
  const averageScrollDepth = Math.round(
    scrollDepths.reduce((sum, depth) => sum + depth, 0) / scrollDepths.length
  );
  const maxScrollDepth = Math.max(...scrollDepths);
  
  // Bounce rate: sessions with < 30% scroll depth and < 30 seconds
  const bounces = sessions.filter(s => s.scrollDepth < 30 && s.duration < 30).length;
  const bounceRate = Math.round((bounces / sessions.length) * 100);
  
  // Engagement score: combination of time and scroll depth
  const engagementScore = Math.min(100, Math.round(
    (averageScrollDepth * 0.4) + (Math.min(readData.averageTime / 10, 60) * 0.6)
  ));
  
  return {
    projectId,
    averageScrollDepth,
    maxScrollDepth,
    bounceRate,
    engagementScore
  };
};

export const getUserEngagement = (): UserEngagement => {
  const visits = JSON.parse(localStorage.getItem('userVisits') || '[]');
  const projectViews = JSON.parse(localStorage.getItem('projectViews') || '{}');
  
  // Find favorite project
  const favoriteProject = Object.entries(projectViews).reduce((a, b) => 
    projectViews[a[0]] > projectViews[b[0]] ? a : b
  )?.[0] || Object.values(PROJECT_IDS)[0];
  
  return {
    totalVisits: visits.length,
    uniqueVisits: new Set(visits.map((v: any) => v.date.split('T')[0])).size,
    returningVisitor: visits.length > 1,
    firstVisit: visits[0]?.date || new Date().toISOString(),
    lastVisit: visits[visits.length - 1]?.date || new Date().toISOString(),
    favoriteProject
  };
};

// Utility functions for admin
export const getAllAnalytics = () => {
  const analytics = {
    readTimes: {} as Record<string, ReadTimeData>,
    scrollData: {} as Record<string, ScrollAnalytics>,
    userEngagement: getUserEngagement()
  };
  
  Object.values(PROJECT_IDS).forEach(projectId => {
    analytics.readTimes[projectId] = getReadTimeData(projectId);
    analytics.scrollData[projectId] = getScrollAnalytics(projectId);
  });
  
  return analytics;
};

export const clearAnalyticsData = (projectId?: string): void => {
  if (projectId) {
    localStorage.removeItem(`readSessions_${projectId}`);
    console.log(`🗑️ Cleared analytics for ${projectId}`);
  } else {
    Object.values(PROJECT_IDS).forEach(id => {
      localStorage.removeItem(`readSessions_${id}`);
    });
    localStorage.removeItem('userVisits');
    localStorage.removeItem('projectViews');
    console.log('🗑️ Cleared all analytics data');
  }
};

export const exportAnalyticsData = (): void => {
  const data = getAllAnalytics();
  console.log('📊 Analytics Export:');
  console.table(data);
  console.log('JSON Export:');
  console.log(JSON.stringify(data, null, 2));
};

// Initialize analytics tracking
export const initializeAnalytics = (): void => {
  // Track page visit
  const visits = JSON.parse(localStorage.getItem('userVisits') || '[]');
  visits.push({
    date: new Date().toISOString(),
    userAgent: navigator.userAgent,
    referrer: document.referrer
  });
  localStorage.setItem('userVisits', JSON.stringify(visits.slice(-50))); // Keep last 50 visits
  
  // Track page unload
  window.addEventListener('beforeunload', endReadSession);
  
  // Track scroll depth
  let maxScroll = 0;
  const trackScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    maxScroll = Math.max(maxScroll, scrollPercent);
    updateScrollDepth(maxScroll);
  };
  
  window.addEventListener('scroll', trackScroll, { passive: true });
};

// Development helpers
if (import.meta.env.DEV) {
  (window as any).analyticsManager = {
    startReadSession,
    endReadSession,
    getReadTimeData,
    getScrollAnalytics,
    getUserEngagement,
    getAllAnalytics,
    clearAnalyticsData,
    exportAnalyticsData,
    initializeAnalytics
  };
  
  console.log('📊 Analytics Manager available in development mode');
}
