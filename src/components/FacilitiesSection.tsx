'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

interface Facility {
  icon: string;
  title: string;
  description: string;
}

const facilities: Facility[] = [
  {
    icon: '🏛️',
    title: 'Modern Campus',
    description: 'State-of-the-art facilities with advanced technology labs and comfortable learning spaces.'
  },
  {
    icon: '👨‍🏫',
    title: 'Expert Faculty',
    description: 'Learn from industry professionals with years of practical experience.'
  },
  {
    icon: '💻',
    title: 'Tech Labs',
    description: 'Access to cutting-edge equipment and software in our specialized labs.'
  },
  {
    icon: '🌐',
    title: 'Virtual Learning',
    description: 'Flexible online learning options with interactive virtual classrooms.'
  },
  {
    icon: '🤝',
    title: 'Industry Partners',
    description: 'Strong connections with leading tech companies for internships and placements.'
  },
  {
    icon: '📚',
    title: 'Digital Library',
    description: 'Extensive collection of digital resources and learning materials.'
  }
];

const FacilitiesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Particle animation positions
  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 2 + 2
  }));

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">
          World-Class Facilities
        </h2>
      </ScrollReveal>
      
      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {facilities.map((facility, index) => (
          <motion.div
            key={facility.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="facility-card backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10 hover:border-accent/50 transition-all duration-300"
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 0 20px rgba(0, 242, 254, 0.1)'
            }}
          >
            <motion.div 
              className="text-4xl mb-4"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {facility.icon}
            </motion.div>
            <h3 className="text-xl font-semibold mb-2 text-gradient">{facility.title}</h3>
            <p className="text-secondary">{facility.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-accent/5 to-transparent"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  );
};

export default FacilitiesSection;