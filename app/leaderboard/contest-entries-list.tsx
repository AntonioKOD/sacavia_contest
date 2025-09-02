'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchEntries, CoreContestEntry, upvoteExperience, checkUpvoteStatus } from '@/lib/core';
import { LoginToVoteButton } from '@/components/auth/login-to-vote-button';
import { useAuth } from '@/hooks/use-auth';
import { Trophy, MapPin, Calendar, Eye, Heart } from 'lucide-react';

interface ContestEntriesListProps {
  initialCursor?: string;
  initialLimit: number;
  initialCity?: string;
  initialQuery?: string;
}

export function ContestEntriesList({
  initialCursor,
  initialLimit,
  initialCity,
  initialQuery,
}: ContestEntriesListProps) {
  const [entries, setEntries] = useState<CoreContestEntry[]>([]);
  const [nextCursor, setNextCursor] = useState<string | undefined>(initialCursor);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [upvoteStates, setUpvoteStates] = useState<Record<string, { upvoted: boolean; count: number }>>({});
  const [votingStates, setVotingStates] = useState<Record<string, boolean>>({});
  
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch entries from main app API
  const loadEntries = async (
    cursor?: string,
    city?: string,
    query?: string,
    append = false
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetchEntries({
        cursor,
        limit: initialLimit,
        city: city || initialCity,
        q: query || initialQuery,
      });

      if (append) {
        setEntries(prev => [...prev, ...response.entries]);
      } else {
        setEntries(response.entries);
      }

      setNextCursor(response.nextCursor);
      setHasMore(!!response.nextCursor);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load entries';
      setError(errorMessage);
      console.error('Failed to load entries:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial entries
  useEffect(() => {
    loadEntries(initialCursor, initialCity, initialQuery);
  }, [initialCursor, initialCity, initialQuery]);

  // Check upvote status for current user when entries change or user changes
  useEffect(() => {
    if (entries.length > 0 && isAuthenticated && user?.id) {
      const checkUpvotes = async () => {
        const upvotePromises = entries.map(async (entry) => {
          try {
            const status = await checkUpvoteStatus(entry.experienceId, user.id);
            if (status.success) {
              setUpvoteStates(prev => ({
                ...prev,
                [entry.experienceId]: {
                  upvoted: status.userUpvoted,
                  count: status.upvotesCount,
                }
              }));
            }
          } catch (error) {
            console.error(`Failed to check upvote status for ${entry.experienceId}:`, error);
          }
        });
        
        await Promise.all(upvotePromises);
      };
      
      checkUpvotes();
    }
  }, [entries, isAuthenticated, user?.id]);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const city = formData.get('city') as string;
    const query = formData.get('q') as string;

    // Update URL with search parameters
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (query) params.set('q', query);
    
    const newUrl = params.toString() ? `/leaderboard?${params.toString()}` : '/leaderboard';
    router.push(newUrl);

    // Reload entries with new filters
    loadEntries(undefined, city, query);
  };

  // Load more entries
  const loadMore = () => {
    if (nextCursor && !isLoading) {
      loadEntries(nextCursor, initialCity, initialQuery, true);
    }
  };

  // Handle voting (requires authentication)
  const handleVote = async (entryId: string) => {
    if (!isAuthenticated || !user?.id) {
      return;
    }
    
    try {
      setVotingStates(prev => ({ ...prev, [entryId]: true }));
      
      const result = await upvoteExperience(entryId, user.id);
      
      if (result.success) {
        // Update local state
        setUpvoteStates(prev => ({
          ...prev,
          [entryId]: {
            upvoted: result.upvoted,
            count: result.upvotesCount,
          }
        }));
        
        // Update entry in the list
        setEntries(prev => prev.map(entry => 
          entry.experienceId === entryId 
            ? { ...entry, upvotesCount: result.upvotesCount }
            : entry
        ));
        
        console.log('✅ Vote processed:', result.message);
      }
    } catch (error) {
      console.error('❌ Voting failed:', error);
      // Could show a toast notification here
    } finally {
      setVotingStates(prev => ({ ...prev, [entryId]: false }));
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-xl mb-4">❌ Error loading entries</div>
        <div className="text-gray-600 dark:text-gray-400 mb-6">{error}</div>
        <button
          onClick={() => loadEntries(initialCursor, initialCity, initialQuery)}
          className="contest-button px-6 py-2 text-lg font-semibold rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (entries.length === 0 && !isLoading) {
    return (
      <div className="text-center py-12">
        <Trophy className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <div className="text-xl text-gray-600 dark:text-gray-400 mb-2">No contest entries found</div>
        <div className="text-gray-500 dark:text-gray-500">
          {initialCity || initialQuery ? 'Try adjusting your search criteria' : 'Check back later for new entries'}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                defaultValue={initialCity}
                placeholder="Filter by city..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-frontend-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="q" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search
              </label>
              <input
                type="text"
                id="q"
                name="q"
                defaultValue={initialQuery}
                placeholder="Search experiences..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-frontend-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full contest-button px-6 py-2 text-lg font-semibold rounded-lg"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Entries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {entries.map((entry) => (
          <div
            key={entry.experienceId}
            className="contest-card hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
          >
            {/* Thumbnail */}
            <div className="relative mb-4">
              {entry.thumbnailUrl ? (
                <img
                  src={entry.thumbnailUrl}
                  alt={entry.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-frontend-primary/10 to-frontend-secondary/10 rounded-lg flex items-center justify-center">
                  <div className="text-frontend-primary text-4xl font-bold">📸</div>
                </div>
              )}
              <div className="absolute top-3 right-3 bg-frontend-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                Contest Entry
              </div>
            </div>

            {/* Content */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-frontend-primary transition-colors duration-200">
                {entry.title}
              </h3>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                {entry.city}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(entry.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Heart className="w-4 h-4 mr-2" />
                {entry.upvotesCount} upvotes
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <a
                href={entry.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-frontend-primary hover:text-frontend-primary/80 transition-colors duration-200"
              >
                <Eye className="w-4 h-4 mr-1" />
                View Details
              </a>
              
              {isAuthenticated ? (
                <button
                  onClick={() => handleVote(entry.experienceId)}
                  disabled={votingStates[entry.experienceId]}
                  className={`flex items-center px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${
                    upvoteStates[entry.experienceId]?.upvoted
                      ? 'bg-frontend-success text-white hover:bg-frontend-success/90'
                      : 'contest-button'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Heart className={`w-4 h-4 mr-1 ${
                    upvoteStates[entry.experienceId]?.upvoted ? 'fill-current' : ''
                  }`} />
                  {votingStates[entry.experienceId] 
                    ? 'Voting...' 
                    : upvoteStates[entry.experienceId]?.upvoted 
                      ? 'Upvoted' 
                      : 'Vote'
                  }
                </button>
              ) : (
                <LoginToVoteButton variant="outline" size="sm">
                  <Heart className="w-4 h-4 mr-1" />
                  Vote
                </LoginToVoteButton>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="text-center">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="contest-button-secondary px-8 py-3 text-lg font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Load More Entries'}
          </button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-frontend-primary mx-auto"></div>
          <div className="text-gray-600 dark:text-gray-400 mt-4">Loading entries...</div>
        </div>
      )}
    </div>
  );
}
