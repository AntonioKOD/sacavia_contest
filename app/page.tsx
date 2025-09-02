import { ContestHero } from '@/components/contest/contest-hero';
import { ContestGrid } from '@/components/contest/contest-grid';
import { ContestStats } from '@/components/contest/contest-stats';
import { ContestFeatures } from '@/components/contest/contest-features';

export default function ContestHomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <ContestHero />
      <ContestStats />
      <ContestGrid />
      <ContestFeatures />
    </main>
  );
}
