import axios from 'axios';

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sacavia.com/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Contest types
export interface Contest {
  id: string;
  title: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  prize: string;
  participants: number;
  status: 'active' | 'upcoming' | 'ended';
  image?: string;
  rules?: string[];
  maxParticipants?: number;
}

export interface ContestEntry {
  id: string;
  contestId: string;
  userId: string;
  title: string;
  description: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  votes: number;
  createdAt: string;
  user: {
    id: string;
    username: string;
    avatar?: string;
  };
}

export interface Vote {
  id: string;
  entryId: string;
  userId: string;
  createdAt: string;
}

// Contest API functions
export const contestApi = {
  // Get all contests
  async getContests(): Promise<Contest[]> {
    try {
      const response = await apiClient.get('/contests');
      return response.data;
    } catch (error) {
      console.error('Error fetching contests:', error);
      throw error;
    }
  },

  // Get contest by ID
  async getContest(id: string): Promise<Contest> {
    try {
      const response = await apiClient.get(`/contests/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching contest:', error);
      throw error;
    }
  },

  // Get contest entries
  async getContestEntries(contestId: string): Promise<ContestEntry[]> {
    try {
      const response = await apiClient.get(`/contests/${contestId}/entries`);
      return response.data;
    } catch (error) {
      console.error('Error fetching contest entries:', error);
      throw error;
    }
  },

  // Submit contest entry
  async submitEntry(contestId: string, entryData: {
    title: string;
    description: string;
    mediaUrl: string;
    mediaType: 'image' | 'video';
  }): Promise<ContestEntry> {
    try {
      const response = await apiClient.post(`/contests/${contestId}/entries`, entryData);
      return response.data;
    } catch (error) {
      console.error('Error submitting entry:', error);
      throw error;
    }
  },

  // Vote for an entry
  async voteForEntry(entryId: string): Promise<Vote> {
    try {
      const response = await apiClient.post(`/entries/${entryId}/vote`);
      return response.data;
    } catch (error) {
      console.error('Error voting for entry:', error);
      throw error;
    }
  },

  // Remove vote from an entry
  async removeVote(entryId: string): Promise<void> {
    try {
      await apiClient.delete(`/entries/${entryId}/vote`);
    } catch (error) {
      console.error('Error removing vote:', error);
      throw error;
    }
  },

  // Get user's contest entries
  async getUserEntries(): Promise<ContestEntry[]> {
    try {
      const response = await apiClient.get('/user/entries');
      return response.data;
    } catch (error) {
      console.error('Error fetching user entries:', error);
      throw error;
    }
  },

  // Get user's votes
  async getUserVotes(): Promise<Vote[]> {
    try {
      const response = await apiClient.get('/user/votes');
      return response.data;
    } catch (error) {
      console.error('Error fetching user votes:', error);
      throw error;
    }
  },
};

// User authentication functions
export const authApi = {
  // Login user
  async login(credentials: { email: string; password: string }): Promise<{ token: string; user: any }> {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      return { token, user };
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Logout user
  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Error logging out:', error);
      // Still remove token even if API call fails
      localStorage.removeItem('authToken');
    }
  },

  // Get current user
  async getCurrentUser(): Promise<any> {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  },
};

export default apiClient;
