'use client';

import { motion } from 'framer-motion';
import { Trophy, Users, Star } from 'lucide-react';

export function ContestHero() {
  return (
    <section className="relative overflow-hidden contest-gradient text-white py-20">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <Trophy className="w-16 h-16 text-frontend-accent" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Hidden Gems Contest
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Enter your city's best-kept secret. Win up to $25,000 and help others discover amazing places
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="contest-button px-8 py-3 text-lg font-semibold rounded-lg transition-colors duration-200">
              View Entries
            </button>
            <button className="contest-button-secondary px-8 py-3 text-lg font-semibold rounded-lg transition-colors duration-200">
              How to Enter
            </button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-frontend-accent" />
            <h3 className="text-2xl font-bold mb-2">$50,000+ Prizes</h3>
            <p className="text-lg opacity-80">Grand prize, city winners & more</p>
          </div>
          <div className="text-center">
            <Star className="w-12 h-12 mx-auto mb-4 text-frontend-accent" />
            <h3 className="text-2xl font-bold mb-2">Public + Judge Voting</h3>
            <p className="text-lg opacity-80">Fair 50/50 scoring system</p>
          </div>
          <div className="text-center">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-frontend-accent" />
            <h3 className="text-2xl font-bold mb-2">Hidden Gems</h3>
            <p className="text-lg opacity-80">Discover amazing local places</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
