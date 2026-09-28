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

  const activeSection = useScrollSpy(
    NAVIGATION_SECTIONS.map((section) => section.id)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
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
    window.dispatchEvent(new Event('wedding-invitation-opened'));

    setShowLetter(false);

    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  };

  return (
    <>
      <MusicPlayer className={showLetter ? 'hidden' : ''} />

      {showLetter ? (
        <Suspense fallback={null}>
          <LetterAnimation
            onOpen={handleLetterOpen}
            coupleName={`${WEDDING_CONFIG.bride.name} & ${WEDDING_CONFIG.groom.name}`}
          />
        </Suspense>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
          <FloatingNavigation
            activeSection={activeSection}
            onScrollToSection={scrollToSection}
          />

          <section id="hero" className="relative">
            <HeroSection
              isLoaded={isLoaded}
              couple={WEDDING_CONFIG}
              onScrollToSection={scrollToSection}
            />
          </section>

          <section id="couple" className="relative">
            <CoupleIntroduction
              bride={WEDDING_CONFIG.bride}
              groom={WEDDING_CONFIG.groom}
              isVisible={isLoaded}
            />
          </section>

          <section id="details" className="relative">
            <CountdownTimer targetDate={WEDDING_CONFIG.date} />
          </section>

          <section id="venue" className="relative">
            <VenueInformation venue={WEDDING_CONFIG.venue} />
            <EventSchedule />
          </section>

          <section id="rsvp" className="relative">
            <RSVP />
          </section>

          <section id="closing" className="relative">
            <ClosingMessage
              bride={WEDDING_CONFIG.bride.fullName}
              groom={WEDDING_CONFIG.groom.fullName}
            />
          </section>

          <NavigationFAB
            activeSection={activeSection}
            onScrollToSection={scrollToSection}
          />

          <ScrollProgressIndicator activeSection={activeSection} />
        </div>
      )}
    </>
  );
}
