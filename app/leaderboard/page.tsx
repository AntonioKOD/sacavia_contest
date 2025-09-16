import { Suspense } from 'react';
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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            All Entries
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover and vote for amazing hidden gems from our community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  defaultValue={city}
                  placeholder="Filter by city..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                />
              </div>
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  name="q"
                  defaultValue={q}
                  placeholder="Search experiences..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-black text-white px-6 py-3 text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
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
