'use client';
import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import ScrollReveal from './ScrollReveal';

interface Achievement {
  number: string;
  label: string;
  icon: string;
}

interface ParticlePosition {
  x: number;
  y: number;
  size: number;
  duration: number;
}

const achievements: Achievement[] = [
  { number: "5000+", label: "Graduates", icon: "👨‍🎓" },
  { number: "95%", label: "Placement Rate", icon: "🎯" },
  { number: "150+", label: "Industry Partners", icon: "🤝" },
  { number: "50+", label: "Global Awards", icon: "🏆" }
];

const AchievementsSection = () => {
  // Generate particle positions
  const particles: ParticlePosition[] = useMemo(() => 
    Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 2 + 2
    }))
  , []);

  // Counter animation
  const [isInView, setIsInView] = useState(false);

  // Decorative elements with proper accessibility
  const decorativeElements = (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute bg-accent/20 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size
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
  );

  return (
    <section 
      className="py-20 relative overflow-hidden"
      aria-label="Our Achievements"
    >
      <ScrollReveal>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gradient">
          Our Impact in Numbers
        </h2>
      </ScrollReveal>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.label}
            className="text-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onViewportEnter={() => setIsInView(true)}
          >
            <motion.div 
              className="text-4xl mb-4"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              aria-hidden="true"
            >
              {achievement.icon}
            </motion.div>
            <motion.h3 
              className="text-3xl font-bold mb-2 text-gradient"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {achievement.number}
            </motion.h3>
            <p className="text-secondary text-lg">{achievement.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Background decorative elements */}
      {decorativeElements}
    </section>
  );
};

export default AchievementsSection;