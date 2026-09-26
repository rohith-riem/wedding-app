'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

interface CountdownTimerProps {
  targetDate: Date;
}

export const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [currentEvent, setCurrentEvent] = useState('THE WEDDING');

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    const weddingDate = new Date('2026-11-15T07:30:00+05:30').getTime();
    const receptionDate = new Date('2026-11-22T17:00:00+05:30').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();

      let target: number;
      let eventName: string;

      if (now < weddingDate) {
        target = weddingDate;
        eventName = 'THE WEDDING';
      } else if (now < receptionDate) {
        target = receptionDate;
        eventName = 'THE RECEPTION';
      } else {
        target = 0;
        eventName = 'THE CELEBRATION HAS BEGUN';
      }

      setCurrentEvent(eventName);

      if (target === 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const distance = target - now;

      const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      );

      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
          (1000 * 60)
      );

      const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
      );

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    {
      label: 'DAYS',
      value: timeLeft.days,
    },
    {
      label: 'HOURS',
      value: timeLeft.hours,
    },
    {
      label: 'MINUTES',
      value: timeLeft.minutes,
    },
    {
      label: 'SECONDS',
      value: timeLeft.seconds,
    },
  ];

  return (
    <div
      ref={ref}
      className="py-16 px-4 bg-gradient-to-br from-gray-50 to-rose-50/30"
    >
      <div className="max-w-4xl mx-auto text-center">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: inView ? 1 : 0,
            y: inView ? 0 : 30,
          }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="text-rose-500 tracking-[0.3em] text-sm uppercase mb-3">
            Counting down to
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-800 mb-4">
            {currentEvent}
          </h2>

          <div className="w-24 h-px bg-rose-400 mx-auto"></div>
        </motion.div>

        {/* Countdown */}
        {currentEvent !== 'THE CELEBRATION HAS BEGUN' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  y: 50,
                }}
                animate={{
                  opacity: inView ? 1 : 0,
                  scale: inView ? 1 : 0.8,
                  y: inView ? 0 : 50,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1 + 0.2,
                  type: 'spring',
                  stiffness: 100,
                }}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">

                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-rose-500 mb-2">
                    {unit.value
                      .toString()
                      .padStart(2, '0')}
                  </div>

                  <div className="text-gray-600 font-medium text-xs sm:text-sm uppercase tracking-wider">
                    {unit.label}
                  </div>

                </div>
              </motion.div>
            ))}

          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-serif text-rose-600"
          >
            Our celebrations have begun ❤️
          </motion.div>
        )}

        {/* Message */}
        {currentEvent !== 'THE CELEBRATION HAS BEGUN' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: inView ? 1 : 0,
              y: inView ? 0 : 20,
            }}
            transition={{
              duration: 0.8,
              delay: 0.8,
            }}
            className="mt-10"
          >
            <p className="text-gray-600 text-sm sm:text-base">
              We can't wait to celebrate with you.
            </p>
          </motion.div>
        )}

      </div>
    </div>
  );
};
