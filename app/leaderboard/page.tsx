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
