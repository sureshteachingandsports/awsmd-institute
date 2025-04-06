'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';

// Detect if device is mobile/low-end
const isMobileOrLowEnd = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || !window.matchMedia('(min-resolution: 2dppx)').matches;
};

// Fixed positions for particles
const particlePositions = Array.from({ length: 20 }, (_, i) => ({
  left: `${(i * 27) % 100}%`,
  top: `${(i * 17) % 100}%`,
  xOffset: 25 - (i % 3) * 25,
  yOffset: 25 - (i % 3) * 25,
  scale: 1 + (i % 3) * 0.2,
  duration: 4 + (i % 3),
}));

const CallToAction = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(isMobileOrLowEnd());
    
    const handleResize = () => setIsMobile(isMobileOrLowEnd());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-accent/20 via-transparent to-transparent opacity-50" />
        {particlePositions.slice(0, isMobile ? 8 : 20).map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent/30 rounded-full"
            style={{
              left: pos.left,
              top: pos.top,
            }}
            animate={{
              y: [0, pos.yOffset, 0],
              x: [0, pos.xOffset, 0],
              scale: [1, pos.scale, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gradient">
            Start Your Tech Journey Today
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-xl text-secondary mb-12 max-w-2xl mx-auto">
            Join our community of tech enthusiasts and transform your career with cutting-edge courses and expert guidance.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <motion.button
              className="px-8 py-4 bg-accent text-white rounded-full text-lg font-semibold hover:bg-accent/90 backdrop-blur-sm"
              whileHover={!isMobile ? { 
                scale: 1.05,
                boxShadow: "0 0 20px var(--accent)"
              } : {}}
              whileTap={!isMobile ? { scale: 0.95 } : {}}
            >
              Apply Now
            </motion.button>

            <motion.button
              className="px-8 py-4 border border-accent/50 text-accent rounded-full text-lg font-semibold hover:bg-accent/10 backdrop-blur-sm"
              whileHover={!isMobile ? { 
                scale: 1.05,
                boxShadow: "0 0 20px var(--accent)"
              } : {}}
              whileTap={!isMobile ? { scale: 0.95 } : {}}
            >
              Download Brochure
            </motion.button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-semibold mb-2 text-gradient">Call Us</h3>
              <p className="text-secondary">+1 (555) 123-4567</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="text-xl font-semibold mb-2 text-gradient">Email Us</h3>
              <p className="text-secondary">admissions@itinstitute.com</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2 text-gradient">Live Chat</h3>
              <p className="text-secondary">Available 24/7</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CallToAction;