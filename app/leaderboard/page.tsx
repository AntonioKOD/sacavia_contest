import { Suspense } from 'react';
import { fetchEntries } from '@/lib/core';
import { ContestEntriesList } from './contest-entries-list';
import { ContestEntriesSkeleton } from './contest-entries-skeleton';

interface LeaderboardPageProps {
  searchParams: Promise<{
    cursor?: string;
    limit?: string;
    city?: string;
    q?: string;
  }>;
}

export default async function LeaderboardPage({ searchParams }: LeaderboardPageProps) {
  const params = await searchParams;
  const limit = Math.min(parseInt(params.limit || '24'), 50);
  const { cursor, city, q } = params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Hidden Gems Leaderboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover amazing hidden gems and vote for your favorites from our community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
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
                  defaultValue={city}
                  placeholder="Filter by city..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-frontend-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  name="q"
                  defaultValue={q}
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
        </div>

        {/* Contest Entries */}
        <Suspense fallback={<ContestEntriesSkeleton />}>
          <ContestEntriesList 
            initialCursor={cursor}
            initialLimit={limit}
            initialCity={city}
            initialQuery={q}
          />
        </Suspense>
      </div>
    </div>
  );
}
