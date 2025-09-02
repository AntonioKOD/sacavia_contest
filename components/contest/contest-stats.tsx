'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Award, Clock, Users } from 'lucide-react';

const stats = [
  {
    icon: TrendingUp,
    value: '$50,000+',
    label: 'Total Prize Pool',
    color: 'text-frontend-success',
  },
  {
    icon: Award,
    value: '$25,000',
    label: 'Grand Prize',
    color: 'text-frontend-accent',
  },
  {
    icon: Clock,
    value: '4-6 Weeks',
    label: 'Submission Window',
    color: 'text-frontend-info',
  },
  {
    icon: Users,
    value: '50/50',
    label: 'Public + Judge Vote',
    color: 'text-frontend-secondary',
  },
];

export function ContestStats() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Prize Structure
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Multiple ways to win with our comprehensive prize system
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
