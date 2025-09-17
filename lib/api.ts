import axios from 'axios'

// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://www.sacavia.com/api'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies for authentication
})

// Types
export interface ContestEntry {
  id: string
  title: string
  description: string
  city: string
  thumbnailUrl?: string
  permalink: string
  createdAt: string
  upvotesCount: number
  author: {
    username: string
    avatar?: string
  }
}

export interface LeaderboardEntry {
  id: string
  title: string
  city: string
  upvotesCount: number
  author: {
    username: string
    avatar?: string
  }
  thumbnailUrl?: string
  permalink: string
  rank: number
  change?: 'up' | 'down' | 'same'
}

export interface ContestStats {
  totalEntries: number
  totalVotes: number
  totalParticipants: number
  topCity: {
    name: string
    entries: number
  }
  recentActivity: {
    entriesLast24h: number
    votesLast24h: number
  }
  prizePool: {
    total: number
    grandPrize: number
    cityWinners: number
    categoryWinners: number
  }
  contestStatus: {
    isActive: boolean
    startDate: string
    endDate: string
    daysRemaining: number
  }
}

export interface UpvoteResponse {
  success: boolean
  upvoted: boolean
  upvotesCount: number
  message?: string
  error?: string
}

// API Functions
export const contestApi = {
  // Get contest entries
  async getEntries(params?: {
    limit?: number
    cursor?: string
    city?: string
    q?: string
  }): Promise<{ entries: ContestEntry[]; nextCursor?: string }> {
    try {
      const response = await api.get('/contest/entries', { params })
      return response.data
    } catch (error) {
      console.error('Error fetching contest entries:', error)
      throw new Error('Failed to fetch contest entries')
    }
  },

  // Get leaderboard
  async getLeaderboard(params?: {
    limit?: number
    city?: string
    timeframe?: 'all' | 'week' | 'month'
  }): Promise<{ entries: LeaderboardEntry[]; totalEntries: number; lastUpdated: string }> {
    try {
      const response = await api.get('/contest/leaderboard', { params })
      return response.data
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
      throw new Error('Failed to fetch leaderboard')
    }
  },

  // Get contest statistics
  async getStats(): Promise<ContestStats> {
    try {
      const response = await api.get('/contest/stats')
      return response.data
    } catch (error) {
      console.error('Error fetching contest stats:', error)
      throw new Error('Failed to fetch contest statistics')
    }
  },

  // Upvote an entry
  async upvoteEntry(experienceId: string): Promise<UpvoteResponse> {
    try {
      const response = await api.post('/contest/upvote', {
        experienceId,
      })
      return response.data
    } catch (error) {
      console.error('Error upvoting entry:', error)
      throw new Error('Failed to upvote entry')
    }
  },

  // Check upvote status
  async getUpvoteStatus(experienceId: string): Promise<{
    success: boolean
    experienceId: string
    upvotesCount: number
    userUpvoted: boolean
    message: string
  }> {
    try {
      const response = await api.get('/contest/upvote', {
        params: { experienceId },
      })
      return response.data
    } catch (error) {
      console.error('Error checking upvote status:', error)
      throw new Error('Failed to check upvote status')
    }
  },
}

export default contestApi

