'use client';

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

export const EventSchedule = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const events = [
    {
      date: '15 NOVEMBER 2026',
      title: 'THE WEDDING',
      time: '7:30 AM – 9:00 AM',
      venue: 'Thirumathi Poovayammal Thirumana Mandapam',
      address: 'Rasipuram, Namakkal District',
      mapUrl:
        'https://www.google.com/maps/search/?api=1&query=Thirumathi+Poovayammal+Thirumana+Mandapam+Rasipuram+Namakkal',
      calendarUrl:
        'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Rohith%20%26%20Sruthi%20-%20Wedding%20Ceremony&dates=20261115T073000/20261115T090000&ctz=Asia%2FKolkata&location=Thirumathi%20Poovayammal%20Thirumana%20Mandapam%2C%20Rasipuram%2C%20Namakkal%20District',
    },
    {
      date: '22 NOVEMBER 2026',
      title: 'THE RECEPTION',
      time: '5:00 PM – 9:00 PM',
      venue: 'Krishna Pillai Memorial Auditorium',
      address: 'Kovoor, Kozhikode',
      mapUrl:
        'https://www.google.com/maps/place/P.+Krishna+Pillai+Memorial+Auditorium,+Kovoor/@11.2689555,75.8289195,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba65be1128a88dd:0xe3785dd6d68a258f!8m2!3d11.2689503!4d75.8314944!16s%2Fg%2F11v059wpqn?entry=ttu&g_ep=EgoyMDI2MDkyMi4wIKXMDSoASAFQAw%3D%3D',
      calendarUrl:
        'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Rohith%20%26%20Sruthi%20-%20Wedding%20Reception&dates=20261122T170000/20261122T210000&ctz=Asia%2FKolkata&location=Krishna%20Pillai%20Memorial%20Auditorium%2C%20Kovoor%2C%20Kozhikode',
    },
  ];

  return (
    <div
      ref={ref}
      className="py-16 px-4 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-5xl mx-auto">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: inView ? 1 : 0,
            y: inView ? 0 : 30,
          }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="text-rose-500 tracking-[0.3em] text-sm uppercase mb-3">
            Two moments, one beautiful journey
          </p>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-800 mb-4">
            Our Celebrations
          </h3>

          <div className="w-20 h-px bg-rose-400 mx-auto"></div>
        </motion.div>

        {/* Events */}
        <div className="grid md:grid-cols-2 gap-8">

          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: inView ? 1 : 0,
                y: inView ? 0 : 40,
              }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
              }}
              className="bg-white rounded-3xl p-7 sm:p-9 shadow-lg border border-rose-100 text-center"
            >

              {/* Date */}
              <div className="text-rose-500 tracking-[0.25em] text-sm font-medium mb-4">
                {event.date}
              </div>

              {/* Title */}
              <h4 className="text-2xl sm:text-3xl font-serif text-gray-800 mb-5">
                {event.title}
              </h4>

              {/* Time */}
              <div className="inline-block bg-rose-50 text-rose-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                {event.time}
              </div>

              {/* Venue */}
              <h5 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                {event.venue}
              </h5>

              <p className="text-gray-600 text-sm sm:text-base mb-7">
                {event.address}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3">

                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 transition-colors"
                >
                  VIEW ON MAP
                </a>

                <a
                  href={event.calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full border border-rose-300 text-rose-600 text-sm font-medium hover:bg-rose-50 transition-colors"
                >
                  ADD TO CALENDAR
                </a>

              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
};
