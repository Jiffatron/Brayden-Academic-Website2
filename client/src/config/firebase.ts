/**
 * Firebase Configuration
 * 
 * Real backend analytics and data storage for your portfolio.
 * Provides comprehensive tracking while maintaining GitHub Pages compatibility.
 */

import { initializeApp } from 'firebase/app';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getPerformance, Performance } from 'firebase/performance';

// Your Firebase config (replace with your actual config)
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
  measurementId: "G-XXXXXXXXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
let analytics: Analytics | null = null;
let db: Firestore | null = null;
let performance: Performance | null = null;

// Only initialize in browser environment
if (typeof window !== 'undefined') {
  try {
    // Initialize Firestore (always available)
    db = getFirestore(app);

    // Initialize Analytics (check if supported first)
    isSupported().then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
        console.log('🔥 Firebase Analytics initialized');
      } else {
        console.warn('Firebase Analytics not supported in this environment');
      }
    });

    // Initialize Performance Monitoring
    performance = getPerformance(app);
    console.log('🔥 Firebase initialized successfully');
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
  }
}

export { analytics, db, performance };
export default app;
