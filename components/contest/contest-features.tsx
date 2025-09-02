'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Heart, Globe } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Anti-Fraud Protection',
    description: 'Rate-limited voting, anomaly detection, and Wilson score ranking ensure fair competition',
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    icon: Zap,
    title: 'Multiple Prize Tiers',
    description: 'Grand prize, city winners, category minis, and weekly trending prizes',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
  },
  {
    icon: Heart,
    title: 'Fair 50/50 Scoring',
    description: 'Public votes (50%) + expert judges (50%) for balanced winner selection',
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
  },
  {
    icon: Globe,
    title: 'City & Category Winners',
    description: 'Win in your city, category, or overall - multiple chances to succeed',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
];

export function ContestFeatures() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Enter the Hidden Gems Contest?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Multiple ways to win, fair scoring system, and your entry becomes a permanent Hidden Gem on Sacavia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start space-x-4 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center flex-shrink-0`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-frontend-primary to-frontend-secondary rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Enter Your Hidden Gem?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Submit your location on sacavia.com and opt into the contest for $20
            </p>
            <button className="bg-white text-frontend-primary hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg transition-colors duration-200">
              Learn How to Enter
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
