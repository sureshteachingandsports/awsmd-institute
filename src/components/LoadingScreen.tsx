'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

// Detect if device is mobile/low-end
const isMobileOrLowEnd = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || !window.matchMedia('(min-resolution: 2dppx)').matches;
};

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loadingText, setLoadingText] = useState('Initializing Systems');

  useEffect(() => {
    setMounted(true);
    setIsMobile(isMobileOrLowEnd());
    
    const handleResize = () => setIsMobile(isMobileOrLowEnd());
    window.addEventListener('resize', handleResize);

    const texts = [
      'Initializing Systems',
      'Scanning Security Protocols',
      'Calibrating Neural Networks',
      'Establishing Connection'
    ];
    let currentIndex = 0;

    const textInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % texts.length;
      setLoadingText(texts[currentIndex]);
    }, isMobile ? 600 : 800);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, isMobile ? 1500 : 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(textInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  const binaryCount = useMemo(() => isMobile ? 5 : 10, [isMobile]);
  const ringCount = useMemo(() => isMobile ? 2 : 3, [isMobile]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Binary Background */}
          {Array.from({ length: binaryCount }).map((_, i) => (
            <motion.div
              key={`binary-${i}`}
              className="absolute text-primary/10 text-xs font-mono"
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
              {Array.from({ length: 8 }).map(() => 
                Math.random() > 0.5 ? '1' : '0'
              ).join(' ')}
            </motion.div>
          ))}

          <div className="relative">
            {/* Rotating Rings */}
            {Array.from({ length: ringCount }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0 left-0 rounded-full"
                style={{
                  width: isMobile ? '96px' : '128px',
                  height: isMobile ? '96px' : '128px',
                  border: `2px solid ${i === 0 ? '#00f2fe' : i === 1 ? '#4facfe' : '#7d5fff'}`,
                  opacity: 0.6 - i * 0.15,
                }}
                animate={{ 
                  rotate: 360,
                  scale: [1 + i * 0.1, 1 + i * 0.15, 1 + i * 0.1]
                }}
                transition={{ 
                  rotate: { 
                    duration: isMobile ? (2.5 - i * 0.5) : (3 - i * 0.5), 
                    repeat: Infinity, 
                    ease: 'linear' 
                  },
                  scale: { 
                    duration: isMobile ? 1.5 : 2, 
                    repeat: Infinity, 
                    ease: 'easeInOut' 
                  }
                }}
              />
            ))}

            {/* Central Orb */}
            <motion.div
              className="rounded-full relative flex items-center justify-center"
              style={{
                width: isMobile ? '96px' : '128px',
                height: isMobile ? '96px' : '128px',
                background: 'radial-gradient(circle at center, rgba(0, 242, 254, 0.3), rgba(125, 95, 255, 0.1))',
                boxShadow: '0 0 30px rgba(0, 242, 254, 0.5)'
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Rotating Icons */}
              {['💻', '🔒', '🌐', '🤖'].map((icon, index) => (
                <motion.div
                  key={icon}
                  className="absolute"
                  style={{
                    transform: `rotate(${index * 90}deg) translateY(-${isMobile ? 15 : 20}px)`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: isMobile ? 1.5 : 2,
                    delay: index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {icon}
                </motion.div>
              ))}

              {/* Center Logo */}
              <motion.div
                className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gradient z-10`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                iTech
              </motion.div>
            </motion.div>
          </div>

          {/* Loading Text */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.p
              key={loadingText}
              className={`text-primary ${isMobile ? 'text-base' : 'text-lg'} font-mono`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {loadingText}
            </motion.p>
            <motion.div
              className="mt-2 text-secondary"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: isMobile ? 1 : 1.5, repeat: Infinity }}
            >
              <span className="inline-block mx-0.5 animate-pulse">.</span>
              <span className="inline-block mx-0.5 animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
              <span className="inline-block mx-0.5 animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;