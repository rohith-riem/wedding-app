'use client';

import type { WeddingConfigType } from '@/types';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { generateMapLink } from '@/lib/wedding-utils';

interface VenueInformationProps {
  venue: WeddingConfigType['venue'];
}

export const VenueInformation = ({ venue }: VenueInformationProps) => {
  const { t } = useTranslation('home');

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div ref={ref} className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: inView ? 1 : 0,
            y: inView ? 0 : 30,
          }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-4">
            {t('venue.location-title')}
          </h2>

          <div className="w-24 h-px bg-rose-400 mx-auto"></div>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            {t('venue.location-subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Wedding Venue */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{
              opacity: inView ? 1 : 0,
              x: inView ? 0 : -50,
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 shadow-lg border border-purple-100"
          >
            <div className="text-center mb-8">

              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-3xl">⛪</span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-gray-800 mb-2">
                {t('venue.ceremony-time')}
              </h3>

              <div className="w-16 h-px bg-purple-400 mx-auto"></div>
            </div>

            <div className="space-y-6">

              <div className="text-center">

                <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                  {venue.ceremony.name}
                </h4>

                <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4">
                  {venue.ceremony.address}
                </p>

                <div className="inline-block bg-white/60 rounded-lg px-4 py-2 shadow-sm">
                  <p className="text-purple-700 font-medium text-sm sm:text-base">
                    📅 {venue.ceremony.time}
                  </p>
                </div>

              </div>

              {/* Map Button */}
              <button
                onClick={() =>
                  window.open(
                    generateMapLink(venue.ceremony.name),
                    '_blank'
                  )
                }
                className="w-full bg-gradient-to-r from-purple-400 to-indigo-500 text-white py-3 px-6 rounded-xl font-medium hover:from-purple-500 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base cursor-pointer"
              >
                {t('venue.view-map')}
              </button>

            </div>
          </motion.div>


          {/* Reception Venue */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: inView ? 1 : 0,
              x: inView ? 0 : 50,
            }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 shadow-lg border border-amber-100"
          >

            <div className="text-center mb-8">

              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-3xl">🥂</span>
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-gray-800 mb-2">
                {t('venue.reception-time')}
              </h3>

              <div className="w-16 h-px bg-amber-400 mx-auto"></div>

            </div>

            <div className="space-y-6">

              <div className="text-center">

                <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                  {venue.reception.name}
                </h4>

                <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4">
                  {venue.reception.address}
                </p>

                <div className="inline-block bg-white/60 rounded-lg px-4 py-2 shadow-sm">
                  <p className="text-amber-700 font-medium text-sm sm:text-base">
                    🍽️ {venue.reception.time}
                  </p>
                </div>

              </div>

              {/* Map Button */}
              <button
                onClick={() =>
                  window.open(
                    generateMapLink(venue.reception.name),
                    '_blank'
                  )
                }
                className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white py-3 px-6 rounded-xl font-medium hover:from-amber-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base cursor-pointer"
              >
                {t('venue.view-map')}
              </button>

            </div>
          </motion.div>

        </div>


        {/* How to Reach Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: inView ? 1 : 0,
            y: inView ? 0 : 30,
          }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >

          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8 max-w-4xl mx-auto border border-rose-100 shadow-sm">

            {/* Main Heading */}
            <div className="text-center mb-8">

              <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 flex items-center justify-center">
                <span className="mr-2">🚉</span>
                How to Reach Us
              </h4>

              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Convenient landmarks to help you find your way
              </p>

            </div>


            {/* Wedding & Reception */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Wedding */}
              <div className="bg-white/70 rounded-2xl p-6 border border-purple-100">

                <div className="text-center mb-5">

                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-3">
                    <span className="text-2xl">💍</span>
                  </div>

                  <h5 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Wedding
                  </h5>

                  <p className="text-sm text-gray-500 mt-1">
                    Rasipuram
                  </p>

                </div>


                {/* Railway */}
                <div className="bg-purple-50/70 rounded-xl p-4 mb-3">

                  <div className="flex items-start gap-3">

                    <span className="text-xl">🚆</span>

                    <div>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        Nearest Railway Station
                      </p>

                      <p className="text-gray-600 text-xs sm:text-sm mt-1">
                        Salem Junction
                      </p>

                      <p className="text-purple-700 font-medium text-xs sm:text-sm mt-1">
                        Approx. 26 km
                      </p>
                    </div>

                  </div>

                </div>


                {/* Bus Stand */}
                <div className="bg-purple-50/70 rounded-xl p-4">

                  <div className="flex items-start gap-3">

                    <span className="text-xl">🚌</span>

                    <div>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        Nearest Bus Stand
                      </p>

                      <p className="text-gray-600 text-xs sm:text-sm mt-1">
                        Rasipuram New Bus Stand
                      </p>

                      <p className="text-purple-700 font-medium text-xs sm:text-sm mt-1">
                        Very close to the venue
                      </p>
                    </div>

                  </div>

                </div>

              </div>


              {/* Reception */}
              <div className="bg-white/70 rounded-2xl p-6 border border-amber-100">

                <div className="text-center mb-5">

                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 mb-3">
                    <span className="text-2xl">🥂</span>
                  </div>

                  <h5 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Reception
                  </h5>

                  <p className="text-sm text-gray-500 mt-1">
                    Kozhikode
                  </p>

                </div>


                {/* Railway */}
                <div className="bg-amber-50/70 rounded-xl p-4 mb-3">

                  <div className="flex items-start gap-3">

                    <span className="text-xl">🚆</span>

                    <div>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        Nearest Railway Station
                      </p>

                      <p className="text-gray-600 text-xs sm:text-sm mt-1">
                        Kozhikode Railway Station
                      </p>

                      <p className="text-amber-700 font-medium text-xs sm:text-sm mt-1">
                        Approx. 6–7 km
                      </p>
                    </div>

                  </div>

                </div>


                {/* Bus Stand */}
                <div className="bg-amber-50/70 rounded-xl p-4">

                  <div className="flex items-start gap-3">

                    <span className="text-xl">🚌</span>

                    <div>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        Major Bus Terminal
                      </p>

                      <p className="text-gray-600 text-xs sm:text-sm mt-1">
                        KSRTC Bus Terminal, Kozhikode
                      </p>

                      <p className="text-amber-700 font-medium text-xs sm:text-sm mt-1">
                        Approx. 5 km
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </div>
  );
};
