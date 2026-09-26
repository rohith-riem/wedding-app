'use client';

import type { WeddingConfigType } from '@/types';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

interface CoupleIntroductionProps {
  bride: WeddingConfigType['bride'];
  groom: WeddingConfigType['groom'];
  isVisible: boolean;
}

export const CoupleIntroduction = ({
  bride,
  groom,
}: CoupleIntroductionProps) => {
  const { t } = useTranslation('home');

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className="py-20 px-4 bg-gradient-to-b from-white to-rose-50/30"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
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
            Meet Us
          </h2>

          <div className="w-24 h-px bg-rose-400 mx-auto"></div>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            {t('couple.story-text')}
          </p>
        </motion.div>

        {/* Couple Photo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: inView ? 1 : 0,
            y: inView ? 0 : 40,
          }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <div className="relative w-full max-w-xl">

            {/* Photo Frame */}
            <div className="rounded-3xl overflow-hidden border-8 border-white shadow-2xl bg-rose-50">
              <Image
                src="/assets/images/couple.jpg"
                alt={`${groom.fullName} and ${bride.fullName}`}
                width={1536}
                height={2048}
                className="w-full h-auto object-contain"
                priority
              />
            </div>

            {/* Heart decoration */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-rose-100">
              <span className="text-2xl animate-pulse">
                💖
              </span>
            </div>

          </div>
        </motion.div>

        {/* Bride & Groom Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{
              opacity: inView ? 1 : 0,
              x: inView ? 0 : -40,
            }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center lg:text-right"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-800 mb-2">
              {bride.fullName}
            </h3>

            <p className="text-base sm:text-lg text-rose-600 mb-4 font-medium">
              {t('couple.the-bride')}
            </p>

            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-md mx-auto lg:ml-auto">
              {t('couple.bride-description')}
            </p>

            <div className="mt-6 flex justify-center lg:justify-end space-x-2">
              <div className="w-2 h-2 bg-rose-300 rounded-full"></div>
              <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
              <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
            </div>
          </motion.div>

          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{
              opacity: inView ? 1 : 0,
              x: inView ? 0 : 40,
            }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center lg:text-left"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-800 mb-2">
              {groom.fullName}
            </h3>

            <p className="text-base sm:text-lg text-blue-600 mb-4 font-medium">
              {t('couple.the-groom')}
            </p>

            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
              {t('couple.groom-description')}
            </p>

            <div className="mt-6 flex justify-center lg:justify-start space-x-2">
              <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
          </motion.div>

        </div>

        {/* Love Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: inView ? 1 : 0,
            y: inView ? 0 : 30,
          }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mt-16"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-lg border border-white/40">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-gray-700 italic">
              {t('couple.love-quote')}
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
