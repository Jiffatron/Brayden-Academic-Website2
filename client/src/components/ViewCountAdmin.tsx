/**
 * Advanced Admin Panel
 *
 * Comprehensive admin interface for managing all site metrics in development.
 * Only shows in development mode for security.
 *
 * Features:
 * - View count management
 * - Read time analytics
 * - Comment system management
 * - Site performance metrics
 * - Data export/import tools
 */

import { useState, useEffect } from 'react';
import {
  getCurrentViewCount,
  setViewCount,
  resetViewCount,
  getAllViewCounts,
  exportViewCounts,
  PROJECT_IDS,
  BASE_VIEW_COUNTS
} from '@/utils/viewCountManager';
import {
  getAllProjectAnalytics,
  getRecentSessions
} from '@/services/firebaseAnalytics';

// Admin data interfaces
interface ReadTimeData {
  projectId: string;
  averageTime: number;
  totalReads: number;
  lastRead: string;
}

interface CommentData {
  projectId: string;
  totalComments: number;
  pendingModeration: number;
  lastComment: string;
}

interface PerformanceData {
  pageLoadTime: number;
  bundleSize: string;
  lastOptimized: string;
}

const ViewCountAdmin = () => {
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'views' | 'analytics' | 'comments' | 'performance' | 'tools'>('views');
  const [readTimeData, setReadTimeData] = useState<ReadTimeData[]>([]);
  const [commentData, setCommentData] = useState<CommentData[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [firebaseData, setFirebaseData] = useState<any[]>([]);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);

  // Only show in development mode
  if (!import.meta.env.DEV) {
    return null;
  }

  useEffect(() => {
    refreshViewCounts();
    loadAnalyticsData();
    loadCommentData();
    loadPerformanceData();
    loadFirebaseData();
  }, []);

  const refreshViewCounts = () => {
    setViewCounts(getAllViewCounts());
  };

  // Mock analytics data (in real implementation, this would come from localStorage or API)
  const loadAnalyticsData = () => {
    const mockReadTimes: ReadTimeData[] = [
      { projectId: PROJECT_IDS.MONTE_CARLO, averageTime: 847, totalReads: 89, lastRead: '2024-12-30T10:30:00Z' },
      { projectId: PROJECT_IDS.BOND_TRACKER, averageTime: 423, totalReads: 56, lastRead: '2024-12-30T09:15:00Z' },
      { projectId: PROJECT_IDS.MANDELBROT, averageTime: 312, totalReads: 34, lastRead: '2024-12-29T16:45:00Z' },
      { projectId: PROJECT_IDS.BOEING, averageTime: 1205, totalReads: 67, lastRead: '2024-12-30T08:20:00Z' }
    ];
    setReadTimeData(mockReadTimes);
  };

  const loadCommentData = () => {
    const mockComments: CommentData[] = [
      { projectId: PROJECT_IDS.MONTE_CARLO, totalComments: 12, pendingModeration: 2, lastComment: '2024-12-29T14:30:00Z' },
      { projectId: PROJECT_IDS.BOND_TRACKER, totalComments: 8, pendingModeration: 0, lastComment: '2024-12-28T11:20:00Z' },
      { projectId: PROJECT_IDS.MANDELBROT, totalComments: 5, pendingModeration: 1, lastComment: '2024-12-27T09:15:00Z' },
      { projectId: PROJECT_IDS.BOEING, totalComments: 15, pendingModeration: 3, lastComment: '2024-12-30T07:45:00Z' }
    ];
    setCommentData(mockComments);
  };

  const loadPerformanceData = () => {
    const mockPerformance: PerformanceData = {
      pageLoadTime: 1.2,
      bundleSize: '2.4 MB',
      lastOptimized: '2024-12-29T12:00:00Z'
    };
    setPerformanceData(mockPerformance);
  };

  const loadFirebaseData = async () => {
    try {
      const analytics = await getAllProjectAnalytics();
      const sessions = await getRecentSessions(undefined, 20);

      setFirebaseData(analytics);
      setIsFirebaseConnected(true);
      console.log('🔥 Firebase data loaded:', { analytics, sessions });
    } catch (error) {
      console.warn('Firebase not connected, using mock data');
      setIsFirebaseConnected(false);
    }
  };

  const handleSetViewCount = (projectId: string, newCount: number) => {
    setViewCount(projectId, newCount);
    refreshViewCounts();
  };

  const handleResetViewCount = (projectId: string) => {
    resetViewCount(projectId);
    refreshViewCounts();
  };

  // Utility functions for admin actions
  const clearAllComments = () => {
    if (confirm('Are you sure you want to clear ALL comments? This cannot be undone.')) {
      localStorage.removeItem('giscus_comments_backup');
      setCommentData(commentData.map(c => ({ ...c, totalComments: 0, pendingModeration: 0 })));
      console.log('🗑️ All comments cleared');
    }
  };

  const simulateTrafficSpike = () => {
    Object.values(PROJECT_IDS).forEach(projectId => {
      const currentCount = getCurrentViewCount(projectId);
      const spike = Math.floor(Math.random() * 20) + 10; // 10-30 views
      handleSetViewCount(projectId, currentCount + spike);
    });
    console.log('📈 Traffic spike simulated');
  };

  const resetAllAnalytics = () => {
    if (confirm('Reset all analytics data? This will clear view counts, read times, and comments.')) {
      Object.values(PROJECT_IDS).forEach(projectId => {
        resetViewCount(projectId);
      });
      localStorage.clear();
      refreshViewCounts();
      loadAnalyticsData();
      loadCommentData();
      console.log('🔄 All analytics reset');
    }
  };

  const exportAllData = () => {
    const exportData = {
      viewCounts: getAllViewCounts(),
      readTimes: readTimeData,
      comments: commentData,
      performance: performanceData,
      exportDate: new Date().toISOString()
    };
    console.log('📊 Complete Data Export:');
    console.table(exportData);
    console.log('JSON Export:');
    console.log(JSON.stringify(exportData, null, 2));
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const projectNames: Record<string, string> = {
    [PROJECT_IDS.MONTE_CARLO]: 'Monte Carlo Simulation',
    [PROJECT_IDS.BOND_TRACKER]: 'Texas Bond Tracker',
    [PROJECT_IDS.MANDELBROT]: 'Excel Mandelbrot',
    [PROJECT_IDS.BOEING]: 'Boeing Equity Research'
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
          title="Advanced Admin Panel (Dev Only)"
        >
          🚀 Admin Portal
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-600 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600">
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">🚀 Admin Portal</h3>
          <p className="text-xs text-gray-600 dark:text-gray-300">Development Mode Only</p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
        >
          ✕
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
        {[
          { id: 'views', label: '📊 Views', icon: '👁️' },
          { id: 'analytics', label: '📈 Analytics', icon: '⏱️' },
          { id: 'comments', label: '💬 Comments', icon: '🗨️' },
          { id: 'performance', label: '⚡ Performance', icon: '🚀' },
          { id: 'tools', label: '🛠️ Tools', icon: '⚙️' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-2 text-xs font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            {tab.icon} {tab.label.split(' ')[1]}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 max-h-96 overflow-y-auto">

        {/* Views Tab */}
        {activeTab === 'views' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-gray-800 dark:text-white">📊 View Count Management</h4>
              <button
                onClick={simulateTrafficSpike}
                className="px-3 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
              >
                📈 Simulate Spike
              </button>
            </div>

            {Object.entries(PROJECT_IDS).map(([key, projectId]) => (
              <div key={projectId} className="border-b border-gray-200 dark:border-gray-600 pb-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">
                    {projectNames[projectId] || projectId}
                  </span>
                  <span className="text-xs text-gray-500">
                    Base: {BASE_VIEW_COUNTS[projectId as keyof typeof BASE_VIEW_COUNTS]}
                  </span>
                </div>

                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    value={viewCounts[projectId] || 0}
                    onChange={(e) => {
                      const newCount = parseInt(e.target.value, 10) || 0;
                      handleSetViewCount(projectId, newCount);
                    }}
                    className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                    min="0"
                  />

                  <button
                    onClick={() => handleResetViewCount(projectId)}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                    title="Reset to base value"
                  >
                    Reset
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 dark:text-white">📈 Read Time Analytics</h4>

            {readTimeData.map(data => (
              <div key={data.projectId} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-sm">{projectNames[data.projectId]}</span>
                  <span className="text-xs text-gray-500">Last: {formatDate(data.lastRead)}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Avg Read Time:</span>
                    <div className="font-semibold text-blue-600 dark:text-blue-400">
                      {formatTime(data.averageTime)}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Total Reads:</span>
                    <div className="font-semibold text-green-600 dark:text-green-400">
                      {data.totalReads}
                    </div>
                  </div>
                </div>

                <div className="mt-2 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${Math.min((data.averageTime / 1200) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-gray-800 dark:text-white">💬 Comment Management</h4>
              <button
                onClick={clearAllComments}
                className="px-3 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
              >
                🗑️ Clear All
              </button>
            </div>

            {commentData.map(data => (
              <div key={data.projectId} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-sm">{projectNames[data.projectId]}</span>
                  <span className="text-xs text-gray-500">Last: {formatDate(data.lastComment)}</span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Total:</span>
                    <div className="font-semibold text-blue-600 dark:text-blue-400">
                      {data.totalComments}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Pending:</span>
                    <div className={`font-semibold ${data.pendingModeration > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'}`}>
                      {data.pendingModeration}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Approved:</span>
                    <div className="font-semibold text-green-600 dark:text-green-400">
                      {data.totalComments - data.pendingModeration}
                    </div>
                  </div>
                </div>

                {data.pendingModeration > 0 && (
                  <div className="mt-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded text-xs text-orange-700 dark:text-orange-300">
                    ⚠️ {data.pendingModeration} comment(s) need moderation
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && performanceData && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 dark:text-white">⚡ Performance Metrics</h4>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Page Load Time</span>
                  <span className={`text-sm px-2 py-1 rounded ${performanceData.pageLoadTime < 2 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {performanceData.pageLoadTime < 2 ? '🟢 Good' : '🟡 Fair'}
                  </span>
                </div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {performanceData.pageLoadTime}s
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Bundle Size</span>
                  <span className="text-sm px-2 py-1 rounded bg-blue-100 text-blue-700">
                    📦 Optimized
                  </span>
                </div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {performanceData.bundleSize}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Last Optimized:</span>
                <div className="font-medium">{formatDate(performanceData.lastOptimized)}</div>
              </div>
            </div>
          </div>
        )}

        {/* Tools Tab */}
        {activeTab === 'tools' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 dark:text-white">🛠️ Admin Tools</h4>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={exportAllData}
                className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-sm"
              >
                📊 Export All Data
              </button>

              <button
                onClick={resetAllAnalytics}
                className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-sm"
              >
                🔄 Reset All Data
              </button>

              <button
                onClick={() => {
                  localStorage.clear();
                  console.log('🧹 localStorage cleared');
                }}
                className="p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors text-sm"
              >
                🧹 Clear Storage
              </button>

              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-sm"
              >
                🔄 Reload Page
              </button>
            </div>

            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h5 className="font-medium mb-2 text-sm">🔧 Quick Actions</h5>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Total Projects:</span>
                  <span className="font-mono">{Object.keys(PROJECT_IDS).length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Views:</span>
                  <span className="font-mono">{Object.values(viewCounts).reduce((a, b) => a + b, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Views/Project:</span>
                  <span className="font-mono">{Math.round(Object.values(viewCounts).reduce((a, b) => a + b, 0) / Object.keys(PROJECT_IDS).length)}</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-500 text-center mt-4">
              💡 Check browser console for detailed logs
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCountAdmin;
