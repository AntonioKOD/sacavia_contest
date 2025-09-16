'use client';

import { motion } from 'framer-motion';

export function ContestFeatures() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            How It Works
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-6xl font-light text-gray-900 mb-4">1</div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">
              Submit Your Hidden Gem
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Add your favorite local spot to Sacavia with photos and details
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-6xl font-light text-gray-900 mb-4">2</div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">
              Enter the Contest
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Pay $20 entry fee to compete for prizes up to $25,000
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-6xl font-light text-gray-900 mb-4">3</div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">
              Get Votes & Win
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Community votes and expert judges determine the winners
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="https://sacavia.com/add-location"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-white px-8 py-4 text-lg font-medium hover:bg-gray-800 transition-colors duration-200"
          >
            Start Your Entry
          </a>
        </motion.div>
      </div>
    </section>
  );
}
