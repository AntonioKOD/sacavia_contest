'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Calendar, Eye, Trophy } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { LoginToVoteButton } from '@/components/auth/login-to-vote-button';
import { contestApi, ContestEntry } from '@/lib/api';

// ContestEntry interface is now imported from lib/api

interface ContestEntriesGridProps {
  limit?: number;
  showTitle?: boolean;
}

export function ContestEntriesGrid({ limit = 12, showTitle = true }: ContestEntriesGridProps) {
  const [entries, setEntries] = useState<ContestEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [votingStates, setVotingStates] = useState<Record<string, boolean>>({});
  const [upvoteStates, setUpvoteStates] = useState<Record<string, { upvoted: boolean; count: number }>>({});
  
  const { isAuthenticated, user } = useAuth();

  // Mock data for now - will be replaced with real API calls
  const mockEntries: ContestEntry[] = [
    {
      id: '1',
      title: 'Secret Rooftop Garden in Downtown',
      description: 'Hidden oasis with city views and local art installations',
      city: 'Boston',
      thumbnailUrl: '/api/placeholder/400/300',
      permalink: '/entry/1',
      createdAt: '2024-01-15',
      upvotesCount: 127,
      author: { username: 'urban_explorer', avatar: '/api/placeholder/40/40' }
    },
    {
      id: '2',
      title: 'Underground Speakeasy Bar',
      description: '1920s themed bar hidden behind a bookcase',
      city: 'New York',
      thumbnailUrl: '/api/placeholder/400/300',
      permalink: '/entry/2',
      createdAt: '2024-01-14',
      upvotesCount: 89,
      author: { username: 'nightlife_finder', avatar: '/api/placeholder/40/40' }
    },
    {
      id: '3',
      title: 'Abandoned Lighthouse Beach',
      description: 'Secluded beach with historic lighthouse ruins',
      city: 'Miami',
      thumbnailUrl: '/api/placeholder/400/300',
      permalink: '/entry/3',
      createdAt: '2024-01-13',
      upvotesCount: 156,
      author: { username: 'beach_discoverer', avatar: '/api/placeholder/40/40' }
    },
    {
      id: '4',
      title: 'Hidden Art Gallery in Warehouse',
      description: 'Contemporary art space in converted industrial building',
      city: 'Los Angeles',
      thumbnailUrl: '/api/placeholder/400/300',
      permalink: '/entry/4',
      createdAt: '2024-01-12',
      upvotesCount: 203,
      author: { username: 'art_lover', avatar: '/api/placeholder/40/40' }
    },
    {
      id: '5',
      title: 'Secret Food Truck Alley',
      description: 'Hidden collection of gourmet food trucks',
      city: 'Austin',
      thumbnailUrl: '/api/placeholder/400/300',
      permalink: '/entry/5',
      createdAt: '2024-01-11',
      upvotesCount: 94,
      author: { username: 'food_hunter', avatar: '/api/placeholder/40/40' }
    },
    {
      id: '6',
      title: 'Underground Music Venue',
      description: 'Intimate venue for emerging artists',
      city: 'Seattle',
      thumbnailUrl: '/api/placeholder/400/300',
      permalink: '/entry/6',
      createdAt: '2024-01-10',
      upvotesCount: 178,
      author: { username: 'music_explorer', avatar: '/api/placeholder/40/40' }
    }
  ];

  useEffect(() => {
    const loadEntries = async () => {
      setLoading(true);
      try {
        const data = await contestApi.getEntries({ limit });
        setEntries(data.entries);
        setError(null);
      } catch (err) {
        console.error('Failed to load entries:', err);
        setError('Failed to load entries');
        // Fallback to mock data for development
        setEntries(mockEntries.slice(0, limit));
      } finally {
        setLoading(false);
      }
    };

    loadEntries();
  }, [limit]);

  const handleVote = async (entryId: string) => {
    if (!isAuthenticated || !user?.id) {
      return;
    }

    try {
      setVotingStates(prev => ({ ...prev, [entryId]: true }));

      // Call real API
      const response = await contestApi.upvoteEntry(entryId, user.id);

      if (response.success) {
        // Update local state
        setUpvoteStates(prev => ({
          ...prev,
          [entryId]: {
            upvoted: response.upvoted,
            count: response.upvotesCount,
          }
        }));

        // Update entry in the list
        setEntries(prev => prev.map(entry =>
          entry.id === entryId
            ? { ...entry, upvotesCount: response.upvotesCount }
            : entry
        ));
      } else {
        console.error('Voting failed:', response.error);
      }

    } catch (error) {
      console.error('Voting failed:', error);
    } finally {
      setVotingStates(prev => ({ ...prev, [entryId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: limit }).map((_, i) => (
          <div key={i} className="entry-card animate-pulse">
            <div className="w-full h-48 bg-gray-300 dark:bg-gray-600 rounded-t-xl"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
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
        <div className="text-gray-500 dark:text-gray-500">Be the first to submit a hidden gem!</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {entries.map((entry, index) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group cursor-pointer"
        >
          {/* Image */}
          <div className="relative mb-4">
            {entry.thumbnailUrl ? (
              <img
                src={entry.thumbnailUrl}
                alt={entry.title}
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                <div className="text-gray-400 text-4xl">📸</div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors duration-200">
              {entry.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {entry.description}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {entry.city}
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                {upvoteStates[entry.id]?.count ?? entry.upvotesCount}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <a
                href={entry.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                View Details
              </a>
              
              {isAuthenticated ? (
                <button
                  onClick={() => handleVote(entry.id)}
                  disabled={votingStates[entry.id]}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    upvoteStates[entry.id]?.upvoted 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {votingStates[entry.id] ? 'Voting...' : upvoteStates[entry.id]?.upvoted ? 'Voted' : 'Vote'}
                </button>
              ) : (
                <LoginToVoteButton variant="outline" size="sm">
                  Vote
                </LoginToVoteButton>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
