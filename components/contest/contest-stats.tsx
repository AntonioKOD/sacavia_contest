'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Clock, Users, DollarSign, Trophy } from 'lucide-react';
import { contestApi, ContestStats as ContestStatsType } from '@/lib/api';

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export function ContestStats() {
  const [stats, setStats] = useState<ContestStatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await contestApi.getStats();
        setStats(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch contest stats:', err);
        setError('Failed to load contest statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Contest Statistics
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Loading amazing prizes and competition data...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="stats-card animate-pulse">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 dark:bg-gray-600 rounded-2xl"></div>
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !stats) {
    return (
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">❌ {error || 'Failed to load statistics'}</div>
            <button
              onClick={() => window.location.reload()}
              className="contest-button px-6 py-2 text-lg font-semibold rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  const displayStats = [
    {
      icon: DollarSign,
      value: `$${formatNumber(stats.prizePool.total)}+`,
      label: 'Total Prize Pool',
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
    },
    {
      icon: Trophy,
      value: `$${formatNumber(stats.prizePool.grandPrize)}`,
      label: 'Grand Prize',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
    },
    {
      icon: Users,
      value: formatNumber(stats.totalEntries),
      label: 'Total Entries',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
    },
    {
      icon: TrendingUp,
      value: formatNumber(stats.totalVotes),
      label: 'Total Votes',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto">
          {displayStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-light text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Prize Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 text-center">Complete Prize Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3">🏆 Major Prizes</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Grand Prize:</strong> ${formatNumber(stats.prizePool.grandPrize)}</li>
                  <li>• <strong>City Winners:</strong> $2,000 each (up to 10 cities)</li>
                  <li>• <strong>Category Winners:</strong> $1,000 each (5 categories)</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">📊 Live Stats</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Total Participants:</strong> {formatNumber(stats.totalParticipants)}</li>
                  <li>• <strong>Top City:</strong> {stats.topCity.name} ({stats.topCity.entries} entries)</li>
                  <li>• <strong>Recent Activity:</strong> {stats.recentActivity.entriesLast24h} entries, {stats.recentActivity.votesLast24h} votes (24h)</li>
                </ul>
              </div>
            </div>
            
            {/* Contest Status */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex items-center justify-center space-x-4 text-sm">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">
                  {stats.contestStatus.isActive ? 'Contest Active' : 'Contest Ended'}
                </span>
                <span className="opacity-75">•</span>
                <span>
                  {stats.contestStatus.isActive 
                    ? `${stats.contestStatus.daysRemaining} days remaining`
                    : 'Contest has concluded'
                  }
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
