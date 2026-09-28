'use client';

import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface MusicPlayerProps {
className?: string;
shouldStart?: boolean;
}

export default function MusicPlayer({
className = '',
shouldStart = false,
}: MusicPlayerProps) {
const { t } = useTranslation('home');

const [isPlaying, setIsPlaying] = useState(false);
const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);

const audioRef = useRef<HTMLAudioElement>(null);
const hasStartedRef = useRef(false);

useEffect(() => {
if (!shouldStart || hasStartedRef.current) return;

```
const audio = audioRef.current;

if (!audio) return;

hasStartedRef.current = true;

const startMusic = async () => {
  try {
    await audio.play();
    setIsPlaying(true);
  } catch {
    setIsPlaying(false);
  }
};

startMusic();
```

}, [shouldStart]);

useEffect(() => {
const audio = audioRef.current;

```
if (!audio) return;

const updateTime = () => {
  setCurrentTime(audio.currentTime);
};

const updateDuration = () => {
  if (Number.isFinite(audio.duration)) {
    setDuration(audio.duration);
  }
};

const handleEnded = () => {
  setIsPlaying(false);
};

audio.addEventListener('timeupdate', updateTime);
audio.addEventListener('loadedmetadata', updateDuration);
audio.addEventListener('ended', handleEnded);

return () => {
  audio.removeEventListener('timeupdate', updateTime);
  audio.removeEventListener('loadedmetadata', updateDuration);
  audio.removeEventListener('ended', handleEnded);
};
```

}, []);

const togglePlayPause = async () => {
const audio = audioRef.current;

```
if (!audio) return;

try {
  if (isPlaying) {
    audio.pause();
    setIsPlaying(false);
  } else {
    await audio.play();
    setIsPlaying(true);
  }
} catch {
  setIsPlaying(false);
}
```

};

const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

return (
<motion.div
initial={{ opacity: 0, scale: 0, y: 100 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
transition={{
duration: 0.6,
delay: 1.0,
type: 'spring',
stiffness: 200,
}}
className={`fixed bottom-24 right-6 z-50 ${className}`}
> <audio
     ref={audioRef}
     loop
     preload="auto"
     src="/wedding-app/assets/music/Let%20The%20Celebration%20Begin.mp3"
     aria-label="Wedding background music"
   />

```
  <div className="relative">
    <svg
      className="w-14 h-14 transform -rotate-90 absolute inset-0"
      viewBox="0 0 64 64"
    >
      <circle
        cx="32"
        cy="32"
        r="28"
        fill="none"
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth="2"
      />

      <motion.circle
        cx="32"
        cy="32"
        r="28"
        fill="none"
        stroke="url(#musicGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: progress / 100,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
      />

      <defs>
        <linearGradient
          id="musicGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>

    <motion.button
      type="button"
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={togglePlayPause}
      className="relative w-14 h-14 bg-white/95 backdrop-blur-md border border-white/20 rounded-full shadow-2xl hover:shadow-cyan-200/50 transition-all duration-300 group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 rounded-full"
        animate={{
          opacity: isPlaying ? [0.4, 0.8, 0.4] : 0.3,
          scale: isPlaying ? [1, 1.08, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {isPlaying ? (
          <div className="flex items-center space-x-0.5">
            <motion.div
              animate={{
                scaleY: [1, 1.5, 1, 2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-1 h-3 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-full"
            />

            <motion.div
              animate={{
                scaleY: [1, 2, 1, 1.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.2,
              }}
              className="w-1 h-4 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
            />

            <motion.div
              animate={{
                scaleY: [1, 1.5, 2, 1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.4,
              }}
              className="w-1 h-3 bg-gradient-to-t from-purple-500 to-cyan-500 rounded-full"
            />
          </div>
        ) : (
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-2xl filter drop-shadow-sm"
          >
            🎵
          </motion.div>
        )}
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{
          scale: 2,
          opacity: [0, 0.3, 0],
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.button>

    {isPlaying && (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-2 h-2 bg-white rounded-full"
        />
      </motion.div>
    )}

    <motion.div
      initial={{ opacity: 0, x: 10 }}
      whileHover={{ opacity: 1, x: 0 }}
      className="absolute right-full top-1/2 -translate-y-1/2 mr-4 bg-gray-800/90 text-white text-xs px-3 py-2 rounded-lg shadow-lg backdrop-blur-sm whitespace-nowrap pointer-events-none"
    >
      <div className="font-medium">
        {isPlaying
          ? `🎵 ${t('music.playing')}`
          : `🎵 ${t('music.paused')}`}
      </div>

      <div className="text-gray-300 text-xs">
        {t('music.wedding-music')}
      </div>

      <div className="absolute left-full top-1/2 -translate-y-1/2 border-l-4 border-l-gray-800/90 border-y-4 border-y-transparent" />
    </motion.div>
  </div>
</motion.div>
```

);
}

```

## 2. `home-view.tsx`

Replace the **entire file** with this:

:::writing{variant="document" id="90513" title="home-view.tsx"}
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { LetterAnimation } from '@/components';
import {
  HeroSection,
  CoupleIntroduction,
  CountdownTimer,
  VenueInformation,
  EventSchedule,
  RSVP,
  ClosingMessage,
  FloatingNavigation,
  NavigationFAB,
  MusicPlayer,
  ScrollProgressIndicator,
} from '../components';
import { NAVIGATION_SECTIONS, WEDDING_CONFIG } from '@/constants';

export default function HomeView() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLetter, setShowLetter] = useState(true);

  // Auto-detect active section using scroll spy
  const activeSection = useScrollSpy(
    NAVIGATION_SECTIONS.map((section) => section.id)
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleLetterOpen = () => {
    setShowLetter(false);
    setTimeout(() => setIsLoaded(true), 300);
  };

  // Show letter animation first
  if (showLetter) {
    return (
      <Suspense fallback={null}>
        <LetterAnimation
          onOpen={handleLetterOpen}
          coupleName={`${WEDDING_CONFIG.bride.name} & ${WEDDING_CONFIG.groom.name}`}
        />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <FloatingNavigation
        activeSection={activeSection}
        onScrollToSection={scrollToSection}
      />

      {/* Hero Section */}
      <section id="hero" className="relative">
        <HeroSection
          isLoaded={isLoaded}
          couple={WEDDING_CONFIG}
          onScrollToSection={scrollToSection}
        />
      </section>

      {/* Couple Introduction */}
      <section id="couple" className="relative">
        <CoupleIntroduction
          bride={WEDDING_CONFIG.bride}
          groom={WEDDING_CONFIG.groom}
          isVisible={isLoaded}
        />
      </section>

      {/* Countdown */}
      <section id="details" className="relative">
        <CountdownTimer targetDate={WEDDING_CONFIG.date} />
      </section>

      {/* Venue Information */}
      <section id="venue" className="relative">
        <VenueInformation venue={WEDDING_CONFIG.venue} />
        <EventSchedule />
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="relative">
        <RSVP />
      </section>

      {/* Closing Message */}
      <section id="closing" className="relative">
        <ClosingMessage
          bride={WEDDING_CONFIG.bride.fullName}
          groom={WEDDING_CONFIG.groom.fullName}
        />
      </section>

      {/* Music Player */}
      <MusicPlayer shouldStart={!showLetter} />

      {/* Mobile Navigation FAB */}
      <NavigationFAB
        activeSection={activeSection}
        onScrollToSection={scrollToSection}
      />

      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator activeSection={activeSection} />
    </div>
  );
}
