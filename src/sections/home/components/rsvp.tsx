'use client';

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

export const RSVP = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className="py-20 px-4 bg-gradient-to-br from-rose-50 to-pink-100"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: inView ? 1 : 0,
            y: inView ? 0 : 30,
          }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-4">
            Contact Us
          </h2>

          <div className="w-24 h-px bg-rose-400 mx-auto mb-6"></div>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            For any questions about the wedding or reception, please feel free
            to contact us.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Rohith */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{
              opacity: inView ? 1 : 0,
              x: inView ? 0 : -40,
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-rose-100 text-center"
          >
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <span className="text-2xl">📞</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif text-gray-800 mb-2">
              Rohith
            </h3>

            <a
              href="tel:9976113248"
              className="text-rose-500 hover:text-rose-600 text-lg font-medium transition-colors"
            >
              9976113248
            </a>
          </motion.div>

          {/* Chandran */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{
              opacity: inView ? 1 : 0,
              x: inView ? 0 : 40,
            }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-rose-100 text-center"
          >
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <span className="text-2xl">📞</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif text-gray-800 mb-1">
              Chandran
            </h3>

            <p className="text-sm text-gray-500 mb-3">
              Rohith&apos;s Father
            </p>

            <a
              href="tel:9865918759"
              className="text-rose-500 hover:text-rose-600 text-lg font-medium transition-colors"
            >
              9865918759
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
