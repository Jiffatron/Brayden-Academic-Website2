// API service for backend communication
// Currently configured for future use - backend not yet deployed

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const BACKEND_ENABLED = import.meta.env.VITE_BACKEND_ENABLED === 'true' || false;

interface ViewCountResponse {
  project_id: string;
  view_count: number;
  unique_visitors: number;
}

interface ReactionResponse {
  project_id: string;
  reactions: Record<string, number>;
  total: number;
}

interface AddReactionResponse {
  success: boolean;
  project_id: string;
  reaction_type: string;
  new_count: number;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Analytics endpoints
  async getViewCount(projectId: string): Promise<ViewCountResponse | null> {
    if (!BACKEND_ENABLED) {
      return null; // Use static data when backend disabled
    }

    try {
      const response = await fetch(`${this.baseUrl}/analytics/views/${projectId}`);
      if (!response.ok) throw new Error('Failed to fetch view count');
      return await response.json();
    } catch (error) {
      console.warn('Backend not available, using static data:', error);
      return null; // Fall back to static data
    }
  }

  async recordPageView(projectId: string): Promise<ViewCountResponse | null> {
    if (!BACKEND_ENABLED) {
      return null; // Don't record when backend disabled
    }

    try {
      const response = await fetch(`${this.baseUrl}/analytics/views/${projectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to record page view');
      return await response.json();
    } catch (error) {
      console.warn('Backend not available, page view not recorded:', error);
      return null;
    }
  }

  async getAnalyticsSummary(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/analytics/summary`);
      if (!response.ok) throw new Error('Failed to fetch analytics summary');
      return await response.json();
    } catch (error) {
      console.warn('Backend not available:', error);
      return null;
    }
  }

  // Reactions endpoints
  async getReactions(projectId: string): Promise<ReactionResponse | null> {
    if (!BACKEND_ENABLED) {
      return null; // Use static data when backend disabled
    }

    try {
      const response = await fetch(`${this.baseUrl}/reactions/${projectId}`);
      if (!response.ok) throw new Error('Failed to fetch reactions');
      return await response.json();
    } catch (error) {
      console.warn('Backend not available, reactions not loaded:', error);
      return null;
    }
  }

  async addReaction(projectId: string, reactionType: string): Promise<AddReactionResponse | null> {
    if (!BACKEND_ENABLED) {
      return null; // Don't record when backend disabled
    }

    try {
      const response = await fetch(`${this.baseUrl}/reactions/${projectId}/${reactionType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to add reaction');
      return await response.json();
    } catch (error) {
      console.warn('Backend not available, reaction not recorded:', error);
      return null;
    }
  }

  async removeReaction(projectId: string, reactionType: string): Promise<AddReactionResponse | null> {
    try {
      const response = await fetch(`${this.baseUrl}/reactions/${projectId}/${reactionType}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to remove reaction');
      return await response.json();
    } catch (error) {
      console.warn('Backend not available, reaction not removed:', error);
      return null;
    }
  }

  // Health check
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
