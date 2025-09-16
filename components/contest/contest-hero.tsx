'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function ContestHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/contest_image.png"
          alt="Hidden Gems Contest"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-light mb-8 tracking-tight">
            Hidden Gems
          </h1>
          
          <p className="text-xl md:text-2xl font-light mb-12 max-w-2xl mx-auto leading-relaxed opacity-90">
            Discover and share your city's best-kept secrets. Win up to $5,000.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/leaderboard"
              className="inline-block bg-white text-black px-8 py-4 text-lg font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              View Entries
            </a>
            <a
              href="/how-to-enter"
              className="inline-block border border-white text-white px-8 py-4 text-lg font-medium hover:bg-white hover:text-black transition-colors duration-200"
            >
              How to Enter
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
