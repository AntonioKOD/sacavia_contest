import { Suspense } from 'react';
import { ContestEntriesList } from '../leaderboard/contest-entries-list';
import { ContestEntriesSkeleton } from '../leaderboard/contest-entries-skeleton';
import { AuthWrapper } from '@/components/auth/auth-wrapper';

interface LocationsPageProps {
  searchParams: Promise<{
    cursor?: string;
    limit?: string;
    city?: string;
    q?: string;
  }>;
}

export default async function LocationsPage({ searchParams }: LocationsPageProps) {
  const params = await searchParams;
  const limit = Math.min(parseInt(params.limit || '48'), 100);
  const { cursor, city, q } = params;

  return (
    <AuthWrapper requireAuth={true}>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              All Locations
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore all hidden gems and local discoveries from our community
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-12">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    placeholder="Search locations..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    id="sort"
                    name="sort"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white text-gray-900"
                  >
                    <option value="newest">Newest First</option>
                    <option value="popular">Most Popular</option>
                    <option value="city">By City</option>
                  </select>
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
    </AuthWrapper>
  );
}
