'use client';

import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface MusicPlayerProps {
  className?: string;
}

export default function MusicPlayer({
  className = '',
}: MusicPlayerProps) {
  const { t } = useTranslation('home');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = 0.35;
    audio.loop = true;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (Number.isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleInvitationOpened = () => {
      audio.volume = 0.35;
      audio.loop = true;

      audio.play().catch(() => {
        setIsPlaying(false);
      });
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    window.addEventListener(
      'wedding-invitation-opened',
      handleInvitationOpened
    );

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);

      window.removeEventListener(
        'wedding-invitation-opened',
        handleInvitationOpened
      );
    };
  }, []);

  const togglePlayPause = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch {
      setIsPlaying(false);
    }
  };

  const progress =
    duration > 0
      ? Math.min((currentTime / duration) * 100, 100)
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 1,
        type: 'spring',
        stiffness: 200,
      }}
      className={`fixed bottom-24 right-6 z-50 ${className}`}
    >
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/wedding-app/assets/music/Let%20The%20Celebration%20Begin.mp3"
        aria-label="Wedding background music"
      >
        <track
          kind="captions"
          src="/wedding-app/assets/music/Let%20The%20Celebration%20Begin.mp3"
          label="Wedding music"
        />
      </audio>

      <div className="relative">
        <svg
          className="absolute inset-0 h-14 w-14 -rotate-90"
          viewBox="0 0 64 64"
          aria-hidden="true"
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
            animate={{ pathLength: progress / 100 }}
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
          onClick={togglePlayPause}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/95 shadow-2xl backdrop-blur-md transition-all duration-300 hover:shadow-cyan-200/50"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 opacity-80" />

          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20"
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

          <div className="relative z-10 flex h-full w-full items-center justify-center">
            {isPlaying ? (
              <div className="flex items-center space-x-0.5">
                <motion.div
                  animate={{ scaleY: [1, 1.5, 1, 2, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="h-3 w-1 rounded-full bg-gradient-to-t from-cyan-500 to-blue-500"
                />

                <motion.div
                  animate={{ scaleY: [1, 2, 1, 1.5, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.2,
                  }}
                  className="h-4 w-1 rounded-full bg-gradient-to-t from-blue-500 to-purple-500"
                />

                <motion.div
                  animate={{ scaleY: [1, 1.5, 2, 1, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.4,
                  }}
                  className="h-3 w-1 rounded-full bg-gradient-to-t from-purple-500 to-cyan-500"
                />
              </div>
            ) : (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-2xl drop-shadow-sm"
              >
                🎵
              </motion.div>
            )}
          </div>

          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/30 to-blue-400/30"
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
            className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="h-2 w-2 rounded-full bg-white"
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="pointer-events-none absolute right-full top-1/2 mr-4 -translate-y-1/2 whitespace-nowrap rounded-lg bg-gray-800/90 px-3 py-2 text-xs text-white shadow-lg backdrop-blur-sm"
        >
          <div className="font-medium">
            {isPlaying
              ? `🎵 ${t('music.playing')}`
              : `🎵 ${t('music.paused')}`}
          </div>

          <div className="text-xs text-gray-300">
            {t('music.wedding-music')}
          </div>

          <div className="absolute left-full top-1/2 -translate-y-1/2 border-y-4 border-l-4 border-y-transparent border-l-gray-800/90" />
        </motion.div>
      </div>
    </motion.div>
  );
}
