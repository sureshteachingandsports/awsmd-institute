'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Event {
  id: string;
  title: string;
  type: 'webinar' | 'workshop' | 'bootcamp' | 'hackathon';
  date: string;
  time: string;
  duration: string;
  instructor: string;
  description: string;
  image: string;
  price: number | 'Free';
  spots: number;
  registered: number;
  tags: string[];
}

const upcomingEvents: Event[] = [
  {
    id: 'web3-workshop',
    title: 'Web3 Development Workshop',
    type: 'workshop',
    date: '2024-02-15',
    time: '10:00 AM',
    duration: '3 hours',
    instructor: 'Dr. John Doe',
    description: 'Learn to build decentralized applications with Ethereum and Solidity.',
    image: '/images/events/web3.jpg',
    price: 'Free',
    spots: 100,
    registered: 75,
    tags: ['Web3', 'Blockchain', 'Ethereum', 'Smart Contracts']
  },
  // Add more events...
];

const EventsSection = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'featured'>('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gradient">Upcoming Events</h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Join our interactive sessions and stay ahead in your tech journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-accent/50 transition-all"
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-accent rounded-full text-xs font-medium">
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-4 text-sm text-secondary">
                  <CalendarIcon />
                  {new Date(event.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                  <span className="mx-2">•</span>
                  <ClockIcon />
                  {event.time}
                </div>

                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-secondary mb-4 line-clamp-2">{event.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full text-xs font-medium bg-white/5 text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <UserIcon />
                    <span className="text-sm text-secondary">
                      {event.registered} / {event.spots} spots
                    </span>
                  </div>
                  <span className="text-accent font-semibold">
                    {typeof event.price === 'number' ? `$${event.price}` : event.price}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedEvent(event.id)}
                  className="w-full px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
                >
                  Register Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Helper Components
const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export default EventsSection; 