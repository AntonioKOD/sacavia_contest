'use client';

import { motion } from 'framer-motion';
import { Calendar, Users, Trophy, Clock } from 'lucide-react';

// Mock data - this will be replaced with real API calls
const mockContests = [
  {
    id: 1,
    title: 'Grand Prize',
    description: 'Best overall Hidden Gem across all categories and cities',
    image: '/api/placeholder/400/300',
    participants: 124,
    endDate: '2024-02-15',
    prize: '$25,000',
    category: 'Overall',
    status: 'active',
  },
  {
    id: 2,
    title: 'City Winners',
    description: 'Top Hidden Gem in each of up to 10 major cities',
    image: '/api/placeholder/400/300',
    participants: 89,
    endDate: '2024-02-20',
    prize: '$2,000',
    category: 'City',
    status: 'active',
  },
  {
    id: 3,
    title: 'Category Minis',
    description: 'Best in Food, Outdoors, Art, Nightlife, and "Weird & Wonderful"',
    image: '/api/placeholder/400/300',
    participants: 156,
    endDate: '2024-02-25',
    prize: '$1,000',
    category: 'Category',
    status: 'active',
  },
];

export function ContestGrid() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Prize Categories
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Multiple ways to win with our comprehensive prize structure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockContests.map((contest, index) => (
            <motion.div
              key={contest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="contest-card hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105"
            >
              <div className="relative mb-4">
                <div className="w-full h-48 bg-gradient-to-br from-frontend-primary/10 to-frontend-secondary/10 rounded-lg flex items-center justify-center">
                  <div className="text-frontend-primary text-4xl font-bold">📸</div>
                </div>
                <div className="absolute top-3 right-3 bg-frontend-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {contest.category}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-frontend-primary transition-colors duration-200">
                  {contest.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                  {contest.description}
                </p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Users className="w-4 h-4 mr-2" />
                  {contest.participants} participants
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  Ends {contest.endDate}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Trophy className="w-4 h-4 mr-2" />
                  Prize: {contest.prize}
                </div>
              </div>

              <button className="w-full contest-button group-hover:scale-105 transition-transform duration-200">
                View Details
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="contest-button-secondary px-8 py-3 text-lg font-semibold rounded-lg">
            View All Entries
          </button>
        </motion.div>
      </div>
    </section>
  );
}
