import { ContestHero } from '@/components/contest/contest-hero';
import { ContestStats } from '@/components/contest/contest-stats';
import { ContestEntriesGrid } from '@/components/contest/contest-entries-grid';
import { ContestFeatures } from '@/components/contest/contest-features';

export default function ContestHomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <ContestHero />
      
      {/* Contest Statistics */}
      <ContestStats />
      
      {/* Featured Entries */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              Featured Entries
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover amazing hidden gems from our community
            </p>
          </div>
          <ContestEntriesGrid limit={6} />
        </div>
      </section>
      
      {/* How It Works */}
      <ContestFeatures />
    </main>
  );
}
