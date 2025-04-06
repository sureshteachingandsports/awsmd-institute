'use client';
import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

// Detect if device is mobile/low-end
const isMobileOrLowEnd = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || !window.matchMedia('(min-resolution: 2dppx)').matches;
};

const techPhrases = [
  { text: "Ethical Hacking Excellence", color: "#00f2fe" },
  { text: "Secure Coding Mastery", color: "#7d5fff" },
  { text: "Cloud Computing Expert", color: "#00f2fe" },
  { text: "AI Development Pioneer", color: "#4facfe" },
];

const GlowingText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(isMobileOrLowEnd());
    
    const handleResize = () => setIsMobile(isMobileOrLowEnd());
    window.addEventListener('resize', handleResize);

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % techPhrases.length);
    }, isMobile ? 4000 : 5000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  const currentPhrase = useMemo(() => techPhrases[currentIndex], [currentIndex]);
  const nextPhrase = useMemo(() => 
    techPhrases[(currentIndex + 1) % techPhrases.length], 
    [currentIndex]
  );

  if (!mounted) return null;

  return (
    <div className="relative py-20 overflow-hidden">
      {/* Space Background */}
      <div className="absolute inset-0 bg-gradient-radial from-background via-background to-[#0a0a2e] opacity-30" />
      
      {/* Binary Code Background - Reduced for mobile */}
      {!isMobile && Array.from({ length: isMobile ? 3 : 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/10 text-xs font-mono whitespace-nowrap"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: isMobile ? 1.5 : 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * (isMobile ? 0.3 : 0.2),
          }}
        >
          {Array.from({ length: isMobile ? 8 : 15 }).map(() => 
            Math.random() > 0.5 ? '1' : '0'
          ).join(' ')}
        </motion.div>
      ))}
      
      {/* Star Particles - Reduced for mobile */}
      {Array.from({ length: isMobile ? 5 : 15 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full animate-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * (isMobile ? 1.5 : 2) + 1}px`,
            height: `${Math.random() * (isMobile ? 1.5 : 2) + 1}px`,
            background: i % 3 === 0 ? '#00f2fe' : i % 3 === 1 ? '#4facfe' : '#ffffff',
            boxShadow: `0 0 ${Math.random() * (isMobile ? 4 : 8) + 4}px ${i % 3 === 0 ? '#00f2fe' : i % 3 === 1 ? '#4facfe' : '#ffffff'}`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
      
      {/* Tech Grid Background */}
      <div className="absolute inset-0 tech-grid opacity-10" />
      
      {/* Glowing Text Container */}
      <div className="relative max-w-4xl mx-auto text-center px-4">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: isMobile ? 1 : 1.5 }}
          className="relative"
        >
          {/* Tech Icons */}
          <motion.div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex space-x-4">
            {['💻', '🔒', '🌐', '🤖'].map((icon, i) => (
              <motion.span
                key={icon}
                className="text-2xl"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: isMobile ? 1.5 : 2,
                  delay: i * (isMobile ? 0.15 : 0.2),
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {icon}
              </motion.span>
            ))}
          </motion.div>

          {/* Current Text */}
          <motion.h2
            className="text-4xl md:text-6xl font-bold tracking-wider"
            style={{ 
              color: currentPhrase.color,
              textShadow: `0 0 20px ${currentPhrase.color}40`,
            }}
            animate={isMobile ? {
              textShadow: `0 0 20px ${currentPhrase.color}40`
            } : {
              textShadow: [
                `0 0 20px ${currentPhrase.color}40`,
                `0 0 50px ${currentPhrase.color}60`,
                `0 0 20px ${currentPhrase.color}40`,
              ]
            }}
            transition={isMobile ? {
              duration: 0
            } : {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {currentPhrase.text}
          </motion.h2>

          {/* Energy Line */}
          <motion.div
            className="h-1 mt-8 rounded-full mx-auto relative overflow-hidden"
            style={{ 
              background: `linear-gradient(90deg, transparent, ${currentPhrase.color}, transparent)`,
              width: '60%',
            }}
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: isMobile ? 3 : 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Binary Particles */}
            {Array.from({ length: isMobile ? 2 : 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0 h-full w-8 flex items-center justify-center text-[8px] font-mono"
                animate={{
                  x: ['-100%', '500%'],
                }}
                transition={{
                  duration: isMobile ? 2 : 3,
                  delay: i * (isMobile ? 0.5 : 1),
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                10
              </motion.div>
            ))}
          </motion.div>

          {/* Next Text Preview */}
          <motion.p
            className="mt-8 text-xl text-primary/80 font-medium tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isMobile ? 0.5 : 1, duration: isMobile ? 0.5 : 1 }}
          >
            Next Module: {nextPhrase.text}
          </motion.p>
        </motion.div>

        {/* Progress Indicators */}
        <div className="mt-12 flex justify-center space-x-8">
          {techPhrases.map((_, i) => (
            <motion.div
              key={i}
              className="w-4 h-4 rounded-full bg-primary/30"
              animate={{
                scale: i === currentIndex ? [1, 1.2, 1] : 1,
                opacity: i === currentIndex ? 1 : 0.3,
                boxShadow: i === currentIndex 
                  ? [
                      `0 0 10px ${currentPhrase.color}40`,
                      `0 0 20px ${currentPhrase.color}60`,
                      `0 0 10px ${currentPhrase.color}40`,
                    ]
                  : 'none',
              }}
              transition={{
                duration: isMobile ? 1.5 : 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlowingText;