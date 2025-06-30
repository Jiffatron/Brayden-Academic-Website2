/**
 * Firebase Development Configuration
 * 
 * Simplified Firebase setup for development and testing.
 * Falls back gracefully when Firebase is not configured.
 */

// Mock Firebase services for development
export const mockAnalytics = {
  logEvent: (eventName: string, parameters?: any) => {
    console.log(`📊 Mock Analytics Event: ${eventName}`, parameters);
  }
};

export const mockFirestore = {
  collection: (path: string) => ({
    doc: (id?: string) => ({
      set: (data: any) => {
        console.log(`💾 Mock Firestore Set: ${path}/${id}`, data);
        return Promise.resolve();
      },
      get: () => {
        console.log(`📖 Mock Firestore Get: ${path}/${id}`);
        return Promise.resolve({
          exists: () => false,
          data: () => null
        });
      },
      update: (data: any) => {
        console.log(`🔄 Mock Firestore Update: ${path}/${id}`, data);
        return Promise.resolve();
      }
    }),
    add: (data: any) => {
      console.log(`➕ Mock Firestore Add: ${path}`, data);
      return Promise.resolve({ id: 'mock-doc-id' });
    },
    where: () => ({ orderBy: () => ({ limit: () => ({ get: () => Promise.resolve({ docs: [] }) }) }) }),
    orderBy: () => ({ limit: () => ({ get: () => Promise.resolve({ docs: [] }) }) }),
    get: () => Promise.resolve({ docs: [] })
  })
};

// Check if Firebase is properly configured
const isFirebaseConfigured = () => {
  try {
    // This will be true when you add your real Firebase config
    const hasConfig = process.env.VITE_FIREBASE_API_KEY || 
                     import.meta.env.VITE_FIREBASE_API_KEY ||
                     false;
    return !!hasConfig;
  } catch {
    return false;
  }
};

// Export appropriate services
export const analytics = isFirebaseConfigured() ? null : mockAnalytics;
export const db = isFirebaseConfigured() ? null : mockFirestore;
export const isFirebaseEnabled = isFirebaseConfigured();

console.log(isFirebaseEnabled ? 
  '🔥 Firebase enabled' : 
  '🔧 Using mock Firebase services for development'
);
