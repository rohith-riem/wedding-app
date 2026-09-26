'use client';

import type { WeddingConfigType } from '@/types';
import { motion } from 'motion/react';

interface HeroSectionProps {
  isLoaded: boolean;
  couple: WeddingConfigType;
  onScrollToSection: (sectionId: string) => void;
}

export const HeroSection = ({
  isLoaded,
  couple,
  onScrollToSection,
}: HeroSectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">

      {/* Soft background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-100/40 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-32 pb-16">

        <div className="max-w-4xl mx-auto text-center">

          {/* Opening quote */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{
              opacity: isLoaded ? 1 : 0,
              y: isLoaded ? 0 : 25,
            }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed">
              “Where two hearts meet,
              <br />
              a beautiful journey begins.”
            </p>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: isLoaded ? '100px' : 0,
              opacity: isLoaded ? 1 : 0,
            }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="h-px bg-rose-400 mx-auto mb-8"
          />

          {/* Together with our families */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="uppercase tracking-[0.25em] text-xs sm:text-sm text-rose-500 mb-6"
          >
            Together with our families
          </motion.p>

          {/* Names */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: isLoaded ? 1 : 0,
              y: isLoaded ? 0 : 30,
            }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-800 leading-tight">
              {couple.groom.name}
              <span className="block text-rose-400 text-3xl sm:text-4xl md:text-5xl my-2">
                &
              </span>
              {couple.bride.name}
            </h1>
          </motion.div>

          {/* Invitation */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="font-serif italic text-lg sm:text-xl text-gray-600 mt-7 mb-10"
          >
            invite you to celebrate two beautiful moments
          </motion.p>

          {/* Event preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: isLoaded ? 1 : 0,
              y: isLoaded ? 0 : 30,
            }}
            transition={{ duration: 1, delay: 1.4 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10"
          >

            {/* Wedding */}
            <button
              onClick={() => onScrollToSection('venue')}
              className="group text-center cursor-pointer"
            >
              <div className="text-xs tracking-[0.25em] text-rose-500 mb-2">
                15 NOVEMBER 2026
              </div>

              <div className="font-serif text-xl sm:text-2xl text-gray-800 group-hover:text-rose-500 transition-colors">
                The Wedding
              </div>

              <div className="text-sm text-gray-500 mt-1">
                7:30 AM – 9:00 AM
              </div>
            </button>

            {/* Divider */}
            <div className="hidden sm:block w-px h-16 bg-rose-200"></div>

            <div className="sm:hidden w-16 h-px bg-rose-200"></div>

            {/* Reception */}
            <button
              onClick={() => onScrollToSection('venue')}
              className="group text-center cursor-pointer"
            >
              <div className="text-xs tracking-[0.25em] text-rose-500 mb-2">
                22 NOVEMBER 2026
              </div>

              <div className="font-serif text-xl sm:text-2xl text-gray-800 group-hover:text-rose-500 transition-colors">
                The Reception
              </div>

              <div className="text-sm text-gray-500 mt-1">
                5:00 PM – 9:00 PM
              </div>
            </button>

          </motion.div>

          {/* Explore button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isLoaded ? 1 : 0,
              y: isLoaded ? 0 : 20,
            }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="mt-12"
          >
            <button
              onClick={() => onScrollToSection('couple')}
              className="text-xs sm:text-sm uppercase tracking-[0.25em] text-gray-500 hover:text-rose-500 transition-colors cursor-pointer"
            >
              Explore our celebrations
              <span className="block text-lg mt-2">↓</span>
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
