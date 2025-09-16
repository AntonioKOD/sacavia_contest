'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, TrendingUp, MapPin } from 'lucide-react';
import { contestApi, LeaderboardEntry } from '@/lib/api';

// LeaderboardEntry interface is now imported from lib/api

interface ContestLeaderboardProps {
  limit?: number;
  showTitle?: boolean;
}

export function ContestLeaderboard({ limit = 10, showTitle = true }: ContestLeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data for now - will be replaced with real API calls
  const mockLeaderboard: LeaderboardEntry[] = [
    {
      id: '1',
      title: 'Secret Rooftop Garden in Downtown',
      city: 'Boston',
      upvotesCount: 127,
      author: { username: 'urban_explorer', avatar: '/api/placeholder/40/40' },
      thumbnailUrl: '/api/placeholder/60/60',
      permalink: '/entry/1',
      rank: 1,
      change: 'up'
    },
    {
      id: '2',
      title: 'Underground Speakeasy Bar',
      city: 'New York',
      upvotesCount: 89,
      author: { username: 'nightlife_finder', avatar: '/api/placeholder/40/40' },
      thumbnailUrl: '/api/placeholder/60/60',
      permalink: '/entry/2',
      rank: 2,
      change: 'down'
    },
    {
      id: '3',
      title: 'Abandoned Lighthouse Beach',
      city: 'Miami',
      upvotesCount: 156,
      author: { username: 'beach_discoverer', avatar: '/api/placeholder/40/40' },
      thumbnailUrl: '/api/placeholder/60/60',
      permalink: '/entry/3',
      rank: 3,
      change: 'up'
    },
    {
      id: '4',
      title: 'Hidden Art Gallery in Warehouse',
      city: 'Los Angeles',
      upvotesCount: 203,
      author: { username: 'art_lover', avatar: '/api/placeholder/40/40' },
      thumbnailUrl: '/api/placeholder/60/60',
      permalink: '/entry/4',
      rank: 4,
      change: 'same'
    },
    {
      id: '5',
      title: 'Secret Food Truck Alley',
      city: 'Austin',
      upvotesCount: 94,
      author: { username: 'food_hunter', avatar: '/api/placeholder/40/40' },
      thumbnailUrl: '/api/placeholder/60/60',
      permalink: '/entry/5',
      rank: 5,
      change: 'up'
    }
  ];

  useEffect(() => {
    const loadLeaderboard = async () => {
      setLoading(true);
      try {
        const data = await contestApi.getLeaderboard({ limit });
        setEntries(data.entries);
        setError(null);
      } catch (err) {
        console.error('Failed to load leaderboard:', err);
        setError('Failed to load leaderboard');
        // Fallback to mock data for development
        setEntries(mockLeaderboard.slice(0, limit));
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, [limit]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5" />;
      case 2:
        return <Medal className="w-5 h-5" />;
      case 3:
        return <Award className="w-5 h-5" />;
      default:
        return <span className="text-sm font-bold">{rank}</span>;
    }
  };

  const getRankClass = (rank: number) => {
    switch (rank) {
      case 1:
        return 'leaderboard-rank first';
      case 2:
        return 'leaderboard-rank second';
      case 3:
        return 'leaderboard-rank third';
      default:
        return 'leaderboard-rank other';
    }
  };

  const getChangeIcon = (change?: string) => {
    switch (change) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: limit }).map((_, i) => (
          <div key={i} className="leaderboard-item animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
              </div>
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-xl mb-4">❌ {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="contest-button px-6 py-2 text-lg font-semibold rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <Trophy className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <div className="text-xl text-gray-600 dark:text-gray-400 mb-2">No entries yet</div>
        <div className="text-gray-500 dark:text-gray-500">Contest hasn't started or no submissions yet</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry, index) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="leaderboard-item group"
        >
          <div className="flex items-center space-x-4">
            {/* Rank */}
            <div className={getRankClass(entry.rank)}>
              {getRankIcon(entry.rank)}
            </div>

            {/* Thumbnail */}
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              {entry.thumbnailUrl ? (
                <img
                  src={entry.thumbnailUrl}
                  alt={entry.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <span className="text-primary text-lg">📸</span>
                </div>
              )}
            </div>

            {/* Entry Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors duration-200">
                {entry.title}
              </h3>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="w-4 h-4 mr-1" />
                {entry.city}
                <span className="mx-2">•</span>
                <span>by {entry.author.username}</span>
              </div>
            </div>

            {/* Vote Count & Change */}
            <div className="flex items-center space-x-2">
              {getChangeIcon(entry.change)}
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {entry.upvotesCount}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  votes
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* View Full Leaderboard Link */}
      {limit < 10 && (
        <div className="text-center pt-6">
          <a
            href="/leaderboard"
            className="contest-button-secondary px-6 py-2 text-sm font-semibold rounded-lg inline-flex items-center"
          >
            <Trophy className="w-4 h-4 mr-2" />
            View Full Leaderboard
          </a>
        </div>
      )}
    </div>
  );
}
